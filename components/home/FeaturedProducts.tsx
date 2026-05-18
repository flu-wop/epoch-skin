"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { getFeaturedProducts } from "@/data/products";
import { useCart } from "@/lib/hooks/useCart";
import { formatPrice } from "@/lib/utils";

export function FeaturedProducts() {
  const products = getFeaturedProducts();
  const { addItem } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleAdd = (product: any) => {
    addItem({ id: product.id, name: product.name, price: product.price, image: product.images[0], size: product.size });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <section ref={ref} className="py-24 md:py-32 bg-[#F8F5F0]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div>
            <div className="w-8 h-px bg-[#C9A84C] mb-5" />
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#C9A84C] font-sans mb-3">
              Curated Collection
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A18]">
              Featured Skincare
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase
                       text-[#C9A84C] hover:gap-5 transition-all duration-300 font-sans self-start md:self-auto"
          >
            View All Products
            <span className="text-base">→</span>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <div
              key={product.id}
              className="group bg-white border border-[#E8E0D5]
                         transition-all duration-500
                         hover:-translate-y-2 hover:shadow-[0_12px_48px_rgba(201,168,76,0.14)]
                         hover:border-[#D4AF77]/50"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.7s ease ${i * 0.1}s, transform 0.7s ease ${i * 0.1}s`,
              }}
            >
              {/* Image */}
              <Link href={`/shop/${product.slug}`}>
                <div className="relative aspect-[4/5] overflow-hidden bg-[#F0EBE3]">
                  <Image
                    src={product.images[0]}
                    alt={product.imageAlt || product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Gold corner accent */}
                  <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#C9A84C]/0
                                  group-hover:border-[#C9A84C]/60 transition-all duration-500" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#C9A84C]/0
                                  group-hover:border-[#C9A84C]/60 transition-all duration-500" />
                </div>
              </Link>

              {/* Info */}
              <div className="p-6">
                <Link href={`/shop/${product.slug}`}>
                  <h3 className="font-serif text-[#1A1A18] text-lg leading-snug mb-2
                                 group-hover:text-[#C9A84C] transition-colors duration-300">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-[#8A8580] text-xs font-sans leading-relaxed line-clamp-2 mb-4">
                  {product.shortDescription}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-serif text-xl text-[#1A1A18]">
                    {formatPrice(product.price)}
                  </span>
                  <button
                    onClick={() => handleAdd(product)}
                    className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase
                               text-[#C9A84C] border border-[#C9A84C]/40 px-4 py-2 font-sans
                               hover:bg-[#C9A84C] hover:text-[#1A1A18] hover:border-[#C9A84C]
                               transition-all duration-300"
                  >
                    <ShoppingBag className="w-3 h-3" />
                    {addedId === product.id ? "Added" : "Add"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
