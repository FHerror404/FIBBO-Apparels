import { Product, Category, Testimonial, HeroSlide } from '../types';

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    eyebrow: 'THE SIGNATURE COLLECTION',
    titleLine1: 'WEAR CONFIDENCE',
    titleLine2: 'DEFINE LUXURY',
    description: 'Discover FIBBO Apparels, where premium streetwear meets unparalleled craftsmanship. Designed in Bangladesh for the world.',
    image: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?q=80&w=2070&auto=format&fit=crop',
    buttonText: 'SHOP COLLECTION',
  },
  {
    id: 'slide-2',
    eyebrow: 'NEW ARRIVALS',
    titleLine1: 'STATEMENT',
    titleLine2: 'POLO SHIRTS',
    description: 'Elevate your everyday aesthetic with our luxury pique polo shirts. Precision tailoring with gold-accented hardware.',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1972&auto=format&fit=crop',
    buttonText: 'EXPLORE POLOS',
    linkCategory: 'polo-shirts'
  },
  {
    id: 'slide-3',
    eyebrow: 'LIMITED EDITION',
    titleLine1: 'ICONIC',
    titleLine2: 'ATHLETIC JERSEYS',
    description: 'Performance meets streetwear. Breathable micro-mesh fabrics constructed for motion and dominance.',
    image: 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=1974&auto=format&fit=crop',
    buttonText: 'SHOP JERSEYS',
    linkCategory: 'jerseys'
  }
];

export const CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'T-Shirts',
    slug: 't-shirts',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1780&auto=format&fit=crop',
    description: 'Heavyweight cotton tees and double-printed styles.',
    itemCount: 12
  },
  {
    id: 'cat-2',
    name: 'Polo',
    slug: 'polo',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1976&auto=format&fit=crop',
    description: 'Refined collars and luxury fabrics for a sharp aesthetic.',
    itemCount: 8
  },
  {
    id: 'cat-3',
    name: 'Corporate Apparel',
    slug: 'corporate-apparel',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070&auto=format&fit=crop',
    description: 'Elevate your team with premium corporate wear and custom branding.',
    itemCount: 5
  },
  {
    id: 'cat-4',
    name: 'Jersey',
    slug: 'jersey',
    image: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=2036&auto=format&fit=crop',
    description: 'Breathable, sport-inspired streetwear pieces.',
    itemCount: 6
  }
];

export const SUBCATEGORIES = {
  't-shirts': [
    { name: 'Basic T-Shirt', slug: 'basic-t-shirt' },
    { name: 'Double Printed T-Shirt', slug: 'double-printed-t-shirt' }
  ],
  'polo': [
    { name: 'Basic Polo', slug: 'basic-polo' },
    { name: 'Lacoste Polo', slug: 'lacoste-polo' },
    { name: 'Corporate Polo', slug: 'corporate-polo' }
  ],
  'corporate-apparel': [
    { name: 'Corporate T-Shirt', slug: 'corporate-t-shirt' },
    { name: 'Corporate Polo', slug: 'corporate-polo' },
    { name: 'Custom Branding', slug: 'custom-branding' }
  ],
  'jersey': [
    { name: 'Polo Jersey', slug: 'polo-jersey' },
    { name: 'T-Shirt Jersey', slug: 't-shirt-jersey' }
  ]
};

export const PRODUCTS: Product[] = [
  // T-Shirts
  {
    id: 'prod-t1',
    name: 'Onyx Heavyweight Tee',
    mainCategory: 't-shirts',
    subCategory: 'basic-t-shirt',
    price: 1250,
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1974&auto=format&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1780&auto=format&fit=crop',
    rating: 4.9,
    reviewsCount: 142,
    colors: [
      { name: 'Onyx Black', hex: '#111111' },
      { name: 'Bone White', hex: '#F5F5F0' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'The foundation of the FIBBO wardrobe. Crafted from 280 GSM heavyweight cotton for a structured, luxury drape.',
    details: [
      '280 GSM 100% combed cotton',
      'Drop shoulder oversized fit',
      'Thick ribbed collar',
      'Preshrunk to minimize shrinkage'
    ]
  },
  {
    id: 'prod-t2',
    name: 'Graphic Double Print',
    mainCategory: 't-shirts',
    subCategory: 'double-printed-t-shirt',
    price: 1550,
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=2070&auto=format&fit=crop',
    rating: 4.7,
    reviewsCount: 56,
    colors: [
      { name: 'Desert Sand', hex: '#D2B48C' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Double side high-density print on our premium heavyweight blank.',
    details: [
      '220 GSM medium-weight cotton',
      'Standard tailored fit',
      'Seamless collar'
    ]
  },
  // Polo
  {
    id: 'prod-p1',
    name: 'Midnight Gold Polo',
    mainCategory: 'polo',
    subCategory: 'basic-polo',
    price: 1650,
    originalPrice: 1950,
    badge: 'Iconic',
    image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=1974&auto=format&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1976&auto=format&fit=crop',
    rating: 4.8,
    reviewsCount: 89,
    colors: [
      { name: 'Midnight', hex: '#0F172A' },
      { name: 'Crimson', hex: '#7F1D1D' }
    ],
    sizes: ['M', 'L', 'XL'],
    collarOptions: ['Designed Collar & Rib', 'Standard Collar'],
    description: 'A modern take on the classic polo. Features our signature gold-plated zipper and tailored fit through the chest and arms.',
    details: [
      'Premium pique cotton blend',
      'Gold-tone quarter zip',
      'Tapered athletic fit',
      'Subtle FIBBO chest embroidery'
    ]
  },
  {
    id: 'prod-p2',
    name: 'Classic Lacoste Fit',
    mainCategory: 'polo',
    subCategory: 'lacoste-polo',
    price: 2100,
    badge: 'Limited',
    image: 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?q=80&w=2080&auto=format&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1974&auto=format&fit=crop',
    rating: 4.9,
    reviewsCount: 31,
    colors: [
      { name: 'Black/Gold', hex: '#000000' },
      { name: 'Navy', hex: '#000080' }
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    description: 'Premium pique polo inspired by timeless athletic aesthetics.',
    details: [
      'Cotton pique texture',
      'Concealed button placket',
      'Dry clean recommended'
    ]
  },
  {
    id: 'prod-p3',
    name: 'Executive Polo',
    mainCategory: 'polo',
    subCategory: 'corporate-polo',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1972&auto=format&fit=crop',
    rating: 4.8,
    reviewsCount: 15,
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Navy', hex: '#000080' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    fabricOptions: ['Micro PP', 'PK Mesh'],
    minimumOrder: 50,
    customizationAvailable: true,
    description: 'The standard for corporate uniformity. Available with custom logo embroidery.',
    details: [
      'Durable fabric options',
      'Colorfast treatment',
      'Bulk ordering available'
    ]
  },
  // Corporate Apparel
  {
    id: 'prod-c1',
    name: 'Corporate Essential Tee',
    mainCategory: 'corporate-apparel',
    subCategory: 'corporate-t-shirt',
    image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=2069&auto=format&fit=crop',
    rating: 4.7,
    reviewsCount: 42,
    colors: [
      { name: 'Ash Gray', hex: '#B2BEB5' },
      { name: 'Navy', hex: '#000080' }
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    minimumOrder: 50,
    customizationAvailable: true,
    description: 'Comfortable team t-shirts ready for your company logo.',
    details: [
      '100% cotton',
      'Screen print ready',
      'Bulk discount applicable'
    ]
  },
  // Jersey
  {
    id: 'prod-j1',
    name: 'Aero-Mesh Polo Jersey',
    mainCategory: 'jersey',
    subCategory: 'polo-jersey',
    price: 1450,
    badge: 'New',
    image: 'https://images.unsplash.com/photo-1622445272461-c6580cab6efa?q=80&w=2070&auto=format&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=2036&auto=format&fit=crop',
    rating: 5.0,
    reviewsCount: 24,
    colors: [
      { name: 'Graphite', hex: '#333333' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Street-ready sports aesthetic with a polo collar. High-breathability mesh fabric.',
    details: [
      '100% moisture-wicking poly mesh',
      'Relaxed boxy fit',
      'Sublimation print ready'
    ]
  },
  {
    id: 'prod-j2',
    name: 'Strike Training T-Shirt Jersey',
    mainCategory: 'jersey',
    subCategory: 't-shirt-jersey',
    price: 1350,
    originalPrice: 1550,
    image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?q=80&w=2070&auto=format&fit=crop',
    rating: 4.6,
    reviewsCount: 78,
    colors: [
      { name: 'Royal Blue', hex: '#1D4ED8' },
      { name: 'Black', hex: '#000000' }
    ],
    sizes: ['M', 'L', 'XL'],
    description: 'Built for performance. Aerodynamic fit with laser-cut ventilation zones.',
    details: [
      'Performance stretch fabric',
      'Laser-cut underarm vents',
      'Athletic slim fit'
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Rakib Hasan',
    location: 'Dhaka',
    rating: 5,
    quote: 'The quality of the Onyx tee is insane for the price. The fit is perfect, exactly like premium international streetwear brands. Fast delivery too!',
    verifiedPurchase: true
  },
  {
    id: 't-2',
    name: 'Tanvir Ahmed',
    location: 'Chittagong',
    rating: 5,
    quote: 'Absolutely love the Midnight Gold Polo. The zipper detail makes it stand out. Wore it to a wedding event and got so many compliments.',
    verifiedPurchase: true
  },
  {
    id: 't-3',
    name: 'Sajid Islam',
    location: 'Sylhet',
    rating: 4,
    quote: 'Great packaging and premium feel. The jerseys are very breathable. Only wish they had more colors in stock!',
    verifiedPurchase: true
  },
  {
    id: 't-4',
    name: 'Fahim Rahman',
    location: 'Narayanganj',
    rating: 5,
    quote: 'FIBBO is setting a new standard for BD streetwear. The heavy cotton feels luxurious. I\'ve already bought three shirts.',
    verifiedPurchase: true
  }
];
