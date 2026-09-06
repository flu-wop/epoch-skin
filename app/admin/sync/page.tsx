"use client";
// app/admin/sync/page.tsx
// Admin page to trigger Stripe product sync.
// Protected server-side by SYNC_SECRET (constant-time compare, rate limited).

import { useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";

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

interface SessionCheck {
  id: string;
  amount: number | null;
  email: string | null;
  created: string;
  type: string;
  matched: boolean;
}

interface WebhookCheckResult {
  endpoint: {
    found: boolean;
    status: string | null;
    hasCheckoutEvent: boolean;
    apiVersion: string | null;
  };
  dbReachable: boolean;
  checkedCount: number;
  unmatchedCount: number;
  sessions: SessionCheck[];
}

interface EnvVarResult {
  name: string;
  group: string;
  present: boolean;
}

interface SquareSyncResult {
  id: string;
  name: string;
  price: string;
  action: string;
  detail?: string;
}

interface SquareStatusItem {
  id: string;
  name: string;
  catalogPrice: string;
  inSquare: boolean;
  squarePrice: string | null;
  synced: boolean;
}

export default function AdminSyncPage() {
  const [secret, setSecret]   = useState("");
  const [syncing, setSyncing] = useState(false);
  const [status, setStatus]   = useState<StatusItem[] | null>(null);
  const [results, setResults] = useState<SyncResult[] | null>(null);
  const [error, setError]     = useState("");
  const [checking, setChecking] = useState(false);
  const [webhookCheck, setWebhookCheck] = useState<WebhookCheckResult | null>(null);
  const [checkingWebhook, setCheckingWebhook] = useState(false);
  const [webhookError, setWebhookError] = useState("");
  const [envResults, setEnvResults] = useState<EnvVarResult[] | null>(null);
  const [checkingEnv, setCheckingEnv] = useState(false);
  const [envError, setEnvError] = useState("");
  const [squareStatus, setSquareStatus] = useState<SquareStatusItem[] | null>(null);
  const [squareResults, setSquareResults] = useState<SquareSyncResult[] | null>(null);
  const [squareSyncing, setSquareSyncing] = useState(false);
  const [squareChecking, setSquareChecking] = useState(false);
  const [squareError, setSquareError] = useState("");

  const checkSquareStatus = async () => {
    setSquareChecking(true);
    setSquareError("");
    try {
      const res = await fetch('/api/square/sync-services');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSquareStatus(data.services);
    } catch (err: unknown) {
      setSquareError(err instanceof Error ? err.message : 'Failed to check status');
    } finally {
      setSquareChecking(false);
    }
  };

  const runSquareSync = async () => {
    if (!secret) { setSquareError('Enter your sync secret first.'); return; }
    setSquareSyncing(true);
    setSquareError("");
    setSquareResults(null);
    try {
      const res = await fetch('/api/square/sync-services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSquareResults(data.results);
      await checkSquareStatus();
    } catch (err: unknown) {
      setSquareError(err instanceof Error ? err.message : 'Sync failed');
    } finally {
      setSquareSyncing(false);
    }
  };

  const checkEnv = async () => {
    if (!secret) { setEnvError('Enter your sync secret first.'); return; }
    setCheckingEnv(true);
    setEnvError("");
    try {
      const res = await fetch('/api/admin/env-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setEnvResults(data.results);
    } catch (err: unknown) {
      setEnvError(err instanceof Error ? err.message : 'Env check failed');
    } finally {
      setCheckingEnv(false);
    }
  };

  const checkWebhook = async () => {
    if (!secret) { setWebhookError('Enter your sync secret first.'); return; }
    setCheckingWebhook(true);
    setWebhookError("");
    try {
      const res = await fetch('/api/stripe/webhook-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setWebhookCheck(data);
    } catch (err: unknown) {
      setWebhookError(err instanceof Error ? err.message : 'Webhook check failed');
    } finally {
      setCheckingWebhook(false);
    }
  };

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
    <AdminShell>
      <div className="py-16 px-5">
        <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <p className="text-[11px] tracking-[0.28em] uppercase text-[#C9A96E] font-sans mb-3">Admin</p>
          <h1 className="font-serif text-4xl text-[#1C1C1A] mb-3">Catalog Sync</h1>
          <p className="text-[#5A5550] font-sans text-sm">
            Syncs your product/service catalog to Stripe (shop checkout) and Square (in-person sales). Safe to run any number of times — matches existing entries, never duplicates.
          </p>
        </div>

        {/* Run Sync — both, up top */}
        <div className="bg-white border border-[#E5DCCF] p-7 mb-6">
          <h2 className="font-serif text-xl text-[#1C1C1A] mb-5">Run Sync</h2>
          <input
            type="password"
            value={secret}
            onChange={e => setSecret(e.target.value)}
            placeholder="Sync secret (SYNC_SECRET env var)"
            className="w-full mb-4 px-4 py-3 border border-[#E5DCCF] text-sm font-sans
                       focus:outline-none focus:border-[#C9A96E] transition-colors"
          />
          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={runSync} disabled={syncing}
              className="flex-1 px-6 py-3 bg-[#3E4A3C] text-[#C4974A] text-[11px] tracking-[0.18em]
                         uppercase font-sans hover:bg-[#C4974A] hover:text-white
                         transition-all duration-400 disabled:opacity-50 whitespace-nowrap">
              {syncing ? 'Syncing...' : 'Sync Stripe Products'}
            </button>
            <button onClick={runSquareSync} disabled={squareSyncing}
              className="flex-1 px-6 py-3 bg-[#3E4A3C] text-[#C4974A] text-[11px] tracking-[0.18em]
                         uppercase font-sans hover:bg-[#C4974A] hover:text-white
                         transition-all duration-400 disabled:opacity-50 whitespace-nowrap">
              {squareSyncing ? 'Syncing to Square...' : 'Sync Square Services'}
            </button>
          </div>
          <p className="text-[#8C8680] text-xs font-sans mt-3">
            Requires the SYNC_SECRET value set in Vercel env vars. Stripe syncs your shop products; Square syncs your booking services.
          </p>

          {error && (
            <div className="mt-4 p-3 border border-red-200 bg-red-50">
              <p className="text-red-600 text-xs font-sans">{error}</p>
            </div>
          )}
          {squareError && (
            <div className="mt-4 p-3 border border-red-200 bg-red-50">
              <p className="text-red-600 text-xs font-sans">{squareError}</p>
            </div>
          )}

          {results && (
            <div className="mt-6 pt-6 border-t border-[#F0EBE0]">
              <p className="font-sans text-sm text-[#1C1C1A] mb-4">Stripe sync complete — {results.length} products processed</p>
              <div className="max-h-64 overflow-y-auto space-y-2">
                {results.map((r) => (
                  <div key={r.id} className="flex items-center justify-between py-2 border-b border-[#F0EBE0] last:border-0">
                    <span className="text-sm font-sans text-[#1C1C1A]">{r.name}</span>
                    <span className="text-xs font-sans font-medium px-2 py-1 uppercase tracking-wide"
                      style={{ color: actionColor[r.action] ?? '#5A5550' }}>
                      {r.action}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {squareResults && (
            <div className="mt-6 pt-6 border-t border-[#F0EBE0]">
              <p className="font-sans text-sm text-[#1C1C1A] mb-4">Square sync complete — {squareResults.length} services processed</p>
              {squareResults.some(r => r.action === 'error') && (
                <p className="text-xs font-sans text-red-600 mb-3">
                  {squareResults.filter(r => r.action === 'error').length} failed — click Sync Square Services again to retry (safe, matches on ID).
                </p>
              )}
              <div className="max-h-64 overflow-y-auto space-y-2">
                {squareResults.map((r) => (
                  <div key={r.id} className="py-2 border-b border-[#F0EBE0] last:border-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-sans text-[#1C1C1A]">{r.name}</span>
                      <span className="text-xs font-sans font-medium px-2 py-1 uppercase tracking-wide"
                        style={{ color: r.action === 'created' ? '#4A9B6F' : r.action === 'updated' ? '#C9A96E' : r.action === 'error' ? '#E0453A' : '#8C8680' }}>
                        {r.action}
                      </span>
                    </div>
                    {r.action === 'error' && r.detail && (
                      <p className="text-[10px] font-sans text-red-500 mt-1">{r.detail}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Status check */}
        <div className="bg-white border border-[#E5DCCF] p-7 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-xl text-[#1C1C1A]">Stripe Status</h2>
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

        {/* Square catalog status */}
        <div className="bg-white border border-[#E5DCCF] p-7 mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-serif text-xl text-[#1C1C1A]">Square Status</h2>
            <button onClick={checkSquareStatus} disabled={squareChecking}
              className="text-[11px] tracking-[0.18em] uppercase font-sans border border-[#E5DCCF]
                         text-[#5A5550] px-5 py-2 hover:border-[#C9A96E] hover:text-[#C9A96E]
                         transition-colors duration-300 disabled:opacity-50">
              {squareChecking ? 'Checking...' : 'Check Status'}
            </button>
          </div>
          <p className="text-[#8C8680] text-xs font-sans mb-5">
            Booking services pushed into your Square Item Library, ready to ring up on the Square reader/app for in-person sales.
          </p>

          {squareStatus ? (
            <div className="space-y-2">
              <p className="text-xs text-[#8C8680] font-sans mb-3">
                {squareStatus.filter(s => s.synced).length} / {squareStatus.length} services synced
              </p>
              <div className="max-h-64 overflow-y-auto space-y-1">
                {squareStatus.map((s) => (
                  <div key={s.id} className="flex items-center justify-between py-2 border-b border-[#F0EBE0] last:border-0">
                    <span className="text-sm font-sans text-[#1C1C1A] flex-1">{s.name}</span>
                    <div className="flex items-center gap-4 text-xs font-sans text-[#8C8680]">
                      <span>{s.catalogPrice}</span>
                      {s.inSquare ? (
                        <span className={`px-2 py-0.5 text-[9px] tracking-wide uppercase ${s.synced ? 'bg-[#EBF0EA] text-[#4A5745]' : 'bg-[#FEF3E8] text-[#E07A3A]'}`}>
                          {s.synced ? 'Synced' : `Square: ${s.squarePrice}`}
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 text-[9px] tracking-wide uppercase bg-red-50 text-red-500">Not in Square</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-[#8C8680] text-sm font-sans">Click &ldquo;Check Status&rdquo; to see current sync state.</p>
          )}
        </div>

        {/* Environment variables */}
        <div className="bg-white border border-[#E5DCCF] p-7 mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-serif text-xl text-[#1C1C1A]">Environment Variables</h2>
            <button onClick={checkEnv} disabled={checkingEnv}
              className="text-[11px] tracking-[0.18em] uppercase font-sans border border-[#E5DCCF]
                         text-[#5A5550] px-5 py-2 hover:border-[#C9A96E] hover:text-[#C9A96E]
                         transition-colors duration-300 disabled:opacity-50">
              {checkingEnv ? 'Checking...' : 'Check Env Vars'}
            </button>
          </div>
          <p className="text-[#8C8680] text-xs font-sans mb-5">
            Confirms which required environment variables are set in this deployment — never their values,
            just present or missing. Uses the same sync secret above.
          </p>

          {envError && (
            <div className="mb-4 p-3 border border-red-200 bg-red-50">
              <p className="text-red-600 text-xs font-sans">{envError}</p>
            </div>
          )}

          {envResults && (
            <div className="space-y-4">
              {Object.entries(
                envResults.reduce<Record<string, EnvVarResult[]>>((acc, r) => {
                  (acc[r.group] ??= []).push(r);
                  return acc;
                }, {})
              ).map(([group, vars]) => (
                <div key={group}>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#8C8680] font-sans mb-2">{group}</p>
                  <div className="flex flex-wrap gap-2">
                    {vars.map((v) => (
                      <span key={v.name} className={`px-2.5 py-1 text-[11px] font-sans ${
                        v.present ? 'bg-[#EBF0EA] text-[#4A5745]' : 'bg-red-50 text-red-600'
                      }`}>
                        {v.present ? '✓' : '✗'} {v.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              {envResults.every((r) => r.present) ? (
                <p className="text-xs font-sans text-[#4A5745] pt-2">All required environment variables are set.</p>
              ) : (
                <p className="text-xs font-sans text-red-600 pt-2">
                  {envResults.filter((r) => !r.present).length} variable(s) missing — set these in
                  Vercel → Project → Settings → Environment Variables, then redeploy.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Webhook health */}
        <div className="bg-white border border-[#E5DCCF] p-7 mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-serif text-xl text-[#1C1C1A]">Webhook Health</h2>
            <button onClick={checkWebhook} disabled={checkingWebhook}
              className="text-[11px] tracking-[0.18em] uppercase font-sans border border-[#E5DCCF]
                         text-[#5A5550] px-5 py-2 hover:border-[#C9A96E] hover:text-[#C9A96E]
                         transition-colors duration-300 disabled:opacity-50">
              {checkingWebhook ? 'Checking...' : 'Check Webhook'}
            </button>
          </div>
          <p className="text-[#8C8680] text-xs font-sans mb-5">
            Confirms the Stripe webhook is registered and enabled, then cross-checks the last 15 completed
            Stripe payments against Turso to catch cases where a customer paid but nothing got recorded.
            Uses the same sync secret above.
          </p>

          {webhookError && (
            <div className="mb-4 p-3 border border-red-200 bg-red-50">
              <p className="text-red-600 text-xs font-sans">{webhookError}</p>
            </div>
          )}

          {webhookCheck && (
            <div className="space-y-5">
              {/* Endpoint config */}
              <div className="flex flex-wrap gap-2">
                <span className={`px-2.5 py-1 text-[10px] tracking-wide uppercase font-sans ${
                  webhookCheck.endpoint.found && webhookCheck.endpoint.status === 'enabled'
                    ? 'bg-[#EBF0EA] text-[#4A5745]' : 'bg-red-50 text-red-600'
                }`}>
                  {webhookCheck.endpoint.found
                    ? `Endpoint ${webhookCheck.endpoint.status}`
                    : 'Endpoint not found'}
                </span>
                <span className={`px-2.5 py-1 text-[10px] tracking-wide uppercase font-sans ${
                  webhookCheck.endpoint.hasCheckoutEvent ? 'bg-[#EBF0EA] text-[#4A5745]' : 'bg-red-50 text-red-600'
                }`}>
                  {webhookCheck.endpoint.hasCheckoutEvent ? 'checkout.session.completed ✓' : 'Missing checkout.session.completed'}
                </span>
                {!webhookCheck.dbReachable && (
                  <span className="px-2.5 py-1 text-[10px] tracking-wide uppercase font-sans bg-red-50 text-red-600">
                    Turso unreachable
                  </span>
                )}
              </div>

              {/* Session cross-check */}
              {webhookCheck.checkedCount === 0 ? (
                <p className="text-xs text-[#8C8680] font-sans">No completed Stripe payments yet to cross-check.</p>
              ) : (
                <>
                  <p className="text-xs font-sans text-[#5A5550]">
                    {webhookCheck.unmatchedCount === 0
                      ? `All ${webhookCheck.checkedCount} recent completed payments are recorded in Turso.`
                      : `${webhookCheck.unmatchedCount} of ${webhookCheck.checkedCount} recent completed payments have NO matching record in Turso — the webhook likely isn't firing or is failing for these.`}
                  </p>
                  <div className="space-y-2">
                    {webhookCheck.sessions.map((s) => (
                      <div key={s.id} className="flex items-center justify-between py-2 border-b border-[#F0EBE0] last:border-0 text-xs font-sans">
                        <div className="min-w-0">
                          <p className="text-[#1C1C1A] truncate">{s.email ?? 'no email'} · {s.type}</p>
                          <p className="text-[#8C8680] text-[10px] mt-0.5">
                            {new Date(s.created).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                            {s.amount != null ? ` · $${(s.amount / 100).toFixed(2)}` : ''}
                          </p>
                        </div>
                        <span className={`px-2 py-0.5 text-[9px] tracking-wide uppercase flex-shrink-0 ml-3 ${
                          s.matched ? 'bg-[#EBF0EA] text-[#4A5745]' : 'bg-red-50 text-red-600'
                        }`}>
                          {s.matched ? 'Recorded' : 'Missing'}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

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
          <p className="text-xs font-sans text-[#5A5550] mb-2 mt-3">Check webhook health:</p>
          <code className="text-xs bg-white block p-3 border border-[#E5DCCF] text-[#1C1C1A]">
            {`POST /api/stripe/webhook-check\n{"secret": "your-sync-secret"}`}
          </code>
        </div>
      </div>
      </div>
    </AdminShell>
  );
}
