// lib/discounts.ts
// Single source of truth for word-of-mouth discount codes.
// Not secret — these are given out to customers — but centralized so the
// cart page preview and the server-side checkout route can never drift.
export const DISCOUNT_CODES: Record<string, number> = {
  EPOCH10: 0.10,
  EPOCH20: 0.20,
  EPOCH30: 0.30,
};

export function resolveDiscountCode(input: string): { code: string; pct: number } | null {
  const code = input.trim().toUpperCase().slice(0, 20);
  const pct = DISCOUNT_CODES[code];
  return pct ? { code, pct } : null;
}
