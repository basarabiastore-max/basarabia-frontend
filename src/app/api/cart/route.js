import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createCart, addToCart, updateCartLine, getCart } from '@/lib/shopify';

const CART_COOKIE = 'basarabia_cart_id';
const COOKIE_OPTS = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 60 * 60 * 24 * 14, // 14 days
  path: '/',
};

export async function GET() {
  try {
    const jar = await cookies();
    const cartId = jar.get(CART_COOKIE)?.value;
    if (!cartId) return NextResponse.json({ cart: null });
    const cart = await getCart(cartId);
    return NextResponse.json({ cart });
  } catch {
    return NextResponse.json({ cart: null });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { action } = body;
    const jar = await cookies();
    const cartId = jar.get(CART_COOKIE)?.value;

    if (action === 'add') {
      const { variantId, quantity = 1 } = body;
      if (!variantId) {
        return NextResponse.json({ error: 'variantId lipsă' }, { status: 400 });
      }
      let cart;
      if (cartId) {
        try {
          cart = await addToCart(cartId, variantId, quantity);
        } catch {
          cart = await createCart(variantId, quantity); // stale cart — start fresh
        }
      } else {
        cart = await createCart(variantId, quantity);
      }
      const res = NextResponse.json({ cart });
      res.cookies.set(CART_COOKIE, cart.id, COOKIE_OPTS);
      return res;
    }

    if (action === 'update') {
      const { lineId, quantity } = body;
      if (!cartId || !lineId || typeof quantity !== 'number') {
        return NextResponse.json({ error: 'parametri lipsă' }, { status: 400 });
      }
      const cart = await updateCartLine(cartId, lineId, quantity);
      return NextResponse.json({ cart });
    }

    return NextResponse.json({ error: 'acțiune necunoscută' }, { status: 400 });
  } catch (err) {
    console.error('cart api error:', err);
    return NextResponse.json(
      { error: 'Ceva nu a mers bine, încearcă din nou într-un minut.' },
      { status: 500 },
    );
  }
}
