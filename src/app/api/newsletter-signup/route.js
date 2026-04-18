// TODO: replace console.log placeholder with Beehiiv API integration once API key is available.
// See Beehiiv docs: https://developers.beehiiv.com/

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

    console.log('[newsletter-signup]', {
      email: email.toLowerCase().trim(),
      language,
      subscribedAt: new Date().toISOString(),
    })

    return Response.json({ success: true })
  } catch (err) {
    console.error('[newsletter-signup] error', err)
    return Response.json(
      { success: false, error: 'Server error. Please try again.' },
      { status: 500 }
    )
  }
}
