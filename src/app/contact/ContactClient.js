'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const ADDRESS_LINE     = 'Ground Floor, 11 Market Place, Spalding, PE11 1SL, United Kingdom'
const PHONE_DISPLAY    = '+44 7392 979694'
const PHONE_TEL        = '+447392979694'
const EMAIL            = 'contact@basarabia.co.uk'
const HOURS_RO         = 'Luni – Duminică, 09:00 – 20:00'
const HOURS_EN         = 'Monday – Sunday, 09:00 – 20:00'
const MAPS_EMBED_QUERY = encodeURIComponent(ADDRESS_LINE)
const MAPS_EMBED_SRC   = `https://www.google.com/maps?q=${MAPS_EMBED_QUERY}&output=embed`
const MAPS_LINK        = `https://www.google.com/maps/search/?api=1&query=${MAPS_EMBED_QUERY}`

const fadeIn = (inView, delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: inView ? { opacity: 1, y: 0 } : {},
  transition: { duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] },
})

const linkStyle = {
  color: '#F5E6C8',
  textDecoration: 'none',
  borderBottom: '1px solid rgba(212,160,23,0.4)',
  transition: 'color 0.2s, border-color 0.2s',
}

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

function DetailRowRo({ label, children, delay, inView }) {
  return (
    <motion.div {...fadeIn(inView, delay)} style={{ marginBottom: '1.6rem' }}>
      <p style={{
        margin: '0 0 0.45rem',
        color: '#D4A017',
        fontFamily: 'Arial, sans-serif',
        fontSize: '0.7rem',
        letterSpacing: '0.32em',
        textTransform: 'uppercase',
      }}>
        {label}
      </p>
      <div style={{
        margin: 0,
        color: '#F5E6C8',
        fontFamily: 'Georgia, "Times New Roman", serif',
        fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
        lineHeight: 1.7,
      }}>
        {children}
      </div>
    </motion.div>
  )
}

function DetailRowEn({ label, children, delay, inView }) {
  return (
    <motion.div {...fadeIn(inView, delay)} style={{ marginBottom: '1.4rem' }}>
      <p style={{
        margin: '0 0 0.4rem',
        color: '#D4A017',
        opacity: 0.7,
        fontFamily: 'Arial, sans-serif',
        fontSize: '0.65rem',
        letterSpacing: '0.32em',
        textTransform: 'uppercase',
      }}>
        {label}
      </p>
      <div style={{
        margin: 0,
        color: '#7a6a54',
        fontFamily: 'Georgia, "Times New Roman", serif',
        fontSize: 'clamp(0.85rem, 1.6vw, 1rem)',
        fontStyle: 'italic',
        lineHeight: 1.7,
      }}>
        {children}
      </div>
    </motion.div>
  )
}

export default function ContactClient() {
  const headerRef    = useRef(null)
  const enHeadRef    = useRef(null)
  const detailsRef   = useRef(null)
  const enDetailsRef = useRef(null)
  const mapRef       = useRef(null)

  const headerIn  = useInView(headerRef,    { once: true, margin: '-80px' })
  const enHeadIn  = useInView(enHeadRef,    { once: true, margin: '-80px' })
  const detailsIn = useInView(detailsRef,   { once: true, margin: '-80px' })
  const enDetIn   = useInView(enDetailsRef, { once: true, margin: '-80px' })
  const mapIn     = useInView(mapRef,       { once: true, margin: '-80px' })

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
      <style>{`
        .contact-link:hover { color: #D4A017 !important; border-bottom-color: #D4A017 !important; }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(2.5rem, 5vw, 4.5rem);
          align-items: start;
        }
        .contact-map-frame { height: 400px; }

        @media (max-width: 880px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: clamp(2.5rem, 6vw, 3.5rem);
          }
          .contact-map-frame { height: 280px; }
        }
      `}</style>

      <Navbar />

      <main style={{
        flex: 1,
        width: '100%',
        padding: 'clamp(6rem, 12vw, 10rem) clamp(1.5rem, 5vw, 4rem) clamp(4rem, 8vw, 6rem)',
        fontFamily: 'Georgia, "Times New Roman", serif',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

          {/* ── HEADER (RO) ─────────────────────────────────────────────── */}
          <motion.div ref={headerRef} {...fadeIn(headerIn, 0)} style={{ marginBottom: 'clamp(1.5rem, 3vw, 2rem)' }}>
            <div style={{ marginBottom: '2rem' }}>
              <OrnamentalDivider />
            </div>
            <h1 style={{
              ...baseHeading,
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              marginBottom: '1rem',
            }}>
              Contact
            </h1>
            <p style={{
              ...baseSubtitle,
              fontSize: 'clamp(0.95rem, 1.9vw, 1.15rem)',
            }}>
              Vino să ne vezi sau scrie-ne
            </p>
          </motion.div>

          {/* ── HEADER (EN) ─────────────────────────────────────────────── */}
          <motion.div
            ref={enHeadRef}
            {...fadeIn(enHeadIn, 0.4)}
            style={{ marginBottom: 'clamp(3rem, 6vw, 4.5rem)' }}
          >
            <p style={{
              ...baseHeading,
              color: '#7a6a54',
              fontSize: 'clamp(1rem, 2.2vw, 1.4rem)',
              fontWeight: 700,
              letterSpacing: '0.03em',
              textShadow: 'none',
              marginBottom: '0.8rem',
            }}>
              Contact
            </p>
            <p style={{
              ...baseSubtitle,
              color: '#7a6a54',
              fontSize: 'clamp(0.82rem, 1.6vw, 0.98rem)',
            }}>
              Come and visit us, or drop us a line
            </p>
          </motion.div>

          {/* ── DIVIDER ────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={enHeadIn ? { opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.6 }}
            style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vw, 4.5rem)' }}
          >
            <OrnamentalDivider width={80} />
          </motion.div>

          {/* ── TWO-COLUMN: details (left) + map (right) ───────────────── */}
          <div className="contact-grid">

            {/* ── CONTACT DETAILS ── */}
            <div>
              <div ref={detailsRef}>
                <DetailRowRo label="Adresă" delay={0} inView={detailsIn}>
                  {ADDRESS_LINE}
                </DetailRowRo>
                <DetailRowRo label="Telefon" delay={0.15} inView={detailsIn}>
                  <a href={`tel:${PHONE_TEL}`} className="contact-link" style={linkStyle}>
                    {PHONE_DISPLAY}
                  </a>
                </DetailRowRo>
                <DetailRowRo label="Email" delay={0.3} inView={detailsIn}>
                  <a href={`mailto:${EMAIL}`} className="contact-link" style={linkStyle}>
                    {EMAIL}
                  </a>
                </DetailRowRo>
                <DetailRowRo label="Program" delay={0.45} inView={detailsIn}>
                  {HOURS_RO}
                </DetailRowRo>
              </div>

              <motion.div
                {...fadeIn(detailsIn, 0.6)}
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  margin: 'clamp(1.5rem, 3vw, 2rem) 0 clamp(1.8rem, 3.5vw, 2.5rem)',
                }}
              >
                <OrnamentalDivider width={40} />
              </motion.div>

              <div ref={enDetailsRef}>
                <DetailRowEn label="Address" delay={0} inView={enDetIn}>
                  {ADDRESS_LINE}
                </DetailRowEn>
                <DetailRowEn label="Phone" delay={0.15} inView={enDetIn}>
                  <a href={`tel:${PHONE_TEL}`} className="contact-link" style={linkStyle}>
                    {PHONE_DISPLAY}
                  </a>
                </DetailRowEn>
                <DetailRowEn label="Email" delay={0.3} inView={enDetIn}>
                  <a href={`mailto:${EMAIL}`} className="contact-link" style={linkStyle}>
                    {EMAIL}
                  </a>
                </DetailRowEn>
                <DetailRowEn label="Opening Hours" delay={0.45} inView={enDetIn}>
                  {HOURS_EN}
                </DetailRowEn>
              </div>
            </div>

            {/* ── MAP ── */}
            <motion.div ref={mapRef} {...fadeIn(mapIn, 0.2)}>
              <div style={{
                position: 'relative',
                width: '100%',
                borderRadius: '6px',
                overflow: 'hidden',
                border: '1px solid rgba(212,160,23,0.45)',
                boxShadow:
                  '0 0 0 1px rgba(212,160,23,0.08), ' +
                  '0 0 24px rgba(212,160,23,0.18), ' +
                  '0 12px 40px rgba(0,0,0,0.6)',
                background: '#0a0a0a',
              }}>
                <iframe
                  className="contact-map-frame"
                  src={MAPS_EMBED_SRC}
                  title="Basarabia Concept Store — Spalding location map"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  style={{
                    display: 'block',
                    width: '100%',
                    border: 0,
                  }}
                />
              </div>
              <p style={{
                margin: 'clamp(1rem, 2vw, 1.4rem) 0 0',
                textAlign: 'center',
                color: '#7a6a54',
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 'clamp(0.78rem, 1.4vw, 0.88rem)',
                fontStyle: 'italic',
              }}>
                <a
                  href={MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                  style={{ ...linkStyle, color: '#7a6a54', borderBottomColor: 'rgba(212,160,23,0.3)' }}
                >
                  Deschide în Google Maps · Open in Google Maps
                </a>
              </p>
            </motion.div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
