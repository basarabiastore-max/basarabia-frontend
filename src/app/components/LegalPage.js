import Navbar from './Navbar'
import Footer from './Footer'

export default function LegalPage({
  titleRo,
  titleEn,
  lastUpdatedRo,
  lastUpdatedEn,
  contentRo,
  contentEn,
}) {
  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <style>{`
        .legal-content {
          width: 100%;
          max-width: 720px;
          margin: 0 auto;
          padding: clamp(6rem, 12vw, 9rem) clamp(1.5rem, 5vw, 2rem) 4rem;
          color: #D4C4A0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 1rem;
          line-height: 1.7;
        }
        .legal-h1 {
          font-family: Georgia, "Times New Roman", serif;
          color: #F5E6C8;
          font-size: clamp(1.7rem, 3.6vw, 2.2rem);
          font-weight: 700;
          letter-spacing: 0.02em;
          margin: 0 0 0.5rem;
          line-height: 1.25;
        }
        .legal-subtitle {
          color: #A8957A;
          font-family: Georgia, serif;
          font-style: italic;
          font-size: 1rem;
          margin: 0 0 1.25rem;
          letter-spacing: 0.04em;
        }
        .legal-last-updated {
          color: #7a6a54;
          font-family: Georgia, serif;
          font-style: italic;
          font-size: 0.85rem;
          margin: 0 0 2.5rem;
        }
        .legal-content h2 {
          font-family: Georgia, "Times New Roman", serif;
          color: #F5E6C8;
          font-size: 1.15rem;
          font-weight: 700;
          letter-spacing: 0.01em;
          line-height: 1.4;
          margin: 2.5rem 0 1rem;
        }
        .legal-content h3 {
          font-family: Georgia, serif;
          color: #F5E6C8;
          font-size: 1rem;
          font-weight: 700;
          margin: 1.75rem 0 0.75rem;
        }
        .legal-content p {
          margin: 0 0 1.1rem;
        }
        .legal-content ul {
          margin: 0 0 1.1rem;
          padding-left: 1.4rem;
        }
        .legal-content li {
          margin: 0 0 0.4rem;
        }
        .legal-content strong {
          color: #F5E6C8;
          font-weight: 700;
        }
        .legal-content em {
          color: #A8957A;
        }
        .legal-content a {
          color: #D4A017;
          text-decoration: none;
          border-bottom: 1px solid rgba(212,160,23,0.35);
          transition: border-color 0.2s, color 0.2s;
        }
        .legal-content a:hover {
          color: #F5E6C8;
          border-bottom-color: #F5E6C8;
        }
        .legal-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 4rem 0;
          color: #D4A017;
          font-size: 1rem;
          letter-spacing: 0.2em;
        }
      `}</style>

      <main style={{ flex: 1 }}>
        <article className="legal-content">
          <h1 className="legal-h1">{titleRo}</h1>
          <p className="legal-subtitle">{titleEn}</p>
          <p className="legal-last-updated">{lastUpdatedRo} · {lastUpdatedEn}</p>

          {contentRo}

          <div className="legal-divider" aria-hidden="true">✦</div>

          {contentEn}
        </article>
      </main>

      <Footer />
    </div>
  )
}
