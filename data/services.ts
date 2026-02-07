// Service Type Definition
export interface Service {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
  category: string;
  popular?: boolean;
  slug: string;
  benefits: string[];
  image: string;
}

// ──────────────────────────────────────────────
// Services Data
// ──────────────────────────────────────────────

export const services: Service[] = [
  // Waxing Services
  {
    id: "eyebrow-wax",
    slug: "eyebrow-wax",
    name: "Eyebrow Wax",
    price: 25,
    duration: "15 min",
    description: "Professional eyebrow shaping and waxing for perfectly sculpted brows, performed by licensed estheticians.",
    category: "Waxing",
    benefits: ["Professional shaping", "Quick service", "Licensed estheticians"],
    image: "/images/services/eyebrow-wax.jpg"
  },
  {
    id: "lip-wax",
    slug: "lip-wax",
    name: "Lip Wax",
    price: 15,
    duration: "10 min",
    description: "Gentle upper lip waxing for smooth, hair-free skin, performed by licensed estheticians.",
    category: "Waxing",
    benefits: ["Gentle process", "Fast results", "Licensed estheticians"],
    image: "/images/services/lip-wax.jpg"
  },
  {
    id: "chin-wax",
    slug: "chin-wax",
    name: "Chin Wax",
    price: 20,
    duration: "15 min",
    description: "Precise chin waxing for a clean, smooth appearance, performed by licensed estheticians.",
    category: "Waxing",
    benefits: ["Precise technique", "Clean results", "Licensed estheticians"],
    image: "/images/services/chin-wax.jpg"
  },
  {
    id: "full-face-wax",
    slug: "full-face-wax",
    name: "Full Face Wax",
    price: 55,
    duration: "30 min",
    description: "Complete facial waxing service for ultimate smoothness, performed by licensed estheticians.",
    category: "Waxing",
    popular: true,
    benefits: ["Complete coverage", "Smooth results", "Licensed estheticians"],
    image: "/images/services/full-face-wax.jpg"
  },
  {
    id: "underarm-wax",
    slug: "underarm-wax",
    name: "Underarm Wax",
    price: 30,
    duration: "20 min",
    description: "Quick and effective underarm hair removal, performed by licensed estheticians.",
    category: "Waxing",
    benefits: ["Quick process", "Effective removal", "Licensed estheticians"],
    image: "/images/services/underarm-wax.jpg"
  },
  {
    id: "half-arm-wax",
    slug: "half-arm-wax",
    name: "Half Arm Wax",
    price: 40,
    duration: "25 min",
    description: "Smooth, hair-free lower or upper arms, performed by licensed estheticians.",
    category: "Waxing",
    benefits: ["Targeted areas", "Smooth skin", "Licensed estheticians"],
    image: "/images/services/half-arm-wax.jpg"
  },
  {
    id: "full-arm-wax",
    slug: "full-arm-wax",
    name: "Full Arm Wax",
    price: 65,
    duration: "40 min",
    description: "Complete arm waxing from shoulders to fingertips, performed by licensed estheticians.",
    category: "Waxing",
    benefits: ["Complete coverage", "Long-lasting", "Licensed estheticians"],
    image: "/images/services/full-arm-wax.jpg"
  },
  {
    id: "half-leg-wax",
    slug: "half-leg-wax",
    name: "Half Leg Wax",
    price: 50,
    duration: "30 min",
    description: "Lower or upper leg waxing for silky smooth skin, performed by licensed estheticians.",
    category: "Waxing",
    benefits: ["Silky smooth", "Targeted areas", "Licensed estheticians"],
    image: "/images/services/half-leg-wax.jpg"
  },
  {
    id: "full-leg-wax",
    slug: "full-leg-wax",
    name: "Full Leg Wax",
    price: 85,
    duration: "50 min",
    description: "Complete leg waxing from thighs to toes, performed by licensed estheticians.",
    category: "Waxing",
    popular: true,
    benefits: ["Complete coverage", "Smooth results", "Licensed estheticians"],
    image: "/images/services/full-leg-wax.jpg"
  },
  {
    id: "bikini-wax",
    slug: "bikini-wax",
    name: "Bikini Wax",
    price: 45,
    duration: "25 min",
    description: "Classic bikini line waxing, performed by licensed estheticians.",
    category: "Waxing",
    benefits: ["Classic style", "Professional care", "Licensed estheticians"],
    image: "/images/services/bikini-wax.jpg"
  },
  {
    id: "brazilian-wax",
    slug: "brazilian-wax",
    name: "Brazilian Wax",
    price: 70,
    duration: "35 min",
    description: "Complete Brazilian waxing service with premium care, performed by licensed estheticians.",
    category: "Waxing",
    popular: true,
    benefits: ["Complete removal", "Premium care", "Licensed estheticians"],
    image: "/images/services/brazilian-wax.jpg"
  },
  // Facial Services
  {
    id: "organic-facial",
    slug: "organic-facial",
    name: "Organic Facial",
    price: 85,
    duration: "60 min",
    description: "Custom facial using our organic products for deep hydration and glow, performed by licensed estheticians.",
    category: "Facial",
    popular: true,
    benefits: ["Deep hydration", "Organic products", "Custom treatment", "Licensed estheticians"],
    image: "/images/services/organic-facial.jpg"
  },
  {
    id: "glass-skin-treatment",
    slug: "glass-skin-treatment",
    name: "Glass Skin Treatment",
    price: 95,
    duration: "75 min",
    description: "K-Beauty inspired session with organic masking and massage for plump, radiant skin.",
    category: "Facial",
    popular: true,
    benefits: ["K-Beauty technique", "Radiant glow", "Organic masking", "Licensed estheticians"],
    image: "/images/services/glass-skin.jpg"
  }
];

// ──────────────────────────────────────────────
// Helper Functions
// ──────────────────────────────────────────────

export const serviceCategories = [
  "All Services",
  "Waxing",
  "Facial"
];

// Helper function to get featured/popular services
export function getFeaturedServices(): Service[] {
  return services.filter(service => service.popular);
}

// Helper function to get services by category
export function getServicesByCategory(category: string): Service[] {
  if (category === "All Services") {
    return services;
  }
  return services.filter(service => service.category === category);
}
