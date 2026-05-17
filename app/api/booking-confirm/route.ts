// app/api/booking-confirm/route.ts
// Called from the booking form step 4 to send confirmation emails

import { NextRequest, NextResponse } from 'next/server';
import { sendBookingConfirmation, sendBookingNotification } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, services, date, time, notes, total } = body;

    if (!name || !email || !services?.length || !date || !time) {
      return NextResponse.json({ error: 'Missing required booking fields.' }, { status: 400 });
    }

    await Promise.all([
      sendBookingConfirmation({ name, email, services, total }),
      sendBookingNotification({ name, email, phone, services, date, time, notes, total }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[booking-confirm] Error:', err);
    return NextResponse.json({ error: 'Failed to send confirmation.' }, { status: 500 });
  }
}
