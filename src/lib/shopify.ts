// ── Shopify Storefront API client ─────────────────────────────────────────────
// Server-side only. Uses the public Storefront token (safe for storefront use,
// but we keep it server-side anyway — all calls go through server components
// or API routes).

import type { Product } from './products';

const API_VERSION = '2025-07';

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export function shopifyConfigured(): boolean {
  return Boolean(domain && token);
}

type GqlResponse<T> = { data?: T; errors?: Array<{ message: string }> };

async function shopifyFetch<T>(
  query: string,
  variables: Record<string, unknown> = {},
  revalidate = 60,
): Promise<T> {
  if (!domain || !token) throw new Error('Shopify env vars missing');
  const res = await fetch(`https://${domain}/api/${API_VERSION}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Shopify HTTP ${res.status}`);
  const json = (await res.json()) as GqlResponse<T>;
  if (json.errors?.length) throw new Error(json.errors.map((e) => e.message).join('; '));
  if (!json.data) throw new Error('Shopify: empty response');
  return json.data;
}

// ── Product shape used by the UI ──────────────────────────────────────────────
// Extends the existing static Product type so ProductGrid keeps working.

export type ShopProduct = Product & {
  handle: string;
  imageUrl: string | null;
  variantId: string | null;
  availableForSale: boolean;
  tags: string[];
  productType: string;
  createdAt: string;
  descriptionHtml?: string;
};

const PRODUCT_FRAGMENT = /* GraphQL */ `
  fragment ProductFields on Product {
    id
    handle
    title
    vendor
    productType
    tags
    createdAt
    availableForSale
    featuredImage { url altText }
    priceRange { minVariantPrice { amount currencyCode } }
    variants(first: 1) { nodes { id availableForSale } }
  }
`;

// Extract "400g" / "1kg" / "20pcs" style weight hints from a Marion-style title.
function extractWeight(title: string): string {
  const m = title.match(/(\d+(?:[.,]\d+)?\s*(?:x\s*)?\d*\s*(?:gr|g|kg|ml|l|pcs|buc)\b\.?)/i);
  return m ? m[1].replace(/\s+/g, '').toUpperCase() : '';
}

// Marion descriptions are ALL CAPS — make them presentable.
function titleCase(s: string): string {
  return s
    .toLowerCase()
    .replace(/(^|[\s\-—("'/])(\p{L})/gu, (_, sep, ch) => sep + ch.toUpperCase());
}

type RawProduct = {
  id: string;
  handle: string;
  title: string;
  vendor: string;
  productType: string;
  tags: string[];
  createdAt: string;
  availableForSale: boolean;
  featuredImage: { url: string; altText: string | null } | null;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  variants: { nodes: Array<{ id: string; availableForSale: boolean }> };
};

function normalize(p: RawProduct): ShopProduct {
  const price = parseFloat(p.priceRange.minVariantPrice.amount);
  const rawTitle = p.title.trim();
  const cleanTitle = rawTitle.replace(/^\*?PROMO\s*/i, '');
  return {
    sku: p.handle,
    categorySlug: '',
    nameRo: titleCase(cleanTitle),
    nameEn: '',
    supplier: p.vendor && p.vendor !== 'basarabia-37' ? p.vendor : '',
    origin: 'OTHER',
    weight: extractWeight(rawTitle),
    priceGbp: Number.isFinite(price) && price > 0 ? price : null,
    status: p.availableForSale ? 'Activ' : 'Epuizat',
    image: null,
    handle: p.handle,
    imageUrl: p.featuredImage?.url ?? null,
    variantId: p.variants.nodes[0]?.id ?? null,
    availableForSale: p.availableForSale,
    tags: p.tags,
    productType: p.productType,
    createdAt: p.createdAt,
  };
}

// ── Collections ───────────────────────────────────────────────────────────────

export type ShopCollection = { handle: string; title: string; productCount?: number };

export async function getCollections(): Promise<ShopCollection[]> {
  const q = /* GraphQL */ `
    query Collections {
      collections(first: 100) {
        nodes { handle title }
      }
    }
  `;
  const data = await shopifyFetch<{ collections: { nodes: ShopCollection[] } }>(q);
  return data.collections.nodes;
}

export async function getCollectionProducts(handle: string): Promise<ShopProduct[] | null> {
  const q = /* GraphQL */ `
    query CollectionProducts($handle: String!, $cursor: String) {
      collection(handle: $handle) {
        products(first: 250, after: $cursor) {
          pageInfo { hasNextPage endCursor }
          nodes { ...ProductFields }
        }
      }
    }
    ${PRODUCT_FRAGMENT}
  `;
  type Resp = {
    collection: {
      products: { pageInfo: { hasNextPage: boolean; endCursor: string | null }; nodes: RawProduct[] };
    } | null;
  };
  let cursor: string | null = null;
  const out: ShopProduct[] = [];
  do {
    const data: Resp = await shopifyFetch<Resp>(q, { handle, cursor });
    if (!data.collection) return null; // collection doesn't exist
    out.push(...data.collection.products.nodes.map(normalize));
    const pi = data.collection.products.pageInfo;
    cursor = pi.hasNextPage ? pi.endCursor : null;
  } while (cursor);
  return out;
}

// ── All products (paginated) ─────────────────────────────────────────────────

export async function getAllProducts(): Promise<ShopProduct[]> {
  const q = /* GraphQL */ `
    query AllProducts($cursor: String) {
      products(first: 250, after: $cursor) {
        pageInfo { hasNextPage endCursor }
        nodes { ...ProductFields }
      }
    }
    ${PRODUCT_FRAGMENT}
  `;
  type Resp = {
    products: { pageInfo: { hasNextPage: boolean; endCursor: string | null }; nodes: RawProduct[] };
  };
  let cursor: string | null = null;
  const out: ShopProduct[] = [];
  do {
    const data: Resp = await shopifyFetch<Resp>(q, { cursor });
    out.push(...data.products.nodes.map(normalize));
    const pi = data.products.pageInfo;
    cursor = pi.hasNextPage ? pi.endCursor : null;
  } while (cursor);
  return out;
}

export async function getProductByHandle(handle: string): Promise<ShopProduct | null> {
  const q = /* GraphQL */ `
    query ProductByHandle($handle: String!) {
      product(handle: $handle) {
        ...ProductFields
        descriptionHtml
      }
    }
    ${PRODUCT_FRAGMENT}
  `;
  const data = await shopifyFetch<{ product: (RawProduct & { descriptionHtml: string }) | null }>(q, {
    handle,
  });
  if (!data.product) return null;
  return { ...normalize(data.product), descriptionHtml: data.product.descriptionHtml };
}

// ── Cart (Cart API) ───────────────────────────────────────────────────────────

export type CartLine = {
  id: string;
  quantity: number;
  title: string;
  imageUrl: string | null;
  priceGbp: number;
};

export type Cart = {
  id: string;
  checkoutUrl: string;
  totalGbp: number;
  lines: CartLine[];
};

const CART_FRAGMENT = /* GraphQL */ `
  fragment CartFields on Cart {
    id
    checkoutUrl
    cost { totalAmount { amount } }
    lines(first: 100) {
      nodes {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            product { title featuredImage { url } }
            price { amount }
          }
        }
      }
    }
  }
`;

type RawCart = {
  id: string;
  checkoutUrl: string;
  cost: { totalAmount: { amount: string } };
  lines: {
    nodes: Array<{
      id: string;
      quantity: number;
      merchandise: {
        product: { title: string; featuredImage: { url: string } | null };
        price: { amount: string };
      };
    }>;
  };
};

function normalizeCart(c: RawCart): Cart {
  return {
    id: c.id,
    checkoutUrl: c.checkoutUrl,
    totalGbp: parseFloat(c.cost.totalAmount.amount),
    lines: c.lines.nodes.map((l) => ({
      id: l.id,
      quantity: l.quantity,
      title: titleCase(l.merchandise.product.title.replace(/^\*?PROMO\s*/i, '')),
      imageUrl: l.merchandise.product.featuredImage?.url ?? null,
      priceGbp: parseFloat(l.merchandise.price.amount),
    })),
  };
}

export async function createCart(variantId: string, quantity: number): Promise<Cart> {
  const q = /* GraphQL */ `
    mutation CreateCart($lines: [CartLineInput!]!) {
      cartCreate(input: { lines: $lines }) {
        cart { ...CartFields }
        userErrors { message }
      }
    }
    ${CART_FRAGMENT}
  `;
  const data = await shopifyFetch<{ cartCreate: { cart: RawCart | null; userErrors: Array<{ message: string }> } }>(
    q,
    { lines: [{ merchandiseId: variantId, quantity }] },
    0,
  );
  if (!data.cartCreate.cart) throw new Error(data.cartCreate.userErrors.map((e) => e.message).join('; ') || 'cartCreate failed');
  return normalizeCart(data.cartCreate.cart);
}

export async function addToCart(cartId: string, variantId: string, quantity: number): Promise<Cart> {
  const q = /* GraphQL */ `
    mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { ...CartFields }
        userErrors { message }
      }
    }
    ${CART_FRAGMENT}
  `;
  const data = await shopifyFetch<{ cartLinesAdd: { cart: RawCart | null; userErrors: Array<{ message: string }> } }>(
    q,
    { cartId, lines: [{ merchandiseId: variantId, quantity }] },
    0,
  );
  if (!data.cartLinesAdd.cart) throw new Error(data.cartLinesAdd.userErrors.map((e) => e.message).join('; ') || 'cartLinesAdd failed');
  return normalizeCart(data.cartLinesAdd.cart);
}

export async function updateCartLine(cartId: string, lineId: string, quantity: number): Promise<Cart> {
  const q = /* GraphQL */ `
    mutation UpdateLine($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { ...CartFields }
        userErrors { message }
      }
    }
    ${CART_FRAGMENT}
  `;
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: RawCart | null; userErrors: Array<{ message: string }> } }>(
    q,
    { cartId, lines: [{ id: lineId, quantity }] },
    0,
  );
  if (!data.cartLinesUpdate.cart) throw new Error('cartLinesUpdate failed');
  return normalizeCart(data.cartLinesUpdate.cart);
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const q = /* GraphQL */ `
    query GetCart($cartId: ID!) {
      cart(id: $cartId) { ...CartFields }
    }
    ${CART_FRAGMENT}
  `;
  const data = await shopifyFetch<{ cart: RawCart | null }>(q, { cartId }, 0);
  return data.cart ? normalizeCart(data.cart) : null;
}
