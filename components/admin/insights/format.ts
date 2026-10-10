// components/admin/insights/format.ts

export const money = (n: number, cents = false) =>
  n.toLocaleString('en-US', {
    style: 'currency', currency: 'USD',
    minimumFractionDigits: cents ? 2 : 0, maximumFractionDigits: cents ? 2 : 0,
  });

export const compactMoney = (n: number) =>
  n >= 1000 ? '$' + (n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, '') + 'K' : '$' + Math.round(n);

export const num = (n: number) => n.toLocaleString('en-US');

export const secs = (s: number) => {
  if (!s) return '—';
  const r = Math.round(s);
  return r >= 60 ? `${Math.floor(r / 60)}m ${r % 60}s` : `${r}s`;
};

export const pct = (a: number, b: number) => (b ? `${Math.round((a / b) * 100)}%` : '—');

export function delta(cur: number, prev: number): { label: string; dir: 'up' | 'down' | 'flat' } | null {
  if (!prev && !cur) return null;
  if (!prev) return { label: 'New', dir: 'up' };
  const change = ((cur - prev) / prev) * 100;
  if (Math.abs(change) < 1) return { label: 'Flat', dir: 'flat' };
  return { label: `${change > 0 ? '+' : ''}${Math.round(change)}%`, dir: change > 0 ? 'up' : 'down' };
}

const shortFmt = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
const longFmt = new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' });
export const shortDate = (d: string) => shortFmt.format(new Date(d.slice(0, 10) + 'T12:00:00Z'));
export const longDate = (d: string) => longFmt.format(new Date(d.slice(0, 10) + 'T12:00:00Z'));

export function time12(t: string) {
  if (/[ap]m/i.test(t)) return t.trim().replace(/\s*(am|pm)$/i, (x) => ' ' + x.trim().toUpperCase());
  const m = t.match(/^(\d{1,2}):(\d{2})/);
  if (!m) return t;
  const h = Number(m[1]);
  return `${((h + 11) % 12) + 1}:${m[2]} ${h >= 12 ? 'PM' : 'AM'}`;
}

// Chart colors — validated pair (dataviz validator, light surface).
export const SHOP = '#B8862F';
export const STUDIO = '#2E8253';
