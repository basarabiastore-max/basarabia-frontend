export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#000000', width: '100%', padding: '50px 40px' }}>

      {/* Top gold line */}
      <div style={{
        width: '100%', height: '1px',
        background: 'linear-gradient(to right, transparent, #D4A017, transparent)',
        marginBottom: '50px',
      }} />

      {/* Three columns */}
      <div className="footer-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '40px',
        maxWidth: '1200px',
        margin: '0 auto',
        alignItems: 'center',
      }}>
        {/* Left — brand */}
        <div>
          <p style={{
            color: '#F5E6C8', fontFamily: 'Georgia, serif',
            fontSize: '1.2rem', letterSpacing: '0.3em',
            textTransform: 'uppercase', margin: '0 0 8px',
          }}>Basarabia</p>
          <p style={{
            color: '#7a6a54', fontStyle: 'italic',
            fontSize: '0.8rem', margin: 0, fontFamily: 'Georgia, serif',
          }}>Gustul de Acasă, livrat la ușa ta</p>
        </div>

        {/* Center — email */}
        <div style={{ textAlign: 'center' }}>
          <a href="mailto:contact@basarabia.co.uk" style={{
            color: '#D4A017', fontSize: '0.75rem',
            letterSpacing: '0.15em', textDecoration: 'none',
            fontFamily: 'Georgia, serif',
          }}>contact@basarabia.co.uk</a>
        </div>

        {/* Right — social icons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          {[['F', 'Facebook'], ['I', 'Instagram'], ['T', 'TikTok']].map(([letter, label]) => (
            <a key={label} href="#" aria-label={label} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '36px', height: '36px', borderRadius: '50%',
              border: '1px solid rgba(212,160,23,0.4)',
              color: '#D4A017', fontSize: '0.7rem',
              textDecoration: 'none', fontFamily: 'Georgia, serif', flexShrink: 0,
            }}>{letter}</a>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <p style={{
        color: '#3a3028', fontSize: '0.65rem', letterSpacing: '0.2em',
        textAlign: 'center', marginTop: '40px', marginBottom: 0,
        fontFamily: 'Georgia, serif',
      }}>© 2025 Basarabia · Toate drepturile rezervate</p>

    </footer>
  )
}
