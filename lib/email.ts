import { Resend } from 'resend';

export const getResend = () => new Resend(process.env.RESEND_API_KEY ?? '');

const FROM = process.env.RESEND_FROM_EMAIL ?? 'hello@epoch-skin.com';
const TO_KAYLA = process.env.RESEND_TO_EMAIL ?? 'kayla@epoch-skin.com';

export async function sendBookingConfirmation({
  name, email, services, total,
}: {
  name: string; email: string; services: string[]; total: number;
}) {
  const resend = getResend();
  return resend.emails.send({
    from: `Epoch Skin <${FROM}>`,
    to: email,
    subject: 'Your Epoch Skin appointment is confirmed',
    html: `
      <p>Hi ${name},</p>
      <p>Your booking is confirmed:</p>
      <ul>${services.map(s => `<li>${s}</li>`).join('')}</ul>
      <p><strong>Total:</strong> $${total}</p>
      <p>See you soon,<br/>Kayla @ Epoch Skin</p>
    `,
  });
}

export async function sendBookingNotification({
  name, email, phone, services, date, time, notes, total,
}: {
  name: string; email: string; phone: string; services: string[];
  date: string; time: string; notes?: string; total: number;
}) {
  const resend = getResend();
  return resend.emails.send({
    from: `Epoch Skin <${FROM}>`,
    to: TO_KAYLA,
    subject: `New booking — ${date} at ${time}`,
    html: `
      <p><strong>New appointment:</strong></p>
      <ul>
        <li><strong>Client:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Phone:</strong> ${phone}</li>
        <li><strong>Services:</strong> ${services.join(', ')}</li>
        <li><strong>Date:</strong> ${date}</li>
        <li><strong>Time:</strong> ${time}</li>
        <li><strong>Total:</strong> $${total}</li>
        ${notes ? `<li><strong>Notes:</strong> ${notes}</li>` : ''}
      </ul>
    `,
  });
}

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
