export default function WhyUs() {
  const pillars = [
    {
      symbol: '✦',
      ro: { title: 'Autentic',     desc: 'Produse originale direct din Patria Natală, fără compromisuri.' },
      en: { title: 'Authentic',    desc: 'Original products straight from the homeland, no compromises.' },
    },
    {
      symbol: '✿',
      ro: { title: 'Tradițional',  desc: 'Rețete transmise din generație în generație.' },
      en: { title: 'Traditional',  desc: 'Recipes passed down from generation to generation.' },
    },
    {
      symbol: '🚚',
      ro: { title: 'Livrat Rapid', desc: 'Livrare rapidă la cea mai înaltă calitate.' },
      en: { title: 'Fast Delivery', desc: 'Quick delivery, highest quality.' },
    },
  ]

  return (
    <section style={{
      backgroundColor: '#0a0a0a',
      width: '100%',
      padding: 'clamp(80px, 10vw, 120px) clamp(1.5rem, 5vw, 4rem)',
    }}>
      {/* Eyebrow + title */}
      <div style={{ textAlign: 'center', marginBottom: 'clamp(50px, 8vw, 80px)' }}>
        <p style={{
          color: '#D4A017',
          fontSize: '0.7rem',
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          fontFamily: 'Arial, sans-serif',
          margin: '0 0 1.2rem',
        }}>
          De Ce Noi? · Why Us?
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
        gap: 'clamp(40px, 5vw, 70px)',
        maxWidth: '1100px',
        margin: '0 auto',
        alignItems: 'start',
      }}>
        {pillars.map(item => (
          <div key={item.ro.title} style={{ textAlign: 'center' }}>
            <div style={{
              color: '#D4A017',
              fontSize: '2rem',
              marginBottom: '24px',
            }}>
              {item.symbol}
            </div>

            {/* RO title */}
            <h3 style={{
              color: '#F5E6C8',
              fontSize: '1.1rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontFamily: 'Georgia, serif',
              fontWeight: 700,
              margin: '0 0 16px',
            }}>
              {item.ro.title}
            </h3>

            {/* RO desc */}
            <p style={{
              color: '#A8957A',
              fontSize: '0.95rem',
              lineHeight: 1.8,
              fontFamily: 'Georgia, serif',
              margin: '0 0 28px',
            }}>
              {item.ro.desc}
            </p>

            {/* EN title */}
            <p style={{
              color: '#7a6a54',
              fontSize: '0.78rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontFamily: 'Georgia, serif',
              fontWeight: 700,
              margin: '0 0 10px',
            }}>
              {item.en.title}
            </p>

            {/* EN desc */}
            <p style={{
              color: '#7a6a54',
              fontStyle: 'italic',
              fontSize: '0.85rem',
              lineHeight: 1.7,
              fontFamily: 'Georgia, serif',
              margin: 0,
            }}>
              {item.en.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
