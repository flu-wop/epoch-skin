"use client";

import { useState } from "react";
import { format } from "date-fns";
import type { BookingData } from "./BookingForm";
import type { ServiceWithGender } from "@/data/services";

interface BookingReviewProps {
  bookingData: BookingData;
  services: ServiceWithGender[];
  onBack: () => void;
  onSubmit: () => void;
}

export function BookingReview({
  bookingData,
  services,
  onBack,
  onSubmit,
}: BookingReviewProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedServiceData = services.filter((s) =>
    bookingData.selectedServices.includes(s.id)
  );

  const totalPrice = selectedServiceData.reduce((sum, s) => sum + s.price, 0);
  const totalDuration = selectedServiceData.reduce((sum, s) => {
    const minutes = parseInt(s.duration);
    return sum + (isNaN(minutes) ? 0 : minutes);
  }, 0);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Submit booking to API
      const response = await fetch("/api/bookings/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gender: bookingData.gender,  // ← now safe (type includes gender)
          services: selectedServiceData.map(s => ({
            id: s.id,
            name: s.name,
            price: s.price,
            duration: s.duration,
          })),
          date: bookingData.date,
          time: bookingData.time,
          customer: {
            name: bookingData.name,
            email: bookingData.email,
            phone: bookingData.phone,
            notes: bookingData.notes,
          },
          totalPrice,
          totalDuration,
        }),
      });

      if (response.ok) {
        onSubmit();
      } else {
        alert("There was an error submitting your booking. Please try again.");
      }
    } catch (error) {
      console.error("Booking submission error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Service Summary */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-serif text-sage-900 mb-6">
          Booking Summary
        </h2>

        <div className="space-y-6">
          {/* Selected Services */}
          <div>
            <h3 className="text-lg font-semibold text-sage-900 mb-3">
              Selected Services
            </h3>
            <div className="space-y-4">
              {selectedServiceData.map((service) => (
                <div key={service.id} className="border-b border-sage-100 pb-4 last:border-b-0">
                  <p className="font-medium text-gray-900">{service.name}</p>
                  <p className="text-sm text-neutral-600">
                    ${service.price} • {service.duration}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="border-t border-sage-100 pt-4">
            <div className="flex justify-between text-lg font-semibold text-sage-900">
              <span>Total Price</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-neutral-600 mt-2">
              <span>Estimated Duration</span>
              <span>{totalDuration} min</span>
            </div>
          </div>

          {/* Customer Info */}
          <div>
            <h3 className="text-lg font-semibold text-sage-900 mb-3">
              Customer Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium text-gray-900">
                  {bookingData.firstName} {bookingData.lastName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium text-gray-900">{bookingData.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium text-gray-900">{bookingData.phone}</p>
              </div>
              {bookingData.notes && (
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-600">Notes</p>
                  <p className="font-medium text-gray-900">{bookingData.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Notice */}
      <div className="bg-clay-50 border border-clay-200 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Please note:</span> This is a booking request. We'll confirm your appointment within 24 hours via email and text message.
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onBack}
          disabled={isSubmitting}
          className="flex-1 py-4 px-6 border-2 border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Back to Contact Info
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex-1 py-4 px-6 bg-clay-500 text-white rounded-lg font-semibold hover:bg-clay-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
}