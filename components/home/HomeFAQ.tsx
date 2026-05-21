"use client";
// components/home/HomeFAQ.tsx

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQS = [
  { q: "Are your products certified organic?", a: "Yes — every formula uses certified organic extracts, INCI-listed on every product page. No synthetic fragrances, no artificial colorants, no parabens. Batch-tested for pH and stability." },
  { q: "How do I book an appointment?", a: "Visit our booking page, choose your services, select a time on our live calendar, and receive instant confirmation. For same-day bookings, call (504) 777-4094." },
  { q: "What is your shipping policy?", a: "Free standard shipping on all U.S. orders (5–7 business days). Express available at checkout ($9.95, 2–3 business days). Orders ship within 1–2 business days." },
  { q: "What is the Glass Skin Treatment?", a: "Our signature 75-minute K-Beauty layering session: organic cleanse, enzyme exfoliation, hydrating mask, barrier serum, and glow cream. Visibly plumper, dewy, luminous skin in one visit." },
  { q: "Are your waxing services safe for sensitive skin?", a: "Yes — our Organic Hybrid Wax Beads are rosin-free and formulated with shea butter, rosehip oil, and squalane. All services by Louisiana State Board licensed estheticians." },
  { q: "Do you offer returns?", a: "We accept returns on unopened products within 30 days. If you experience a skin reaction, contact us immediately — we'll work with you personally." },
];

export function HomeFAQ() {
  return (
    <section className="py-20 md:py-28 px-5 sm:px-8 bg-[#F5F0EB]">
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-12">
          <p className="eyebrow mb-3">Common Questions</p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A18]">
            Frequently Asked
          </h2>
        </div>
        <Accordion type="single" collapsible className="space-y-0">
          {FAQS.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border-b border-[#E0D8CE] last:border-b"
            >
              <AccordionTrigger
                className="text-left py-5 text-[#1A1A18] font-sans text-sm font-medium
                           tracking-wide hover:text-[#C9A96E] hover:no-underline
                           transition-colors [&[data-state=open]]:text-[#C9A96E]"
              >
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-[#6E6860] font-sans text-sm leading-relaxed pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="text-center mt-10">
          <p className="text-[#9A9088] text-sm font-sans">
            Still have questions?{" "}
            <a href="/contact" className="text-[#C9A96E] hover:underline">Get in touch</a>
          </p>
        </div>
      </div>
    </section>
  );
}
