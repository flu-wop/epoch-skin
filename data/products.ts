import { Product, ProductCategory, SkinType } from "@/lib/types";

export const products: Product[] = [
  {
    id: "turmeric-oat-cleanser",
    name: "Organic Dewy Glow Turmeric Oat Cleanser",
    slug: "turmeric-oat-cleanser",
    price: 32,
    compareAtPrice: 38,
    description: "Mild foaming cleanser with organic turmeric for radiant glow, colloidal oats for ultra-smooth/calming, aloe for intense hydration/dewiness.",
    shortDescription: "Gentle radiance-boosting cleanser",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80",
    ],
    category: "cleansers" as ProductCategory,
    skinType: ["all", "sensitive", "dry"] as SkinType[],
    ingredients: ["Organic Turmeric", "Colloidal Oats", "Aloe Vera", "Glycerin"],
    howToUse: "Massage a small amount onto damp skin in circular motions, then rinse thoroughly. Use morning and night as the first step in your routine.",
    benefits: ["Brightens dull skin", "Calms irritation", "Deeply hydrates", "Gently exfoliates", "Supports skin barrier"],
    size: "100 ml",
    inStock: true,
    featured: true,
  },
  {
    id: "snow-mushroom-serum",
    name: "Organic Snow Mushroom Hydrating Serum",
    slug: "snow-mushroom-serum",
    price: 48,
    compareAtPrice: 55,
    description: "With tremella fuciformis extract, beta-glucan, Kakadu plum, licorice, turmeric, rosehip, squalane for deep hydration and brightening.",
    shortDescription: "Plumping hydration serum",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80",
    ],
    category: "serums" as ProductCategory,
    skinType: ["all", "dry", "dehydrated"] as SkinType[],
    ingredients: ["Tremella Mushroom", "Beta-Glucan", "Kakadu Plum", "Licorice", "Rosehip", "Squalane"],
    howToUse: "Apply 3–5 drops after cleansing, morning and night. Pat gently into skin.",
    benefits: ["Intense hydration", "Plumps skin", "Brightens", "Strengthens barrier"],
    size: "30 ml",
    inStock: true,
    featured: true,
  },
  {
    id: "barrier-repair-moisturizer",
    name: "Organic Barrier Repair Moisturizer",
    slug: "barrier-repair-moisturizer",
    price: 45,
    compareAtPrice: 52,
    description: "Aloe, glycerin, tremella, beta-glucan, licorice, squalane, jojoba, camellia, rosehip, shea for moisture lock and softness.",
    shortDescription: "Moisture-locking barrier cream",
    images: [
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80",
    ],
    category: "moisturizers" as ProductCategory,
    skinType: ["all", "dry", "sensitive"] as SkinType[],
    ingredients: ["Aloe Vera", "Glycerin", "Tremella", "Beta-Glucan", "Squalane", "Jojoba", "Shea Butter"],
    howToUse: "Apply a pea-sized amount to clean skin morning and night. Massage until absorbed.",
    benefits: ["Locks in moisture", "Repairs barrier", "Soothes irritation", "Softens skin"],
    size: "50 ml",
    inStock: true,
    featured: true,
  },
];

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured);
}