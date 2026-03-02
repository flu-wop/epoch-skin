"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { format } from "date-fns";
import type { BookingData } from "./BookingForm";
import type { ServiceWithGender } from "@/data/services";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

// ── Inner payment form ─────────────────────────────────────────
function PaymentForm({
  amount,
  onSuccess,
  onBack,
}: {
  amount: number;
  onSuccess: () => void;
  onBack: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMessage(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/booking/success`,
      },
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message || "Payment failed. Please try again.");
      setIsProcessing(false);
    } else {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Payment Information</h3>
        <PaymentElement options={{ layout: "tabs" }} />
      </div>

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-600">{errorMessage}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-colors ${
          !stripe || isProcessing
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-clay-500 text-white hover:bg-clay-600"
        }`}
      >
        {isProcessing ? "Processing..." : `Pay $${amount.toFixed(2)}`}
      </button>

      <button
        type="button"
        onClick={onBack}
        className="w-full py-3 px-6 border-2 border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
      >
        Back to Review
      </button>

      <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
        <span>Secure payment powered by Stripe</span>
      </div>
    </form>
  );
}

// ── Outer wrapper ──────────────────────────────────────────────
interface BookingPaymentProps {
  bookingData: BookingData;
  services: ServiceWithGender[];
  onSuccess: () => void;
  onBack: () => void;
}

export function BookingPayment({
  bookingData,
  services,
  onSuccess,
  onBack,
}: BookingPaymentProps) {
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Calculate total from selected services
  const selectedServices = services.filter((s) =>
    bookingData.selectedServices.includes(s.id)
  );
  const total = selectedServices.reduce((sum, s) => sum + s.price, 0);

  useEffect(() => {
    const createIntent = async () => {
      try {
        const response = await fetch("/api/stripe/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: total,
            customerEmail: bookingData.email,
            customerName: bookingData.name,
            serviceIds: bookingData.selectedServices.join(","),
            appointmentDate: bookingData.date
              ? format(bookingData.date, "yyyy-MM-dd")
              : "",
            appointmentTime: bookingData.time,
          }),
        });

        if (!response.ok) throw new Error("Failed to initialize payment");
        const data = await response.json();
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          setError("Failed to initialize payment");
        }
      } catch (err: any) {
        setError(err.message || "Failed to initialize payment");
      } finally {
        setIsLoading(false);
      }
    };

    if (total > 0) {
      createIntent();
    } else {
      setError("No services selected");
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">
          Complete Your Booking
        </h2>
        <p className="text-gray-600">
          Pay securely to confirm your appointment.
        </p>
      </div>

      {/* Booking & Price Summary */}
      <div className="bg-sand-50 border border-sand-200 rounded-lg p-6 space-y-3">
        <h3 className="font-semibold text-gray-900 mb-3">Appointment Summary</h3>

        {selectedServices.map((service) => (
          <div key={service.id} className="flex justify-between text-gray-700">
            <span>{service.name}</span>
            <span className="font-medium">${service.price.toFixed(2)}</span>
          </div>
        ))}

        {bookingData.date && (
          <div className="border-t border-sand-300 pt-3 text-sm text-gray-600">
            <p>
              <span className="font-medium">Date: </span>
              {format(bookingData.date, "EEEE, MMMM d, yyyy")}
            </p>
            {bookingData.time && (
              <p>
                <span className="font-medium">Time: </span>
                {bookingData.time}
              </p>
            )}
            <p>
              <span className="font-medium">Name: </span>
              {bookingData.name}
            </p>
          </div>
        )}

        <div className="border-t border-sand-300 pt-3 flex justify-between font-serif text-xl font-semibold text-gray-900">
          <span>Total Due</span>
          <span className="text-clay-600">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Payment form */}
      {isLoading ? (
        <div className="text-center py-8">
          <p className="text-gray-600">Initializing secure payment...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={onBack}
            className="px-6 py-3 border-2 border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
          >
            Go Back
          </button>
        </div>
      ) : clientSecret ? (
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
          <PaymentForm amount={total} onSuccess={onSuccess} onBack={onBack} />
        </Elements>
      ) : null}
    </div>
  );
}
