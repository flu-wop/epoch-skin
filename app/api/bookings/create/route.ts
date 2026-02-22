import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const bookingData = await request.json();

    const {
      gender,
      services,
      date,
      time,
      customer,
      totalPrice,
      totalDuration,
    } = bookingData;

    // Format date for email
    const appointmentDate = new Date(date);
    const formattedDate = appointmentDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Create services list for email
    const servicesList = services
      .map((s: any) => `- ${s.name} (${s.duration}) - $${s.price}`)
      .join("\n");

    // Email to business owner
    const businessEmail = {
      from: "Epoch Skin Bookings <bookings@epochskin.com>",
      to: process.env.BUSINESS_EMAIL || "kayla@epochskin.com",
      subject: `New Booking Request - ${customer.name}`,
      text: `
NEW BOOKING REQUEST

Customer Details:
Name: ${customer.name}
Email: ${customer.email}
Phone: ${customer.phone}
Gender: ${gender === "men" ? "Men's Services" : "Women's Services"}

Appointment Details:
Date: ${formattedDate}
Time: ${time}

Services Requested:
${servicesList}

Total Duration: Approx. ${totalDuration} minutes
Total Price: $${totalPrice}

${customer.notes ? `Additional Notes:\n${customer.notes}` : ""}

---
Please confirm this appointment with the customer within 24 hours.
      `,
    };

    // Email to customer
    const customerEmail = {
      from: "Epoch Skin <bookings@epochskin.com>",
      to: customer.email,
      replyTo: process.env.REPLY_TO_EMAIL || "kayla@epochskin.com",
      subject: "Booking Request Received - Epoch Skin",
      text: `
Hi ${customer.name},

Thank you for choosing Epoch Skin! We've received your booking request.

APPOINTMENT DETAILS
Date: ${formattedDate}
Time: ${time}

SERVICES REQUESTED:
${servicesList}

Total Duration: Approx. ${totalDuration} minutes
Total Price: $${totalPrice}

WHAT'S NEXT?
We'll review your request and confirm your appointment within 24 hours via email and text message at ${customer.phone}.

If you have any questions or need to make changes, please contact us:
Email: kayla@epochskin.com
Phone: (504) 777-4094

We look forward to seeing you!

Best regards,
The Epoch Skin Team

---
Epoch Skin
Premium Waxing Studio & Organic Skincare
New Orleans, LA
      `,
    };

    // Send emails
    try {
      await Promise.all([
        resend.emails.send(businessEmail),
        resend.emails.send(customerEmail),
      ]);
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      // Don't fail the booking if email fails
      // You could log this to a monitoring service
    }

    return NextResponse.json(
      { success: true, message: "Booking received successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Booking creation error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to process booking" },
      { status: 500 }
    );
  }
}
