'use client'

import { useState, useEffect, useRef } from 'react'

export default function SoundToggle() {
  const [enabled, setEnabled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const bellRef = useRef(null)

  useEffect(() => {
    setMounted(true)
    setEnabled(localStorage.getItem('basarabia_sound_enabled') === 'true')
  }, [])

  const toggle = () => {
    const next = !enabled
    setEnabled(next)
    localStorage.setItem('basarabia_sound_enabled', String(next))
    window.dispatchEvent(new CustomEvent('basarabia:sound-change', { detail: { enabled: next } }))

    if (next && !localStorage.getItem('basarabia_bell_played')) {
      if (!bellRef.current) bellRef.current = new Audio('/doorbell.wav')
      bellRef.current.volume = 0.7
      bellRef.current.play().catch(() => {})
      localStorage.setItem('basarabia_bell_played', 'true')
    }
  }

  // Don't render until mounted — avoids hydration mismatch with localStorage
  if (!mounted) return null

  return (
    <>
      <style>{`
        @keyframes soundGlow {
          0%, 100% { box-shadow: 0 0 8px rgba(212,160,23,0.25); }
          50%       { box-shadow: 0 0 20px rgba(212,160,23,0.55); }
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
          border: `1px solid rgba(212,160,23,${enabled ? 0.35 : 0.7})`,
          color: '#D4A017',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          animation: enabled ? 'none' : 'soundGlow 2.4s ease-in-out infinite',
          transition: 'border-color 0.25s, box-shadow 0.25s',
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
