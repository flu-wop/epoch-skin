import { Container } from "@/components/layout/Container";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ServicesPage() {
  const serviceCategories = [
    {
      title: "Body Waxing",
      description: "Full body waxing services including Brazilian, bikini, legs, arms, and more",
      services: ["Brazilian", "Bikini", "Full Legs", "Half Legs", "Full Arms", "Half Arms", "Underarm", "Stomach"],
      link: "/book?category=body-wax"
    },
    {
      title: "Facial Waxing",
      description: "Precision facial waxing for eyebrows, lip, chin, and more",
      services: ["Full Face", "Eyebrow", "Lip", "Chin", "Nose"],
      link: "/book?category=facial-wax"
    },
    {
      title: "Organic Facials",
      description: "Luxurious Organic facial treatments using glass skin layering technique",
      services: ["Organic Facial", "Glass Skin Treatment"],
      link: "/book?category=facials"
    }
  ];

  return (
    <main className="min-h-screen py-20">
      <Container>
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">
            Our Services
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Expert waxing and Organic facial treatments in New Orleans
          </p>
        </div>

        {/* Service Categories */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {serviceCategories.map((category) => (
            <div key={category.title} className="bg-white border border-sage-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-serif font-semibold text-clay-600 mb-3">
                {category.title}
              </h2>
              <p className="text-gray-600 mb-4">
                {category.description}
              </p>
              <ul className="space-y-2 mb-6">
                {category.services.map((service) => (
                  <li key={service} className="flex items-center text-sm text-gray-700">
                    <svg className="w-4 h-4 text-sage-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {service}
                  </li>
                ))}
              </ul>
              <Button asChild className="w-full bg-clay-500 hover:bg-clay-600">
                <Link href={category.link}>Book Now</Link>
              </Button>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-sage-50 rounded-lg p-8 max-w-3xl mx-auto">
          <h3 className="text-2xl font-serif text-gray-900 mb-4">
            Not sure which service is right for you?
          </h3>
          <p className="text-gray-600 mb-6">
            Contact us and we'll help you choose the perfect treatment for your needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-clay-500 hover:bg-clay-600">
              <Link href="/book">Book Appointment</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
}
