"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle2 } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call - Replace with actual newsletter integration
    // TODO: Connect to Mailchimp/ConvertKit/SendGrid API
    // See integration instructions in README.md
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
      setEmail("");
    }, 1000);
  };

  return (
    <section className="bg-gradient-to-br from-sage-100 via-sand-50 to-sage-50 py-16 lg:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          {!isSubmitted ? (
            <>
              {/* Icon */}
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-clay-100">
                <Mail className="h-8 w-8 text-clay-600" />
              </div>

              {/* Heading */}
              <h2 className="mt-6 font-serif text-3xl font-bold text-sage-900 sm:text-4xl">
                Join Our Newsletter
              </h2>
              <p className="mt-4 text-lg text-neutral-600">
                Subscribe for exclusive Skincare tips, special offers, and early 
                access to new products. Plus, get 15% off your first order!
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="mt-8">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 border-sage-200 bg-white focus-visible:ring-sage-500"
                  />
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-clay-500 px-8 hover:bg-clay-600"
                  >
                    {isLoading ? "Subscribing..." : "Subscribe"}
                  </Button>
                </div>
                <p className="mt-3 text-xs text-neutral-500">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            </>
          ) : (
            // Success message
            <div className="py-8">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                <CheckCircle2 className="h-8 w-8 text-success" />
              </div>
              <h3 className="mt-6 font-serif text-2xl font-bold text-sage-900">
                Thank You for Subscribing!
              </h3>
              <p className="mt-3 text-neutral-600">
                Check your inbox for your exclusive 15% discount code.
              </p>
              <Button
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                className="mt-6"
              >
                Subscribe Another Email
              </Button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
