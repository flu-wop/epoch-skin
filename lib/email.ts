// lib/email.ts — add this export alongside existing functions
// The bookings route imports getResend() — add this to the existing email.ts file

import { Resend } from 'resend';

// ── Lazy initialization — avoids build-time errors when key is missing ──
export const getResend = () => new Resend(process.env.RESEND_API_KEY ?? '');

// ─── (keep all existing exports below — this file just needs getResend added) ───
