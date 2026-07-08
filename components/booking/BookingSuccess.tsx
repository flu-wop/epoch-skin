"use client";

import { format } from "date-fns";
import Link from "next/link";
import type { BookingData } from "./BookingForm";

interface BookingSuccessProps {
  bookingData: BookingData;
}

export function BookingSuccess({ bookingData }: BookingSuccessProps) {
  return (
    <div className="text-center py-12 space-y-6">
      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-sage-100 rounded-full flex items-center justify-center">
          <svg
            className="w-12 h-12 text-sage-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>

      {/* Success Message */}
      <div>
        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-3">
          Booking Request Received!
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Thank you, {bookingData.name}! We've received your appointment request and will confirm within 24 hours.
        </p>
      </div>

      {/* Appointment Summary */}
      {bookingData.date && (
        <div className="bg-sand-50 border border-sand-200 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-sm text-gray-600 mb-2">Requested Appointment</p>
          <p className="text-xl font-semibold text-gray-900">
            {format(bookingData.date, "EEEE, MMMM d, yyyy")}
          </p>
          <p className="text-lg text-gray-700 mt-1">{bookingData.time}</p>
        </div>
      )}

      {/* Next Steps */}
      <div className="max-w-md mx-auto text-left bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4">What's Next?</h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-clay-500"></div>
            <span className="text-gray-700">
              Check your email ({bookingData.email}) for a confirmation
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-clay-500"></div>
            <span className="text-gray-700">
              We'll send you a text message at {bookingData.phone} to confirm
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-clay-500"></div>
            <span className="text-gray-700">
              You'll receive a reminder 24 hours before your appointment
            </span>
          </li>
        </ul>
      </div>

      {/* Contact Info */}
      <div className="text-sm text-gray-600">
        <p>Questions? Contact us at</p>
        <p className="font-medium text-gray-900 mt-1">
          <a href="mailto:kayla@epoch-skin.com" className="hover:text-clay-600">
            kayla@epoch-skin.com
          </a>
          {" or "}
          <a href="tel:5047774094" className="hover:text-clay-600">
            (504) 777-4094
          </a>
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
        <Link
          href="/"
          className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
        >
          Return to Home
        </Link>
        <Link
          href="/services"
          className="px-6 py-3 bg-clay-500 text-white rounded-lg font-semibold hover:bg-clay-600 transition-colors"
        >
          View All Services
        </Link>
      </div>
    </div>
  );
}
