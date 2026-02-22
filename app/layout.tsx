import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/Providers";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Epoch Skin - Organic Skincare & Premium Waxing Studio",
    template: "%s | Epoch Skin",
  },
  description:
    "Premium waxing studio and curated organic skincare in New Orleans. Expert body and facial waxing, organic facials, and K-Beauty treatments by licensed estheticians.",
  keywords: [
    "organic skincare",
    "waxing studio",
    "New Orleans",
    "facial waxing",
    "body waxing",
    "organic facial",
    "licensed esthetician",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${inter.variable} antialiased`}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
