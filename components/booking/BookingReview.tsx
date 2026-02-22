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
          gender: bookingData.gender,
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
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Booking submission error:", error);
      alert("There was an error submitting your booking. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">
          Review Your Booking
        </h2>
        <p className="text-gray-600">
          Please review your appointment details before confirming.
        </p>
      </div>

      {/* Services Summary */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Selected Services</h3>
        <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-200">
          {selectedServiceData.map((service) => (
            <div key={service.id} className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{service.name}</p>
                <p className="text-sm text-gray-600">{service.duration}</p>
              </div>
              <p className="font-semibold text-gray-900">${service.price}</p>
            </div>
          ))}
          <div className="p-4 bg-sand-50 flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900">Total</p>
              <p className="text-sm text-gray-600">Approx. {totalDuration} minutes</p>
            </div>
            <p className="text-2xl font-bold text-clay-600">${totalPrice}</p>
          </div>
        </div>
      </div>

      {/* Date & Time */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Appointment Time</h3>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          {bookingData.date && (
            <>
              <p className="text-lg font-medium text-gray-900">
                {format(bookingData.date, "EEEE, MMMM d, yyyy")}
              </p>
              <p className="text-gray-600 mt-1">at {bookingData.time}</p>
            </>
          )}
        </div>
      </div>

      {/* Contact Information */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
        <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-2">
          <div>
            <p className="text-sm text-gray-600">Name</p>
            <p className="font-medium text-gray-900">{bookingData.name}</p>
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
            <div>
              <p className="text-sm text-gray-600">Notes</p>
              <p className="font-medium text-gray-900">{bookingData.notes}</p>
            </div>
          )}
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
