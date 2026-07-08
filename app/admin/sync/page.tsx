"use client";
// app/admin/sync/page.tsx
// Admin page to trigger Stripe product sync.
// Protected server-side by SYNC_SECRET (constant-time compare, rate limited).

import { useState } from "react";

interface SyncResult {
  id: string;
  name: string;
  price: string;
  action: string;
  priceId: string;
}

interface StatusItem {
  id: string;
  name: string;
  catalogPrice: string;
  inStripe: boolean;
  stripePrice: string | null;
  synced: boolean;
}

export default function AdminSyncPage() {
  const [secret, setSecret]   = useState("");
  const [syncing, setSyncing] = useState(false);
  const [status, setStatus]   = useState<StatusItem[] | null>(null);
  const [results, setResults] = useState<SyncResult[] | null>(null);
  const [error, setError]     = useState("");
  const [checking, setChecking] = useState(false);

  const checkStatus = async () => {
    setChecking(true);
    setError("");
    try {
      const res = await fetch('/api/stripe/sync-products');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setStatus(data.products);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to check status');
    } finally {
      setChecking(false);
    }
  };

  const runSync = async () => {
    if (!secret) { setError('Enter your sync secret first.'); return; }
    setSyncing(true);
    setError("");
    setResults(null);
    try {
      const res = await fetch('/api/stripe/sync-products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResults(data.results);
      // Refresh status after sync
      await checkStatus();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Sync failed');
    } finally {
      setSyncing(false);
    }
  };

  const actionColor: Record<string, string> = {
    created: '#4A9B6F',
    updated: '#C9A96E',
    'price-updated': '#E07A3A',
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-16 px-5">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <p className="text-[11px] tracking-[0.28em] uppercase text-[#C9A96E] font-sans mb-3">Admin</p>
          <h1 className="font-serif text-4xl text-[#1C1C1A] mb-3">Stripe Product Sync</h1>
          <p className="text-[#5A5550] font-sans text-sm">
            Syncs all 14 products from your catalog to Stripe. Safe to run multiple times — it will create new products or update existing ones without creating duplicates.
          </p>
        </div>

        {/* Status check */}
        <div className="bg-white border border-[#E5DCCF] p-7 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-xl text-[#1C1C1A]">Current Status</h2>
            <button onClick={checkStatus} disabled={checking}
              className="text-[11px] tracking-[0.18em] uppercase font-sans border border-[#E5DCCF]
                         text-[#5A5550] px-5 py-2 hover:border-[#C9A96E] hover:text-[#C9A96E]
                         transition-colors duration-300 disabled:opacity-50">
              {checking ? 'Checking...' : 'Check Status'}
            </button>
          </div>

          {status ? (
            <div className="space-y-2">
              <p className="text-xs text-[#8C8680] font-sans mb-3">
                {status.filter(s => s.synced).length} / {status.length} products synced
              </p>
              {status.map((s) => (
                <div key={s.id} className="flex items-center justify-between py-2.5 border-b border-[#F0EBE0] last:border-0">
                  <span className="text-sm font-sans text-[#1C1C1A] flex-1">{s.name}</span>
                  <div className="flex items-center gap-4 text-xs font-sans text-[#8C8680]">
                    <span>{s.catalogPrice}</span>
                    {s.inStripe ? (
                      <span className={`px-2 py-0.5 text-[9px] tracking-wide uppercase ${s.synced ? 'bg-[#EBF0EA] text-[#4A5745]' : 'bg-[#FEF3E8] text-[#E07A3A]'}`}>
                        {s.synced ? 'Synced' : `Stripe: ${s.stripePrice}`}
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 text-[9px] tracking-wide uppercase bg-[#F5EDD8] text-[#C9A96E]">Not in Stripe</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[#8C8680] text-sm font-sans">Click &ldquo;Check Status&rdquo; to see current sync state.</p>
          )}
        </div>

        {/* Sync trigger */}
        <div className="bg-white border border-[#E5DCCF] p-7 mb-6">
          <h2 className="font-serif text-xl text-[#1C1C1A] mb-5">Run Sync</h2>
          <div className="flex gap-3 mb-4">
            <input
              type="password"
              value={secret}
              onChange={e => setSecret(e.target.value)}
              placeholder="Sync secret (SYNC_SECRET env var)"
              className="flex-1 px-4 py-3 border border-[#E5DCCF] text-sm font-sans
                         focus:outline-none focus:border-[#C9A96E] transition-colors"
            />
            <button onClick={runSync} disabled={syncing}
              className="px-6 py-3 bg-[#3E4A3C] text-[#C4974A] text-[11px] tracking-[0.18em]
                         uppercase font-sans hover:bg-[#C4974A] hover:text-white
                         transition-all duration-400 disabled:opacity-50 whitespace-nowrap">
              {syncing ? 'Syncing...' : 'Sync Now'}
            </button>
          </div>
          <p className="text-[#8C8680] text-xs font-sans">
            Requires the SYNC_SECRET value set in Vercel env vars.
          </p>
        </div>

        {/* Results */}
        {results && (
          <div className="bg-white border border-[#E5DCCF] p-7">
            <h2 className="font-serif text-xl text-[#1C1C1A] mb-5">
              Sync Complete — {results.length} products processed
            </h2>
            <div className="space-y-2">
              {results.map((r) => (
                <div key={r.id} className="flex items-center justify-between py-2.5 border-b border-[#F0EBE0] last:border-0">
                  <div>
                    <p className="text-sm font-sans text-[#1C1C1A]">{r.name}</p>
                    <p className="text-[10px] font-sans text-[#8C8680] mt-0.5">{r.priceId}</p>
                  </div>
                  <span className="text-xs font-sans font-medium px-2 py-1 uppercase tracking-wide"
                    style={{ color: actionColor[r.action] ?? '#5A5550' }}>
                    {r.action}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 border border-red-200 bg-red-50">
            <p className="text-red-600 text-sm font-sans">{error}</p>
          </div>
        )}

        <div className="mt-8 p-5 bg-[#F5F0E8] border border-[#E5DCCF]">
          <p className="text-[11px] tracking-[0.18em] uppercase text-[#C9A96E] font-sans mb-2">API Usage</p>
          <p className="text-xs font-sans text-[#5A5550] mb-2">Check status (no auth):</p>
          <code className="text-xs bg-white block p-3 border border-[#E5DCCF] text-[#1C1C1A]">
            GET /api/stripe/sync-products
          </code>
          <p className="text-xs font-sans text-[#5A5550] mb-2 mt-3">Run sync:</p>
          <code className="text-xs bg-white block p-3 border border-[#E5DCCF] text-[#1C1C1A]">
            {`POST /api/stripe/sync-products\n{"secret": "your-sync-secret"}`}
          </code>
        </div>
      </div>
    </div>
  );
}
