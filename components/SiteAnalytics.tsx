'use client';
// components/SiteAnalytics.tsx
// Records a page_view on every route change and a page_time (visible seconds)
// when the visitor leaves the page. Feeds /admin/insights. Renders nothing.

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { track } from '@/lib/track';

function externalRef(): string | undefined {
  try {
    if (!document.referrer) return undefined;
    const host = new URL(document.referrer).hostname.replace(/^www\./, '');
    return host && host !== window.location.hostname.replace(/^www\./, '') ? host : undefined;
  } catch {
    return undefined;
  }
}

export function SiteAnalytics() {
  const pathname = usePathname();
  const first = useRef(true);
  const visibleMs = useRef(0);
  const shownAt = useRef<number | null>(null);
  const currentPath = useRef<string | null>(null);

  useEffect(() => {
    const flush = () => {
      if (shownAt.current !== null) {
        visibleMs.current += Date.now() - shownAt.current;
        shownAt.current = null;
      }
      const secs = Math.round(visibleMs.current / 1000);
      if (currentPath.current && secs >= 1) {
        track('page_time', { path: currentPath.current, value: Math.min(secs, 1800) });
      }
      visibleMs.current = 0;
    };

    if (!pathname || pathname.startsWith('/admin')) {
      currentPath.current = null;
      return;
    }

    currentPath.current = pathname;
    visibleMs.current = 0;
    shownAt.current = document.visibilityState === 'visible' ? Date.now() : null;
    track('page_view', { path: pathname, ref: first.current ? externalRef() : undefined });
    first.current = false;

    const onVis = () => {
      if (document.visibilityState === 'hidden') {
        flush();
      } else {
        shownAt.current = Date.now();
      }
    };
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('pagehide', flush);
    return () => {
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('pagehide', flush);
      flush();
    };
  }, [pathname]);

  return null;
}
