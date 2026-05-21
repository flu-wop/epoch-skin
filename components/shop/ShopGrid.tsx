"use client";
// components/shop/ShopGrid.tsx

import { useState } from "react";
import { ProductCard } from "@/components/shop/ProductCard";
import type { Product } from "@/lib/types";

const FILTERS = [
  { label: "All",         value: "all" },
  { label: "Cleansers",   value: "cleansers" },
  { label: "Serums",      value: "serums" },
  { label: "Moisturizers",value: "moisturizers" },
  { label: "Masks",       value: "masks" },
  { label: "Toners",      value: "toners" },
  { label: "Lip & Eye",   value: "lip-eye" },
  { label: "Body",        value: "body" },
];

interface Props { products: Product[] }

export function ShopGrid({ products }: Props) {
  const [active, setActive] = useState("all");

  const filtered = active === "all"
    ? products
    : products.filter((p) => {
        if (active === "lip-eye") return ["lip", "eye"].includes(p.category);
        if (active === "body") return ["body", "wax"].includes(p.category);
        return p.category === active;
      });

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-wrap gap-2 mb-12">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setActive(f.value)}
            className={`px-5 py-2 text-[10px] tracking-[0.18em] uppercase font-sans transition-all duration-300 ${
              active === f.value
                ? "bg-[#18181A] text-[#C9A96E]"
                : "border border-[#E8E0D5] text-[#9A9088] hover:border-[#C9A96E] hover:text-[#C9A96E]"
            }`}
          >
            {f.label}
          </button>
        ))}
        <span className="ml-auto text-[#C8C0B8] text-xs font-sans self-center">
          {filtered.length} product{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((product, i) => (
          <ProductCard key={product.id} product={product} priority={i < 4} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="font-serif text-2xl text-[#18181A] mb-3">No products found</p>
          <button onClick={() => setActive("all")} className="text-[#C9A96E] text-sm font-sans underline">
            View all products
          </button>
        </div>
      )}
    </div>
  );
}
