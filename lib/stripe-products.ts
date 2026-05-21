// lib/stripe-products.ts   ← Recommended: Put this in a new file

export const PRODUCT_PRICE_MAP: Record<string, {
  name: string;
  priceId: string;
  unitAmount: number;     // in cents
  slug: string;
}> = {
  'organic-dewy-glow-oat-cleanser': {
    name: 'Organic Dewy Glow Turmeric Oat Cleanser',
    priceId: 'price_1XXXXXXXXXXXXX',           // ← Replace with real Stripe Price ID
    unitAmount: 2800,
    slug: 'organic-dewy-glow-oat-cleanser'
  },
  'tremella-hydrating-serum': {
    name: 'Tremella Hydrating Serum',
    priceId: 'price_1XXXXXXXXXXXXX',
    unitAmount: 4800,
    slug: 'organic-snow-mushroom-hydrating-serum'
  },
  'dewy-barrier-glow-cream': {
    name: 'Dewy Barrier Glow Cream',
    priceId: 'price_1XXXXXXXXXXXXX',
    unitAmount: 4600,
    slug: 'organic-dewy-barrier-glow-cream'
  },
  'dewy-rice-peel-off-glow-mask': {
    name: 'Dewy Rice Peel Off Glow Mask',
    priceId: 'price_1XXXXXXXXXXXXX',
    unitAmount: 4200,
    slug: 'organic-dewy-rice-peel-off-glow-mask'
  },
  // ... add the rest of your 14 products here
};

// Helper function
export function getProductBySlug(slug: string) {
  return PRODUCT_PRICE_MAP[slug] || null;
}