import Anthropic from '@anthropic-ai/sdk'
import { SYSTEM_PROMPT } from '@/lib/tantiOlguta'

const ERROR_MESSAGE = 'Tanti Olguța se odihnește un moment, încearcă din nou.'

const MAX_MESSAGES = 30
const MAX_CONTENT_CHARS = 2000
const RATE_LIMIT = 20
const RATE_WINDOW_MS = 60 * 60 * 1000

const ipBuckets = new Map()

function getClientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return request.headers.get('x-real-ip') || 'unknown'
}

function isRateLimited(ip) {
  const now = Date.now()
  const entry = ipBuckets.get(ip)
  if (!entry || now > entry.resetAt) {
    ipBuckets.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return false
  }
  if (entry.count >= RATE_LIMIT) return true
  entry.count += 1
  return false
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
    if (isRateLimited(ip)) {
      return Response.json({ error: ERROR_MESSAGE }, { status: 429 })
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

    console.log('[chat] calling Anthropic API', {
      model: 'claude-sonnet-4-5',
      messageCount: body.messages.length,
      sdkVersion: Anthropic?.VERSION ?? 'unknown',
    })

    const response = await client.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 600,
      system: SYSTEM_PROMPT,
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
