'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

// ── CAMPANIE ACTIVĂ ──────────────────────────────────────────────
// Pentru următoarea campanie: schimbi textele, poza și link-ul de mai
// jos. Pentru a-l ascunde complet: în shop/page.js ștergi <CampaignBanner />.
const CAMPAIGN = {
  eyebrow: 'Doar cu precomandă · Ridicare sâmbătă din magazin',
  title: 'Grătarul de Sâmbătă',
  description:
    'Cotlet, ceafă, piept de porc, cârnați țărănești, frigărui și mici tradiționali — pregătite de măcelăria noastră. Tu doar aprinzi focul.',
  price: '£25',
  cta: 'Precomandă acum',
  href: '/produs/gratarul-de-sambata',
  image: '/produse-foto/platou-gratar.jpg',
}
// ─────────────────────────────────────────────────────────────────

export default function CampaignBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)' }}
    >
      <Link href={CAMPAIGN.href} style={{ textDecoration: 'none', display: 'block' }}>
        <div
          style={{
            position: 'relative',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid rgba(212,160,23,0.4)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.5), inset 0 0 60px rgba(139,26,26,0.15)',
            display: 'flex',
            flexWrap: 'wrap',
            background: 'linear-gradient(135deg, #1a0a05 0%, #2a1008 55%, #1a0a05 100%)',
          }}
        >
          {/* Poza */}
          <div
            style={{
              flex: '1 1 320px',
              minHeight: '260px',
              backgroundImage: `url(${CAMPAIGN.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          {/* Textul */}
          <div
            style={{
              flex: '1 1 340px',
              padding: 'clamp(1.6rem, 4vw, 2.8rem)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '0.9rem',
            }}
          >
            <p
              style={{
                color: '#A8957A',
                fontFamily: 'Arial, sans-serif',
                fontSize: '0.7rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                margin: 0,
              }}
            >
              {CAMPAIGN.eyebrow}
            </p>

            <h2
              style={{
                fontFamily: 'var(--font-cinzel), "Palatino Linotype", Georgia, serif',
                color: '#F5E6C8',
                fontSize: 'clamp(1.6rem, 4vw, 2.6rem)',
                fontWeight: 700,
                margin: 0,
                lineHeight: 1.15,
                textShadow: '0 0 40px rgba(212,160,23,0.3)',
              }}
            >
              {CAMPAIGN.title}
            </h2>

            <p
              style={{
                color: '#D9C9A8',
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(0.9rem, 1.8vw, 1.02rem)',
                lineHeight: 1.55,
                margin: 0,
              }}
            >
              {CAMPAIGN.description}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginTop: '0.4rem', flexWrap: 'wrap' }}>
              <span
                style={{
                  fontFamily: 'var(--font-cinzel), Georgia, serif',
                  color: '#D4A017',
                  fontSize: 'clamp(1.5rem, 3.5vw, 2rem)',
                  fontWeight: 700,
                }}
              >
                {CAMPAIGN.price}
              </span>

              <span
                style={{
                  display: 'inline-block',
                  padding: '0.75rem 1.6rem',
                  borderRadius: '999px',
                  border: '1px solid rgba(212,160,23,0.55)',
                  background: 'linear-gradient(145deg, #D4A017 0%, #b8890f 100%)',
                  color: '#1a0a05',
                  fontFamily: 'Arial, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                {CAMPAIGN.cta} →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.section>
  )
}

