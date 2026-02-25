"use client";

import { useState } from "react";
import { ServiceSelector } from "./ServiceSelector";
import { DateTimeSelector } from "./DateTimeSelector";
import { ContactForm } from "./ContactForm";
import { BookingReview } from "./BookingReview";
import { BookingSuccess } from "./BookingSuccess";
import { services } from "@/data/services";

export interface BookingData {
  selectedServices: string[];
  date: Date | null;
  time: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: "male" | "female" | "other" | "";
  notes: string;
}

type BookingStep = "services" | "datetime" | "contact" | "review" | "success";

export function BookingForm() {
  const [currentStep, setCurrentStep] = useState<BookingStep>("services");
  const [bookingData, setBookingData] = useState<BookingData>({
    selectedServices: [],
    date: null,
    time: "",
    name: "",
    firstName: "",          // ← added (required)
    lastName: "",           // ← added (required)
    email: "",              // ← added (required)
    phone: "",              // ← added (required)
    gender: "",             // ← added (required, default empty)
    notes: "",
  });

  const updateBookingData = (updates: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...updates }));
  };

  const goToStep = (step: BookingStep) => {
    setCurrentStep(step);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Indicator */}
      {currentStep !== "success" && (
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {["Services", "Date & Time", "Contact", "Review"].map((label, index) => {
              const stepNames: BookingStep[] = ["services", "datetime", "contact", "review"];
              const stepIndex = stepNames.indexOf(currentStep);
              const isActive = index === stepIndex;
              const isCompleted = index < stepIndex;

              return (
                <div key={label} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${
                      isActive || isCompleted ? "bg-clay-500" : "bg-gray-300"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className="mt-2 text-sm text-gray-600">{label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {currentStep === "services" && (
        <ServiceSelector
          services={services}
          selectedServices={bookingData.selectedServices}
          onSelectionChange={(serviceIds) =>
            updateBookingData({ selectedServices: serviceIds })
          }
          onNext={() => goToStep("datetime")}
        />
      )}

      {currentStep === "datetime" && (
        <DateTimeSelector
          selectedDate={bookingData.date}
          selectedTime={bookingData.time}
          onDateChange={(date) => updateBookingData({ date })}
          onTimeChange={(time) => updateBookingData({ time })}
          onNext={() => goToStep("contact")}
          onBack={() => goToStep("services")}
        />
      )}

      {currentStep === "contact" && (
        <ContactForm
          name={bookingData.name}
          email={bookingData.email}
          phone={bookingData.phone}
          notes={bookingData.notes}
          onNameChange={(name) => updateBookingData({ name })}
          onEmailChange={(email) => updateBookingData({ email })}
          onPhoneChange={(phone) => updateBookingData({ phone })}
          onNotesChange={(notes) => updateBookingData({ notes })}
          onNext={() => goToStep("review")}
          onBack={() => goToStep("datetime")}
        />
      )}

      {currentStep === "review" && (
        <BookingReview
          bookingData={bookingData}
          services={services}
          onBack={() => goToStep("contact")}
          onSubmit={() => goToStep("success")}
        />
      )}

      {currentStep === "success" && (
        <BookingSuccess bookingData={bookingData} />
      )}
    </div>
  );
}