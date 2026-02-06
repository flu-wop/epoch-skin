// types/index.ts (or lib/types.ts)

// ──────────────────────────────────────────────
// Service Types
// ──────────────────────────────────────────────



export type ServiceCategory =
  | "body-waxing"
  | "facial-waxing"
  | "specialty-treatments";

// ──────────────────────────────────────────────
// Service Data
// ──────────────────────────────────────────────

export const services: Service[] = [
  // Body Waxing
  {
    id: "full-leg",
    name: "Full Leg Waxing",
    slug: "full-leg-waxing",
    category: "body-waxing",
    price: 85,
    duration: "50 min",
    description: "Complete leg waxing from thighs to toes for silky smooth skin.",
    benefits: ["Long-lasting smoothness", "Gentle exfoliation", "Reduced ingrown hairs"],
    image: "/images/services/full-leg.jpg",
    popular: true,
  },
  {
    id: "half-leg",
    name: "Half Leg Wax",
    slug: "half-leg-wax",
    category: "body-waxing",
    price: 50,
    duration: "30 min",
    description: "Lower or upper leg waxing for smooth, flawless results.",
    benefits: ["Quick session", "Smooth finish", "Minimal discomfort"],
    image: "/images/services/half-leg.jpg",
  },
  {
    id: "brazilian",
    name: "Brazilian Wax",
    slug: "brazilian-wax",
    category: "body-waxing",
    price: 70,
    duration: "35 min",
    description: "Complete Brazilian waxing with expert care and premium products.",
    benefits: ["Clean, confident results", "Gentle technique", "Long-lasting"],
    image: "/images/services/brazilian.jpg",
    popular: true,
  },
  {
    id: "bikini",
    name: "Bikini Wax",
    slug: "bikini-wax",
    category: "body-waxing",
    price: 45,
    duration: "25 min",
    description: "Classic bikini line waxing for a neat, smooth appearance.",
    benefits: ["Precise shaping", "Comfortable process", "Quick recovery"],
    image: "/images/services/bikini.jpg",
  },
  // Add more body waxing services as needed...

  // Facial Waxing
  {
    id: "full-face",
    name: "Full Face Wax",
    slug: "full-face-wax",
    category: "facial-waxing",
    price: 55,
    duration: "30 min",
    description: "Complete facial waxing for a flawless, radiant complexion.",
    benefits: ["Smooth skin", "Brightened appearance", "Gentle on sensitive areas"],
    image: "/images/services/full-face.jpg",
    popular: true,
  },
  {
    id: "lip",
    name: "Lip Wax",
    slug: "lip-wax",
    category: "facial-waxing",
    price: 15,
    duration: "10 min",
    description: "Gentle upper lip waxing for a clean, polished look.",
    benefits: ["Quick and precise", "Minimal irritation", "Smooth finish"],
    image: "/images/services/lip.jpg",
  },
  {
    id: "chin",
    name: "Chin Wax",
    slug: "chin-wax",
    category: "facial-waxing",
    price: 20,
    duration: "15 min",
    description: "Targeted chin waxing to remove unwanted hair cleanly.",
    benefits: ["Precise results", "Comfortable technique", "Smooth skin"],
    image: "/images/services/chin.jpg",
  },
  // Add more facial waxing services as needed...

  // Specialty Treatments (example)
  {
    id: "organic-facial",
    name: "Organic Facial",
    slug: "organic-facial",
    category: "specialty-treatments",
    price: 85,
    duration: "60 min",
    description: "Custom facial using certified organic products for deep hydration and glow.",
    benefits: ["Nourished skin", "Natural radiance", "Relaxing experience"],
    image: "/images/services/organic-facial.jpg",
    popular: true,
  },
];

// Helper: featured / popular services
export function getFeaturedServices(): Service[] {
  return services.filter((service) => service.popular);
}

// Helper: services by category
export function getServicesByCategory(category: string): Service[] {
  if (category === "All Services") {
    return services;
  }
  return services.filter((service) => service.category === category);
}