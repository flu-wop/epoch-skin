// app/layout.tsx
import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';           // ← Make sure globals.css actually exists in /app/
import { CartProvider } from '@/lib/cart-store'; // We'll fix this next if needed

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Epoch Skin | Organic Skincare & Waxing Studio',
  description: 'A New Era of Radiant Skin — Premium Organic Skincare & Luxurious Treatments',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-[#FAF7F2] text-[#1C1C1A] font-sans antialiased">
        {/* CartProvider - we'll adjust if the export is wrong */}
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}