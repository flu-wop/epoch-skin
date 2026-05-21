// lib/email.ts
// All Resend transactional email logic for Epoch Skin

import { Resend } from 'resend';

const getResend = () => new Resend(process.env.RESEND_API_KEY ?? "");

const FROM = process.env.RESEND_FROM_EMAIL ?? 'hello@epoch-skin.com';
const TO_KAYLA = process.env.RESEND_TO_EMAIL ?? 'kayla@epoch-skin.com';
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://epoch-skin.com';

// ─── Shared brand styles ──────────────────────────────────────────
const emailWrap = (body: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body { margin:0; padding:0; background:#FAFAF8; font-family: Georgia, serif; }
    .outer { max-width:600px; margin:0 auto; background:#fff; }
    .header { background:#111; padding:32px 40px; text-align:center; }
    .header img { height:36px; }
    .header-title { color:#D4AF77; font-size:13px; letter-spacing:0.2em; text-transform:uppercase; margin-top:10px; }
    .body { padding:40px; color:#333; line-height:1.7; }
    .body h2 { color:#111; font-size:22px; margin-bottom:8px; }
    .body p { margin:0 0 16px; }
    .divider { border:none; border-top:1px solid #E8E0D0; margin:28px 0; }
    .cta { display:inline-block; background:#111; color:#D4AF77 !important; text-decoration:none;
           padding:12px 28px; font-size:13px; letter-spacing:0.15em; text-transform:uppercase; margin:8px 0; }
    .footer { background:#F5EDD8; padding:24px 40px; text-align:center; color:#888; font-size:12px; }
    .footer a { color:#888; }
    .gold { color:#D4AF77; }
    .detail-row { display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #F0EBE0; }
  </style>
</head>
<body>
<div class="outer">
  <div class="header">
    <div style="color:#D4AF77;font-size:22px;letter-spacing:0.15em;font-family:Georgia,serif;">EPOCH SKIN</div>
    <div class="header-title">Organic Skincare · New Orleans</div>
  </div>
  <div class="body">${body}</div>
  <div class="footer">
    <p>© 2026 Epoch Skin · <a href="${SITE}">epoch-skin.com</a></p>
    <p><a href="mailto:kayla@epoch-skin.com">kayla@epoch-skin.com</a> · (504) 777-4094</p>
    <p style="margin-top:12px;font-size:11px;color:#aaa;">
      These statements have not been evaluated by the FDA. Products not intended to diagnose, treat, cure, or prevent any disease.
    </p>
  </div>
</div>
</body>
</html>
`;

// ─── 1. Contact form → Kayla notification ────────────────────────
export async function sendContactNotification(data: {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}) {
  return getResend().emails.send({
    from: FROM,
    to: TO_KAYLA,
    reply_to: data.email,
    subject: `New Contact: ${data.name} – ${data.service ?? 'General Inquiry'}`,
    html: emailWrap(`
      <h2>New Contact Form Submission</h2>
      <p>Someone reached out through the website.</p>
      <hr class="divider" />
      <div class="detail-row"><span><strong>Name</strong></span><span>${data.name}</span></div>
      <div class="detail-row"><span><strong>Email</strong></span><span>${data.email}</span></div>
      ${data.phone ? `<div class="detail-row"><span><strong>Phone</strong></span><span>${data.phone}</span></div>` : ''}
      ${data.service ? `<div class="detail-row"><span><strong>Service Interest</strong></span><span>${data.service}</span></div>` : ''}
      <hr class="divider" />
      <p><strong>Message:</strong></p>
      <p style="background:#FAFAF8;padding:16px;border-left:3px solid #D4AF77;">${data.message.replace(/\n/g, '<br/>')}</p>
      <p><a class="cta" href="mailto:${data.email}">Reply to ${data.name}</a></p>
    `),
  });
}

// ─── 2. Contact form → Client auto-reply ─────────────────────────
export async function sendContactAutoReply(data: { name: string; email: string }) {
  return getResend().emails.send({
    from: FROM,
    to: data.email,
    subject: `We received your message – Epoch Skin`,
    html: emailWrap(`
      <h2>Thank you, ${data.name}.</h2>
      <p>We've received your message and will be in touch within <strong>24 hours</strong>.</p>
      <p>In the meantime, feel free to explore our full skincare collection or browse available appointment times.</p>
      <p>
        <a class="cta" href="${SITE}/shop">Shop Skincare</a>
        &nbsp;&nbsp;
        <a class="cta" href="${SITE}/book">Book Appointment</a>
      </p>
      <hr class="divider" />
      <p style="color:#888;font-size:13px;">
        Questions? Reply to this email or call us at <strong>(504) 777-4094</strong>.
      </p>
    `),
  });
}

// ─── 3. Newsletter welcome ────────────────────────────────────────
export async function sendNewsletterWelcome(email: string) {
  return getResend().emails.send({
    from: FROM,
    to: email,
    subject: `Welcome to the Epoch Skin community 🌿`,
    html: emailWrap(`
      <h2>You're in. ✨</h2>
      <p>Welcome to the Epoch Skin inner circle — exclusive skincare tips, early access to new products, and offers reserved just for our community.</p>
      <p>As a thank-you for subscribing, here's <strong class="gold">15% off your first order</strong>:</p>
      <p style="text-align:center;margin:24px 0;">
        <span style="background:#F5EDD8;border:1px solid #D4AF77;padding:12px 28px;font-size:18px;letter-spacing:0.2em;font-family:Georgia,serif;">GLOW15</span>
      </p>
      <p><a class="cta" href="${SITE}/shop">Shop Now</a></p>
      <hr class="divider" />
      <p style="color:#888;font-size:13px;">
        Built in New Orleans. Formulated with certified organic ingredients. Always cruelty-free.
      </p>
    `),
  });
}

// ─── 4. Newsletter notification to Kayla ─────────────────────────
export async function sendNewsletterNotification(email: string) {
  return getResend().emails.send({
    from: FROM,
    to: TO_KAYLA,
    subject: `New newsletter subscriber: ${email}`,
    html: emailWrap(`
      <h2>New Subscriber</h2>
      <p><strong>${email}</strong> just subscribed to the Epoch Skin newsletter.</p>
      <p style="color:#888;font-size:13px;">They've been sent the 15% off GLOW15 welcome code automatically.</p>
    `),
  });
}

// ─── 5. Booking confirmation ──────────────────────────────────────
export async function sendBookingConfirmation(data: {
  name: string;
  email: string;
  services: string[];
  total: string;
  calLink?: string;
}) {
  const serviceList = data.services.map(s => `<li>${s}</li>`).join('');
  return getResend().emails.send({
    from: FROM,
    to: data.email,
    subject: `Your Epoch Skin appointment is confirmed`,
    html: emailWrap(`
      <h2>Your appointment is confirmed. ✨</h2>
      <p>Hi ${data.name}, we can't wait to see you at the studio!</p>
      <hr class="divider" />
      <p><strong>Services booked:</strong></p>
      <ul style="padding-left:20px;color:#555;">${serviceList}</ul>
      <div class="detail-row"><span><strong>Estimated Total</strong></span><span>${data.total}</span></div>
      <hr class="divider" />
      ${data.calLink ? `<p><a class="cta" href="${data.calLink}">Add to Calendar</a></p>` : ''}
      <p style="color:#888;font-size:13px;">
        Need to reschedule? Call us at <strong>(504) 777-4094</strong> or email <a href="mailto:kayla@epoch-skin.com">kayla@epoch-skin.com</a> at least 24 hours in advance.
      </p>
    `),
  });
}

// ─── 6. Booking notification to Kayla ────────────────────────────
export async function sendBookingNotification(data: {
  name: string;
  email: string;
  phone?: string;
  services: string[];
  date: string;
  time: string;
  notes?: string;
  total: string;
}) {
  const serviceList = data.services.map(s => `<li>${s}</li>`).join('');
  return getResend().emails.send({
    from: FROM,
    to: TO_KAYLA,
    reply_to: data.email,
    subject: `New Booking: ${data.name} – ${data.date} at ${data.time}`,
    html: emailWrap(`
      <h2>New Appointment Booked</h2>
      <div class="detail-row"><span><strong>Client</strong></span><span>${data.name}</span></div>
      <div class="detail-row"><span><strong>Email</strong></span><span>${data.email}</span></div>
      ${data.phone ? `<div class="detail-row"><span><strong>Phone</strong></span><span>${data.phone}</span></div>` : ''}
      <div class="detail-row"><span><strong>Date</strong></span><span>${data.date}</span></div>
      <div class="detail-row"><span><strong>Time</strong></span><span>${data.time}</span></div>
      <div class="detail-row"><span><strong>Total</strong></span><span>${data.total}</span></div>
      <hr class="divider" />
      <p><strong>Services:</strong></p>
      <ul style="padding-left:20px;color:#555;">${serviceList}</ul>
      ${data.notes ? `<p><strong>Notes:</strong> ${data.notes}</p>` : ''}
    `),
  });
}
