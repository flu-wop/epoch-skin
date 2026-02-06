"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { services } from "@/data/services";

export default function BookPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    notes: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // For now, just show success message
    // Later, you can hook this up to an API or email service
    console.log("Booking submitted:", formData);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        date: "",
        time: "",
        notes: ""
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Available time slots
  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
    "6:00 PM", "6:30 PM"
  ];

  return (
    <main className="min-h-screen py-20 bg-sand/10">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">
              Book Your Appointment
            </h1>
            <p className="text-lg text-gray-700">
              Select your preferred service and time. We'll confirm your appointment within 24 hours.
            </p>
          </div>

          {submitted ? (
            <div className="bg-[#b87968]/10 border-2 border-[#b87968] rounded-lg p-8 text-center">
              <h2 className="text-2xl font-serif text-[#b87968] mb-4">Thank You!</h2>
              <p className="text-gray-700 text-lg">
                Your appointment request has been received. We'll contact you at <strong>{formData.email}</strong> within 24 hours to confirm your booking.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                  Full Name *
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

              {/* Email & Phone */}
              <div className="grid md:grid-cols-2 gap-6">
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
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#b87968] focus:border-transparent"
                    placeholder="(504) 555-0123"
                  />
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label htmlFor="service" className="block text-sm font-semibold text-gray-900 mb-2">
                  Select Service *
                </label>
                <select
                  id="service"
                  name="service"
                  required
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#b87968] focus:border-transparent"
                >
                  <option value="">Choose a service...</option>
                  
                  {/* Facial Services */}
                  <optgroup label="Facial Services">
                    {services.filter(s => s.category === "Facial").map(service => (
                      <option key={service.id} value={service.id}>
                        {service.name} - ${service.price} ({service.duration})
                      </option>
                    ))}
                  </optgroup>

                  {/* Waxing Services */}
                  <optgroup label="Waxing Services">
                    {services.filter(s => s.category === "Waxing").map(service => (
                      <option key={service.id} value={service.id}>
                        {service.name} - ${service.price} ({service.duration})
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* Date & Time */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="date" className="block text-sm font-semibold text-gray-900 mb-2">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#b87968] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="time" className="block text-sm font-semibold text-gray-900 mb-2">
                    Preferred Time *
                  </label>
                  <select
                    id="time"
                    name="time"
                    required
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#b87968] focus:border-transparent"
                  >
                    <option value="">Select a time...</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label htmlFor="notes" className="block text-sm font-semibold text-gray-900 mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#b87968] focus:border-transparent resize-none"
                  placeholder="Any special requests or questions?"
                />
              </div>

              {/* Submit Button - CLAY COLOR */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-[#b87968] text-white py-4 rounded-md text-lg font-semibold hover:opacity-90 transition-all shadow-md hover:shadow-lg"
                >
                  Request Appointment
                </button>
                <p className="text-sm text-gray-600 text-center mt-4">
                  We'll contact you within 24 hours to confirm your appointment
                </p>
              </div>
            </form>
          )}

          {/* Contact Info Below Form */}
          <div className="mt-12 text-center bg-white rounded-lg p-8 shadow-sm">
            <h3 className="text-xl font-serif text-gray-900 mb-4">
              Questions? Contact Us Directly
            </h3>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Email:</strong>{" "}
                <a href="mailto:kayla@epochskin.com" className="text-[#b87968] hover:underline">
                  kayla@epochskin.com
                </a>
              </p>
              <p>
                <strong>Phone:</strong>{" "}
                <a href="tel:5047774094" className="text-[#b87968] hover:underline">
                  (504) 777-4094
                </a>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
