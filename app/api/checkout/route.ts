// app/api/checkout/route.ts
// Creates a Stripe Checkout session for product purchases
// Hidden 25% discount code (REPEAT25) applied server-side only — never shown on frontend

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://epoch-skin.com';

// ─── Product catalog (mirrors your shop data) ──────────────────────
// In production, fetch these from Stripe Products API instead of hardcoding.
// This maps your product slugs to Stripe price IDs (create in Stripe dashboard).
const PRODUCT_PRICE_MAP: Record<string, { name: string; priceId: string; unitAmount: number }> = {
  'organic-dewy-glow-oat-cleanser':             { name: 'Organic Dewy Glow Oat Cleanser',      priceId: 'price_XXXX_cleanser',     unitAmount: 2800 },
  'organic-snow-mushroom-hydrating-serum':       { name: 'Organic Tremella Hydrating Serum',    priceId: 'price_XXXX_serum',        unitAmount: 4800 },
  'organic-dewy-barrier-glow-cream':             { name: 'Organic Dewy Barrier Glow Cream',     priceId: 'price_XXXX_cream',        unitAmount: 4600 },
  'organic-dewy-rice-peel-off-glow-mask':        { name: 'Organic Dewy Rice Peel-Off Mask',     priceId: 'price_XXXX_peel_mask',    unitAmount: 4200 },
  'organic-aloe-glow-hydrating-mask':            { name: 'Organic Aloe Glow Hydrating Mask',    priceId: 'price_XXXX_aloe_mask',    unitAmount: 4000 },
  'organic-clove-glow-even-tone-toner':          { name: 'Organic Clove Glow Toner',            priceId: 'price_XXXX_toner',        unitAmount: 2800 },
  'organic-dewy-plump-hydration-serum':          { name: 'Organic Dewy Plump Hydration Serum',  priceId: 'price_XXXX_plump_serum',  unitAmount: 4800 },
  'organic-dewy-glow-lip-balm':                  { name: 'Organic Dewy Glow Lip Balm',          priceId: 'price_XXXX_lip',          unitAmount: 1200 },
  'organic-plump-eye-renewal-treatment':         { name: 'Organic Dewy Eye Renewal Treatment',  priceId: 'price_XXXX_eye',          unitAmount: 5200 },
  'organic-willow-glow-exfoliating-serum':       { name: 'Organic Willow Glow Exfoliating Serum', priceId: 'price_XXXX_willow',    unitAmount: 5000 },
  'organic-pineapple-papaya-enzyme-glow-powder': { name: 'Organic Pineapple Papaya Enzyme Powder', priceId: 'price_XXXX_enzyme',   unitAmount: 3500 },
  'organic-creamy-hybrid-wax-beads':             { name: 'Organic Hybrid Wax Beads',            priceId: 'price_XXXX_wax',         unitAmount: 3200 },
  'organic-calm-hydrate-hydro-jelly-mask':       { name: 'Organic Calming Hydro Jelly Mask',    priceId: 'price_XXXX_jelly',       unitAmount: 4000 },
  'organic-calm-hydrate-hydro-jelly-powder-mask':{ name: 'Organic Calming Hydro Jelly Powder',  priceId: 'price_XXXX_jelly_powder',unitAmount: 3600 },
};

type CartItem = { slug: string; quantity: number };

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, discountCode }: { items: CartItem[]; discountCode?: string } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty.' }, { status: 400 });
    }

    // Build line items
    const lineItems = items
      .map((item) => {
        const product = PRODUCT_PRICE_MAP[item.slug];
        if (!product) return null;
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              images: [`${SITE}/images/products/${item.slug}.jpg`],
            },
            unit_amount: product.unitAmount,
          },
          quantity: Math.max(1, Math.min(10, item.quantity)),
        };
      })
      .filter(Boolean) as Stripe.Checkout.SessionCreateParams.LineItem[];

    if (lineItems.length === 0) {
      return NextResponse.json({ error: 'No valid products found.' }, { status: 400 });
    }

    // ─── Discount code logic ───────────────────────────────────────
    // REPEAT25 = 25% off for repeat customers (word of mouth only)
    // Never exposed on frontend — applied only when passed from a trusted path
    // In production, you can also check customer email against a "repeat customer" list
    const discountCouponId = process.env.STRIPE_DISCOUNT_COUPON_ID;
    const isValidDiscount =
      discountCode &&
      discountCouponId &&
      discountCode.toUpperCase() === 'REPEAT25';

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
            display_name: 'Free shipping',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 5 },
              maximum: { unit: 'business_day', value: 7 },
            },
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
      metadata: {
        source: 'epoch-skin-web',
      },
    };

    // Apply hidden discount coupon
    if (isValidDiscount) {
      sessionParams.discounts = [{ coupon: discountCouponId }];
    } else {
      // Allow Stripe's built-in promotion code entry (e.g. GLOW15 newsletter code)
      sessionParams.allow_promotion_codes = true;
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('[checkout] Error:', err);
    return NextResponse.json({ error: 'Failed to create checkout session.' }, { status: 500 });
  }
}
