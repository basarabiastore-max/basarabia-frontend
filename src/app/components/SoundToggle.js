'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function SoundToggle() {
  // Always start OFF — React state in the layout persists across SPA navigation,
  // so cross-page persistence is handled automatically without reading localStorage here.
  const [enabled, setEnabled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggle = () => {
    const next = !enabled
    setEnabled(next)
    localStorage.setItem('basarabia_sound_enabled', String(next))
    window.dispatchEvent(new CustomEvent('basarabia:sound-change', { detail: { enabled: next } }))
  }

  if (!mounted) return null
  // Only the homepage has the Olguța hero video, so only render the toggle there.
  if (pathname !== '/') return null

  return (
    <>
      <style>{`
        @keyframes soundGlow {
          0%, 100% { box-shadow: 0 0 8px rgba(212,160,23,0.3), 0 0 0 0 rgba(212,160,23,0); }
          50%       { box-shadow: 0 0 20px rgba(212,160,23,0.7), 0 0 0 6px rgba(212,160,23,0.08); }
        }
        @media (prefers-reduced-motion: reduce) {
          .sound-toggle { animation: none !important; }
        }
        @media (max-width: 768px) {
          .sound-toggle { bottom: 16px !important; right: 16px !important; }
        }
      `}</style>
      <button
        className="sound-toggle"
        onClick={toggle}
        aria-label={enabled ? 'Disable sound' : 'Enable sound'}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 200,
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: 'rgba(0,0,0,0.88)',
          border: `1px solid rgba(212,160,23,${enabled ? 0.35 : 0.75})`,
          color: '#D4A017',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          animation: enabled ? 'none' : 'soundGlow 2s ease-in-out infinite',
          transition: 'border-color 0.25s',
          padding: 0,
          flexShrink: 0,
        }}
      >
        {enabled ? <SpeakerOnIcon /> : <SpeakerOffIcon />}
      </button>
    </>
  )
}

function SpeakerOnIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  )
}

function SpeakerOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  )
}
