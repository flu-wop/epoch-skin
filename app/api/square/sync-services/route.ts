// app/api/square/sync-services/route.ts
// Idempotent — safe to run any number of times. Creates or updates every
// service from lib/booking-catalog.ts as an item in Square's Item Library,
// so they're ready to ring up in the Square POS app for in-person sales.
// Uses each service's catalog key (e.g. "w-brazilian") as the Square
// variation's SKU — that's the stable match key across runs, same pattern
// as the Stripe product sync (metadata['epoch_product_id']).
//
// Uses Square's REST API directly via fetch rather than the Square SDK —
// no dependency/version to keep in sync, mirrors the Turso HTTP-API pattern
// already used elsewhere on this stack.

import { NextResponse } from 'next/server';
import { BOOKING_SERVICES } from '@/lib/booking-catalog';
import { rateLimit, clientIp } from '@/lib/rate-limit';
import { timingSafeEqual } from 'crypto';

const SQUARE_VERSION = '2024-06-25';

function safeEq(a: string, b: string): boolean {
  const A = Buffer.from(a), B = Buffer.from(b);
  return A.length === B.length && timingSafeEqual(A, B);
}

function squareBase() {
  return process.env.SQUARE_ENVIRONMENT === 'production'
    ? 'https://connect.squareup.com/v2'
    : 'https://connect.squareupsandbox.com/v2';
}

async function squareFetch(path: string, init: RequestInit = {}) {
  const res = await fetch(`${squareBase()}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
      'Square-Version': SQUARE_VERSION,
      ...(init.headers || {}),
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(data.errors ?? data));
  return data;
}

// Finds the existing ITEM_VARIATION whose SKU matches our internal service id.
async function findExistingBySku(sku: string) {
  const data = await squareFetch('/catalog/search', {
    method: 'POST',
    body: JSON.stringify({
      object_types: ['ITEM_VARIATION'],
      query: { exact_query: { attribute_name: 'sku', attribute_value: sku } },
      limit: 1,
    }),
  });
  return data.objects?.[0] ?? null;
}

function requireSquareEnv() {
  if (!process.env.SQUARE_ACCESS_TOKEN || !process.env.SQUARE_LOCATION_ID) {
    return NextResponse.json(
      { error: 'Square is not configured — missing SQUARE_ACCESS_TOKEN or SQUARE_LOCATION_ID in Vercel env vars.' },
      { status: 500 }
    );
  }
  return null;
}

export async function POST(req: Request) {
  const ok = await rateLimit(`square-sync:${clientIp(req)}`, 3, 900); // 3 per 15 min
  if (!ok) return NextResponse.json({ error: 'Too many attempts. Try again later.' }, { status: 429 });

  const configuredSecret = process.env.SYNC_SECRET;
  if (!configuredSecret) {
    return NextResponse.json({ error: 'Sync is not configured.' }, { status: 500 });
  }

  const envErr = requireSquareEnv();
  if (envErr) return envErr;

  try {
    const body = await req.json().catch(() => ({}));
    const providedSecret = String(body?.secret ?? '');
    if (!safeEq(providedSecret, configuredSecret)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const results = [];

    for (const [id, service] of Object.entries(BOOKING_SERVICES)) {
      const priceCents = Math.round(service.price * 100);
      try {
        const existingVariation = await findExistingBySku(id);

        if (existingVariation) {
          const itemId = existingVariation.item_variation_data.item_id;
          const itemRes = await squareFetch(`/catalog/object/${itemId}`);
          const item = itemRes.object;

          const targetAmount = existingVariation.item_variation_data?.price_money?.amount;
          if (targetAmount === priceCents && item.item_data?.name === service.name) {
            results.push({ id, name: service.name, price: `$${service.price}`, action: 'unchanged' });
            continue;
          }

          await squareFetch('/catalog/object', {
            method: 'POST',
            body: JSON.stringify({
              idempotency_key: `epoch-svc-${id}-${item.version}-${Date.now()}`,
              object: {
                type: 'ITEM',
                id: item.id,
                version: item.version,
                item_data: {
                  ...item.item_data,
                  name: service.name,
                  variations: [
                    {
                      type: 'ITEM_VARIATION',
                      id: existingVariation.id,
                      version: existingVariation.version,
                      item_variation_data: {
                        ...existingVariation.item_variation_data,
                        name: service.name,
                        sku: id,
                        pricing_type: 'FIXED_PRICING',
                        price_money: { amount: priceCents, currency: 'USD' },
                      },
                    },
                  ],
                },
              },
            }),
          });
          results.push({ id, name: service.name, price: `$${service.price}`, action: 'updated' });
        } else {
          await squareFetch('/catalog/object', {
            method: 'POST',
            body: JSON.stringify({
              idempotency_key: `epoch-svc-create-${id}`,
              object: {
                type: 'ITEM',
                id: `#${id}`,
                item_data: {
                  name: service.name,
                  variations: [
                    {
                      type: 'ITEM_VARIATION',
                      id: `#${id}-var`,
                      item_variation_data: {
                        name: service.name,
                        sku: id,
                        pricing_type: 'FIXED_PRICING',
                        price_money: { amount: priceCents, currency: 'USD' },
                      },
                    },
                  ],
                },
              },
            }),
          });
          results.push({ id, name: service.name, price: `$${service.price}`, action: 'created' });
        }
      } catch (err) {
        console.error(`[square-sync] ${id} failed:`, err);
        results.push({ id, name: service.name, price: `$${service.price}`, action: 'error' });
      }
    }

    return NextResponse.json({ success: true, synced: results.length, results });
  } catch (err) {
    console.error('[square-sync]', err);
    return NextResponse.json({ error: 'Sync failed', detail: String(err) }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const ok = await rateLimit(`square-sync-status:${clientIp(req)}`, 20, 900); // 20 per 15 min
  if (!ok) return NextResponse.json({ error: 'Too many requests. Try again later.' }, { status: 429 });

  const envErr = requireSquareEnv();
  if (envErr) return envErr;

  const status = await Promise.all(Object.entries(BOOKING_SERVICES).map(async ([id, service]) => {
    try {
      const existing = await findExistingBySku(id);
      const inSquare = !!existing;
      const squarePriceCents = existing?.item_variation_data?.price_money?.amount ?? null;
      return {
        id, name: service.name, catalogPrice: `$${service.price}`, inSquare,
        squarePrice: squarePriceCents != null ? `$${(squarePriceCents / 100).toFixed(2)}` : null,
        synced: squarePriceCents === Math.round(service.price * 100),
      };
    } catch (err) {
      console.error(`[square-sync] status check for ${id} failed:`, err);
      return { id, name: service.name, catalogPrice: `$${service.price}`, inSquare: false, squarePrice: null, synced: false };
    }
  }));

  return NextResponse.json({ services: status });
}
