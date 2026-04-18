'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0a0a0a', width: '100%' }}>
      <style>{`
        .footer-col-heading {
          color: #D4A017;
          font-family: var(--font-cinzel, 'Cinzel Decorative', serif);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          margin: 0 0 18px;
        }
        .footer-body {
          color: #A8957A;
          font-family: Georgia, serif;
          font-size: 0.9rem;
          line-height: 1.8;
          margin: 0;
        }
        .footer-link {
          color: #A8957A;
          font-family: Georgia, serif;
          font-size: 0.9rem;
          line-height: 2;
          text-decoration: none;
          display: block;
          transition: color 0.2s;
          position: relative;
          width: fit-content;
        }
        .footer-link::after {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 0;
          width: 0;
          height: 1px;
          background: #F5E6C8;
          transition: width 0.2s;
        }
        .footer-link:hover { color: #F5E6C8; }
        .footer-link:hover::after { width: 100%; }

        .footer-social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid rgba(212,160,23,0.55);
          color: #D4A017;
          background: transparent;
          text-decoration: none;
          flex-shrink: 0;
          transition: background 0.2s, color 0.2s, transform 0.2s, border-color 0.2s;
        }
        .footer-social-icon:hover {
          background: #D4A017;
          color: #000;
          border-color: #D4A017;
          transform: scale(1.1);
        }
        .footer-social-icon:hover svg path,
        .footer-social-icon:hover svg rect,
        .footer-social-icon:hover svg polygon,
        .footer-social-icon:hover svg circle {
          stroke: #000;
          fill: #000;
        }
        .footer-social-icon:hover svg .filled {
          fill: #000;
        }

        .footer-columns {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1fr;
          gap: 48px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px clamp(1.5rem, 5vw, 4rem) 40px;
        }

        .footer-bottom-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px clamp(1.5rem, 5vw, 4rem);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .footer-payment-badges {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .footer-newsletter-teaser {
          color: #7a6a54;
          font-family: Georgia, serif;
          font-style: italic;
          font-size: 0.85rem;
          text-decoration: none;
          display: inline-block;
          margin-top: 20px;
          transition: color 0.2s;
        }
        .footer-newsletter-teaser:hover { color: #A8957A; }

        @media (max-width: 900px) {
          .footer-columns {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            padding-top: 60px;
            padding-bottom: 30px;
          }
        }

        @media (max-width: 600px) {
          .footer-columns {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .footer-social-row {
            justify-content: center !important;
          }
          .footer-bottom-inner {
            flex-direction: column;
            text-align: center;
            gap: 12px;
          }
          .footer-bottom-left,
          .footer-bottom-right {
            text-align: center;
          }
        }
      `}</style>

      {/* Top gradient border strip */}
      <div style={{
        width: '100%',
        height: '1px',
        background: 'linear-gradient(90deg, #8B1A1A 0%, #D4A017 35%, #8B1A1A 65%, #D4A017 82%, #8B1A1A 100%)',
      }} />

      {/* Four columns */}
      <div className="footer-columns">

        {/* Column 1 — Brand */}
        <div>
          <p style={{
            color: '#F5E6C8',
            fontFamily: 'var(--font-cinzel, "Cinzel Decorative", serif)',
            fontSize: '1.15rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            margin: '0 0 10px',
          }}>Basarabia</p>
          <p style={{
            color: '#A8957A',
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic',
            fontSize: '0.88rem',
            margin: '0 0 16px',
            lineHeight: 1.6,
          }}>Gustul de Acasă, livrat la ușa ta.</p>
          <p style={{
            color: '#D4A017',
            fontSize: '0.9rem',
            margin: 0,
            letterSpacing: '0.15em',
            lineHeight: 1,
          }}>✦</p>
        </div>

        {/* Column 2 — Contact */}
        <div>
          <p className="footer-col-heading">Contact</p>
          <address style={{ fontStyle: 'normal' }}>
            <p className="footer-body">
              Ground Floor, 11 Market Place<br />
              Spalding, PE11 1SL<br />
              United Kingdom
            </p>
            <p style={{ margin: '14px 0 0' }}>
              <a
                href="tel:+447392979694"
                className="footer-link"
                aria-label="Call us at +44 7392 979694"
              >+44 7392 979694</a>
              <a
                href="mailto:contact@basarabia.co.uk"
                className="footer-link"
                aria-label="Email us at contact@basarabia.co.uk"
              >contact@basarabia.co.uk</a>
            </p>
          </address>
        </div>

        {/* Column 3 — Hours + Links */}
        <div>
          <p className="footer-col-heading">Program</p>
          <p className="footer-body" style={{ marginBottom: '28px' }}>
            Luni – Duminică<br />09:00 – 20:00
          </p>

          <p className="footer-col-heading">Linkuri</p>
          <nav aria-label="Footer navigation">
            <Link href="/shop" className="footer-link">Magazin</Link>
            <Link href="/despre-noi" className="footer-link">Despre Noi</Link>
            <Link href="/contact" className="footer-link">Contact</Link>
            {/* TODO: add real /livrare page */}
            <a href="#" className="footer-link">Livrare</a>
            {/* TODO: add real /termeni page */}
            <a href="#" className="footer-link">Termeni și Condiții</a>
            {/* TODO: add real /confidentialitate page */}
            <a href="#" className="footer-link">Politica de Confidențialitate</a>
          </nav>
        </div>

        {/* Column 4 — Social + Newsletter teaser */}
        <div>
          <p className="footer-col-heading">Urmărește-ne</p>
          <div className="footer-social-row" style={{ display: 'flex', gap: '10px' }}>
            {/* TODO: replace href="#" with real Facebook URL when account is ready */}
            <a href="#" className="footer-social-icon" aria-label="Follow us on Facebook">
              <FacebookIcon />
            </a>
            {/* TODO: replace href="#" with real Instagram URL when account is ready */}
            <a href="#" className="footer-social-icon" aria-label="Follow us on Instagram">
              <InstagramIcon />
            </a>
            {/* TODO: replace href="#" with real TikTok URL when account is ready */}
            <a href="#" className="footer-social-icon" aria-label="Follow us on TikTok">
              <TikTokIcon />
            </a>
          </div>

          <a href="/#newsletter" className="footer-newsletter-teaser">
            Primește rețeta săptămânii →
          </a>
        </div>

      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: '1px solid rgba(212,160,23,0.18)',
      }}>
        <div className="footer-bottom-inner">
          <p className="footer-bottom-left" style={{
            color: '#4a3f30',
            fontFamily: 'Georgia, serif',
            fontSize: '0.7rem',
            letterSpacing: '0.12em',
            margin: 0,
          }}>
            © 2026 Basarabia Concept Store · Spalding, UK
          </p>

          {/* Payment badges */}
          <div className="footer-payment-badges" aria-label="Accepted payment methods">
            <VisaIcon />
            <MastercardIcon />
            <ApplePayIcon />
            <GooglePayIcon />
          </div>

          {/* TODO: replace [TODO] with real Companies House number once registered */}
          <p className="footer-bottom-right" style={{
            color: '#3a3028',
            fontFamily: 'Georgia, serif',
            fontSize: '0.7rem',
            letterSpacing: '0.1em',
            margin: 0,
          }}>
            Basarabia Ltd · Company No. [TODO]
          </p>
        </div>
      </div>

    </footer>
  )
}

/* ─── Social Icons ─────────────────────────────────────────── */

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.73a4.85 4.85 0 0 1-1.01-.04z" />
    </svg>
  )
}

/* ─── Payment Badge Icons (monochrome gold) ─────────────────── */

function VisaIcon() {
  return (
    <svg width="38" height="24" viewBox="0 0 38 24" aria-label="Visa" role="img" style={{ opacity: 0.45 }}>
      <rect width="38" height="24" rx="4" fill="#A8957A" />
      <text x="5" y="17" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="13" fill="#0a0a0a" letterSpacing="0">VISA</text>
    </svg>
  )
}

function MastercardIcon() {
  return (
    <svg width="38" height="24" viewBox="0 0 38 24" aria-label="Mastercard" role="img" style={{ opacity: 0.45 }}>
      <rect width="38" height="24" rx="4" fill="#0a0a0a" stroke="#A8957A" strokeWidth="0.8" />
      <circle cx="14" cy="12" r="7" fill="#A8957A" />
      <circle cx="24" cy="12" r="7" fill="#7a6a54" />
      <path d="M19 6.8a7 7 0 0 1 0 10.4A7 7 0 0 1 19 6.8z" fill="#8B7A60" />
    </svg>
  )
}

function ApplePayIcon() {
  return (
    <svg width="48" height="24" viewBox="0 0 48 24" aria-label="Apple Pay" role="img" style={{ opacity: 0.45 }}>
      <rect width="48" height="24" rx="4" fill="#0a0a0a" stroke="#A8957A" strokeWidth="0.8" />
      <text x="6" y="17" fontFamily="Arial, sans-serif" fontWeight="500" fontSize="10" fill="#A8957A"> Pay</text>
      <path d="M9 7.2c.5-.6.8-1.4.7-2.2-.7.1-1.6.5-2.1 1.1-.5.5-.8 1.3-.7 2 .7.1 1.5-.3 2.1-0.9z" fill="#A8957A" transform="translate(1,1)" />
      <path d="M9.7 8.3c-1.2-.1-2.2.7-2.7.7-.5 0-1.3-.6-2.2-.6-1.1 0-2.2.7-2.7 1.7-1.2 2 .3 4.9 1.2 6.5.4.6.9 1.4 1.6 1.3.6 0 .9-.4 1.7-.4.8 0 1 .4 1.7.4.7 0 1.1-.7 1.5-1.3.5-.7.7-1.4.7-1.4-1.5-.6-1.8-2.5-.2-3.3.5-.3.6-1 .4-1.6z" fill="#A8957A" transform="translate(1,1)" />
    </svg>
  )
}

function GooglePayIcon() {
  return (
    <svg width="48" height="24" viewBox="0 0 48 24" aria-label="Google Pay" role="img" style={{ opacity: 0.45 }}>
      <rect width="48" height="24" rx="4" fill="#0a0a0a" stroke="#A8957A" strokeWidth="0.8" />
      <text x="5" y="17" fontFamily="Arial, sans-serif" fontWeight="500" fontSize="10" fill="#A8957A">G Pay</text>
    </svg>
  )
}
