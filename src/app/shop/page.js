'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { categories } from '@/lib/categories'
import {
  CARD_BG, CARD_HERO_BG,
  CARD_BORDER, CARD_BORDER_HOVER,
  CARD_SHADOW, CARD_SHADOW_HOVER,
  INNER_GLOW, INNER_GLOW_HOVER,
  CREAM,
} from '@/lib/brand'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function ShopPage() {
  return (
    <div
      style={{
        fontFamily: 'Georgia, "Times New Roman", serif',
        backgroundColor: '#0f0703',
        minHeight: '100vh',
      }}
    >
      {/* ── PAGE HEADER ──────────────────────────────────────────────────────── */}
      <header
        style={{
          background: [
            'radial-gradient(ellipse at 50% 0%, rgba(139,26,26,0.45) 0%, transparent 60%)',
            'linear-gradient(180deg, #1a0a05 0%, #110604 100%)',
          ].join(', '),
          borderBottom: '1px solid rgba(212,160,23,0.18)',
          padding: '0 clamp(1.5rem, 5vw, 4rem)',
        }}
      >
        {/* Top colour strip */}
        <div style={{
          height: '4px',
          background: 'linear-gradient(90deg, #8B1A1A 0%, #D4A017 35%, #1a3a0a 65%, #D4A017 82%, #8B1A1A 100%)',
          marginBottom: '0',
        }} />

        <div style={{
          maxWidth: '1300px',
          margin: '0 auto',
          padding: '1.8rem 0 1.6rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          flexWrap: 'wrap',
        }}>
          {/* Back link */}
          <Link
            href="/"
            style={{
              color: '#A8957A',
              fontFamily: 'Arial, sans-serif',
              fontSize: '0.8rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4em',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#D4A017' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#A8957A' }}
          >
            ← Acasă
          </Link>

          {/* Store name */}
          <div style={{ textAlign: 'center', flex: 1 }}>
            <p style={{
              color: '#D4A017',
              fontSize: '0.65rem',
              letterSpacing: '0.45em',
              textTransform: 'uppercase',
              fontFamily: 'Arial, sans-serif',
              margin: '0 0 0.3rem',
            }}>
              Basarabia · Concept Store
            </p>
            <h1 style={{
              fontFamily: 'var(--font-cinzel), "Palatino Linotype", Georgia, serif',
              color: '#F5E6C8',
              fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
              fontWeight: 700,
              margin: 0,
              letterSpacing: '0.04em',
              textShadow: '0 0 40px rgba(212,160,23,0.25)',
            }}>
              Magazin
            </h1>
          </div>

          {/* Spacer to balance flex */}
          <div style={{ width: '80px' }} />
        </div>
      </header>

      {/* ── MAIN CONTENT ─────────────────────────────────────────────────────── */}
      <main style={{ maxWidth: '1300px', margin: '0 auto', padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 5vw, 4rem)' }}>

        {/* Section intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <p style={{
            color: '#A8957A',
            fontStyle: 'italic',
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)',
            margin: '0 0 1.4rem',
          }}>
            Alege categoria ta preferată
          </p>
          {/* Ornamental divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center' }}>
            <div style={{ height: '1px', width: '80px', background: 'linear-gradient(to right, transparent, #8B1A1A)' }} />
            <span style={{ color: '#D4A017', fontSize: '1rem' }}>✦</span>
            <div style={{ height: '1px', width: '80px', background: 'linear-gradient(to left, transparent, #8B1A1A)' }} />
          </div>
        </motion.div>

        {/* ── CATEGORY GRID ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1.1rem',
          }}
        >
          {categories.map((cat, i) => (
            <CategoryCard key={cat.slug} cat={cat} i={i} />
          ))}
        </motion.div>
      </main>

      {/* ── FOOTER STRIP ─────────────────────────────────────────────────────── */}
      <footer style={{
        borderTop: '1px solid rgba(212,160,23,0.15)',
        padding: '2rem 1.5rem',
        textAlign: 'center',
        marginTop: '2rem',
      }}>
        <p style={{
          color: '#4a3a28',
          fontFamily: 'Arial, sans-serif',
          fontSize: '0.78rem',
          letterSpacing: '0.1em',
          margin: 0,
        }}>
          © {new Date().getFullYear()} Basarabia Concept Store · Spalding, UK
        </p>
      </footer>
    </div>
  )
}

function CategoryCard({ cat }) {
  const [hovered, setHovered] = useState(false)
  const baseBorder = cat.highlight ? `${cat.accent}55` : CARD_BORDER
  const hoverBorder = cat.highlight ? cat.accent : CARD_BORDER_HOVER
  const hoverShadow = cat.highlight
    ? `${CARD_SHADOW_HOVER}, 0 0 20px ${cat.accent}22`
    : CARD_SHADOW_HOVER

  return (
    <motion.div
      variants={cardVariants}
      style={{ cursor: 'pointer' }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onTapStart={() => setHovered(true)}
      onTap={() => setHovered(false)}
      onTapCancel={() => setHovered(false)}
    >
      <Link
        href={`/shop/${cat.slug}`}
        style={{ textDecoration: 'none', display: 'block', height: '100%' }}
      >
        <motion.div
          whileHover={{ y: -2, borderColor: hoverBorder, boxShadow: hoverShadow }}
          whileTap={{ y: -1, scale: 0.99 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.7rem',
            padding: '2rem 1.2rem 1.8rem',
            background: cat.highlight ? CARD_HERO_BG : CARD_BG,
            border: `1px solid ${baseBorder}`,
            borderRadius: '4px',
            boxShadow: CARD_SHADOW,
            textAlign: 'center',
            position: 'relative',
            zIndex: 0,
            overflow: 'hidden',
            minHeight: '160px',
          }}
        >
          {/* Inner glow — base layer */}
          <div style={{
            position: 'absolute', inset: 0,
            background: INNER_GLOW,
            pointerEvents: 'none',
            zIndex: -1,
          }} />

          {/* Inner glow — hover amplified */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.28 }}
            style={{
              position: 'absolute', inset: 0,
              background: INNER_GLOW_HOVER,
              pointerEvents: 'none',
              zIndex: -1,
            }}
          />

          {/* Top accent strip — hero cards only */}
          {cat.highlight && (
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              height: '3px',
              background: `linear-gradient(90deg, transparent, ${cat.accent}, transparent)`,
            }} />
          )}

          {/* Icon */}
          <motion.span
            whileHover={{ scale: 1.18, rotate: [0, -8, 8, 0] }}
            transition={{ duration: 0.4 }}
            style={{ fontSize: '2.6rem', lineHeight: 1, display: 'block' }}
          >
            {cat.icon}
          </motion.span>

          {/* English name */}
          <span style={{
            color: cat.highlight ? cat.accent : CREAM,
            fontSize: '0.85rem',
            fontWeight: 700,
            fontFamily: 'Arial, sans-serif',
            letterSpacing: '0.03em',
            lineHeight: 1.3,
          }}>
            {cat.nameEn}
          </span>

          {/* Romanian name */}
          <span style={{
            color: '#6a5a42',
            fontSize: '0.72rem',
            fontStyle: 'italic',
            fontFamily: 'Georgia, serif',
            lineHeight: 1.2,
          }}>
            {cat.nameRo}
          </span>

          {/* Bottom accent line */}
          <div style={{
            position: 'absolute', bottom: 0, left: '50%',
            transform: 'translateX(-50%)',
            width: '35%', height: '2px',
            background: `linear-gradient(to right, transparent, ${cat.accent}88, transparent)`,
          }} />
        </motion.div>
      </Link>
    </motion.div>
  )
}
