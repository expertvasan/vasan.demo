export type SportCategory = 
  | 'all' 
  | 'basketball' 
  | 'running' 
  | 'tennis' 
  | 'training' 
  | 'soccer' 
  | 'accessories';

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  verified: boolean;
  title: string;
  comment: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: SportCategory;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  tagline: string;
  description: string;
  specs: ProductSpec[];
  features: string[];
  stock: number;
  optionsName: string; // e.g. "Size", "Grip Size", "Weight"
  options: string[];
  skillLevel: 'Elite / Pro' | 'Performance' | 'All-Rounder';
  badge?: string;
  isFeatured?: boolean;
  reviews: ProductReview[];
}

export interface CartItem {
  product: Product;
  selectedOption: string;
  quantity: number;
}

export interface OrderCustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  createdAt: string;
  items: {
    productId: string;
    productName: string;
    brand: string;
    option: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  customerDetails: OrderCustomerDetails;
  shippingMethod: 'standard' | 'express' | 'same-day';
  paymentMethod: 'card' | 'cod' | 'instant';
  status: 'Processing' | 'Dispatched' | 'In Transit' | 'Delivered';
  trackingNumber: string;
  estimatedDelivery: string;
}
