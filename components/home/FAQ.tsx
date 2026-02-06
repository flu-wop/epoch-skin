"use client";

import { useState } from "react";

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left hover:text-[#b87968] transition-colors"
      >
        <span className="text-lg md:text-xl font-medium text-gray-900">
          {question}
        </span>
        <span className="ml-4 flex-shrink-0 text-2xl text-[#b87968] font-bold">
          {isOpen ? "−" : "+"}
        </span>
      </button>
      {isOpen && (
        <div className="pb-6 pr-8">
          <p className="text-gray-700 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const faqs = [
    {
      question: "Are your products certified organic?",
      answer:
        "Yes, all our products use certified organic ingredients sourced from trusted suppliers. We prioritize quality and sustainability in every formulation.",
    },
    {
      question: "What is your shipping policy?",
      answer:
        "We offer free shipping on orders over $75. Standard shipping takes 3-5 business days. Express shipping is available at checkout.",
    },
    {
      question: "How do I book an appointment?",
      answer:
        'Click any "Book Now" button throughout the site, or visit our Services section. You\'ll be directed to our booking system where you can select your preferred service, date, and licensed esthetician.',
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-gray-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
