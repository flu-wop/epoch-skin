// app/layout.tsx
import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/lib/cart-store'; // Adjust path if needed
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/Footer';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Epoch Skin | Organic Skincare & Waxing Studio',
  description: 'A New Era of Radiant Skin — Premium Organic Skincare & Luxurious Treatments in New Orleans & Mobile.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    images: [{ url: '/og/og-default.jpg' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-[#FAF7F2] text-[#1C1C1A] font-sans antialiased">
        <CartProvider>
          <SiteHeader />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}