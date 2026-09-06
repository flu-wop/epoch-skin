'use client';
// components/admin/AdminShell.tsx
// Persistent nav across all /admin/* sections. Wraps only the
// authenticated dashboard content each page renders — the login screen
// (AdminLoginScreen) is returned before this ever mounts, so an
// unauthenticated visitor never sees the nav.

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { LogoutButton } from './LogoutButton';

const SECTIONS = [
  { href: '/admin/bookings',   label: 'Bookings' },
  { href: '/admin/orders',     label: 'Orders' },
  { href: '/admin/newsletter', label: 'Newsletter' },
  { href: '/admin/contact',    label: 'Contact' },
  { href: '/admin/sync',       label: 'Sync' },
];

export function AdminShell({ children, onLogout }: { children: React.ReactNode; onLogout?: () => void }) {
  const pathname = usePathname();
  const isHome = pathname === '/admin';

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="sticky top-0 z-20 border-b border-[#E5DCCF] bg-[#FAF7F2]/95 backdrop-blur">
        <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 overflow-x-auto">
            {!isHome && (
              <Link href="/admin" className="text-[#8C8680] hover:text-[#C9A96E] text-xs shrink-0 transition-colors">
                ← Admin
              </Link>
            )}
            <nav className="flex items-center gap-1">
              {SECTIONS.map(({ href, label }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`px-3 py-1.5 text-xs tracking-wide whitespace-nowrap transition-colors ${
                      active ? 'text-[#C4974A] bg-[#C4974A]/10' : 'text-[#8C8680] hover:text-[#1C1C1A]'
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <LogoutButton onLogout={onLogout} />
        </div>
      </div>
      {children}
    </div>
  );
}
