export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  description: string;
  shortDescription: string;
  images: string[];
  imageAlt?: string;
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

export type SkinType =
  | "all"
  | "dry"
  | "oily"
  | "combination"
  | "sensitive";

export interface Service {
  id: string;
  name: string;
  slug: string;
  category: ServiceCategory;
  price: number;
  duration: string;
  description: string;
  benefits: string[];
  image: string;
  imageAlt?: string;
  popular?: boolean;
}

export type ServiceCategory =
  | "body-waxing"
  | "facial-waxing"
  | "specialty-treatments";

export interface Testimonial {
  id: string;
  name: string;
  service?: string;
  rating: number;
  text: string;
  date: string;
  image?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
}

export type FAQCategory = "services" | "booking" | "products" | "policies";

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

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  serviceInterest?: string;
  message: string;
}

export interface CheckoutFormData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
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

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";
