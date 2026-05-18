// app/layout.tsx

import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { Providers } from '@/components/Providers';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const SITE = 'https://epoch-skin.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: 'Epoch Skin | Organic Skincare & Premium Waxing Studio | New Orleans',
    template: '%s | Epoch Skin',
  },
  description: 'Experience transformative organic skincare and expert waxing in New Orleans. Licensed estheticians, certified organic formulas, and the glass-skin treatments.',
  keywords: ['Organic Skincare New Orleans', 'Brazilian wax New Orleans', 'glass skin treatment', 'licensed esthetician', 'cruelty-free skincare', 'K-beauty New Orleans'],
  authors: [{ name: 'Kayla Ford', url: SITE }],
  creator: 'Kayla Ford',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE,
    siteName: 'Epoch Skin',
    title: 'Epoch Skin | Organic Skincare & Waxing Studio',
    description: 'A new era of organic skincare. Expert waxing and glass-skin treatments in New Orleans.',
    images: [{ url: `${SITE}/og/og-default.jpg`, width: 1200, height: 630, alt: 'Epoch Skin' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Epoch Skin | Organic Skincare & Waxing',
    description: "New Orleans' premier organic skincare and waxing studio",
    images: [`${SITE}/og/og-default.jpg`],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F8F5F0',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-[#F8F5F0] text-[#1A1A18] font-sans antialiased">
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
