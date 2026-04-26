'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const STORAGE_KEY = 'basarabia_cookie_consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [showPrefs, setShowPrefs] = useState(false)
  const [analyticsOn, setAnalyticsOn] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true)
    } catch {
      // localStorage unavailable (private mode, etc.) — show banner anyway
      setVisible(true)
    }
  }, [])

  function persist(analytics) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        essential: true,
        analytics,
        timestamp: new Date().toISOString(),
      }))
    } catch {
      // ignore storage failure
    }
    setShowPrefs(false)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <>
      <style>{`
        @keyframes cookieBannerIn {
          from { opacity: 0; transform: translate(-50%, 24px); }
          to   { opacity: 1; transform: translate(-50%, 0); }
        }
        @keyframes cookieModalIn {
          from { opacity: 0; transform: translate(-50%, -45%); }
          to   { opacity: 1; transform: translate(-50%, -50%); }
        }
        @keyframes cookieBackdropIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .cookie-banner {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
          width: calc(100% - 32px);
          max-width: 500px;
          padding: 22px 26px 20px;
          background: linear-gradient(135deg, #1a0606 0%, #2a0a0a 50%, #1a0606 100%);
          border: 1px solid rgba(212,160,23,0.55);
          border-radius: 6px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,160,23,0.08);
          color: #D4C4A0;
          font-family: Georgia, "Times New Roman", serif;
          animation: cookieBannerIn 400ms ease-out both;
        }

        .cookie-close {
          position: absolute;
          top: 8px;
          right: 10px;
          width: 28px;
          height: 28px;
          background: transparent;
          border: none;
          color: #A8957A;
          font-family: Georgia, serif;
          font-size: 1.3rem;
          line-height: 1;
          cursor: pointer;
          padding: 0;
          transition: color 0.2s;
        }
        .cookie-close:hover { color: #F5E6C8; }

        .cookie-heading {
          font-family: var(--font-cinzel, "Cinzel Decorative", serif);
          color: #F5E6C8;
          font-size: 0.85rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          font-weight: 700;
          margin: 0 0 12px;
        }

        .cookie-body-ro {
          color: #D4C4A0;
          font-size: 0.92rem;
          line-height: 1.55;
          margin: 0 0 6px;
        }
        .cookie-body-en {
          color: #7a6a54;
          font-style: italic;
          font-size: 0.78rem;
          line-height: 1.5;
          margin: 0 0 16px;
        }

        .cookie-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 12px;
        }
        .cookie-btn {
          flex: 1 1 auto;
          min-width: 0;
          padding: 10px 14px;
          border-radius: 4px;
          font-family: Georgia, serif;
          font-size: 0.78rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.15s;
          line-height: 1.2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }
        .cookie-btn-en {
          font-size: 0.65rem;
          letter-spacing: 0.05em;
          text-transform: none;
          font-style: italic;
          opacity: 0.7;
          font-weight: 400;
        }
        .cookie-btn-primary {
          background: #D4A017;
          border: 1px solid #D4A017;
          color: #1a0606;
          font-weight: 700;
        }
        .cookie-btn-primary:hover {
          background: #E5B22A;
          border-color: #E5B22A;
          transform: translateY(-1px);
        }
        .cookie-btn-secondary {
          background: transparent;
          border: 1px solid rgba(212,160,23,0.55);
          color: #F5E6C8;
          font-weight: 600;
        }
        .cookie-btn-secondary:hover {
          border-color: #D4A017;
          background: rgba(212,160,23,0.08);
        }

        .cookie-details {
          color: #A8957A;
          font-family: Georgia, serif;
          font-size: 0.78rem;
          font-style: italic;
          text-decoration: none;
          border-bottom: 1px dotted rgba(168,149,122,0.4);
          transition: color 0.2s, border-color 0.2s;
        }
        .cookie-details:hover {
          color: #F5E6C8;
          border-bottom-color: #F5E6C8;
        }

        @media (max-width: 480px) {
          .cookie-banner {
            bottom: 12px;
            padding: 20px 22px 18px;
          }
          .cookie-buttons { flex-direction: column; }
          .cookie-btn { flex: 0 0 auto; width: 100%; }
        }

        /* ─── Preferences modal ─────────────────────── */

        .cookie-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 1010;
          background: rgba(0,0,0,0.72);
          animation: cookieBackdropIn 200ms ease-out both;
        }
        .cookie-modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1011;
          width: calc(100% - 32px);
          max-width: 460px;
          padding: 28px 30px 24px;
          background: linear-gradient(135deg, #1a0606 0%, #2a0a0a 50%, #1a0606 100%);
          border: 1px solid rgba(212,160,23,0.55);
          border-radius: 6px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(212,160,23,0.1);
          color: #D4C4A0;
          font-family: Georgia, "Times New Roman", serif;
          animation: cookieModalIn 280ms ease-out both;
        }
        .cookie-modal-heading {
          font-family: var(--font-cinzel, "Cinzel Decorative", serif);
          color: #F5E6C8;
          font-size: 0.9rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          font-weight: 700;
          margin: 0 0 18px;
        }
        .cookie-pref-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          padding: 14px 0;
          border-bottom: 1px solid rgba(212,160,23,0.15);
        }
        .cookie-pref-row:last-of-type { border-bottom: none; }
        .cookie-pref-label {
          color: #F5E6C8;
          font-size: 0.92rem;
          font-weight: 600;
          margin: 0 0 4px;
        }
        .cookie-pref-desc {
          color: #A8957A;
          font-size: 0.78rem;
          font-style: italic;
          line-height: 1.5;
          margin: 0;
        }

        .cookie-toggle {
          flex-shrink: 0;
          width: 44px;
          height: 24px;
          border-radius: 12px;
          background: rgba(168,149,122,0.25);
          border: 1px solid rgba(168,149,122,0.4);
          position: relative;
          cursor: pointer;
          padding: 0;
          transition: background 0.2s, border-color 0.2s;
        }
        .cookie-toggle::after {
          content: '';
          position: absolute;
          top: 2px;
          left: 2px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #A8957A;
          transition: transform 0.2s, background 0.2s;
        }
        .cookie-toggle[aria-checked="true"] {
          background: rgba(212,160,23,0.35);
          border-color: #D4A017;
        }
        .cookie-toggle[aria-checked="true"]::after {
          transform: translateX(20px);
          background: #D4A017;
        }
        .cookie-toggle[disabled] {
          cursor: not-allowed;
          opacity: 0.85;
        }

        .cookie-modal-actions {
          display: flex;
          gap: 10px;
          margin-top: 22px;
        }
      `}</style>

      <div className="cookie-banner" role="dialog" aria-label="Cookie consent">
        <button
          className="cookie-close"
          onClick={() => persist(false)}
          aria-label="Închide — refuză cookie-urile non-esențiale"
        >×</button>

        <h3 className="cookie-heading">Cookie-uri / Cookies</h3>

        <p className="cookie-body-ro">
          Folosim cookie-uri esențiale pentru ca site-ul să funcționeze și — cu acordul tău — cookie-uri analitice pentru a-l îmbunătăți.
        </p>
        <p className="cookie-body-en">
          We use essential cookies to make the site work and — with your consent — analytics cookies to improve it.
        </p>

        <div className="cookie-buttons">
          <button className="cookie-btn cookie-btn-primary" onClick={() => persist(true)}>
            <span>Acceptă tot</span>
            <span className="cookie-btn-en">Accept all</span>
          </button>
          <button className="cookie-btn cookie-btn-secondary" onClick={() => persist(false)}>
            <span>Doar esențiale</span>
            <span className="cookie-btn-en">Essential only</span>
          </button>
          <button className="cookie-btn cookie-btn-secondary" onClick={() => setShowPrefs(true)}>
            <span>Setări</span>
            <span className="cookie-btn-en">Preferences</span>
          </button>
        </div>

        <Link href="/cookie-uri" className="cookie-details">
          Detalii / Details →
        </Link>
      </div>

      {showPrefs && (
        <>
          <div
            className="cookie-modal-backdrop"
            onClick={() => setShowPrefs(false)}
            aria-hidden="true"
          />
          <div
            className="cookie-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Cookie preferences"
          >
            <h3 className="cookie-modal-heading">Setări Cookie-uri / Cookie Preferences</h3>

            <div className="cookie-pref-row">
              <div>
                <p className="cookie-pref-label">Esențiale / Essential</p>
                <p className="cookie-pref-desc">
                  Necesare pentru ca site-ul să funcționeze. Nu pot fi dezactivate.
                </p>
              </div>
              <button
                className="cookie-toggle"
                aria-checked="true"
                role="switch"
                disabled
                aria-label="Cookie-uri esențiale (obligatorii)"
              />
            </div>

            <div className="cookie-pref-row">
              <div>
                <p className="cookie-pref-label">Analitice / Analytics</p>
                <p className="cookie-pref-desc">
                  Date anonime despre cum este folosit site-ul, pentru a-l îmbunătăți.
                </p>
              </div>
              <button
                className="cookie-toggle"
                aria-checked={analyticsOn}
                role="switch"
                onClick={() => setAnalyticsOn(v => !v)}
                aria-label="Cookie-uri analitice"
              />
            </div>

            <div className="cookie-modal-actions">
              <button className="cookie-btn cookie-btn-primary" onClick={() => persist(analyticsOn)}>
                <span>Salvează</span>
                <span className="cookie-btn-en">Save</span>
              </button>
              <button className="cookie-btn cookie-btn-secondary" onClick={() => setShowPrefs(false)}>
                <span>Anulează</span>
                <span className="cookie-btn-en">Cancel</span>
              </button>
            </div>
          </div>
        </>
      )}
    </>
  )
}
