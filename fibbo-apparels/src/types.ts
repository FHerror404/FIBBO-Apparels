export interface Product {
  id: string;
  name: string;
  mainCategory: 't-shirts' | 'polo' | 'corporate-apparel' | 'jersey';
  subCategory: string;
  price?: number; // Price is optional, "Price on request" if missing
  originalPrice?: number;
  image: string;
  hoverImage?: string;
  badge?: 'New' | 'Best Seller' | 'Limited' | 'Iconic';
  rating?: number;
  reviewsCount?: number;
  colors: { name: string; hex: string }[];
  sizes: string[];
  fabricOptions?: string[]; // E.g. Micro PP, PK Mesh
  collarOptions?: string[]; // E.g. Designed Collar & Rib
  fit?: string;
  features?: string[];
  description: string;
  details: string[];
  customizationAvailable?: boolean;
  minimumOrder?: number;
}

export interface CartItem {
  id: string; // Composite ID: productId-size-color-fabric-collar
  product: Product;
  quantity: number;
  size: string;
  color: string;
  fabric?: string;
  collar?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string; // Used for subcategory or main category
  image: string;
  description: string;
  itemCount: number;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  quote: string;
  verifiedPurchase: boolean;
  avatar?: string;
}

export interface HeroSlide {
  id: string;
  eyebrow: string;
  titleLine1: string;
  titleLine2: string; // To be highlighted in gold
  description: string;
  image: string;
  buttonText: string;
  linkCategory?: string;
}
