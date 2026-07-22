import { NextResponse } from 'next/server';
import { getAllProducts, shopifyConfigured } from '@/lib/shopify';

export const dynamic = 'force-dynamic';

function norm(s) {
  return (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export async function GET(request) {
  try {
    if (!shopifyConfigured()) return NextResponse.json({ products: [] });
    const q = norm(new URL(request.url).searchParams.get('q') || '').trim();
    if (q.length < 2) return NextResponse.json({ products: [] });

    const all = await getAllProducts();
    const words = q.split(/\s+/);
    const scored = [];
    for (const p of all) {
      const hay = norm(`${p.nameRo} ${p.supplier} ${p.productType} ${p.tags.join(' ')}`);
      if (words.every((w) => hay.includes(w))) {
        const score = norm(p.nameRo).startsWith(q) ? 0 : norm(p.nameRo).includes(q) ? 1 : 2;
        scored.push([score, p]);
      }
    }
    scored.sort((a, b) => a[0] - b[0]);
    const products = scored.slice(0, 30).map(([, p]) => p);
    return NextResponse.json({ products });
  } catch (err) {
    console.error('cautare api error:', err);
    return NextResponse.json({ products: [], error: 'search failed' }, { status: 500 });
  }
}
