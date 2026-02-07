// Product Type Definition
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  shortDescription?: string;
  image: string;
  category: string;
  featured?: boolean;
  skinType?: string[];
}

// ──────────────────────────────────────────────
// Products Data
// ──────────────────────────────────────────────

export const products: Product[] = [
  {
    id: 1,
    name: "Organic Dewy Glow Oat Cleanser",
    price: 35,
    description: "Mild foaming facial cleanser with organic licorice root extract, colloidal oats, and aloe for gentle cleansing, deep hydration, and radiant glow.",
    shortDescription: "Mild foaming cleanser with organic licorice root extract and colloidal oats.",
    image: "/images/products/cleanser.jpg",
    category: "Cleanser",
    featured: true,
    skinType: ["all"]
  },
  {
    id: 2,
    name: "Organic Dewy Rice Peel-Off Glow Mask",
    price: 42,
    description: "Gentle peel-off mask with organic ultra-fine rice powder, Centella Asiatica, and licorice for polishing, smoothness, and brightened appearance.",
    shortDescription: "Peel-off mask with organic rice powder for polished, bright skin.",
    image: "/images/products/peel-mask.jpg",
    category: "Mask",
    featured: true,
    skinType: ["all"]
  },
  {
    id: 3,
    name: "Organic Dewy Barrier Glow Cream",
    price: 42,
    description: "Lightweight moisturizer with tremella fuciformis, beta-glucan, and organic shea for intense hydration, barrier support, and plump dewy skin.",
    shortDescription: "Lightweight moisturizer with tremella fuciformis and beta-glucan.",
    image: "/images/products/cream.jpg",
    category: "Moisturizer",
    featured: true,
    skinType: ["all"]
  },
  {
    id: 4,
    name: "Organic Aloe Glow Hydrating Mask",
    price: 40,
    description: "Soothing hydrating mask with organic aloe, snow mushroom extract, and kakadu plum for plump moisture and radiant look.",
    shortDescription: "Soothing mask with organic aloe and snow mushroom extract.",
    image: "/images/products/hydrating-mask.jpg",
    category: "Mask",
    featured: true,
    skinType: ["all"]
  }
];

// ──────────────────────────────────────────────
// Helper Functions
// ──────────────────────────────────────────────

// Helper function to get featured products
export function getFeaturedProducts(): Product[] {
  return products.filter(product => product.featured);
}

// Helper function to get products by category
export function getProductsByCategory(category: string): Product[] {
  if (category === "All") {
    return products;
  }
  return products.filter(product => product.category === category);
}

// Helper function to get a single product by ID
export function getProductById(id: number): Product | undefined {
  return products.find(product => product.id === id);
}
