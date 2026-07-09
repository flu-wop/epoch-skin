"use client";

import { useEffect, useRef, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQS = [
  {
    q: "Are your products certified Organic?",
    a: "Yes — every formula is built on certified Organic extracts. We list all ingredients in INCI format on every product page and clearly mark which are certified Organic. No synthetic fragrances, no artificial colorants, no parabens. Batch-tested for pH and stability.",
  },
  {
    q: "How do I book an appointment?",
    a: "Visit our booking page, choose your services, select a date and time on our live calendar, and receive instant confirmation by email. For same-day bookings, call or text (504) 777-4094.",
  },
  {
    q: "What is your shipping policy?",
    a: "Free standard shipping (5–7 business days) on all U.S. orders. Express shipping is $9.95 for 2–3 business days. Orders ship within 1–2 business days. You'll receive a tracking email when your package ships.",
  },
  {
    q: "What is the Glass Skin Treatment?",
    a: "Our signature 75-minute K-Beauty layering session: Organic cleanse, toner, enzyme exfoliation, hydrating mask, barrier serum, and glow cream. Delivers visibly plumper, dewy, luminous skin in one visit — ideal before a special occasion.",
  },
  {
    q: "Are your waxing services safe for sensitive skin?",
    a: "We use our own Organic Hybrid Wax Beads — rosin-free, synthetic-resin-free, formulated with shea butter, rosehip oil, and squalane. All services performed by Louisiana State Board licensed estheticians trained in sensitive-skin protocols.",
  },
  {
    q: "Do you offer returns or exchanges?",
    a: "We accept returns on unopened, unused products within 30 days. For hygiene reasons, opened products cannot be returned — but if you experience a skin reaction, contact us immediately and we'll work with you personally.",
  },
];

export default function FAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-[#F8F5F0]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: heading */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <div className="w-8 h-px bg-[#C9A84C] mb-5" />
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#C9A84C] font-sans mb-4">
              Common Questions
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A18] leading-tight mb-8">
              Everything You
              <br />
              <em className="not-italic text-[#C9A84C]">Need to Know</em>
            </h2>
            <p className="text-[#8A8580] font-sans leading-relaxed mb-10 max-w-sm">
              Can't find your answer here? We respond to every message within 24 hours.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase
                         text-[#C9A84C] border border-[#C9A84C]/40 px-6 py-3 font-sans
                         hover:bg-[#C9A84C] hover:text-[#1A1A18] hover:border-[#C9A84C]
                         transition-all duration-300"
            >
              Get in Touch
            </a>
          </div>

          {/* Right: accordion */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
            }}
          >
            <Accordion type="single" collapsible className="space-y-0">
              {FAQS.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border-b border-[#E8E0D5] last:border-0"
                >
                  <AccordionTrigger
                    className="text-left py-6 text-[#1A1A18] font-sans text-sm font-medium
                               tracking-wide hover:text-[#C9A84C] hover:no-underline
                               transition-colors [&[data-state=open]]:text-[#C9A84C]"
                  >
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#8A8580] font-sans text-sm leading-relaxed pb-6">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
