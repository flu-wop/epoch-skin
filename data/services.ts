// Service Type Definition
export interface Service {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
  category: string;
  popular?: boolean;
}

// ──────────────────────────────────────────────
// Services Data
// ──────────────────────────────────────────────

export const services: Service[] = [
  // Waxing Services
  {
    id: "eyebrow-wax",
    name: "Eyebrow Wax",
    price: 25,
    duration: "15 min",
    description: "Professional eyebrow shaping and waxing for perfectly sculpted brows, performed by licensed estheticians.",
    category: "Waxing"
  },
  {
    id: "lip-wax",
    name: "Lip Wax",
    price: 15,
    duration: "10 min",
    description: "Gentle upper lip waxing for smooth, hair-free skin, performed by licensed estheticians.",
    category: "Waxing"
  },
  {
    id: "chin-wax",
    name: "Chin Wax",
    price: 20,
    duration: "15 min",
    description: "Precise chin waxing for a clean, smooth appearance, performed by licensed estheticians.",
    category: "Waxing"
  },
  {
    id: "full-face-wax",
    name: "Full Face Wax",
    price: 55,
    duration: "30 min",
    description: "Complete facial waxing service for ultimate smoothness, performed by licensed estheticians.",
    category: "Waxing",
    popular: true
  },
  {
    id: "underarm-wax",
    name: "Underarm Wax",
    price: 30,
    duration: "20 min",
    description: "Quick and effective underarm hair removal, performed by licensed estheticians.",
    category: "Waxing"
  },
  {
    id: "half-arm-wax",
    name: "Half Arm Wax",
    price: 40,
    duration: "25 min",
    description: "Smooth, hair-free lower or upper arms, performed by licensed estheticians.",
    category: "Waxing"
  },
  {
    id: "full-arm-wax",
    name: "Full Arm Wax",
    price: 65,
    duration: "40 min",
    description: "Complete arm waxing from shoulders to fingertips, performed by licensed estheticians.",
    category: "Waxing"
  },
  {
    id: "half-leg-wax",
    name: "Half Leg Wax",
    price: 50,
    duration: "30 min",
    description: "Lower or upper leg waxing for silky smooth skin, performed by licensed estheticians.",
    category: "Waxing"
  },
  {
    id: "full-leg-wax",
    name: "Full Leg Wax",
    price: 85,
    duration: "50 min",
    description: "Complete leg waxing from thighs to toes, performed by licensed estheticians.",
    category: "Waxing",
    popular: true
  },
  {
    id: "bikini-wax",
    name: "Bikini Wax",
    price: 45,
    duration: "25 min",
    description: "Classic bikini line waxing, performed by licensed estheticians.",
    category: "Waxing"
  },
  {
    id: "brazilian-wax",
    name: "Brazilian Wax",
    price: 70,
    duration: "35 min",
    description: "Complete Brazilian waxing service with premium care, performed by licensed estheticians.",
    category: "Waxing",
    popular: true
  },
  // Facial Services
  {
    id: "organic-facial",
    name: "Organic Facial",
    price: 85,
    duration: "60 min",
    description: "Custom facial using our organic products for deep hydration and glow, performed by licensed estheticians.",
    category: "Facial",
    popular: true
  },
  {
    id: "glass-skin-treatment",
    name: "Glass Skin Treatment",
    price: 95,
    duration: "75 min",
    description: "K-Beauty inspired session with organic masking and massage for plump, radiant skin.",
    category: "Facial",
    popular: true
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
