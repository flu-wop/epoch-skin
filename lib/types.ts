// Product Types
export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number; // Original price for sale items
  description: string;
  shortDescription: string;
  images: string[];
  category: ProductCategory;
  skinType: SkinType[];
  ingredients: string[];
  howToUse: string;
  benefits: string[];
  size: string;
  inStock: boolean;
  featured?: boolean;
}

export type ProductCategory =
  | "cleansers"
  | "serums"
  | "moisturizers"
  | "masks"
  | "oils"
  | "tools";

export type SkinType = "all" | "dry" | "oily" | "combination" | "sensitive";

// Service Types
export interface Service {
  id: string;
  name: string;
  slug: string;
  category: ServiceCategory;
  price: number;
  duration: number; // in minutes
  description: string;
  benefits: string[];
  image: string;
}

export type ServiceCategory =
  | "body-waxing"
  | "facial-waxing"
  | "specialty-treatments";

// Testimonial Types
export interface Testimonial {
  id: string;
  name: string;
  service?: string;
  rating: number; // 1-5
  text: string;
  date: string;
  image?: string;
}

// FAQ Types
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
}

export type FAQCategory = "services" | "booking" | "products" | "policies";

// Cart Types
export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  slug: string;
  size: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
}

// Booking Types
export interface BookingFormData {
  serviceId: string;
  date: string;
  time: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes?: string;
}

// Contact Form Types
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  serviceInterest?: string;
  message: string;
}

// Checkout Types
export interface CheckoutFormData {
  // Contact Info
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  
  // Shipping Address
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  
  // Payment (handled by Stripe)
  saveInfo?: boolean;
}

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

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";
