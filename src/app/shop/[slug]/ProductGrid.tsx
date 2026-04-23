'use client';

import { motion } from 'framer-motion';
import type { Product } from '@/lib/products';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

function formatPrice(price: number | null): string {
  if (price === null) return 'Preț la comandă';
  return `£${price.toFixed(2)}`;
}

function ProductCard({ product, accent }: { product: Product; accent: string }) {
  const priceLabel = formatPrice(product.priceGbp);
  const isPriceOnRequest = product.priceGbp === null;

  return (
    <motion.div variants={cardVariants} style={{ cursor: 'default' }}>
      <motion.div
        whileHover={{
          y: -5,
          borderColor: accent,
          boxShadow: `0 12px 40px rgba(0,0,0,0.5), 0 0 20px ${accent}22`,
        }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(145deg, rgba(30,12,4,0.92) 0%, rgba(18,8,3,0.96) 100%)',
          border: '1px solid rgba(212,160,23,0.1)',
          borderRadius: '4px',
          overflow: 'hidden',
        }}
      >
        {/* Image placeholder */}
        <div
          style={{
            height: '160px',
            background: 'linear-gradient(145deg, #1e1208 0%, #140d06 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottom: '1px solid rgba(212,160,23,0.08)',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '100px',
              border: `1px solid ${accent}33`,
              borderRadius: '2px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ color: `${accent}66`, fontSize: '1.4rem' }}>✦</span>
          </div>
        </div>

        {/* Card body */}
        <div style={{ padding: '1rem 1rem 1.2rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', flex: 1 }}>
          {/* Romanian name — prominent */}
          <span
            style={{
              color: '#F5E6C8',
              fontSize: '0.88rem',
              fontWeight: 700,
              fontFamily: 'Arial, sans-serif',
              lineHeight: 1.35,
            }}
          >
            {product.nameRo}
          </span>

          {/* English name — muted italic */}
          <span
            style={{
              color: '#6a5a42',
              fontSize: '0.73rem',
              fontStyle: 'italic',
              fontFamily: 'Georgia, serif',
              lineHeight: 1.25,
            }}
          >
            {product.nameEn}
          </span>

          {/* Weight + supplier row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginTop: '0.2rem',
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                color: '#7a6a52',
                fontSize: '0.7rem',
                fontFamily: 'Arial, sans-serif',
              }}
            >
              {product.weight}
            </span>
            <span style={{ color: '#3a2a1a', fontSize: '0.65rem' }}>·</span>
            <span
              style={{
                color: '#5a4a34',
                fontSize: '0.67rem',
                fontFamily: 'Arial, sans-serif',
                letterSpacing: '0.04em',
              }}
            >
              {product.supplier}
            </span>
          </div>

          {/* Price */}
          <div style={{ marginTop: 'auto', paddingTop: '0.7rem' }}>
            <span
              style={{
                color: isPriceOnRequest ? '#6a5a42' : accent,
                fontSize: isPriceOnRequest ? '0.72rem' : '1rem',
                fontWeight: isPriceOnRequest ? 400 : 700,
                fontFamily: isPriceOnRequest ? 'Georgia, serif' : 'Arial, sans-serif',
                fontStyle: isPriceOnRequest ? 'italic' : 'normal',
              }}
            >
              {priceLabel}
            </span>
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            height: '2px',
            background: `linear-gradient(to right, transparent, ${accent}88, transparent)`,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function ProductGrid({
  products,
  accent,
}: {
  products: Product[];
  accent: string;
}) {
  if (products.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem 1rem' }}>
        <span style={{ color: '#D4A017', fontSize: '2rem', display: 'block', marginBottom: '1.5rem' }}>✦</span>
        <p
          style={{
            color: '#6a5a42',
            fontStyle: 'italic',
            fontFamily: 'Georgia, serif',
            fontSize: '1rem',
            margin: 0,
            lineHeight: 1.7,
          }}
        >
          Produsele sosesc curând.
          <br />
          <span style={{ color: '#3a2a1a', fontSize: '0.85rem' }}>Products coming soon.</span>
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '1.1rem',
      }}
    >
      {products.map((product) => (
        <ProductCard key={product.sku} product={product} accent={accent} />
      ))}
    </motion.div>
  );
}
