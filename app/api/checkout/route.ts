// app/api/checkout/route.ts
// AUTO-CREATES Stripe products from your data/products.ts file.
// No manual setup in Stripe dashboard needed.
// On first checkout, products are created automatically.
// On subsequent checkouts, existing Stripe products are reused.

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { products as catalogProducts } from '@/data/products';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://epoch-skin.com';

// ── Find or create a Stripe price for a product ──────────────────
// Uses Stripe's metadata to match by your internal product ID.
// This means you can run it 100 times and it only creates one product.
async function getOrCreateStripePrice(product: typeof catalogProducts[0]): Promise<string> {

  // Search for existing Stripe product with our internal ID in metadata
  const existing = await stripe.products.search({
    query: `metadata['epoch_product_id']:'${product.id}'`,
    limit: 1,
  });

  if (existing.data.length > 0) {
    // Product exists — get its active price
    const stripeProduct = existing.data[0];
    const prices = await stripe.prices.list({
      product: stripeProduct.id,
      active: true,
      limit: 1,
    });

    if (prices.data.length > 0) {
      return prices.data[0].id;
    }
  }

  // Product doesn't exist — create it with a price
  const stripeProduct = await stripe.products.create({
    name: product.name,
    description: product.shortDescription || product.description?.slice(0, 500),
    images: product.images[0]
      ? [`${SITE}${product.images[0]}`]
      : [],
    metadata: {
      epoch_product_id: product.id,  // ← key for lookup next time
      epoch_slug: product.slug,
      category: product.category,
    },
  });

  const price = await stripe.prices.create({
    product: stripeProduct.id,
    unit_amount: Math.round(product.price * 100), // cents
    currency: 'usd',
  });

  return price.id;
}

// ── Checkout handler ──────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, discountCode }: {
      items: { id: string; quantity: number }[];
      discountCode?: string;
    } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty.' }, { status: 400 });
    }

    // Build Stripe line items — auto-create any missing products
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    for (const cartItem of items) {
      // Find product in your catalog
      const product = catalogProducts.find(p => p.id === cartItem.id);
      if (!product || !product.inStock) continue;

      // Get or create Stripe price
      const priceId = await getOrCreateStripePrice(product);

      lineItems.push({
        price: priceId,
        quantity: Math.max(1, Math.min(10, cartItem.quantity)),
      });
    }

    if (lineItems.length === 0) {
      return NextResponse.json({ error: 'No valid products in cart.' }, { status: 400 });
    }

    // ── Discount logic ────────────────────────────────────────────
    // REPEAT25 = hidden 25% off, word of mouth only
    const discountCouponId = process.env.STRIPE_DISCOUNT_COUPON_ID;
    const isRepeat = discountCode?.toUpperCase() === 'REPEAT25' && discountCouponId;

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: 'payment',
      line_items: lineItems,
      success_url: `${SITE}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE}/cart`,
      shipping_address_collection: { allowed_countries: ['US'] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 0, currency: 'usd' },
            display_name: 'Free shipping (5–7 business days)',
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 995, currency: 'usd' },
            display_name: 'Express (2–3 business days)',
          },
        },
      ],
      metadata: { source: 'epoch-skin-web' },
    };

    if (isRepeat) {
      sessionParams.discounts = [{ coupon: discountCouponId }];
    } else {
      // Allows GLOW15 newsletter code at checkout
      sessionParams.allow_promotion_codes = true;
    }

    const session = await stripe.checkout.sessions.create(sessionParams);
    return NextResponse.json({ url: session.url });

  } catch (err) {
    console.error('[checkout]', err);
    return NextResponse.json({ error: 'Failed to create checkout session.' }, { status: 500 });
  }
}
