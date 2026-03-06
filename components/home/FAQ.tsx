"use client";

import { Container } from "@/components/layout/Container";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "Are your products certified Organic?",
    answer: "Yes! All our Skincare products use certified Organic Ingredients. We're committed to clean, natural formulations that are good for your skin and the planet."
  },
  {
    question: "What is your shipping policy?",
    answer: "We offer free shipping on all orders over $50. Orders typically ship within 1-2 business days and arrive within 3-5 business days."
  },
  {
    question: "How do I book an appointment?",
    answer: "You can book an appointment online through our booking page or call us at (504) 777-4094. We recommend booking at least 24 hours in advance."
  }
];

export default function FAQ() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <Container>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-gray-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-sage-200 rounded-lg px-6 py-2 bg-white"
              >
                <AccordionTrigger className="hover:no-underline text-left py-4">
                  <span className="text-lg font-medium text-gray-900 pr-4">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pb-4 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </section>
  );
}
