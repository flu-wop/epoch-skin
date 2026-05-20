// app/api/stripe/sync-products/route.ts
// Idempotent — safe to run any number of times.
// Creates or updates all 14 Epoch Skin products in Stripe.
// Uses metadata['epoch_product_id'] as the stable key.

import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { products } from '@/data/products';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-04-10' });
const SITE   = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://epoch-skin.com';
const SECRET = process.env.SYNC_SECRET ?? 'epoch-sync-2026';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    if (body.secret !== SECRET) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const results = [];

    for (const product of products) {
      const imageUrl = product.images[0] ? `${SITE}${product.images[0]}` : undefined;
      const targetAmount = Math.round(product.price * 100);

      const existing = await stripe.products.search({
        query: `metadata['epoch_product_id']:'${product.id}'`,
        limit: 1,
      });

      let stripeProductId: string;
      let action: string;
      let priceId: string;

      if (existing.data.length > 0) {
        stripeProductId = existing.data[0].id;
        await stripe.products.update(stripeProductId, {
          name: product.name,
          description: (product.shortDescription || product.description || '').slice(0, 500),
          ...(imageUrl ? { images: [imageUrl] } : {}),
          metadata: { epoch_product_id: product.id, epoch_slug: product.slug, category: product.category },
        });

        const existingPrices = await stripe.prices.list({ product: stripeProductId, active: true, limit: 10 });
        const match = existingPrices.data.find(p => p.unit_amount === targetAmount);

        if (match) {
          priceId = match.id;
          action = 'updated';
        } else {
          for (const p of existingPrices.data) await stripe.prices.update(p.id, { active: false });
          const np = await stripe.prices.create({ product: stripeProductId, unit_amount: targetAmount, currency: 'usd' });
          priceId = np.id;
          action = 'price-updated';
        }
      } else {
        const np = await stripe.products.create({
          name: product.name,
          description: (product.shortDescription || product.description || '').slice(0, 500),
          ...(imageUrl ? { images: [imageUrl] } : {}),
          metadata: { epoch_product_id: product.id, epoch_slug: product.slug, category: product.category },
        });
        stripeProductId = np.id;
        const pr = await stripe.prices.create({ product: stripeProductId, unit_amount: targetAmount, currency: 'usd' });
        priceId = pr.id;
        action = 'created';
      }

      results.push({ id: product.id, name: product.name, price: `$${product.price}`, action, priceId });
    }

    return NextResponse.json({ success: true, synced: results.length, results });
  } catch (err) {
    console.error('[stripe-sync]', err);
    return NextResponse.json({ error: 'Sync failed', detail: String(err) }, { status: 500 });
  }
}

export async function GET() {
  const status = await Promise.all(products.map(async (product) => {
    const existing = await stripe.products.search({ query: `metadata['epoch_product_id']:'${product.id}'`, limit: 1 });
    const inStripe = existing.data.length > 0;
    const prices = inStripe ? await stripe.prices.list({ product: existing.data[0].id, active: true, limit: 1 }) : { data: [] };
    return {
      id: product.id, name: product.name, catalogPrice: `$${product.price}`, inStripe,
      stripePrice: prices.data[0]?.unit_amount ? `$${prices.data[0].unit_amount / 100}` : null,
      synced: prices.data[0]?.unit_amount === Math.round(product.price * 100),
    };
  }));
  return NextResponse.json({ products: status });
}
