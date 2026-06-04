"use client";
// app/book/page.tsx

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

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
              { id: "w-brazilian",     name: "Brazilian Wax",       price: 50,  duration: 45, desc: "Complete removal or a clean shape. Rosin-free Organic hybrid wax with shea butter, rosehip oil, and squalane. No irritation, no breakage — just smooth skin that lasts." },
              { id: "w-bikini-line",   name: "Bikini Line",         price: 30,  duration: 20, desc: "Clean edges, no irritation. Our rosin-free formula keeps the skin barrier intact while removing exactly what you want gone." },
              { id: "w-french",        name: "French Bikini",       price: 40,  duration: 30, desc: "More coverage than a bikini line, less than a Brazilian. Precise, clean, and done right every time." },
              { id: "w-full-leg",      name: "Full Leg",            price: 55,  duration: 50, desc: "Ankle to thigh. Rosin-free Organic wax grips cleanly and releases fast — smooth results without the redness." },
              { id: "w-half-leg",      name: "Half Leg",            price: 45,  duration: 35, desc: "Upper or lower leg, your choice. Same rosin-free formula, targeted to exactly where you need it." },
              { id: "w-full-arm",      name: "Full Arm",            price: 45,  duration: 40, desc: "Shoulder to wrist. Clean, smooth, long-lasting. Our wax nourishes skin during removal so there's no dryness or irritation after." },
              { id: "w-half-arm",      name: "Half Arm",            price: 30,  duration: 25, desc: "Forearm or upper arm. Quick, precise, and irritation-free." },
              { id: "w-underarm",      name: "Underarm",            price: 20,  duration: 20, desc: "Fast removal, zero rosin. One of the most sensitive areas on the body — our formula was made for it." },
              { id: "w-stomach-strip", name: "Stomach Strip",       price: 20,  duration: 15, desc: "Clean up the happy trail. Precise removal with our nourishing Organic wax formula." },
              { id: "w-full-stomach",  name: "Full Stomach",        price: 40,  duration: 25, desc: "Full stomach waxing for smooth, clean skin. Rosin-free formula, no post-wax irritation." },
              { id: "w-toes",          name: "Toes",                price: 10,  duration: 10, desc: "Clean up the details. Quick, precise, and completely irritation-free." },
              { id: "w-feet",          name: "Feet",                price: 20,  duration: 15, desc: "Top of the foot, clean and smooth. Same rosin-free Organic wax used on every service." },
              { id: "w-back",          name: "Back",                price: 45,  duration: 40, desc: "Full back waxing with our Organic hybrid formula. Smooth results, no redness — even on coarser hair." },
              { id: "w-full-buttock",  name: "Full Buttock",        price: 30,  duration: 20, desc: "Complete buttock waxing. Rosin-free formula handles sensitive skin without reaction." },
              { id: "w-cheeks",        name: "Between the Cheeks",  price: 15,  duration: 10, desc: "Precise and thorough. Our rosin-free wax removes cleanly without the irritation that strips or other formulas cause." },
              { id: "w-chest",         name: "Chest",               price: 15,  duration: 15, desc: "Clean chest waxing with our nourishing Organic hybrid formula. Fast set, clean pull, no breakage." },
              { id: "w-full-body",     name: "Full Body Wax",       price: 140, duration: 90, desc: "Brazilian, underarm, and half leg in one session. Rosin-free Organic hybrid formula — shea butter, rosehip oil, and squalane — so every area stays smooth and irritation-free." },
            ],
          },
          {
            title: "Facial Waxing",
            services: [
              { id: "w-eyebrow",    name: "Eyebrow",    price: 15, duration: 20, desc: "Precision shaping by a licensed esthetician. Clean lines, no over-removal — just well-defined brows." },
              { id: "w-upper-lip",  name: "Upper Lip",  price: 10, duration: 10, desc: "Gentle and fast. Our rosin-free formula is safe for facial skin and leaves zero redness." },
              { id: "w-chin",       name: "Chin",       price: 15, duration: 12, desc: "Clean, precise chin waxing with our hypoallergenic Organic formula." },
              { id: "w-cheekbones", name: "Cheekbones", price: 12, duration: 15, desc: "Defined and smooth. Removes fine facial hair cleanly without irritating delicate skin." },
              { id: "w-sideburns",  name: "Sideburns",  price: 12, duration: 10, desc: "Clean edges without the irritation. Rosin-free wax handles fine hair on sensitive skin with no reaction." },
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
              { id: "m-full-arms",     name: "Full Arms",           price: 60,  duration: 45, desc: "Shoulder to wrist. Clean, smooth, long-lasting. Our wax nourishes skin during removal so there's no dryness or irritation after." },
              { id: "m-half-arm",      name: "Half Arm",            price: 35,  duration: 25, desc: "Forearm or upper arm. Quick, precise, and irritation-free." },
              { id: "m-back",          name: "Back Wax",            price: 50,  duration: 45, desc: "Full back waxing with our Organic hybrid formula. Smooth results, no redness — even on coarser hair." },
              { id: "m-chest",         name: "Chest",               price: 40,  duration: 32, desc: "Clean chest waxing with our nourishing Organic hybrid formula. Fast set, clean pull, no breakage." },
              { id: "m-underarm",      name: "Underarms",           price: 30,  duration: 20, desc: "Fast removal, zero rosin. One of the most sensitive areas on the body — our formula was made for it." },
              { id: "m-brozilian",     name: "Brozilian",           price: 60,  duration: 50, desc: "Complete removal or shaped — your preference. Rosin-free Organic wax handles the most sensitive area with no irritation, no breakage." },
              { id: "m-full-legs",     name: "Full Legs",           price: 70,  duration: 55, desc: "Ankle to thigh. Rosin-free Organic wax grips cleanly and releases fast — smooth results without the redness." },
              { id: "m-half-legs",     name: "Half Legs",           price: 45,  duration: 35, desc: "Upper or lower leg, your choice. Same rosin-free formula, targeted to exactly where you need it." },
              { id: "m-full-butt",     name: "Full Butt",           price: 40,  duration: 20, desc: "Complete buttock waxing. Rosin-free formula handles sensitive skin without reaction." },
              { id: "m-cheeks",        name: "Between the Cheeks",  price: 20,  duration: 10, desc: "Precise and thorough. Our rosin-free wax removes cleanly without the irritation that strips or other formulas cause." },
              { id: "m-stomach-strip", name: "Stomach Strip",       price: 30,  duration: 15, desc: "Clean up the happy trail. Precise removal with our nourishing Organic wax formula." },
              { id: "m-full-stomach",  name: "Full Stomach",        price: 60,  duration: 25, desc: "Full stomach waxing for smooth, clean skin. Rosin-free formula, no post-wax irritation." },
              { id: "m-feet",          name: "Feet",                price: 20,  duration: 15, desc: "Top of the foot, clean and smooth. Same rosin-free Organic wax used on every service." },
              { id: "m-toes",          name: "Toes",                price: 10,  duration: 10, desc: "Clean up the details. Quick, precise, and completely irritation-free." },
              { id: "m-full-body",     name: "Full Body Wax",       price: 160, duration: 90, desc: "Brazilian, underarm, and half leg in one session. Rosin-free Organic hybrid formula — shea butter, rosehip oil, and squalane — so every area stays smooth and irritation-free." },
            ],
          },
          {
            title: "Facial Waxing",
            services: [
              { id: "m-eyebrows",   name: "Eyebrows",   price: 20, duration: 20, desc: "Clean grooming and shaping. Rosin-free formula, precise removal, no redness." },
              { id: "m-upper-lip",  name: "Upper Lip",  price: 15, duration: 10, desc: "Fast, clean, zero irritation. Our formula is gentle enough for facial skin on every skin type." },
              { id: "m-chin",       name: "Chin",       price: 20, duration: 12, desc: "Precise chin waxing for a clean, defined look." },
              { id: "m-cheekbones", name: "Cheekbones", price: 20, duration: 15, desc: "Removes fine facial hair cleanly without irritating sensitive skin." },
              { id: "m-sideburns",  name: "Sideburns",  price: 15, duration: 10, desc: "Clean edges, no reaction. Rosin-free wax on delicate facial skin." },
              { id: "m-beard",      name: "Beard",      price: 50, duration: 30, desc: "Defines the beard line or removes unwanted growth. Clean, precise, no synthetic resins." },
              { id: "m-nose",       name: "Nose Wax",   price: 10, duration: 10, desc: "Fast and effective nose hair removal. Done in minutes, no irritation." },
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
          { id: "add-high-freq-f",  name: "High Frequency Wand",  price: 15, duration: 10, desc: "Kills acne-causing bacteria, stimulates circulation, and tightens skin using a safe electrical current. Best for active breakouts, congestion, or post-extraction recovery." },
          { id: "add-oxygen-f",     name: "Oxygen Spray",         price: 30, duration: 10, desc: "A pressurized oxygen mist infused with hydrating actives. Instantly plumps, brightens, and calms — zero downtime, visible glow immediately after." },
          { id: "add-ultrasonic-f", name: "Ultrasonic Vibration", price: 15, duration: 10, desc: "High-frequency sound waves loosen debris, stimulate collagen production, and push active ingredients deeper into the skin. Painless and effective on every skin type." },
          { id: "add-lifting-f",    name: "Skin Lifting",         price: 10, duration: 10, desc: "Microcurrent technology that tones and firms facial muscles. Think of it as a workout for your face — lifted contours, tighter skin, no needles." },
          { id: "add-cold-f",       name: "Cold Hammer",          price: 10, duration: 10, desc: "A chilled metal tool that seals pores, reduces redness, and soothes inflammation post-treatment. Especially effective after extractions or any active service." },
          { id: "add-scrubber-f",   name: "Skin Scrubber",        price: 20, duration: 10, desc: "An ultrasonic spatula that dislodges blackheads, dead skin, and surface buildup — gently and without abrasion. Cleaner pores, smoother texture, no irritation." },
          { id: "add-hydra-f",      name: "Hydra Facial",         price: 80, duration: 30, desc: "Multi-step hydrodermabrasion that cleanses, exfoliates, extracts, and infuses skin with serums in one pass. The gold standard for instant, visible skin improvement." },
          { id: "add-microderm-f",  name: "Microdermabrasion",    price: 40, duration: 20, desc: "Physical exfoliation using fine crystals or a diamond tip to buff away dead skin cells. Smoother texture, reduced dullness, and better product absorption after." },
          { id: "add-dermaplane-f", name: "Dermaplaning",         price: 45, duration: 15, desc: "A surgical blade removes dead skin and vellus hair (peach fuzz) in one pass. Instantly smoother, brighter skin — and your serums absorb better immediately after." },
        ],
      },
      {
        title: "Body Treatments",
        services: [
          { id: "add-high-freq-b",  name: "High Frequency Wand",  price: 35,  duration: 10, desc: "Same bacteria-killing, circulation-boosting benefits as the facial version — applied to body areas dealing with breakouts, ingrowns, or post-wax irritation." },
          { id: "add-oxygen-b",     name: "Oxygen Spray",         price: 60,  duration: 10, desc: "Pressurized oxygen mist for the body. Soothes post-wax skin, reduces redness, and delivers a burst of hydration to larger treatment areas." },
          { id: "add-ultrasonic-b", name: "Ultrasonic Vibration", price: 30,  duration: 10, desc: "Penetrates deeper on body tissue — loosens buildup, stimulates circulation, and helps active ingredients absorb more effectively across larger areas." },
          { id: "add-lifting-b",    name: "Skin Lifting",         price: 45,  duration: 10, desc: "Microcurrent toning for the body. Firms and tightens skin on targeted areas — arms, abdomen, thighs — with zero downtime." },
          { id: "add-cold-b",       name: "Cold Hammer",          price: 30,  duration: 10, desc: "Post-treatment cooling that closes pores, reduces redness, and calms any irritation — especially effective after body waxing on sensitive areas." },
          { id: "add-scrubber-b",   name: "Skin Scrubber",        price: 40,  duration: 10, desc: "Ultrasonic exfoliation for the body. Clears buildup and unclogs pores on larger areas — smoother skin, reduced ingrown risk after waxing." },
          { id: "add-microderm-b",  name: "Microdermabrasion",    price: 80,  duration: 20, desc: "Professional exfoliation for the body. Buffs away rough, uneven texture and improves skin tone on areas like the back, arms, or stomach." },
          { id: "add-hydra-b",      name: "Hydra Treatment",      price: 160, duration: 45, desc: "Full-body hydrodermabrasion — deep cleanse, exfoliation, extraction, and serum infusion across a larger treatment area. Maximum results, zero downtime." },
          { id: "add-vajacial-b",   name: "Vajacial",             price: 25,  duration: 30, desc: "A post-Brazilian add-on that soothes, hydrates, and treats the bikini area after waxing. Reduces inflammation, minimizes ingrowns, and leaves skin smooth and calm." },
        ],
      },
      {
        title: "Massages",
        services: [
          { id: "add-head",      name: "Head Massage",                  price: 25, duration: 10, desc: "Scalp and temple massage that relieves tension, improves circulation, and genuinely melts stress. A small addition that makes a big difference." },
          { id: "add-arms",      name: "Arms / Hands",                  price: 15, duration: 10, desc: "Targeted massage for the arms and hands — releases muscle tension and improves circulation in areas that carry more stress than most people realize." },
          { id: "add-decollete", name: "Décolleté Massage / Shoulders", price: 40, duration: 15, desc: "Neck, chest, and shoulder massage targeting one of the body's highest-tension zones. Loosens tight muscles and leaves the area visibly relaxed." },
          { id: "add-back",      name: "Back Massage",                  price: 60, duration: 15, desc: "Focused tension relief for the back. Works through muscle tightness and leaves you noticeably looser by the time your main service wraps up." },
          { id: "add-legs",      name: "Leg Massage",                   price: 50, duration: 15, desc: "Releases tension in the legs and improves circulation — especially effective after waxing when the skin and muscles both benefit from the attention." },
          { id: "add-feet",      name: "Feet Massage",                  price: 35, duration: 10, desc: "Targeted pressure and release for the feet. More therapeutic than it sounds — the kind of thing you don't know you needed until it's done." },
          { id: "add-10min",     name: "Add 10 Minutes",                price: 25, duration: 10, desc: "Extend any massage service by 10 minutes. More time, more release." },
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

function getAllServices(): SelectedService[] {
  const all: SelectedService[] = [];
  for (const cat of SERVICE_CATALOG) {
    if (cat.mode === "subgroups" && cat.subgroups) {
      for (const group of cat.subgroups) {
        for (const section of group.sections) {
          for (const svc of section.services) {
            all.push({ ...svc, category: `${group.groupTitle} — ${section.title}` });
          }
        }
      }
    } else if (cat.sections) {
      for (const section of cat.sections) {
        for (const svc of section.services) {
          all.push({ ...svc, category: cat.label });
        }
      }
    }
  }
  return all;
}

export default function BookPage() {
  const [openCategory,  setOpenCategory]  = useState<string | null>(null);
  const [openSubGroup,  setOpenSubGroup]  = useState<string | null>(null);
  const [openSection,   setOpenSection]   = useState<string | null>(null);
  const [openSection2,  setOpenSection2]  = useState<string | null>(null);
  const [selectedIds,   setSelectedIds]   = useState<string[]>([]);
  const [expandedDesc,  setExpandedDesc]  = useState<string | null>(null);
  const [step,          setStep]          = useState<1 | 2 | 3 | 4>(1);
  const [selectedDate,  setSelectedDate]  = useState("");
  const [selectedTime,  setSelectedTime]  = useState("");
  const [form,          setForm]          = useState({ name: "", email: "", phone: "", notes: "" });
  const [submitting,    setSubmitting]    = useState(false);
  const [confirmed,     setConfirmed]     = useState(false);
  const [icsContent,    setIcsContent]    = useState("");
  const [error,         setError]         = useState("");

  const availableDays = getNextDays(30);
  const allServices   = getAllServices();

  const selectedServices: SelectedService[] = selectedIds
    .map(id => allServices.find(s => s.id === id))
    .filter((s): s is SelectedService => Boolean(s));

  const totalPrice    = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const totalDuration = selectedServices.reduce((sum, s) => sum + s.duration, 0);

  const toggleService = (svc: Service) => {
    setSelectedIds(prev =>
      prev.includes(svc.id) ? prev.filter(id => id !== svc.id) : [...prev, svc.id]
    );
  };

  const prevStep = useRef<number>(1);
  useEffect(() => {
    if (step !== prevStep.current) {
      prevStep.current = step;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [step]);

  const handleSubmit = async () => {
    if (!selectedIds.length || !selectedDate || !selectedTime || !form.name || !form.email) {
      setError("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const serviceNames = selectedServices.map(s => s.name).join(", ");
      const res = await fetch("/api/booking-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name, email: form.email, phone: form.phone, notes: form.notes,
          service: serviceNames,
          category: selectedServices.map(s => s.category).join(", "),
          price: totalPrice, date: selectedDate, time: selectedTime,
          duration: totalDuration,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Booking failed");
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

  const ServiceRow = ({ svc }: { svc: Service }) => {
    const checked = selectedIds.includes(svc.id);
    return (
      <button
        onClick={() => toggleService(svc)}
        className="w-full flex items-start justify-between px-6 py-4
                   border-t border-[#F0EBE0] hover:bg-[#FDF9F5]
                   transition-colors duration-200 text-left group"
      >
        <div className="flex items-start gap-3 flex-1">
          <div className={`mt-0.5 w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border transition-colors duration-200 ${
            checked ? "bg-[#C9A96E] border-[#C9A96E]" : "border-[#D5CEBD]"
          }`}>
            {checked && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M1 4L3.5 6.5L9 1" stroke="#1C1C1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
          <div className="flex-1">
            <p className={`text-sm font-sans font-medium transition-colors duration-200 ${checked ? "text-[#C9A96E]" : "text-[#1C1C1A] group-hover:text-[#C9A96E]"}`}>
              {svc.name}
            </p>
            {svc.duration > 0 && (
              <p className="text-[10px] text-[#C0BAB4] font-sans mt-1">{svc.duration} min</p>
            )}
          </div>
        </div>
        <span className="text-[#C9A96E] font-serif text-lg ml-6 mt-0.5 flex-shrink-0">${svc.price}</span>
      </button>
    );
  };

  const SubToggle = ({ id, label, depth = 1, useAlt = false }: { id: string; label: string; depth?: number; useAlt?: boolean }) => {
    const isOpen = depth === 1
      ? (useAlt ? openSection2 === id : openSubGroup === id)
      : openSection === id;
    const toggle = depth === 1
      ? (useAlt ? () => setOpenSection2(isOpen ? null : id) : () => setOpenSubGroup(isOpen ? null : id))
      : () => setOpenSection(isOpen ? null : id);
    return (
      <button onClick={toggle} onMouseDown={e => e.preventDefault()}
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

        <div className="text-center mb-14">
          <div className="w-10 h-px bg-[#C9A96E] mx-auto mb-5" />
          <p className="text-[11px] tracking-[0.28em] uppercase text-[#C9A96E] font-sans mb-3">Epoch Skin Studio</p>
          <h1 className="font-serif text-4xl md:text-5xl text-[#1C1C1A]">Book Your Appointment</h1>
          <p className="text-[#8C8680] font-sans text-sm mt-4 max-w-md mx-auto">
            Select one or more services, then choose your date and time.
          </p>
        </div>

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

        {/* ── STEP 1 ── */}
        <div className={step === 1 ? "pb-32" : "hidden"}>
          <div className="max-w-2xl mx-auto space-y-3">
            {SERVICE_CATALOG.map((cat) => {
              const catOpen = openCategory === cat.id;
              return (
                <div key={cat.id} className="border border-[#E5DCCF] bg-white overflow-hidden">
                  <button
                    onClick={() => setOpenCategory(catOpen ? null : cat.id)}
                    className="w-full flex items-center justify-between px-6 py-5 hover:bg-[#FAF7F2] transition-colors duration-300 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-[#C9A96E] text-lg">{cat.icon}</span>
                      <span className="font-serif text-xl text-[#1C1C1A]">{cat.label}</span>
                    </div>
                    <span className={`text-[#C9A96E] text-lg transition-transform duration-300 ${catOpen ? "rotate-180" : ""}`}>↓</span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${catOpen ? "max-h-[4000px]" : "max-h-0"}`}>
                    <div className="border-t border-[#E5DCCF]">
                      {cat.mode === "subgroups" && cat.subgroups?.map((group) => {
                        const groupKey  = `${cat.id}-${group.groupTitle}`;
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
                                      {section.services.map((svc) => <ServiceRow key={svc.id} svc={svc} />)}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                      {cat.mode === "sections" && cat.sections?.map((section) => {
                        const secKey  = `${cat.id}-${section.title}`;
                        const secOpen = openSection2 === secKey;
                        return (
                          <div key={secKey}>
                            <SubToggle id={secKey} label={section.title} depth={1} useAlt={true} />
                            <div className={`overflow-hidden transition-all duration-200 ${secOpen ? "max-h-[1500px]" : "max-h-0"}`}>
                              {section.services.map((svc) => <ServiceRow key={svc.id} svc={svc} />)}
                            </div>
                          </div>
                        );
                      })}
                      {cat.mode === "flat" && cat.sections?.map((section) =>
                        section.services.map((svc) => <ServiceRow key={svc.id} svc={svc} />)
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {selectedIds.length > 0 && (
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#1C1C1A] border-t border-[#2E2E2C]">
              <div className="max-w-2xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#C9A96E] font-sans">
                    {selectedIds.length} service{selectedIds.length > 1 ? "s" : ""} · {totalDuration} min
                  </p>
                  <p className="font-serif text-xl text-[#FAF7F2] mt-0.5">${totalPrice}</p>
                </div>
                <button onClick={() => setStep(2)}
                  className="flex-shrink-0 px-8 py-3 bg-[#C9A96E] text-[#1C1C1A] text-[11px]
                             tracking-[0.22em] uppercase font-sans font-medium hover:bg-[#D4AF88] transition-colors duration-300">
                  Continue →
                </button>
              </div>
            </div>
          )}
          {selectedIds.length === 0 && (
            <p className="text-center text-[#8C8680] font-sans text-sm mt-8">Select at least one service to continue</p>
          )}
        </div>

        {/* ── STEP 2 ── */}
        <div className={step === 2 ? "max-w-2xl mx-auto" : "hidden"}>
          {selectedServices.length > 0 && (
            <div className="bg-white border border-[#E5DCCF] mb-8 divide-y divide-[#F0EBE0]">
              <div className="flex items-center justify-between px-6 py-4">
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#C9A96E] font-sans">
                  {selectedServices.length} service{selectedServices.length > 1 ? "s" : ""} · {totalDuration} min · ${totalPrice}
                </p>
                <button onClick={() => setStep(1)}
                  className="text-xs text-[#8C8680] hover:text-[#C9A96E] font-sans transition-colors">
                  Change
                </button>
              </div>
              {selectedServices.map(s => (
                <div key={s.id}>
                  <button
                    onClick={() => setExpandedDesc(expandedDesc === s.id ? null : s.id)}
                    className="w-full flex items-center justify-between px-6 py-3 hover:bg-[#FDF9F5] transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-serif text-base text-[#1C1C1A]">{s.name}</span>
                      {s.desc && (
                        <span className="text-[10px] text-[#C9A96E] font-sans tracking-wide">
                          {expandedDesc === s.id ? "▲" : "▼"}
                        </span>
                      )}
                    </div>
                    <span className="text-[#C9A96E] font-serif">${s.price}</span>
                  </button>
                  {s.desc && expandedDesc === s.id && (
                    <div className="px-6 pb-4">
                      <p className="text-xs font-sans text-[#8C8680] leading-relaxed">{s.desc}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <h2 className="font-serif text-2xl text-[#1C1C1A] mb-8">Choose Date & Time</h2>

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
                        isWeekend ? "border-[#F0EBE0] text-[#D0C8BE] cursor-not-allowed"
                        : isSelected ? "border-[#C9A96E] bg-[#C9A96E] text-[#1C1C1A]"
                        : "border-[#E5DCCF] text-[#1C1C1A] hover:border-[#C9A96E]"
                      }`}
                    >
                      <p className="text-[9px] uppercase tracking-wide font-sans">{day.toLocaleDateString("en-US", { weekday: "short" })}</p>
                      <p className="font-serif text-lg leading-none mt-0.5">{day.getDate()}</p>
                      <p className="text-[9px] font-sans opacity-70">{day.toLocaleDateString("en-US", { month: "short" })}</p>
                    </button>
                  );
                })}
              </div>
            </div>
            {selectedDate && (
              <p className="text-xs text-[#8C8680] font-sans mt-2">
                {new Date(selectedDate + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
              </p>
            )}
          </div>

          {selectedDate && (
            <div className="mb-8">
              <p className="text-[11px] tracking-[0.22em] uppercase text-[#C9A96E] font-sans mb-4">Select Time</p>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {TIME_SLOTS.map((slot) => (
                  <button key={slot} onClick={() => setSelectedTime(slot)}
                    className={`py-3 text-center text-xs font-sans tracking-wide border transition-all duration-300 ${
                      selectedTime === slot ? "bg-[#1C1C1A] text-[#C9A96E] border-[#1C1C1A]" : "border-[#E5DCCF] text-[#5A5550] hover:border-[#C9A96E]"
                    }`}>
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between">
            <button onClick={() => setStep(1)} className="text-sm font-sans text-[#8C8680] hover:text-[#1C1C1A] transition-colors">← Back</button>
            <button onClick={() => setStep(3)} disabled={!selectedDate || !selectedTime}
              className="px-8 py-3.5 bg-[#1C1C1A] text-[#C9A96E] text-[11px] tracking-[0.22em]
                         uppercase font-sans hover:bg-[#C9A96E] hover:text-[#1C1C1A]
                         transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed">
              Continue →
            </button>
          </div>
        </div>

        {/* ── STEP 3 ── */}
        <div className={step === 3 ? "max-w-2xl mx-auto" : "hidden"}>
          <h2 className="font-serif text-2xl text-[#1C1C1A] mb-8">Your Information</h2>

          {selectedServices.length > 0 && selectedDate && selectedTime && (
            <div className="bg-white border border-[#E5DCCF] p-5 mb-8">
              <div className="flex justify-between items-start">
                <div>
                  <div className="space-y-0.5 mb-1">
                    {selectedServices.map(s => (
                      <p key={s.id} className="font-serif text-[#1C1C1A] text-base">{s.name}</p>
                    ))}
                  </div>
                  <p className="text-[#8C8680] text-xs font-sans mt-1">
                    {new Date(selectedDate + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} at {selectedTime}
                  </p>
                </div>
                <p className="font-serif text-xl text-[#C9A96E]">${totalPrice}</p>
              </div>
            </div>
          )}

          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-[10px] tracking-[0.22em] uppercase text-[#8C8680] font-sans block mb-2">Name *</label>
                <input type="text" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  placeholder="Your full name"
                  className="w-full px-4 py-3.5 border border-[#E5DCCF] bg-white text-[#1C1C1A] text-sm font-sans placeholder-[#C0BAB4] focus:outline-none focus:border-[#C9A96E] transition-colors" />
              </div>
              <div>
                <label className="text-[10px] tracking-[0.22em] uppercase text-[#8C8680] font-sans block mb-2">Email *</label>
                <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3.5 border border-[#E5DCCF] bg-white text-[#1C1C1A] text-sm font-sans placeholder-[#C0BAB4] focus:outline-none focus:border-[#C9A96E] transition-colors" />
              </div>
            </div>
            <div>
              <label className="text-[10px] tracking-[0.22em] uppercase text-[#8C8680] font-sans block mb-2">Phone</label>
              <input type="tel" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                placeholder="(504) 555-0000"
                className="w-full px-4 py-3.5 border border-[#E5DCCF] bg-white text-[#1C1C1A] text-sm font-sans placeholder-[#C0BAB4] focus:outline-none focus:border-[#C9A96E] transition-colors" />
            </div>
            <div>
              <label className="text-[10px] tracking-[0.22em] uppercase text-[#8C8680] font-sans block mb-2">Notes (optional)</label>
              <textarea value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
                rows={3} placeholder="Skin concerns, allergies, or anything we should know..."
                className="w-full px-4 py-3.5 border border-[#E5DCCF] bg-white text-[#1C1C1A] text-sm font-sans placeholder-[#C0BAB4] focus:outline-none focus:border-[#C9A96E] transition-colors resize-none" />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm font-sans mt-4">{error}</p>}

          <div className="flex justify-between mt-8">
            <button onClick={() => setStep(2)} className="text-sm font-sans text-[#8C8680] hover:text-[#1C1C1A] transition-colors">← Back</button>
            <button onClick={handleSubmit} disabled={submitting || !form.name || !form.email}
              className="px-8 py-3.5 bg-[#C9A96E] text-[#1C1C1A] text-[11px] tracking-[0.22em]
                         uppercase font-sans font-medium hover:bg-[#D4AF88]
                         transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
              {submitting ? "Redirecting to payment..." : `Pay $${totalPrice} & Confirm`}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
