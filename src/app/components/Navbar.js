'use client'

import Link from 'next/link'
import { useState } from 'react'

const navItems = [
  { label: 'Produse',    href: '/shop' },
  { label: 'Despre Noi', href: '/despre-noi' },
  { label: 'Contact',    href: '/contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 100,
      background: 'transparent',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 40px',
    }}>
      <div />

      {/* Desktop links */}
      <div className="navbar-links" style={{ display: 'flex', gap: '40px' }}>
        {navItems.map(({ label, href }) => (
          <Link key={label} href={href} style={{
            fontFamily: 'Georgia, serif',
            color: '#D4A017',
            fontSize: '0.75rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            textDecoration: 'none',
          }}>{label}</Link>
        ))}
      </div>

      {/* Hamburger — mobile only */}
      <button
        className="hamburger-btn"
        onClick={() => setMenuOpen(o => !o)}
        style={{
          display: 'none',
          flexDirection: 'column',
          gap: '5px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
        }}
        aria-label="Menu"
      >
        {[0, 1, 2].map(i => (
          <span key={i} style={{
            display: 'block', width: '24px', height: '1.5px',
            backgroundColor: '#D4A017',
          }} />
        ))}
      </button>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="mobile-menu" style={{
          position: 'absolute',
          top: '100%', left: 0, right: 0,
          backgroundColor: 'rgba(0,0,0,0.96)',
          padding: '24px 25px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          borderTop: '1px solid rgba(212,160,23,0.2)',
        }}>
          {navItems.map(({ label, href }) => (
            <Link key={label} href={href} onClick={() => setMenuOpen(false)} style={{
              fontFamily: 'Georgia, serif',
              color: '#D4A017',
              fontSize: '0.85rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}>{label}</Link>
          ))}
        </div>
      )}

      {/* Bottom gold line */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '1px',
        background: 'linear-gradient(to right, transparent, #D4A017, transparent)',
      }} />
    </nav>
  )
}
