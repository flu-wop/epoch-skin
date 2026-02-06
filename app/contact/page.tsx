"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    setSubmitted(true);
    
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <main className="min-h-screen py-20 bg-sand/10">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-gray-700">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-serif text-gray-900 mb-6">Send Us a Message</h2>
              
              {submitted ? (
                <div className="bg-[#b87968]/10 border-2 border-[#b87968] rounded-lg p-6">
                  <h3 className="text-xl font-serif text-[#b87968] mb-2">Thank You!</h3>
                  <p className="text-gray-700">We've received your message and will get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#b87968] focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#b87968] focus:border-transparent"
                        placeholder="kayla@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#b87968] focus:border-transparent"
                        placeholder="(504) 555-0123"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-semibold text-gray-900 mb-2">
                      Service Interest
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#b87968] focus:border-transparent"
                    >
                      <option value="">Select a service...</option>
                      <option value="facial">Organic Facial</option>
                      <option value="glass-skin">Glass Skin Treatment</option>
                      <option value="waxing">Waxing Services</option>
                      <option value="products">Organic Products</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#b87968] focus:border-transparent resize-none"
                      placeholder="Tell us how we can help..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#b87968] text-white py-4 rounded-md text-lg font-semibold hover:opacity-90 transition-all shadow-md hover:shadow-lg"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white rounded-lg p-8 shadow-sm">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-12 h-12 bg-[#b87968]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#b87968]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-serif text-gray-900 mb-2">Call Us</h3>
                    <a href="tel:5047774094" className="text-[#b87968] hover:underline text-lg">
                      (504) 777-4094
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-12 h-12 bg-[#b87968]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#b87968]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-serif text-gray-900 mb-2">Email Us</h3>
                    <a href="mailto:kayla@epochskin.com" className="text-[#b87968] hover:underline text-lg">
                      kayla@epochskin.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#b87968]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#b87968]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-serif text-gray-900 mb-2">Business Hours</h3>
                    <div className="text-gray-700 space-y-1">
                      <p>Monday - Friday: 9:00 AM - 7:00 PM</p>
                      <p>Saturday: 10:00 AM - 6:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
