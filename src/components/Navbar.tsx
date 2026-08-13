import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, User, Menu, X, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  cartItemCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenAccount: () => void;
  onOpenAbout: () => void;
  onOpenContact: () => void;
  canGoBack?: boolean;
  onGoBack?: () => void;
  currentView: string;
  onViewChange: (view: 'home' | 'products') => void;
  onNavigateCategory?: (filterId: string | null) => void;
}

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-gold text-black py-1 px-2 text-center text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-wider font-sans z-50 relative">
      <span className="hidden sm:inline">Nationwide Free Home Delivery </span>
      <span className="sm:hidden">Free Delivery </span>
      &mdash; Cash on Delivery Available
    </div>
  );
};

export const Navbar: React.FC<NavbarProps> = ({ 
  cartItemCount, 
  onOpenCart, 
  onOpenSearch, 
  onOpenAccount,
  onOpenAbout,
  onOpenContact,
  canGoBack = false,
  onGoBack,
  currentView,
  onViewChange,
  onNavigateCategory
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
    { name: 'Collections', action: () => { if (onNavigateCategory) onNavigateCategory(null); onViewChange('products'); } },
  ];

  const isLinkActive = (linkName: string) => {
    if (linkName === 'Home') return currentView === 'home';
    if (linkName === 'Collections') return currentView === 'products';
    return false;
  };

  return (
    <nav className={`fixed left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? 'top-0 bg-dark-bg/90 backdrop-blur-md border-b border-dark-border py-2 sm:py-3 shadow-sm' 
        : 'top-[22px] sm:top-[33px] bg-transparent py-2.5 sm:py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Left: Back Button, Search & Desktop Links */}
          <div className="flex-1 flex items-center gap-1.5 sm:gap-5">
            {onGoBack && (
              <button 
                type="button"
                onClick={onGoBack}
                className={`flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1.5 rounded text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 border ${
                  canGoBack 
                    ? 'bg-gold text-black border-gold hover:bg-gold-light shadow-[0_0_12px_rgba(201,162,75,0.35)] cursor-pointer' 
                    : 'bg-dark-card/80 text-gray-300 border-dark-border hover:border-gold/50 hover:text-white cursor-pointer'
                }`}
                title="Go back to previous page or interaction"
              >
                <ArrowLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5]" />
                <span>Back</span>
              </button>
            )}

            <button onClick={onOpenSearch} className="text-white hover:text-gold transition-colors p-1" title="Search">
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="hidden lg:flex items-center gap-5">
              {navLinks.map(link => (
                <button 
                  key={link.name} 
                  onClick={link.action} 
                  className={`text-xs uppercase tracking-wider transition-colors font-sans ${
                    isLinkActive(link.name) ? 'text-gold font-bold' : 'text-gray-300 hover:text-gold'
                  }`}
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
                src="https://res.cloudinary.com/sorfe6ve/image/upload/v1786518062/Horizontal-LOGO-WHITE.png" 
                alt="FIBBO APPARELS" 
                className="h-6 sm:h-8 md:h-10 object-contain transition-all brightness-100 group-hover:drop-shadow-[0_0_10px_rgba(201,162,75,0.5)]"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://res.cloudinary.com/sorfe6ve/image/upload/v1786518062/Horizontal-LOGO-WHITE.png';
                }}
              />
            </button>
          </div>

          {/* Right: Actions */}
          <div className="flex-1 flex justify-end items-center gap-2 sm:gap-4">
            <button onClick={onOpenAbout} className="hidden xl:block text-xs uppercase tracking-widest text-gray-400 hover:text-gold transition-colors">About Us</button>
            <button onClick={onOpenContact} className="hidden xl:block text-xs uppercase tracking-widest text-gray-400 hover:text-gold transition-colors">Contact</button>

            <button onClick={onOpenAccount} className="text-white hover:text-gold transition-colors p-1" title="Account">
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            
            <button onClick={onOpenCart} className="text-white hover:text-gold transition-colors relative p-1" title="Shopping Bag">
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-black text-[9px] sm:text-[10px] font-bold w-3.5 h-3.5 sm:w-4 sm:h-4 flex items-center justify-center rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>

            <button 
              className="lg:hidden text-white hover:text-gold transition-colors ml-1 p-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              title="Toggle Menu"
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
            className="lg:hidden overflow-hidden bg-dark-bg border-b border-dark-border"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {onGoBack && (
                <button 
                  type="button"
                  onClick={() => {
                    onGoBack();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-gold font-bold text-base uppercase tracking-wider font-serif py-2 border-b border-gold/20"
                >
                  <ArrowLeft size={18} />
                  <span>Go Back</span>
                </button>
              )}
              {navLinks.map(link => (
                <button 
                  key={link.name} 
                  onClick={() => {
                    link.action();
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left text-lg uppercase tracking-wider font-serif ${
                    isLinkActive(link.name) ? 'text-gold font-bold' : 'text-white hover:text-gold'
                  }`}
                >
                  {link.name}
                </button>
              ))}
              
              <div className="h-px bg-dark-border my-1" />

              <button onClick={() => { onOpenAbout(); setIsMobileMenuOpen(false); }} className="text-left text-sm uppercase tracking-widest text-gray-400 hover:text-gold">About Us</button>
              <button onClick={() => { onOpenContact(); setIsMobileMenuOpen(false); }} className="text-left text-sm uppercase tracking-widest text-gray-400 hover:text-gold">Contact</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
