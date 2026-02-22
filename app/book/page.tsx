import { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { BookingForm } from "@/components/booking/BookingForm";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description: "Schedule your waxing or organic facial appointment at Epoch Skin. Professional services by licensed estheticians.",
};

export default function BookPage() {
  return (
    <main className="min-h-screen py-20 bg-sand/10">
      <Container>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">
            Book Your Appointment
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Select your services, choose your preferred date and time, and we'll confirm your appointment within 24 hours.
          </p>
        </div>

        <BookingForm />
      </Container>
    </main>
  );
}
