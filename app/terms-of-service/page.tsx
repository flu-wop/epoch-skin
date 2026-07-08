import { Metadata } from "next";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for Epoch Skin - rules and guidelines for using our services.",
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen py-20 bg-sand/10">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              Terms of Service
            </h1>
            <p className="text-gray-600">
              Last updated: February 22, 2026
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-12 prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Agreement to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using Epoch Skin's website and services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Services</h2>
              <p className="text-gray-700 leading-relaxed">
                Epoch Skin provides waxing services, Organic facial treatments, and sells Organic Skincare products. All services are performed by licensed estheticians. We reserve the right to refuse service to anyone for any reason at any time.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Appointments and Bookings</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                When booking an appointment:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Appointments are subject to availability and confirmation</li>
                <li>We require 24-hour notice for cancellations or rescheduling</li>
                <li>Late cancellations or no-shows may be subject to a fee</li>
                <li>Please arrive 10 minutes early for your first appointment</li>
                <li>We reserve the right to cancel or reschedule appointments if necessary</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Payment Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                Payment is due at the time of service or purchase. We accept major credit cards and other payment methods as indicated. All prices are in USD and subject to change without notice. Sales tax will be added where applicable.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Health and Safety</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                For your safety and the safety of others:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Please inform us of any allergies, skin conditions, or medical concerns</li>
                <li>Some services may not be suitable for certain skin conditions or medications</li>
                <li>We reserve the right to refuse service if we believe it may be unsafe</li>
                <li>Follow all pre and post-care instructions provided by your esthetician</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Product Purchases</h2>
              <p className="text-gray-700 leading-relaxed">
                All product sales are final unless the product is defective or damaged. Please see our Shipping & Returns page for detailed information about returns and exchanges.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed">
                All content on this website, including text, graphics, logos, images, and software, is the property of Epoch Skin and protected by copyright and trademark laws. You may not reproduce, distribute, or create derivative works without our written permission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                Epoch Skin shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use our services or products. Our liability is limited to the amount you paid for the specific service or product.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on this page. Your continued use of our services after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have questions about these Terms of Service, please contact us:
              </p>
              <div className="mt-4 text-gray-700">
                <p>Email: <a href="mailto:kayla@epoch-skin.com" className="text-clay-600 hover:text-clay-700">kayla@epoch-skin.com</a></p>
                <p>Phone: <a href="tel:5047774094" className="text-clay-600 hover:text-clay-700">(504) 777-4094</a></p>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
}
