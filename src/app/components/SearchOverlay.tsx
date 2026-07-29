'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

const GOLD = '#D4A017';
const CREAM = '#F5E6C8';

type Result = {
  handle: string;
  nameRo: string;
  weight: string;
  priceGbp: number | null;
  imageUrl: string | null;
};

export default function SearchOverlay() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 80);
    else {
      setQ('');
      setResults([]);
    }
  }, [open]);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    if (q.trim().length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    timer.current = setTimeout(() => {
      fetch(`/api/cautare?q=${encodeURIComponent(q)}`, { cache: 'no-store' })
        .then((r) => r.json())
        .then((d) => setResults(d.products ?? []))
        .catch(() => setResults([]))
        .finally(() => setLoading(false));
    }, 250);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [q]);

  return (
    <>
      {/* Floating search button — above the cart button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Caută produse"
        style={{
          position: 'fixed',
          bottom: '5.2rem',
          left: '1.4rem',
          zIndex: 60,
          width: '54px',
          height: '54px',
          borderRadius: '50%',
          border: '1px solid rgba(212,160,23,0.45)',
          background: 'linear-gradient(145deg, #1e1208 0%, #140d06 100%)',
          color: GOLD,
          fontSize: '1.2rem',
          cursor: 'pointer',
          boxShadow: '0 4px 24px rgba(0,0,0,0.55)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        🔍
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.72)',
                zIndex: 90,
                backdropFilter: 'blur(3px)',
              }}
            />
            <motion.div
              initial={{ opacity: 0, y: -18, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: -18, x: '-50%' }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'fixed',
                top: 'clamp(1rem, 8vh, 5rem)',
                left: '50%',
                width: 'min(640px, calc(100vw - 2rem))',
                zIndex: 100,
                fontFamily: 'Georgia, serif',
              }}
            >
              <div
                style={{
                  background: 'linear-gradient(180deg, #1a0a05 0%, #110604 100%)',
                  border: '1px solid rgba(212,160,23,0.35)',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  boxShadow: '0 12px 48px rgba(0,0,0,0.7)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', padding: '0.9rem 1.1rem' }}>
                  <span style={{ color: GOLD }}>🔍</span>
                  <input
                    ref={inputRef}
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
                    placeholder="Caută în cămara Basarabiei…"
                    style={{
                      flex: 1,
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      color: CREAM,
                      fontSize: '1rem',
                      fontFamily: 'Georgia, serif',
                    }}
                  />
                  <button
                    onClick={() => setOpen(false)}
                    aria-label="Închide"
                    style={{ background: 'none', border: 'none', color: '#A8957A', fontSize: '1.2rem', cursor: 'pointer' }}
                  >
                    ×
                  </button>
                </div>

                {(results.length > 0 || loading || q.trim().length >= 2) && (
                  <div
                    style={{
                      borderTop: '1px solid rgba(212,160,23,0.15)',
                      maxHeight: 'min(52vh, 460px)',
                      overflowY: 'auto',
                    }}
                  >
                    {loading && results.length === 0 ? (
                      <p style={{ color: `${GOLD}88`, textAlign: 'center', padding: '1.4rem', letterSpacing: '0.3em' }}>✦ ✦ ✦</p>
                    ) : results.length === 0 ? (
                      <p style={{ color: '#6a5a42', fontStyle: 'italic', textAlign: 'center', padding: '1.4rem' }}>
                        Nimic găsit — încearcă alt cuvânt.
                      </p>
                    ) : (
                      results.map((p) => (
                        <a
                          key={p.handle}
                          href={`/produs/${p.handle}`}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.9rem',
                            padding: '0.65rem 1.1rem',
                            textDecoration: 'none',
                            borderBottom: '1px solid rgba(212,160,23,0.07)',
                          }}
                        >
                          <div
                            style={{
                              position: 'relative',
                              width: '44px',
                              height: '44px',
                              flexShrink: 0,
                              background: '#140d06',
                              border: '1px solid rgba(212,160,23,0.12)',
                              borderRadius: '3px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            {p.imageUrl ? (
                              <Image src={p.imageUrl} alt={p.nameRo} fill style={{ objectFit: 'contain', padding: '3px' }} sizes="44px" />
                            ) : (
                              <span style={{ color: 'rgba(212,160,23,0.4)', fontSize: '0.8rem' }}>✦</span>
                            )}
                          </div>
                          <span style={{ flex: 1, color: CREAM, fontSize: '0.88rem', lineHeight: 1.3 }}>
                            {p.nameRo}
                            {p.weight ? (
                              <span style={{ color: '#7a6a52', fontSize: '0.75rem' }}> · {p.weight}</span>
                            ) : null}
                          </span>
                          <span style={{ color: GOLD, fontFamily: 'Arial, sans-serif', fontWeight: 700, fontSize: '0.88rem' }}>
                            {p.priceGbp !== null ? `£${p.priceGbp.toFixed(2)}` : '—'}
                          </span>
                        </a>
                      ))
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
