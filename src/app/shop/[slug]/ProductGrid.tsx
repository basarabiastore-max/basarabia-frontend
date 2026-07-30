'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Product } from '@/lib/products';
import { useCart } from '../../components/cart/CartContext';

type GridProduct = Product & { handle?: string; imageUrl?: string | null; variantId?: string | null; availableForSale?: boolean; tags?: string[] };
import {
  CARD_BG,
  CARD_BORDER, CARD_BORDER_HOVER,
  CARD_SHADOW, CARD_SHADOW_HOVER,
  INNER_GLOW, INNER_GLOW_HOVER,
  MUTED_GOLD, CREAM,
} from '@/lib/brand';

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

function ProductCard({ product, accent }: { product: GridProduct; accent: string }) {
  const [hovered, setHovered] = useState(false);
  const { add, busy } = useCart() as unknown as { add: (variantId: string, quantity?: number) => Promise<unknown>; busy: boolean };
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const canQuickAdd = Boolean(
    product.variantId &&
    product.availableForSale !== false &&
    product.priceGbp !== null &&
    !(product.tags ?? []).some((t) => t.trim().toLowerCase() === 'in-store-only')
  );
  const quickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.variantId) return;
    await add(product.variantId, qty);
    setAdded(true);
    setQty(1);
    setTimeout(() => setAdded(false), 1600);
  };
  const step = (e: React.MouseEvent, d: number) => {
    e.preventDefault();
    e.stopPropagation();
    setQty((q) => Math.min(99, Math.max(1, q + d)));
  };
  const priceLabel = formatPrice(product.priceGbp);
  const isPriceOnRequest = product.priceGbp === null;
  const inStoreOnly = Array.isArray((product as { tags?: string[] }).tags)
    && ((product as { tags?: string[] }).tags as string[]).some(
      (t) => t.trim().toLowerCase() === 'in-store-only'
    );

  return (
    <motion.div
      variants={cardVariants}
      style={{ cursor: 'default' }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onTapStart={() => setHovered(true)}
      onTap={() => setHovered(false)}
      onTapCancel={() => setHovered(false)}
    >
      <motion.div
        whileHover={{ y: -2, borderColor: CARD_BORDER_HOVER, boxShadow: CARD_SHADOW_HOVER }}
        whileTap={{ y: -1, scale: 0.99 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          background: CARD_BG,
          border: `1px solid ${CARD_BORDER}`,
          borderRadius: '4px',
          boxShadow: CARD_SHADOW,
          position: 'relative',
          zIndex: 0,
          overflow: 'hidden',
        }}
      >
        {/* Inner glow — base layer */}
        <div
          style={{
            position: 'absolute', inset: 0,
            background: INNER_GLOW,
            pointerEvents: 'none',
            zIndex: -1,
          }}
        />

        {/* Inner glow — hover amplified */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.28 }}
          style={{
            position: 'absolute', inset: 0,
            background: INNER_GLOW_HOVER,
            pointerEvents: 'none',
            zIndex: -1,
          }}
        />

        {/* Image placeholder */}
        <div
          style={{
            position: 'relative',
            height: '160px',
            background: 'linear-gradient(145deg, #1e1208 0%, #140d06 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottom: '1px solid rgba(212,160,23,0.08)',
          }}
        >
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.nameRo}
              fill
              style={{ objectFit: 'contain', padding: '12px' }}
              sizes="200px"
            />
          ) : product.image ? (
            <Image
              src={`/products/${product.image}`}
              alt={product.nameRo}
              fill
              style={{ objectFit: 'contain', padding: '12px' }}
              sizes="200px"
            />
          ) : (
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
          )}
        </div>

        {/* Card body */}
        <div
          style={{
            padding: '1rem 1rem 1.2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.35rem',
            flex: 1,
          }}
        >
          {/* Romanian name — Fix B: serif display font, cream */}
          <span
            style={{
              color: CREAM,
              fontSize: '0.88rem',
              fontWeight: 600,
              fontFamily: 'var(--font-cinzel), "Palatino Linotype", Georgia, serif',
              letterSpacing: '0.01em',
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

          {/* Weight + supplier */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginTop: '0.2rem',
              flexWrap: 'wrap',
            }}
          >
            <span style={{ color: '#7a6a52', fontSize: '0.7rem', fontFamily: 'Arial, sans-serif' }}>
              {product.weight}
            </span>
            <span style={{ color: '#3a2a1a', fontSize: '0.65rem' }}>·</span>
            <span style={{ color: '#5a4a34', fontSize: '0.67rem', fontFamily: 'Arial, sans-serif', letterSpacing: '0.04em' }}>
              {product.supplier}
            </span>
          </div>

          {/* Price — Fix A: "Preț la comandă" uses muted gold, not error-red */}
          <div style={{ marginTop: 'auto', paddingTop: '0.7rem' }}>
            <span
              style={{
                color: isPriceOnRequest ? MUTED_GOLD : accent,
                fontSize: isPriceOnRequest ? '0.72rem' : '1rem',
                fontWeight: isPriceOnRequest ? 400 : 700,
                fontFamily: isPriceOnRequest ? 'Georgia, serif' : 'Arial, sans-serif',
                fontStyle: isPriceOnRequest ? 'italic' : 'normal',
              }}
            >
              {priceLabel}
            </span>
            {inStoreOnly && (
              <span
                style={{
                  marginLeft: '0.5rem',
                  padding: '0.14rem 0.45rem',
                  border: '1px solid rgba(212,160,23,0.45)',
                  borderRadius: '2px',
                  color: MUTED_GOLD,
                  fontSize: '0.6rem',
                  fontFamily: 'Arial, sans-serif',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}
              >
                Doar în magazin
              </span>
            )}
            {canQuickAdd && (
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.55rem' }}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
              >
                <button
                  aria-label="Scade"
                  onClick={(e) => step(e, -1)}
                  disabled={busy || qty <= 1}
                  style={{ background: 'none', border: '1px solid rgba(212,160,23,0.35)', color: CREAM, width: '1.9rem', height: '1.9rem', borderRadius: '3px', cursor: 'pointer', fontSize: '1rem', lineHeight: 1 }}
                >−</button>
                <span style={{ minWidth: '1.6rem', textAlign: 'center', color: CREAM, fontSize: '0.9rem', fontFamily: 'Georgia, serif' }}>{qty}</span>
                <button
                  aria-label="Crește"
                  onClick={(e) => step(e, 1)}
                  disabled={busy}
                  style={{ background: 'none', border: '1px solid rgba(212,160,23,0.35)', color: CREAM, width: '1.9rem', height: '1.9rem', borderRadius: '3px', cursor: 'pointer', fontSize: '1rem', lineHeight: 1 }}
                >+</button>
                <button
                  onClick={quickAdd}
                  disabled={busy}
                  style={{
                    flex: 1,
                    background: added ? 'rgba(39,174,96,0.25)' : 'linear-gradient(145deg, #8B1A1A 0%, #6d1414 100%)',
                    color: added ? '#7ee2a8' : '#F5E6C8',
                    border: '1px solid rgba(212,160,23,0.3)',
                    borderRadius: '3px',
                    height: '1.9rem',
                    fontSize: '0.72rem',
                    letterSpacing: '0.05em',
                    cursor: busy ? 'wait' : 'pointer',
                    whiteSpace: 'nowrap',
                    padding: '0 0.5rem',
                  }}
                >
                  {added ? '✓ În coș' : busy ? '…' : 'Adaugă'}
                </button>
              </div>
            )}
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
  products: GridProduct[];
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
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: '1.1rem',
      }}
    >
      {products.map((product) =>
        product.handle ? (
          <a
            key={product.sku}
            href={`/produs/${product.handle}`}
            style={{ textDecoration: 'none' }}
          >
            <ProductCard product={product} accent={accent} />
          </a>
        ) : (
          <ProductCard key={product.sku} product={product} accent={accent} />
        ),
      )}
    </motion.div>
  );
}
