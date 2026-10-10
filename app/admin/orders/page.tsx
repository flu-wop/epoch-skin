'use client';
// app/admin/orders/page.tsx
// Admin dashboard for viewing all Epoch Skin product orders from Turso.
// Auth: POST /api/admin/login sets an httpOnly session cookie (see lib/admin-auth.ts).
// The password is verified server-side only — never shipped to the client.

import { useState, useEffect } from 'react';
import { AdminLoginScreen } from '@/components/admin/AdminLoginScreen';
import { RefreshCw, Search } from 'lucide-react';
import { AdminShell, AdminPage, AdminPageHeader, adminBtn } from '@/components/admin/AdminShell';

interface OrderItem {
  name: string;
  quantity: number;
  amountCents: number;
}

interface Order {
  id: number;
  email: string;
  items: OrderItem[];
  subtotal_cents: number;
  discount_code: string | null;
  tax_cents: number;
  total_cents: number;
  stripe_session_id: string | null;
  created_at: string;
}

function money(cents: number) {
  return (cents / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

const orderDate = (ts: string) =>
  new Date(ts.replace(' ', 'T') + 'Z').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'America/Chicago' });
const monthKey = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Chicago', year: 'numeric', month: '2-digit' });

export default function AdminOrdersPage() {
  const [authed, setAuthed]         = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [orders, setOrders]         = useState<Order[]>([]);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState('');
  const [filter, setFilter]         = useState('');
  const [sortKey, setSortKey]       = useState<'created_at' | 'total_cents' | 'email'>('created_at');
  const [sortDir, setSortDir]       = useState<'asc' | 'desc'>('desc');

  const fetchOrders = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/orders');
      if (res.status === 401) {
        setAuthed(false);
        return;
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed to load orders');
      setOrders(data.orders ?? []);
      setAuthed(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
      setCheckingSession(false);
    }
  };

  // On mount: an existing session cookie (up to 8h) means no re-login needed.
  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSort = (key: typeof sortKey) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  const filtered = orders
    .filter(o => {
      if (!filter) return true;
      const q = filter.toLowerCase();
      return (
        o.email.toLowerCase().includes(q) ||
        o.items.some(i => i.name.toLowerCase().includes(q)) ||
        (o.discount_code ?? '').toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      const cmp = sortKey === 'total_cents'
        ? a.total_cents - b.total_cents
        : String(a[sortKey] ?? '').localeCompare(String(b[sortKey] ?? ''));
      return sortDir === 'asc' ? cmp : -cmp;
    });

  const totalRevenue = filtered.reduce((sum, o) => sum + o.total_cents, 0);

  const SortIcon = ({ col }: { col: typeof sortKey }) => (
    <span className="ml-1 text-[#C4974A] opacity-70">
      {sortKey === col ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}
    </span>
  );

  // ── Checking for existing session ───────────────────────────────
  if (checkingSession) {
    return <div className="min-h-screen bg-[#FAF7F2]" />;
  }

  // ── Login screen ────────────────────────────────────────────────
  if (!authed) {
    return <AdminLoginScreen title="Orders" onSuccess={fetchOrders} />;
  }

  const thisMonth = monthKey.format(new Date());
  const monthCount = orders.filter(o => monthKey.format(new Date(o.created_at.replace(' ', 'T') + 'Z')) === thisMonth).length;

  // ── Dashboard ────────────────────────────────────────────────────
  return (
    <AdminShell onLogout={() => setAuthed(false)}>
      <AdminPage>
        <AdminPageHeader
          title="Orders"
          actions={
            <button onClick={fetchOrders} disabled={loading} className={adminBtn.secondary}>
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh
            </button>
          }
        />

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6">
          {[
            { label: 'Orders', value: String(filtered.length) },
            { label: 'Revenue', value: money(totalRevenue).replace(/\.00$/, '') },
            { label: 'This month', value: String(monthCount) },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white border border-[#E5DCCF] px-3 py-3 sm:p-5 min-w-0">
              <p className="text-[10px] tracking-[0.16em] uppercase text-[#8C8680] mb-1.5 truncate">{label}</p>
              <p className="font-serif text-xl sm:text-3xl text-[#1C1C1A] leading-none truncate">{value}</p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="relative mb-4 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C8680]" aria-hidden />
          <input
            type="search"
            value={filter}
            onChange={e => setFilter(e.target.value)}
            placeholder="Search email, item, or discount code"
            aria-label="Search orders"
            className="w-full h-10 pl-9 pr-3 border border-[#E5DCCF] bg-white text-sm focus:outline-none focus:border-[#C4974A]"
          />
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 border border-red-200 bg-red-50">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {loading && orders.length === 0 ? (
          <div className="h-64 bg-white border border-[#E5DCCF] animate-pulse" />
        ) : filtered.length === 0 ? (
          <div className="text-center py-14 px-5 bg-white border border-[#E5DCCF]">
            <p className="font-serif text-xl sm:text-2xl text-[#1C1C1A] mb-2">{filter ? 'No matches' : 'No orders yet'}</p>
            <p className="text-[#8C8680] text-sm">{filter ? 'Try a different search.' : 'Orders will appear here once customers check out from the shop.'}</p>
          </div>
        ) : (
          <>
            {/* Mobile cards */}
            <ul className="sm:hidden bg-white border border-[#E5DCCF] divide-y divide-[#F0EBE0]">
              {filtered.map((o) => (
                <li key={o.id} className="px-4 py-3.5">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="text-[11px] text-[#8C8680]">{orderDate(o.created_at)}</p>
                    <p className="text-sm text-[#1C1C1A] tabular-nums font-medium">{money(o.total_cents)}</p>
                  </div>
                  <ul className="mt-1 text-sm text-[#1C1C1A]">
                    {o.items.map((it, idx) => <li key={idx}>{it.name} <span className="text-[#8C8680]">× {it.quantity}</span></li>)}
                  </ul>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5">
                    <a href={`mailto:${o.email}`} className="text-xs text-[#A87C30] break-all">{o.email}</a>
                    {o.discount_code && <span className="text-[9px] tracking-wide uppercase bg-[#F0EBE0] text-[#5A5550] px-1.5 py-0.5">{o.discount_code}</span>}
                  </div>
                </li>
              ))}
            </ul>

            {/* Table (sm and up) */}
            <div className="hidden sm:block bg-white border border-[#E5DCCF] overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#E5DCCF]">
                    {([
                      ['created_at', 'Date'],
                      ['email',      'Customer'],
                      ['total_cents','Total'],
                    ] as [typeof sortKey, string][]).map(([key, label]) => (
                      <th key={key} className="text-left px-4 lg:px-5 py-3.5 text-[10px] tracking-[0.2em] uppercase font-normal text-[#8C8680]">
                        <button onClick={() => handleSort(key)} className="uppercase tracking-[0.2em] hover:text-[#A87C30] transition-colors">
                          {label}<SortIcon col={key} />
                        </button>
                      </th>
                    ))}
                    <th className="text-left px-4 lg:px-5 py-3.5 text-[10px] tracking-[0.2em] uppercase font-normal text-[#8C8680]">Items</th>
                    <th className="text-left px-4 lg:px-5 py-3.5 text-[10px] tracking-[0.2em] uppercase font-normal text-[#8C8680]">Discount</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((o) => (
                    <tr key={o.id} className="border-b border-[#F0EBE0] last:border-0 hover:bg-[#FEF9F2] transition-colors align-top">
                      <td className="px-4 lg:px-5 py-4 text-[#1C1C1A] whitespace-nowrap">{orderDate(o.created_at)}</td>
                      <td className="px-4 lg:px-5 py-4">
                        <a href={`mailto:${o.email}`} className="text-[#A87C30] text-xs hover:underline break-all">{o.email}</a>
                      </td>
                      <td className="px-4 lg:px-5 py-4 text-[#1C1C1A] font-medium whitespace-nowrap tabular-nums">{money(o.total_cents)}</td>
                      <td className="px-4 lg:px-5 py-4 text-[#1C1C1A] text-xs min-w-[200px]">
                        {o.items.map((it, idx) => <div key={idx}>{it.name} × {it.quantity}</div>)}
                      </td>
                      <td className="px-4 lg:px-5 py-4 text-[#5A5550] whitespace-nowrap">{o.discount_code ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </AdminPage>
    </AdminShell>
  );
}
