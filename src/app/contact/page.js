import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Contact — Basarabia Concept Store',
}

export default function Contact() {
  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(6rem, 12vw, 10rem) clamp(1.5rem, 5vw, 4rem) 4rem',
        textAlign: 'center',
        fontFamily: 'Georgia, "Times New Roman", serif',
      }}>
        {/* Ornamental divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
          <div style={{ height: '1px', width: '60px', background: 'linear-gradient(to right, transparent, #D4A017)' }} />
          <span style={{ color: '#D4A017', fontSize: '0.9rem' }}>✦</span>
          <div style={{ height: '1px', width: '60px', background: 'linear-gradient(to left, transparent, #D4A017)' }} />
        </div>

        <h1 style={{
          fontFamily: 'var(--font-cinzel), "Palatino Linotype", Georgia, serif',
          color: '#F5E6C8',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 900,
          letterSpacing: '0.06em',
          margin: '0 0 1.5rem',
          textShadow: '0 0 50px rgba(212,160,23,0.25)',
        }}>
          Contact
        </h1>

        <p style={{
          color: '#7a6a54',
          fontStyle: 'italic',
          fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
          lineHeight: 1.8,
          maxWidth: '480px',
          margin: 0,
        }}>
          Această pagină este în curs de construcție.<br />
          Între timp, ne puteți contacta la{' '}
          <a href="mailto:contact@basarabia.co.uk" style={{ color: '#D4A017', textDecoration: 'none' }}>
            contact@basarabia.co.uk
          </a>
          .
        </p>
      </main>

      <Footer />
    </div>
  )
}
