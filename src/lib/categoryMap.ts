// ── Category resolution ───────────────────────────────────────────────────────
// Site URLs keep the existing 15 slugs. Each slug tries, in order:
//   1. a Shopify collection (by candidate handles)
//   2. a tag / productType match across all products
// Virtual categories (new, special-offer, moldavian, international) are
// computed from the full product list.

import {
  getCollectionProducts,
  getAllProducts,
  shopifyConfigured,
  type ShopProduct,
} from './shopify';
import { products as staticProducts, type Product } from './products';

// Candidate Shopify collection handles per site slug. First match wins.
const COLLECTION_CANDIDATES: Record<string, string[]> = {
  'vegetables-fruits': ['vegetables-fruits', 'legume-si-fructe', 'vegetables-and-fruits'],
  'general-products': ['general-products', 'produse-generale'],
  'cans-jars': ['cans-jars', 'conserve-si-borcane', 'cans-and-jars'],
  'spices-flavours': ['spices-flavours', 'condimente-si-arome', 'spices-and-flavours'],
  'tea-coffee': ['tea-coffee', 'ceai-si-cafea', 'tea-and-coffee'],
  'sweets-snacks': ['sweets-snacks', 'dulciuri-si-gustari', 'sweets-and-snacks'],
  dairy: ['dairy', 'lactate'],
  'meat-products': ['meat-products', 'produse-din-carne'],
  'cosmetics-cleaning': ['cosmetics-cleaning', 'cosmetice-si-curatenie', 'cosmetics-and-cleaning'],
  'soft-drinks': ['soft-drinks', 'bauturi-racoritoare'],
  alcohol: ['alcohol', 'alcool'],
};

// Keywords for tag / productType fallback matching (lowercased contains).
const KEYWORD_FALLBACK: Record<string, string[]> = {
  'vegetables-fruits': ['vegetable', 'fruit', 'legume', 'fructe'],
  'general-products': ['general'],
  'cans-jars': ['cans', 'jar', 'conserv', 'borcan'],
  'spices-flavours': ['spice', 'condiment', 'arome', 'flavour'],
  'tea-coffee': ['tea', 'coffee', 'ceai', 'cafea'],
  'sweets-snacks': ['sweet', 'snack', 'dulciuri', 'gustari'],
  dairy: ['dairy', 'lactate'],
  'meat-products': ['meat', 'carne', 'carnati', 'mezel'],
  'cosmetics-cleaning': ['cosmetic', 'cleaning', 'curatenie'],
  'soft-drinks': ['soft drink', 'racoritoare', 'drink', 'bautur'],
  alcohol: ['alcohol', 'alcool', 'wine', 'beer', 'vin', 'bere'],
};

function matchesKeywords(p: ShopProduct, keywords: string[]): boolean {
  const hay = `${p.productType} ${p.tags.join(' ')}`.toLowerCase();
  return keywords.some((k) => hay.includes(k));
}

async function allProductsSafe(): Promise<ShopProduct[]> {
  try {
    return await getAllProducts();
  } catch {
    return [];
  }
}

/**
 * Resolve the product list for a site category slug.
 * Falls back to the legacy static list if Shopify is unreachable/unconfigured,
 * so the site never renders empty because of an API hiccup.
 */
export async function resolveCategoryProducts(slug: string): Promise<Product[]> {
  if (!shopifyConfigured()) return resolveStatic(slug);

  try {
    // Virtual categories — computed from the whole catalogue
    if (slug === 'new-products') {
      const all = await allProductsSafe();
      return [...all]
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        .slice(0, 24);
    }
    if (slug === 'special-offer') {
      const all = await allProductsSafe();
      return all.filter((p) =>
        p.tags.some((t) => /special|offer|oferta|promo/i.test(t)),
      );
    }
    if (slug === 'moldavian-products') {
      const all = await allProductsSafe();
      return all.filter(
        (p) =>
          p.tags.some((t) => /moldov|moldav|md\b/i.test(t)) ||
          /moldov|basarab|chisinau|cricova|bucuria/i.test(`${p.supplier} ${p.nameRo}`),
      );
    }
    if (slug === 'international-products') {
      const all = await allProductsSafe();
      return all.filter((p) =>
        p.tags.some((t) => /international|polish|bulgarian|lithuanian|latvian|ukrain/i.test(t)),
      );
    }

    // Real categories — try collections first
    for (const handle of COLLECTION_CANDIDATES[slug] ?? [slug]) {
      const fromCollection = await getCollectionProducts(handle);
      if (fromCollection && fromCollection.length > 0) return fromCollection;
    }

    // Fallback: filter the whole catalogue by tags / productType
    const all = await allProductsSafe();
    const keywords = KEYWORD_FALLBACK[slug] ?? [slug.replace(/-/g, ' ')];
    const matched = all.filter((p) => matchesKeywords(p, keywords));
    if (matched.length > 0) return matched;

    // Last resort: static data for this slug
    return resolveStatic(slug);
  } catch {
    return resolveStatic(slug);
  }
}

function resolveStatic(slug: string): Product[] {
  switch (slug) {
    case 'moldavian-products':
      return staticProducts.filter((p) => p.origin === 'MD');
    case 'international-products':
      return staticProducts.filter((p) => p.origin !== 'RO' && p.origin !== 'MD');
    case 'new-products':
      return staticProducts.slice(-20);
    case 'special-offer':
      return [];
    default:
      return staticProducts.filter((p) => p.categorySlug === slug);
  }
}
