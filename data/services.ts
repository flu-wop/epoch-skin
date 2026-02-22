// Import the Service type from lib/types
import type { Service } from "@/lib/types";

// Gender type for service filtering
export type ServiceGender = "all" | "women" | "men";

// Extended Service type with gender field
export interface ServiceWithGender extends Service {
  gender: ServiceGender;
}

// ──────────────────────────────────────────────
// Services Data - WITH GENDER FIELD
// ──────────────────────────────────────────────

export const services: ServiceWithGender[] = [
  // Facial Waxing Services - ALL GENDERS
  {
    id: "eyebrow-wax",
    slug: "eyebrow-wax",
    name: "Eyebrow Wax",
    price: 25,
    duration: "15 min",
    description: "Professional eyebrow shaping and waxing for perfectly sculpted brows, performed by licensed estheticians.",
    category: "facial-waxing" as const,
    gender: "all",
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
    category: "facial-waxing" as const,
    gender: "all",
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
    category: "facial-waxing" as const,
    gender: "all",
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
    category: "facial-waxing" as const,
    gender: "all",
    popular: true,
    benefits: ["Complete coverage", "Smooth results", "Licensed estheticians"],
    image: "/images/services/full-face-wax.jpg"
  },
  
  // Body Waxing Services - ALL GENDERS
  {
    id: "underarm-wax",
    slug: "underarm-wax",
    name: "Underarm Wax",
    price: 30,
    duration: "20 min",
    description: "Quick and effective underarm hair removal, performed by licensed estheticians.",
    category: "body-waxing" as const,
    gender: "all",
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
    category: "body-waxing" as const,
    gender: "all",
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
    category: "body-waxing" as const,
    gender: "all",
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
    category: "body-waxing" as const,
    gender: "all",
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
    category: "body-waxing" as const,
    gender: "all",
    popular: true,
    benefits: ["Complete coverage", "Smooth results", "Licensed estheticians"],
    image: "/images/services/full-leg-wax.jpg"
  },
// Add these AFTER the "full-leg-wax" service and BEFORE "bikini-wax"

{
  id: "stomach-strip",
  slug: "stomach-strip",
  name: "Stomach Strip",
  price: 25,
  duration: "15 min",
  description: "Targeted waxing for the stomach strip area, performed by licensed estheticians.",
  category: "body-waxing" as const,
  gender: "all",
  benefits: ["Quick service", "Clean results", "Licensed estheticians"],
  image: "/images/services/stomach-strip.jpg"
},
{
  id: "full-stomach-wax",
  slug: "full-stomach-wax",
  name: "Full Stomach Wax",
  price: 40,
  duration: "25 min",
  description: "Complete stomach waxing for smooth, hair-free skin, performed by licensed estheticians.",
  category: "body-waxing" as const,
  gender: "all",
  benefits: ["Full coverage", "Smooth finish", "Licensed estheticians"],
  image: "/images/services/full-stomach-wax.jpg"
},
  {
    id: "bikini-wax",
    slug: "bikini-wax",
    name: "Bikini Wax",
    price: 45,
    duration: "25 min",
    description: "Classic bikini line waxing, performed by licensed estheticians.",
    category: "body-waxing" as const,
    gender: "women",
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
    category: "body-waxing" as const,
    gender: "women",
    popular: true,
    benefits: ["Complete removal", "Premium care", "Licensed estheticians"],
    image: "/images/services/brazilian-wax.jpg"
  },
  
  // Specialty Treatments (Facials) - ALL GENDERS
  {
    id: "organic-facial",
    slug: "organic-facial",
    name: "Organic Facial",
    price: 85,
    duration: "60 min",
    description: "Custom facial using our organic products for deep hydration and glow, performed by licensed estheticians.",
    category: "specialty-treatments" as const,
    gender: "all",
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
    category: "specialty-treatments" as const,
    gender: "all",
    popular: true,
    benefits: ["K-Beauty technique", "Radiant glow", "Organic masking", "Licensed estheticians"],
    image: "/images/services/glass-skin.jpg"
  },
  
  // Men-Specific Services (PLACEHOLDERS)
  {
    id: "back-wax",
    slug: "back-wax",
    name: "Back Wax",
    price: 65,
    duration: "45 min",
    description: "Complete back waxing for smooth, hair-free skin, performed by licensed estheticians.",
    category: "body-waxing" as const,
    gender: "men",
    benefits: ["Full coverage", "Professional technique", "Licensed estheticians"],
    image: "/images/services/back-wax.jpg"
  },
  {
    id: "chest-wax",
    slug: "chest-wax",
    name: "Chest Wax",
    price: 60,
    duration: "40 min",
    description: "Chest waxing service for a clean, groomed appearance, performed by licensed estheticians.",
    category: "body-waxing" as const,
    gender: "men",
    benefits: ["Clean finish", "Quick process", "Licensed estheticians"],
    image: "/images/services/chest-wax.jpg"
  },
  {
    id: "shoulders-wax",
    slug: "shoulders-wax",
    name: "Shoulders Wax",
    price: 45,
    duration: "30 min",
    description: "Shoulder waxing for smooth, well-groomed skin, performed by licensed estheticians.",
    category: "body-waxing" as const,
    gender: "men",
    benefits: ["Precise grooming", "Smooth results", "Licensed estheticians"],
    image: "/images/services/shoulders-wax.jpg"
  }
];

// ──────────────────────────────────────────────
// Helper Functions
// ──────────────────────────────────────────────

export const serviceCategories = [
  "All Services",
  "Facial Waxing",
  "Body Waxing",
  "Specialty Treatments"
];

export function getFeaturedServices(): ServiceWithGender[] {
  return services.filter(service => service.popular);
}

export function getServicesByCategory(category: string): ServiceWithGender[] {
  if (category === "All Services") {
    return services;
  }
  return services.filter(service => service.category === category);
}

export function getServicesByGender(gender: ServiceGender): ServiceWithGender[] {
  if (gender === "all") {
    return services;
  }
  return services.filter(service => service.gender === gender || service.gender === "all");
}
