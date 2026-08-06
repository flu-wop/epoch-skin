import { Metadata } from "next";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Epoch Skin - how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen py-20 bg-sand/10">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-600">
              Last updated: February 22, 2026
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-12 prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                At Epoch Skin, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Information We Collect</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may collect personal information that you provide to us, including:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Name and contact information (email, phone number)</li>
                <li>Appointment booking details and preferences</li>
                <li>Payment and billing information</li>
                <li>Communication preferences for marketing and newsletters</li>
                <li>Information you provide when contacting us</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">How We Use Your Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Process and manage your appointments</li>
                <li>Process your transactions and send confirmations</li>
                <li>Send you service reminders and updates</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Send you marketing communications (with your consent)</li>
                <li>Improve our services and website experience</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Information Sharing</h2>
              <p className="text-gray-700 leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and conducting our business, such as payment processors and email service providers. These parties are obligated to keep your information confidential.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Data Security</h2>
              <p className="text-gray-700 leading-relaxed">
                We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Your Rights</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications at any time</li>
                <li>Object to processing of your personal information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Cookies</h2>
              <p className="text-gray-700 leading-relaxed">
                We use cookies and similar tracking technologies to enhance your browsing experience and analyze website traffic. You can control cookie preferences through your browser settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Changes to This Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <div className="mt-4 text-gray-700">
                <p>Email: <a href="mailto:kayla@epoch-skin.com" className="text-clay-600 hover:text-clay-700">kayla@epoch-skin.com</a></p>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
}
