"use client";
// components/home/FeaturedProducts.tsx

import Link from "next/link";
import { getFeaturedProducts } from "@/data/products";
import { ProductCard } from "@/components/shop/ProductCard";
import { FadeUp } from "@/components/FadeUp";

export function FeaturedProducts() {
  const products = getFeaturedProducts();

  return (
    <section className="section-lg bg-[#F8F4EF]">
      <div className="page-container">

        {/* Header */}
        <FadeUp className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="gold-rule mb-5" />
            <p className="eyebrow mb-3">Dewy Glow Collection</p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#18181A]">
              Signature Skincare
            </h2>
          </div>
          <Link
            href="/shop"
            className="flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase
                       text-[#C9A96E] font-sans self-start md:self-auto
                       hover:gap-5 transition-all duration-400"
          >
            View All Products
            <span>→</span>
          </Link>
        </FadeUp>

        {/* 4-column product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.slice(0, 4).map((product, i) => (
            <FadeUp key={product.id} delay={i * 80}>
              <ProductCard product={product} priority={i === 0} />
            </FadeUp>
          ))}
        </div>

        {/* Bottom CTA */}
        <FadeUp className="text-center mt-14" delay={200}>
          <p className="text-[#9A9088] font-sans text-sm mb-5">
            14 certified Organic formulas — crafted for every skin type
          </p>
          <Link href="/shop" className="btn-primary">
            Shop All Formulas
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
