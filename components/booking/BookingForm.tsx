"use client";

import { useState } from "react";
import { GenderSelector } from "./GenderSelector";
import { ServiceSelector } from "./ServiceSelector";
import { DateTimeSelector } from "./DateTimeSelector";
import { ContactForm } from "./ContactForm";
import { BookingReview } from "./BookingReview";
import { BookingSuccess } from "./BookingSuccess";
import { services, getServicesByGender, type ServiceGender } from "@/data/services";

export interface BookingData {
  gender: ServiceGender | null;
  selectedServices: string[];
  date: Date | null;
  time: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
}

type BookingStep = "gender" | "services" | "datetime" | "contact" | "review" | "success";

export function BookingForm() {
  const [currentStep, setCurrentStep] = useState<BookingStep>("gender");
  const [bookingData, setBookingData] = useState<BookingData>({
    gender: null,
    selectedServices: [],
    date: null,
    time: "",
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const updateBookingData = (updates: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...updates }));
  };

  const goToStep = (step: BookingStep) => {
    setCurrentStep(step);
  };

  // Filter services based on selected gender
  const filteredServices = bookingData.gender 
    ? getServicesByGender(bookingData.gender)
    : services;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Indicator - Only show for main booking steps */}
      {!["gender", "success"].includes(currentStep) && (
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {["Services", "Date & Time", "Contact", "Review"].map((label, index) => {
              const stepNames: BookingStep[] = ["services", "datetime", "contact", "review"];
              const stepIndex = stepNames.indexOf(currentStep);
              const isActive = index === stepIndex;
              const isCompleted = index < stepIndex;

              return (
                <div key={label} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
                        ${
                          isActive
                            ? "bg-clay-500 text-white"
                            : isCompleted
                            ? "bg-sage-500 text-white"
                            : "bg-gray-200 text-gray-600"
                        }
                      `}
                    >
                      {isCompleted ? "✓" : index + 1}
                    </div>
                    <span
                      className={`
                        mt-2 text-xs sm:text-sm font-medium
                        ${isActive ? "text-clay-600" : "text-gray-600"}
                      `}
                    >
                      {label}
                    </span>
                  </div>
                  {index < 3 && (
                    <div
                      className={`
                        h-1 flex-1 mx-2
                        ${isCompleted ? "bg-sage-500" : "bg-gray-200"}
                      `}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Step Content */}
      <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${currentStep === "success" ? "p-0" : "p-6 sm:p-8"}`}>
        {currentStep === "gender" && (
          <GenderSelector
            selectedGender={bookingData.gender}
            onGenderSelect={(gender) => {
              updateBookingData({ gender, selectedServices: [] }); // Reset services when gender changes
            }}
            onNext={() => goToStep("services")}
          />
        )}

        {currentStep === "services" && (
          <ServiceSelector
            services={filteredServices}
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

      {/* Back to Gender Selection Link - Show on Services step */}
      {currentStep === "services" && (
        <div className="mt-4 text-center">
          <button
            onClick={() => goToStep("gender")}
            className="text-sm text-gray-600 hover:text-clay-600 underline"
          >
            ← Change to {bookingData.gender === "men" ? "Women's" : "Men's"} Services
          </button>
        </div>
      )}
    </div>
  );
}
