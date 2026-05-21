'use client';
// components/HomeFAQ.tsx
// FAQ with shadcn Accordion — answers pre-populated and expanding properly

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQS = [
  {
    q: 'Are your products certified organic?',
    a: 'Yes. Every formula is built on certified organic extracts and botanicals — we list all ingredients in INCI format so you know exactly what you\'re using. No synthetic fragrances, no artificial colorants, no parabens. We source from certified suppliers and batch-test each product to verify purity and pH.',
  },
  {
    q: 'How do I book an appointment?',
    a: 'Click any "Book Now" button on the site, or visit the /book page. Choose your services, select a date and time via our live calendar, enter your details, and receive an instant confirmation email. For same-day bookings, call us directly at (504) 777-4094.',
  },
  {
    q: 'What is your shipping policy?',
    a: 'We offer free standard shipping (5–7 business days) on all U.S. orders, with express shipping available at checkout for $9.95 (2–3 business days). Orders ship within 1–2 business days. You\'ll receive a tracking email as soon as your package ships.',
  },
  {
    q: 'Do you offer returns or exchanges?',
    a: 'We accept returns on unopened, unused products within 30 days of purchase. Because our formulas are fresh and handcrafted in small batches, we cannot accept returns on opened products for hygiene reasons. If you have a skin reaction, contact us immediately — we\'ll work with you.',
  },
  {
    q: 'What is the Glass Skin Treatment?',
    a: 'Our signature 75-minute K-Beauty inspired session. We use our organic layering protocol — cleanse, tone, enzyme exfoliation, hydrating mask, barrier serum, and glow cream — to deliver visibly plumper, dewy, luminous skin in one treatment. Ideal for special occasions or as a monthly reset.',
  },
  {
    q: 'Are your waxing services safe for sensitive skin?',
    a: 'Absolutely. We use our own Organic Hybrid Wax Beads — rosin-free, synthetic-resin-free, and formulated with shea butter, rosehip oil, and squalane to nourish while removing. All services are performed by Louisiana State Board licensed estheticians trained in sensitive-skin protocols.',
  },
];

export default function HomeFAQ() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs tracking-widest uppercase text-[#D4AF77] mb-3">Common Questions</p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#111]">Frequently Asked</h2>
        </div>

        <Accordion type="single" collapsible className="space-y-2">
          {FAQS.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border border-[#E8E0D0] px-6 data-[state=open]:border-[#D4AF77]/50"
            >
              <AccordionTrigger className="text-left text-sm font-medium text-[#111] py-5 hover:no-underline hover:text-[#D4AF77] transition-colors [&[data-state=open]]:text-[#D4AF77]">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-[#666] text-sm leading-relaxed pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-10">
          <p className="text-[#888] text-sm">
            Still have questions?{' '}
            <a href="/contact" className="text-[#D4AF77] hover:underline">
              Get in touch
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
