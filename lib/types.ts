// types/index.ts

// ──────────────────────────────────────────────
// Product Types
// ──────────────────────────────────────────────

/**
 * Core product representation in the shop
 */
export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number;       // Original price (for sales/discounts)
  description: string;
  shortDescription: string;
  images: string[];              // Array of image URLs
  imageAlt?: string;
  category: ProductCategory;
  skinType: SkinType[];
  ingredients: string[];
  howToUse: string;
  benefits: string[];
  size: string;
  inStock: boolean;
  featured?: boolean;            // Highlight on homepage/featured sections
}

export type ProductCategory =
  | "cleansers"
  | "serums"
  | "moisturizers"
  | "masks"
  | "oils"
  | "tools"
  | "toners"
  | "lip"
  | "eye"
  | "body";

export type SkinType =
  | "all"
  | "dry"
  | "oily"
  | "combination"
  | "sensitive";

// ──────────────────────────────────────────────
// Service Types
// ──────────────────────────────────────────────

/**
 * Waxing service or treatment offering
 */
export interface Service {
  id: string;
  name: string;
  slug: string;
  category: ServiceCategory;
  price: number;
  duration: string;              // Duration in minutes
  description: string;
  benefits: string[];
  image: string;                 // Main service image
  imageAlt?: string;             // Image alt text for accessibility
}

export type ServiceCategory =
  | "body-waxing"
  | "facial-waxing"
  | "specialty-treatments";

// ──────────────────────────────────────────────
// Testimonial Types
// ──────────────────────────────────────────────

/**
 * Client review / testimonial
 */
export interface Testimonial {
  id: string;
  name: string;
  service?: string;              // Optional: which service they mention
  rating: number;                // 1–5
  text: string;
  date: string;
  image?: string;                // Optional client photo
}

// ──────────────────────────────────────────────
// FAQ Types
// ──────────────────────────────────────────────

/**
 * Frequently asked question entry
 */
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
}

export type FAQCategory = "services" | "booking" | "products" | "policies";

// ──────────────────────────────────────────────
// Cart Types
// ──────────────────────────────────────────────

/**
 * Single item in the shopping cart
 */
export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  slug: string;
  size: string;
}

/**
 * Full cart state
 */
export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
}

// ──────────────────────────────────────────────
// Booking Types
// ──────────────────────────────────────────────

/**
 * Data collected during appointment booking
 */
export interface BookingData {
  serviceId: string;
  date: string;
  time: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: "male" | "female" | "other" | "";
  notes?: string;
}

// ──────────────────────────────────────────────
// Contact Form Types
// ──────────────────────────────────────────────

/**
 * Data from general contact / inquiry form
 */
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  serviceInterest?: string;
  message: string;
}

// ──────────────────────────────────────────────
// Checkout & Order Types
// ──────────────────────────────────────────────

/**
 * Full checkout form data (contact + shipping)
 */
export interface CheckoutFormData {
  // Contact Info
  email: string;
  firstName: string;
  lastName: string;
  phone: string;

  // Shipping / Billing Address
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;

  // Additional options
  saveInfo?: boolean;
}

/**
 * Completed order record
 */
export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  shippingAddress: CheckoutFormData;
}

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface Service {
  id: string;
  name: string;
  slug: string;
  category: ServiceCategory;
  price: number;
  duration: string;      // ← change from number to string
  description: string;
  benefits: string[];
  image: string;
  imageAlt?: string;     // Image alt text for accessibility
  popular?: boolean;
}