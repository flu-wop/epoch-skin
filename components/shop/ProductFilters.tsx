"use client";

import { ProductCategory, SkinType } from "@/lib/types";

interface ProductFiltersProps {
  selectedCategory: string;
  selectedSkinType: string;
  onCategoryChange: (category: string) => void;
  onSkinTypeChange: (skinType: string) => void;
}

export function ProductFilters({
  selectedCategory,
  selectedSkinType,
  onCategoryChange,
  onSkinTypeChange,
}: ProductFiltersProps) {
  const categories: { value: string; label: string }[] = [
    { value: "all", label: "All Products" },
    { value: "cleansers", label: "Cleansers" },
    { value: "serums", label: "Serums" },
    { value: "moisturizers", label: "Moisturizers" },
    { value: "masks", label: "Masks" },
    { value: "oils", label: "Oils" },
    { value: "tools", label: "Tools" },
  ];

  const skinTypes: { value: string; label: string }[] = [
    { value: "all", label: "All Skin Types" },
    { value: "dry", label: "Dry" },
    { value: "oily", label: "Oily" },
    { value: "combination", label: "Combination" },
    { value: "sensitive", label: "Sensitive" },
  ];

  return (
    <div className="space-y-6">
      {/* Category filter */}
      <div>
        <h3 className="mb-3 font-serif text-lg font-semibold text-sage-900">
          Category
        </h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => onCategoryChange(category.value)}
              className={`block w-full rounded-lg px-4 py-2 text-left text-sm transition-colors ${
                selectedCategory === category.value
                  ? "bg-clay-500 font-medium text-white"
                  : "text-neutral-700 hover:bg-sage-50"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Skin type filter */}
      <div>
        <h3 className="mb-3 font-serif text-lg font-semibold text-sage-900">
          Skin Type
        </h3>
        <div className="space-y-2">
          {skinTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => onSkinTypeChange(type.value)}
              className={`block w-full rounded-lg px-4 py-2 text-left text-sm transition-colors ${
                selectedSkinType === type.value
                  ? "bg-clay-500 font-medium text-white"
                  : "text-neutral-700 hover:bg-sage-50"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Reset filters */}
      {(selectedCategory !== "all" || selectedSkinType !== "all") && (
        <button
          onClick={() => {
            onCategoryChange("all");
            onSkinTypeChange("all");
          }}
          className="w-full rounded-lg border border-sage-300 px-4 py-2 text-sm text-sage-700 transition-colors hover:bg-sage-50"
        >
          Reset Filters
        </button>
      )}
    </div>
  );
}
