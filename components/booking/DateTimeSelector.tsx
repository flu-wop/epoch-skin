"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format, addDays } from "date-fns";

interface DateTimeSelectorProps {
  selectedDate: Date | null;
  selectedTime: string;
  onDateChange: (date: Date | null) => void;
  onTimeChange: (time: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const businessHours = {
  monday:    { start: 9,  end: 19 },
  tuesday:   { start: 9,  end: 19 },
  wednesday: { start: 9,  end: 19 },
  thursday:  { start: 9,  end: 19 },
  friday:    { start: 9,  end: 19 },
  saturday:  { start: 10, end: 18 },
  sunday:    null,
};

function generateTimeSlots(date: Date | null): string[] {
  if (!date) return [];
  const dayOfWeek = format(date, "EEEE").toLowerCase() as keyof typeof businessHours;
  const hours = businessHours[dayOfWeek];
  if (!hours) return [];

  const slots: string[] = [];
  let h = hours.start;
  let m = 0;

  while (h < hours.end || (h === hours.end && m === 0)) {
    const hour12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
    const period = h >= 12 ? "PM" : "AM";
    slots.push(`${hour12}:${m.toString().padStart(2, "0")} ${period}`);
    m += 30;
    if (m >= 60) { m = 0; h += 1; }
  }
  return slots;
}

export function DateTimeSelector({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
  onNext,
  onBack,
}: DateTimeSelectorProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const availableTimeSlots = generateTimeSlots(selectedDate);
  const canProceed = selectedDate && selectedTime;

  // react-day-picker v9: use disabled array with functions/objects
  const disabledDays = [
    { dayOfWeek: [0] as (0 | 1 | 2 | 3 | 4 | 5 | 6)[] },
    { before: today },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">
          Choose Date & Time
        </h2>
        <p className="text-gray-600">
          Select your preferred date and time slot. We're open Monday–Friday 9 AM – 7 PM, and Saturday 10 AM – 6 PM.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Calendar */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Select Date</h3>
          <div className="border border-[#E8E0D0] rounded-lg p-4 bg-white">
            <style>{`
              .rdp-root {
                --rdp-accent-color: #D4AF77;
                --rdp-accent-background-color: #F5EDD8;
              }
              .rdp-months { justify-content: center; }
            `}</style>
            <DayPicker
              mode="single"
              selected={selectedDate ?? undefined}
              onSelect={(date) => onDateChange(date ?? null)}
              disabled={disabledDays}
              startMonth={today}
              endMonth={addDays(today, 60)}
            />
          </div>
        </div>

        {/* Time Slots */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Select Time</h3>
          {!selectedDate ? (
            <div className="border border-[#E8E0D0] rounded-lg p-8 bg-[#FAFAF8] text-center">
              <p className="text-[#AAA]">Please select a date first</p>
            </div>
          ) : availableTimeSlots.length === 0 ? (
            <div className="border border-[#E8E0D0] rounded-lg p-8 bg-[#FAFAF8] text-center">
              <p className="text-[#888]">We're closed on {format(selectedDate, "EEEE")}s</p>
              <p className="text-sm text-[#AAA] mt-2">Please select another day</p>
            </div>
          ) : (
            <div className="border border-[#E8E0D0] rounded-lg p-4 bg-white max-h-[400px] overflow-y-auto">
              <div className="grid grid-cols-2 gap-2">
                {availableTimeSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => onTimeChange(slot)}
                    className={`py-3 px-4 text-sm font-medium transition-all border ${
                      selectedTime === slot
                        ? "bg-[#D4AF77] text-[#111] border-[#D4AF77]"
                        : "bg-[#FAFAF8] text-[#555] border-[#E8E0D0] hover:border-[#D4AF77]"
                    }`}
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
        <div className="bg-[#F5EDD8] border border-[#D4AF77]/30 p-4">
          <p className="text-xs tracking-widest uppercase text-[#D4AF77] mb-1">Your Appointment</p>
          <p className="font-serif text-lg text-[#111]">
            {format(selectedDate, "EEEE, MMMM d, yyyy")} at {selectedTime}
          </p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 py-4 px-6 border border-[#E0D8CC] text-[#888] text-xs tracking-widest uppercase hover:border-[#D4AF77] hover:text-[#111] transition-colors"
        >
          Back to Services
        </button>
        <button
          onClick={onNext}
          disabled={!canProceed}
          className={`flex-1 py-4 px-6 text-xs tracking-widest uppercase transition-colors ${
            canProceed
              ? "bg-[#3E4A3C] text-[#C4974A] hover:bg-[#C4974A] hover:text-white"
              : "bg-[#E8E0D0] text-[#AAA] cursor-not-allowed"
          }`}
        >
          Continue to Contact Info
        </button>
      </div>
    </div>
  );
}
