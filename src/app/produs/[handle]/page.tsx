import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getProductByHandle, shopifyConfigured } from '@/lib/shopify';
import AddToCartButton from '@/app/components/cart/AddToCartButton';

export const dynamic = 'force-dynamic';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  if (!shopifyConfigured()) notFound();

  const product = await getProductByHandle(handle).catch(() => null);
  if (!product) notFound();

  const accent = '#D4A017';

  return (
    <div
      style={{
        fontFamily: 'Georgia, "Times New Roman", serif',
        backgroundColor: '#0f0703',
        minHeight: '100vh',
      }}
    >
      <header
        style={{
          borderBottom: '1px solid rgba(212,160,23,0.18)',
          padding: '1.4rem clamp(1.5rem, 5vw, 4rem)',
        }}
      >
        <a
          href="/shop"
          style={{
            color: '#A8957A',
            fontFamily: 'Arial, sans-serif',
            fontSize: '0.8rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            textDecoration: 'none',
          }}
        >
          ← Magazin
        </a>
      </header>

      <main
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: 'clamp(2rem, 5vw, 4rem) clamp(1.5rem, 5vw, 4rem)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(2rem, 4vw, 4rem)',
          alignItems: 'start',
        }}
      >
        {/* Image */}
        <div
          style={{
            position: 'relative',
            aspectRatio: '1 / 1',
            background: 'linear-gradient(145deg, #1e1208 0%, #140d06 100%)',
            border: '1px solid rgba(212,160,23,0.18)',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.nameRo}
              fill
              style={{ objectFit: 'contain', padding: '24px' }}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          ) : (
            <span style={{ color: `${accent}66`, fontSize: '3rem' }}>✦</span>
          )}
        </div>

        {/* Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <p
            style={{
              color: accent,
              fontSize: '0.65rem',
              letterSpacing: '0.45em',
              textTransform: 'uppercase',
              fontFamily: 'Arial, sans-serif',
              margin: 0,
            }}
          >
            Basarabia · Concept Store
          </p>

          <h1
            style={{
              fontFamily: 'var(--font-cinzel), "Palatino Linotype", Georgia, serif',
              color: '#F5E6C8',
              fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
              fontWeight: 700,
              margin: 0,
              lineHeight: 1.25,
              textShadow: '0 0 40px rgba(212,160,23,0.25)',
            }}
          >
            {product.nameRo}
          </h1>

          {(product.weight || product.supplier) && (
            <p
              style={{
                color: '#7a6a52',
                fontSize: '0.85rem',
                fontFamily: 'Arial, sans-serif',
                margin: 0,
              }}
            >
              {[product.weight, product.supplier].filter(Boolean).join(' · ')}
            </p>
          )}

          <div
            style={{
              height: '1px',
              background: 'linear-gradient(to right, #8B1A1A, transparent)',
              margin: '0.4rem 0',
            }}
          />

          <p
            style={{
              color: accent,
              fontSize: '1.6rem',
              fontWeight: 700,
              fontFamily: 'Arial, sans-serif',
              margin: 0,
            }}
          >
            {product.priceGbp !== null ? `£${product.priceGbp.toFixed(2)}` : 'Preț la comandă'}
          </p>

          {product.tags?.some((t: string) => t.trim().toLowerCase() === 'in-store-only') ? (
            <div
              style={{
                display: 'inline-block',
                padding: '0.7rem 1.4rem',
                border: '1px solid rgba(212,160,23,0.5)',
                borderRadius: '3px',
                color: '#D4A017',
                fontFamily: 'Georgia, serif',
                fontSize: '0.95rem',
                letterSpacing: '0.05em',
              }}
            >
              Disponibil doar în magazin · In Store Only
            </div>
          ) : product.variantId && product.availableForSale && product.priceGbp !== null ? (
            <AddToCartButton variantId={product.variantId} />
          ) : (
            <p style={{ color: '#6a5a42', fontStyle: 'italic', margin: 0 }}>
              Momentan indisponibil online — sună-ne sau vizitează magazinul.
            </p>
          )}

          {product.descriptionHtml ? (
            <div
              style={{
                color: '#A8957A',
                fontSize: '0.9rem',
                lineHeight: 1.7,
                marginTop: '0.5rem',
              }}
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          ) : null}
        </div>
      </main>
    </div>
  );
}
