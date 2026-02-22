import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-11-20.acacia",
});

export async function POST(request: Request) {
  try {
    const { items, customerEmail } = await request.json();

    // Calculate total amount
    const amount = items.reduce((total: number, item: any) => {
      return total + (item.price * item.quantity * 100); // Convert to cents
    }, 0);

    // Create PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        customerEmail,
        orderItems: JSON.stringify(items.map((item: any) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        }))),
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error: any) {
    console.error("Stripe PaymentIntent error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
