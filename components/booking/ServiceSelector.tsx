"use client";

import { useState } from "react";
import type { ServiceWithGender } from "@/data/services";

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
  const [activeGender, setActiveGender] = useState<"women" | "men">("women");

  // Categorize services - use exact category names from services.ts
  const bodyWaxingServices = services.filter(
  (s) => s.category === "body-waxing" && (s.gender === activeGender || s.gender === "all")
);
  const facialWaxingServices = services.filter(
  (s) => s.category === "facial-waxing" && (s.gender === activeGender || s.gender === "all")
);
  const organicFacials = services.filter((s) => s.category === "specialty-treatments");

  const toggleService = (serviceId: string) => {
    if (selectedServices.includes(serviceId)) {
      onSelectionChange(selectedServices.filter((id) => id !== serviceId));
    } else {
      onSelectionChange([...selectedServices, serviceId]);
    }
  };

  const totalPrice = services
    .filter((s) => selectedServices.includes(s.id))
    .reduce((sum, s) => sum + s.price, 0);

  const totalDuration = services
    .filter((s) => selectedServices.includes(s.id))
    .reduce((sum, s) => {
      const minutes = parseInt(s.duration);
      return sum + (isNaN(minutes) ? 0 : minutes);
    }, 0);

  const ServiceList = ({ serviceList }: { serviceList: ServiceWithGender[] }) => (
    <div className="space-y-2">
      {serviceList.map((service) => (
        <label
          key={service.id}
          className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-sage-50 cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-3 flex-1">
            <input
              type="checkbox"
              checked={selectedServices.includes(service.id)}
              onChange={() => toggleService(service.id)}
              className="w-5 h-5 text-clay-500 border-gray-300 rounded focus:ring-clay-500"
            />
            <div className="flex-1">
              <p className="font-medium text-gray-900">{service.name}</p>
              <p className="text-sm text-gray-600">{service.duration}</p>
            </div>
          </div>
          <p className="font-semibold text-gray-900 ml-4">${service.price}</p>
        </label>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Select Services</h2>
        <p className="text-gray-600">Choose the services you'd like to book</p>
      </div>

      {/* Gender Tabs for Waxing Services */}
      <div>
        <div className="flex gap-2 border-b border-gray-200">
          <button
            onClick={() => setActiveGender("women")}
            className={`px-6 py-3 font-medium transition-colors ${
              activeGender === "women"
                ? "text-clay-600 border-b-2 border-clay-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Women's Services
          </button>
          <button
            onClick={() => setActiveGender("men")}
            className={`px-6 py-3 font-medium transition-colors ${
              activeGender === "men"
                ? "text-clay-600 border-b-2 border-clay-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Men's Services
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {/* Body Waxing - Collapsible */}
          {bodyWaxingServices.length > 0 && (
            <details className="group">
              <summary className="flex items-center justify-between p-4 bg-sand-50 rounded-lg cursor-pointer hover:bg-sand-100 transition-colors">
                <div>
                  <h3 className="font-semibold text-gray-900">Body Waxing</h3>
                  <p className="text-sm text-gray-600">{bodyWaxingServices.length} services</p>
                </div>
                <svg
                  className="w-5 h-5 text-gray-600 group-open:rotate-180 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="mt-3 pl-4">
                <ServiceList serviceList={bodyWaxingServices} />
              </div>
            </details>
          )}

          {/* Facial Waxing - Collapsible */}
          {facialWaxingServices.length > 0 && (
            <details className="group">
              <summary className="flex items-center justify-between p-4 bg-sand-50 rounded-lg cursor-pointer hover:bg-sand-100 transition-colors">
                <div>
                  <h3 className="font-semibold text-gray-900">Facial Waxing</h3>
                  <p className="text-sm text-gray-600">{facialWaxingServices.length} services</p>
                </div>
                <svg
                  className="w-5 h-5 text-gray-600 group-open:rotate-180 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="mt-3 pl-4">
                <ServiceList serviceList={facialWaxingServices} />
              </div>
            </details>
          )}
        </div>
      </div>

      {/* Organic Facials - No Gender Tabs */}
      {organicFacials.length > 0 && (
        <div>
          <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">Organic Facials</h3>
          <ServiceList serviceList={organicFacials} />
        </div>
      )}

      {/* Selection Summary */}
      {selectedServices.length > 0 && (
        <div className="sticky bottom-0 bg-white border-t-2 border-gray-200 p-4 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600">{selectedServices.length} service(s) selected</p>
              <p className="text-lg font-semibold text-gray-900">
                ${totalPrice} · Approx. {totalDuration} min
              </p>
            </div>
          </div>
          <button
            onClick={onNext}
            className="w-full py-3 px-6 bg-clay-500 text-white rounded-lg font-semibold hover:bg-clay-600 transition-colors"
          >
            Continue to Date & Time
          </button>
        </div>
      )}

      {selectedServices.length === 0 && (
        <p className="text-center text-gray-500 py-8">
          Please select at least one service to continue
        </p>
      )}
    </div>
  );
}