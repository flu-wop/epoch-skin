import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) throw new Error("Stripe secret key not configured");

    const stripe = new Stripe(stripeSecretKey, { apiVersion: "2024-06-20" });
    const body = await request.json();

    let amountInDollars: number;

    if (body.items && Array.isArray(body.items)) {
      // Product checkout — apply tax
      const subtotal = body.items.reduce(
        (sum: number, item: { price: number; quantity: number }) =>
          sum + item.price * item.quantity,
        0
      );
      const taxRate = body.taxRate ?? 0.0945;
      amountInDollars = subtotal + subtotal * taxRate;
    } else if (body.amount && body.amount > 0) {
      // Service booking — flat amount passed in
      amountInDollars = body.amount;
    } else {
      return NextResponse.json(
        { error: "Invalid request — provide items array or amount" },
        { status: 400 }
      );
    }

    if (amountInDollars <= 0) {
      return NextResponse.json({ error: "Amount must be greater than zero" }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amountInDollars * 100), // convert to cents
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: {
        customerEmail: body.customerEmail || "",
        type: body.items ? "product" : "service",
        serviceIds: body.serviceIds || "",
        customerName: body.customerName || "",
        appointmentDate: body.appointmentDate || "",
        appointmentTime: body.appointmentTime || "",
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Payment intent error:", error);
    return NextResponse.json({ error: "Failed to create payment intent" }, { status: 500 });
  }
}
