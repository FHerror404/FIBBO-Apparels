import React from 'react';
import { Product } from '../types';
import { ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView, onAddToCart }) => {
  const handleOrderNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    const productCode = product.code || product.id;
    let msg = `*Order Request - FIBBO Apparels*\n\n`;
    msg += `*Product Name:* ${product.name}\n`;
    msg += `*Product Code:* ${productCode}\n`;
    
    const encodedMsg = encodeURIComponent(msg);
    const rawNumber = (import.meta as any).env?.VITE_WHATSAPP_NUMBER || '8801959644684';
    let waNumber = rawNumber.replace(/[^0-9]/g, '');
    if (waNumber.startsWith('0')) {
      waNumber = '880' + waNumber.slice(1);
    }
    if (!waNumber.startsWith('880')) {
      waNumber = '880' + waNumber;
    }
    window.open(`https://wa.me/${waNumber}?text=${encodedMsg}`, '_blank');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex flex-col bg-dark-card border border-dark-border hover:border-gold/60 transition-all duration-300 rounded-sm overflow-hidden shadow-none"
    >
      {/* Image Container */}
      <div 
        className="relative aspect-[4/5] bg-[#0f0f0f] overflow-hidden cursor-pointer flex items-center justify-center p-1 sm:p-2"
        onClick={() => onQuickView(product)}
      >
        {/* Top-left Badge */}
        {product.badge && (
          <span className="absolute top-1.5 sm:top-3 left-1.5 sm:left-3 z-10 bg-gold/95 text-black font-bold text-[8px] sm:text-[10px] tracking-wider uppercase px-1.5 sm:px-2 py-0.5 shadow-md">
            {product.badge}
          </span>
        )}

        {/* Product Image */}
        <img 
          src={product.image || 'https://res.cloudinary.com/sorfe6ve/image/upload/f_auto,q_auto/v_block_tee'} 
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'https://res.cloudinary.com/sorfe6ve/image/upload/f_auto,q_auto/v_block_tee';
          }}
        />

        {/* Floating Add to Cart Button on bottom-right of image */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="absolute bottom-1.5 sm:bottom-3 right-1.5 sm:right-3 w-7 h-7 sm:w-9 sm:h-9 bg-black/85 hover:bg-gold text-white hover:text-black border border-white/20 hover:border-gold rounded-full flex items-center justify-center shadow-lg transition-all z-20 backdrop-blur-sm"
          title="Add to Cart"
        >
          <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-2 sm:p-4 flex flex-col flex-grow font-sans">
        {/* Title */}
        <h3 
          className="font-medium text-xs sm:text-sm text-white mb-1 sm:mb-1.5 leading-tight group-hover:text-gold transition-colors line-clamp-1 cursor-pointer"
          onClick={() => onQuickView(product)}
        >
          {product.name}
        </h3>

        {/* Product Code & Type Row */}
        <div className="flex items-center justify-between text-[10px] sm:text-xs mb-1.5 sm:mb-3 text-gray-400">
          <span className="inline-flex items-center gap-0.5 sm:gap-1 bg-black/60 text-gold border border-gold/40 text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-sm">
            Code: {product.code || product.id}
          </span>
          {product.type && (
            <span className="text-[9px] sm:text-[11px] text-gray-400 font-medium truncate max-w-[80px] sm:max-w-none">
              {product.type}
            </span>
          )}
        </div>

        {/* Action Buttons: Quick View & Order now */}
        <div className="flex items-center gap-1 sm:gap-2 mt-auto">
          <button 
            type="button"
            onClick={() => onQuickView(product)}
            className="flex-1 bg-dark-bg border border-dark-border text-gray-300 hover:text-gold hover:border-gold py-1 sm:py-2 px-1 text-[9px] sm:text-xs font-bold uppercase tracking-wider transition-all text-center"
          >
            Quick View
          </button>
          <button 
            type="button"
            onClick={handleOrderNow}
            className="flex-1 bg-gold hover:bg-gold-light text-black border border-gold py-1 sm:py-2 px-1 text-[9px] sm:text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1 sm:gap-1.5 shadow-sm"
          >
            <span>Order now</span>
            <img 
              src="https://res.cloudinary.com/sorfe6ve/image/upload/v1786529661/ChatGPT_Image_Aug_12_2026_04_14_05_PM.png" 
              alt="Order now" 
              className="w-3 h-3 sm:w-4 sm:h-4 object-contain"
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
