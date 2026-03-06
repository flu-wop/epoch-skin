import { Metadata } from "next";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description: "Shipping and returns policy for Epoch Skin products.",
};

export default function ShippingReturnsPage() {
  return (
    <main className="min-h-screen py-20 bg-sand/10">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              Shipping & Returns
            </h1>
            <p className="text-gray-600">
              Information about shipping, delivery, and our return policy
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-12 prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Shipping Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We want to get your Organic Skincare products to you as quickly and safely as possible.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Shipping Methods</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><strong>Standard Shipping:</strong> 5-7 business days - FREE on orders over $50</li>
                <li><strong>Expedited Shipping:</strong> 2-3 business days - $15</li>
                <li><strong>Express Shipping:</strong> 1-2 business days - $25</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Processing Time</h3>
              <p className="text-gray-700 leading-relaxed">
                Orders are typically processed and shipped within 1-2 business days (Monday-Friday, excluding holidays). You will receive a shipping confirmation email with tracking information once your order ships.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Shipping Locations</h3>
              <p className="text-gray-700 leading-relaxed">
                We currently ship within the United States. For international shipping inquiries, please contact us at <a href="mailto:kayla@epochskin.com" className="text-clay-600 hover:text-clay-700">kayla@epochskin.com</a>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Return Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We want you to love your Epoch Skin products. If you're not completely satisfied, we're here to help.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Return Eligibility</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Products must be returned within 30 days of delivery</li>
                <li>Items must be unused, unopened, and in original packaging</li>
                <li>Products must be in resalable condition</li>
                <li>Proof of purchase (order number or receipt) is required</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Non-Returnable Items</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                For health and safety reasons, the following items cannot be returned:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Opened or used Skincare products</li>
                <li>Products without original packaging</li>
                <li>Sale or clearance items (unless defective)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">How to Return</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                To initiate a return:
              </p>
              <ol className="list-decimal list-inside text-gray-700 space-y-2 ml-4">
                <li>Contact us at <a href="mailto:kayla@epochskin.com" className="text-clay-600 hover:text-clay-700">kayla@epochskin.com</a> with your order number</li>
                <li>We'll provide you with return instructions and a return authorization number</li>
                <li>Carefully package the item(s) with all original materials</li>
                <li>Ship the return to the address provided (return shipping costs are the customer's responsibility unless the item is defective)</li>
                <li>Once we receive and inspect your return, we'll process your refund within 5-7 business days</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Exchanges</h2>
              <p className="text-gray-700 leading-relaxed">
                We currently do not offer direct exchanges. If you need a different product, please return the original item for a refund and place a new order. We'll do our best to expedite your new order.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Damaged or Defective Items</h2>
              <p className="text-gray-700 leading-relaxed">
                If you receive a damaged or defective product, please contact us immediately at <a href="mailto:kayla@epochskin.com" className="text-clay-600 hover:text-clay-700">kayla@epochskin.com</a> with photos of the damage. We'll arrange for a replacement or full refund, and we'll cover return shipping costs.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Refunds</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Once your return is received and inspected:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Approved refunds will be processed within 5-7 business days</li>
                <li>Refunds will be issued to the original payment method</li>
                <li>Please allow additional time for your bank to process the refund</li>
                <li>Original shipping costs are non-refundable (unless the item was defective)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Questions?</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about shipping or returns, we're here to help:
              </p>
              <div className="mt-4 text-gray-700">
                <p>Email: <a href="mailto:kayla@epochskin.com" className="text-clay-600 hover:text-clay-700">kayla@epochskin.com</a></p>
                <p>Phone: <a href="tel:5047774094" className="text-clay-600 hover:text-clay-700">(504) 777-4094</a></p>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
}
