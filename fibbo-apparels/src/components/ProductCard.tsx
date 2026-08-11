import React from 'react';
import { Product } from '../types';
import { Eye, ShoppingBag, Star } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView, onAddToCart }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex flex-col bg-dark-card border border-dark-border glow-gold-hover transition-all duration-300"
    >
      {/* Image Container */}
      <div 
        className="relative aspect-[4/5] overflow-hidden bg-[#1a1a1a] cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        {product.badge && (
          <div className="absolute top-3 left-3 z-10 px-3 py-1 bg-black/80 backdrop-blur-sm border border-gold/30 text-gold text-[10px] font-bold uppercase tracking-widest">
            {product.badge}
          </div>
        )}
        <img 
          src={product.image} 
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        {product.hoverImage && (
          <img 
            src={product.hoverImage} 
            alt={`${product.name} alternate`}
            className="absolute inset-0 w-full h-full object-cover object-center opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 
          className="font-serif text-lg text-white mb-2 leading-tight group-hover:text-gold transition-colors line-clamp-1 cursor-pointer"
          onClick={() => onQuickView(product)}
        >
          {product.name}
        </h3>
        
        <p className="text-gray-400 font-sans text-xs line-clamp-2 mb-4 flex-grow">
          {product.description}
        </p>

        <div className="flex items-center gap-2 mb-4">
          {product.price ? (
            <>
              <span className="text-sm font-sans text-gold">৳ {product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-xs font-sans text-gray-500 line-through">৳ {product.originalPrice.toLocaleString()}</span>
              )}
            </>
          ) : (
            <span className="text-sm font-sans text-gold italic">Price on request</span>
          )}
        </div>

        {/* Swatches */}
        <div className="flex gap-1.5 mb-5">
          {product.colors.map((color, idx) => (
            <div 
              key={idx}
              className="w-4 h-4 rounded-full border border-gray-700"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2 mt-auto">
          <button 
            onClick={() => onQuickView(product)}
            className="border border-dark-border py-2 text-xs uppercase tracking-widest font-sans text-white hover:text-gold hover:border-gold transition-colors text-center"
          >
            Details
          </button>
          <button 
            onClick={() => onAddToCart(product)}
            className="bg-gold text-black py-2 text-xs uppercase tracking-widest font-sans font-bold hover:bg-gold-light transition-colors text-center"
          >
            Add to Bag
          </button>
        </div>
      </div>
    </motion.div>
  );
};
