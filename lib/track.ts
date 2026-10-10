// lib/track.ts
// Client-side event sender for /admin/insights. No cookies, no third parties.
// Session id lives in sessionStorage (one per browser tab, gone when it closes).

export type TrackType =
  | 'page_view' | 'page_time' | 'add_to_cart' | 'checkout_start' | 'service_select' | 'booking_start';

function sessionId(): string {
  try {
    let id = sessionStorage.getItem('es_sid');
    if (!id) {
      id = Math.random().toString(36).slice(2) + Date.now().toString(36);
      sessionStorage.setItem('es_sid', id);
    }
    return id;
  } catch {
    return 'nostore' + Math.random().toString(36).slice(2, 10);
  }
}

export function track(type: TrackType, data: { item?: string; value?: number; path?: string; ref?: string } = {}) {
  if (typeof window === 'undefined') return;
  const path = data.path ?? window.location.pathname;
  if (path.startsWith('/admin')) return;
  if (window.location.hostname === 'localhost' && !('esTrackLocal' in window)) return;
  const payload = JSON.stringify({ type, sid: sessionId(), path, ...data });
  try {
    if (navigator.sendBeacon && navigator.sendBeacon('/api/track', payload)) return;
  } catch {
    /* fall through */
  }
  fetch('/api/track', { method: 'POST', body: payload, keepalive: true }).catch(() => {});
}
