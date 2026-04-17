'use client'

import { motion, AnimatePresence, useInView } from 'framer-motion'
import Link from 'next/link'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useState, useEffect, useRef } from 'react'

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
    // Only safe to unmute if the user has already clicked the sound button this
    // session (sessionStorage confirms the audio context was unlocked by a gesture).
    const soundEnabled  = localStorage.getItem('basarabia_sound_enabled') === 'true'
    const gestureGiven  = sessionStorage.getItem('basarabia_bell_played') === 'true'
    if (soundEnabled && gestureGiven) {
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
              <Link
                href="/shop"
                style={{
                  textDecoration: 'none',
                  display: 'block',
                  fontFamily: 'var(--font-cinzel), Georgia, "Palatino Linotype", serif',
                  fontSize: 'clamp(1.2rem, 2.2vw, 1.7rem)',
                  fontWeight: 700,
                  color: '#F5E6C8',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  textAlign: 'center',
                  textShadow:
                    '0 0 30px rgba(212,160,23,0.6),' +
                    '0 2px 8px rgba(0,0,0,0.9)',
                }}
              >
                Cumpără Acum
              </Link>
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

      <Footer />

    </div>
  )
}

// ── BRAND MANIFESTO ────────────────────────────────────────────────────────
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
  const base = {
    margin: 0,
    fontFamily: 'Georgia, "Times New Roman", serif',
    textAlign: 'center',
    lineHeight: 1.9,
  }

  return (
    <section style={{
      backgroundColor: '#000',
      width: '100%',
      padding: 'clamp(120px, 14vw, 200px) clamp(1.5rem, 5vw, 4rem)',
    }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>

        {/* Line 1 — prominent */}
        <ManifestoLine delay={0} style={{
          ...base,
          color: '#F5E6C8',
          fontSize: 'clamp(1.25rem, 3vw, 1.9rem)',
          fontFamily: 'var(--font-cinzel), "Palatino Linotype", Georgia, serif',
          fontWeight: 700,
          letterSpacing: '0.04em',
          marginBottom: 'clamp(2rem, 4vw, 3rem)',
          textShadow: '0 0 40px rgba(212,160,23,0.2)',
        }}>
          Basarabia nu e doar un magazin.
        </ManifestoLine>

        {/* Block 2 */}
        <ManifestoLine delay={0.8} style={{
          ...base,
          color: '#A8957A',
          fontSize: 'clamp(0.95rem, 1.9vw, 1.15rem)',
          marginBottom: 'clamp(2rem, 4vw, 3rem)',
        }}>
          E memoria unui gust. E drumul spre casă,<br />
          păstrat într-un borcan, într-o pâine,<br />
          într-o bucată de brânză.
        </ManifestoLine>

        {/* Line 3 */}
        <ManifestoLine delay={1.6} style={{
          ...base,
          color: '#A8957A',
          fontSize: 'clamp(0.95rem, 1.9vw, 1.15rem)',
          marginBottom: '0.6rem',
        }}>
          Am adus cămara bunicii tale în Anglia —
        </ManifestoLine>

        {/* Line 4 — italic, final */}
        <ManifestoLine delay={2.4} style={{
          ...base,
          color: '#D4A017',
          fontSize: 'clamp(0.95rem, 1.9vw, 1.15rem)',
          fontStyle: 'italic',
        }}>
          ca să nu uiți niciodată cine ești.
        </ManifestoLine>

      </div>
    </section>
  )
}
