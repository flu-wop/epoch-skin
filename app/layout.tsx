import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/Providers";
import { ScrollToTop } from "@/components/ScrollToTop";

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
  metadataBase: new URL('https://epoch-skin.vercel.app'),
  title: {
    default: "Epoch Skin | Organic Skincare & Premium Waxing Studio | New Orleans & Mobile",
    template: "%s | Epoch Skin",
  },
  description:
    "Experience transformative Organic Skincare and expert waxing services in New Orleans and Mobile. Licensed estheticians, cruelty-free products, and Brazilian waxing specialists. Book your appointment today.",
  keywords: [
    "Organic Skincare New Orleans",
    "Brazilian wax New Orleans",
    "Organic facial treatments",
    "licensed esthetician",
    "cruelty-free Skincare",
    "K-beauty New Orleans",
  ],
  authors: [{ name: "Kayla Ford", url: "https://epoch-skin.com/about" }],
  openGraph: {
    title: "Epoch Skin | Organic Skincare & Waxing Studio",
    description: "Transform your skin with Organic products and expert waxing in New Orleans",
    url: "https://epoch-skin.com",
    siteName: "Epoch Skin",
    images: [
      {
        url: "/og-image.jpg", // Create a 1200x630 image
        width: 1200,
        height: 630,
        alt: "Epoch Skin Organic Skincare Products",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Epoch Skin | Organic Skincare & Waxing",
    description: "New Orleans & Mobile's premier Organic Skincare and waxing studio",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://epoch-skin.com",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
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
        <ScrollToTop />
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
