// app/api/newsletter/route.ts
// Captures subscriber email to Vercel KV and sends welcome via Resend

import { NextRequest, NextResponse } from 'next/server';
import { sendNewsletterWelcome, sendNewsletterNotification } from '@/lib/email';

// We use a lightweight KV approach — Vercel KV or a simple Set stored in KV.
// If KV is not available, we gracefully degrade (still sends email).
async function storeSubscriber(email: string) {
  try {
    // Vercel KV — import dynamically so build doesn't fail if KV isn't configured
    const { kv } = await import('@vercel/kv');
    const key = `subscriber:${email.toLowerCase()}`;
    const existing = await kv.get(key);
    if (existing) return { duplicate: true };
    await kv.set(key, { email, subscribedAt: new Date().toISOString() });
    // Also push to a sorted set for easy export
    await kv.zadd('subscribers', { score: Date.now(), member: email.toLowerCase() });
    return { duplicate: false };
  } catch {
    // KV not configured — still proceed with email
    console.warn('[newsletter] KV not configured — subscriber not stored');
    return { duplicate: false };
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = (body.email ?? '').trim().toLowerCase();

    if (!email) {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    const { duplicate } = await storeSubscriber(email);

    if (duplicate) {
      // Still return success — don't reveal subscriber status
      return NextResponse.json({ success: true, message: 'Already subscribed.' });
    }

    // Send welcome + notify Kayla in parallel
    await Promise.all([
      sendNewsletterWelcome(email),
      sendNewsletterNotification(email),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[newsletter] Error:', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
