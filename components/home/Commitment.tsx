import { Container } from "@/components/layout/Container";
import Image from "next/image";

export default function Commitment() {
  const commitments = [
    {
      title: "Certified Organic Ingredients",
      description: "Every product is formulated with certified Organic Ingredients—no synthetic pesticides, fertilizers, or GMOs. Just pure, clean Skincare that's better for you and the planet.",
    },
    {
      title: "Cruelty-Free & Ethical",
      description: "We never test on animals and source only from suppliers who share our commitment to ethical, sustainable practices.",
    },
    {
      title: "Licensed Estheticians",
      description: "All services are performed by Louisiana State Board licensed estheticians with specialized training in Organic Skin Care and gentle waxing techniques.",
    },
    {
      title: "Transparent Formulations",
      description: "Full ingredient transparency with INCI listings, clear usage instructions, and honest communication about what goes into every product.",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-white">
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-gray-900 mb-6">
              Our Commitment to You
            </h2>
            
            {/* USDA Logo UNDER title */}
            <div className="flex justify-center mb-6">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/USDA_organic_seal.svg/200px-USDA_organic_seal.svg.png"
                alt="USDA Organic Certified"
                width={120}
                height={120}
                className="w-30 h-30"
              />
            </div>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Premium Organic Skincare backed by expertise, ethics, and results
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {commitments.map((item, index) => (
              <div key={index} className="text-center">
                <h3 className="text-xl font-serif font-semibold text-clay-600 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
