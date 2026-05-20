"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import { products } from "@/data/products";

const CONCERNS = [
  { label: "All Products",  ids: "all" },
  { label: "Glow",          ids: "all-except-wax" },
  { label: "Sensitivity",   ids: ["1","6","5","13","14","2","3","8"] },
  { label: "Hydration",     ids: ["1","6","5","13","14","2","8","9","3"] },
  { label: "Anti-Aging",    ids: ["1","6","4","11","5","13","14","2","10","8","9","3"] },
  { label: "Exfoliation",   ids: ["4","11","10"] },
  { label: "Masks",         ids: ["4","5","13","14"] },
  { label: "Serums",        ids: ["2","10"] },
  { label: "Lip & Eye",     ids: ["8","9"] },
  { label: "Wax",           ids: ["12"] },
];

export default function ShopPage() {
  const [activeConcern, setActiveConcern] = useState("All Products");
  const [addedId, setAddedId] = useState(null);
  const { addItem } = useCart();
  const gridRef = useRef(null);

  const concern = CONCERNS.find(c => c.label === activeConcern) ?? CONCERNS[0];
  const filtered = (() => {
    if (concern.ids === "all") return products;
    if (concern.ids === "all-except-wax") return products.filter(p => p.id !== "12");
    return concern.ids.map(id => products.find(p => p.id === id)).filter(Boolean);
  })();

  const handleConcernClick = (label) => {
    setActiveConcern(label);
    setTimeout(() => gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  const handleAdd = (product, e) => {
    e.preventDefault();
    addItem({ id: product.id, name: product.name, price: product.price, image: product.images[0], size: product.size });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1400);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <section className="bg-[#1C1C1A] py-20 md:py-28 text-center px-5">
        <div className="w-10 h-px bg-[#C9A96E] mx-auto mb-5" />
        <p className="text-[11px] tracking-[0.28em] uppercase text-[#C9A96E] font-sans mb-4">The Collection</p>
        <h1 className="font-serif text-5xl md:text-6xl text-white mb-4">Organic Skincare</h1>
        <p className="text-[#8A8076] font-sans text-sm max-w-md mx-auto">14 certified organic formulas. Cold-process made, batch-tested, and transparently labeled.</p>
      </section>

      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 py-16 md:py-20">
        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-52 flex-shrink-0">
            <h2 className="font-serif text-xl text-[#1C1C1A] mb-6">By Concern</h2>
            <ul>
              {CONCERNS.map((c) => (
                <li key={c.label}>
                  <button onClick={() => handleConcernClick(c.label)}
                    className={`w-full flex items-center justify-between py-3 px-1 border-b border-[#E5DCCF] text-sm font-sans text-left transition-colors duration-300 ${activeConcern === c.label ? "text-[#C9A96E] font-medium" : "text-[#5A5550] hover:text-[#1C1C1A]"}`}>
                    <span>{c.label}</span>
                    <span className={`w-2 h-2 rounded-full ${activeConcern === c.label ? "bg-[#C9A96E]" : "bg-[#E5DCCF]"}`} />
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <div className="flex-1" ref={gridRef}>
            <p className="text-[#8C8680] text-xs font-sans mb-8">
              {filtered.length} product{filtered.length !== 1 ? "s" : ""}
              {activeConcern !== "All Products" && <> · <span className="text-[#C9A96E]">{activeConcern}</span></>}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((product) => (
                <div key={product.id} className="group bg-white border border-[#E5DCCF] flex flex-col transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_12px_48px_rgba(201,169,110,0.16)] hover:border-[#C9A96E]/45">
                  <Link href={`/shop/${product.slug}`} className="block relative overflow-hidden bg-[#F5F0E8]">
                    <div className="relative aspect-square">
                      <Image src={product.images[0]} alt={product.name} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                    </div>
                  </Link>
                  <div className="p-5 flex flex-col flex-1">
                    <Link href={`/shop/${product.slug}`} className="flex-1">
                      <h3 className="font-serif text-[#1C1C1A] text-lg leading-snug mb-2 group-hover:text-[#C9A96E] transition-colors">{product.name}</h3>
                      <p className="text-[#8C8680] text-xs font-sans leading-relaxed line-clamp-2 mb-4">{product.shortDescription}</p>
                    </Link>
                    <div className="flex items-center justify-between pt-4 border-t border-[#F0EBE0]">
                      <span className="font-serif text-xl text-[#1C1C1A]">{formatPrice(product.price)}</span>
                      <button onClick={(e) => handleAdd(product, e)} className="text-[9px] tracking-[0.18em] uppercase font-sans border border-[#E5DCCF] text-[#8C8680] px-4 py-2 hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all duration-300">
                        {addedId === product.id ? "Added ✓" : "Add"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
