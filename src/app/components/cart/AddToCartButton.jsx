'use client';

import { useState } from 'react';
import { useCart } from './CartContext';

export default function AddToCartButton({ variantId }) {
  const { add, busy } = useCart();
  const [error, setError] = useState(null);

  const handleClick = async () => {
    setError(null);
    const d = await add(variantId, 1);
    if (d?.error) setError(d.error);
  };

  return (
    <div>
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
        {busy ? 'Se adaugă…' : 'Adaugă în coș'}
      </button>
      {error && (
        <p style={{ color: '#c0392b', fontSize: '0.8rem', marginTop: '0.5rem' }}>{error}</p>
      )}
    </div>
  );
}
