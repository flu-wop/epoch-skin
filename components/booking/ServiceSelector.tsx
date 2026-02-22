"use client";

import { useState } from "react";
import type { ServiceWithGender } from "@/data/services";
import { ChevronDown } from "lucide-react";

interface ServiceSelectorProps {
  services: ServiceWithGender[];
  selectedServices: string[];
  onSelectionChange: (serviceIds: string[]) => void;
  onNext: () => void;
}

export function ServiceSelector({
  services,
  selectedServices,
  onSelectionChange,
  onNext,
}: ServiceSelectorProps) {
  const [openCategories, setOpenCategories] = useState<string[]>(["body-waxing"]);

  const toggleCategory = (category: string) => {
    if (openCategories.includes(category)) {
      setOpenCategories(openCategories.filter((c) => c !== category));
    } else {
      setOpenCategories([...openCategories, category]);
    }
  };

  const handleToggle = (serviceId: string) => {
    if (selectedServices.includes(serviceId)) {
      onSelectionChange(selectedServices.filter((id) => id !== serviceId));
    } else {
      onSelectionChange([...selectedServices, serviceId]);
    }
  };

  const selectedServiceData = services.filter((s) =>
    selectedServices.includes(s.id)
  );

  const totalPrice = selectedServiceData.reduce((sum, s) => sum + s.price, 0);
  const totalDuration = selectedServiceData.reduce((sum, s) => {
    const minutes = parseInt(s.duration);
    return sum + (isNaN(minutes) ? 0 : minutes);
  }, 0);

  // Group services by category
  const categories = [
    {
      id: "body-waxing",
      name: "Body Waxing",
      services: services.filter((s) => s.category === "body-waxing"),
    },
    {
      id: "facial-waxing",
      name: "Facial Waxing",
      services: services.filter((s) => s.category === "facial-waxing"),
    },
    {
      id: "specialty-treatments",
      name: "Specialty Treatments",
      services: services.filter((s) => s.category === "specialty-treatments"),
    },
  ];

  const ServiceCheckbox = ({ service }: { service: ServiceWithGender }) => {
    const isSelected = selectedServices.includes(service.id);
    
    return (
      <label
        className={`
          flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-all
          ${
            isSelected
              ? "border-clay-500 bg-clay-50"
              : "border-gray-200 hover:border-gray-300 bg-white"
          }
        `}
      >
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => handleToggle(service.id)}
          className="mt-1 h-5 w-5 rounded border-gray-300 text-clay-500 focus:ring-clay-500"
        />
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-gray-900">{service.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{service.description}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="font-semibold text-gray-900">${service.price}</p>
              <p className="text-sm text-gray-600">{service.duration}</p>
            </div>
          </div>
        </div>
      </label>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">
          Select Your Service(s)
        </h2>
        <p className="text-gray-600">
          Choose one or more services. You can select multiple services for the same appointment.
        </p>
      </div>

      {/* Collapsible Categories */}
      <div className="space-y-3">
        {categories.map((category) => {
          if (category.services.length === 0) return null;
          
          const isOpen = openCategories.includes(category.id);
          const categoryServiceCount = category.services.length;
          const selectedInCategory = category.services.filter((s) =>
            selectedServices.includes(s.id)
          ).length;

          return (
            <div key={category.id} className="border border-gray-200 rounded-lg overflow-hidden">
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <h3 className="font-serif text-lg font-semibold text-gray-900">
                    {category.name}
                  </h3>
                  <span className="text-sm text-gray-500">
                    ({categoryServiceCount})
                  </span>
                  {selectedInCategory > 0 && (
                    <span className="px-2 py-0.5 bg-clay-100 text-clay-700 text-xs font-semibold rounded-full">
                      {selectedInCategory} selected
                    </span>
                  )}
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Category Services */}
              {isOpen && (
                <div className="p-4 pt-0 space-y-3 bg-gray-50">
                  {category.services.map((service) => (
                    <ServiceCheckbox key={service.id} service={service} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Summary & Next Button */}
      <div className="sticky bottom-0 bg-white border-t-2 border-gray-200 pt-6 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        {selectedServices.length > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">
                {selectedServices.length} service{selectedServices.length > 1 ? "s" : ""} selected
              </span>
              <span className="text-gray-600">
                Approx. {totalDuration} min
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-clay-600">
                ${totalPrice}
              </span>
            </div>
            <button
              onClick={onNext}
              className="w-full bg-clay-500 text-white py-4 px-6 rounded-lg font-semibold hover:bg-clay-600 transition-colors text-lg"
            >
              Continue to Date & Time
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-500 py-4">
            Select at least one service to continue
          </p>
        )}
      </div>
    </div>
  );
}
