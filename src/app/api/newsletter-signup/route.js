function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const SHOP_DOMAIN = 'https://basarabia-37.myshopify.com'

export async function POST(request) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email || !isValidEmail(email)) {
      return Response.json(
        { success: false, error: 'Adresa de email nu pare validă.' },
        { status: 400 }
      )
    }

    const clean = email.toLowerCase().trim()

    // Shopify native contact/customer form — creates a customer with
    // marketing consent, no API tokens required.
    const form = new URLSearchParams()
    form.set('form_type', 'customer')
    form.set('utf8', '✓')
    form.set('contact[email]', clean)
    form.set('contact[tags]', 'newsletter,site-basarabia')

    const res = await fetch(`${SHOP_DOMAIN}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: form.toString(),
      redirect: 'manual',
    })

    // Shopify answers 302 on success (redirect back), 200 with challenge page sometimes.
    if (res.status === 302 || res.status === 200) {
      return Response.json({ success: true })
    }
    console.error('[newsletter-signup] shopify status', res.status)
    return Response.json(
      { success: false, error: 'Nu am putut salva abonarea. Încearcă din nou.' },
      { status: 502 }
    )
  } catch (err) {
    console.error('[newsletter-signup] error', err)
    return Response.json(
      { success: false, error: 'Eroare de server. Încearcă din nou.' },
      { status: 500 }
    )
  }
}
