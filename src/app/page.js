'use client'

import { motion, AnimatePresence, useInView } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import PantryReveal from './components/PantryReveal'

// ── Typewriter variants ────────────────────────────────────────────────────
const sentence = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { delay: 0.6, staggerChildren: 0.06 },
  },
}

const letter = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.08, ease: 'easeOut' },
  },
}

const cursor = {
  hidden: { opacity: 0 },
  visible: {
    opacity: [1, 1, 0, 0],
    transition: {
      delay: 2.2,
      duration: 0.8,
      repeat: Infinity,
      repeatType: 'loop',
      times: [0, 0.4, 0.5, 1],
    },
  },
}

export default function Home() {
  const [videoEnded, setVideoEnded] = useState(false)
  const canvasRef = useRef(null)
  const videoRef  = useRef(null)
  const [revealing, setRevealing] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles = Array.from({ length: 80 }, () => ({
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height,
      r:     1.5 + Math.random() * 3.5,
      vy:    0.25 + Math.random() * 0.55,
      vx:    (Math.random() - 0.5) * 0.4,
      alpha: 0.3 + Math.random() * 0.6,
    }))

    let animId
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        // outer glow
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3.5)
        glow.addColorStop(0,   `rgba(212,160,23,${p.alpha})`)
        glow.addColorStop(0.4, `rgba(212,160,23,${p.alpha * 0.4})`)
        glow.addColorStop(1,   'rgba(212,160,23,0)')
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 3.5, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()
        // bright core
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,210,80,${p.alpha})`
        ctx.fill()

        p.y -= p.vy
        p.x += p.vx
        if (p.y + p.r < 0)       p.y = canvas.height + p.r
        if (p.x < 0)             p.x = canvas.width
        if (p.x > canvas.width)  p.x = 0
      })
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  useEffect(() => {
    const onScroll = () => {
      if (!videoRef.current) return
      videoRef.current.style.transform = `translateY(calc(-50% + ${window.scrollY * 0.2}px))`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Sound: sync video mute state with the global sound toggle ─────────────
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // React's `muted` prop is unreliable on video elements — set it imperatively.
    // This guarantees muted autoplay works on every browser including Safari.
    video.muted = true

    // Re-apply sound state on SPA re-navigation (e.g. homepage → /shop → back).
    // basarabia_sound_enabled being true means the user has previously clicked the
    // toggle, which counts as a prior gesture — safe to unmute programmatically.
    if (localStorage.getItem('basarabia_sound_enabled') === 'true') {
      video.volume = 1
      video.muted  = false
    }

    const onSoundChange = (e) => {
      if (!videoRef.current) return
      if (e.detail.enabled) {
        videoRef.current.volume = 1
        videoRef.current.muted  = false
      } else {
        videoRef.current.muted = true
      }
    }

    window.addEventListener('basarabia:sound-change', onSoundChange)
    return () => window.removeEventListener('basarabia:sound-change', onSoundChange)
  }, [])

  return (
    <div style={{ margin: 0, padding: 0, backgroundColor: '#000' }}>

      <Navbar />
      <section
        style={{
          width: '100vw',
          height: '100vh',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#000',
        }}
      >

        {/* ── CSS KEYFRAMES ─────────────────────────────────────────────────── */}
        <style>{`
          @keyframes scrollPulse {
            0%, 100% { opacity: 0.3; }
            50%       { opacity: 1;   }
          }
          @keyframes borderFadeIn {
            from { opacity: 0; }
            to   { opacity: 1; }
          }
        `}</style>

        {/* ── PARTICLES ─────────────────────────────────────────────────────── */}
        <canvas ref={canvasRef} style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%', height: '100%',
          zIndex: 1,
          pointerEvents: 'none',
        }} />

        {/* ── VIDEO — right side, fitted ─────────────────────────────────────── */}
        <motion.video
          ref={videoRef}
          className="hero-video"
          autoPlay
          muted
          playsInline
          onEnded={() => {
            setVideoEnded(true)
            const video = videoRef.current
            if (!video || video.muted) return
            // Fade audio out over 3 seconds, then silence
            const startVol = video.volume
            const start    = performance.now()
            const tick = (now) => {
              if (!videoRef.current || videoRef.current.muted) return
              const t = Math.min((now - start) / 3000, 1)
              videoRef.current.volume = startVol * (1 - t)
              if (t < 1) {
                requestAnimationFrame(tick)
              } else {
                videoRef.current.muted  = true
                videoRef.current.volume = 1
              }
            }
            requestAnimationFrame(tick)
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: 'easeIn' }}
          style={{
            position: 'absolute',
            right: '2%',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '26%',
            height: '88%',
            objectFit: 'contain',
            objectPosition: 'center center',
            display: 'block',
            mixBlendMode: 'screen',
            maskImage: 'linear-gradient(to right, transparent 0%, black 18% 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 18% 100%)',
          }}
        >
          <source src="/olguta.mp4" type="video/mp4" />
        </motion.video>

        {/* ── LEFT EDGE GRADIENT ─────────────────────────────────────────────── */}
        <div style={{
          position: 'absolute',
          left: 0, top: 0,
          width: '60%', height: '100%',
          background: 'linear-gradient(to right, #000000 30%, transparent 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }} />

        {/* ── RIGHT EDGE GRADIENT ───────────────────────────────────────────── */}
        <div style={{
          position: 'absolute',
          top: 0, right: 0,
          width: '25%', height: '100%',
          background: 'linear-gradient(to right, transparent, #000000)',
          zIndex: 2,
          pointerEvents: 'none',
        }} />

        {/* ── TOP + BOTTOM VIGNETTE ──────────────────────────────────────────── */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 18%),' +
            'linear-gradient(to top,    rgba(0,0,0,0.6) 0%, transparent 22%)',
        }} />

        {/* ── TEXT — left overlay ────────────────────────────────────────────── */}
        <div className="hero-text" style={{
          position: 'absolute', inset: 0, zIndex: 3,
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center', alignItems: 'flex-start',
          padding: 'clamp(2.5rem, 6vw, 5rem)',
          paddingLeft: 'clamp(3.5rem, 8vw, 7rem)',
          fontFamily: 'Georgia, "Times New Roman", serif',
        }}>
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              color: '#D4A017',
              fontSize: '0.88rem',
              letterSpacing: '0.42em',
              textTransform: 'uppercase',
              fontFamily: 'Arial, sans-serif',
              margin: '0 0 1.4rem',
            }}
          >
            Basarabia · Concept Store
          </motion.p>

          {/* Decorative swash */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.55rem',
              marginBottom: '1rem', transformOrigin: 'left center',
            }}
          >
            <div style={{ height: '1px', width: '36px', background: 'linear-gradient(to right, transparent, #D4A017)' }} />
            <span style={{ color: '#D4A017', fontSize: '0.8rem' }}>✦</span>
            <div style={{ height: '1px', width: '36px', background: 'linear-gradient(to left, transparent, #D4A017)' }} />
          </motion.div>

          {/* Typewriter heading */}
          <motion.h1
            variants={sentence}
            initial="hidden"
            animate="visible"
            style={{
              fontFamily: 'var(--font-cinzel), "Palatino Linotype", Georgia, serif',
              color: '#F5E6C8',
              fontSize: 'clamp(1.8rem, 3.8vw, 3.4rem)',
              fontWeight: 900,
              lineHeight: 1.18,
              margin: '0 0 0.25rem',
              letterSpacing: '0.02em',
              textShadow: '0 0 50px rgba(212,160,23,0.28), 0 2px 14px rgba(0,0,0,0.9)',
              display: 'block',
            }}
          >
            {'Bine ai venit,'.split('').map((char, i) => (
              <motion.span key={`a-${i}`} variants={letter}>
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
            <br />
            {'Mamaie!'.split('').map((char, i) => (
              <motion.span key={`b-${i}`} variants={letter}>
                {char}
              </motion.span>
            ))}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 2.4 }}
            style={{
              color: '#7a6a54',
              fontStyle: 'italic',
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(0.85rem, 1.6vw, 1.05rem)',
              margin: '1rem 0 0',
              lineHeight: 1.6,
            }}
          >
            Gustul de Acasă livrat la ușa ta
          </motion.p>
        </div>

        {/* ── CUMPĂRĂ ACUM — bottom center, appears after video ends ─────────── */}
        <AnimatePresence>
          {videoEnded && (
            <motion.div
              key="cta"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="hero-cta"
              style={{
                position: 'absolute',
                top: '70%',
                right: '2%',
                width: '26%',
                display: 'flex',
                justifyContent: 'center',
                zIndex: 5,
              }}
            >
              <button
                onClick={() => setRevealing(true)}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  textDecoration: "none",
                  display: "block",
                  fontFamily: 'var(--font-cinzel), Georgia, "Palatino Linotype", serif',
                  fontSize: "clamp(1.2rem, 2.2vw, 1.7rem)",
                  fontWeight: 700,
                  color: "#F5E6C8",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  textAlign: "center",
                  textShadow:
                    "0 0 30px rgba(212,160,23,0.6)," +
                    "0 2px 8px rgba(0,0,0,0.9)",
                }}
              >
                Cumpără Acum
              </button>
              {/* Underline accent */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  height: '1px',
                  marginTop: '0.5rem',
                  background: 'linear-gradient(to right, transparent, #D4A017, transparent)',
                  transformOrigin: 'center',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── VIGNETTE GLOW ─────────────────────────────────────────────────── */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(139,26,26,0.25) 100%)',
        }} />

        {/* ── ANIMATED BORDER ───────────────────────────────────────────────── */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none',
          border: '1px solid rgba(212,160,23,0.15)',
          animation: 'borderFadeIn 2s ease forwards',
          opacity: 0,
        }} />

        {/* ── SCROLL INDICATOR — hidden once CTA appears ────────────────────── */}
        <motion.div
          animate={{ opacity: videoEnded ? 0 : 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            bottom: '25px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pointerEvents: 'none',
          }}
        >
          <span style={{
            color: '#D4A017',
            fontSize: '0.6rem',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            textAlign: 'center',
          }}>scroll</span>
          <div style={{
            width: '1px',
            height: '30px',
            background: '#D4A017',
            margin: '8px auto 0',
            animation: 'scrollPulse 1.5s ease-in-out infinite',
          }} />
        </motion.div>

        {/* Gold top strip */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '3px', zIndex: 10,
          background: 'linear-gradient(90deg, #8B1A1A 0%, #D4A017 35%, #8B1A1A 65%, #D4A017 82%, #8B1A1A 100%)',
        }} />

        {/* Gold bottom strip */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', zIndex: 10,
          background: 'linear-gradient(90deg, #8B1A1A 0%, #D4A017 35%, #8B1A1A 65%, #D4A017 82%, #8B1A1A 100%)',
        }} />

      </section>

      {/* ── BRAND MANIFESTO ───────────────────────────────────────────────── */}
      <Manifesto />

      {/* ── SECTION 2 — Why Us ─────────────────────────────────────────────── */}
      <section style={{
        backgroundColor: '#0a0a0a',
        width: '100%',
        padding: '60px 40px',
      }}>
        {/* Eyebrow + title */}
        <div style={{ textAlign: 'center', marginBottom: '70px' }}>
          <p style={{
            color: '#D4A017',
            fontSize: '0.7rem',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            fontFamily: 'Arial, sans-serif',
            margin: '0 0 1.2rem',
          }}>
            De Ce Noi?
          </p>
          <div style={{
            width: '60px', height: '1px',
            background: '#D4A017',
            margin: '0 auto',
          }} />
        </div>

        {/* Three columns */}
        <div className="why-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '60px',
          maxWidth: '1100px',
          margin: '0 auto',
        }}>
          {[
            { symbol: '✦', title: 'Autentic',      desc: 'Produse originale direct din Patria Natala, fără compromisuri.' },
            { symbol: '✿', title: 'Tradițional',   desc: 'Rețete transmise din generație în generație.' },
            { symbol: '🚚', title: 'Livrat Rapid',  desc: 'Livrare rapidă la cea mai inalta calitate.' },
          ].map(item => (
            <div key={item.title} style={{ textAlign: 'center' }}>
              <div style={{
                color: '#D4A017',
                fontSize: '2rem',
                marginBottom: '24px',
              }}>
                {item.symbol}
              </div>
              <h3 style={{
                color: '#F5E6C8',
                fontSize: '1.1rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontFamily: 'Georgia, serif',
                fontWeight: 700,
                margin: '0 0 16px',
              }}>
                {item.title}
              </h3>
              <p style={{
                color: '#7a6a54',
                fontStyle: 'italic',
                fontSize: '0.9rem',
                lineHeight: 1.8,
                fontFamily: 'Georgia, serif',
                margin: 0,
              }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── DELIVERY ZONES ────────────────────────────────────────────────── */}
      <DeliveryZones />

      {/* ── NEWSLETTER ────────────────────────────────────────────────────── */}
      <NewsletterSignup />

      <Footer />

      {revealing && (
        <PantryReveal onComplete={() => router.push("/shop")} />
      )}

    </div>
  )
}

// ── BRAND MANIFESTO (unified bilingual) ────────────────────────────────────
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

function Manifesto() {
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

// ── DELIVERY ZONES ──────────────────────────────────────────────────────────
const TOWNS = ['Spalding', 'Holbeach', 'Bourne', 'Boston', 'Peterborough']

function DeliveryZones() {
  const svgRef      = useRef(null)
  const headRef     = useRef(null)
  const subRef      = useRef(null)
  const townsRef    = useRef(null)
  const footnoteRef = useRef(null)
  const dividerRef  = useRef(null)
  const enRef       = useRef(null)

  const svgIn      = useInView(svgRef,      { once: true, margin: '-80px' })
  const headIn     = useInView(headRef,     { once: true, margin: '-80px' })
  const subIn      = useInView(subRef,      { once: true, margin: '-80px' })
  const townsIn    = useInView(townsRef,    { once: true, margin: '-80px' })
  const footnoteIn = useInView(footnoteRef, { once: true, margin: '-80px' })
  const dividerIn  = useInView(dividerRef,  { once: true, margin: '-80px' })
  const enIn       = useInView(enRef,       { once: true, margin: '-80px' })

  const fadeIn = (inView, delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] },
  })

  const base = {
    margin: 0,
    fontFamily: 'Georgia, "Times New Roman", serif',
    textAlign: 'center',
  }

  return (
    <section style={{
      backgroundColor: '#000',
      width: '100%',
      padding: 'clamp(120px, 14vw, 200px) clamp(1.5rem, 5vw, 4rem)',
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        {/* ── Concentric-circle radius visual ── */}
        <motion.div
          ref={svgRef}
          {...fadeIn(svgIn, 0)}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)' }}
        >
          <svg
            viewBox="0 0 200 200"
            style={{ width: 'clamp(120px, 22vw, 180px)', height: 'clamp(120px, 22vw, 180px)' }}
            aria-hidden="true"
          >
            {/* Outermost ring */}
            <circle cx="100" cy="100" r="90" fill="none" stroke="#D4A017" strokeWidth="1" opacity="0.07" />
            {/* Middle ring */}
            <circle cx="100" cy="100" r="64" fill="none" stroke="#D4A017" strokeWidth="1" opacity="0.12" />
            {/* Inner ring */}
            <circle cx="100" cy="100" r="38" fill="none" stroke="#D4A017" strokeWidth="1" opacity="0.18" />
            {/* Center glow */}
            <circle cx="100" cy="100" r="10" fill="#D4A017" opacity="0.15" />
            {/* Center dot */}
            <circle cx="100" cy="100" r="4"  fill="#D4A017" opacity="0.9" />
          </svg>
        </motion.div>

        {/* RO Headline */}
        <motion.p ref={headRef} {...fadeIn(headIn, 0.4)} style={{
          ...base,
          color: '#F5E6C8',
          fontSize: 'clamp(1.25rem, 3vw, 1.9rem)',
          fontFamily: 'var(--font-cinzel), "Palatino Linotype", Georgia, serif',
          fontWeight: 700,
          letterSpacing: '0.04em',
          marginBottom: 'clamp(1rem, 2vw, 1.4rem)',
          textShadow: '0 0 40px rgba(212,160,23,0.2)',
          lineHeight: 1.3,
        }}>
          Livrăm proaspăt pe o rază de 20 de mile.
        </motion.p>

        {/* RO Subheading */}
        <motion.p ref={subRef} {...fadeIn(subIn, 0.7)} style={{
          ...base,
          color: '#A8957A',
          fontSize: 'clamp(0.95rem, 1.9vw, 1.15rem)',
          fontStyle: 'italic',
          marginBottom: 'clamp(1.8rem, 3.5vw, 2.5rem)',
          lineHeight: 1.7,
        }}>
          Aceeași zi sau a doua zi — fără excepții.
        </motion.p>

        {/* RO Towns */}
        <motion.p ref={townsRef} {...fadeIn(townsIn, 1.0)} style={{
          ...base,
          color: '#A8957A',
          fontSize: 'clamp(0.95rem, 1.9vw, 1.15rem)',
          letterSpacing: '0.08em',
          lineHeight: 2,
          marginBottom: 'clamp(1.2rem, 2.5vw, 1.8rem)',
          flexWrap: 'wrap',
        }}>
          {TOWNS.map((town, i) => (
            <motion.span
              key={town}
              initial={{ opacity: 0 }}
              animate={townsIn ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 1.0 + i * 0.08, ease: 'easeOut' }}
            >
              {town}{i < TOWNS.length - 1 && <span style={{ color: '#D4A017', margin: '0 0.5em' }}>·</span>}
            </motion.span>
          ))}
        </motion.p>

        {/* RO Footnote */}
        <motion.p ref={footnoteRef} {...fadeIn(footnoteIn, 1.5)} style={{
          ...base,
          color: '#7a6a54',
          fontSize: 'clamp(0.78rem, 1.4vw, 0.88rem)',
          fontStyle: 'italic',
          marginBottom: 'clamp(3rem, 6vw, 4.5rem)',
          lineHeight: 1.7,
        }}>
          Pentru comenzi în afara acestei raze, contactați-ne direct.
        </motion.p>

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

        {/* ── English block (one unit) ── */}
        <motion.div
          ref={enRef}
          initial={{ opacity: 0, y: 20 }}
          animate={enIn ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <p style={{
            ...base,
            color: '#7a6a54',
            fontSize: 'clamp(1rem, 2.2vw, 1.4rem)',
            fontFamily: 'var(--font-cinzel), "Palatino Linotype", Georgia, serif',
            fontWeight: 700,
            fontStyle: 'normal',
            letterSpacing: '0.03em',
            marginBottom: 'clamp(1rem, 2vw, 1.4rem)',
            lineHeight: 1.3,
          }}>
            We deliver fresh within a 20-mile radius.
          </p>
          <p style={{
            ...base,
            color: '#7a6a54',
            fontSize: 'clamp(0.82rem, 1.6vw, 0.98rem)',
            fontStyle: 'italic',
            marginBottom: 'clamp(1.2rem, 2.5vw, 1.8rem)',
            lineHeight: 1.7,
          }}>
            Same day or next day — no exceptions.
          </p>
          <p style={{
            ...base,
            color: '#7a6a54',
            fontSize: 'clamp(0.82rem, 1.6vw, 0.98rem)',
            letterSpacing: '0.08em',
            lineHeight: 2,
            marginBottom: 'clamp(1rem, 2vw, 1.4rem)',
          }}>
            {TOWNS.map((town, i) => (
              <span key={town}>
                {town}{i < TOWNS.length - 1 && <span style={{ color: '#D4A017', margin: '0 0.5em' }}>·</span>}
              </span>
            ))}
          </p>
          <p style={{
            ...base,
            color: '#7a6a54',
            fontSize: 'clamp(0.78rem, 1.4vw, 0.88rem)',
            fontStyle: 'italic',
            lineHeight: 1.7,
          }}>
            For orders outside this area, please contact us directly.
          </p>
        </motion.div>

      </div>
    </section>
  )
}

// ── NEWSLETTER SIGNUP ───────────────────────────────────────────────────────
function NewsletterSignup() {
  const headRef     = useRef(null)
  const bodyRef     = useRef(null)
  const formRef     = useRef(null)
  const footnoteRef = useRef(null)
  const dividerRef  = useRef(null)
  const enRef       = useRef(null)

  const headIn     = useInView(headRef,     { once: true, margin: '-80px' })
  const bodyIn     = useInView(bodyRef,     { once: true, margin: '-80px' })
  const formIn     = useInView(formRef,     { once: true, margin: '-80px' })
  const footnoteIn = useInView(footnoteRef, { once: true, margin: '-80px' })
  const dividerIn  = useInView(dividerRef,  { once: true, margin: '-80px' })
  const enIn       = useInView(enRef,       { once: true, margin: '-80px' })

  const [email,     setEmail]     = useState('')
  const [status,    setStatus]    = useState('idle') // idle | submitting | success | error
  const [errMsg,    setErrMsg]    = useState('')
  const [focussed,  setFocussed]  = useState(false)

  const fadeIn = (inView, delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] },
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    setStatus('submitting')
    setErrMsg('')
    try {
      const res = await fetch('/api/newsletter-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, language: 'ro' }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.error || 'Unknown error')
      setStatus('success')
      setEmail('')
      setTimeout(() => setStatus('idle'), 5000)
    } catch (err) {
      setErrMsg(err.message || 'A apărut o eroare. Încearcă din nou.')
      setStatus('error')
    }
  }

  const base = {
    margin: 0,
    fontFamily: 'Georgia, "Times New Roman", serif',
    textAlign: 'center',
  }

  const inputStyle = {
    flex: 1,
    minWidth: 0,
    background: 'transparent',
    border: `1px solid ${focussed ? '#D4A017' : 'rgba(212,160,23,0.4)'}`,
    borderRadius: '4px',
    color: '#F5E6C8',
    fontSize: '0.95rem',
    padding: '14px 16px',
    outline: 'none',
    fontFamily: 'Georgia, serif',
    boxShadow: focussed ? '0 0 10px rgba(212,160,23,0.18)' : 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  }

  return (
    <section style={{
      backgroundColor: '#000',
      width: '100%',
      padding: 'clamp(120px, 14vw, 200px) clamp(1.5rem, 5vw, 4rem)',
    }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>

        {/* RO Headline */}
        <motion.p ref={headRef} {...fadeIn(headIn, 0)} style={{
          ...base,
          color: '#F5E6C8',
          fontSize: 'clamp(1.25rem, 3vw, 1.9rem)',
          fontFamily: 'var(--font-cinzel), "Palatino Linotype", Georgia, serif',
          fontWeight: 700,
          letterSpacing: '0.04em',
          lineHeight: 1.3,
          marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
          textShadow: '0 0 40px rgba(212,160,23,0.2)',
        }}>
          Duminică dimineața, în cutia ta poștală.
        </motion.p>

        {/* RO Body */}
        <motion.p ref={bodyRef} {...fadeIn(bodyIn, 0.8)} style={{
          ...base,
          color: '#A8957A',
          fontSize: 'clamp(0.95rem, 1.9vw, 1.15rem)',
          lineHeight: 1.9,
          marginBottom: 'clamp(2rem, 4vw, 2.8rem)',
        }}>
          Primește rețeta săptămânii de la Tanti Olguța — gătită cu produse care chiar se găsesc la noi în magazin.{' '}
          Povești de acasă. Secrete de bucătărie. Nimic altceva.
        </motion.p>

        {/* Form */}
        <motion.div ref={formRef} {...fadeIn(formIn, 1.4)}>
          {status === 'success' ? (
            <p style={{
              ...base,
              color: '#D4A017',
              fontFamily: 'var(--font-cinzel), Georgia, serif',
              fontSize: 'clamp(0.95rem, 1.9vw, 1.15rem)',
              letterSpacing: '0.08em',
              padding: '14px 0',
            }}>
              Mulțumim! / Thank you!
            </p>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {/* Visually hidden label */}
              <label
                htmlFor="newsletter-email"
                style={{
                  position: 'absolute',
                  width: '1px', height: '1px',
                  padding: 0, margin: '-1px',
                  overflow: 'hidden',
                  clip: 'rect(0,0,0,0)',
                  whiteSpace: 'nowrap',
                  border: 0,
                }}
              >
                Adresa ta de email
              </label>

              <div className="newsletter-form-row" style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'stretch',
              }}>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={e => { setEmail(e.target.value); setErrMsg('') }}
                  onFocus={() => setFocussed(true)}
                  onBlur={() => setFocussed(false)}
                  placeholder="adresa@email.com"
                  style={{
                    ...inputStyle,
                    ...(status === 'error' ? {
                      borderColor: 'rgba(180,50,50,0.7)',
                      boxShadow: '0 0 8px rgba(180,50,50,0.15)',
                    } : {}),
                  }}
                />
                <button
                  type="submit"
                  aria-label="Mă abonez la newsletter"
                  disabled={status === 'submitting'}
                  style={{
                    background: status === 'submitting' ? 'rgba(212,160,23,0.6)' : '#D4A017',
                    color: '#000',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '14px 22px',
                    fontFamily: 'var(--font-cinzel), Georgia, serif',
                    fontSize: 'clamp(0.7rem, 1.3vw, 0.82rem)',
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    cursor: status === 'submitting' ? 'wait' : 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'background 0.2s, box-shadow 0.2s',
                  }}
                  onMouseEnter={e => { if (status !== 'submitting') e.currentTarget.style.boxShadow = '0 0 16px rgba(212,160,23,0.5)' }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none' }}
                >
                  {status === 'submitting' ? '...' : 'Mă abonez'}
                </button>
              </div>

              {status === 'error' && errMsg && (
                <p style={{
                  ...base,
                  color: 'rgba(200,80,80,0.9)',
                  fontSize: '0.82rem',
                  marginTop: '8px',
                  fontStyle: 'italic',
                }}>
                  {errMsg}
                </p>
              )}
            </form>
          )}
        </motion.div>

        {/* RO Footnote */}
        <motion.p ref={footnoteRef} {...fadeIn(footnoteIn, 1.9)} style={{
          ...base,
          color: '#7a6a54',
          fontSize: 'clamp(0.78rem, 1.4vw, 0.88rem)',
          fontStyle: 'italic',
          marginTop: 'clamp(1rem, 2vw, 1.4rem)',
          marginBottom: 'clamp(3rem, 6vw, 4.5rem)',
          lineHeight: 1.7,
        }}>
          Fără spam. Dezabonare oricând.
        </motion.p>

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

        {/* ── English block (no duplicate form) ── */}
        <motion.div
          ref={enRef}
          initial={{ opacity: 0, y: 20 }}
          animate={enIn ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <p style={{
            ...base,
            color: '#7a6a54',
            fontSize: 'clamp(1rem, 2.2vw, 1.4rem)',
            fontFamily: 'var(--font-cinzel), "Palatino Linotype", Georgia, serif',
            fontWeight: 700,
            fontStyle: 'normal',
            letterSpacing: '0.03em',
            lineHeight: 1.3,
            marginBottom: 'clamp(1rem, 2vw, 1.4rem)',
          }}>
            Every Sunday morning, in your inbox.
          </p>
          <p style={{
            ...base,
            color: '#7a6a54',
            fontSize: 'clamp(0.82rem, 1.6vw, 0.98rem)',
            fontStyle: 'italic',
            lineHeight: 1.9,
            marginBottom: 'clamp(0.6rem, 1.2vw, 0.9rem)',
          }}>
            Receive Tanti Olguța&apos;s recipe of the week — cooked with products you&apos;ll actually find in our shop.
            Stories from home. Kitchen secrets. Nothing else.
          </p>
          <p style={{
            ...base,
            color: '#7a6a54',
            fontSize: 'clamp(0.78rem, 1.4vw, 0.88rem)',
            fontStyle: 'italic',
            opacity: 0.7,
          }}>
            No spam. Unsubscribe anytime.
          </p>
        </motion.div>

      </div>

      {/* Mobile: stack form vertically */}
      <style>{`
        @media (max-width: 600px) {
          .newsletter-form-row {
            flex-direction: column !important;
          }
          .newsletter-form-row button {
            width: 100%;
          }
        }
      `}</style>
    </section>
  )
}
