import { Product, Category, Testimonial, HeroSlide } from '../types';

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    eyebrow: 'THE SIGNATURE COLLECTION',
    titleLine1: 'WEAR CONFIDENCE',
    titleLine2: 'DEFINE LUXURY',
    description: 'Discover FIBBO Apparels, where premium streetwear meets unparalleled craftsmanship. Designed in Bangladesh for the world.',
    image: 'https://res.cloudinary.com/sorfe6ve/image/upload/v1786522315/ChatGPT_Image_Aug_12_2026_02_11_07_PM.png',
    buttonText: 'SHOP COLLECTION',
  },
  {
    id: 'slide-2',
    eyebrow: 'NEW ARRIVALS',
    titleLine1: 'STATEMENT',
    titleLine2: 'POLO SHIRTS',
    description: 'Elevate your everyday aesthetic with our luxury pique polo shirts. Precision tailoring with gold-accented hardware.',
    image: 'https://res.cloudinary.com/sorfe6ve/image/upload/v1786527941/ChatGPT-Image-Aug-12_-2026_-03_40_16-PM.png',
    buttonText: 'EXPLORE POLOS',
    linkCategory: 'polo-shirts'
  },
  {
    id: 'slide-3',
    eyebrow: 'LIMITED EDITION',
    titleLine1: 'ICONIC',
    titleLine2: 'ATHLETIC JERSEYS',
    description: 'Performance meets streetwear. Breathable micro-mesh fabrics constructed for motion and dominance.',
    image: 'https://res.cloudinary.com/sorfe6ve/image/upload/v1786523502/ChatGPT_Image_Aug_12_2026_02_31_18_PM.png',
    buttonText: 'SHOP JERSEYS',
    linkCategory: 'jerseys'
  }
];

export const CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'T-Shirts',
    slug: 't-shirts',
    image: 'https://res.cloudinary.com/sorfe6ve/image/upload/v1786600376/ChatGPT_Image_Aug_13_2026_11_52_14_AM.png',
    description: 'Heavyweight cotton tees and double-printed styles.',
    itemCount: 12
  },
  {
    id: 'cat-2',
    name: 'Polo',
    slug: 'polo',
    image: 'https://res.cloudinary.com/sorfe6ve/image/upload/v1786552248/ChatGPT_Image_Aug_12_2026_10_30_23_PM.png',
    description: 'Refined collars and luxury fabrics for a sharp aesthetic.',
    itemCount: 8
  },
  {
    id: 'cat-3',
    name: 'Corporate Apparel',
    slug: 'corporate-apparel',
    image: 'https://res.cloudinary.com/sorfe6ve/image/upload/v1786551104/ChatGPT_Image_Aug_12_2026_10_11_28_PM.png',
    description: 'Elevate your team with premium corporate wear and custom branding.',
    itemCount: 5
  },
  {
    id: 'cat-4',
    name: 'Jersey',
    slug: 'jersey',
    image: 'https://res.cloudinary.com/sorfe6ve/image/upload/v1786550436/8097d608-a90d-4017-b3f3-76099946a565.png',
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
  // 250001
  {
    id: 'prod-t1',
    code: '250001',
    name: 'V-Block Essential Tee',
    mainCategory: 't-shirts',
    subCategory: 'half-sleeve',
    type: 'Basic T-Shirt',
    fabric: 'Micro PP',
    fit: 'Regular Fit',
    sleeves: 'Half Sleeve',
    price: 170,
    originalPrice: 200,
    badge: 'Regular Fit',
    image: 'https://res.cloudinary.com/sorfe6ve/image/upload/f_auto,q_auto/v_block_tee',
    hoverImage: 'https://res.cloudinary.com/sorfe6ve/image/upload/f_auto,q_auto/v_block_tee',
    rating: 4.9,
    reviewsCount: 142,
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Sky Blue', hex: '#38BDF8' },
      { name: 'Paste', hex: '#96ead7' }
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    customizationAvailable: true,
    description: 'A clean, versatile everyday t-shirt designed with a comfortable fit and a refined look. Easy to style and suitable for everyday wear.',
    details: [
      'Type: Basic T-Shirt',
      'Fabric: Micro PP',
      'Fit: Regular Fit',
      'Sleeves: Half Sleeve',
      'Available Sizes: M, L, XL, XXL',
      'Available Colors: Black, White, Sky Blue, Paste',
      'Customization: Available'
    ]
  },
  // 250002
  {
    id: 'prod-t3',
    code: '250002',
    name: 'NYC Skyline Graphic Tee',
    mainCategory: 't-shirts',
    subCategory: 'half-sleeve',
    type: 'Basic T-Shirt',
    fabric: 'Micro PP',
    fit: 'Regular Fit',
    sleeves: 'Half Sleeve',
    price: 180,
    originalPrice: 220,
    badge: 'Regular Fit',
    image: 'https://res.cloudinary.com/sorfe6ve/image/upload/v1786610342/250002.png',
    hoverImage: 'https://res.cloudinary.com/sorfe6ve/image/upload/v1786610342/250002.png',
    rating: 4.9,
    reviewsCount: 58,
    colors: [
      { name: 'Sky Blue', hex: '#38BDF8' },
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Paste', hex: '#96ead7' }
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    customizationAvailable: true,
    description: 'A modern NYC-inspired design showcasing the iconic skyline with bold typography, capturing the vibrant spirit and energy of New York City.',
    details: [
      'Type: Basic T-Shirt',
      'Fabric: Micro PP',
      'Fit: Regular Fit',
      'Sleeves: Half Sleeve',
      'Available Sizes: M, L, XL, XXL',
      'Available Colors: Sky Blue, Black, White, Paste',
      'Customization: Available'
    ]
  },
  // 250003
  {
    id: 'prod-t5',
    code: '250003',
    name: 'Versace Medusa Graphic Tee',
    mainCategory: 't-shirts',
    subCategory: 'half-sleeve',
    type: 'Basic T-Shirt',
    fabric: 'Micro PP',
    fit: 'Regular Fit',
    sleeves: 'Half Sleeve',
    price: 190,
    originalPrice: 230,
    badge: 'Designer Edition',
    image: 'https://res.cloudinary.com/sorfe6ve/image/upload/v1786610343/250003.png',
    hoverImage: 'https://res.cloudinary.com/sorfe6ve/image/upload/v1786610343/250003.png',
    rating: 5.0,
    reviewsCount: 74,
    colors: [
      { name: 'Turquoise / Paste', hex: '#96ead7' },
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Sky Blue', hex: '#38BDF8' }
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    customizationAvailable: true,
    description: 'A stylish turquoise t-shirt featuring a striking Medusa-inspired graphic gives you a modern and luxurious designer look.',
    details: [
      'Type: Basic T-Shirt',
      'Fabric: Micro PP',
      'Fit: Regular Fit',
      'Sleeves: Half Sleeve',
      'Available Sizes: M, L, XL, XXL',
      'Available Colors: Turquoise / Paste, Black, White, Sky Blue',
      'Customization: Available'
    ]
  },
  // 250004
  {
    id: 'prod-t4',
    code: '250004',
    name: 'Sunset Mountain Graphic Tee',
    mainCategory: 't-shirts',
    subCategory: 'half-sleeve',
    type: 'Basic T-Shirt',
    fabric: 'Micro PP',
    fit: 'Regular Fit',
    sleeves: 'Half Sleeve',
    price: 180,
    originalPrice: 220,
    badge: 'Regular Fit',
    image: 'https://res.cloudinary.com/sorfe6ve/image/upload/v1786610342/2250004.png',
    hoverImage: 'https://res.cloudinary.com/sorfe6ve/image/upload/v1786610342/2250004.png',
    rating: 4.8,
    reviewsCount: 42,
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Black', hex: '#000000' },
      { name: 'Sky Blue', hex: '#38BDF8' },
      { name: 'Paste', hex: '#96ead7' }
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    customizationAvailable: true,
    description: 'A clean white t-shirt featuring a vibrant sunset mountain graphic with bold "SUNSET" lettering. Casual, stylish, and perfect for everyday wear.',
    details: [
      'Type: Basic T-Shirt',
      'Fabric: Micro PP',
      'Fit: Regular Fit',
      'Sleeves: Half Sleeve',
      'Available Sizes: M, L, XL, XXL',
      'Available Colors: White, Black, Sky Blue, Paste',
      'Customization: Available'
    ]
  },
  // 251001
  {
    id: 'prod-t2',
    code: '251001',
    name: 'Futuristic Japanese Essential Tee',
    mainCategory: 't-shirts',
    subCategory: 'double-printed',
    type: 'Double Printed T-Shirt',
    fabric: 'Micro PP',
    fit: 'Regular Fit',
    sleeves: 'Half Sleeve',
    price: 180,
    originalPrice: 220,
    badge: 'Double Printed',
    image: 'https://res.cloudinary.com/sorfe6ve/image/upload/v1786521646/251001.png',
    hoverImage: 'https://res.cloudinary.com/sorfe6ve/image/upload/v1786521646/251001.png',
    rating: 4.9,
    reviewsCount: 96,
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Sky Blue', hex: '#38BDF8' },
      { name: 'Paste', hex: '#96ead7' }
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    customizationAvailable: true,
    description: 'A clean streetwear T-shirt featuring distinct front and back graphics, combining minimalist typography with a bold monochrome graphic design.',
    details: [
      'Type: Double Printed T-Shirt',
      'Fabric: Micro PP',
      'Fit: Regular Fit',
      'Sleeves: Half Sleeve',
      'Available Sizes: M, L, XL, XXL',
      'Available Colors: Black, White, Sky Blue, Paste',
      'Customization: Available'
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
