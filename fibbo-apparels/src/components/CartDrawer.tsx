import React from 'react';
import { CartItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';

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
  const subtotal = items.reduce((total, item) => total + ((item.product.price || 0) * item.quantity), 0);
  const hasRequestPriceItems = items.some(item => !item.product.price);

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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-dark-bg border-l border-dark-border shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-dark-border flex items-center justify-between bg-dark-card">
              <h2 className="font-serif text-2xl text-white flex items-center gap-3">
                <ShoppingBag size={24} className="text-gold" />
                Your Bag
                <span className="text-sm font-sans text-gray-400 font-normal">({items.length})</span>
              </h2>
              <button onClick={onClose} className="p-2 text-gray-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                  <ShoppingBag size={48} className="mb-4 opacity-20" />
                  <p className="font-sans">Your bag is currently empty.</p>
                  <button onClick={onClose} className="mt-6 border-b border-gold text-gold hover:text-gold-light pb-1 text-sm uppercase tracking-widest">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    {/* Item Image */}
                    <div className="w-24 h-32 bg-[#1a1a1a] flex-shrink-0 relative overflow-hidden">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    
                    {/* Item Details */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-serif text-white line-clamp-1">{item.product.name}</h3>
                        <button 
                          onClick={() => onRemoveItem(item.id)}
                          className="text-gray-500 hover:text-gold transition-colors p-1 -mr-1"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      
                      <div className="text-xs text-gray-400 font-sans mb-3 space-y-1">
                        {item.size && <p>Size: {item.size}</p>}
                        {item.color && <p>Color: {item.color}</p>}
                        {item.fabric && <p>Fabric: {item.fabric}</p>}
                        {item.collar && <p>Collar: {item.collar}</p>}
                      </div>

                      <div className="mt-auto flex items-center justify-between">
                        {/* Stepper */}
                        <div className="flex items-center border border-dark-border bg-black">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, Math.max(item.product.minimumOrder || 1, item.quantity - 1))}
                            className="p-2 text-gray-400 hover:text-white transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-sans">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-2 text-gray-400 hover:text-white transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="font-sans text-white text-sm">
                          {item.product.price ? `৳ ${(item.product.price * item.quantity).toLocaleString()}` : <span className="text-gold italic text-xs">Request Price</span>}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-dark-border p-6 bg-dark-card">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-sans text-gray-300">Estimate Subtotal</span>
                  <span className="font-serif text-2xl text-white">৳ {subtotal.toLocaleString()} {hasRequestPriceItems && '+'}</span>
                </div>
                <p className="text-xs text-gray-500 font-sans mb-6 text-center">
                  Shipping & taxes calculated at checkout. Some items require price quotation.
                </p>
                <button 
                  onClick={onCheckout}
                  className="w-full bg-gold text-black font-sans font-bold text-sm tracking-widest uppercase py-4 hover:bg-gold-light glow-gold-hover transition-all"
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
