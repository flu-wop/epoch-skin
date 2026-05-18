// app/shop/page.tsx

import { Metadata } from "next";
import { products } from "@/data/products";
import { ShopGrid } from "@/components/shop/ShopGrid";

export const metadata: Metadata = {
  title: "Shop Organic Skincare",
  description: "Discover 14 certified organic skincare formulas. Cruelty-free, small-batch, glass-skin focused.",
  alternates: { canonical: "https://epoch-skin.com/shop" },
  openGraph: {
    title: "Shop | Epoch Skin",
    url: "https://epoch-skin.com/shop",
    images: [{ url: "https://epoch-skin.com/og/og-shop.jpg", width: 1200, height: 630 }],
  },
};

export default function ShopPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-[#18181A] py-24 md:py-32 overflow-hidden">
        {/* Subtle gold texture */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #C9A96E 0%, transparent 60%), radial-gradient(circle at 80% 20%, #C9A96E 0%, transparent 50%)" }} />
        <div className="page-container relative text-center">
          <div className="gold-rule mx-auto mb-5" />
          <p className="eyebrow mb-4">The Collection</p>
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-5">
            Organic Skincare
          </h1>
          <p className="text-[#9A9088] font-sans text-base leading-relaxed max-w-lg mx-auto">
            14 certified organic formulas. Cold-process made, batch-tested, 
            and transparently labeled. Glass-skin results, every time.
          </p>
        </div>
      </section>

      {/* ── Product grid ── */}
      <section className="section-y bg-[#F8F4EF]">
        <div className="page-container">
          <ShopGrid products={products} />
        </div>
      </section>

      {/* ── Why choose ── */}
      <section className="section-y-sm bg-[#F2ECE4]">
        <div className="page-container">
          <div className="text-center mb-14">
            <div className="gold-rule mx-auto mb-5" />
            <h2 className="font-serif text-3xl md:text-4xl text-[#18181A]">
              The Epoch Difference
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "✦",
                title: "Certified Organic",
                body: "Every ingredient is INCI-listed. Certified organic extracts, batch-tested for pH and stability. No greenwashing.",
              },
              {
                icon: "◈",
                title: "Cruelty-Free Always",
                body: "Never tested on animals. Ethically sourced from suppliers who share our values — no exceptions.",
              },
              {
                icon: "◇",
                title: "Glass-Skin Results",
                body: "Every formula is designed to deliver the K-Beauty glass-skin effect: plump, luminous, barrier-strong skin.",
              },
            ].map((item) => (
              <div key={item.title} className="value-card">
                <span className="text-[#C9A96E] text-2xl mb-5 block">{item.icon}</span>
                <h3 className="font-serif text-xl text-[#18181A] mb-3">{item.title}</h3>
                <p className="text-[#9A9088] text-sm font-sans leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
