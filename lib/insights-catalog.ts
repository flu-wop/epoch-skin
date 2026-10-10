// lib/insights-catalog.ts
// Maps catalog items to the groups the Insights page shows. Pulled from the
// live product + booking catalogs so the dashboard can't drift from the site.

import { products } from '@/data/products';
import { BOOKING_SERVICES } from '@/lib/booking-catalog';

export const PRODUCT_GROUP: Record<string, string> = {
  cleansers: 'Cleanse & Tone',
  toners: 'Cleanse & Tone',
  serums: 'Serums',
  moisturizers: 'Moisture & Eye',
  eye: 'Moisture & Eye',
  lip: 'Moisture & Eye',
  masks: 'Masks',
  body: 'Body & Wax',
  oils: 'Body & Wax',
  tools: 'Body & Wax',
};

function serviceGroupForId(id: string): string {
  if (id.startsWith('w-') || id.startsWith('m-')) return 'Waxing';
  if (id.startsWith('facial-')) return 'Facials';
  if (id.startsWith('bacial-') || id.startsWith('vaj-')) return 'Back & Body';
  if (id.startsWith('mas-')) return 'Massage';
  if (id.startsWith('add-')) return 'Add-Ons';
  return 'Other';
}

export const SERVICE_BY_NAME: Map<string, { name: string; group: string; price: number }> = (() => {
  const m = new Map<string, { name: string; group: string; price: number }>();
  for (const [id, s] of Object.entries(BOOKING_SERVICES)) {
    const key = norm(s.name);
    if (!m.has(key)) m.set(key, { name: s.name, group: serviceGroupForId(id), price: s.price });
  }
  return m;
})();

export const SERVICE_COUNT = new Set(Object.values(BOOKING_SERVICES).map((s) => s.name)).size;
export const PRODUCT_COUNT = products.length;

export function norm(s: string): string {
  return s.toLowerCase().replace(/organic/g, '').replace(/[^a-z0-9]/g, '');
}

export function matchProduct(name: string) {
  const n = norm(name);
  if (!n) return undefined;
  return (
    products.find((p) => norm(p.name) === n) ??
    products.find((p) => norm(p.name).includes(n) || n.includes(norm(p.name)))
  );
}

export function productBySlugPath(path: string) {
  const m = path.match(/^\/shop\/([^/?#]+)/);
  if (!m) return undefined;
  const slug = decodeURIComponent(m[1]).toLowerCase();
  return products.find((p) => p.slug.toLowerCase() === slug);
}

export { products };
