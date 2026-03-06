import { Container } from "@/components/layout/Container";
import { Award, Heart, Leaf, ShieldCheck } from "lucide-react";

export function TrustBadges() {
  const badges = [
    { 
      icon: Leaf,
      name: "Organic Certified",
      description: "USDA Organic Ingredients"
    },
    { 
      icon: Heart,
      name: "Cruelty-Free",
      description: "Never tested on animals"
    },
    { 
      icon: ShieldCheck,
      name: "Licensed Professionals",
      description: "State board certified"
    },
    { 
      icon: Award,
      name: "Premium Quality",
      description: "Trusted by thousands"
    },
  ];

  return (
    <section className="py-8 border-y border-sage-100 bg-sage-50/30">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.name}
                className="flex flex-col items-center text-center gap-3 p-4 rounded-lg hover:bg-white transition-colors group"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-sage-200 rounded-full opacity-20 group-hover:opacity-30 transition-opacity" />
                  <Icon className="h-8 w-8 text-sage-700 relative z-10" />
                </div>
                <div>
                  <p className="font-medium text-sm text-gray-900">{badge.name}</p>
                  <p className="text-xs text-gray-600 mt-1">{badge.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}