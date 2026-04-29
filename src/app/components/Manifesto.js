'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function ManifestoLine({ children, delay, style = {} }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
      style={style}
    >
      {children}
    </motion.p>
  )
}

export default function Manifesto() {
  const dividerRef = useRef(null)
  const enBlockRef = useRef(null)
  const dividerIn  = useInView(dividerRef, { once: true, margin: '-80px' })
  const enBlockIn  = useInView(enBlockRef, { once: true, margin: '-80px' })

  const base = {
    margin: 0,
    fontFamily: 'Georgia, "Times New Roman", serif',
    textAlign: 'center',
    lineHeight: 1.9,
  }

  const prominent = {
    ...base,
    color: '#F5E6C8',
    fontSize: 'clamp(1.25rem, 3vw, 1.9rem)',
    fontFamily: 'var(--font-cinzel), "Palatino Linotype", Georgia, serif',
    fontWeight: 700,
    letterSpacing: '0.04em',
    marginBottom: 'clamp(2rem, 4vw, 3rem)',
    textShadow: '0 0 40px rgba(212,160,23,0.2)',
  }

  const body = {
    ...base,
    color: '#A8957A',
    fontSize: 'clamp(0.95rem, 1.9vw, 1.15rem)',
    marginBottom: 'clamp(2rem, 4vw, 3rem)',
  }

  const enBase = {
    ...base,
    color: '#7a6a54',
    fontSize: 'clamp(0.82rem, 1.6vw, 0.98rem)',
    fontStyle: 'italic',
  }

  return (
    <section style={{
      backgroundColor: '#000',
      width: '100%',
      padding: 'clamp(120px, 14vw, 200px) clamp(1.5rem, 5vw, 4rem)',
    }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>

        {/* RO Block 1 — prominent opening */}
        <ManifestoLine delay={0} style={prominent}>
          Basarabia nu e doar un magazin.
        </ManifestoLine>

        {/* RO Block 2 — memory */}
        <ManifestoLine delay={0.8} style={body}>
          E memoria unui gust. E drumul spre casă,<br />
          păstrat într-un borcan, într-o pâine,<br />
          într-o bucată de brânză.
        </ManifestoLine>

        {/* RO Block 3 — concept store */}
        <ManifestoLine delay={1.6} style={body}>
          E un Concept Store — un loc unde măcelarul, brutarul și cofetarul lucrează sub același acoperiș.{' '}
          Carnea o tranșăm noi. Pâinea și patiseria le facem în casă, în fiecare dimineață, după rețete autentice.
        </ManifestoLine>

        {/* RO Block 4a — closing line */}
        <ManifestoLine delay={2.4} style={{ ...body, marginBottom: '0.6rem' }}>
          Am adus cămara bunicii tale în Anglia —
        </ManifestoLine>

        {/* RO Block 4b — closing line, italic gold */}
        <ManifestoLine delay={3.2} style={{
          ...base,
          color: '#D4A017',
          fontSize: 'clamp(0.95rem, 1.9vw, 1.15rem)',
          fontStyle: 'italic',
          marginBottom: 'clamp(3rem, 6vw, 4.5rem)',
        }}>
          ca să nu uiți niciodată cine ești.
        </ManifestoLine>

        {/* ── Divider ── */}
        <motion.div
          ref={dividerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={dividerIn ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vw, 4.5rem)' }}
        >
          <span style={{ color: '#D4A017', fontSize: '1rem' }}>✦</span>
        </motion.div>

        {/* ── English block (fades in as one unit) ── */}
        <motion.div
          ref={enBlockRef}
          initial={{ opacity: 0, y: 20 }}
          animate={enBlockIn ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* EN Block 1 — prominent */}
          <p style={{
            ...enBase,
            fontSize: 'clamp(1rem, 2.2vw, 1.4rem)',
            fontFamily: 'var(--font-cinzel), "Palatino Linotype", Georgia, serif',
            fontWeight: 700,
            fontStyle: 'normal',
            color: '#7a6a54',
            letterSpacing: '0.03em',
            marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
          }}>
            Basarabia is more than a shop.
          </p>

          {/* EN Block 2 — memory */}
          <p style={{ ...enBase, marginBottom: 'clamp(1.5rem, 3vw, 2rem)' }}>
            It is the memory of a taste. The road back home, kept in a jar,
            in a loaf of bread, in a piece of cheese.
          </p>

          {/* EN Block 3 — concept store */}
          <p style={{ ...enBase, marginBottom: 'clamp(1.5rem, 3vw, 2rem)' }}>
            It is a Concept Store — a place where the butcher, the baker, and the pastry chef
            all work under the same roof. We cut our meat in-house. Our bread and pastries are
            made fresh every morning, from authentic traditional recipes.
          </p>

          {/* EN Block 4 — closing */}
          <p style={{ ...enBase, marginBottom: '0.5rem' }}>
            We brought your grandmother&apos;s pantry to England —
          </p>
          <p style={{ ...enBase, color: '#D4A017' }}>
            so you never forget who you are.
          </p>
        </motion.div>

      </div>
    </section>
  )
}
