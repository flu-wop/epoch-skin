// lib/blog-posts.ts
// Fixed image paths: .jpg → .png to match actual files in /public/images/blog/

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  content: string;
  image: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'glass-skin-layering-routine',
    title: 'The Glass Skin Layering Routine: A Step-by-Step Guide',
    excerpt: 'Achieve that iconic K-Beauty luminous, poreless glow with our organic layering protocol — designed for New Orleans humidity and beyond.',
    date: 'May 10, 2026',
    readTime: '6 min read',
    category: 'Skincare Guide',
    image: '/images/blog/glass-skin.png',   // ← was .jpg
    content: `
## What is Glass Skin?

Glass skin is a Korean beauty standard — skin so hydrated, smooth, and luminous it reflects light like polished glass. No filter required. The key isn't a single product; it's a layering philosophy that builds hydration progressively.

## The Epoch Organic Layering Protocol

### Step 1: Cleanse Gently (Morning & Night)
Start with our **Organic Dewy Glow Oat Cleanser**. The colloidal oatmeal and aloe base removes impurities without stripping the skin barrier. Massage onto damp skin for 60 seconds, then rinse with lukewarm water. pH 4.5–5.5 means it keeps your acid mantle intact.

### Step 2: Tone & Balance
Apply our **Organic Clove Glow Toner** while skin is still slightly damp. The antioxidant-rich formula with clove-infused rose water primes skin to absorb subsequent layers more effectively. Pat — don't rub — into skin using your palms.

### Step 3: Layer Hydrating Serum
Three to five drops of **Organic Tremella Hydrating Serum** pressed into damp skin. Snow mushroom (tremella fuciformis) holds 500x its weight in water — it's nature's answer to hyaluronic acid, but with a smaller molecule that penetrates more deeply.

### Step 4: Lock with Barrier Cream
A pea-sized amount of **Organic Dewy Barrier Glow Cream** seals everything in. The beta-glucan and squalane combo strengthens your moisture barrier over time — meaning each day your skin holds hydration better than the day before.

### Step 5: Weekly Mask
Once or twice a week, follow cleansing with the **Organic Dewy Hydrating Mask** for 10–15 minutes. Cold-process made to preserve actives — kakadu plum and licorice root visibly brighten with consistent use.

## A Note on New Orleans Humidity

In a humid climate, your skin actually benefits. Humidity means more ambient moisture for humectants to pull in — your serums work harder. Lean into lighter textures and focus on barrier support rather than heavy creams.

## The Secret: Consistency Over Complexity

Glass skin isn't achieved in one session. It's the result of a consistent, gentle routine maintained for 4–6 weeks. Less is more. Build slowly, observe how your skin responds, and adjust.

*Book a Glass Skin Treatment at the studio for a professional reset that makes the home routine work even harder.*
    `.trim(),
  },
  {
    slug: 'waxing-before-and-after-care',
    title: 'Before & After Wax Care: Everything You Need to Know',
    excerpt: 'Prep your skin properly, extend your results, and avoid the most common post-wax mistakes with this guide from our licensed estheticians.',
    date: 'April 28, 2026',
    readTime: '5 min read',
    category: 'Studio Tips',
    image: '/images/blog/waxing-tips.png',   // ← was wax-care.jpg (didn't exist)
    content: `
## Before Your Wax Appointment

**48 hours before:**
- Exfoliate gently to lift dead skin cells and prevent ingrown hairs. Our Organic Pineapple Papaya Enzyme Powder is ideal — it dissolves dead cells without abrasion.
- Avoid self-tanner, retinoids, and AHA/BHA treatments for 72 hours prior.
- Make sure hair is at least ¼ inch (about 2 weeks of growth after shaving).

**Day of:**
- Arrive with clean, product-free skin.
- Avoid caffeine if you're sensitive — it can heighten sensitivity to pain.
- Wear comfortable, loose-fitting clothing, especially for body and bikini services.
- Take an OTC pain reliever 30–45 minutes before if you have low pain tolerance.

## During Your Appointment

Our estheticians use **Organic Hybrid Wax Beads** — rosin-free and formulated with shea butter, rosehip oil, and squalane. This means less trauma to the skin and significantly less post-wax irritation than traditional wax.

Communicate openly. Tell your esthetician about any skincare medications (retinol, Accutane, Differin), skin conditions, or sensitivities. We adjust our technique accordingly.

## After Your Wax

**First 24 hours:**
- No hot showers, baths, saunas, or steam.
- No tight clothing over waxed areas.
- No sun exposure or tanning beds.
- Avoid swimming pools (chlorine) and the ocean.
- Skip working out — heat + sweat = irritation.

**Days 2–5:**
- Begin gentle exfoliation (3–5 days post-wax) to prevent ingrown hairs.
- Apply a thin layer of our **Organic Dewy Barrier Glow Cream** to waxed areas for soothing hydration.
- Stay moisturized daily.

**Long-term:**
Regular waxing every 4–6 weeks trains the follicle. Hair grows back finer and sparser over time, and sessions become less uncomfortable. Consistency is everything.
    `.trim(),
  },
  {
    slug: 'why-organic-skincare-matters',
    title: 'Why Organic Ingredients Actually Matter (And How to Read a Label)',
    excerpt: 'Not all "natural" is created equal. Here\'s what certified organic actually means, how to decode an INCI list, and why it matters for your skin long-term.',
    date: 'April 14, 2026',
    readTime: '7 min read',
    category: 'Education',
    image: '/images/blog/skincare-tips.png',   // ← was organic-education.jpg (didn't exist)
    content: `
## "Natural" vs. "Organic" — The Difference Matters

In the skincare industry, "natural" is an unregulated marketing term. A product can call itself natural while containing synthetic preservatives, artificial fragrance, and petrochemical derivatives. "Organic" with USDA or COSMOS certification, however, means:

- Ingredients are grown without synthetic pesticides or GMOs.
- Processing methods are restricted to protect ingredient integrity.
- Third-party audits verify the supply chain.

At Epoch Skin, we specifically source certified organic extracts — not just ingredients that happen to be plant-derived.

## How to Read an INCI Label

INCI (International Nomenclature of Cosmetic Ingredients) is the international standard for listing ingredients. Here's how to navigate it:

**Ingredients are listed in descending order by concentration.** The first five ingredients make up the majority of the formula — pay the most attention here.

**Look for these high-performers:**
- *Aloe barbadensis leaf juice* — organic aloe, the base of many of our formulas
- *Tremella fuciformis sporocarp extract* — snow mushroom; deep hydration
- *Beta-glucan* — barrier repair and anti-inflammatory
- *Squalane* — from olive or sugarcane; locks moisture without clogging pores
- *Centella asiatica extract* — wound healing, anti-inflammatory, collagen support

**Avoid these red flags:**
- *Parfum / Fragrance* — synthetic fragrance is the #1 cause of skincare sensitization
- *PEGs* (polyethylene glycols) — penetration enhancers that may carry impurities
- *Formaldehyde-releasing preservatives* — DMDM hydantoin, imidazolidinyl urea
- *Sodium lauryl sulfate (SLS)* — harsh surfactant that strips the skin barrier

## What We Commit To at Epoch Skin

Every Epoch Skin product lists all ingredients in INCI format, marks which are certified organic, and is batch-tested for pH and stability. This transparency is non-negotiable for us.
    `.trim(),
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(p => p.slug === slug);
}
