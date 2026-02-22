"use client";

import type { ServiceGender } from "@/data/services";

interface GenderSelectorProps {
  selectedGender: ServiceGender | null;
  onGenderSelect: (gender: ServiceGender) => void;
  onNext: () => void;
}

export function GenderSelector({
  selectedGender,
  onGenderSelect,
  onNext,
}: GenderSelectorProps) {
  const genderOptions = [
    {
      value: "women" as const,
      label: "Women's Services",
      description: "Waxing, facials, and specialty treatments",
    },
    {
      value: "men" as const,
      label: "Men's Services",
      description: "Specialized grooming and waxing for men",
    },
  ];

  const canProceed = selectedGender !== null;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-3">
          Welcome to Epoch Skin
        </h2>
        <p className="text-lg text-gray-600">
          Let's get started. Which services are you interested in?
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {genderOptions.map((option) => {
          const isSelected = selectedGender === option.value;

          return (
            <button
              key={option.value}
              onClick={() => onGenderSelect(option.value)}
              className={`
                relative p-8 rounded-xl border-2 transition-all text-center
                ${
                  isSelected
                    ? "border-clay-500 bg-clay-50 shadow-lg scale-105"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                }
              `}
            >
              {/* Selection Indicator */}
              {isSelected && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-clay-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}

              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                {option.label}
              </h3>
              <p className="text-gray-600">{option.description}</p>
            </button>
          );
        })}
      </div>

      {/* Continue Button */}
      <div className="max-w-md mx-auto">
        <button
          onClick={onNext}
          disabled={!canProceed}
          className={`
            w-full py-4 px-6 rounded-lg font-semibold text-lg transition-colors
            ${
              canProceed
                ? "bg-clay-500 text-white hover:bg-clay-600"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }
          `}
        >
          Continue to Services
        </button>
      </div>
    </div>
  );
}
