"use client";

import { useState } from "react";
import { ServiceSelector } from "./ServiceSelector";
import { DateTimeSelector } from "./DateTimeSelector";
import { ContactForm } from "./ContactForm";
import { BookingReview } from "./BookingReview";
import { BookingPayment } from "./BookingPayment";
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

type BookingStep = "services" | "datetime" | "contact" | "review" | "payment" | "success";

export function BookingForm() {
  const [currentStep, setCurrentStep] = useState<BookingStep>("services");
  const [bookingData, setBookingData] = useState<BookingData>({
    selectedServices: [],
    date: null,
    time: "",
    name: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    notes: "",
  });

  const updateBookingData = (updates: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...updates }));
  };

  const goToStep = (step: BookingStep) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const progressStepNames: BookingStep[] = ["services", "datetime", "contact", "review"];
  const currentProgressIndex = progressStepNames.indexOf(currentStep);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Indicator — hidden on payment and success screens */}
      {currentStep !== "success" && currentStep !== "payment" && (
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {["Services", "Date & Time", "Contact", "Review"].map((label, index) => {
              const isActive = index === currentProgressIndex;
              const isCompleted = index < currentProgressIndex;
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
          onSubmit={() => goToStep("payment")}
        />
      )}

      {currentStep === "payment" && (
        <BookingPayment
          bookingData={bookingData}
          services={services}
          onSuccess={() => goToStep("success")}
          onBack={() => goToStep("review")}
        />
      )}

      {currentStep === "success" && (
        <BookingSuccess bookingData={bookingData} />
      )}
    </div>
  );
}
