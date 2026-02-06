"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { 
  CONTACT_EMAIL, 
  CONTACT_PHONE, 
  STUDIO_ADDRESS,
  BUSINESS_HOURS 
} from "@/lib/constants";
import { MapPin, Phone, Mail, Clock, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceInterest: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call - Replace with actual form submission
    // TODO: Connect to Formspree or SendGrid
    // See integration instructions in README.md
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        serviceInterest: "",
        message: "",
      });
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {/* Hero section */}
      <section className="bg-gradient-to-br from-sage-50 via-sand-50 to-sage-50 py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-serif text-5xl font-bold text-sage-900 sm:text-6xl">
              Get in Touch
            </h1>
            <p className="mt-6 text-lg text-neutral-600 leading-relaxed">
              Have questions about our services or products? We'd love to hear from you. 
              Reach out and we'll respond as soon as possible.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact section */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact form */}
            <div>
              {!isSubmitted ? (
                <>
                  <h2 className="font-serif text-3xl font-bold text-sage-900">
                    Send Us a Message
                  </h2>
                  <p className="mt-3 text-neutral-600">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-sage-900">
                        Name <span className="text-clay-500">*</span>
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-2"
                        placeholder="Your full name"
                      />
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-sage-900">
                          Email <span className="text-clay-500">*</span>
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="mt-2"
                          placeholder="you@example.com"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-sage-900">
                          Phone
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className="mt-2"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="serviceInterest" className="block text-sm font-medium text-sage-900">
                        Service Interest
                      </label>
                      <select
                        id="serviceInterest"
                        name="serviceInterest"
                        value={formData.serviceInterest}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="">Select a service...</option>
                        <option value="brazilian-wax">Brazilian Wax</option>
                        <option value="leg-wax">Leg Wax</option>
                        <option value="facial-wax">Facial Wax</option>
                        <option value="products">Products</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-sage-900">
                        Message <span className="text-clay-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        placeholder="Tell us how we can help..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-clay-500 hover:bg-clay-600 sm:w-auto"
                      size="lg"
                    >
                      {isLoading ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </>
              ) : (
                // Success message
                <div className="rounded-xl border border-sage-100 bg-sage-50/50 p-8">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                    <CheckCircle2 className="h-8 w-8 text-success" />
                  </div>
                  <h3 className="mt-6 font-serif text-2xl font-bold text-sage-900">
                    Message Sent!
                  </h3>
                  <p className="mt-3 text-neutral-600">
                    Thank you for reaching out. We've received your message and will 
                    get back to you within 24 hours.
                  </p>
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    className="mt-6"
                  >
                    Send Another Message
                  </Button>
                </div>
              )}
            </div>

            {/* Contact information */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-clay-100">
                      <MapPin className="h-6 w-6 text-clay-600" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-sage-900">
                        Visit Us
                      </h3>
                      <p className="mt-2 text-neutral-600">
                        {STUDIO_ADDRESS.street}<br />
                        {STUDIO_ADDRESS.city}, {STUDIO_ADDRESS.state} {STUDIO_ADDRESS.zip}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-clay-100">
                      <Phone className="h-6 w-6 text-clay-600" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-sage-900">
                        Call Us
                      </h3>
                      <a 
                        href={`tel:${CONTACT_PHONE}`}
                        className="mt-2 block text-neutral-600 transition-colors hover:text-clay-600"
                      >
                        {CONTACT_PHONE}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-clay-100">
                      <Mail className="h-6 w-6 text-clay-600" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-sage-900">
                        Email Us
                      </h3>
                      <a 
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="mt-2 block text-neutral-600 transition-colors hover:text-clay-600"
                      >
                        {CONTACT_EMAIL}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-clay-100">
                      <Clock className="h-6 w-6 text-clay-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif text-lg font-semibold text-sage-900">
                        Business Hours
                      </h3>
                      <div className="mt-3 space-y-1 text-sm text-neutral-600">
                        <div className="flex justify-between">
                          <span>Monday - Friday</span>
                          <span className="font-medium">{BUSINESS_HOURS.monday}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Saturday</span>
                          <span className="font-medium">{BUSINESS_HOURS.saturday}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sunday</span>
                          <span className="font-medium">{BUSINESS_HOURS.sunday}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Map placeholder section */}
      <section className="border-t bg-sage-50/30 py-16">
        <Container>
          <div className="overflow-hidden rounded-xl">
            {/* Google Maps embed placeholder */}
            <div className="flex h-96 items-center justify-center bg-gradient-to-br from-sage-100 to-sand-100">
              <div className="text-center">
                <MapPin className="mx-auto h-12 w-12 text-sage-400" />
                <p className="mt-4 text-sm text-neutral-600">
                  Google Maps integration coming soon
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
