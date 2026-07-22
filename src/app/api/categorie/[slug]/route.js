import { NextResponse } from 'next/server';
import { resolveCategoryProducts } from '@/lib/categoryMap';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    const products = await resolveCategoryProducts(slug);
    return NextResponse.json({ products });
  } catch (err) {
    console.error('categorie api error:', err);
    return NextResponse.json({ products: [], error: 'fetch failed' }, { status: 500 });
  }
}
