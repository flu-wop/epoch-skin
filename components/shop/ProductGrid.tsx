"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/hooks/useCart";
import type { Product } from "@/lib/types";

function ProductSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm">
      <div className="aspect-square bg-gray-200" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-2/3" />
        <div className="flex justify-between items-center pt-2">
          <div className="h-6 bg-gray-200 rounded w-16" />
          <div className="h-9 bg-gray-200 rounded w-24" />
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: product.size || "",
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group relative flex flex-col rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-sand-50">
        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-sand-100 to-sage-50" />
        )}
        <Image
          src={product.images[0]}
          alt={product.imageAlt || product.name}
          fill
          className={`object-cover transition-all duration-500 group-hover:scale-105 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="bg-clay-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              New
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-sage-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              Best Seller
            </span>
          )}
        </div>

        {/* Trust badge */}
        <div className="absolute top-3 right-3">
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1 shadow-sm">
            <svg className="w-3 h-3 text-sage-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-[10px] font-semibold text-sage-700">Organic</span>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-serif text-gray-900 font-semibold text-base leading-snug mb-1 group-hover:text-clay-600 transition-colors">
          {product.name}
        </h3>

        {product.size && (
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">{product.size}</p>
        )}

        <p className="text-sm text-gray-500 line-clamp-2 flex-1 mb-4">
          {product.description}
        </p>

        <div className="flex items-center justify-between gap-3 mt-auto">
          <span className="font-serif text-xl font-bold text-clay-600">
            ${product.price}
          </span>
          <button
            onClick={handleAddToCart}
            className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
              added
                ? "bg-sage-500 text-white scale-95"
                : "bg-clay-500 hover:bg-clay-600 text-white hover:scale-[1.02]"
            }`}
          >
            {added ? "✓ Added" : "Add to Cart"}
          </button>
        </div>
      </div>
    </Link>
  );
}

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const [filter, setFilter] = useState("All");
  const [isLoading] = useState(false);

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  const filtered =
    filter === "All" ? products : products.filter((p) => p.category === filter);

  const categoryLabel = (cat: string) => {
    if (cat === "All") return "All Products";
    return cat
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-10 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              filter === cat
                ? "bg-clay-500 text-white shadow-md scale-105"
                : "bg-white border border-gray-200 text-gray-600 hover:border-clay-300 hover:text-clay-600"
            }`}
          >
            {categoryLabel(cat)}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-sm text-gray-400 mb-6 text-center">
        {filtered.length} product{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
          : filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          No products found in this category.
        </div>
      )}
    </div>
  );
}
