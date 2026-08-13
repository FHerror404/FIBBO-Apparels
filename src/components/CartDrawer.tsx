import React from 'react';
import { CartItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, newQuantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemoveItem,
  onCheckout 
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-dark-bg text-white border-l border-dark-border shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="px-3 py-3 sm:px-6 sm:py-5 border-b border-dark-border flex items-center justify-between bg-dark-card">
              <h2 className="font-serif text-lg sm:text-2xl text-white flex items-center gap-2 sm:gap-3">
                <ShoppingBag className="w-4 h-4 sm:w-6 sm:h-6 text-gold" />
                Your Bag
                <span className="text-xs sm:text-sm font-sans text-gray-400 font-normal">({items.length})</span>
              </h2>
              <button onClick={onClose} className="p-1 sm:p-2 text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-3 sm:space-y-6 custom-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                  <ShoppingBag size={36} className="mb-3 opacity-30" />
                  <p className="font-sans text-xs sm:text-base">Your bag is currently empty.</p>
                  <button onClick={onClose} className="mt-4 border-b border-gold text-gold hover:text-gold-light pb-0.5 text-xs sm:text-sm uppercase tracking-widest font-bold">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-2.5 sm:gap-4 group">
                    {/* Item Image */}
                    <div className="w-16 h-20 sm:w-24 sm:h-32 bg-[#1a1a1a] flex-shrink-0 relative overflow-hidden flex items-center justify-center p-1 rounded-sm border border-dark-border">
                      <img 
                        src={item.product.image || 'https://res.cloudinary.com/sorfe6ve/image/upload/f_auto,q_auto/v_block_tee'} 
                        alt={item.product.name} 
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-contain" 
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = 'https://res.cloudinary.com/sorfe6ve/image/upload/f_auto,q_auto/v_block_tee';
                        }}
                      />
                    </div>
                    
                    {/* Item Details */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-0.5 sm:mb-1">
                        <h3 className="font-serif text-white text-xs sm:text-base font-medium line-clamp-1">{item.product.name}</h3>
                        <button 
                          onClick={() => onRemoveItem(item.id)}
                          className="text-gray-500 hover:text-red-500 transition-colors p-1 -mr-1"
                          title="Delete product from cart"
                        >
                          <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                      
                      <div className="text-[10px] sm:text-xs text-gray-400 font-sans mb-2 sm:mb-3 space-y-0.5">
                        {item.size && <p>Size: {item.size}</p>}
                        {item.color && <p>Color: {item.color}</p>}
                        {item.fabric && <p>Fabric: {item.fabric}</p>}
                        {item.collar && <p>Collar: {item.collar}</p>}
                      </div>

                      <div className="mt-auto flex items-center justify-between">
                        {/* Stepper */}
                        <div className="flex items-center border border-dark-border bg-black rounded-sm">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, Math.max(item.product.minimumOrder || 1, item.quantity - 1))}
                            className="p-1 sm:p-1.5 text-gray-400 hover:text-white transition-colors"
                          >
                            <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          </button>
                          <span className="w-6 sm:w-8 text-center text-xs sm:text-sm font-sans font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 sm:p-1.5 text-gray-400 hover:text-white transition-colors"
                          >
                            <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          </button>
                        </div>
                        <span className="font-sans text-gold text-[9px] sm:text-xs font-bold border border-gold/30 px-1.5 py-0.5 bg-black/60 rounded-sm">
                          Code: {item.product.code || item.product.id}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-dark-border p-3 sm:p-6 bg-dark-card">
                <div className="flex justify-between items-center mb-3 sm:mb-6">
                  <span className="font-sans text-xs sm:text-sm text-gray-300">Total Quantity</span>
                  <span className="font-serif text-base sm:text-xl text-gold font-bold">{items.reduce((sum, item) => sum + item.quantity, 0)} Pcs</span>
                </div>
                <p className="text-[10px] sm:text-xs text-gray-500 font-sans mb-3 sm:mb-6 text-center">
                  Shipping & taxes calculated at checkout. Cash on Delivery available nationwide.
                </p>
                <button 
                  onClick={onCheckout}
                  className="w-full bg-gold text-black font-sans font-bold text-xs sm:text-sm tracking-widest uppercase py-2.5 sm:py-4 hover:bg-gold-light glow-gold-hover transition-all shadow-md"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
