"use client";
// app/book/page.tsx

import { useState, useRef } from "react";
import Link from "next/link";

// ── Service catalog — Women, Men, Facials, Back & Body, Add-Ons ──
const SERVICE_CATALOG = [
  {
    id: "waxing-women",
    label: "Women's Waxing",
    icon: "◈",
    sections: [
      {
        title: "Body Waxing",
        services: [
          { id: "w-brazilian",   name: "Brazilian Wax",  price: 50, duration: 45 },
          { id: "w-bikini-line", name: "Bikini Line",    price: 30, duration: 20 },
          { id: "w-french",      name: "French Bikini",  price: 40, duration: 30 },
          { id: "w-full-leg",    name: "Full Leg",        price: 55, duration: 50 },
          { id: "w-half-leg",    name: "Half Leg",        price: 35, duration: 35 },
          { id: "w-full-arm",    name: "Full Arm",        price: 45, duration: 40 },
          { id: "w-half-arm",    name: "Half Arm",        price: 25, duration: 25 },
          { id: "w-underarm",    name: "Underarm",        price: 20, duration: 20 },
          { id: "w-stomach",     name: "Stomach",         price: 35, duration: 25 },
        ],
      },
      {
        title: "Facial Waxing",
        services: [
          { id: "w-full-face", name: "Full Face", price: 40, duration: 30 },
          { id: "w-eyebrow",   name: "Eyebrow",   price: 13, duration: 20 },
          { id: "w-lip",       name: "Lip",        price: 8,  duration: 10 },
          { id: "w-chin",      name: "Chin",       price: 10, duration: 12 },
          { id: "w-nose",      name: "Nose",       price: 8,  duration: 10 },
        ],
      },
    ],
  },
  {
    id: "waxing-men",
    label: "Men's Waxing",
    icon: "◈",
    sections: [
      {
        title: "Body Waxing",
        services: [
          { id: "m-brozilian", name: "Brozilian",   price: 65, duration: 50 },
          { id: "m-back",      name: "Back Wax",    price: 60, duration: 45 },
          { id: "m-chest",     name: "Chest Wax",   price: 50, duration: 40 },
          { id: "m-underarm",  name: "Underarm",    price: 25, duration: 20 },
          { id: "m-legs",      name: "Full Legs",   price: 80, duration: 55 },
        ],
      },
      {
        title: "Facial Waxing",
        services: [
          { id: "m-beard",   name: "Beard Wax",   price: 60, duration: 30 },
          { id: "m-eyebrow", name: "Eyebrow Wax", price: 15, duration: 20 },
          { id: "m-nose",    name: "Nose Wax",    price: 8,  duration: 10 },
          { id: "m-ear",     name: "Ear Wax",     price: 8,  duration: 10 },
        ],
      },
    ],
  },
  {
    id: "facials",
    label: "Facials",
    icon: "✦",
    sections: [
      {
        title: "Facial Treatments",
        services: [
          {
            id: "facial-t1",
            name: "Facial Tier 1 — Hydrating Glow",
            price: 50,
            duration: 30,
            desc: "A 30-minute express facial designed to deeply hydrate, soothe, and restore your skin's natural radiance. Includes a customized cleanse, toning, and a lightweight moisture-lock treatment.",
          },
          {
            id: "facial-t2",
            name: "Facial Tier 2 — Signature Glow",
            price: 80,
            duration: 60,
            desc: "Our signature 60-minute organic facial with double cleanse, custom masking, enzyme treatment, and barrier serum. Targets uneven tone, dehydration, and dullness.",
          },
          {
            id: "facial-t3",
            name: "Facial Tier 3 — Glass Skin Treatment",
            price: 90,
            duration: 75,
            desc: "The full K-Beauty glass-skin experience. 75 minutes of organic layering — cleanse, tone, enzyme exfoliation, hydrating mask, barrier serum, and glow cream.",
          },
        ],
      },
    ],
  },
  {
    id: "back-body",
    label: "Back & Body",
    icon: "◇",
    sections: [
      {
        title: "Bacial (Back Facial)",
        services: [
          {
            id: "bacial-t1",
            name: "Bacial Tier 1 — Express Back Glow",
            price: 75,
            duration: 45,
            desc: "A 45-minute back facial targeting congestion, rough texture, and uneven tone. Includes double cleanse, exfoliation, and a brightening mask.",
          },
          {
            id: "bacial-t2",
            name: "Bacial Tier 2 — Signature Back Facial",
            price: 95,
            duration: 60,
            desc: "60-minute full back facial with deep cleanse, enzyme exfoliation, extraction (if needed), custom mask, and hydrating serum.",
          },
        ],
      },
      {
        title: "Vajacial",
        services: [
          {
            id: "vaj-t1",
            name: "Vajacial Tier 1 — Refresh",
            price: 55,
            duration: 30,
            desc: "A 30-minute soothing treatment for post-wax or bikini area skin. Gentle cleanse, calming mask, and light moisturizing to reduce redness and ingrown hairs.",
          },
          {
            id: "vaj-t2",
            name: "Vajacial Tier 2 — Renew",
            price: 75,
            duration: 45,
            desc: "45-minute vajacial with exfoliation, ingrown treatment, brightening mask, and barrier moisture seal.",
          },
          {
            id: "vaj-t3",
            name: "Vajacial Tier 3 — Glow",
            price: 90,
            duration: 60,
            desc: "Our most comprehensive 60-minute vajacial — full exfoliation, extraction, vitamin C brightening treatment, and collagen mask.",
          },
        ],
      },
    ],
  },
  {
    id: "addons",
    label: "Add-Ons",
    icon: "○",
    // Add-ons use sub-accordions — handled separately in render
    subAccordion: true,
    sections: [
      {
        title: "Facial Add-Ons",
        services: [
          { id: "add-dermaplaning",  name: "Dermaplaning",         price: 25, duration: 15 },
          { id: "add-led",           name: "LED Light Therapy",     price: 20, duration: 15 },
          { id: "add-eye-mask",      name: "Collagen Eye Mask",     price: 15, duration: 0  },
          { id: "add-lip-mask",      name: "Lip Plump Mask",        price: 12, duration: 0  },
          { id: "add-gua-sha",       name: "Gua Sha Lift",          price: 20, duration: 15 },
        ],
      },
      {
        title: "Body Add-Ons",
        services: [
          { id: "add-body-scrub",    name: "Organic Sugar Scrub",   price: 30, duration: 15 },
          { id: "add-body-mask",     name: "Detox Body Mask",       price: 35, duration: 20 },
          { id: "add-ingrown",       name: "Ingrown Treatment",     price: 20, duration: 10 },
          { id: "add-brightening",   name: "Brightening Treatment", price: 25, duration: 10 },
        ],
      },
      {
        title: "Massage Add-Ons",
        services: [
          { id: "add-scalp",         name: "Scalp Massage (10 min)",   price: 15, duration: 10 },
          { id: "add-hand",          name: "Hand Massage (10 min)",    price: 12, duration: 10 },
          { id: "add-foot",          name: "Foot Massage (10 min)",    price: 15, duration: 10 },
          { id: "add-neck-shoulder", name: "Neck & Shoulder (15 min)", price: 20, duration: 15 },
        ],
      },
    ],
  },
];

const TIME_SLOTS = [
  "9:00 AM","9:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM",
  "12:00 PM","12:30 PM","1:00 PM","1:30 PM","2:00 PM","2:30 PM",
  "3:00 PM","3:30 PM","4:00 PM","4:30 PM","5:00 PM","5:30 PM","6:00 PM",
];

const ALL_SERVICES = SERVICE_CATALOG.flatMap(cat =>
  cat.sections.flatMap(sec => sec.services.map(s => ({ ...s, category: cat.label })))
);

type ServiceItem = typeof ALL_SERVICES[0];

function getNextDays(n: number) {
  const days = [];
  const today = new Date();
  for (let i = 1; i <= n; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d);
  }
  return days;
}

function formatDate(d: Date) {
  return d.toISOString().split("T")[0];
}

export default function BookPage() {
  const [openCategory, setOpenCategory]   = useState<string | null>(null);
  const [openSubSection, setOpenSubSection] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [step, setStep]                   = useState<1 | 2 | 3 | 4>(1);
  const [selectedDate, setSelectedDate]   = useState("");
  const [selectedTime, setSelectedTime]   = useState("");
  const [form, setForm]                   = useState({ name: "", email: "", phone: "", notes: "" });
  const [submitting, setSubmitting]       = useState(false);
  const [confirmed, setConfirmed]         = useState(false);
  const [icsContent, setIcsContent]       = useState("");
  const [error, setError]                 = useState("");

  const formRef      = useRef<HTMLDivElement>(null);
  const availableDays = getNextDays(30);

  const selectService = (svc: ServiceItem) => {
    setSelectedService(svc);
    setStep(2);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  };

  const handleSubmit = async () => {
    if (!selectedService || !selectedDate || !selectedTime || !form.name || !form.email) {
      setError("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name, email: form.email, phone: form.phone, notes: form.notes,
          service: selectedService.name, category: selectedService.category,
          price: selectedService.price, date: selectedDate, time: selectedTime,
          duration: selectedService.duration,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Booking failed");
      setIcsContent(data.icsContent ?? "");
      setConfirmed(true);
      setStep(4);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const downloadICS = () => {
    if (!icsContent) return;
    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url; a.download = "epoch-skin-appointment.ics"; a.click();
    URL.revokeObjectURL(url);
  };

  // ── Shared service row renderer ───────────────────────────────
  const ServiceRow = ({ svc, catLabel }: { svc: (typeof ALL_SERVICES)[0]; catLabel: string }) => (
    <button
      key={svc.id}
      onClick={() => selectService({ ...svc, category: catLabel })}
      className="w-full flex items-start justify-between px-6 py-4
                 border-t border-[#F0EBE0] hover:bg-[#FDF9F5]
                 transition-colors duration-200 text-left group"
    >
      <div className="flex-1">
        <p className="text-sm font-sans text-[#1C1C1A] font-medium group-hover:text-[#C9A96E] transition-colors duration-300">
          {svc.name}
        </p>
        {"desc" in svc && svc.desc && (
          <p className="text-xs font-sans text-[#8C8680] mt-1 leading-relaxed max-w-[380px]">
            {(svc as typeof svc & { desc: string }).desc}
          </p>
        )}
        {svc.duration > 0 && (
          <p className="text-[10px] text-[#C0BAB4] font-sans mt-1">{svc.duration} min</p>
        )}
      </div>
      <div className="flex items-center gap-4 flex-shrink-0 ml-6 mt-0.5">
        <span className="text-[#C9A96E] font-serif text-lg">${svc.price}</span>
        <span className="text-[#C9A96E] text-sm opacity-0 group-hover:opacity-100 transition-opacity">→</span>
      </div>
    </button>
  );

  // ── STEP 4 — Success ─────────────────────────────────────────
  if (confirmed) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-5">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-[#F5EDD8] flex items-center justify-center mx-auto mb-8 text-2xl">✨</div>
          <p className="text-[11px] tracking-[0.28em] uppercase text-[#C9A96E] font-sans mb-3">Confirmed</p>
          <h1 className="font-serif text-4xl text-[#1C1C1A] mb-4">You&apos;re booked.</h1>
          <p className="text-[#5A5550] font-sans text-sm leading-relaxed mb-2">
            A confirmation has been sent to <strong>{form.email}</strong> with a calendar invite attached.
          </p>
          <p className="text-[#5A5550] font-sans text-sm mb-10">
            Need to reschedule? Call or text <strong>(504) 777-4094</strong>.
          </p>
          <div className="flex flex-col gap-3">
            <button onClick={downloadICS}
              className="w-full py-3.5 bg-[#C9A96E] text-[#1C1C1A] text-[11px] tracking-[0.22em]
                         uppercase font-sans hover:bg-[#D4AF88] transition-colors duration-300">
              Download .ics (Apple / Google Calendar)
            </button>
            <Link href="/shop"
              className="block text-center text-sm text-[#8C8680] hover:text-[#C9A96E] transition-colors font-sans mt-2">
              Shop Skincare →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 py-16 md:py-20">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="w-10 h-px bg-[#C9A96E] mx-auto mb-5" />
          <p className="text-[11px] tracking-[0.28em] uppercase text-[#C9A96E] font-sans mb-3">Epoch Skin Studio</p>
          <h1 className="font-serif text-4xl md:text-5xl text-[#1C1C1A]">Book Your Appointment</h1>
          <p className="text-[#8C8680] font-sans text-sm mt-4 max-w-md mx-auto">
            Choose a service below, then select your preferred date and time.
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-0 mb-14">
          {["Service", "Date & Time", "Your Info", "Confirm"].map((label, i) => {
            const num    = i + 1;
            const done   = step > num;
            const active = step === num;
            return (
              <div key={label} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-sans font-medium transition-all duration-300 ${
                    done ? "bg-[#C9A96E] text-[#1C1C1A]" : active ? "bg-[#1C1C1A] text-[#C9A96E]" : "bg-[#E5DCCF] text-[#8C8680]"
                  }`}>{done ? "✓" : num}</div>
                  <span className={`text-[10px] mt-1.5 font-sans hidden sm:block tracking-wide ${active ? "text-[#1C1C1A]" : "text-[#8C8680]"}`}>{label}</span>
                </div>
                {i < 3 && <div className={`w-10 sm:w-20 h-px mx-2 mb-5 transition-colors duration-300 ${done ? "bg-[#C9A96E]" : "bg-[#E5DCCF]"}`} />}
              </div>
            );
          })}
        </div>

        {/* ── STEP 1: Service selection ── */}
        <div className={step === 1 ? "" : "hidden"}>
          <div className="max-w-2xl mx-auto space-y-3">
            {SERVICE_CATALOG.map((cat) => {
              const isOpen = openCategory === cat.id;
              const isAddons = cat.id === "addons";

              return (
                <div key={cat.id} className="border border-[#E5DCCF] bg-white overflow-hidden">

                  {/* Category header */}
                  <button
                    onClick={() => setOpenCategory(isOpen ? null : cat.id)}
                    className="w-full flex items-center justify-between px-6 py-5
                               hover:bg-[#FAF7F2] transition-colors duration-300 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-[#C9A96E] text-lg">{cat.icon}</span>
                      <span className="font-serif text-xl text-[#1C1C1A]">{cat.label}</span>
                    </div>
                    <span className={`text-[#C9A96E] text-lg transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>↓</span>
                  </button>

                  {/* Accordion body */}
                  <div className={`transition-all duration-300 overflow-hidden ${isOpen ? "max-h-[3000px]" : "max-h-0"}`}>
                    <div className="border-t border-[#E5DCCF]">

                      {isAddons ? (
                        // ── Add-Ons: sub-accordions per section ──
                        cat.sections.map((section) => {
                          const subKey  = `${cat.id}-${section.title}`;
                          const subOpen = openSubSection === subKey;
                          return (
                            <div key={section.title} className="border-b border-[#F0EBE0] last:border-b-0">
                              <button
                                onClick={() => setOpenSubSection(subOpen ? null : subKey)}
                                className="w-full flex items-center justify-between px-6 py-4
                                           bg-[#FAF7F2] hover:bg-[#F5EDD8] transition-colors duration-200 text-left"
                              >
                                <p className="text-[10px] tracking-[0.28em] uppercase text-[#8C8680] font-sans">
                                  {section.title}
                                </p>
                                <span className={`text-[#C9A96E] text-sm transition-transform duration-200 ${subOpen ? "rotate-180" : ""}`}>↓</span>
                              </button>
                              <div className={`overflow-hidden transition-all duration-200 ${subOpen ? "max-h-[800px]" : "max-h-0"}`}>
                                {section.services.map((svc) => (
                                  <ServiceRow key={svc.id} svc={svc} catLabel={cat.label} />
                                ))}
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        // ── Standard: sections with label headers ──
                        cat.sections.map((section, si) => (
                          <div key={si}>
                            <p className="text-[10px] tracking-[0.28em] uppercase text-[#8C8680] font-sans
                                           px-6 pt-5 pb-2 bg-[#FAF7F2]">
                              {section.title}
                            </p>
                            {section.services.map((svc) => (
                              <ServiceRow key={svc.id} svc={svc} catLabel={cat.label} />
                            ))}
                          </div>
                        ))
                      )}

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── STEP 2: Date & Time ── */}
        <div ref={formRef} className={step === 2 ? "max-w-2xl mx-auto" : "hidden"}>
          {selectedService && (
            <div className="bg-white border border-[#E5DCCF] p-5 mb-8 flex items-center justify-between">
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#C9A96E] font-sans mb-0.5">Selected</p>
                <p className="font-serif text-lg text-[#1C1C1A]">{selectedService.name}</p>
                <p className="text-[#8C8680] text-xs font-sans">{selectedService.duration} min · ${selectedService.price}</p>
              </div>
              <button onClick={() => { setSelectedService(null); setStep(1); }}
                className="text-xs text-[#8C8680] hover:text-[#C9A96E] font-sans transition-colors">
                Change
              </button>
            </div>
          )}

          <h2 className="font-serif text-2xl text-[#1C1C1A] mb-8">Choose Date & Time</h2>

          {/* Date strip */}
          <div className="mb-8">
            <p className="text-[11px] tracking-[0.22em] uppercase text-[#C9A96E] font-sans mb-4">Select Date</p>
            <div className="overflow-x-auto pb-2">
              <div className="flex gap-2 w-max">
                {availableDays.map((day) => {
                  const dateStr    = formatDate(day);
                  const isWeekend  = day.getDay() === 0;
                  const isSelected = selectedDate === dateStr;
                  return (
                    <button key={dateStr} disabled={isWeekend} onClick={() => setSelectedDate(dateStr)}
                      className={`flex-shrink-0 px-3 py-3 text-center border transition-all duration-300 min-w-[72px] ${
                        isWeekend
                          ? "border-[#F0EBE0] text-[#D0C8BE] cursor-not-allowed"
                          : isSelected
                          ? "border-[#C9A96E] bg-[#C9A96E] text-[#1C1C1A]"
                          : "border-[#E5DCCF] text-[#1C1C1A] hover:border-[#C9A96E]"
                      }`}
                    >
                      <p className="text-[9px] uppercase tracking-wide font-sans">
                        {day.toLocaleDateString("en-US", { weekday: "short" })}
                      </p>
                      <p className="font-serif text-lg leading-none mt-0.5">{day.getDate()}</p>
                      <p className="text-[9px] font-sans text-[inherit] opacity-70">
                        {day.toLocaleDateString("en-US", { month: "short" })}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
            {selectedDate && (
              <p className="text-xs text-[#8C8680] font-sans mt-2">
                {new Date(selectedDate + "T12:00:00").toLocaleDateString("en-US", {
                  weekday: "long", month: "long", day: "numeric", year: "numeric",
                })}
              </p>
            )}
          </div>

          {/* Time grid */}
          {selectedDate && (
            <div className="mb-8">
              <p className="text-[11px] tracking-[0.22em] uppercase text-[#C9A96E] font-sans mb-4">Select Time</p>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {TIME_SLOTS.map((slot) => (
                  <button key={slot} onClick={() => setSelectedTime(slot)}
                    className={`py-3 text-center text-xs font-sans tracking-wide border transition-all duration-300 ${
                      selectedTime === slot
                        ? "bg-[#1C1C1A] text-[#C9A96E] border-[#1C1C1A]"
                        : "border-[#E5DCCF] text-[#5A5550] hover:border-[#C9A96E]"
                    }`}>
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between">
            <button onClick={() => setStep(1)} className="text-sm font-sans text-[#8C8680] hover:text-[#1C1C1A] transition-colors">
              ← Back
            </button>
            <button onClick={() => setStep(3)} disabled={!selectedDate || !selectedTime}
              className="px-8 py-3.5 bg-[#1C1C1A] text-[#C9A96E] text-[11px] tracking-[0.22em]
                         uppercase font-sans hover:bg-[#C9A96E] hover:text-[#1C1C1A]
                         transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed">
              Continue →
            </button>
          </div>
        </div>

        {/* ── STEP 3: Contact info ── */}
        <div className={step === 3 ? "max-w-2xl mx-auto" : "hidden"}>
          <h2 className="font-serif text-2xl text-[#1C1C1A] mb-8">Your Information</h2>

          {selectedService && selectedDate && selectedTime && (
            <div className="bg-white border border-[#E5DCCF] p-5 mb-8">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-serif text-[#1C1C1A] text-lg">{selectedService.name}</p>
                  <p className="text-[#8C8680] text-xs font-sans mt-1">
                    {new Date(selectedDate + "T12:00:00").toLocaleDateString("en-US", {
                      weekday: "long", month: "long", day: "numeric",
                    })} at {selectedTime}
                  </p>
                </div>
                <p className="font-serif text-xl text-[#C9A96E]">${selectedService.price}</p>
              </div>
            </div>
          )}

          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-[10px] tracking-[0.22em] uppercase text-[#8C8680] font-sans block mb-2">Name *</label>
                <input type="text" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  placeholder="Your full name"
                  className="w-full px-4 py-3.5 border border-[#E5DCCF] bg-white text-[#1C1C1A] text-sm font-sans
                             placeholder-[#C0BAB4] focus:outline-none focus:border-[#C9A96E] transition-colors" />
              </div>
              <div>
                <label className="text-[10px] tracking-[0.22em] uppercase text-[#8C8680] font-sans block mb-2">Email *</label>
                <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3.5 border border-[#E5DCCF] bg-white text-[#1C1C1A] text-sm font-sans
                             placeholder-[#C0BAB4] focus:outline-none focus:border-[#C9A96E] transition-colors" />
              </div>
            </div>
            <div>
              <label className="text-[10px] tracking-[0.22em] uppercase text-[#8C8680] font-sans block mb-2">Phone</label>
              <input type="tel" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                placeholder="(504) 555-0000"
                className="w-full px-4 py-3.5 border border-[#E5DCCF] bg-white text-[#1C1C1A] text-sm font-sans
                           placeholder-[#C0BAB4] focus:outline-none focus:border-[#C9A96E] transition-colors" />
            </div>
            <div>
              <label className="text-[10px] tracking-[0.22em] uppercase text-[#8C8680] font-sans block mb-2">Notes (optional)</label>
              <textarea value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
                rows={3} placeholder="Skin concerns, allergies, or anything we should know..."
                className="w-full px-4 py-3.5 border border-[#E5DCCF] bg-white text-[#1C1C1A] text-sm font-sans
                           placeholder-[#C0BAB4] focus:outline-none focus:border-[#C9A96E] transition-colors resize-none" />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm font-sans mt-4">{error}</p>}

          <div className="flex justify-between mt-8">
            <button onClick={() => setStep(2)} className="text-sm font-sans text-[#8C8680] hover:text-[#1C1C1A] transition-colors">
              ← Back
            </button>
            <button onClick={handleSubmit} disabled={submitting || !form.name || !form.email}
              className="px-8 py-3.5 bg-[#C9A96E] text-[#1C1C1A] text-[11px] tracking-[0.22em]
                         uppercase font-sans font-medium hover:bg-[#D4AF88]
                         transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
              {submitting ? "Booking..." : "Confirm Booking"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
