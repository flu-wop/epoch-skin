"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/lib/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_COST } from "@/lib/constants";
import { CheckCircle2, CreditCard, Lock } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, tax, total, clearCart, itemCount } = useCart();
  const [step, setStep] = useState(1); // 1: Contact, 2: Shipping, 3: Payment
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST;
  const finalTotal = total + shipping;

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
    country: "United States",
  });

  // Redirect if cart is empty
  if (items.length === 0 && !orderPlaced) {
    router.push("/cart");
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    // TODO: Integrate with Stripe
    // See integration instructions in README.md
    setTimeout(() => {
      const newOrderNumber = `EPS-${Date.now()}`;
      setOrderNumber(newOrderNumber);
      setOrderPlaced(true);
      clearCart();
      setIsProcessing(false);
    }, 2000);
  };

  // Order confirmation screen
  if (orderPlaced) {
    return (
      <div className="min-h-[60vh] py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
              <CheckCircle2 className="h-10 w-10 text-success" />
            </div>
            <h1 className="mt-6 font-serif text-4xl font-bold text-sage-900">
              Order Confirmed!
            </h1>
            <p className="mt-4 text-lg text-neutral-600">
              Thank you for your purchase. Your order has been successfully placed.
            </p>

            <div className="mt-8 rounded-xl border border-sage-100 bg-sage-50/50 p-6">
              <p className="text-sm text-neutral-600">Order Number</p>
              <p className="mt-1 font-mono text-2xl font-bold text-sage-900">
                {orderNumber}
              </p>
            </div>

            <div className="mt-8 space-y-3">
              <p className="text-sm text-neutral-600">
                A confirmation email has been sent to <strong>{formData.email}</strong>
              </p>
              <p className="text-sm text-neutral-600">
                Your order will be shipped to:
              </p>
              <div className="text-sm text-neutral-700">
                <p>{formData.firstName} {formData.lastName}</p>
                <p>{formData.address}</p>
                {formData.apartment && <p>{formData.apartment}</p>}
                <p>{formData.city}, {formData.state} {formData.zipCode}</p>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="bg-clay-500 hover:bg-clay-600">
                <Link href="/shop">Continue Shopping</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <>
      {/* Page header */}
      <section className="border-b bg-sage-50/30 py-8">
        <Container>
          <h1 className="font-serif text-3xl font-bold text-sage-900 sm:text-4xl">
            Checkout
          </h1>
          {/* Progress steps */}
          <div className="mt-6 flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                    step >= s
                      ? "bg-clay-500 text-white"
                      : "bg-sage-100 text-sage-600"
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div
                    className={`h-0.5 w-12 ${
                      step > s ? "bg-clay-500" : "bg-sage-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Checkout form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Step 1: Contact Information */}
                {step === 1 && (
                  <div className="rounded-xl border border-sage-100 bg-white p-6">
                    <h2 className="font-serif text-2xl font-bold text-sage-900">
                      Contact Information
                    </h2>
                    <div className="mt-6 space-y-4">
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
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-sage-900">
                            First Name <span className="text-clay-500">*</span>
                          </label>
                          <Input
                            id="firstName"
                            name="firstName"
                            required
                            value={formData.firstName}
                            onChange={handleChange}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-sage-900">
                            Last Name <span className="text-clay-500">*</span>
                          </label>
                          <Input
                            id="lastName"
                            name="lastName"
                            required
                            value={formData.lastName}
                            onChange={handleChange}
                            className="mt-2"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-sage-900">
                          Phone <span className="text-clay-500">*</span>
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="mt-2"
                          placeholder="(504) 777-4094"
                        />
                      </div>
                    </div>
                    <Button
                      type="button"
                      onClick={() => setStep(2)}
                      size="lg"
                      className="mt-6 bg-clay-500 hover:bg-clay-600"
                    >
                      Continue to Shipping
                    </Button>
                  </div>
                )}

                {/* Step 2: Shipping Address */}
                {step === 2 && (
                  <div className="rounded-xl border border-sage-100 bg-white p-6">
                    <h2 className="font-serif text-2xl font-bold text-sage-900">
                      Shipping Address
                    </h2>
                    <div className="mt-6 space-y-4">
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-sage-900">
                          Street Address <span className="text-clay-500">*</span>
                        </label>
                        <Input
                          id="address"
                          name="address"
                          required
                          value={formData.address}
                          onChange={handleChange}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <label htmlFor="apartment" className="block text-sm font-medium text-sage-900">
                          Apartment, suite, etc. (optional)
                        </label>
                        <Input
                          id="apartment"
                          name="apartment"
                          value={formData.apartment}
                          onChange={handleChange}
                          className="mt-2"
                        />
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-sage-900">
                            City <span className="text-clay-500">*</span>
                          </label>
                          <Input
                            id="city"
                            name="city"
                            required
                            value={formData.city}
                            onChange={handleChange}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <label htmlFor="state" className="block text-sm font-medium text-sage-900">
                            State <span className="text-clay-500">*</span>
                          </label>
                          <Input
                            id="state"
                            name="state"
                            required
                            value={formData.state}
                            onChange={handleChange}
                            className="mt-2"
                            placeholder="CA"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="zipCode" className="block text-sm font-medium text-sage-900">
                          ZIP Code <span className="text-clay-500">*</span>
                        </label>
                        <Input
                          id="zipCode"
                          name="zipCode"
                          required
                          value={formData.zipCode}
                          onChange={handleChange}
                          className="mt-2"
                          placeholder="94102"
                        />
                      </div>
                    </div>
                    <div className="mt-6 flex gap-3">
                      <Button
                        type="button"
                        onClick={() => setStep(1)}
                        variant="outline"
                      >
                        Back
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setStep(3)}
                        size="lg"
                        className="bg-clay-500 hover:bg-clay-600"
                      >
                        Continue to Payment
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Payment */}
                {step === 3 && (
                  <div className="rounded-xl border border-sage-100 bg-white p-6">
                    <h2 className="font-serif text-2xl font-bold text-sage-900">
                      Payment Information
                    </h2>
                    
                    {/* Stripe placeholder */}
                    <div className="mt-6 rounded-lg border-2 border-dashed border-sage-200 bg-sage-50/30 p-8">
                      <div className="flex items-center justify-center gap-3 text-sage-700">
                        <CreditCard className="h-6 w-6" />
                        <p className="font-medium">Stripe Payment Integration</p>
                      </div>
                      <p className="mt-3 text-center text-sm text-neutral-600">
                        Payment form will appear here after Stripe integration.
                      </p>
                      <div className="mt-4 text-center text-xs text-neutral-500">
                        See README.md for integration instructions
                      </div>
                    </div>

                    {/* TODO: STRIPE INTEGRATION
                      1. npm install @stripe/stripe-js @stripe/react-stripe-js
                      2. Create /api/create-payment-intent route
                      3. Wrap this section with <Elements provider={stripePromise}>
                      4. Use <CardElement> from @stripe/react-stripe-js
                      5. See: https://stripe.com/docs/payments/quickstart
                    */}

                    <div className="mt-6 flex items-center gap-2 text-sm text-neutral-600">
                      <Lock className="h-4 w-4" />
                      <span>Secure checkout powered by Stripe</span>
                    </div>

                    <div className="mt-6 flex gap-3">
                      <Button
                        type="button"
                        onClick={() => setStep(2)}
                        variant="outline"
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isProcessing}
                        className="bg-clay-500 hover:bg-clay-600"
                      >
                        {isProcessing ? "Processing..." : `Pay ${formatPrice(finalTotal)}`}
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Order summary sidebar */}
            <div>
              <div className="sticky top-24 rounded-xl border border-sage-100 bg-white p-6">
                <h2 className="font-serif text-xl font-bold text-sage-900">
                  Order Summary
                </h2>

                {/* Items */}
                <div className="mt-4 space-y-3">
                  {items.map((item) => (
                    <div key={item.productId} className="flex gap-3 text-sm">
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-sand-100 to-neutral-100">
                        <div className="flex h-full items-center justify-center">
                          <div className="h-8 w-8 rounded-full bg-sage-200/30"></div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sage-900">{item.name}</p>
                        <p className="text-neutral-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium text-sage-900">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="mt-6 space-y-2 border-t border-sage-100 pt-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Subtotal</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? "FREE" : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Tax</span>
                    <span className="font-medium">{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between border-t border-sage-100 pt-2 text-lg">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold">{formatPrice(finalTotal)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
