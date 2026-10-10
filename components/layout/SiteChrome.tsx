'use client';
// components/layout/SiteChrome.tsx
// Public header + footer for every page EXCEPT /admin/*, which has its own
// shell (components/admin/AdminShell). Stacking both sticky headers and the
// marketing footer inside the admin made it cramped on mobile.

import { usePathname } from 'next/navigation';
import { SiteHeader } from './SiteHeader';
import { Footer } from './Footer';

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? '';
  if (pathname.startsWith('/admin')) return <>{children}</>;
  return (
    <>
      <SiteHeader />
      <main className="min-h-[60vh]">{children}</main>
      <Footer />
    </>
  );
}
