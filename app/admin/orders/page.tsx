'use client';
// app/admin/orders/page.tsx
// Admin dashboard for viewing all Epoch Skin product orders from Turso.
// Auth: POST /api/admin/login sets an httpOnly session cookie (see lib/admin-auth.ts).
// The password is verified server-side only — never shipped to the client.

import { useState, useEffect } from 'react';
import { AdminLoginScreen } from '@/components/admin/AdminLoginScreen';
import { AdminShell } from '@/components/admin/AdminShell';

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
  return `$${(cents / 100).toFixed(2)}`;
}

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
      const av = a[sortKey] ?? '';
      const bv = b[sortKey] ?? '';
      const cmp = String(av).localeCompare(String(bv));
      return sortDir === 'asc' ? cmp : -cmp;
    });

  const totalRevenue = filtered.reduce((sum, o) => sum + o.total_cents, 0);

  const SortIcon = ({ col }: { col: typeof sortKey }) => (
    <span className="ml-1 text-[#C9A96E] opacity-60">
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

  // ── Dashboard ────────────────────────────────────────────────────
  return (
    <AdminShell onLogout={() => setAuthed(false)}>
      <div className="py-12 px-5">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="flex items-start justify-between mb-10">
            <div>
              <p className="text-[11px] tracking-[0.28em] uppercase text-[#C9A96E] font-sans mb-2">Admin</p>
              <h1 className="font-serif text-4xl text-[#1C1C1A]">Orders</h1>
            </div>
            <button
              onClick={fetchOrders}
              className="text-[11px] tracking-[0.18em] uppercase font-sans border border-[#E5DCCF]
                         text-[#5A5550] px-5 py-2.5 hover:border-[#C9A96E] hover:text-[#C9A96E]
                         transition-colors duration-300"
            >
              Refresh
            </button>
          </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Orders', value: filtered.length },
            { label: 'Total Revenue', value: money(totalRevenue) },
            { label: 'This Month', value: filtered.filter(o => o.created_at.startsWith(new Date().toISOString().slice(0,7))).length },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white border border-[#E5DCCF] p-6">
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#8C8680] font-sans mb-2">{label}</p>
              <p className="font-serif text-3xl text-[#1C1C1A]">{value}</p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="mb-5">
          <input
            type="text"
            value={filter}
            onChange={e => setFilter(e.target.value)}
            placeholder="Search by email, item, or discount code..."
            className="w-full max-w-sm px-4 py-2.5 border border-[#E5DCCF] bg-white text-sm font-sans
                       focus:outline-none focus:border-[#C9A96E] transition-colors"
          />
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 border border-red-200 bg-red-50">
            <p className="text-red-600 text-sm font-sans">{error}</p>
          </div>
        )}

        {/* Table */}
        {loading ? (
          <div className="text-center py-20">
            <p className="text-[#8C8680] font-sans text-sm tracking-widest uppercase">Loading...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-white border border-[#E5DCCF]">
            <p className="font-serif text-2xl text-[#1C1C1A] mb-2">No orders yet</p>
            <p className="text-[#8C8680] text-sm font-sans">Orders will appear here once customers check out from the shop.</p>
          </div>
        ) : (
          <div className="bg-white border border-[#E5DCCF] overflow-x-auto">
            <table className="w-full text-sm font-sans">
              <thead>
                <tr className="border-b border-[#E5DCCF]">
                  {([
                    ['created_at', 'Date'],
                    ['email',      'Customer'],
                    ['total_cents','Total'],
                  ] as [typeof sortKey, string][]).map(([key, label]) => (
                    <th
                      key={key}
                      onClick={() => handleSort(key)}
                      className="text-left px-5 py-3.5 text-[10px] tracking-[0.2em] uppercase
                                 text-[#8C8680] cursor-pointer hover:text-[#C9A96E] transition-colors select-none"
                    >
                      {label}<SortIcon col={key} />
                    </th>
                  ))}
                  <th className="text-left px-5 py-3.5 text-[10px] tracking-[0.2em] uppercase text-[#8C8680]">Items</th>
                  <th className="text-left px-5 py-3.5 text-[10px] tracking-[0.2em] uppercase text-[#8C8680]">Discount</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((o, i) => (
                  <tr
                    key={o.id}
                    className={`border-b border-[#F0EBE0] last:border-0 transition-colors
                      ${i % 2 === 0 ? 'bg-white' : 'bg-[#FDFAF6]'}
                      hover:bg-[#FEF9F2]`}
                  >
                    <td className="px-5 py-4 text-[#1C1C1A] whitespace-nowrap">
                      {new Date(o.created_at.replace(' ', 'T') + 'Z').toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric'
                      })}
                    </td>
                    <td className="px-5 py-4">
                      <a href={`mailto:${o.email}`} className="text-[#C9A96E] text-xs hover:underline">{o.email}</a>
                    </td>
                    <td className="px-5 py-4 text-[#C9A96E] font-medium whitespace-nowrap">
                      {money(o.total_cents)}
                    </td>
                    <td className="px-5 py-4 text-[#1C1C1A] text-xs max-w-[260px]">
                      {o.items.map((it, idx) => (
                        <div key={idx}>{it.name} × {it.quantity}</div>
                      ))}
                    </td>
                    <td className="px-5 py-4 text-[#5A5550] whitespace-nowrap">
                      {o.discount_code ?? '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
      </div>
    </AdminShell>
  );
}
