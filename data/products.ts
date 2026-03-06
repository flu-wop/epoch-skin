import type { Product } from "@/lib/types";

export const products: Product[] = [
  // ─── EXISTING PRODUCTS ───────────────────────────────────────
  {
    id: "1",
    slug: "Organic-dewy-glow-oat-cleanser",
    name: "Dewy Glow Turmeric Oat Cleanser",
    price: 28,
    description:
      "A mild, foaming facial cleanser crafted to gently cleanse and refresh skin while delivering glass-skin hydration with every wash. Formulated with Organic rose hydrosol, aloe vera, colloidal oatmeal, hydrolyzed wheat protein, and licorice root extract for a lit-from-within glow—without a hint of tint or residue. Free from harsh sulfates, synthetic fragrances, and artificial colorants. Formulated at a skin-friendly pH of 4.5–5.5.",
    shortDescription:
      "Mild foaming cleanser with Organic licorice root extract, colloidal oats, and aloe for gentle cleansing, deep hydration, and radiant glow.",
    images: ["/images/products/dewy-glow-oat-cleanser.png"],
    imageAlt:
      "Epoch Skin Organic Dewy Glow Oat Cleanser - 120ml bottle with Organic licorice root and colloidal oats for gentle facial cleansing",
    category: "cleansers" as const,
    featured: true,
    skinType: ["all"],
    size: "8 fl oz (236 ml)",
    inStock: true,
    ingredients: [
      "Rosa Damascena Flower Water (Organic Rose Hydrosol)",
      "Aloe Barbadensis Leaf Juice (Organic Aloe Vera)",
      "Decyl Glucoside",
      "Avena Sativa Kernel Flour (Colloidal Oatmeal)",
      "Hydrolyzed Wheat Protein",
      "Glycyrrhiza Glabra Root Extract (Organic Licorice Root)",
      "Melaleuca Alternifolia Leaf Oil (Tea Tree)",
      "Lactobacillus Ferment",
      "Citric Acid",
    ],
    howToUse:
      "Wet face. Pump a dime- to nickel-size amount into palm and massage gently onto skin for 30–60 seconds. Rinse thoroughly with lukewarm water. Use morning and night; follow with toner, serum, moisturizer, and SPF for the full glass-skin routine.",
    benefits: [
      "Deep hydration with every wash",
      "Gentle, sulfate-free cleansing",
      "Brightening from Organic licorice root",
      "Soothing colloidal oatmeal for calm skin",
      "Film-forming wheat protein for smoothness",
    ],
  },
  {
    id: "2",
    slug: "Organic-snow-mushroom-hydrating-serum",
    name: "Tremella Hydrating Serum",
    price: 48,
    description:
      "Lightweight hydrating serum with tremella fuciformis and hyaluronic acid for intense moisture and plump, dewy skin.",
    shortDescription:
      "Hydrating serum with snow mushroom extract for plump, radiant skin.",
    images: ["/images/products/tremella-hydrating-serum.png"],
    imageAlt:
      "Epoch Skin Organic Snow Mushroom Hydrating Serum - 30ml amber glass bottle with dropper containing tremella fuciformis and hyaluronic acid",
    category: "serums" as const,
    featured: true,
    skinType: ["all"],
    size: "1 fl oz (30 ml)",
    inStock: true,
    ingredients: [
      "Tremella Fuciformis Extract",
      "Hyaluronic Acid",
      "Organic Aloe Vera",
      "Vitamin E",
      "Rose Water",
    ],
    howToUse:
      "Apply 2–3 drops to clean skin before moisturizer. Gently press into skin until absorbed. Use morning and night.",
    benefits: [
      "Intense hydration",
      "Plump, bouncy skin",
      "Radiant, dewy glow",
    ],
  },
  {
    id: "3",
    slug: "Organic-dewy-barrier-glow-cream",
    name: "Dewy Barrier Glow Cream",
    price: 46,
    description:
      "A glass-skin moisturizer that delivers serious plumpness and barrier support in a lightweight, fast-absorbing cream. Powered by snow mushroom (tremella) extract, beta-glucan, squalane, and rosehip oil in an Organic aloe base—melts into skin without heaviness, leaving a luminous, dewy finish. Formulated at pH 5–6 for optimal skin compatibility.",
    shortDescription:
      "Lightweight moisturizer with tremella fuciformis and beta-glucan for intense hydration and barrier support.",
    images: ["/images/products/barrier-glow-cream.png"],
    imageAlt:
      "Epoch Skin Organic Dewy Barrier Glow Cream - 50ml jar with tremella fuciformis, beta-glucan, and Organic shea butter moisturizer",
    category: "moisturizers" as const,
    featured: true,
    skinType: ["all"],
    size: "8 oz (236 g)",
    inStock: true,
    ingredients: [
      "Aloe Barbadensis Leaf Juice (Organic Aloe Vera)",
      "Tremella Fuciformis Extract (Snow Mushroom)",
      "Beta-Glucan",
      "Glycyrrhiza Glabra Root Extract (Organic Licorice Root)",
      "Squalane",
      "Rosa Canina Fruit Oil (Rosehip Seed Oil)",
      "Butyrospermum Parkii Butter (Organic Shea Butter)",
      "Cetearyl Alcohol & Cetearyl Glucoside",
      "Lactobacillus Ferment",
    ],
    howToUse:
      "Apply a pea-size amount to clean face and neck morning and night after serum. Massage gently until fully absorbed. Can be layered under SPF in the AM.",
    benefits: [
      "Intense, long-lasting hydration",
      "Barrier support and repair",
      "Plump, dewy finish",
      "Lightweight — no grease or residue",
      "Brightening from licorice root",
    ],
  },
  {
    id: "4",
    slug: "Organic-dewy-rice-peel-off-glow-mask",
    name: "Dewy Rice Peel Off Glow Mask",
    price: 42,
    description:
      "A luxurious, glass-skin peel-off mask that blends ultra-fine rice powder, centella asiatica, and licorice root extract in a natural agar-based film. Each use gently polishes away dullness while layering on hydration for a visibly smoother, brighter, more even complexion. Vegan. No artificial colorants or synthetic film formers.",
    shortDescription:
      "Peel-off mask with Organic rice powder and Centella Asiatica for polished, bright, glass skin.",
    images: ["/images/products/rice-peel-off-mask.png"],
    imageAlt:
      "Epoch Skin Organic Dewy Rice Peel-Off Glow Mask - 100ml tube with Organic rice powder and Centella Asiatica for skin brightening",
    category: "masks" as const,
    featured: true,
    skinType: ["all"],
    size: "8 oz (236 g)",
    inStock: true,
    ingredients: [
      "Rosa Damascena Flower Water (Organic Rose Water)",
      "Aloe Barbadensis Leaf Juice (Organic Aloe Vera)",
      "Oryza Sativa Powder (Organic Ultra-Fine Rice Powder)",
      "Centella Asiatica Extract",
      "Glycyrrhiza Glabra Root Extract (Organic Licorice Root)",
      "Agar (Organic Agar-Agar)",
      "Lactobacillus Ferment",
    ],
    howToUse:
      "Use 1–2 times per week in the evening. Stir before use. Apply a thin, even layer to a clean face, avoiding eyes, brows, and lips. Let dry 15–20 minutes until the mask feels tight. Peel off slowly from the edges upward. Rinse any residue with lukewarm water. Follow with toner, serum, and moisturizer.",
    benefits: [
      "Gently polishes and smooths texture",
      "Brightens for glass-skin radiance",
      "Even skin tone with licorice root",
      "Calms and soothes with Centella Asiatica",
      "Natural vegan peel-off film — no synthetic polymers",
    ],
  },

  // ─── NEW PRODUCTS ────────────────────────────────────────────
  {
    id: "5",
    slug: "Organic-aloe-glow-hydrating-mask",
    name: "Dewy Glow Hydrating Mask",
    price: 40,
    description:
      "A supercharged hydration mask that delivers a full glass-skin moisture surge in just 10–15 minutes. Formulated with snow mushroom extract, kakadu plum, licorice root, rosehip oil, and squalane in an Organic aloe base. Cold-process made to preserve every active ingredient at peak potency. No artificial colors, synthetic fragrances, or harsh chemicals.",
    shortDescription:
      "Hydrating mask with snow mushroom and kakadu plum for a dewy, plump, radiant complexion.",
    images: ["/images/products/aloe-glow-hydrating-mask.png"],
    imageAlt:
      "Epoch Skin Organic Aloe Glow Hydrating Mask - jar with snow mushroom extract and kakadu plum for intense hydration",
    category: "masks" as const,
    featured: false,
    skinType: ["all"],
    size: "8 oz (236 g)",
    inStock: true,
    ingredients: [
      "Aloe Barbadensis Leaf Juice (Organic Aloe Vera Gel)",
      "Tremella Fuciformis Extract (Snow Mushroom)",
      "Beta-Glucan",
      "Terminalia Ferdinandiana Fruit Extract (Kakadu Plum)",
      "Glycyrrhiza Glabra Root Extract (Organic Licorice Root)",
      "Rosa Canina Fruit Oil (Organic Rosehip Oil)",
      "Squalane",
      "Lactobacillus Ferment",
    ],
    howToUse:
      "Apply a thin layer to a clean face and neck, avoiding the eye area. Leave on for 10–15 minutes. Rinse with lukewarm water, massaging gently. Use 2–3 times per week in the evening. Follow with your favorite moisturizer.",
    benefits: [
      "Intense moisture surge in 10–15 minutes",
      "Plumping snow mushroom extract",
      "Radiance from kakadu plum",
      "Even tone with licorice root",
      "Lightweight, non-comedogenic oils",
    ],
  },
  {
    id: "6",
    slug: "Organic-clove-glow-even-tone-toner",
    name: "Clove Glow Toner",
    price: 28,
    description:
      "An antioxidant-rich toner built on a clove-infused Organic rose water base, with licorice root and green tea extracts for balanced, radiant skin. Formulated at pH 4.5–5.5 for optimal skin balance. Contains clove — always patch test 24–48 hours before first use.",
    shortDescription:
      "Antioxidant toner with clove-infused rose water and licorice root for an even, radiant complexion.",
    images: ["/images/products/clove-glow-toner.png"],
    imageAlt:
      "Epoch Skin Organic Clove Glow Even Tone Toner - spray bottle with clove-infused rose water and licorice root extract",
    category: "toners" as const,
    featured: false,
    skinType: ["all"],
    size: "8 fl oz (236 ml)",
    inStock: true,
    ingredients: [
      "Rosa Damascena Flower Water (Clove-Infused Organic Rose Water)",
      "Aloe Barbadensis Leaf Juice (Organic Aloe Vera)",
      "Glycyrrhiza Glabra Root Extract (Organic Licorice Root)",
      "Camellia Sinensis Leaf Extract (Organic Green Tea)",
      "Lactobacillus Ferment",
      "Syzygium Aromaticum Flower Bud Extract (Clove Infusion)",
      "Citric Acid",
    ],
    howToUse:
      "After cleansing, shake bottle and spritz directly onto face and neck, or apply to a cotton pad and sweep across skin. Pat gently to absorb. Use morning and evening before serum and moisturizer. If new to clove-based products, begin with once daily and increase as tolerated.",
    benefits: [
      "Even tone support with licorice root",
      "Antioxidant protection from green tea",
      "Clove polyphenols for radiant clarity",
      "Balances skin pH after cleansing",
      "Hydrating aloe base for dewy comfort",
    ],
  },
  {
    id: "7",
    slug: "Organic-dewy-plump-hydration-serum",
    name: "Dewy Plump Hydration Serum",
    price: 48,
    description:
      "The ultimate glass-skin plumping serum—lightweight yet intensely hydrating. Tremella fuciformis (snow mushroom) takes center stage, supported by beta-glucan, licorice root, hydrolyzed wheat protein, and squalane. Cold-process formulated to preserve every active at peak potency. No synthetic fragrance, alcohol, or artificial colorants.",
    shortDescription:
      "Lightweight plumping serum with snow mushroom and beta-glucan for dewy, glass-skin hydration.",
    images: ["/images/products/dewy-plump-hydration-serum.png"],
    imageAlt:
      "Epoch Skin Organic Dewy Plump Hydration Serum - 30ml amber dropper bottle with snow mushroom and beta-glucan",
    category: "serums" as const,
    featured: false,
    skinType: ["all"],
    size: "1 fl oz (30 ml)",
    inStock: true,
    ingredients: [
      "Aloe Barbadensis Leaf Juice (Organic Aloe Vera)",
      "Tremella Fuciformis Extract (Snow Mushroom)",
      "Beta-Glucan",
      "Glycyrrhiza Glabra Root Extract (Organic Licorice Root)",
      "Hydrolyzed Wheat Protein",
      "Squalane",
      "Lactobacillus Ferment",
    ],
    howToUse:
      "After cleansing and toning, apply 2–4 drops to face and neck. Pat gently until fully absorbed. Use morning and evening; layer under your moisturizer for maximum glass-skin plumpness.",
    benefits: [
      "Intense water-binding plumpness from snow mushroom",
      "Soothing, calming beta-glucan hydration",
      "Even tone and glow with licorice root",
      "Smoothing film from hydrolyzed wheat protein",
      "Lightweight — never sticky or heavy",
    ],
  },
  {
    id: "8",
    slug: "Organic-dewy-glow-lip-balm",
    name: "Dewy Glow Lip Balm",
    price: 12,
    description:
      "Hydration meets glossy luxury in this Organic lip balm built around shea butter, rosehip seed oil, and plant-derived squalane. Squalane delivers a soft, glassy shine and seals in moisture while rosehip oil nourishes with antioxidants for a naturally plumped, radiant pout. No synthetic fragrances, petroleum, or artificial colorants.",
    shortDescription:
      "Nourishing lip balm with shea butter, rosehip oil, and squalane for smooth, plump, radiant lips.",
    images: ["/images/products/dewy-glow-lip-balm.png"],
    imageAlt:
      "Epoch Skin Organic Dewy Glow Lip Balm - tube with Organic shea butter, rosehip oil, and squalane",
    category: "lip" as const,
    featured: false,
    skinType: ["all"],
    size: "0.15 oz (4.25 g)",
    inStock: true,
    ingredients: [
      "Butyrospermum Parkii Butter (Organic Shea Butter)",
      "Cera Alba (Organic Beeswax)",
      "Squalane",
      "Rosa Canina Fruit Oil (Organic Rosehip Seed Oil)",
      "Tocopherol (Vitamin E)",
    ],
    howToUse:
      "Apply to lips as needed throughout the day. Layer over your hydration serum for an extra plump, dewy lip look.",
    benefits: [
      "Deep hydration with Organic shea butter",
      "Glossy shine from plant-derived squalane",
      "Antioxidant nourishment with rosehip oil",
      "Natural barrier from Organic beeswax",
      "Long-lasting softness and comfort",
    ],
  },
  {
    id: "9",
    slug: "Organic-plump-eye-renewal-treatment",
    name: "Dewy Eye Renewal Treatment",
    price: 52,
    description:
      "Targeted hydration and plumping for the most delicate area of the face. Layers tremella extract, beta-glucan, hydrolyzed wheat protein, and licorice root in an aloe base to visibly smooth fine lines and restore a bright, dewy eye area. Formulated at a gentle pH of 4.5–5.5 for eye-area compatibility.",
    shortDescription:
      "Lightweight eye cream with snow mushroom and beta-glucan to plump, smooth, and brighten the eye area.",
    images: ["/images/products/eye-renewal-treatment.png"],
    imageAlt:
      "Epoch Skin Organic Plump Eye Renewal Treatment - 1oz jar with snow mushroom and hydrolyzed wheat protein for the eye area",
    category: "eye" as const,
    featured: false,
    skinType: ["all"],
    size: "1 oz (28 g)",
    inStock: true,
    ingredients: [
      "Aloe Barbadensis Leaf Juice (Organic Aloe Vera)",
      "Tremella Fuciformis Extract (Snow Mushroom)",
      "Beta-Glucan",
      "Hydrolyzed Wheat Protein",
      "Glycyrrhiza Glabra Root Extract (Organic Licorice Root)",
      "Butyrospermum Parkii Butter (Organic Shea Butter)",
      "Rosa Canina Fruit Oil (Organic Rosehip Seed Oil)",
      "Squalane",
      "Lactobacillus Ferment",
    ],
    howToUse:
      "After applying serum, gently pat a pea-size amount around the eye area using your ring finger. Do not apply on eyelids or inner corners. Use morning and evening; follow with moisturizer.",
    benefits: [
      "Intense plumping from snow mushroom extract",
      "Smooths the look of fine lines",
      "Brightening and even tone around eye area",
      "Rich barrier nourishment from shea butter",
      "Lightweight — no heaviness or milia risk",
    ],
  },
  {
    id: "10",
    slug: "Organic-willow-glow-exfoliating-serum",
    name: "Willow Glow Exfoliating Serum",
    price: 50,
    description:
      "A gentle BHA-inspired exfoliating serum powered by willow bark extract—nature's salicin source—balanced with tremella extract, beta-glucan, and rosehip oil to resurface skin without stripping. Formulated at an active pH of 3.8–4.5 for real exfoliation results. Always apply SPF the morning after use.",
    shortDescription:
      "Gentle exfoliating serum with willow bark and snow mushroom for smoother, clearer, radiant skin.",
    images: ["/images/products/willow-glow-exfoliating-serum.png"],
    imageAlt:
      "Epoch Skin Organic Willow Glow Exfoliating Serum - dropper bottle with willow bark extract and tremella for gentle BHA exfoliation",
    category: "serums" as const,
    featured: false,
    skinType: ["all"],
    size: "1 fl oz (30 ml)",
    inStock: true,
    ingredients: [
      "Aloe Barbadensis Leaf Juice (Organic Aloe Vera)",
      "Salix Alba Bark Extract (Willow Bark)",
      "Tremella Fuciformis Extract (Snow Mushroom)",
      "Beta-Glucan",
      "Hydrolyzed Wheat Protein",
      "Glycyrrhiza Glabra Root Extract (Organic Licorice Root)",
      "Squalane",
      "Rosa Canina Fruit Oil (Organic Rosehip Oil)",
      "Lactobacillus Ferment",
      "Citric Acid",
    ],
    howToUse:
      "After cleansing and toning, apply 2–4 drops to face and neck (avoid eye area). Pat gently until absorbed. Start 2–3 times per week in the evening and build to daily if tolerated. Always follow with moisturizer and SPF in the morning.",
    benefits: [
      "Gentle BHA-like exfoliation from willow bark",
      "Smooths texture and refines pore appearance",
      "Snow mushroom plumps while exfoliants work",
      "Beta-glucan soothes post-exfoliation",
      "Glow and calming support from licorice root",
    ],
  },
  {
    id: "11",
    slug: "Organic-pineapple-papaya-enzyme-glow-powder",
    name: "Pineapple Papaya Enzyme Glow Powder",
    price: 35,
    description:
      "A mix-your-own enzyme exfoliant that brings professional-grade fruit enzyme resurfacing to your home routine. Organic pineapple powder (bromelain) and papaya powder (papain) gently dissolve dead skin cells while colloidal oatmeal and ultra-fine rice powder soothe and polish. 100% powder — mix fresh each use for maximum enzyme activity.",
    shortDescription:
      "Enzyme powder exfoliant with pineapple bromelain and papaya papain for a brighter, smoother complexion.",
    images: ["/images/products/enzyme-glow-powder.png"],
    imageAlt:
      "Epoch Skin Organic Pineapple Papaya Enzyme Glow Powder - 4oz jar with pineapple bromelain and papaya papain for enzyme exfoliation",
    category: "masks" as const,
    featured: false,
    skinType: ["all"],
    size: "4 oz (113 g)",
    inStock: true,
    ingredients: [
      "Ananas Sativus Fruit Powder (Organic Pineapple — Bromelain)",
      "Carica Papaya Fruit Powder (Organic Papaya — Papain)",
      "Avena Sativa Kernel Flour (Organic Colloidal Oatmeal)",
      "Oryza Sativa Powder (Organic Ultra-Fine Rice Powder)",
      "Glycyrrhiza Glabra Root Powder (Organic Licorice Root)",
    ],
    howToUse:
      "Mix 1–2 teaspoons of powder with water, aloe vera gel, honey, or yogurt to form a smooth paste. Apply a thin layer to a clean face, avoiding eyes. Leave on 5–15 minutes (gentle tingle is normal; rinse sooner if sensitive). Rinse with lukewarm water, massaging lightly. Use 1–2 times per week in the evening. Always patch test 24 hours before first use.",
    benefits: [
      "Enzymatic exfoliation dissolves dead skin protein",
      "Bromelain and papain for texture refinement",
      "Colloidal oatmeal soothes during exfoliation",
      "Rice powder polishes for a refined finish",
      "No water or preservatives — mix fresh every use",
    ],
  },
  {
    id: "12",
    slug: "Organic-creamy-hybrid-wax-beads",
    name: "Hybrid Wax Beads",
    price: 32,
    description:
      "A rosin-free, synthetic-free hybrid wax combining the grip of hard wax with the soothing creaminess of a skin treatment. Shea butter, rosehip oil, and squalane nourish during removal while Organic beeswax provides a clean 4–7 second set for minimal breakage on all hair types. Hypoallergenic. No rosin, artificial fragrance, or synthetic resins.",
    shortDescription:
      "Hypoallergenic hybrid wax beads with shea and squalane for smooth, nourishing hair removal on all hair types.",
    images: ["/images/products/hybrid-wax-beads.png"],
    imageAlt:
      "Epoch Skin Organic Creamy Hybrid Wax Beads - jar of wax beads with Organic shea butter and beeswax for gentle hair removal",
    category: "body" as const,
    featured: false,
    skinType: ["all"],
    size: "7 oz (200 g)",
    inStock: true,
    ingredients: [
      "Butyrospermum Parkii Butter (Organic Shea Butter)",
      "Cera Alba (Organic Beeswax)",
      "Squalane",
      "Rosa Canina Fruit Oil (Organic Rosehip Seed Oil)",
      "Tocopherol (Vitamin E)",
    ],
    howToUse:
      "Melt beads in a wax warmer or microwave-safe bowl (10-second bursts, stirring between) to a thick honey consistency (~45–55°C). Test on inner wrist before applying. Apply a thick layer in the direction of hair growth. Allow to set 4–7 seconds. Grip the edge and pull firmly opposite to hair growth. Remove residue with warm water or oil. Soothe with aloe vera after.",
    benefits: [
      "Clean grip with no hair breakage",
      "Shea butter soothes skin during removal",
      "Squalane glide prevents unnecessary pulling",
      "Rosin-free — ideal for sensitive skin",
      "Works on fine, coarse, and all hair types",
    ],
  },
  {
    id: "13",
    slug: "Organic-calm-hydrate-hydro-jelly-mask",
    name: "Calming Hydro Jelly Mask",
    price: 40,
    description:
      "A cooling, bouncy jelly mask formulated for sensitive, reactive, or irritated skin. Centella asiatica, colloidal oatmeal, beta-glucan, and licorice root reduce redness and calm inflammation while the agar-agar jelly base delivers a deeply hydrating, soothing experience. No synthetic gelling agents or artificial fragrance.",
    shortDescription:
      "Cooling hydro jelly mask with Centella Asiatica and colloidal oatmeal to calm redness and deeply hydrate.",
    images: ["/images/products/hydro-jelly-mask.png"],
    imageAlt:
      "Epoch Skin Organic Calm & Hydrate Hydro Jelly Mask - jar with centella asiatica and colloidal oatmeal for soothing, hydrating jelly mask",
    category: "masks" as const,
    featured: false,
    skinType: ["sensitive", "all"],
    size: "8 oz (236 g)",
    inStock: true,
    ingredients: [
      "Rosa Damascena Flower Water (Organic Rose Water)",
      "Aloe Barbadensis Leaf Juice (Organic Aloe Vera)",
      "Agar (Organic Agar-Agar)",
      "Centella Asiatica Extract",
      "Avena Sativa Kernel Flour (Colloidal Oatmeal)",
      "Glycyrrhiza Glabra Root Extract (Organic Licorice Root)",
      "Beta-Glucan",
      "Lactobacillus Ferment",
      "Citric Acid",
    ],
    howToUse:
      "Apply a generous, even layer to a clean face, avoiding the eye and brow area. Relax 15–20 minutes as the jelly cools and soothes. Peel from the edges, or massage and rinse residue with lukewarm water. Use 1–2 times per week in the evening; follow with toner, serum, and moisturizer.",
    benefits: [
      "Cooling jelly texture soothes on contact",
      "Centella Asiatica reduces inflammation and redness",
      "Colloidal oatmeal calms and protects sensitive skin",
      "Beta-glucan delivers deep, lasting hydration",
      "Natural vegan jelly — no synthetic gelling agents",
    ],
  },
  {
    id: "14",
    slug: "Organic-calm-hydrate-hydro-jelly-powder-mask",
    name: "Calming Hydro Jelly Mask Powder",
    price: 36,
    description:
      "The dry powder version of our Hydro Jelly Mask for maximum freshness and a 12-month shelf life. Mix with aloe vera gel and rose water before each use to activate a fresh, bouncy jelly packed with centella asiatica, licorice root, beta-glucan, and colloidal oatmeal. No water, no preservatives — just clean, active dry ingredients.",
    shortDescription:
      "Dry powder mask that activates into a calming hydro jelly with centella asiatica and colloidal oatmeal.",
    images: ["/images/products/hydro-jelly-mask-powder.png"],
    imageAlt:
      "Epoch Skin Organic Calm & Hydrate Hydro Jelly Powder Mask - 4oz jar of dry powder mask with centella asiatica and agar for jelly activation",
    category: "masks" as const,
    featured: false,
    skinType: ["sensitive", "all"],
    size: "4 oz (113 g)",
    inStock: true,
    ingredients: [
      "Avena Sativa Kernel Flour (Organic Colloidal Oatmeal)",
      "Oryza Sativa Powder (Organic Ultra-Fine Rice Powder)",
      "Centella Asiatica Extract (Organic Centella Powder)",
      "Glycyrrhiza Glabra Root Powder (Organic Licorice Root)",
      "Beta-Glucan",
      "Agar (Organic Agar-Agar)",
    ],
    howToUse:
      "Mix 1–2 teaspoons of powder with 1–2 teaspoons of Organic aloe vera gel and 1–2 teaspoons of rose water or plain water. Stir quickly into a smooth, thick jelly paste. Apply a generous, even layer to clean face and neck, avoiding eyes. Relax 15–20 minutes. Peel gently from edges or rinse with lukewarm water. Use 1–2 times per week; follow with toner, serum, and moisturizer. Patch test 24 hours before first use.",
    benefits: [
      "Activates fresh each use — maximum potency",
      "12-month shelf life dry (no preservatives needed)",
      "Centella Asiatica calms and repairs barrier",
      "Colloidal oatmeal soothes sensitive and reactive skin",
      "Agar-agar creates a bouncy, cooling jelly texture",
    ],
  },
];

// ─── Helper functions (unchanged) ────────────────────────────

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "All" || category === "all") {
    return products;
  }
  return products.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
