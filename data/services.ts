import type { Service } from "@/lib/types";

export type ServiceGender = "all" | "women" | "men";

export interface ServiceWithGender extends Service {
  gender: ServiceGender;
}

export const services: ServiceWithGender[] = [
  // ═══════════════════════════════════════════
  // WOMEN'S BODY WAXING
  // ═══════════════════════════════════════════
  {
    id: "brazilian-wax",
    slug: "brazilian-wax",
    name: "Brazilian Wax",
    price: 75,
    duration: "37 min",
    description: "Complete Brazilian waxing with premium organic wax for smooth, long-lasting results.",
    category: "body-waxing" as const,
    gender: "women",
    popular: true,
    benefits: ["Complete removal", "Premium organic wax", "Licensed estheticians"],
    image: "/images/services/brazilian-wax.png"
  },
  {
    id: "bikini-wax",
    slug: "bikini-wax",
    name: "Bikini Line Wax",
    price: 50,
    duration: "25 min",
    description: "Classic bikini line waxing for clean, smooth results.",
    category: "body-waxing" as const,
    gender: "women",
    benefits: ["Classic style", "Quick service", "Licensed estheticians"],
    image: "/images/services/bikini-wax.png"
  },
  {
    id: "french-bikini-wax",
    slug: "french-bikini-wax",
    name: "French Bikini Wax",
    price: 60,
    duration: "30 min",
    description: "Extended bikini waxing with more coverage than basic bikini line.",
    category: "body-waxing" as const,
    gender: "women",
    benefits: ["Extended coverage", "Professional care", "Licensed estheticians"],
    image: "/images/services/bikini-wax.png"
  },
  {
    id: "full-leg-wax-women",
    slug: "full-leg-wax-women",
    name: "Full Leg Wax",
    price: 85,
    duration: "52 min",
    description: "Complete leg waxing from ankle to thigh for silky smooth skin.",
    category: "body-waxing" as const,
    gender: "women",
    popular: true,
    benefits: ["Full coverage", "Long-lasting smooth skin", "Licensed estheticians"],
    image: "/images/services/full-leg-waxing.png"
  },
  {
    id: "half-leg-wax-women",
    slug: "half-leg-wax-women",
    name: "Half Leg Wax",
    price: 55,
    duration: "35 min",
    description: "Lower or upper leg waxing for targeted smooth results.",
    category: "body-waxing" as const,
    gender: "women",
    benefits: ["Targeted area", "Quick service", "Licensed estheticians"],
    image: "/images/services/half-leg-wax.png"
  },
  {
    id: "full-arm-wax-women",
    slug: "full-arm-wax-women",
    name: "Full Arm Wax",
    price: 65,
    duration: "37 min",
    description: "Complete arm waxing from shoulder to wrist.",
    category: "body-waxing" as const,
    gender: "women",
    benefits: ["Complete coverage", "Smooth results", "Licensed estheticians"],
    image: "/images/services/arm-wax.png"
  },
  {
    id: "half-arm-wax-women",
    slug: "half-arm-wax-women",
    name: "Half Arm Wax",
    price: 42,
    duration: "25 min",
    description: "Forearm or upper arm waxing for smooth, hair-free skin.",
    category: "body-waxing" as const,
    gender: "women",
    benefits: ["Targeted area", "Quick service", "Licensed estheticians"],
    image: "/images/services/arm-wax.png"
  },
  {
    id: "underarm-wax-women",
    slug: "underarm-wax-women",
    name: "Underarm Wax",
    price: 37,
    duration: "17 min",
    description: "Quick and effective underarm hair removal.",
    category: "body-waxing" as const,
    gender: "women",
    benefits: ["Quick service", "Effective removal", "Licensed estheticians"],
    image: "/images/services/underarm-wax.png"
  },
  {
    id: "stomach-wax-women",
    slug: "stomach-wax-women",
    name: "Stomach Wax",
    price: 35,
    duration: "25 min",
    description: "Stomach or happy trail waxing for smooth skin.",
    category: "body-waxing" as const,
    gender: "women",
    benefits: ["Targeted area", "Clean results", "Licensed estheticians"],
    image: "/images/services/stomach-wax.png"
  },

  // ═══════════════════════════════════════════
  // WOMEN'S FACIAL WAXING
  // ═══════════════════════════════════════════
  {
    id: "full-face-wax-women",
    slug: "full-face-wax-women",
    name: "Full Face Wax",
    price: 60,
    duration: "30 min",
    description: "Complete facial waxing including lip, chin, cheeks, and sideburns.",
    category: "facial-waxing" as const,
    gender: "women",
    popular: true,
    benefits: ["Complete coverage", "Smooth complexion", "Licensed estheticians"],
    image: "/images/services/wax.png"
  },
  {
    id: "eyebrow-wax-women",
    slug: "eyebrow-wax-women",
    name: "Eyebrow Wax",
    price: 27,
    duration: "17 min",
    description: "Professional eyebrow shaping and waxing for perfectly sculpted brows.",
    category: "facial-waxing" as const,
    gender: "women",
    benefits: ["Professional shaping", "Quick service", "Licensed estheticians"],
    image: "/images/services/eyebrow-wax.png"
  },
  {
    id: "lip-wax-women",
    slug: "lip-wax-women",
    name: "Lip Wax",
    price: 16,
    duration: "7 min",
    description: "Gentle upper lip waxing for smooth, hair-free skin.",
    category: "facial-waxing" as const,
    gender: "women",
    benefits: ["Gentle process", "Fast results", "Licensed estheticians"],
    image: "/images/services/wax.png"
  },
  {
    id: "chin-wax-women",
    slug: "chin-wax-women",
    name: "Chin Wax",
    price: 20,
    duration: "12 min",
    description: "Precise chin waxing for a clean, smooth appearance.",
    category: "facial-waxing" as const,
    gender: "women",
    benefits: ["Precise technique", "Clean results", "Licensed estheticians"],
    image: "/images/services/wax.png"
  },
  {
    id: "nose-wax-women",
    slug: "nose-wax-women",
    name: "Nose Wax",
    price: 20,
    duration: "7 min",
    description: "Quick and effective nose hair removal.",
    category: "facial-waxing" as const,
    gender: "women",
    benefits: ["Quick service", "Clean results", "Licensed estheticians"],
    image: "/images/services/wax.png"
  },

  // ═══════════════════════════════════════════
  // MEN'S BODY WAXING
  // ═══════════════════════════════════════════
  {
    id: "brozilian-wax",
    slug: "brozilian-wax",
    name: "Brozilian Wax",
    price: 95,
    duration: "50 min",
    description: "Complete Brazilian waxing for men with premium organic wax.",
    category: "body-waxing" as const,
    gender: "men",
    popular: true,
    benefits: ["Full removal or shaped", "Premium care", "Licensed estheticians"],
    image: "/images/services/brazilian-wax.png"
  },
  {
    id: "boyzilian-wax",
    slug: "boyzilian-wax",
    name: "Boyzilian Wax",
    price: 75,
    duration: "37 min",
    description: "Men's bikini and extended area waxing.",
    category: "body-waxing" as const,
    gender: "men",
    benefits: ["Targeted area", "Professional technique", "Licensed estheticians"],
    image: "/images/services/brazilian-wax.png"
  },
  {
    id: "back-wax",
    slug: "back-wax",
    name: "Back Wax",
    price: 80,
    duration: "40 min",
    description: "Complete back waxing for smooth, hair-free skin.",
    category: "body-waxing" as const,
    gender: "men",
    popular: true,
    benefits: ["Full coverage", "Smooth results", "Licensed estheticians"],
    image: "/images/services/back-wax.png"
  },
  {
    id: "chest-wax",
    slug: "chest-wax",
    name: "Chest Wax",
    price: 65,
    duration: "32 min",
    description: "Full chest waxing for a clean, groomed appearance.",
    category: "body-waxing" as const,
    gender: "men",
    popular: true,
    benefits: ["Clean finish", "Professional technique", "Licensed estheticians"],
    image: "/images/services/chest-wax.png"
  },
  {
    id: "chest-abs-wax",
    slug: "chest-abs-wax",
    name: "Chest & Abs Wax",
    price: 90,
    duration: "45 min",
    description: "Combined chest and stomach waxing for complete upper body smoothness.",
    category: "body-waxing" as const,
    gender: "men",
    benefits: ["Full upper body", "Combined service", "Licensed estheticians"],
    image: "/images/services/chest-wax.png"
  },
  {
    id: "stomach-wax-men",
    slug: "stomach-wax-men",
    name: "Stomach Wax",
    price: 52,
    duration: "27 min",
    description: "Happy trail or full stomach waxing.",
    category: "body-waxing" as const,
    gender: "men",
    benefits: ["Targeted area", "Clean results", "Licensed estheticians"],
    image: "/images/services/stomach-wax.png"
  },
  {
    id: "shoulders-wax",
    slug: "shoulders-wax",
    name: "Shoulders Wax",
    price: 40,
    duration: "20 min",
    description: "Shoulder waxing for smooth, well-groomed skin.",
    category: "body-waxing" as const,
    gender: "men",
    benefits: ["Quick service", "Smooth results", "Licensed estheticians"],
    image: "/images/services/shoulders-wax.png"
  },
  {
    id: "back-shoulders-wax",
    slug: "back-shoulders-wax",
    name: "Back & Shoulders Wax",
    price: 105,
    duration: "50 min",
    description: "Combined back and shoulders waxing for complete upper body smoothness.",
    category: "body-waxing" as const,
    gender: "men",
    popular: true,
    benefits: ["Full coverage", "Complete upper body", "Licensed estheticians"],
    image: "/images/services/back-wax.png"
  },
  {
    id: "full-arm-wax-men",
    slug: "full-arm-wax-men",
    name: "Full Arm Wax",
    price: 72,
    duration: "42 min",
    description: "Complete arm waxing from shoulder to wrist.",
    category: "body-waxing" as const,
    gender: "men",
    benefits: ["Complete coverage", "Smooth results", "Licensed estheticians"],
    image: "/images/services/arm-wax.png"
  },
  {
    id: "half-arm-wax-men",
    slug: "half-arm-wax-men",
    name: "Half Arm Wax",
    price: 50,
    duration: "25 min",
    description: "Forearm or upper arm waxing.",
    category: "body-waxing" as const,
    gender: "men",
    benefits: ["Targeted area", "Quick service", "Licensed estheticians"],
    image: "/images/services/arm-wax.png"
  },
  {
    id: "full-leg-wax-men",
    slug: "full-leg-wax-men",
    name: "Full Leg Wax",
    price: 95,
    duration: "55 min",
    description: "Complete leg waxing from thigh to ankle.",
    category: "body-waxing" as const,
    gender: "men",
    benefits: ["Full coverage", "Smooth results", "Licensed estheticians"],
    image: "/images/services/full-leg-waxing.png"
  },
  {
    id: "underarm-wax-men",
    slug: "underarm-wax-men",
    name: "Underarm Wax",
    price: 45,
    duration: "20 min",
    description: "Quick and effective underarm hair removal.",
    category: "body-waxing" as const,
    gender: "men",
    benefits: ["Quick service", "Effective removal", "Licensed estheticians"],
    image: "/images/services/underarm-wax.png"
  },

  // ═══════════════════════════════════════════
  // MEN'S FACIAL WAXING
  // ═══════════════════════════════════════════
  {
    id: "full-face-wax-men",
    slug: "full-face-wax-men",
    name: "Full Face Wax",
    price: 67,
    duration: "37 min",
    description: "Complete facial waxing including neck and beard line shaping.",
    category: "facial-waxing" as const,
    gender: "men",
    benefits: ["Full facial grooming", "Beard line shaping", "Licensed estheticians"],
    image: "/images/services/wax.png"
  },
  {
    id: "eyebrow-wax-men",
    slug: "eyebrow-wax-men",
    name: "Eyebrow Shape",
    price: 32,
    duration: "20 min",
    description: "Professional eyebrow grooming and shape for men.",
    category: "facial-waxing" as const,
    gender: "men",
    benefits: ["Clean grooming", "Professional shaping", "Licensed estheticians"],
    image: "/images/services/eyebrow-wax.png"
  },
  {
    id: "nose-wax-men",
    slug: "nose-wax-men",
    name: "Nose Wax",
    price: 27,
    duration: "12 min",
    description: "Quick and effective nose hair removal.",
    category: "facial-waxing" as const,
    gender: "men",
    benefits: ["Quick service", "Clean results", "Licensed estheticians"],
    image: "/images/services/wax.png"
  },
  {
    id: "ear-wax-men",
    slug: "ear-wax-men",
    name: "Ear Wax",
    price: 27,
    duration: "12 min",
    description: "Professional ear hair removal.",
    category: "facial-waxing" as const,
    gender: "men",
    benefits: ["Quick service", "Professional technique", "Licensed estheticians"],
    image: "/images/services/wax.png"
  },

  // ═══════════════════════════════════════════
  // ORGANIC FACIALS (NO GENDER)
  // ═══════════════════════════════════════════
  {
    id: "organic-facial",
    slug: "organic-facial",
    name: "Organic Facial",
    price: 85,
    duration: "60 min",
    description: "Custom facial using our organic products for deep hydration and radiant glow.",
    category: "specialty-treatments" as const,
    gender: "all",
    popular: true,
    benefits: ["Deep hydration", "Organic products", "Custom treatment", "Licensed estheticians"],
    image: "/images/services/organic-facial.png"
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
    image: "/images/services/glass-skin.png"
  },
];

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