'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch('/api/cart')
      .then((r) => r.json())
      .then((d) => setCart(d.cart))
      .catch(() => {});
  }, []);

  const add = useCallback(async (variantId, quantity = 1, openDrawer = true) => {
    setBusy(true);
    try {
      const r = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add', variantId, quantity }),
      });
      const d = await r.json();
      if (d.cart) {
        setCart(d.cart);
        if (openDrawer) setOpen(true);
      }
      return d;
    } finally {
      setBusy(false);
    }
  }, []);

  const updateLine = useCallback(async (lineId, quantity) => {
    setBusy(true);
    try {
      const r = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update', lineId, quantity }),
      });
      const d = await r.json();
      if (d.cart) setCart(d.cart);
      return d;
    } finally {
      setBusy(false);
    }
  }, []);

  const count = cart?.lines?.reduce((n, l) => n + l.quantity, 0) ?? 0;

  return (
    <CartContext.Provider
      value={{ cart, count, busy, open, setOpen, add, updateLine }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
