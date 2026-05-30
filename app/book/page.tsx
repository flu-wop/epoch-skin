"use client";
// app/book/page.tsx

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

// ── Types ─────────────────────────────────────────────────────────
type Service = {
  id: string;
  name: string;
  price: number;
  duration: number;
  desc?: string;
};

type Section = {
  title: string;
  services: Service[];
};

type SubGroup = {
  groupTitle: string;
  sections: Section[];
};

type CatalogItem = {
  id: string;
  label: string;
  icon: string;
  mode: "flat" | "sections" | "subgroups";
  sections?: Section[];
  subgroups?: SubGroup[];
};

// ── Service catalog ───────────────────────────────────────────────
const SERVICE_CATALOG: CatalogItem[] = [
  {
    id: "waxing",
    label: "Waxing",
    icon: "◈",
    mode: "subgroups",
    subgroups: [
      {
        groupTitle: "Women's Waxing",
        sections: [
          {
            title: "Body Waxing",
            services: [
              { id: "w-brazilian",     name: "Brazilian Wax",       price: 50, duration: 45 },
              { id: "w-bikini-line",   name: "Bikini Line",         price: 30, duration: 20 },
              { id: "w-french",        name: "French Bikini",       price: 40, duration: 30 },
              { id: "w-full-leg",      name: "Full Leg",            price: 55, duration: 50 },
              { id: "w-half-leg",      name: "Half Leg",            price: 45, duration: 35 },
              { id: "w-full-arm",      name: "Full Arm",            price: 45, duration: 40 },
              { id: "w-half-arm",      name: "Half Arm",            price: 30, duration: 25 },
              { id: "w-underarm",      name: "Underarm",            price: 20, duration: 20 },
              { id: "w-stomach-strip", name: "Stomach Strip",       price: 20, duration: 15 },
              { id: "w-full-stomach",  name: "Full Stomach",        price: 40, duration: 25 },
              { id: "w-toes",          name: "Toes",                price: 10, duration: 10 },
              { id: "w-feet",          name: "Feet",                price: 20, duration: 15 },
              { id: "w-back",          name: "Back",                price: 45, duration: 40 },
              { id: "w-full-buttock",  name: "Full Buttock",        price: 30, duration: 20 },
              { id: "w-cheeks",        name: "Between the Cheeks",  price: 15, duration: 10 },
              { id: "w-chest",         name: "Chest",               price: 15, duration: 15 },
              { id: "w-full-body",     name: "Full Body Wax",       price: 140, duration: 90 },
            ],
          },
          {
            title: "Facial Waxing",
            services: [
              { id: "w-eyebrow",    name: "Eyebrow",      price: 15, duration: 20 },
              { id: "w-upper-lip",  name: "Upper Lip",    price: 10, duration: 10 },
              { id: "w-chin",       name: "Chin",         price: 15, duration: 12 },
              { id: "w-cheekbones", name: "Cheekbones",   price: 12, duration: 15 },
              { id: "w-sideburns",  name: "Sideburns",    price: 12, duration: 10 },
            ],
          },
        ],
      },
      {
        groupTitle: "Men's Waxing",
        sections: [
          {
            title: "Body Waxing",
            services: [
              { id: "m-full-arms",     name: "Full Arms",           price: 60, duration: 45 },
              { id: "m-half-arm",      name: "Half Arm",            price: 35, duration: 25 },
              { id: "m-back",          name: "Back Wax",            price: 50, duration: 45 },
              { id: "m-chest",         name: "Chest",               price: 40, duration: 32 },
              { id: "m-underarm",      name: "Underarms",           price: 30, duration: 20 },
              { id: "m-brozilian",     name: "Brozilian",           price: 60, duration: 50 },
              { id: "m-full-legs",     name: "Full Legs",           price: 70, duration: 55 },
              { id: "m-half-legs",     name: "Half Legs",           price: 45, duration: 35 },
              { id: "m-full-butt",     name: "Full Butt",           price: 40, duration: 20 },
              { id: "m-cheeks",        name: "Between the Cheeks",  price: 20, duration: 10 },
              { id: "m-stomach-strip", name: "Stomach Strip",       price: 30, duration: 15 },
              { id: "m-full-stomach",  name: "Full Stomach",        price: 60, duration: 25 },
              { id: "m-feet",          name: "Feet",                price: 20, duration: 15 },
              { id: "m-toes",          name: "Toes",                price: 10, duration: 10 },
              { id: "m-full-body",     name: "Full Body Wax",       price: 160, duration: 90 },
            ],
          },
          {
            title: "Facial Waxing",
            services: [
              { id: "m-eyebrows",   name: "Eyebrows",   price: 20, duration: 20 },
              { id: "m-upper-lip",  name: "Upper Lip",  price: 15, duration: 10 },
              { id: "m-chin",       name: "Chin",       price: 20, duration: 12 },
              { id: "m-cheekbones", name: "Cheekbones", price: 20, duration: 15 },
              { id: "m-sideburns",  name: "Sideburns",  price: 15, duration: 10 },
              { id: "m-beard",      name: "Beard",      price: 50, duration: 30 },
              { id: "m-nose",       name: "Nose Wax",   price: 10, duration: 10 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "facials",
    label: "Facials",
    icon: "✦",
    mode: "flat",
    sections: [
      {
        title: "Facial Treatments",
        services: [
          {
            id: "facial-t1",
            name: "Tier 1 Facial",
            price: 50,
            duration: 30,
            desc: "Indulge in a moment of pure serenity with our Tier 1 Facial — a luxurious entryway into professional skincare that cleanses, nurtures, and restores your skin to its most radiant self. This soothing, results-driven treatment is thoughtfully designed for all skin types, offering a gentle yet deeply effective experience that leaves you feeling refreshed, balanced, and glowing.",
          },
          {
            id: "facial-t2",
            name: "Tier 2 Facial",
            price: 80,
            duration: 60,
            desc: "Immerse yourself in elevated skincare with our Tier 2 Facial — a luxurious, results-oriented treatment that combines deep renewal with soothing relaxation. Building upon the foundations of our Tier 1 experience, this advanced facial incorporates professional-grade technologies like diamond dermabrasion and the high frequency wand to more effectively address visible skin concerns while leaving your complexion profoundly rejuvenated, hydrated, and glowing.",
          },
          {
            id: "facial-t3",
            name: "Tier 3 Facial",
            price: 90,
            duration: 75,
            desc: "Elevate your skincare ritual with our Tier 3 Facial — the ultimate luxurious expression of advanced skin renewal. This premium, multi-technology treatment delivers deep therapeutic results while enveloping you in profound relaxation and indulgence. Building upon our foundational protocols, the Tier 3 combines the transformative power of HydraFacial, High Frequency, and a restorative add-on to comprehensively address your skin concerns and reveal visibly healthier, more luminous skin.",
          },
        ],
      },
    ],
  },
  {
    id: "back-body",
    label: "Back & Body",
    icon: "◇",
    mode: "sections",
    sections: [
      {
        title: "Bacial (Back Facial)",
        services: [
          {
            id: "bacial-t1",
            name: "Bacial Tier 1",
            price: 75,
            duration: 45,
            desc: "A specialized treatment designed to transform the skin on your back. Just like a facial for your face, this treatment deeply cleanses, clarifies, and revitalizes the hard-to-reach area of your back, leaving it visibly clearer, smoother, and healthier.",
          },
          {
            id: "bacial-t2",
            name: "Bacial Tier 2",
            price: 95,
            duration: 60,
            desc: "Indulge in a deeper level of renewal with our Tier 2 Back Facial — a luxurious, results-driven treatment that elevates back care to the next level. This advanced session combines soothing relaxation with professional technologies like diamond dermabrasion and the high frequency wand to effectively target stubborn concerns while leaving the skin on your back visibly smoother, clearer, healthier, and glowing.",
          },
        ],
      },
      {
        title: "Vajacial",
        services: [
          {
            id: "vaj-t1",
            name: "Vajacial Tier 1",
            price: 70,
            duration: 30,
            desc: "Indulge your skin with a deeply hydrating treatment. This luxurious vajacial features a Brazilian wax, expert extractions, and a restorative mask that calms inflammation while soothing post-wax imperfections, leaving your skin exquisitely soft, soothed, and radiant.",
          },
          {
            id: "vaj-t2",
            name: "Vajacial Tier 2",
            price: 80,
            duration: 45,
            desc: "Indulge in radiant luxury with our signature Brightening Vajacial. This exquisite treatment cultivates a luminous, even-toned complexion through a Brazilian wax, refined exfoliation, and a nourishing specialized gel mask that deeply hydrates the skin while visibly reducing the appearance of dark spots.",
          },
          {
            id: "vaj-t3",
            name: "Vajacial Tier 3",
            price: 90,
            duration: 60,
            desc: "Indulge in our signature luxurious treatment, crafted to gently soothe inflammation and diminish blemishes. Using advanced ultrasonic scrubbing and high-frequency technology, we delicately purify the skin by removing impurities and toxins, leaving your Brazilian area deeply hydrated, silky-smooth, and radiant.",
          },
        ],
      },
    ],
  },
  {
    id: "addons",
    label: "Add-Ons",
    icon: "○",
    mode: "sections",
    sections: [
      {
        title: "Facial Treatments",
        services: [
          { id: "add-high-freq-f",   name: "High Frequency Wand",    price: 15, duration: 10 },
          { id: "add-oxygen-f",      name: "Oxygen Spray",           price: 30, duration: 10 },
          { id: "add-ultrasonic-f",  name: "Ultrasonic Vibration",   price: 15, duration: 10 },
          { id: "add-lifting-f",     name: "Skin Lifting",           price: 10, duration: 10 },
          { id: "add-cold-f",        name: "Cold Hammer",            price: 10, duration: 10 },
          { id: "add-scrubber-f",    name: "Skin Scrubber",          price: 20, duration: 10 },
          { id: "add-hydra-f",       name: "Hydra Facial",           price: 80, duration: 30 },
          { id: "add-microderm-f",   name: "Microdermabrasion",      price: 40, duration: 20 },
          { id: "add-dermaplane-f",  name: "Dermaplaning",           price: 45, duration: 15 },
        ],
      },
      {
        title: "Body Treatments",
        services: [
          { id: "add-high-freq-b",  name: "High Frequency Wand",    price: 35, duration: 10 },
          { id: "add-oxygen-b",     name: "Oxygen Spray",           price: 60, duration: 10 },
          { id: "add-ultrasonic-b", name: "Ultrasonic Vibration",   price: 30, duration: 10 },
          { id: "add-lifting-b",    name: "Skin Lifting",           price: 45, duration: 10 },
          { id: "add-cold-b",       name: "Cold Hammer",            price: 30, duration: 10 },
          { id: "add-scrubber-b",   name: "Skin Scrubber",          price: 40, duration: 10 },
          { id: "add-microderm-b",  name: "Microdermabrasion",      price: 80, duration: 20 },
          { id: "add-hydra-b",      name: "Hydra Treatment",        price: 160, duration: 45 },
          { id: "add-vajacial-b",   name: "Vajacial",               price: 25, duration: 30 },
        ],
      },
      {
        title: "Massages",
        services: [
          { id: "add-head",       name: "Head Massage",                price: 25, duration: 10 },
          { id: "add-arms",       name: "Arms / Hands",                price: 15, duration: 10 },
          { id: "add-decollete",  name: "Décolleté Massage / Shoulders", price: 40, duration: 15 },
          { id: "add-back",       name: "Back Massage",                price: 60, duration: 15 },
          { id: "add-legs",       name: "Leg Massage",                 price: 50, duration: 15 },
          { id: "add-feet",       name: "Feet Massage",                price: 35, duration: 10 },
          { id: "add-10min",      name: "Add 10 Minutes",              price: 25, duration: 10 },
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

type SelectedService = Service & { category: string };

function getNextDays(n: number) {
  const days: Date[] = [];
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
  const [openCategory,   setOpenCategory]   = useState<string | null>(null);
  const [openSubGroup,   setOpenSubGroup]   = useState<string | null>(null);
  const [openSection,    setOpenSection]    = useState<string | null>(null);
  const [openSection2,   setOpenSection2]   = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<SelectedService | null>(null);
  const [step,           setStep]           = useState<1 | 2 | 3 | 4>(1);
  const [selectedDate,   setSelectedDate]   = useState("");
  const [selectedTime,   setSelectedTime]   = useState("");
  const [form,           setForm]           = useState({ name: "", email: "", phone: "", notes: "" });
  const [submitting,     setSubmitting]     = useState(false);
  const [confirmed,      setConfirmed]      = useState(false);
  const [icsContent,     setIcsContent]     = useState("");
  const [error,          setError]          = useState("");

  const pageTopRef   = useRef<HTMLDivElement>(null);
  const availableDays = getNextDays(30);

  // Scroll to top only when advancing to a new step (not on initial render)
  const prevStep = useRef<number>(1);
  useEffect(() => {
    if (step !== prevStep.current) {
      prevStep.current = step;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [step]);

  const selectService = (svc: Service, catLabel: string) => {
    setSelectedService({ ...svc, category: catLabel });
    setStep(2);
  };

  const handleSubmit = async () => {
    if (!selectedService || !selectedDate || !selectedTime || !form.name || !form.email) {
      setError("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/booking-checkout", {
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
      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
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

  // ── Shared service row ────────────────────────────────────────
  const ServiceRow = ({ svc, catLabel }: { svc: Service; catLabel: string }) => (
    <button
      onClick={() => selectService(svc, catLabel)}
      className="w-full flex items-start justify-between px-6 py-4
                 border-t border-[#F0EBE0] hover:bg-[#FDF9F5]
                 transition-colors duration-200 text-left group"
    >
      <div className="flex-1">
        <p className="text-sm font-sans text-[#1C1C1A] font-medium group-hover:text-[#C9A96E] transition-colors duration-300">
          {svc.name}
        </p>
        {svc.desc && (
          <p className="text-xs font-sans text-[#8C8680] mt-1 leading-relaxed max-w-[420px]">{svc.desc}</p>
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

  // ── Sub-accordion toggle button ──────────────────────────────
  const SubToggle = ({ id, label, depth = 1, useAlt = false }: { id: string; label: string; depth?: number; useAlt?: boolean }) => {
    const isOpen = depth === 1
      ? (useAlt ? openSection2 === id : openSubGroup === id)
      : openSection === id;
    const toggle = depth === 1
      ? (useAlt ? () => setOpenSection2(isOpen ? null : id) : () => setOpenSubGroup(isOpen ? null : id))
      : () => setOpenSection(isOpen ? null : id);
    return (
      <button onClick={toggle}
        className={`w-full flex items-center justify-between text-left transition-colors duration-200
          ${depth === 1
            ? "px-6 py-4 bg-[#F5EDD8] hover:bg-[#F0E6CC] border-t border-[#E5DCCF]"
            : "px-8 py-3 bg-[#FAF7F2] hover:bg-[#F5EDD8] border-t border-[#F0EBE0]"
          }`}
      >
        <span className={`font-sans uppercase tracking-[0.22em] text-[#5A5550] ${depth === 1 ? "text-[11px]" : "text-[10px] text-[#8C8680]"}`}>
          {label}
        </span>
        <span className={`text-[#C9A96E] transition-transform duration-200 ${isOpen ? "rotate-180" : ""} ${depth === 1 ? "text-base" : "text-sm"}`}>↓</span>
      </button>
    );
  };

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
    <div ref={pageTopRef} className="min-h-screen bg-[#FAF7F2]">
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
            const num = i + 1;
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
              const catOpen = openCategory === cat.id;
              return (
                <div key={cat.id} className="border border-[#E5DCCF] bg-white overflow-hidden">

                  {/* Top-level category header */}
                  <button
                    onClick={() => setOpenCategory(catOpen ? null : cat.id)}
                    className="w-full flex items-center justify-between px-6 py-5
                               hover:bg-[#FAF7F2] transition-colors duration-300 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-[#C9A96E] text-lg">{cat.icon}</span>
                      <span className="font-serif text-xl text-[#1C1C1A]">{cat.label}</span>
                    </div>
                    <span className={`text-[#C9A96E] text-lg transition-transform duration-300 ${catOpen ? "rotate-180" : ""}`}>↓</span>
                  </button>

                  {/* Accordion body */}
                  <div className={`overflow-hidden transition-all duration-300 ${catOpen ? "max-h-[4000px]" : "max-h-0"}`}>
                    <div className="border-t border-[#E5DCCF]">

                      {/* ── WAXING: subgroups (Women / Men) each with sections ── */}
                      {cat.mode === "subgroups" && cat.subgroups?.map((group) => {
                        const groupKey = `${cat.id}-${group.groupTitle}`;
                        const groupOpen = openSubGroup === groupKey;
                        return (
                          <div key={groupKey}>
                            <SubToggle id={groupKey} label={group.groupTitle} depth={1} />
                            <div className={`overflow-hidden transition-all duration-300 ${groupOpen ? "max-h-[2000px]" : "max-h-0"}`}>
                              {group.sections.map((section) => {
                                const secKey  = `${groupKey}-${section.title}`;
                                const secOpen = openSection === secKey;
                                return (
                                  <div key={secKey}>
                                    <SubToggle id={secKey} label={section.title} depth={2} />
                                    <div className={`overflow-hidden transition-all duration-200 ${secOpen ? "max-h-[1500px]" : "max-h-0"}`}>
                                      {section.services.map((svc) => (
                                        <ServiceRow key={svc.id} svc={svc} catLabel={`${group.groupTitle} — ${section.title}`} />
                                      ))}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}

                      {/* ── BACK & BODY / ADD-ONS: sections as sub-accordions ── */}
                      {cat.mode === "sections" && cat.sections?.map((section) => {
                        const secKey  = `${cat.id}-${section.title}`;
                        const secOpen = openSection2 === secKey;
                        return (
                          <div key={secKey}>
                            <SubToggle id={secKey} label={section.title} depth={1} useAlt={true} />
                            <div className={`overflow-hidden transition-all duration-200 ${secOpen ? "max-h-[1500px]" : "max-h-0"}`}>
                              {section.services.map((svc) => (
                                <ServiceRow key={svc.id} svc={svc} catLabel={cat.label} />
                              ))}
                            </div>
                          </div>
                        );
                      })}

                      {/* ── FACIALS: flat list, no sub-accordions ── */}
                      {cat.mode === "flat" && cat.sections?.map((section) =>
                        section.services.map((svc) => (
                          <ServiceRow key={svc.id} svc={svc} catLabel={cat.label} />
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
        <div className={step === 2 ? "max-w-2xl mx-auto" : "hidden"}>

          {/* Selected service card with description */}
          {selectedService && (
            <div className="bg-white border border-[#E5DCCF] p-6 mb-8">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#C9A96E] font-sans mb-1">Selected Service</p>
                  <p className="font-serif text-xl text-[#1C1C1A]">{selectedService.name}</p>
                  <p className="text-[#8C8680] text-xs font-sans mt-0.5">
                    {selectedService.duration > 0 ? `${selectedService.duration} min · ` : ""} ${selectedService.price}
                  </p>
                </div>
                <button onClick={() => { setSelectedService(null); setStep(1); }}
                  className="text-xs text-[#8C8680] hover:text-[#C9A96E] font-sans transition-colors flex-shrink-0 ml-4">
                  Change
                </button>
              </div>
              {selectedService.desc && (
                <p className="text-sm font-sans text-[#5A5550] leading-relaxed border-t border-[#F0EBE0] pt-3 mt-3">
                  {selectedService.desc}
                </p>
              )}
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
                      <p className="text-[9px] font-sans opacity-70">
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
              {submitting ? "Redirecting to payment..." : `Pay $${selectedService?.price ?? ''} & Confirm`}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
