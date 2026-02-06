# Epoch Skin - Premium Waxing Studio & Skincare

A modern, high-performance Next.js website for Epoch Skin, featuring a premium waxing studio and curated skincare product line.

## 🚀 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 3.4
- **UI Components:** Shadcn/ui + Radix UI
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod
- **Deployment:** Vercel

## 📦 Installation

1. **Clone the repository** (or use this codebase)

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your actual API keys (see Integration Guide below)

4. **Run development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎨 Design System

### Colors
- **Primary (Sage):** Warm earth tones - `#5f6f5f`
- **Secondary (Sand):** Soft warm neutrals - `#b5a68f`
- **Accent (Clay):** Muted terracotta for CTAs - `#b87968`
- **Neutrals:** Clean whites and warm grays

### Typography
- **Headings:** Cormorant Garamond (serif)
- **Body:** Inter (sans-serif)

## 📁 Project Structure

```
epoch-skin/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout with fonts
│   ├── page.tsx             # Homepage
│   ├── services/            # Services listing
│   ├── shop/                # Product catalog
│   ├── cart/                # Shopping cart
│   ├── checkout/            # Checkout flow
│   └── book/                # Appointment booking
├── components/
│   ├── ui/                  # Shadcn/ui components
│   ├── layout/              # Header, Footer, Container
│   ├── home/                # Homepage sections
│   ├── shop/                # Product components
│   └── ...                  # Feature-specific components
├── lib/
│   ├── utils.ts             # Utility functions
│   ├── types.ts             # TypeScript interfaces
│   ├── constants.ts         # Site-wide constants
│   └── hooks/               # Custom React hooks
├── data/                    # Mock data (products, services, etc.)
└── public/images/           # Static images
```

## 🔌 Integration Guide

### 1. Appointment Booking (Calendly/Cal.com)

**Current Status:** UI built with mock data

**To Connect:**

**Option A - Calendly (Easiest):**
1. Sign up at [calendly.com](https://calendly.com)
2. Create event types for each service
3. Get your Calendly URL
4. Add to `.env.local`:
   ```
   NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username
   ```
5. Replace booking UI in `app/book/page.tsx` with Calendly embed

**Option B - Cal.com (Open Source):**
1. Sign up at [cal.com](https://cal.com)
2. Create event types
3. Get API key from settings
4. Add to `.env.local`:
   ```
   NEXT_PUBLIC_CALCOM_API_KEY=your_api_key
   ```
5. Use Cal.com API to fetch availability and create bookings

### 2. Payment Processing (Stripe)

**Current Status:** Checkout UI with placeholder payment form

**To Connect:**
1. Install Stripe packages:
   ```bash
   npm install @stripe/stripe-js @stripe/react-stripe-js stripe
   ```
2. Sign up at [stripe.com](https://stripe.com)
3. Get API keys from Dashboard → Developers → API keys
4. Add to `.env.local`:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   ```
5. Create API route `app/api/create-payment-intent/route.ts`
6. Wrap checkout form with Stripe `<Elements>` provider
7. Use `<CardElement>` for credit card input
8. See [Stripe Docs](https://stripe.com/docs/payments/quickstart)

### 3. Email Marketing (Mailchimp)

**Current Status:** Newsletter form with "Coming soon" message

**To Connect:**
1. Sign up at [mailchimp.com](https://mailchimp.com)
2. Create an audience/list
3. Get API key from Account → Extras → API keys
4. Add to `.env.local`:
   ```
   MAILCHIMP_API_KEY=your_api_key
   MAILCHIMP_LIST_ID=your_list_id
   ```
5. Create API route `app/api/subscribe/route.ts`
6. Make POST request to Mailchimp API to add subscribers

### 4. Contact Form (Formspree)

**Current Status:** Contact form with mock submission

**To Connect:**
1. Sign up at [formspree.io](https://formspree.io)
2. Create a form endpoint
3. Add to `.env.local`:
   ```
   FORMSPREE_FORM_ID=your_form_id
   ```
4. Update form action to POST to Formspree endpoint

### 5. Analytics (Google Analytics)

**To Connect:**
1. Create GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get Measurement ID (G-XXXXXXXXXX)
3. Add to `.env.local`:
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```
4. Add Google Analytics script to `app/layout.tsx`

**OR use Vercel Analytics (simpler):**
```bash
npm install @vercel/analytics
```
Add `<Analytics />` component to root layout

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push code to GitHub**

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel auto-detects Next.js

3. **Add environment variables:**
   - In Vercel dashboard → Settings → Environment Variables
   - Add all variables from `.env.local`

4. **Deploy:**
   - Vercel automatically deploys on push to main branch
   - Production URL provided after deployment

### Build Locally

```bash
npm run build
npm run start
```

## 📝 Development Workflow

1. **Mock Data:** All products, services, FAQs in `/data` folder
2. **Server Components:** Default for all pages (better performance)
3. **Client Components:** Used only for interactivity (marked with `"use client"`)
4. **Image Optimization:** Use `next/image` for all images
5. **Type Safety:** TypeScript interfaces in `lib/types.ts`

## ✅ Testing Checklist

### Manual Testing
- [ ] All navigation links work
- [ ] Mobile menu opens/closes smoothly
- [ ] Cart icon displays (shows 0 currently)
- [ ] Responsive layout on mobile/tablet/desktop
- [ ] Header sticky on scroll
- [ ] Footer displays all links and contact info
- [ ] Google Fonts load correctly
- [ ] Colors match design system

### Before Production
- [ ] Add real product images to `/public/images/products/`
- [ ] Replace placeholder text with actual content
- [ ] Set up real booking integration
- [ ] Configure Stripe for payments
- [ ] Connect email marketing service
- [ ] Add Google Analytics
- [ ] Test checkout flow end-to-end
- [ ] Run accessibility audit
- [ ] Optimize images (WebP format)
- [ ] Test on real devices

## 🎯 Next Steps

**Phase 2 - Homepage Components:**
- Hero section with CTA
- Services overview cards
- Featured products grid
- Testimonials carousel
- Instagram gallery
- Newsletter signup form

**Phase 3 - Core Pages:**
- Services page with detailed service cards
- Shop page with filters and product grid
- Product detail pages with image gallery
- About page with brand story
- Contact page with form

**Phase 4 - E-commerce:**
- Cart functionality with localStorage
- Checkout multi-step form
- Order confirmation
- Real-time cart updates

## 📞 Support

For questions or issues, contact: hello@epochskin.com

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
