// Import the Product type from lib/types
import type { Product } from "@/lib/types";

// ──────────────────────────────────────────────
// Products Data - COMPLETE WITH ALL FIELDS
// ──────────────────────────────────────────────

export const products: Product[] = [
  {
    id: "1",
    slug: "organic-dewy-glow-oat-cleanser",
    name: "Organic Dewy Glow Oat Cleanser",
    price: 35,
    description: "Mild foaming facial cleanser with organic licorice root extract, colloidal oats, and aloe for gentle cleansing, deep hydration, and radiant glow.",
    shortDescription: "Mild foaming cleanser with organic licorice root extract and colloidal oats.",
    images: ["/images/products/cleanser.jpg"],
    category: "cleansers" as const,
    featured: true,
    skinType: ["all"],
    size: "120ml",
    inStock: true,
    ingredients: [
      "Organic Licorice Root Extract",
      "Colloidal Oats",
      "Organic Aloe Vera",
      "Glycerin",
      "Chamomile Extract"
    ],
    howToUse: "Apply to damp skin, massage gently in circular motions, then rinse with warm water. Use morning and night.",
    benefits: [
      "Deep hydration",
      "Gentle cleansing",
      "Radiant glow"
    ]
  },
  {
    id: "2",
    slug: "organic-dewy-rice-peel-off-glow-mask",
    name: "Organic Dewy Rice Peel-Off Glow Mask",
    price: 42,
    description: "Gentle peel-off mask with organic ultra-fine rice powder, Centella Asiatica, and licorice for polishing, smoothness, and brightened appearance.",
    shortDescription: "Peel-off mask with organic rice powder for polished, bright skin.",
    images: ["/images/products/peel-mask.jpg"],
    category: "masks" as const,
    featured: true,
    skinType: ["all"],
    size: "100ml",
    inStock: true,
    ingredients: [
      "Organic Ultra-Fine Rice Powder",
      "Centella Asiatica Extract",
      "Organic Licorice Root",
      "Kaolin Clay",
      "Vitamin E"
    ],
    howToUse: "Apply an even layer to clean, dry skin. Leave on for 15-20 minutes until dry, then gently peel off. Use 2-3 times per week.",
    benefits: [
      "Polished skin",
      "Smooth texture",
      "Brightened appearance"
    ]
  },
  {
    id: "3",
    slug: "organic-dewy-barrier-glow-cream",
    name: "Organic Dewy Barrier Glow Cream",
    price: 42,
    description: "Lightweight moisturizer with tremella fuciformis, beta-glucan, and organic shea for intense hydration, barrier support, and plump dewy skin.",
    shortDescription: "Lightweight moisturizer with tremella fuciformis and beta-glucan.",
    images: ["/images/products/cream.jpg"],
    category: "moisturizers" as const,
    featured: true,
    skinType: ["all"],
    size: "50ml",
    inStock: true,
    ingredients: [
      "Tremella Fuciformis (Snow Mushroom)",
      "Beta-Glucan",
      "Organic Shea Butter",
      "Hyaluronic Acid",
      "Squalane"
    ],
    howToUse: "Apply to clean skin morning and night. Gently massage until fully absorbed. Can be used alone or under makeup.",
    benefits: [
      "Intense hydration",
      "Barrier support",
      "Plump dewy skin"
    ]
  },
  {
    id: "4",
    slug: "organic-aloe-glow-hydrating-mask",
    name: "Organic Aloe Glow Hydrating Mask",
    price: 40,
    description: "Soothing hydrating mask with organic aloe, snow mushroom extract, and kakadu plum for plump moisture and radiant look.",
    shortDescription: "Soothing mask with organic aloe and snow mushroom extract.",
    images: ["/images/products/hydrating-mask.jpg"],
    category: "masks" as const,
    featured: true,
    skinType: ["all"],
    size: "100ml",
    inStock: true,
    ingredients: [
      "Organic Aloe Vera Gel",
      "Snow Mushroom Extract",
      "Kakadu Plum Extract",
      "Glycerin",
      "Rose Water"
    ],
    howToUse: "Apply a generous layer to clean skin. Leave on for 10-15 minutes, then rinse with cool water. Use 2-3 times per week.",
    benefits: [
      "Plump moisture",
      "Radiant look",
      "Soothing hydration"
    ]
  }
];

// ──────────────────────────────────────────────
// Helper Functions
// ──────────────────────────────────────────────

export function getFeaturedProducts(): Product[] {
  return products.filter(product => product.featured);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "All" || category === "all") {
    return products;
  }
  return products.filter(product => product.category.toLowerCase() === category.toLowerCase());
}

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(product => product.slug === slug);
}
