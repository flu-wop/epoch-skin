import { Resend } from 'resend';

export const getResend = () => new Resend(process.env.RESEND_API_KEY ?? '');

const FROM = process.env.RESEND_FROM_EMAIL ?? 'hello@epoch-skin.com';
const TO_KAYLA = process.env.RESEND_TO_EMAIL ?? 'kayla@epoch-skin.com';
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://epoch-skin.com';

// ── Booking confirmation (the ONE live path — fired from the Stripe webhook
// after a paid booking checkout completes) ─────────────────────────────────

export interface BookingEmailData {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;      // YYYY-MM-DD
  time: string;       // "2:00 PM"
  duration: number;   // minutes
  price: number;
  notes: string;
}

function pad(n: number) { return String(n).padStart(2, '0'); }

export function generateBookingICS(b: {
  name: string; email: string; service: string;
  date: string; time: string; duration: number;
}): string {
  const [year, month, day] = b.date.split('-').map(Number);
  const [timePart, mer]    = b.time.split(' ');
  const [hStr, mStr]       = timePart.split(':');
  let h = parseInt(hStr); const m = parseInt(mStr || '0');
  if (mer === 'PM' && h !== 12) h += 12;
  if (mer === 'AM' && h === 12) h = 0;
  const dtStart   = `${year}${pad(month)}${pad(day)}T${pad(h)}${pad(m)}00`;
  const endTotal  = h * 60 + m + b.duration;
  const dtEnd     = `${year}${pad(month)}${pad(day)}T${pad(Math.floor(endTotal/60)%24)}${pad(endTotal%60)}00`;
  const uid       = `epoch-${Date.now()}@epoch-skin.com`;
  const now       = new Date().toISOString().replace(/[\-:.]/g,'').slice(0,15)+'Z';
  return [
    'BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Epoch Skin//Booking//EN',
    'CALSCALE:GREGORIAN','METHOD:REQUEST','BEGIN:VEVENT',
    `UID:${uid}`,`DTSTAMP:${now}`,`DTSTART:${dtStart}`,`DTEND:${dtEnd}`,
    `SUMMARY:Epoch Skin – ${b.service}`,
    `DESCRIPTION:Appointment at Epoch Skin\\nService: ${b.service}\\nDate: ${b.date} at ${b.time}\\n\\nQuestions? (504) 777-4094`,
    `LOCATION:Epoch Skin Studio\\, New Orleans\\, LA`,
    `ORGANIZER;CN=Epoch Skin:mailto:kayla@epoch-skin.com`,
    `ATTENDEE;ROLE=REQ-PARTICIPANT;CN=${b.name}:mailto:${b.email}`,
    'STATUS:CONFIRMED','END:VEVENT','END:VCALENDAR',
  ].join('\r\n');
}

export function bookingEmailHTML(b: BookingEmailData, isClient: boolean): string {
  const dateStr = new Date(b.date + 'T12:00:00').toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#FAF7F2;font-family:Georgia,serif;">
<div style="max-width:560px;margin:0 auto;background:#fff;">
  <div style="background:#1C1C1A;padding:28px 36px;text-align:center;">
    <p style="color:#C9A96E;font-size:22px;margin:0;letter-spacing:0.1em;">EPOCH SKIN</p>
    <p style="color:#8A8076;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;margin:6px 0 0;">Organic Skincare · New Orleans</p>
  </div>
  <div style="padding:36px;color:#2E2E2C;line-height:1.7;">
    <h2 style="font-size:22px;margin-bottom:8px;color:#1C1C1A;">${isClient ? `Hi ${b.name},` : `New Paid Booking: ${b.name}`}</h2>
    <p style="font-size:14px;">${isClient
      ? 'Your appointment at Epoch Skin is confirmed and payment received. We can\'t wait to see you!'
      : 'A new appointment has been booked and paid.'}</p>
    <hr style="border:none;border-top:1px solid #E5DCCF;margin:24px 0;"/>
    <table style="width:100%;font-size:14px;border-collapse:collapse;">
      ${[
        ['Service',  b.service],
        ['Date',     dateStr],
        ['Time',     b.time],
        ['Duration', `${b.duration} min`],
        ['Paid',     `$${b.price}`],
        ...(b.phone ? [['Phone', b.phone]] : []),
        ...(b.email ? [['Email', b.email]] : []),
        ...(b.notes ? [['Notes', b.notes]] : []),
      ].map(([k,v]) => `<tr>
        <td style="color:#8C8680;padding:7px 0;width:38%;vertical-align:top;">${k}</td>
        <td style="color:${k==='Paid'?'#C9A96E':'#1C1C1A'};${k==='Paid'?'font-weight:600;':''}padding:7px 0;">${v}</td>
      </tr>`).join('')}
    </table>
    <hr style="border:none;border-top:1px solid #E5DCCF;margin:24px 0;"/>
    ${isClient ? `
    <p style="font-size:13px;color:#5A5550;">The .ics calendar file is attached — open it to add to Apple or Google Calendar.</p>
    <p style="font-size:13px;color:#5A5550;">Need to reschedule? Call or text <strong>(504) 777-4094</strong> at least 24 hours in advance.</p>
    <a href="${SITE}/book" style="display:inline-block;margin-top:16px;padding:12px 28px;background:#C9A96E;color:#1C1C1A;text-decoration:none;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;">Book Another Service</a>
    ` : `<a href="mailto:${b.email}" style="display:inline-block;padding:12px 28px;background:#1C1C1A;color:#C9A96E;text-decoration:none;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;">Reply to ${b.name}</a>`}
  </div>
  <div style="background:#F5F0E8;padding:18px 36px;text-align:center;color:#8C8680;font-size:11px;">
    <p style="margin:0;">© 2026 Epoch Skin · <a href="${SITE}" style="color:#C9A96E;">epoch-skin.com</a> · (504) 777-4094</p>
  </div>
</div></body></html>`;
}

export async function sendPaidBookingEmails(booking: BookingEmailData) {
  const ics    = generateBookingICS(booking);
  const icsB64 = Buffer.from(ics).toString('base64');
  const resend = getResend();

  return Promise.all([
    resend.emails.send({
      from: `Epoch Skin <${FROM}>`, to: booking.email, reply_to: TO_KAYLA,
      subject: `Your Epoch Skin appointment — ${booking.service}`,
      html: bookingEmailHTML(booking, true),
      attachments: [{ filename: 'epoch-skin-appointment.ics', content: icsB64 }],
    }),
    resend.emails.send({
      from: `Epoch Skin <${FROM}>`, to: TO_KAYLA, reply_to: booking.email,
      subject: `Paid Booking: ${booking.name} – ${booking.service} on ${booking.date} at ${booking.time}`,
      html: bookingEmailHTML(booking, false),
      attachments: [{ filename: 'appointment.ics', content: icsB64 }],
    }),
  ]);
}

// ── Contact form ─────────────────────────────────────────────────────────

export async function sendContactNotification({
  name, email, phone, service, message,
}: {
  name: string; email: string; phone?: string; service?: string; message: string;
}) {
  const resend = getResend();
  return resend.emails.send({
    from: `Epoch Skin <${FROM}>`,
    to: TO_KAYLA,
    subject: `New contact form — ${name}`,
    html: `
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        ${phone ? `<li><strong>Phone:</strong> ${phone}</li>` : ''}
        ${service ? `<li><strong>Service:</strong> ${service}</li>` : ''}
        <li><strong>Message:</strong> ${message}</li>
      </ul>
    `,
  });
}

export async function sendContactAutoReply({
  name, email,
}: {
  name: string; email: string;
}) {
  const resend = getResend();
  return resend.emails.send({
    from: `Epoch Skin <${FROM}>`,
    to: email,
    subject: "We'll be in touch soon",
    html: `
      <p>Hi ${name},</p>
      <p>Thanks for reaching out! Kayla will get back to you within 24 hours.</p>
      <p>— Epoch Skin</p>
    `,
  });
}

// ── Newsletter ───────────────────────────────────────────────────────────

const NEWSLETTER_NOTIFY = process.env.NEWSLETTER_TO ?? TO_KAYLA;

export async function sendNewsletterWelcome({ email }: { email: string }) {
  const resend = getResend();
  return resend.emails.send({
    from: `Epoch Skin <${FROM}>`,
    to: email,
    subject: "You're in — here's 20% off your first order",
    html: `<!DOCTYPE html><html><head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#FAF7F2;font-family:Georgia,serif;">
<div style="max-width:560px;margin:0 auto;background:#fff;">
  <div style="background:#1C1C1A;padding:28px 36px;text-align:center;">
    <p style="color:#C9A96E;font-size:22px;margin:0;letter-spacing:0.1em;">EPOCH SKIN</p>
    <p style="color:#8A8076;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;margin:6px 0 0;">Organic Skincare · New Orleans</p>
  </div>
  <div style="padding:36px;color:#2E2E2C;line-height:1.7;">
    <h2 style="font-size:22px;margin-bottom:8px;color:#1C1C1A;">Welcome to the inner circle</h2>
    <p style="font-size:14px;">Thanks for subscribing. Here's your code for 20% off your first order:</p>
    <div style="background:#F5F0E8;border:1px dashed #C9A96E;padding:18px;text-align:center;margin:24px 0;">
      <span style="font-size:20px;letter-spacing:0.15em;color:#1C1C1A;font-weight:bold;">EPOCH20</span>
    </div>
    <p style="font-size:13px;color:#5A5550;">Enter it at checkout on any order. Skincare guides and early access to new formulas coming your way soon.</p>
    <a href="${SITE}/shop" style="display:inline-block;margin-top:16px;padding:12px 28px;background:#C9A96E;color:#1C1C1A;text-decoration:none;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;">Shop Skincare</a>
  </div>
  <div style="background:#F5F0E8;padding:18px 36px;text-align:center;color:#8C8680;font-size:11px;">
    <p style="margin:0;">© 2026 Epoch Skin · <a href="${SITE}" style="color:#C9A96E;">epoch-skin.com</a></p>
  </div>
</div></body></html>`,
  });
}

export async function sendNewsletterNotification({ email }: { email: string }) {
  const resend = getResend();
  return resend.emails.send({
    from: `Epoch Skin <${FROM}>`,
    to: NEWSLETTER_NOTIFY,
    subject: `New newsletter subscriber`,
    html: `<p>${email} just subscribed to the newsletter.</p>`,
  });
}

export async function sendDbWriteFailureAlert({
  kind, sessionId, details,
}: {
  kind: 'booking' | 'order' | 'newsletter subscriber';
  sessionId: string; // Stripe session id, or 'n/a' for non-payment records
  details: Record<string, string | number | null | undefined>;
}) {
  const resend = getResend();
  const rows = Object.entries(details)
    .map(([k, v]) => `<li><strong>${k}:</strong> ${v ?? '—'}</li>`)
    .join('');
  const isPaid = sessionId !== 'n/a';
  return resend.emails.send({
    from: `Epoch Skin Alerts <${FROM}>`,
    to: TO_KAYLA,
    subject: `⚠️ ${kind} did NOT save — needs manual entry`,
    html: `
      <p><strong>${isPaid
        ? `A customer paid successfully via Stripe, but the ${kind} could not be saved to the database.`
        : `A ${kind} came in but could not be saved to the database.`}</strong></p>
      ${isPaid ? `<p>Stripe session: <code>${sessionId}</code> — look it up in the Stripe Dashboard to confirm payment and get full details.</p>` : ''}
      <ul>${rows}</ul>
      <p>Please add this ${kind} manually${isPaid ? ' and follow up with the customer if needed' : ''}.</p>
    `,
  });
}

// ── Product orders ──────────────────────────────────────────────────────

export interface OrderLineItem {
  name: string;
  quantity: number;
  amountCents: number; // line total, already reflects any discount
}

export interface OrderEmailData {
  email: string;
  items: OrderLineItem[];
  subtotalCents: number;
  discountCode: string | null;
  taxCents: number;
  totalCents: number;
  sessionId: string;
}

function money(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

function orderEmailHTML(o: OrderEmailData, isClient: boolean): string {
  const rows = o.items.map(
    (i) => `<tr>
        <td style="color:#1C1C1A;padding:7px 0;">${i.name} × ${i.quantity}</td>
        <td style="color:#1C1C1A;padding:7px 0;text-align:right;">${money(i.amountCents)}</td>
      </tr>`
  ).join('');

  return `<!DOCTYPE html><html><head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#FAF7F2;font-family:Georgia,serif;">
<div style="max-width:560px;margin:0 auto;background:#fff;">
  <div style="background:#1C1C1A;padding:28px 36px;text-align:center;">
    <p style="color:#C9A96E;font-size:22px;margin:0;letter-spacing:0.1em;">EPOCH SKIN</p>
    <p style="color:#8A8076;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;margin:6px 0 0;">Organic Skincare · New Orleans</p>
  </div>
  <div style="padding:36px;color:#2E2E2C;line-height:1.7;">
    <h2 style="font-size:22px;margin-bottom:8px;color:#1C1C1A;">${isClient ? 'Thank you for your order' : 'New Paid Order'}</h2>
    <p style="font-size:14px;">${isClient
      ? "Your order is confirmed and payment received. We'll have it packed and shipped soon."
      : `A new order has been placed and paid by ${o.email}.`}</p>
    <hr style="border:none;border-top:1px solid #E5DCCF;margin:24px 0;"/>
    <table style="width:100%;font-size:14px;border-collapse:collapse;">
      ${rows}
      <tr><td style="padding:12px 0 4px;color:#8C8680;">Subtotal</td><td style="padding:12px 0 4px;text-align:right;">${money(o.subtotalCents)}</td></tr>
      ${o.discountCode ? `<tr><td style="padding:2px 0;color:#4A9B6F;">Discount (${o.discountCode})</td><td style="padding:2px 0;text-align:right;color:#4A9B6F;">included</td></tr>` : ''}
      <tr><td style="padding:2px 0;color:#8C8680;">Tax</td><td style="padding:2px 0;text-align:right;">${money(o.taxCents)}</td></tr>
      <tr><td style="padding:8px 0 0;font-weight:600;color:#1C1C1A;">Total</td><td style="padding:8px 0 0;text-align:right;font-weight:600;color:#C9A96E;">${money(o.totalCents)}</td></tr>
    </table>
    <hr style="border:none;border-top:1px solid #E5DCCF;margin:24px 0;"/>
    ${isClient ? `
    <p style="font-size:13px;color:#5A5550;">Allow 5–7 business days for standard shipping. Questions? Call or text <strong>(504) 777-4094</strong>.</p>
    <a href="${SITE}/shop" style="display:inline-block;margin-top:16px;padding:12px 28px;background:#C9A96E;color:#1C1C1A;text-decoration:none;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;">Shop More</a>
    ` : `<a href="mailto:${o.email}" style="display:inline-block;padding:12px 28px;background:#1C1C1A;color:#C9A96E;text-decoration:none;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;">Reply to Customer</a>`}
  </div>
  <div style="background:#F5F0E8;padding:18px 36px;text-align:center;color:#8C8680;font-size:11px;">
    <p style="margin:0;">© 2026 Epoch Skin · <a href="${SITE}" style="color:#C9A96E;">epoch-skin.com</a> · (504) 777-4094</p>
  </div>
</div></body></html>`;
}

export async function sendPaidOrderEmails(order: OrderEmailData) {
  const resend = getResend();
  return Promise.all([
    resend.emails.send({
      from: `Epoch Skin <${FROM}>`, to: order.email, reply_to: TO_KAYLA,
      subject: `Your Epoch Skin order is confirmed`,
      html: orderEmailHTML(order, true),
    }),
    resend.emails.send({
      from: `Epoch Skin <${FROM}>`, to: TO_KAYLA, reply_to: order.email,
      subject: `Paid Order: ${order.email} — ${money(order.totalCents)}`,
      html: orderEmailHTML(order, false),
    }),
  ]);
}
