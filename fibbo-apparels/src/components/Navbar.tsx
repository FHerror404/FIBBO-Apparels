import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  cartItemCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenAccount: () => void;
  onOpenAbout: () => void;
  onOpenContact: () => void;
}

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-gold text-black py-1.5 px-4 text-center text-xs sm:text-sm font-bold uppercase tracking-widest font-sans z-50 relative">
      <span className="hidden sm:inline">Nationwide Free Home Delivery </span>
      <span className="sm:hidden">Free Delivery </span>
      &mdash; Cash on Delivery Available
    </div>
  );
};

export const Navbar: React.FC<NavbarProps & { currentView: string; onViewChange: (view: 'home' | 'products') => void }> = ({ 
  cartItemCount, 
  onOpenCart, 
  onOpenSearch, 
  onOpenAccount,
  onOpenAbout,
  onOpenContact,
  currentView,
  onViewChange
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', action: () => onViewChange('home') },
    { name: 'Products', action: () => onViewChange('products') },
  ];

  return (
    <nav className={`fixed left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'top-0 bg-dark-bg/95 backdrop-blur-md border-b border-dark-border py-3' : 'top-[31px] sm:top-[33px] bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Left: Search & Desktop Links */}
          <div className="flex-1 flex items-center gap-6">
            <button onClick={onOpenSearch} className="text-white hover:text-gold transition-colors">
              <Search size={20} />
            </button>
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map(link => (
                <button 
                  key={link.name} 
                  onClick={link.action} 
                  className={`text-sm uppercase tracking-wider transition-colors font-sans ${(currentView === link.name.toLowerCase()) ? 'text-gold' : 'text-gray-300 hover:text-gold'}`}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Center: Logo */}
          <div className="flex-1 flex justify-center">
            <button onClick={() => onViewChange('home')} className="hover:scale-105 transition-all duration-300 group">
              <img 
                src="/assets/logos/Horizontal-LOGO-WHITE.png" 
                alt="FIBBO" 
                className="h-8 md:h-9 object-contain group-hover:drop-shadow-[0_0_10px_rgba(201,162,75,0.5)] transition-all"
                onError={(e) => {
                  // Fallback to text if image not loaded
                  (e.target as HTMLElement).style.display = 'none';
                  const parent = (e.target as HTMLElement).parentElement;
                  if (parent && !parent.querySelector('.logo-fallback')) {
                    const span = document.createElement('span');
                    span.className = 'logo-fallback font-serif text-2xl tracking-widest text-white';
                    span.innerHTML = 'FIBBO<span className="text-gold">.</span>';
                    parent.appendChild(span);
                  }
                }}
              />
            </button>
          </div>

          {/* Right: Actions */}
          <div className="flex-1 flex justify-end items-center gap-5">
            <button onClick={onOpenAbout} className="hidden lg:block text-xs uppercase tracking-widest text-gray-400 hover:text-gold transition-colors">About Us</button>
            <button onClick={onOpenContact} className="hidden lg:block text-xs uppercase tracking-widest text-gray-400 hover:text-gold transition-colors">Contact</button>
            <button onClick={onOpenAccount} className="text-white hover:text-gold transition-colors">
              <User size={20} />
            </button>
            <button onClick={onOpenCart} className="text-white hover:text-gold transition-colors relative">
              <ShoppingBag size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button 
              className="md:hidden text-white hover:text-gold transition-colors ml-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-dark-bg border-b border-dark-border"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {navLinks.map(link => (
                <button 
                  key={link.name} 
                  onClick={() => {
                    link.action();
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left text-lg uppercase tracking-wider font-serif ${(currentView === link.name.toLowerCase()) ? 'text-gold' : 'text-white hover:text-gold'}`}
                >
                  {link.name}
                </button>
              ))}
              <div className="h-px bg-dark-border my-2" />
              <button onClick={() => { onOpenAbout(); setIsMobileMenuOpen(false); }} className="text-left text-sm uppercase tracking-widest text-gray-400 hover:text-gold">About Us</button>
              <button onClick={() => { onOpenContact(); setIsMobileMenuOpen(false); }} className="text-left text-sm uppercase tracking-widest text-gray-400 hover:text-gold">Contact</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
