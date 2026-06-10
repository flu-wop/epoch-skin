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
    price: 50,
    duration: "37 min",
    description: "Complete Brazilian waxing with premium Organic wax for smooth, long-lasting results.",
    category: "body-waxing" as const,
    gender: "women",
    popular: true,
    benefits: ["Complete removal", "Premium Organic wax", "Licensed estheticians"],
    image: "/images/services/brazilian-wax.png",
    imageAlt: "Professional Brazilian waxing service for women at Epoch Skin"
  },
  {
    id: "bikini-wax",
    slug: "bikini-wax",
    name: "Bikini Line Wax",
    price: 30,
    duration: "15 min",
    description: "Classic bikini line waxing for clean, smooth results.",
    category: "body-waxing" as const,
    gender: "women",
    benefits: ["Classic style", "Quick service", "Licensed estheticians"],
    image: "/images/services/bikini-wax.png",
    imageAlt: "Classic bikini line waxing service"
  },
  {
    id: "french-bikini-wax",
    slug: "french-bikini-wax",
    name: "French Bikini Wax",
    price: 40,
    duration: "30 min",
    description: "Extended bikini waxing with more coverage than basic bikini line.",
    category: "body-waxing" as const,
    gender: "women",
    benefits: ["Extended coverage", "Professional care", "Licensed estheticians"],
    image: "/images/services/bikini-wax.png",
    imageAlt: "French bikini wax service"
  },
  {
    id: "full-leg-wax-women",
    slug: "full-leg-wax-women",
    name: "Full Leg Wax",
    price: 55,
    duration: "45 min",
    description: "Complete leg waxing from ankle to thigh for silky smooth skin.",
    category: "body-waxing" as const,
    gender: "women",
    popular: true,
    benefits: ["Full coverage", "Long-lasting smooth skin", "Licensed estheticians"],
    image: "/images/services/full-leg-waxing.png",
    imageAlt: "Full leg waxing service from ankle to thigh"
  },
  {
    id: "half-leg-wax-women",
    slug: "half-leg-wax-women",
    name: "Half Leg Wax",
    price: 35,
    duration: "35 min",
    description: "Lower or upper leg waxing for targeted smooth results.",
    category: "body-waxing" as const,
    gender: "women",
    benefits: ["Targeted area", "Quick service", "Licensed estheticians"],
    image: "/images/services/half-leg-wax.png",
    imageAlt: "Half leg waxing service"
  },
  {
    id: "full-arm-wax-women",
    slug: "full-arm-wax-women",
    name: "Full Arm Wax",
    price: 45,
    duration: "37 min",
    description: "Complete arm waxing from shoulder to wrist.",
    category: "body-waxing" as const,
    gender: "women",
    benefits: ["Complete coverage", "Smooth results", "Licensed estheticians"],
    image: "/images/services/arm-wax.png",
    imageAlt: "Full arm waxing service from shoulder to wrist"
  },
  {
    id: "half-arm-wax-women",
    slug: "half-arm-wax-women",
    name: "Half Arm Wax",
    price: 25,
    duration: "25 min",
    description: "Forearm or upper arm waxing for smooth, hair-free skin.",
    category: "body-waxing" as const,
    gender: "women",
    benefits: ["Targeted area", "Quick service", "Licensed estheticians"],
    image: "/images/services/arm-wax.png",
    imageAlt: "Half arm waxing service"
  },
  {
    id: "underarm-wax-women",
    slug: "underarm-wax-women",
    name: "Underarm Wax",
    price: 20,
    duration: "17 min",
    description: "Quick and effective underarm hair removal.",
    category: "body-waxing" as const,
    gender: "women",
    benefits: ["Quick service", "Effective removal", "Licensed estheticians"],
    image: "/images/services/underarm-wax.png",
    imageAlt: "Quick underarm waxing service"
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
    image: "/images/services/stomach-wax.png",
    imageAlt: "Stomach waxing service"
  },
  {
    id: "full-body-wax",
    slug: "full-body-wax",
    name: "Full Body Wax",
    price: 140,
    duration: "1–2 hrs",
    description: "Brazilian, underarm, and half leg waxing in one session. Epoch Skin's rosin-free Organic hybrid formula — shea butter, rosehip oil, and squalane — nourishes skin during removal for smooth, irritation-free results every time.",
    category: "body-waxing" as const,
    gender: "women",
    benefits: ["Complete head-to-toe coverage", "Rosin-free Organic wax", "Licensed estheticians"],
    image: "/images/services/full-leg-waxing.png",
    imageAlt: "Full body waxing service at Epoch Skin"
  },

  // ═══════════════════════════════════════════
  // WOMEN'S FACIAL WAXING
  // ═══════════════════════════════════════════
  {
    id: "full-face-wax-women",
    slug: "full-face-wax-women",
    name: "Full Face Wax",
    price: 40,
    duration: "30 min",
    description: "Complete facial waxing including lip, chin, cheeks, and sideburns.",
    category: "facial-waxing" as const,
    gender: "women",
    popular: true,
    benefits: ["Complete coverage", "Smooth complexion", "Licensed estheticians"],
    image: "/images/services/wax.png",
    imageAlt: "Full face waxing service"
  },
  {
    id: "eyebrow-wax-women",
    slug: "eyebrow-wax-women",
    name: "Eyebrow Wax",
    price: 13,
    duration: "17 min",
    description: "Professional eyebrow shaping and waxing for perfectly sculpted brows.",
    category: "facial-waxing" as const,
    gender: "women",
    benefits: ["Professional shaping", "Quick service", "Licensed estheticians"],
    image: "/images/services/eyebrow-wax.png",
    imageAlt: "Professional eyebrow waxing and shaping service"
  },
  {
    id: "lip-wax-women",
    slug: "lip-wax-women",
    name: "Lip Wax",
    price: 8,
    duration: "10 min",
    description: "Gentle upper lip waxing for smooth, hair-free skin.",
    category: "facial-waxing" as const,
    gender: "women",
    benefits: ["Gentle process", "Fast results", "Licensed estheticians"],
    image: "/images/services/wax.png",
    imageAlt: "Gentle upper lip waxing service"
  },
  {
    id: "chin-wax-women",
    slug: "chin-wax-women",
    name: "Chin Wax",
    price: 10,
    duration: "12 min",
    description: "Precise chin waxing for a clean, smooth appearance.",
    category: "facial-waxing" as const,
    gender: "women",
    benefits: ["Precise technique", "Clean results", "Licensed estheticians"],
    image: "/images/services/wax.png",
    imageAlt: "Precise chin waxing service"
  },
  {
    id: "nose-wax-women",
    slug: "nose-wax-women",
    name: "Nose Wax",
    price: 8,
    duration: "10 min",
    description: "Quick and effective nose hair removal.",
    category: "facial-waxing" as const,
    gender: "women",
    benefits: ["Quick service", "Clean results", "Licensed estheticians"],
    image: "/images/services/wax.png",
    imageAlt: "Quick nose hair waxing service"
  },

  // ═══════════════════════════════════════════
  // MEN'S BODY WAXING
  // ═══════════════════════════════════════════
  {
    id: "brozilian-wax",
    slug: "brozilian-wax",
    name: "Brozilian Wax",
    price: 60,
    duration: "45 min",
    description: "Complete Brazilian waxing for men with premium Organic wax.",
    category: "body-waxing" as const,
    gender: "men",
    popular: true,
    benefits: ["Full removal or shaped", "Premium care", "Licensed estheticians"],
    image: "/images/services/brazilian-wax.png",
    imageAlt: "Brozilian waxing service for men"
  },
  {
    id: "boyzilian-wax",
    slug: "boyzilian-wax",
    name: "Boyzilian Wax",
    price: 50,
    duration: "37 min",
    description: "Men's bikini and extended area waxing.",
    category: "body-waxing" as const,
    gender: "men",
    benefits: ["Targeted area", "Professional technique", "Licensed estheticians"],
    image: "/images/services/brazilian-wax.png",
    imageAlt: "Boyzilian waxing service for men"
  },
  {
    id: "back-wax",
    slug: "back-wax",
    name: "Back Wax",
    price: 55,
    duration: "40 min",
    description: "Complete back waxing for smooth, hair-free skin.",
    category: "body-waxing" as const,
    gender: "men",
    popular: true,
    benefits: ["Full coverage", "Smooth results", "Licensed estheticians"],
    image: "/images/services/back-wax.png",
    imageAlt: "Complete back waxing service for men"
  },
  {
    id: "chest-wax",
    slug: "chest-wax",
    name: "Chest Wax",
    price: 55,
    duration: "32 min",
    description: "Full chest waxing for a clean, groomed appearance.",
    category: "body-waxing" as const,
    gender: "men",
    popular: true,
    benefits: ["Clean finish", "Professional technique", "Licensed estheticians"],
    image: "/images/services/chest-wax.png",
    imageAlt: "Full chest waxing service for men"
  },
  {
    id: "chest-abs-wax",
    slug: "chest-abs-wax",
    name: "Chest & Abs Wax",
    price: 70,
    duration: "45 min",
    description: "Combined chest and stomach waxing for complete upper body smoothness.",
    category: "body-waxing" as const,
    gender: "men",
    benefits: ["Full upper body", "Combined service", "Licensed estheticians"],
    image: "/images/services/chest-wax.png",
    imageAlt: "Chest and abs waxing service for men"
  },
  {
    id: "stomach-wax-men",
    slug: "stomach-wax-men",
    name: "Stomach Wax",
    price: 35,
    duration: "27 min",
    description: "Happy trail or full stomach waxing.",
    category: "body-waxing" as const,
    gender: "men",
    benefits: ["Targeted area", "Clean results", "Licensed estheticians"],
    image: "/images/services/stomach-wax.png",
    imageAlt: "Men's stomach waxing service"
  },
  {
    id: "shoulders-wax",
    slug: "shoulders-wax",
    name: "Shoulders Wax",
    price: 30,
    duration: "20 min",
    description: "Shoulder waxing for smooth, well-groomed skin.",
    category: "body-waxing" as const,
    gender: "men",
    benefits: ["Quick service", "Smooth results", "Licensed estheticians"],
    image: "/images/services/shoulders-wax.png",
    imageAlt: "Shoulder waxing service for men"
  },
  {
    id: "back-shoulders-wax",
    slug: "back-shoulders-wax",
    name: "Back & Shoulders Wax",
    price: 80,
    duration: "50 min",
    description: "Combined back and shoulders waxing for complete upper body smoothness.",
    category: "body-waxing" as const,
    gender: "men",
    popular: true,
    benefits: ["Full coverage", "Complete upper body", "Licensed estheticians"],
    image: "/images/services/back-wax.png",
    imageAlt: "Back and shoulders waxing service for men"
  },
  {
    id: "full-arm-wax-men",
    slug: "full-arm-wax-men",
    name: "Full Arm Wax",
    price: 65,
    duration: "42 min",
    description: "Complete arm waxing from shoulder to wrist.",
    category: "body-waxing" as const,
    gender: "men",
    benefits: ["Complete coverage", "Smooth results", "Licensed estheticians"],
    image: "/images/services/arm-wax.png",
    imageAlt: "Full arm waxing service for men"
  },
  {
    id: "half-arm-wax-men",
    slug: "half-arm-wax-men",
    name: "Half Arm Wax",
    price: 45,
    duration: "25 min",
    description: "Forearm or upper arm waxing.",
    category: "body-waxing" as const,
    gender: "men",
    benefits: ["Targeted area", "Quick service", "Licensed estheticians"],
    image: "/images/services/arm-wax.png",
    imageAlt: "Half arm waxing service for men"
  },
  {
    id: "full-leg-wax-men",
    slug: "full-leg-wax-men",
    name: "Full Leg Wax",
    price: 75,
    duration: "55 min",
    description: "Complete leg waxing from thigh to ankle.",
    category: "body-waxing" as const,
    gender: "men",
    benefits: ["Full coverage", "Smooth results", "Licensed estheticians"],
    image: "/images/services/full-leg-waxing.png",
    imageAlt: "Full leg waxing service for men"
  },
  {
    id: "underarm-wax-men",
    slug: "underarm-wax-men",
    name: "Underarm Wax",
    price: 30,
    duration: "20 min",
    description: "Quick and effective underarm hair removal.",
    category: "body-waxing" as const,
    gender: "men",
    benefits: ["Quick service", "Effective removal", "Licensed estheticians"],
    image: "/images/services/underarm-wax.png",
    imageAlt: "Men's underarm waxing service"
  },

  // ═══════════════════════════════════════════
  // MEN'S FACIAL WAXING
  // ═══════════════════════════════════════════
  {
    id: "full-face-wax-men",
    slug: "full-face-wax-men",
    name: "Full Face Wax",
    price: 40,
    duration: "37 min",
    description: "Complete facial waxing including neck and beard line shaping.",
    category: "facial-waxing" as const,
    gender: "men",
    benefits: ["Full facial grooming", "Beard line shaping", "Licensed estheticians"],
    image: "/images/services/wax.png",
    imageAlt: "Men's full face waxing service"
  },
  {
    id: "eyebrow-wax-men",
    slug: "eyebrow-wax-men",
    name: "Eyebrow Shape",
    price: 15,
    duration: "20 min",
    description: "Professional eyebrow grooming and shape for men.",
    category: "facial-waxing" as const,
    gender: "men",
    benefits: ["Clean grooming", "Professional shaping", "Licensed estheticians"],
    image: "/images/services/eyebrow-wax.png",
    imageAlt: "Men's eyebrow shaping and grooming service"
  },
  {
    id: "nose-wax-men",
    slug: "nose-wax-men",
    name: "Nose Wax",
    price: 8,
    duration: "10 min",
    description: "Quick and effective nose hair removal.",
    category: "facial-waxing" as const,
    gender: "men",
    benefits: ["Quick service", "Clean results", "Licensed estheticians"],
    image: "/images/services/wax.png",
    imageAlt: "Men's nose hair waxing service"
  },
  {
    id: "ear-wax-men",
    slug: "ear-wax-men",
    name: "Ear Wax",
    price: 8,
    duration: "10 min",
    description: "Professional ear hair removal.",
    category: "facial-waxing" as const,
    gender: "men",
    benefits: ["Quick service", "Professional technique", "Licensed estheticians"],
    image: "/images/services/wax.png",
    imageAlt: "Professional ear hair waxing service for men"
  },

  // ═══════════════════════════════════════════
  // ORGANIC FACIALS
  // ═══════════════════════════════════════════
  {
    id: "Organic-facial",
    slug: "Organic-facial",
    name: "Organic Facial",
    price: 80,
    duration: "60 min",
    description: "Custom facial using our Organic products for deep hydration and radiant glow.",
    category: "specialty-treatments" as const,
    gender: "all",
    popular: true,
    benefits: ["Deep hydration", "Organic products", "Custom treatment", "Licensed estheticians"],
    image: "/images/services/Organic-facial.png",
    imageAlt: "Custom Organic facial treatment"
  },
  {
    id: "hydrating-facial",
    slug: "hydrating-facial",
    name: "Hydrating Facial",
    price: 50,
    duration: "30 min",
    description: "A deeply nourishing facial treatment designed to replenish moisture and restore your skin's natural glow.",
    category: "specialty-treatments" as const,
    gender: "all",
    benefits: ["Deep hydration", "Restored glow", "Organic products", "Licensed estheticians"],
    image: "/images/services/organic-facial.png",
    imageAlt: "Hydrating facial treatment at Epoch Skin"
  },
  {
    id: "glass-skin-treatment",
    slug: "glass-skin-treatment",
    name: "Glass Skin Treatment",
    price: 90,
    duration: "75 min",
    description: "K-Beauty inspired session with Organic masking and massage for plump, radiant skin.",
    category: "specialty-treatments" as const,
    gender: "all",
    popular: true,
    benefits: ["K-Beauty technique", "Radiant glow", "Organic masking", "Licensed estheticians"],
    image: "/images/services/glass-skin.png",
    imageAlt: "Glass skin facial treatment"
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
  if (category === "All Services") return services;
  return services.filter(service => service.category === category);
}

export function getServicesByGender(gender: ServiceGender): ServiceWithGender[] {
  if (gender === "all") return services;
  return services.filter(service => service.gender === gender || service.gender === "all");
}
