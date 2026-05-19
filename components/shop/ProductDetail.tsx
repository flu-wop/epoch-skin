"use client";
// components/shop/ProductDetail.tsx — restyled to gold design system

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/hooks/useCart";
import type { Product } from "@/lib/types";

function ImageGallery({ images, alt }: { images: string[]; alt: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const allImages = images.length > 0 ? images : ["/images/products/placeholder.png"];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div className="space-y-4">
      <div
        className={`relative aspect-square overflow-hidden bg-[#F5F0E8] cursor-zoom-in ${isZoomed ? "cursor-zoom-out" : ""}`}
        onClick={() => setIsZoomed(!isZoomed)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setIsZoomed(false)}
      >
        <Image
          src={allImages[activeIndex]}
          alt={alt}
          fill
          className="object-cover transition-transform duration-200"
          style={isZoomed ? { transform: "scale(2.2)", transformOrigin: `${mousePos.x}% ${mousePos.y}%` } : {}}
          priority
        />
        {!isZoomed && (
          <div className="absolute bottom-3 right-3 bg-[#1C1C1A]/50 text-white text-xs px-3 py-1.5 font-sans tracking-wide">
            Click to zoom
          </div>
        )}
        {allImages.length > 1 && (
          <>
            <button onClick={(e) => { e.stopPropagation(); setActiveIndex((i) => (i - 1 + allImages.length) % allImages.length); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 flex items-center justify-center hover:bg-white transition-colors text-lg">‹</button>
            <button onClick={(e) => { e.stopPropagation(); setActiveIndex((i) => (i + 1) % allImages.length); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 flex items-center justify-center hover:bg-white transition-colors text-lg">›</button>
          </>
        )}
      </div>
      {allImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {allImages.map((img, i) => (
            <button key={i} onClick={() => setActiveIndex(i)}
              className={`relative w-20 h-20 flex-shrink-0 overflow-hidden border-2 transition-all ${
                i === activeIndex ? "border-[#C9A96E]" : "border-[#E5DCCF] hover:border-[#C9A96E]/50"
              }`}>
              <Image src={img} alt={`${alt} ${i + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem({ id: product.id, name: product.name, price: product.price, image: product.images[0], size: product.size || "" });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[#FAF7F2] py-16">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        <Link href="/shop"
          className="inline-flex items-center gap-2 text-[#5A5550] hover:text-[#C9A96E] mb-10 text-sm font-sans transition-colors">
          ← Back to Shop
        </Link>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          <ImageGallery images={product.images} alt={product.imageAlt || product.name} />

          <div className="flex flex-col">
            {/* Trust badges */}
            <div className="flex items-center gap-2 mb-6">
              <span className="flex items-center gap-1.5 border border-[#C9A96E]/40 text-[#5F6F5A] text-[10px] tracking-[0.16em] uppercase font-sans px-3 py-1.5">
                ✦ Certified Organic
              </span>
              <span className="flex items-center gap-1.5 border border-[#C9A96E]/40 text-[#5F6F5A] text-[10px] tracking-[0.16em] uppercase font-sans px-3 py-1.5">
                ♡ Cruelty-Free
              </span>
            </div>

            <h1 className="font-serif text-3xl md:text-4xl text-[#1C1C1A] mb-2 leading-tight">
              {product.name}
            </h1>

            {product.size && (
              <p className="text-xs text-[#8C8680] uppercase tracking-widest mb-5 font-sans">{product.size}</p>
            )}

            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-serif text-4xl text-[#1C1C1A]">${product.price}</span>
            </div>

            <p className="text-[#5A5550] font-sans leading-relaxed mb-8 text-sm">{product.description}</p>

            {/* Quantity + Add to Cart */}
            <div className="flex gap-4 mb-6">
              <div className="flex items-center border border-[#E5DCCF]">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 py-3 hover:bg-[#F5F0E8] text-[#5A5550] font-medium transition-colors">−</button>
                <span className="px-4 py-3 font-semibold text-[#1C1C1A] min-w-[3rem] text-center">{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)}
                  className="px-4 py-3 hover:bg-[#F5F0E8] text-[#5A5550] font-medium transition-colors">+</button>
              </div>

              <button onClick={handleAddToCart}
                className={`flex-1 py-3 px-6 font-sans text-[11px] tracking-[0.22em] uppercase font-medium transition-all duration-300 ${
                  added
                    ? "bg-[#5F6F5A] text-white"
                    : "bg-[#C9A96E] text-[#1C1C1A] hover:bg-[#D4AF88]"
                }`}>
                {added ? "✓ Added to Cart!" : "Add to Cart"}
              </button>
            </div>

            <p className="text-sm text-[#5A5550] font-sans flex items-center gap-2 mb-8">
              <svg className="w-4 h-4 text-[#C9A96E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              Free shipping on all orders
            </p>

            {/* Accordion sections */}
            {product.benefits && product.benefits.length > 0 && (
              <details className="border-t border-[#E5DCCF] py-4 group">
                <summary className="flex justify-between items-center cursor-pointer font-sans font-medium text-[#1C1C1A] text-sm list-none tracking-wide">
                  Benefits <span className="text-[#C9A96E] group-open:rotate-180 transition-transform">↓</span>
                </summary>
                <ul className="mt-3 space-y-2">
                  {product.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-[#5A5550] text-sm font-sans">
                      <span className="text-[#C9A96E] mt-0.5 flex-shrink-0">✦</span>{b}
                    </li>
                  ))}
                </ul>
              </details>
            )}

            {product.howToUse && (
              <details className="border-t border-[#E5DCCF] py-4 group">
                <summary className="flex justify-between items-center cursor-pointer font-sans font-medium text-[#1C1C1A] text-sm list-none tracking-wide">
                  How to Use <span className="text-[#C9A96E] group-open:rotate-180 transition-transform">↓</span>
                </summary>
                <p className="mt-3 text-[#5A5550] text-sm font-sans leading-relaxed">{product.howToUse}</p>
              </details>
            )}

            {product.ingredients && product.ingredients.length > 0 && (
              <details className="border-t border-b border-[#E5DCCF] py-4 group">
                <summary className="flex justify-between items-center cursor-pointer font-sans font-medium text-[#1C1C1A] text-sm list-none tracking-wide">
                  Ingredients <span className="text-[#C9A96E] group-open:rotate-180 transition-transform">↓</span>
                </summary>
                <p className="mt-3 text-xs text-[#8C8680] font-sans leading-relaxed">
                  {product.ingredients.join(", ")}
                </p>
              </details>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
