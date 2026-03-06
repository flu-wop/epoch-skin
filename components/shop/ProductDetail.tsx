"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/hooks/useCart";
import type { Product } from "@/lib/types";

interface ProductDetailProps {
  product: Product;
}

function ImageGallery({ images, alt }: { images: string[]; alt: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const allImages = images.length > 0 ? images : ["/images/products/placeholder.png"];

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div
        className={`relative aspect-square rounded-2xl overflow-hidden bg-sand-50 cursor-zoom-in ${
          isZoomed ? "cursor-zoom-out" : ""
        }`}
        onClick={() => setIsZoomed(!isZoomed)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setIsZoomed(false)}
      >
        <Image
          src={allImages[activeIndex]}
          alt={alt}
          fill
          className="object-cover transition-transform duration-200"
          style={
            isZoomed
              ? {
                  transform: "scale(2.2)",
                  transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                }
              : {}
          }
          priority
        />
        {!isZoomed && (
          <div className="absolute bottom-3 right-3 bg-black/40 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
            Click to zoom
          </div>
        )}
        {/* Nav arrows */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex((i) => (i - 1 + allImages.length) % allImages.length);
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow hover:bg-white transition-colors"
            >
              ‹
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex((i) => (i + 1) % allImages.length);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow hover:bg-white transition-colors"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {allImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                i === activeIndex
                  ? "border-clay-500 shadow-md scale-105"
                  : "border-gray-200 hover:border-clay-300"
              }`}
            >
              <Image src={img} alt={`${alt} ${i + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function ProductDetail({ product }: ProductDetailProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: product.size || "",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <main className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-clay-600 hover:text-clay-700 mb-8 text-sm font-medium"
        >
          ← Back to Shop
        </Link>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Gallery */}
          <ImageGallery images={product.images} alt={product.imageAlt || product.name} />

          {/* Info */}
          <div className="flex flex-col">
            {/* Trust badge */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1.5 bg-sage-50 border border-sage-200 rounded-full px-3 py-1">
                <svg className="w-4 h-4 text-sage-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-xs font-semibold text-sage-700">Certified Organic</span>
              </div>
              <div className="flex items-center gap-1.5 bg-clay-50 border border-clay-200 rounded-full px-3 py-1">
                <svg className="w-4 h-4 text-clay-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <span className="text-xs font-semibold text-clay-600">Cruelty-Free</span>
              </div>
            </div>

            <h1 className="font-serif text-4xl font-bold text-gray-900 mb-2 leading-tight">
              {product.name}
            </h1>

            {product.size && (
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">{product.size}</p>
            )}

            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-serif text-4xl font-bold text-clay-600">${product.price}</span>
            </div>

            <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

            {/* Quantity + Add to Cart */}
            <div className="flex gap-4 mb-8">
              <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 py-3 hover:bg-gray-50 text-gray-600 font-medium transition-colors"
                >
                  −
                </button>
                <span className="px-4 py-3 font-semibold text-gray-900 min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-4 py-3 hover:bg-gray-50 text-gray-600 font-medium transition-colors"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3 px-6 rounded-xl font-semibold text-lg transition-all duration-200 ${
                  added
                    ? "bg-sage-500 text-white scale-95"
                    : "bg-clay-500 hover:bg-clay-600 text-white hover:scale-[1.01]"
                }`}
              >
                {added ? "✓ Added to Cart!" : "Add to Cart"}
              </button>
            </div>

            {/* Shipping note */}
            <p className="text-sm text-sage-600 flex items-center gap-2 mb-8">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              Free shipping on all orders
            </p>

            {/* Accordion sections */}
            {product.benefits && product.benefits.length > 0 && (
              <details className="border-t border-gray-200 py-4 group">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900 list-none">
                  Benefits
                  <span className="text-clay-500 group-open:rotate-180 transition-transform">↓</span>
                </summary>
                <ul className="mt-3 space-y-2">
                  {product.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                      <span className="text-sage-500 mt-0.5 flex-shrink-0">✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </details>
            )}

            {product.howToUse && (
              <details className="border-t border-gray-200 py-4 group">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900 list-none">
                  How to Use
                  <span className="text-clay-500 group-open:rotate-180 transition-transform">↓</span>
                </summary>
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">{product.howToUse}</p>
              </details>
            )}

            {product.ingredients && product.ingredients.length > 0 && (
              <details className="border-t border-b border-gray-200 py-4 group">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900 list-none">
                  Ingredients
                  <span className="text-clay-500 group-open:rotate-180 transition-transform">↓</span>
                </summary>
                <p className="mt-3 text-xs text-gray-500 leading-relaxed">
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
