import { promises as fs } from 'fs'
import path from 'path'

// TODO: replace local file storage with Beehiiv API integration once API key is available.
// See Beehiiv docs: https://developers.beehiiv.com/

const DATA_FILE = path.join(process.cwd(), 'data', 'newsletter-signups.json')

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { email, language = 'ro' } = body

    if (!email || !isValidEmail(email)) {
      return Response.json(
        { success: false, error: 'Invalid email address.' },
        { status: 400 }
      )
    }

    const entry = {
      email: email.toLowerCase().trim(),
      language,
      subscribedAt: new Date().toISOString(),
    }

    // Read existing signups, or start with empty array
    let signups = []
    try {
      const raw = await fs.readFile(DATA_FILE, 'utf8')
      signups = JSON.parse(raw)
    } catch {
      // File doesn't exist yet — first signup
    }

    // Avoid duplicate emails
    const alreadyExists = signups.some(s => s.email === entry.email)
    if (!alreadyExists) {
      signups.push(entry)
      await fs.mkdir(path.dirname(DATA_FILE), { recursive: true })
      await fs.writeFile(DATA_FILE, JSON.stringify(signups, null, 2), 'utf8')
    }

    return Response.json({ success: true })
  } catch (err) {
    console.error('[newsletter-signup]', err)
    return Response.json(
      { success: false, error: 'Server error. Please try again.' },
      { status: 500 }
    )
  }
}
