"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format, addDays, setHours, setMinutes, isBefore, isAfter, isSameDay } from "date-fns";

interface DateTimeSelectorProps {
  selectedDate: Date | null;
  selectedTime: string;
  onDateChange: (date: Date | null) => void;
  onTimeChange: (time: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function DateTimeSelector({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
  onNext,
  onBack,
}: DateTimeSelectorProps) {
  // Business hours configuration
  const businessHours = {
    monday: { start: 9, end: 19 }, // 9 AM - 7 PM
    tuesday: { start: 9, end: 19 },
    wednesday: { start: 9, end: 19 },
    thursday: { start: 9, end: 19 },
    friday: { start: 9, end: 19 },
    saturday: { start: 10, end: 18 }, // 10 AM - 6 PM
    sunday: null, // Closed
  };

  // Generate time slots (30-minute intervals)
  const generateTimeSlots = (date: Date | null) => {
    if (!date) return [];

    const dayOfWeek = format(date, "EEEE").toLowerCase() as keyof typeof businessHours;
    const hours = businessHours[dayOfWeek];

    if (!hours) return []; // Closed on this day

    const slots: string[] = [];
    let currentHour = hours.start;
    let currentMinute = 0;

    while (currentHour < hours.end || (currentHour === hours.end && currentMinute === 0)) {
      const timeSlot = `${currentHour.toString().padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`;
      const hour12 = currentHour > 12 ? currentHour - 12 : currentHour === 0 ? 12 : currentHour;
      const period = currentHour >= 12 ? "PM" : "AM";
      const displayTime = `${hour12}:${currentMinute.toString().padStart(2, "0")} ${period}`;

      slots.push(displayTime);

      // Increment by 30 minutes
      currentMinute += 30;
      if (currentMinute >= 60) {
        currentMinute = 0;
        currentHour += 1;
      }
    }

    return slots;
  };

  const availableTimeSlots = generateTimeSlots(selectedDate);

  // Disable Sundays and past dates
  const disabledDays = [
    { dayOfWeek: [0] }, // Sunday
    { before: new Date() }, // Past dates
  ];

  const canProceed = selectedDate && selectedTime;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">
          Choose Date & Time
        </h2>
        <p className="text-gray-600">
          Select your preferred date and time slot. We're open Monday-Friday 9 AM - 7 PM, and Saturday 10 AM - 6 PM.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Calendar */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Select Date</h3>
          <div className="border border-gray-200 rounded-lg p-4 bg-white">
            <style>{`
              .rdp {
                --rdp-cell-size: 40px;
                --rdp-accent-color: #b87968;
                --rdp-background-color: #f7f3f0;
                margin: 0;
              }
              .rdp-months {
                justify-content: center;
              }
              .rdp-day_selected {
                background-color: #b87968;
                color: white;
              }
              .rdp-day_selected:hover {
                background-color: #a66b5a;
              }
              .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
                background-color: #f7f3f0;
              }
              .rdp-day_disabled {
                opacity: 0.3;
              }
            `}</style>
            <DayPicker
              mode="single"
              selected={selectedDate || undefined}
              onSelect={onDateChange}
              disabled={disabledDays}
              fromDate={new Date()}
              toDate={addDays(new Date(), 60)} // Can book up to 60 days ahead
            />
          </div>
        </div>

        {/* Time Slots */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Select Time</h3>
          {!selectedDate ? (
            <div className="border border-gray-200 rounded-lg p-8 bg-gray-50 text-center">
              <p className="text-gray-500">Please select a date first</p>
            </div>
          ) : availableTimeSlots.length === 0 ? (
            <div className="border border-gray-200 rounded-lg p-8 bg-gray-50 text-center">
              <p className="text-gray-500">We're closed on {format(selectedDate, "EEEE")}s</p>
              <p className="text-sm text-gray-400 mt-2">Please select another day</p>
            </div>
          ) : (
            <div className="border border-gray-200 rounded-lg p-4 bg-white max-h-[400px] overflow-y-auto">
              <div className="grid grid-cols-2 gap-2">
                {availableTimeSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => onTimeChange(slot)}
                    className={`
                      py-3 px-4 rounded-lg text-sm font-medium transition-all
                      ${
                        selectedTime === slot
                          ? "bg-clay-500 text-white"
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
                      }
                    `}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Selected Summary */}
      {selectedDate && selectedTime && (
        <div className="bg-sand-50 border border-sand-200 rounded-lg p-4">
          <p className="text-sm text-gray-600">Selected appointment time:</p>
          <p className="text-lg font-semibold text-gray-900 mt-1">
            {format(selectedDate, "EEEE, MMMM d, yyyy")} at {selectedTime}
          </p>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 py-4 px-6 border-2 border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
        >
          Back to Services
        </button>
        <button
          onClick={onNext}
          disabled={!canProceed}
          className={`
            flex-1 py-4 px-6 rounded-lg font-semibold transition-colors
            ${
              canProceed
                ? "bg-clay-500 text-white hover:bg-clay-600"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }
          `}
        >
          Continue to Contact Info
        </button>
      </div>
    </div>
  );
}
