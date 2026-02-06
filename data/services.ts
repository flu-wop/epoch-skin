import { Service } from "@/lib/types";

export const services: Service[] = [
  {
    id: "1",
    name: "Brazilian Wax",
    slug: "brazilian-wax",
    category: "body-waxing",
    price: 65,
    duration: 45,
    description: "Our signature Brazilian wax treatment provides smooth, long-lasting results. We use premium, gentle wax formulated for sensitive areas, ensuring maximum comfort throughout your service.",
    benefits: [
      "Lasts 3-4 weeks",
      "Reduces hair growth over time",
      "Smoother than shaving",
      "Professional, discreet service"
    ],
    image: "/images/services/brazilian-wax.jpg",
  },
  {
    id: "2",
    name: "Full Leg Wax",
    slug: "full-leg-wax",
    category: "body-waxing",
    price: 75,
    duration: 60,
    description: "Complete leg waxing from toes to upper thighs. Our technique ensures thorough hair removal with minimal discomfort, leaving your legs silky smooth for weeks.",
    benefits: [
      "Includes both legs completely",
      "Exfoliates while removing hair",
      "Long-lasting smoothness",
      "No razor burn or bumps"
    ],
    image: "/images/services/leg-wax.jpg",
  },
  {
    id: "3",
    name: "Underarm Wax",
    slug: "underarm-wax",
    category: "body-waxing",
    price: 25,
    duration: 15,
    description: "Quick and effective underarm waxing for smooth, hair-free underarms. Our gentle formula is perfect for this sensitive area.",
    benefits: [
      "Quick 15-minute service",
      "Lasts longer than shaving",
      "Reduces odor-causing bacteria",
      "Can lighten dark underarms over time"
    ],
    image: "/images/services/underarm-wax.jpg",
  },
  {
    id: "4",
    name: "Eyebrow Shaping",
    slug: "eyebrow-shaping",
    category: "facial-waxing",
    price: 22,
    duration: 20,
    description: "Expert eyebrow shaping and waxing to frame your face beautifully. We'll consult with you to achieve your desired brow shape while maintaining a natural look.",
    benefits: [
      "Custom shape consultation",
      "Precise, clean results",
      "Lasts 3-4 weeks",
      "Defines facial features"
    ],
    image: "/images/services/eyebrow-wax.jpg",
  },
  {
    id: "5",
    name: "Upper Lip Wax",
    slug: "upper-lip-wax",
    category: "facial-waxing",
    price: 15,
    duration: 10,
    description: "Gentle and precise upper lip waxing using our specially formulated facial wax. Quick, effective, and virtually painless.",
    benefits: [
      "Fast 10-minute treatment",
      "Gentle on sensitive facial skin",
      "Precise hair removal",
      "No harsh chemicals"
    ],
    image: "/images/services/lip-wax.jpg",
  },
  {
    id: "6",
    name: "Full Face Wax",
    slug: "full-face-wax",
    category: "facial-waxing",
    price: 45,
    duration: 30,
    description: "Complete facial waxing including brows, upper lip, chin, cheeks, and sideburns. Achieve smooth, radiant skin with our comprehensive facial wax service.",
    benefits: [
      "Complete facial hair removal",
      "Exfoliates dead skin cells",
      "Creates smooth makeup application",
      "Reveals brighter complexion"
    ],
    image: "/images/services/face-wax.jpg",
  },
  {
    id: "7",
    name: "Back Wax",
    slug: "back-wax",
    category: "body-waxing",
    price: 55,
    duration: 40,
    description: "Full back waxing service for smooth, hair-free skin. Our efficient technique covers the entire back area with minimal discomfort.",
    benefits: [
      "Complete back coverage",
      "Long-lasting results",
      "Reduces ingrown hairs",
      "Perfect for summer confidence"
    ],
    image: "/images/services/back-wax.jpg",
  },
  {
    id: "8",
    name: "Bikini Wax",
    slug: "bikini-wax",
    category: "body-waxing",
    price: 45,
    duration: 30,
    description: "Classic bikini line waxing for a clean, beach-ready look. We remove hair outside the panty line for a natural appearance.",
    benefits: [
      "Perfect for swimsuit season",
      "Less extensive than Brazilian",
      "Professional and private",
      "Lasts 3-4 weeks"
    ],
    image: "/images/services/bikini-wax.jpg",
  },
  {
    id: "9",
    name: "Chin Wax",
    slug: "chin-wax",
    category: "facial-waxing",
    price: 18,
    duration: 15,
    description: "Gentle chin waxing to remove unwanted facial hair. Our technique is specially designed for the delicate chin area.",
    benefits: [
      "Quick and effective",
      "Gentle on sensitive skin",
      "Smooth, clean results",
      "Can be combined with other facial services"
    ],
    image: "/images/services/chin-wax.jpg",
  },
  {
    id: "10",
    name: "Half Leg Wax",
    slug: "half-leg-wax",
    category: "body-waxing",
    price: 45,
    duration: 35,
    description: "Lower leg waxing from ankles to knees. Perfect for those who prefer partial leg hair removal or as maintenance between full leg waxes.",
    benefits: [
      "Covers lower legs completely",
      "Shorter appointment time",
      "Great for maintenance",
      "Smooth, lasting results"
    ],
    image: "/images/services/half-leg-wax.jpg",
  },
];

// Helper function to get featured services (top 4)
export function getFeaturedServices(): Service[] {
  return services.slice(0, 4);
}

// Helper function to get service by slug
export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(service => service.slug === slug);
}

// Helper function to get services by category
export function getServicesByCategory(category: string): Service[] {
  return services.filter(service => service.category === category);
}
