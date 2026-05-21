"use client";
// app/shop/page.tsx
// Matches mockup 2: left sidebar "By Concern" filter, 2x2 product grid with gold label bars

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";

const CONCERNS = [
  "Glow",
  "Hydration",
  "Barrier Repair",
  "Brightening",
  "Anti-Aging",
  "Sensitivity",
  "Pore Refining",
  "Exfoliation",
  "Lip & Eye",
];

const CATEGORY_MAP: Record<string, string[]> = {
  "Glow":          ["cleansers", "toners", "masks"],
  "Hydration":     ["serums", "moisturizers"],
  "Barrier Repair":["moisturizers", "serums"],
  "Brightening":   ["serums", "toners", "masks"],
  "Anti-Aging":    ["serums", "moisturizers", "eye"],
  "Sensitivity":   ["cleansers", "masks", "moisturizers"],
  "Pore Refining": ["toners", "masks", "serums"],
  "Exfoliation":   ["masks", "serums"],
  "Lip & Eye":     ["lip", "eye"],
};

export default function ShopPage() {
  const [activeConcern, setActiveConcern] = useState<string | null>(null);

  const filtered = activeConcern
    ? products.filter((p) => (CATEGORY_MAP[activeConcern] ?? []).includes(p.category))
    : products;

  return (
    <div className="bg-[#F5F0EB] min-h-screen">

      {/* Page header */}
      <div className="text-center pt-16 pb-10 px-5">
        <h1 className="font-serif text-5xl md:text-6xl text-[#1A1A18] mb-2">
          Epoch Skin
        </h1>
        <div className="w-16 h-0.5 bg-[#C9A96E] mx-auto" />
      </div>

      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 pb-24">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* ── SIDEBAR — "By Concern" ── matches mockup 2 left column ── */}
          <aside className="lg:w-48 flex-shrink-0">
            <h2 className="font-serif text-xl text-[#1A1A18] mb-6">By Concern</h2>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => setActiveConcern(null)}
                  className={`w-full flex items-center justify-between py-2.5 text-sm font-sans
                               border-b border-[#E0D8CE] transition-colors ${
                    activeConcern === null
                      ? "text-[#C9A96E] font-medium"
                      : "text-[#6E6860] hover:text-[#1A1A18]"
                  }`}
                >
                  <span>All Products</span>
                  <span className="w-2 h-2 rounded-full bg-[#C9A96E]" />
                </button>
              </li>
              {CONCERNS.map((concern) => (
                <li key={concern}>
                  <button
                    onClick={() => setActiveConcern(concern)}
                    className={`w-full flex items-center justify-between py-2.5 text-sm font-sans
                                 border-b border-[#E0D8CE] transition-colors ${
                      activeConcern === concern
                        ? "text-[#C9A96E] font-medium"
                        : "text-[#6E6860] hover:text-[#1A1A18]"
                    }`}
                  >
                    <span>{concern}</span>
                    <span className={`w-2 h-2 rounded-full transition-colors ${
                      activeConcern === concern ? "bg-[#C9A96E]" : "bg-[#D0C8BE]"
                    }`} />
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* ── PRODUCT GRID — matches mockup 2: 2-col with gold label bars ── */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="font-serif text-2xl text-[#1A1A18] mb-3">No products found</p>
                <button onClick={() => setActiveConcern(null)}
                  className="text-[#C9A96E] text-sm font-sans underline">
                  View all
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {filtered.map((product) => (
                  <ShopProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Shop product card — matches mockup 2: image with gold label bar at bottom ──
function ShopProductCard({ product }: { product: any }) {
  return (
    <Link href={`/shop/${product.slug}`} className="group block overflow-hidden bg-white
                hover:shadow-[0_8px_40px_rgba(201,169,110,0.15)] transition-all duration-500">
      {/* Product image */}
      <div className="relative aspect-square overflow-hidden bg-[#F0EBE3]">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover object-center group-hover:scale-[1.04] transition-transform duration-700"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
      </div>

      {/* Gold label bar — matches mockup 2 exactly */}
      <div className="flex items-center justify-between px-5 py-4 bg-[#C9A96E]">
        <span className="font-serif text-white text-lg">{product.name}</span>
        <span className="text-white text-xl">›</span>
      </div>
    </Link>
  );
}
