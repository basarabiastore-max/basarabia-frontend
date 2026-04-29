'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Manifesto from '../components/Manifesto'
import WhyUs from '../components/WhyUs'

const fadeIn = (inView, delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: inView ? { opacity: 1, y: 0 } : {},
  transition: { duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] },
})

function OrnamentalDivider({ width = 60 }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.75rem',
    }}>
      <div style={{ height: '1px', width: `${width}px`, background: 'linear-gradient(to right, transparent, #D4A017)' }} />
      <span style={{ color: '#D4A017', fontSize: '0.9rem' }}>✦</span>
      <div style={{ height: '1px', width: `${width}px`, background: 'linear-gradient(to left, transparent, #D4A017)' }} />
    </div>
  )
}

export default function DespreNoiClient() {
  const headerRef = useRef(null)
  const enHeadRef = useRef(null)

  const headerIn = useInView(headerRef, { once: true, margin: '-80px' })
  const enHeadIn = useInView(enHeadRef, { once: true, margin: '-80px' })

  const baseHeading = {
    margin: 0,
    fontFamily: 'var(--font-cinzel), "Palatino Linotype", Georgia, serif',
    fontWeight: 900,
    letterSpacing: '0.06em',
    textShadow: '0 0 50px rgba(212,160,23,0.25)',
    color: '#F5E6C8',
    textAlign: 'center',
  }

  const baseSubtitle = {
    margin: 0,
    fontFamily: 'Georgia, "Times New Roman", serif',
    color: '#A8957A',
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 1.7,
  }

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{
        flex: 1,
        width: '100%',
        fontFamily: 'Georgia, "Times New Roman", serif',
      }}>
        {/* ── PAGE HEADER ────────────────────────────────────────────── */}
        <section style={{
          width: '100%',
          padding: 'clamp(6rem, 12vw, 10rem) clamp(1.5rem, 5vw, 4rem) clamp(2rem, 4vw, 3rem)',
        }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>

            {/* RO Header */}
            <motion.div ref={headerRef} {...fadeIn(headerIn, 0)} style={{ marginBottom: 'clamp(1.5rem, 3vw, 2rem)' }}>
              <div style={{ marginBottom: '2rem' }}>
                <OrnamentalDivider />
              </div>
              <h1 style={{
                ...baseHeading,
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                marginBottom: '1rem',
              }}>
                Despre Noi
              </h1>
              <p style={{
                ...baseSubtitle,
                fontSize: 'clamp(0.95rem, 1.9vw, 1.15rem)',
              }}>
                Povestea noastră
              </p>
            </motion.div>

            {/* EN Header */}
            <motion.div ref={enHeadRef} {...fadeIn(enHeadIn, 0.4)}>
              <p style={{
                ...baseHeading,
                color: '#7a6a54',
                fontSize: 'clamp(1rem, 2.2vw, 1.4rem)',
                fontWeight: 700,
                letterSpacing: '0.03em',
                textShadow: 'none',
                marginBottom: '0.8rem',
              }}>
                About Us
              </p>
              <p style={{
                ...baseSubtitle,
                color: '#7a6a54',
                fontSize: 'clamp(0.82rem, 1.6vw, 0.98rem)',
              }}>
                Our story
              </p>
            </motion.div>

          </div>
        </section>

        {/* ── MANIFESTO (shared with /) ──────────────────────────────── */}
        <Manifesto />

        {/* ── WHY US (shared with /) ─────────────────────────────────── */}
        <WhyUs />
      </main>

      <Footer />
    </div>
  )
}
