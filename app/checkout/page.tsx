"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Container } from "@/components/layout/Container";
import { StripeCheckoutForm } from "@/components/checkout/StripeCheckoutForm";
import { useCart } from "@/lib/hooks/useCart";
import Link from "next/link";

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (items.length > 0) {
      createPaymentIntent();
    } else {
      setIsLoading(false);
    }
  }, [items]);

  const createPaymentIntent = async () => {
    try {
      const response = await fetch("/api/stripe/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          customerEmail: "",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create payment intent");
      }

      const data = await response.json();

      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
      } else {
        setError("Failed to initialize payment");
      }
    } catch (err: any) {
      console.error("Payment intent error:", err);
      setError(err.message || "Failed to initialize payment");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    clearCart();
    setShowSuccess(true);
  };

  // Success State
  if (showSuccess) {
    return (
      <main className="min-h-screen py-20 bg-sand/10">
        <Container>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
              {/* Success Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-sage-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-sage-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>

              <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                Payment Successful!
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Thank you for your purchase. You'll receive an email confirmation shortly.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/"
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Return to Home
                </Link>
                <Link
                  href="/shop"
                  className="px-6 py-3 bg-clay-500 text-white rounded-lg font-semibold hover:bg-clay-600 transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </main>
    );
  }

  // Empty Cart State
  if (!isLoading && items.length === 0) {
    return (
      <main className="min-h-screen py-20 bg-sand/10">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
              <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                Your Cart is Empty
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Add some products to your cart before checking out.
              </p>
              <Link
                href="/shop"
                className="inline-block px-6 py-3 bg-clay-500 text-white rounded-lg font-semibold hover:bg-clay-600 transition-colors"
              >
                Shop Products
              </Link>
            </div>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-20 bg-sand/10">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-8 text-center">
            Checkout
          </h1>

          {isLoading ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <p className="text-gray-600">Loading checkout...</p>
            </div>
          ) : error ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-600">{error}</p>
                <p className="text-sm text-gray-600 mt-2">
                  Note: Stripe is not fully configured yet. Add your real Stripe API keys to .env.local to enable payments.
                </p>
              </div>
              <Link
                href="/cart"
                className="inline-block px-6 py-3 bg-clay-500 text-white rounded-lg font-semibold hover:bg-clay-600 transition-colors"
              >
                Return to Cart
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {/* Order Summary */}
              <div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
                  <h2 className="text-xl font-serif font-bold text-gray-900 mb-4">
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium text-gray-900">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium text-gray-900">Free</span>
                    </div>
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-gray-900">Total</span>
                        <span className="text-2xl font-bold text-clay-600">
                          ${total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Form */}
              <div>
                {clientSecret ? (
                  <Elements
                    stripe={stripePromise}
                    options={{
                      clientSecret,
                      appearance: {
                        theme: "stripe",
                        variables: {
                          colorPrimary: "#b87968",
                          colorText: "#374151",
                          fontFamily: "Inter, system-ui, sans-serif",
                          borderRadius: "8px",
                        },
                      },
                    }}
                  >
                    <StripeCheckoutForm
                      amount={total}
                      onSuccess={handlePaymentSuccess}
                    />
                  </Elements>
                ) : (
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <p className="text-gray-600">Payment form will appear here when Stripe is configured.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}
