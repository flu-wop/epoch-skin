"use client";

import { useState } from "react";

interface ContactFormProps {
  name: string;
  email: string;
  phone: string;
  notes: string;
  onNameChange: (name: string) => void;
  onEmailChange: (email: string) => void;
  onPhoneChange: (phone: string) => void;
  onNotesChange: (notes: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function ContactForm({
  name,
  email,
  phone,
  notes,
  onNameChange,
  onEmailChange,
  onPhoneChange,
  onNotesChange,
  onNext,
  onBack,
}: ContactFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    // Phone validation
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/.test(phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onNext();
    }
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-numeric characters
    const phoneNumber = value.replace(/\D/g, "");
    
    // Format as (XXX) XXX-XXXX
    if (phoneNumber.length <= 3) {
      return phoneNumber;
    } else if (phoneNumber.length <= 6) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    } else {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    onPhoneChange(formatted);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">
          Your Contact Information
        </h2>
        <p className="text-gray-600">
          We'll use this information to confirm your appointment and send you reminders.
        </p>
      </div>

      <div className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Kayla Ford"
            className={`
              w-full px-4 py-3 rounded-lg border-2 transition-colors
              ${
                errors.name
                  ? "border-red-300 focus:border-red-500"
                  : "border-gray-200 focus:border-clay-500"
              }
              focus:outline-none focus:ring-0
            `}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="kayla@example.com"
            className={`
              w-full px-4 py-3 rounded-lg border-2 transition-colors
              ${
                errors.email
                  ? "border-red-300 focus:border-red-500"
                  : "border-gray-200 focus:border-clay-500"
              }
              focus:outline-none focus:ring-0
            `}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="(504) 777-4094"
            maxLength={14}
            className={`
              w-full px-4 py-3 rounded-lg border-2 transition-colors
              ${
                errors.phone
                  ? "border-red-300 focus:border-red-500"
                  : "border-gray-200 focus:border-clay-500"
              }
              focus:outline-none focus:ring-0
            `}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>

        {/* Notes Field */}
        <div>
          <label htmlFor="notes" className="block text-sm font-semibold text-gray-900 mb-2">
            Additional Notes (Optional)
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            placeholder="Any allergies, preferences, or special requests?"
            rows={4}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-clay-500 focus:outline-none focus:ring-0 transition-colors resize-none"
          />
          <p className="mt-1 text-sm text-gray-500">
            Let us know if you have any skin sensitivities or preferences.
          </p>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="bg-sand-50 border border-sand-200 rounded-lg p-4">
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Privacy Note:</span> Your information is kept confidential and will only be used to manage your appointment and send confirmation details.
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 py-4 px-6 border-2 border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
        >
          Back to Date & Time
        </button>
        <button
          onClick={handleSubmit}
          className="flex-1 py-4 px-6 bg-clay-500 text-white rounded-lg font-semibold hover:bg-clay-600 transition-colors"
        >
          Review Booking
        </button>
      </div>
    </div>
  );
}
