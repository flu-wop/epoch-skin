import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Epoch Skin Newsletter" <${process.env.GMAIL_USER}>`,
      to: process.env.NEWSLETTER_TO,
      subject: "New Newsletter Signup — Epoch Skin",
      html: `
        <div style="font-family: Georgia, serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #fdfaf7; border-radius: 12px;">
          <h2 style="color: #b87968; font-size: 24px; margin-bottom: 8px;">New Newsletter Subscriber</h2>
          <p style="color: #555; font-size: 16px; margin-bottom: 24px;">Someone just signed up for the Epoch Skin newsletter.</p>
          <div style="background: #fff; border: 1px solid #e8ddd5; border-radius: 8px; padding: 20px;">
            <p style="margin: 0; color: #333; font-size: 18px;"><strong>Email:</strong> ${email}</p>
          </div>
          <p style="color: #999; font-size: 13px; margin-top: 24px;">Epoch Skin · epoch-skin.com</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
