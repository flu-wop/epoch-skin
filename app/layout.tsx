// app/layout.tsx
import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { Providers } from '@/components/Providers';
import { SiteHeader } from '@/components/layout/SiteHeader';
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
    default: 'Epoch Skin | Organic Skincare & Waxing Studio | New Orleans',
    template: '%s | Epoch Skin',
  },
  description: 'Certified organic skincare and expert waxing in New Orleans. Glass-skin K-Beauty treatments by Louisiana State Board licensed estheticians.',
  keywords: ['Organic Skincare New Orleans', 'Brazilian wax New Orleans', 'glass skin treatment', 'licensed esthetician'],
  authors: [{ name: 'Kayla Ford', url: SITE }],
  creator: 'Kayla Ford',
  openGraph: {
    type: 'website', locale: 'en_US', url: SITE, siteName: 'Epoch Skin',
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
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: SITE },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FAF7F2',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-[#FAF7F2] text-[#1C1C1A] font-sans antialiased">
        <Providers>
          <SiteHeader />
          <main className="min-h-[60vh]">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
