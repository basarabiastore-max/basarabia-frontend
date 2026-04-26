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
          transform: scale(1.05);
        }
        .footer-social-icon:hover svg path,
        .footer-social-icon:hover svg rect,
        .footer-social-icon:hover svg polygon,
        .footer-social-icon:hover svg circle {
          stroke: #000;
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
          gap: 16px;
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
            <Link href="/livrare" className="footer-link">Livrare</Link>
            <Link href="/termeni-si-conditii" className="footer-link">Termeni și Condiții</Link>
            <Link href="/confidentialitate" className="footer-link">Politica de Confidențialitate</Link>
            <Link href="/cookie-uri" className="footer-link">Cookie-uri</Link>
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

          <p className="footer-bottom-right" style={{
            color: '#3a3028',
            fontFamily: 'Georgia, serif',
            fontSize: '0.7rem',
            letterSpacing: '0.1em',
            margin: 0,
          }}>
            Basarabia Ltd · Company No. 14886556
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

/* ─── Payment Badge Icons (monochrome gold, 70% opacity) ───── */

function VisaIcon() {
  return (
    <svg width="46" height="28" viewBox="0 0 46 28" aria-label="Visa" role="img" style={{ opacity: 0.7 }}>
      <rect x="0.5" y="0.5" width="45" height="27" rx="4" fill="none" stroke="#A8957A" strokeWidth="0.8"/>
      <text x="23" y="19.5" fontFamily="'Arial Black', Arial, sans-serif" fontWeight="900" fontStyle="italic" fontSize="15" fill="#A8957A" textAnchor="middle" letterSpacing="1">VISA</text>
    </svg>
  )
}

function MastercardIcon() {
  return (
    <svg width="46" height="28" viewBox="0 0 46 28" aria-label="Mastercard" role="img" style={{ opacity: 0.7 }}>
      <rect x="0.5" y="0.5" width="45" height="27" rx="4" fill="none" stroke="#A8957A" strokeWidth="0.8"/>
      <circle cx="18" cy="14" r="7" fill="#A8957A"/>
      <circle cx="28" cy="14" r="7" fill="#7a6a54"/>
      {/* overlap lens */}
      <path d="M23 8.1a7 7 0 0 1 0 11.8A7 7 0 0 1 23 8.1z" fill="#C4A87A"/>
    </svg>
  )
}

function ApplePayIcon() {
  return (
    <svg width="54" height="28" viewBox="0 0 54 28" aria-label="Apple Pay" role="img" style={{ opacity: 0.7 }}>
      <rect x="0.5" y="0.5" width="53" height="27" rx="4" fill="none" stroke="#A8957A" strokeWidth="0.8"/>
      {/* Apple logo — nested svg maps 24×24 path into 15×21 slot */}
      <svg x="7" y="3" width="15" height="21" viewBox="2 2 20 21">
        <path fill="#A8957A" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
      </svg>
      <text x="38" y="18.5" fontFamily="Arial, sans-serif" fontWeight="500" fontSize="11" fill="#A8957A" textAnchor="middle">Pay</text>
    </svg>
  )
}

function GooglePayIcon() {
  return (
    <svg width="54" height="28" viewBox="0 0 54 28" aria-label="Google Pay" role="img" style={{ opacity: 0.7 }}>
      <rect x="0.5" y="0.5" width="53" height="27" rx="4" fill="none" stroke="#A8957A" strokeWidth="0.8"/>
      {/* Google G mark — all segments rendered in matching gold */}
      <svg x="7" y="5" width="17" height="17" viewBox="0 0 24 24">
        <path fill="#A8957A" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#A8957A" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#A8957A" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#A8957A" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
      <text x="39" y="18.5" fontFamily="Arial, sans-serif" fontWeight="500" fontSize="11" fill="#A8957A" textAnchor="middle">Pay</text>
    </svg>
  )
}
