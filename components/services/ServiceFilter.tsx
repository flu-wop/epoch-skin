"use client";

import { useState } from "react";
import type { ServiceGender } from "@/data/services";

interface ServiceFilterProps {
  onFilterChange: (gender: ServiceGender) => void;
  currentFilter: ServiceGender;
}

export function ServiceFilter({ onFilterChange, currentFilter }: ServiceFilterProps) {
  const filters: { label: string; value: ServiceGender }[] = [
    { label: "All Services", value: "all" },
    { label: "Women", value: "women" },
    { label: "Men", value: "men" }
  ];

  return (
    <div className="flex justify-center mb-12">
      <div className="inline-flex bg-white rounded-lg shadow-sm border border-gray-200 p-1">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className={`
              px-6 py-3 rounded-md text-sm md:text-base font-medium transition-all
              ${
                currentFilter === filter.value
                  ? "bg-[#b87968] text-white shadow-sm"
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              }
            `}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}
