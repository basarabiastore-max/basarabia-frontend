'use client'

import Image from 'next/image'

export default function TantiOlgutaAnchor({ onClick }) {
  return (
    <>
      <style>{`
        @keyframes olgutaPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(212,160,23,0.55); opacity: 1; }
          50%      { box-shadow: 0 0 0 6px rgba(212,160,23,0); opacity: 0.85; }
        }
        .olguta-anchor {
          position: fixed;
          bottom: calc(24px + env(safe-area-inset-bottom));
          right: calc(24px + env(safe-area-inset-right));
          z-index: 90;
          width: 220px;
          height: 64px;
          padding: 0 14px;
          display: flex;
          align-items: center;
          gap: 12px;
          background: linear-gradient(135deg, #1f0a0a 0%, #2a0e0e 100%);
          border: 1px solid rgba(212,160,23,0.6);
          border-radius: 8px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.5);
          cursor: pointer;
          transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
          font-family: Georgia, "Times New Roman", serif;
          color: #F5E6C8;
          text-align: left;
        }
        .olguta-anchor:hover {
          transform: translateY(-2px);
          border-color: rgba(212,160,23,1);
          box-shadow: 0 10px 28px rgba(0,0,0,0.55);
        }
        .olguta-avatar-wrap {
          position: relative;
          flex-shrink: 0;
          width: 40px;
          height: 40px;
        }
        .olguta-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1.5px solid rgba(212,175,55,0.5);
          overflow: hidden;
          background: #1a0606;
          display: block;
        }
        .olguta-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .olguta-pulse-dot {
          position: absolute;
          top: -1px;
          right: -1px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #D4A017;
          animation: olgutaPulse 2s ease-in-out infinite;
        }
        .olguta-anchor-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }
        .olguta-anchor-line-ro {
          font-family: var(--font-cinzel, "Cinzel Decorative", serif);
          font-size: 12px;
          letter-spacing: 0.08em;
          color: #D4A017;
          line-height: 1.2;
          text-transform: uppercase;
          font-weight: 700;
        }
        .olguta-anchor-line-en {
          font-family: Georgia, serif;
          font-style: italic;
          font-size: 11px;
          color: rgba(245,230,200,0.6);
          line-height: 1.2;
          letter-spacing: 0.02em;
        }

        @media (max-width: 480px) {
          .olguta-anchor {
            bottom: calc(16px + env(safe-area-inset-bottom));
            right: calc(16px + env(safe-area-inset-right));
            width: 200px;
            height: 60px;
          }
        }
      `}</style>

      <button
        type="button"
        onClick={onClick}
        className="olguta-anchor"
        aria-label="Întreab-o pe Tanti Olguța — Ask Tanti Olguța"
      >
        <span className="olguta-avatar-wrap">
          <span className="olguta-avatar">
            <Image
              src="/tanti-olguta-avatar.png"
              alt="Tanti Olguța"
              width={40}
              height={40}
              priority
            />
          </span>
          <span className="olguta-pulse-dot" aria-hidden="true" />
        </span>
        <span className="olguta-anchor-text">
          <span className="olguta-anchor-line-ro">Întreab-o pe Tanti Olguța</span>
          <span className="olguta-anchor-line-en">Ask Tanti Olguța</span>
        </span>
      </button>
    </>
  )
}
