import { notFound } from 'next/navigation';
import { categories } from '@/lib/categories';
import { products } from '@/lib/products';
import ProductGrid from './ProductGrid';

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }));
}

function resolveProducts(slug: string) {
  switch (slug) {
    case 'moldavian-products':
      return products.filter((p) => p.origin === 'MD');
    case 'international-products':
      return products.filter((p) => p.origin !== 'RO' && p.origin !== 'MD');
    case 'new-products':
      return products.slice(-20);
    case 'special-offer':
      return [];
    default:
      return products.filter((p) => p.categorySlug === slug);
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const categoryProducts = resolveProducts(slug);

  return (
    <div
      style={{
        fontFamily: 'Georgia, "Times New Roman", serif',
        backgroundColor: '#0f0703',
        minHeight: '100vh',
      }}
    >
      {/* ── PAGE HEADER ── */}
      <header
        style={{
          background: [
            `radial-gradient(ellipse at 50% 0%, ${category.accent}33 0%, transparent 60%)`,
            'linear-gradient(180deg, #1a0a05 0%, #110604 100%)',
          ].join(', '),
          borderBottom: '1px solid rgba(212,160,23,0.18)',
          padding: '0 clamp(1.5rem, 5vw, 4rem)',
        }}
      >
        <div
          style={{
            height: '4px',
            background: `linear-gradient(90deg, #8B1A1A 0%, ${category.accent} 35%, #1a3a0a 65%, ${category.accent} 82%, #8B1A1A 100%)`,
          }}
        />

        <div
          style={{
            maxWidth: '1300px',
            margin: '0 auto',
            padding: '1.8rem 0 1.6rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          {/* Back link */}
          <a
            href="/shop"
            style={{
              color: '#A8957A',
              fontFamily: 'Arial, sans-serif',
              fontSize: '0.8rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4em',
            }}
          >
            ← Magazin
          </a>

          {/* Category heading */}
          <div style={{ textAlign: 'center', flex: 1 }}>
            <p
              style={{
                color: '#D4A017',
                fontSize: '0.65rem',
                letterSpacing: '0.45em',
                textTransform: 'uppercase',
                fontFamily: 'Arial, sans-serif',
                margin: '0 0 0.3rem',
              }}
            >
              Basarabia · Concept Store
            </p>
            <div style={{ fontSize: '2rem', lineHeight: 1, marginBottom: '0.4rem' }}>
              {category.icon}
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-cinzel), "Palatino Linotype", Georgia, serif',
                color: '#F5E6C8',
                fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
                fontWeight: 700,
                margin: 0,
                letterSpacing: '0.04em',
                textShadow: '0 0 40px rgba(212,160,23,0.25)',
              }}
            >
              {category.nameEn}
            </h1>
            <p
              style={{
                color: '#6a5a42',
                fontStyle: 'italic',
                fontSize: '0.85rem',
                margin: '0.3rem 0 0',
                fontFamily: 'Georgia, serif',
              }}
            >
              {category.nameRo}
            </p>
          </div>

          {/* Spacer */}
          <div style={{ width: '80px' }} />
        </div>
      </header>

      {/* ── MAIN ── */}
      <main
        style={{
          maxWidth: '1300px',
          margin: '0 auto',
          padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 5vw, 4rem)',
        }}
      >
        {/* Ornamental divider */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            justifyContent: 'center',
            marginBottom: '3rem',
          }}
        >
          <div
            style={{
              height: '1px',
              width: '80px',
              background: 'linear-gradient(to right, transparent, #8B1A1A)',
            }}
          />
          <span style={{ color: '#D4A017', fontSize: '1rem' }}>✦</span>
          <div
            style={{
              height: '1px',
              width: '80px',
              background: 'linear-gradient(to left, transparent, #8B1A1A)',
            }}
          />
        </div>

        <ProductGrid products={categoryProducts} accent={category.accent} />
      </main>

      {/* ── FOOTER STRIP ── */}
      <footer
        style={{
          borderTop: '1px solid rgba(212,160,23,0.15)',
          padding: '2rem 1.5rem',
          textAlign: 'center',
          marginTop: '2rem',
        }}
      >
        <p
          style={{
            color: '#4a3a28',
            fontFamily: 'Arial, sans-serif',
            fontSize: '0.78rem',
            letterSpacing: '0.1em',
            margin: 0,
          }}
        >
          © {new Date().getFullYear()} Basarabia Concept Store · Spalding, UK
        </p>
      </footer>
    </div>
  );
}
