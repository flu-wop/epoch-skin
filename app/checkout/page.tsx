"use client";

import { useState } from "react";
import { usePathname } from "next/navigation"; // safe client-side hook
import { Container } from "@/components/layout/Container";

export default function CheckoutPage() {
  const pathname = usePathname(); // safe – works on client, returns "" on server

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    saveInfo: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // For now: simulate success (later: connect to Stripe / API)
    console.log("Checkout submitted:", formData);
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
        apartment: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        saveInfo: false,
      });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as any;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <main className="min-h-screen py-20 bg-sand/10">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">
              Checkout
            </h1>
            <p className="text-lg text-gray-700">
              Complete your order securely. We'll process your payment and confirm
              shortly.
            </p>
          </div>

          {submitted ? (
            <div className="bg-[#b87968]/10 border-2 border-[#b87968] rounded-lg p-8 text-center">
              <h2 className="text-2xl font-serif text-[#b87968] mb-4">
                Thank You!
              </h2>
              <p className="text-gray-700 text-lg">
                Your order has been received. We'll send a confirmation to{" "}
                <strong>{formData.email}</strong> shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 space-y-6">
              {/* Contact Info */}
              <div className="space-y-6">
                <h3 className="text-xl font-serif text-gray-900 mb-4">
                  Contact Information
                </h3>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
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

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-semibold text-gray-900 mb-2"
                    >
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#b87968] focus:border-transparent"
                      placeholder="First name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-semibold text-gray-900 mb-2"
                    >
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#b87968] focus:border-transparent"
                      placeholder="Last name"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
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

              {/* Shipping Address */}
              <div className="space-y-6">
                <h3 className="text-xl font-serif text-gray-900 mb-4">
                  Shipping Address
                </h3>

                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    Address *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#b87968] focus:border-transparent"
                    placeholder="Street address"
                  />
                </div>

                <div>
                  <label
                    htmlFor="apartment"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    Apartment, suite, etc. (optional)
                  </label>
                  <input
                    type="text"
                    id="apartment"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#b87968] focus:border-transparent"
                    placeholder="Apartment, suite, unit, etc."
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-semibold text-gray-900 mb-2"
                    >
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#b87968] focus:border-transparent"
                      placeholder="City"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="state"
                      className="block text-sm font-semibold text-gray-900 mb-2"
                    >
                      State *
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#b87968] focus:border-transparent"
                      placeholder="State"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="zipCode"
                      className="block text-sm font-semibold text-gray-900 mb-2"
                    >
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      required
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#b87968] focus:border-transparent"
                      placeholder="ZIP code"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    Country *
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#b87968] focus:border-transparent"
                    placeholder="Country"
                  />
                </div>
              </div>

              {/* Save Info */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="saveInfo"
                  name="saveInfo"
                  checked={formData.saveInfo}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#b87968] focus:ring-[#b87968] border-gray-300 rounded"
                />
                <label
                  htmlFor="saveInfo"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Save this information for next time
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full bg-[#b87968] text-white py-4 rounded-md text-lg font-semibold hover:opacity-90 transition-all shadow-md hover:shadow-lg"
                >
                  Complete Order
                </button>
                <p className="text-sm text-gray-600 text-center mt-4">
                  Secure checkout powered by Stripe
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
                <a
                  href="mailto:kayla@epochskin.com"
                  className="text-[#b87968] hover:underline"
                >
                  kayla@epochskin.com
                </a>
              </p>
              <p>
                <strong>Phone:</strong>{" "}
                <a
                  href="tel:5047774094"
                  className="text-[#b87968] hover:underline"
                >
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