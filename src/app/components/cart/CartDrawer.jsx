'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useCart } from './CartContext';

const GOLD = '#D4A017';
const CREAM = '#F5E6C8';

export default function CartDrawer() {
  const { cart, count, busy, open, setOpen, updateLine } = useCart();

  return (
    <>
      {/* Floating cart button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Coșul tău"
        style={{
          position: 'fixed',
          bottom: '1.4rem',
          left: '1.4rem',
          zIndex: 60,
          width: '54px',
          height: '54px',
          borderRadius: '50%',
          border: `1px solid rgba(212,160,23,0.45)`,
          background: 'linear-gradient(145deg, #1e1208 0%, #140d06 100%)',
          color: GOLD,
          fontSize: '1.25rem',
          cursor: 'pointer',
          boxShadow: '0 4px 24px rgba(0,0,0,0.55)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        🧺
        {count > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              background: '#8B1A1A',
              color: CREAM,
              borderRadius: '50%',
              minWidth: '20px',
              height: '20px',
              fontSize: '0.7rem',
              fontFamily: 'Arial, sans-serif',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 4px',
            }}
          >
            {count}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.6)',
                zIndex: 70,
              }}
            />
            {/* Drawer */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: 'min(420px, 100vw)',
                background: 'linear-gradient(180deg, #1a0a05 0%, #110604 100%)',
                borderLeft: '1px solid rgba(212,160,23,0.25)',
                zIndex: 80,
                display: 'flex',
                flexDirection: 'column',
                fontFamily: 'Georgia, serif',
              }}
            >
              {/* Header */}
              <div
                style={{
                  padding: '1.2rem 1.4rem',
                  borderBottom: '1px solid rgba(212,160,23,0.18)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <h2
                  style={{
                    fontFamily: 'var(--font-cinzel), Georgia, serif',
                    color: CREAM,
                    fontSize: '1.05rem',
                    margin: 0,
                    letterSpacing: '0.06em',
                  }}
                >
                  Coșul tău
                </h2>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Închide"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#A8957A',
                    fontSize: '1.3rem',
                    cursor: 'pointer',
                    lineHeight: 1,
                  }}
                >
                  ×
                </button>
              </div>

              {/* Lines */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.4rem' }}>
                {!cart || cart.lines.length === 0 ? (
                  <p
                    style={{
                      color: '#6a5a42',
                      fontStyle: 'italic',
                      textAlign: 'center',
                      marginTop: '3rem',
                      lineHeight: 1.7,
                    }}
                  >
                    Coșul e gol deocamdată.
                    <br />
                    <span style={{ fontSize: '0.85rem', color: '#4a3a28' }}>
                      Cămara bunicii te așteaptă.
                    </span>
                  </p>
                ) : (
                  cart.lines.map((line) => (
                    <div
                      key={line.id}
                      style={{
                        display: 'flex',
                        gap: '0.9rem',
                        padding: '0.8rem 0',
                        borderBottom: '1px solid rgba(212,160,23,0.08)',
                      }}
                    >
                      <div
                        style={{
                          position: 'relative',
                          width: '56px',
                          height: '56px',
                          flexShrink: 0,
                          background: '#140d06',
                          border: '1px solid rgba(212,160,23,0.12)',
                          borderRadius: '3px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {line.imageUrl ? (
                          <Image
                            src={line.imageUrl}
                            alt={line.title}
                            fill
                            style={{ objectFit: 'contain', padding: '4px' }}
                            sizes="56px"
                          />
                        ) : (
                          <span style={{ color: 'rgba(212,160,23,0.4)' }}>✦</span>
                        )}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                          <p
                            style={{
                              color: CREAM,
                              fontSize: '0.82rem',
                              margin: '0 0 0.3rem',
                              lineHeight: 1.35,
                              flex: 1,
                            }}
                          >
                            {line.title}
                          </p>
                          <button
                            disabled={busy}
                            onClick={() => updateLine(line.id, 0)}
                            aria-label="Elimină produsul"
                            title="Elimină"
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#6a5a42',
                              fontSize: '1rem',
                              cursor: 'pointer',
                              lineHeight: 1,
                              padding: '0 0.1rem',
                              flexShrink: 0,
                            }}
                          >
                            ×
                          </button>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.7rem',
                          }}
                        >
                          <button
                            disabled={busy}
                            onClick={() => updateLine(line.id, line.quantity - 1)}
                            style={qtyBtn}
                          >
                            −
                          </button>
                          <span
                            style={{
                              color: '#A8957A',
                              fontSize: '0.85rem',
                              fontFamily: 'Arial, sans-serif',
                              minWidth: '1.2em',
                              textAlign: 'center',
                            }}
                          >
                            {line.quantity}
                          </span>
                          <button
                            disabled={busy}
                            onClick={() => updateLine(line.id, line.quantity + 1)}
                            style={qtyBtn}
                          >
                            +
                          </button>
                          <span
                            style={{
                              marginLeft: 'auto',
                              color: GOLD,
                              fontSize: '0.85rem',
                              fontFamily: 'Arial, sans-serif',
                              fontWeight: 700,
                            }}
                          >
                            £{(line.priceGbp * line.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {cart && cart.lines.length > 0 && (
                <div
                  style={{
                    padding: '1.2rem 1.4rem 1.5rem',
                    borderTop: '1px solid rgba(212,160,23,0.18)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '1rem',
                    }}
                  >
                    <span style={{ color: '#A8957A', fontSize: '0.9rem' }}>Total</span>
                    <span
                      style={{
                        color: CREAM,
                        fontFamily: 'Arial, sans-serif',
                        fontWeight: 700,
                        fontSize: '1.05rem',
                      }}
                    >
                      £{cart.totalGbp.toFixed(2)}
                    </span>
                  </div>
                  <a
                    href={cart.checkoutUrl}
                    style={{
                      display: 'block',
                      textAlign: 'center',
                      background: 'linear-gradient(145deg, #8B1A1A 0%, #6d1414 100%)',
                      color: CREAM,
                      textDecoration: 'none',
                      padding: '0.9rem 1rem',
                      borderRadius: '3px',
                      fontFamily: 'var(--font-cinzel), Georgia, serif',
                      letterSpacing: '0.08em',
                      fontSize: '0.9rem',
                      border: '1px solid rgba(212,160,23,0.35)',
                    }}
                  >
                    Finalizează comanda
                  </a>
                  <button
                    onClick={() => setOpen(false)}
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'center',
                      background: 'none',
                      color: '#A8957A',
                      padding: '0.7rem 1rem',
                      marginTop: '0.6rem',
                      borderRadius: '3px',
                      fontFamily: 'Georgia, serif',
                      letterSpacing: '0.05em',
                      fontSize: '0.85rem',
                      border: '1px solid rgba(212,160,23,0.25)',
                      cursor: 'pointer',
                    }}
                  >
                    ← Continuă cumpărăturile
                  </button>
                  <button
                    onClick={async () => {
                      for (const l of cart.lines) {
                        await updateLine(l.id, 0);
                      }
                    }}
                    disabled={busy}
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'center',
                      background: 'none',
                      border: 'none',
                      color: '#6a5a42',
                      padding: '0.55rem 1rem 0',
                      fontFamily: 'Georgia, serif',
                      fontSize: '0.78rem',
                      letterSpacing: '0.04em',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                    }}
                  >
                    Golește coșul
                  </button>
                  <p
                    style={{
                      color: '#4a3a28',
                      fontSize: '0.72rem',
                      textAlign: 'center',
                      margin: '0.7rem 0 0',
                      fontFamily: 'Arial, sans-serif',
                    }}
                  >
                    Plată securizată prin Shopify
                  </p>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

const qtyBtn = {
  width: '22px',
  height: '22px',
  borderRadius: '3px',
  border: '1px solid rgba(212,160,23,0.3)',
  background: 'transparent',
  color: '#D4A017',
  cursor: 'pointer',
  fontSize: '0.9rem',
  lineHeight: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};
