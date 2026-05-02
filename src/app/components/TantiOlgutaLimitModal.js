'use client'

import { useEffect } from 'react'
import Image from 'next/image'

const AVATAR_SRC = '/tanti-olguta-avatar.png'
const CONTACT_EMAIL = 'contact@basarabia.co.uk'

export default function TantiOlgutaLimitModal({ onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <>
      <style>{`
        @keyframes olgutaLimitFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes olgutaLimitCardIn {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .olguta-limit-overlay {
          position: fixed;
          inset: 0;
          z-index: 110;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: rgba(0,0,0,0.72);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          animation: olgutaLimitFadeIn 200ms ease-out both;
        }
        .olguta-limit-card {
          position: relative;
          width: 100%;
          max-width: 460px;
          background: linear-gradient(160deg, #1f0a0a 0%, #2a0e0e 50%, #1a0606 100%);
          border: 1px solid rgba(212,175,55,0.55);
          border-radius: 14px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(212,175,55,0.08);
          padding: 32px 28px 26px;
          color: #F5E6C8;
          font-family: Georgia, "Times New Roman", serif;
          text-align: center;
          animation: olgutaLimitCardIn 280ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .olguta-limit-avatar {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          border: 1.5px solid rgba(212,175,55,0.55);
          box-shadow: 0 0 18px rgba(212,175,55,0.28);
          overflow: hidden;
          margin: 0 auto 18px;
          background: #1a0606;
          display: block;
        }
        .olguta-limit-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .olguta-limit-title {
          font-family: var(--font-cinzel, "Cinzel Decorative", serif);
          font-size: 0.95rem;
          letter-spacing: 0.18em;
          color: #D4A017;
          text-transform: uppercase;
          font-weight: 700;
          margin: 0 0 18px;
        }

        .olguta-limit-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin: 18px 0;
          color: #D4A017;
          font-size: 0.9rem;
        }
        .olguta-limit-divider::before,
        .olguta-limit-divider::after {
          content: "";
          height: 1px;
          width: 48px;
          background: linear-gradient(to right, transparent, rgba(212,175,55,0.5), transparent);
        }

        .olguta-limit-ro {
          color: #F5E6C8;
          font-size: 1rem;
          line-height: 1.65;
          margin: 0;
        }
        .olguta-limit-en {
          color: #A8957A;
          font-style: italic;
          font-size: 0.9rem;
          line-height: 1.65;
          margin: 0;
        }

        .olguta-limit-email {
          color: #D4A017;
          text-decoration: none;
          border-bottom: 1px solid rgba(212,175,55,0.4);
          transition: color 0.2s, border-color 0.2s;
        }
        .olguta-limit-email:hover {
          color: #F5E6C8;
          border-bottom-color: #F5E6C8;
        }

        .olguta-limit-close {
          margin-top: 26px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 28px;
          background: rgba(212,160,23,0.85);
          border: 1px solid #D4A017;
          border-radius: 8px;
          color: #1a0606;
          font-family: var(--font-cinzel, "Cinzel Decorative", serif);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.15s, transform 0.15s, box-shadow 0.15s;
        }
        .olguta-limit-close:hover {
          background: #D4A017;
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(212,160,23,0.3);
        }

        @media (max-width: 480px) {
          .olguta-limit-card {
            padding: 26px 20px 22px;
          }
          .olguta-limit-title { font-size: 0.85rem; }
          .olguta-limit-ro   { font-size: 0.95rem; }
          .olguta-limit-en   { font-size: 0.85rem; }
        }
      `}</style>

      <div
        className="olguta-limit-overlay"
        onClick={onClose}
        role="presentation"
      >
        <div
          className="olguta-limit-card"
          role="dialog"
          aria-modal="true"
          aria-labelledby="olguta-limit-title"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="olguta-limit-avatar">
            <Image
              src={AVATAR_SRC}
              alt="Tanti Olguța"
              width={72}
              height={72}
            />
          </span>

          <h2 id="olguta-limit-title" className="olguta-limit-title">
            Tanti Olguța
          </h2>

          <p className="olguta-limit-ro">
            Mulțumesc pentru conversație, dragule! Pentru întrebări mai detaliate
            sau comenzi mari, te rog scrie-ne la{' '}
            <a className="olguta-limit-email" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>{' '}
            — îți răspundem personal.
          </p>

          <div className="olguta-limit-divider" aria-hidden="true">✦</div>

          <p className="olguta-limit-en">
            Thank you for the lovely chat! For detailed questions or larger orders,
            please email us at{' '}
            <a className="olguta-limit-email" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>{' '}
            — we&apos;ll respond personally.
          </p>

          <button
            type="button"
            className="olguta-limit-close"
            onClick={onClose}
            autoFocus
          >
            Închide / Close
          </button>
        </div>
      </div>
    </>
  )
}
