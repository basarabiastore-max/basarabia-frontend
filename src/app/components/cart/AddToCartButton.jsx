'use client';

import { useState } from 'react';
import { useCart } from './CartContext';

export default function AddToCartButton({ variantId }) {
  const { add, busy } = useCart();
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);

  const handleClick = async () => {
    setError(null);
    const d = await add(variantId, qty);
    if (d?.error) setError(d.error);
  };

  const stepBtn = {
    background: 'none',
    border: '1px solid rgba(212,160,23,0.35)',
    color: '#F5E6C8',
    width: '2.4rem',
    height: '2.9rem',
    fontSize: '1.1rem',
    cursor: 'pointer',
    borderRadius: '3px',
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'stretch', gap: '0.5rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'stretch', gap: '0.35rem' }}>
          <button aria-label="Scade cantitatea" style={stepBtn} disabled={busy || qty <= 1} onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
          <span style={{
            minWidth: '2.6rem',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#F5E6C8',
            fontFamily: 'Georgia, serif',
            fontSize: '1.05rem',
            border: '1px solid rgba(212,160,23,0.2)',
            borderRadius: '3px',
          }}>{qty}</span>
          <button aria-label="Crește cantitatea" style={stepBtn} disabled={busy} onClick={() => setQty(q => Math.min(99, q + 1))}>+</button>
        </div>
        <button
          onClick={handleClick}
          disabled={busy}
          style={{
            background: 'linear-gradient(145deg, #8B1A1A 0%, #6d1414 100%)',
            color: '#F5E6C8',
            border: '1px solid rgba(212,160,23,0.35)',
            borderRadius: '3px',
            padding: '0.85rem 2rem',
            fontFamily: 'var(--font-cinzel), Georgia, serif',
            letterSpacing: '0.08em',
            fontSize: '0.9rem',
            cursor: busy ? 'wait' : 'pointer',
            opacity: busy ? 0.7 : 1,
          }}
        >
          {busy ? 'Se adaugă…' : qty > 1 ? `Adaugă ${qty} în coș` : 'Adaugă în coș'}
        </button>
      </div>
      {error && (
        <p style={{ color: '#c0392b', fontSize: '0.8rem', marginTop: '0.5rem' }}>{error}</p>
      )}
    </div>
  );
}
