import { Product } from "@/lib/types";

export const products: Product[] = [
  {
    id: "1",
    name: "Botanical Cleansing Oil",
    slug: "botanical-cleansing-oil",
    price: 42,
    compareAtPrice: 48,
    description: "A luxurious oil cleanser that gently dissolves makeup and impurities while nourishing your skin with botanical extracts. Perfect for all skin types, this silky formula transforms into a milky emulsion upon contact with water.",
    shortDescription: "Gentle oil cleanser with botanical extracts",
    images: ["/images/products/cleansing-oil-1.jpg", "/images/products/cleansing-oil-2.jpg"],
    category: "cleansers",
    skinType: ["all", "dry", "sensitive"],
    ingredients: ["Jojoba Oil", "Rosehip Seed Oil", "Vitamin E", "Chamomile Extract", "Green Tea Extract"],
    howToUse: "Apply 2-3 pumps to dry skin. Massage gently in circular motions. Add water to emulsify, then rinse thoroughly. Use morning and evening.",
    benefits: [
      "Removes makeup and sunscreen effectively",
      "Maintains skin's natural moisture barrier",
      "Soothes and calms irritation",
      "Non-comedogenic formula"
    ],
    size: "120ml",
    inStock: true,
    featured: true,
  },
  {
    id: "2",
    name: "Radiance Vitamin C Serum",
    slug: "radiance-vitamin-c-serum",
    price: 58,
    description: "A potent brightening serum formulated with 15% stabilized vitamin C, hyaluronic acid, and ferulic acid. This lightweight serum helps reduce the appearance of dark spots, evens skin tone, and provides antioxidant protection.",
    shortDescription: "Brightening serum with 15% vitamin C",
    images: ["/images/products/vitamin-c-serum-1.jpg", "/images/products/vitamin-c-serum-2.jpg"],
    category: "serums",
    skinType: ["all", "dry", "combination"],
    ingredients: ["L-Ascorbic Acid 15%", "Ferulic Acid", "Hyaluronic Acid", "Vitamin E", "Aloe Vera"],
    howToUse: "Apply 3-4 drops to clean, dry skin in the morning. Gently pat until absorbed. Follow with moisturizer and SPF.",
    benefits: [
      "Brightens and evens skin tone",
      "Reduces hyperpigmentation",
      "Boosts collagen production",
      "Protects against environmental damage"
    ],
    size: "30ml",
    inStock: true,
    featured: true,
  },
  {
    id: "3",
    name: "Deep Hydration Cream",
    slug: "deep-hydration-cream",
    price: 52,
    description: "A rich, nourishing moisturizer that delivers intense hydration without feeling heavy. Infused with hyaluronic acid, ceramides, and plant-based squalane to restore and maintain your skin's moisture barrier.",
    shortDescription: "Rich moisturizer with ceramides and squalane",
    images: ["/images/products/hydration-cream-1.jpg", "/images/products/hydration-cream-2.jpg"],
    category: "moisturizers",
    skinType: ["dry", "sensitive", "combination"],
    ingredients: ["Ceramide Complex", "Squalane", "Hyaluronic Acid", "Shea Butter", "Niacinamide"],
    howToUse: "Apply to clean skin morning and evening. Warm a small amount between fingertips and gently press into face and neck.",
    benefits: [
      "Provides all-day hydration",
      "Strengthens skin barrier",
      "Reduces redness and irritation",
      "Suitable for sensitive skin"
    ],
    size: "50ml",
    inStock: true,
    featured: true,
  },
  {
    id: "4",
    name: "Enzyme Exfoliating Mask",
    slug: "enzyme-exfoliating-mask",
    price: 45,
    description: "A gentle yet effective exfoliating mask powered by natural fruit enzymes. This creamy treatment dissolves dead skin cells, unclogs pores, and reveals a brighter, smoother complexion without harsh scrubbing.",
    shortDescription: "Gentle enzyme mask for radiant skin",
    images: ["/images/products/enzyme-mask-1.jpg", "/images/products/enzyme-mask-2.jpg"],
    category: "masks",
    skinType: ["all", "oily", "combination"],
    ingredients: ["Papaya Enzyme", "Pineapple Enzyme", "Kaolin Clay", "Honey Extract", "Willow Bark Extract"],
    howToUse: "Apply a thin layer to clean, dry skin 1-2 times per week. Leave on for 10-15 minutes, then rinse with warm water.",
    benefits: [
      "Gently exfoliates dead skin cells",
      "Refines pores and skin texture",
      "Brightens dull complexion",
      "Suitable for sensitive skin"
    ],
    size: "75ml",
    inStock: true,
    featured: true,
  },
  {
    id: "5",
    name: "Nourishing Facial Oil",
    slug: "nourishing-facial-oil",
    price: 64,
    description: "A luxurious blend of cold-pressed botanical oils that deeply nourish, restore radiance, and improve skin elasticity. This fast-absorbing oil is perfect for adding a healthy glow to your complexion.",
    shortDescription: "Botanical oil blend for radiant skin",
    images: ["/images/products/facial-oil-1.jpg"],
    category: "oils",
    skinType: ["dry", "combination", "all"],
    ingredients: ["Rosehip Oil", "Argan Oil", "Jojoba Oil", "Sea Buckthorn Oil", "Vitamin E"],
    howToUse: "Use 3-4 drops after serum, before moisturizer. Can also be mixed with your moisturizer or used alone at night.",
    benefits: [
      "Deeply nourishes and hydrates",
      "Improves skin elasticity",
      "Reduces fine lines appearance",
      "Adds natural radiance"
    ],
    size: "30ml",
    inStock: true,
    featured: false,
  },
  {
    id: "6",
    name: "Gentle Foaming Cleanser",
    slug: "gentle-foaming-cleanser",
    price: 36,
    description: "A sulfate-free foaming cleanser that effectively removes impurities without stripping your skin. Infused with chamomile and aloe vera to soothe and balance.",
    shortDescription: "Sulfate-free gentle daily cleanser",
    images: ["/images/products/foaming-cleanser-1.jpg"],
    category: "cleansers",
    skinType: ["all", "oily", "combination", "sensitive"],
    ingredients: ["Coconut-derived Surfactants", "Chamomile Extract", "Aloe Vera", "Glycerin", "Panthenol"],
    howToUse: "Wet face, pump 1-2 times into hands, and massage onto skin. Rinse thoroughly. Use morning and evening.",
    benefits: [
      "Gentle enough for daily use",
      "Maintains skin's pH balance",
      "Removes excess oil without drying",
      "Calms and soothes skin"
    ],
    size: "150ml",
    inStock: true,
    featured: false,
  },
  {
    id: "7",
    name: "Rose Quartz Gua Sha",
    slug: "rose-quartz-gua-sha",
    price: 32,
    description: "Authentic rose quartz gua sha tool for facial massage and lymphatic drainage. This beautifully crafted tool helps reduce puffiness, improve circulation, and enhance product absorption.",
    shortDescription: "Rose quartz facial massage tool",
    images: ["/images/products/gua-sha-1.jpg"],
    category: "tools",
    skinType: ["all"],
    ingredients: ["100% Natural Rose Quartz"],
    howToUse: "Apply facial oil or serum. Hold tool at a 15-degree angle and glide upward and outward with gentle pressure. Use 3-5 times per week.",
    benefits: [
      "Reduces puffiness and inflammation",
      "Improves circulation",
      "Enhances product absorption",
      "Promotes lymphatic drainage"
    ],
    size: "One size",
    inStock: true,
    featured: false,
  },
  {
    id: "8",
    name: "Regenerating Night Cream",
    slug: "regenerating-night-cream",
    price: 68,
    description: "A rich overnight treatment that works while you sleep to repair, regenerate, and deeply hydrate. Formulated with peptides, retinol alternative, and botanical oils.",
    shortDescription: "Overnight repair cream with peptides",
    images: ["/images/products/night-cream-1.jpg"],
    category: "moisturizers",
    skinType: ["dry", "combination", "all"],
    ingredients: ["Peptide Complex", "Bakuchiol", "Squalane", "Evening Primrose Oil", "Vitamin E"],
    howToUse: "Apply to clean skin every evening. Warm between fingertips and gently press into face and neck.",
    benefits: [
      "Supports overnight skin repair",
      "Reduces fine lines and wrinkles",
      "Deeply hydrates",
      "Gentle retinol alternative"
    ],
    size: "50ml",
    inStock: true,
    featured: false,
  },
];

// Helper function to get featured products
export function getFeaturedProducts(): Product[] {
  return products.filter(product => product.featured);
}

// Helper function to get product by slug
export function getProductBySlug(slug: string): Product | undefined {
  return products.find(product => product.slug === slug);
}

// Helper function to get products by category
export function getProductsByCategory(category: string): Product[] {
  return products.filter(product => product.category === category);
}
