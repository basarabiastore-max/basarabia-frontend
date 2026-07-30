import Anthropic from '@anthropic-ai/sdk'
import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'
import { SYSTEM_PROMPT } from '@/lib/tantiOlguta'
import { getAllProducts, shopifyConfigured } from '@/lib/shopify'

const ERROR_MESSAGE = 'Tanti Olguța se odihnește un moment, încearcă din nou.'
const RATE_LIMIT_MESSAGE =
  'Olguța se odihnește puțin. Încearcă din nou mai târziu sau scrie-ne la contact@basarabia.co.uk.'

const MAX_MESSAGES = 30
const MAX_CONTENT_CHARS = 2000

// Per-IP: 20 requests / hour, sliding window. Keyed by client IP.
const PER_IP_LIMIT = 20
const PER_IP_WINDOW = '1 h'

// Global daily circuit breaker. Caps absolute worst-case Anthropic spend.
const DAILY_GLOBAL_CAP = 1000
const DAILY_TTL_SECONDS = 60 * 60 * 48

const hasUpstash = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
)

// Lazily create on first use to avoid module-load failures when env is absent.
const redis = hasUpstash ? Redis.fromEnv() : null
const ratelimit = hasUpstash
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(PER_IP_LIMIT, PER_IP_WINDOW),
      analytics: false,
      prefix: 'olguta:rl',
    })
  : null

if (!hasUpstash) {
  console.warn(
    '[chat] UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN missing — rate limit and daily cap DISABLED. Local dev only; production must set these.',
  )
}

function getClientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return request.headers.get('x-real-ip') || 'anonymous'
}

function todayKey() {
  const now = new Date()
  const yyyy = now.getUTCFullYear()
  const mm = String(now.getUTCMonth() + 1).padStart(2, '0')
  const dd = String(now.getUTCDate()).padStart(2, '0')
  return `olguta:global:${yyyy}-${mm}-${dd}`
}

function rateLimitedResponse() {
  return Response.json(
    { error: 'rate_limited', message: RATE_LIMIT_MESSAGE },
    { status: 429 },
  )
}


// ── Live stock lookup (RAG) ─────────────────────────────────────────────
const STOPWORDS = new Set([
  'aveti', 'avem', 'este', 'sunt', 'care', 'cat', 'cata', 'cati', 'cate',
  'costa', 'pret', 'pretul', 'vreau', 'doresc', 'unde', 'cum', 'buna',
  'ziua', 'draga', 'tanti', 'olguta', 'pentru', 'the', 'you', 'have',
  'much', 'price', 'what', 'does', 'and', 'sau', 'ceva', 'niste', 'mai',
])

function normText(s) {
  return (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

async function liveStockBlock(lastUserMessage) {
  try {
    if (!shopifyConfigured()) return ''
    const words = normText(lastUserMessage)
      .split(/[^a-z0-9]+/)
      .filter((w) => w.length >= 3 && !STOPWORDS.has(w))
    if (words.length === 0) return ''

    const all = await getAllProducts()
    const scored = []
    for (const p of all) {
      const hay = normText(`${p.nameRo} ${p.supplier} ${p.productType} ${p.tags.join(' ')}`)
      let hits = 0
      for (const w of words) if (hay.includes(w)) hits++
      if (hits > 0) scored.push([hits, p])
    }
    if (scored.length === 0) {
      return '\n\nSTOC LIVE: (nimic găsit în catalog pentru termenii din mesaj — nu inventa produse)'
    }
    scored.sort((a, b) => b[0] - a[0])
    const lines = scored.slice(0, 10).map(([, p]) => {
      const inStoreOnly = p.tags.some((t) => t.trim().toLowerCase() === 'in-store-only')
      const price = p.priceGbp !== null ? `£${p.priceGbp.toFixed(2)}` : 'preț la tejghea'
      const avail = inStoreOnly
        ? 'doar în magazin'
        : p.availableForSale
          ? 'în stoc online'
          : 'Epuizat'
      return `- ${p.nameRo} — ${price} — ${avail} — /produs/${p.handle}`
    })
    return '\n\nSTOC LIVE (rezultate reale din catalog pentru mesajul clientului — folosește DOAR astea pentru stoc/prețuri):\n' + lines.join('\n')
  } catch (e) {
    console.error('[chat] liveStockBlock failed', e?.message)
    return ''
  }
}

function validateMessages(messages) {
  if (!Array.isArray(messages)) return 'messages must be an array'
  if (messages.length === 0) return 'messages must not be empty'
  if (messages.length > MAX_MESSAGES) return `too many messages (max ${MAX_MESSAGES})`
  for (const m of messages) {
    if (!m || typeof m !== 'object') return 'invalid message shape'
    if (m.role !== 'user' && m.role !== 'assistant') return 'invalid message role'
    if (typeof m.content !== 'string') return 'message content must be a string'
    if (m.content.length === 0) return 'message content must not be empty'
    if (m.content.length > MAX_CONTENT_CHARS) return `message content too long (max ${MAX_CONTENT_CHARS} chars)`
  }
  return null
}

export async function POST(request) {
  try {
    const ip = getClientIp(request)

    // Layer 1: per-IP sliding window
    if (ratelimit) {
      const { success } = await ratelimit.limit(ip)
      if (!success) return rateLimitedResponse()
    }

    // Layer 2: global daily circuit breaker (pre-check)
    if (redis) {
      const currentCount = Number(await redis.get(todayKey())) || 0
      if (currentCount >= DAILY_GLOBAL_CAP) return rateLimitedResponse()
    }

    const body = await request.json().catch(() => null)
    if (!body) return Response.json({ error: ERROR_MESSAGE }, { status: 400 })

    const validationError = validateMessages(body.messages)
    if (validationError) {
      console.error('[chat] validation failed:', validationError)
      return Response.json({ error: ERROR_MESSAGE }, { status: 400 })
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('[chat] ANTHROPIC_API_KEY missing from environment')
      return Response.json({ error: ERROR_MESSAGE }, { status: 500 })
    }

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

    const lastUser = [...body.messages].reverse().find((m) => m.role === 'user')
    const stockBlock = await liveStockBlock(lastUser?.content || '')

    console.log('[chat] calling Anthropic API', {
      model: 'claude-sonnet-4-5',
      messageCount: body.messages.length,
      sdkVersion: Anthropic?.VERSION ?? 'unknown',
    })

    const response = await client.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 450,
      system: SYSTEM_PROMPT + stockBlock,
      messages: body.messages,
    })

    const reply = response.content
      .filter((block) => block.type === 'text')
      .map((block) => block.text)
      .join('\n')
      .trim()

    if (!reply) {
      console.error('[chat] Anthropic returned no text blocks', {
        stop_reason: response.stop_reason,
        content_types: response.content.map((b) => b.type),
      })
      return Response.json({ error: ERROR_MESSAGE }, { status: 500 })
    }

    // Layer 2 (continued): increment daily counter on successful response.
    // Best-effort — if Redis hiccups here, we still return the reply rather than dropping it.
    if (redis) {
      try {
        const newCount = await redis.incr(todayKey())
        if (newCount === 1) await redis.expire(todayKey(), DAILY_TTL_SECONDS)
      } catch (e) {
        console.error('[chat] daily counter increment failed', e?.message)
      }
    }

    return Response.json({ reply })
  } catch (err) {
    if (err instanceof Anthropic.APIError) {
      console.error('[chat] Anthropic API error', {
        name: err.name,
        status: err.status,
        message: err.message,
        error: err.error,
        request_id: err.request_id,
        headers: err.headers,
      })
    } else {
      console.error('[chat] unexpected error', {
        name: err?.name,
        message: err?.message,
        stack: err?.stack,
      })
    }
    return Response.json({ error: ERROR_MESSAGE }, { status: 500 })
  }
}
