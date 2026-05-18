// app/layout.tsx

import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import { Providers } from '@/components/Providers';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
  display: 'swap',
});

const SITE = 'https://epoch-skin.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: 'Epoch Skin | Organic Skincare & Premium Waxing Studio | New Orleans & Mobile',
    template: '%s | Epoch Skin',
  },
  description: 'Experience transformative organic skincare and expert waxing services in New Orleans and Mobile. Licensed estheticians, cruelty-free products, and Brazilian waxing specialists.',
  keywords: ['Organic Skincare New Orleans', 'Brazilian wax New Orleans', 'Organic facial treatments', 'licensed esthetician', 'cruelty-free skincare', 'K-beauty New Orleans', 'glass skin treatment'],
  authors: [{ name: 'Kayla Ford', url: SITE }],
  creator: 'Kayla Ford',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE,
    siteName: 'Epoch Skin',
    title: 'Epoch Skin | Organic Skincare & Waxing Studio',
    description: 'Transform your skin with organic products and expert waxing in New Orleans',
    images: [
      {
        url: `${SITE}/og/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: 'Epoch Skin Organic Skincare Products',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Epoch Skin | Organic Skincare & Waxing',
    description: "New Orleans & Mobile's premier organic skincare and waxing studio",
    images: [`${SITE}/og/og-default.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: SITE,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#111111',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="bg-[#FAFAF8] text-[#111] font-sans antialiased">
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
