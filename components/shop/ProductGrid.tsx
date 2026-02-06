"use client";

import { useState, useMemo } from "react";
import { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";
import { ProductFilters } from "./ProductFilters";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSkinType, setSelectedSkinType] = useState("all");
  const [sortBy, setSortBy] = useState<"featured" | "price-low" | "price-high" | "name">("featured");

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch = selectedCategory === "all" || product.category === selectedCategory;
      const skinTypeMatch = 
        selectedSkinType === "all" || 
        product.skinType.includes("all" as any) ||
        product.skinType.includes(selectedSkinType as any);
      
      return categoryMatch && skinTypeMatch;
    });
  }, [products, selectedCategory, selectedSkinType]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    
    switch (sortBy) {
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-high":
        return sorted.sort((a, b) => b.price - a.price);
      case "name":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "featured":
      default:
        return sorted.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
    }
  }, [filteredProducts, sortBy]);

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
      {/* Filters sidebar */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-xl border border-sage-100 bg-white p-6">
          <ProductFilters
            selectedCategory={selectedCategory}
            selectedSkinType={selectedSkinType}
            onCategoryChange={setSelectedCategory}
            onSkinTypeChange={setSelectedSkinType}
          />
        </div>
      </aside>

      {/* Products grid */}
      <div>
        {/* Sort and results count */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-neutral-600">
            Showing <span className="font-medium">{sortedProducts.length}</span> {sortedProducts.length === 1 ? "product" : "products"}
          </p>
          
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm text-neutral-600">
              Sort by:
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="rounded-lg border border-sage-200 bg-white px-3 py-2 text-sm focus:border-sage-500 focus:outline-none focus:ring-2 focus:ring-sage-500/20"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>

        {/* Products grid or empty state */}
        {sortedProducts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-sage-100 bg-sage-50/30 p-12 text-center">
            <p className="text-lg text-neutral-600">
              No products found matching your filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSelectedSkinType("all");
              }}
              className="mt-4 text-sm font-medium text-clay-600 hover:text-clay-700"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
