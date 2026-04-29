export default function WhyUs() {
  const pillars = [
    { symbol: '✦',  title: 'Autentic',     desc: 'Produse originale direct din Patria Natala, fără compromisuri.' },
    { symbol: '✿',  title: 'Tradițional',  desc: 'Rețete transmise din generație în generație.' },
    { symbol: '🚚', title: 'Livrat Rapid', desc: 'Livrare rapidă la cea mai inalta calitate.' },
  ]

  return (
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
        {pillars.map(item => (
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
  )
}
