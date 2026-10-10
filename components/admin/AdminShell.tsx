'use client';
// components/admin/AdminShell.tsx
// Persistent chrome across all /admin/* sections. Wraps only the
// authenticated dashboard content each page renders — the login screen
// (AdminLoginScreen) is returned before this ever mounts, so an
// unauthenticated visitor never sees the nav. The public site header/footer
// are hidden on /admin (components/layout/SiteChrome).

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Home, Sparkles, CalendarDays, ShoppingBag, Mail, MessageSquare, RefreshCw, ExternalLink,
} from 'lucide-react';
import { LogoutButton } from './LogoutButton';

export const ADMIN_SECTIONS = [
  { href: '/admin',            label: 'Home',       icon: Home },
  { href: '/admin/insights',   label: 'Insights',   icon: Sparkles },
  { href: '/admin/bookings',   label: 'Bookings',   icon: CalendarDays },
  { href: '/admin/orders',     label: 'Orders',     icon: ShoppingBag },
  { href: '/admin/newsletter', label: 'Newsletter', icon: Mail },
  { href: '/admin/contact',    label: 'Messages',   icon: MessageSquare },
  { href: '/admin/sync',       label: 'Sync',       icon: RefreshCw },
];

export function AdminShell({ children, onLogout }: { children: React.ReactNode; onLogout?: () => void }) {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  // Keep the active tab visible when the row scrolls sideways on phones.
  useEffect(() => {
    const nav = navRef.current;
    const el = nav?.querySelector<HTMLElement>('[aria-current="page"]');
    if (nav && el) nav.scrollLeft = el.offsetLeft - nav.clientWidth / 2 + el.clientWidth / 2;
  }, [pathname]);

  return (
    <div className="admin-root min-h-screen bg-[#FAF7F2] text-[#1C1C1A]">
      <header className="sticky top-0 z-30 bg-[#FAF7F2]/95 backdrop-blur border-b border-[#E5DCCF]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
          <Link href="/admin" className="flex items-baseline gap-2 min-w-0">
            <span className="text-[#C4974A] text-sm" aria-hidden>✦</span>
            <span className="font-serif text-lg text-[#1C1C1A] whitespace-nowrap">Epoch Skin</span>
            <span className="text-[10px] tracking-[0.22em] uppercase text-[#8C8680]">Admin</span>
          </Link>
          <div className="flex items-center gap-4 shrink-0">
            <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-[#5A5550] hover:text-[#A87C30] transition-colors" aria-label="View site">
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View site</span>
            </Link>
            <LogoutButton onLogout={onLogout} />
          </div>
        </div>
        <div className="relative max-w-6xl mx-auto">
          <nav ref={navRef} aria-label="Admin sections" className="relative flex gap-1 overflow-x-auto no-scrollbar px-3 sm:px-5 pb-2">
            {ADMIN_SECTIONS.map(({ href, label, icon: Icon }) => {
              const active = href === '/admin' ? pathname === '/admin' : pathname?.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={`inline-flex items-center gap-1.5 px-3 h-9 text-xs tracking-wide whitespace-nowrap shrink-0 transition-colors ${
                    active ? 'bg-[#3E4A3C] text-[#F2E6C8]' : 'text-[#5A5550] hover:text-[#1C1C1A] hover:bg-[#F2EBE0]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" strokeWidth={1.8} aria-hidden />
                  {label}
                </Link>
              );
            })}
          </nav>
          <div className="pointer-events-none absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-[#FAF7F2] to-transparent md:hidden" aria-hidden />
        </div>
      </header>
      {children}
    </div>
  );
}

// Shared page frame so every admin section has the same margins.
export function AdminPage({ children }: { children: React.ReactNode }) {
  return <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">{children}</main>;
}

export function AdminPageHeader({ eyebrow = 'Admin', title, description, actions }: {
  eyebrow?: string; title: string; description?: string; actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-6 sm:mb-8">
      <div className="min-w-0">
        <p className="text-[10px] tracking-[0.26em] uppercase text-[#A87C30] mb-1.5">{eyebrow}</p>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1C1A] leading-tight">{title}</h1>
        {description && <p className="text-sm text-[#8C8680] mt-1.5">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export const adminBtn = {
  primary: 'inline-flex items-center justify-center gap-1.5 h-10 px-4 text-[11px] tracking-[0.16em] uppercase bg-[#3E4A3C] text-[#F2E6C8] hover:bg-[#2E3A2C] transition-colors disabled:opacity-50',
  secondary: 'inline-flex items-center justify-center gap-1.5 h-10 px-4 text-[11px] tracking-[0.16em] uppercase border border-[#E5DCCF] bg-white text-[#5A5550] hover:border-[#C4974A] hover:text-[#1C1C1A] transition-colors disabled:opacity-50',
};
