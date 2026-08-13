import React, { useState, useMemo } from 'react';
import { AnnouncementBar, Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal, CheckoutModal, SearchModal, AboutModal, ContactModal, AccountModal } from './components/Modals';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';
import { ProductsView } from './components/ProductsView';
import { HERO_SLIDES, CATEGORIES, PRODUCTS, TESTIMONIALS } from './data/mockData';
import { CartItem, Product } from './types';
import { ShieldCheck, Truck, RefreshCw, Lock, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'products'>('home');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Navigation history stack
  const [historyStack, setHistoryStack] = useState<Array<{ view: 'home' | 'products'; filter: string | null }>>([
    { view: 'home', filter: null }
  ]);

  const navigateTo = (view: 'home' | 'products', filter: string | null = null) => {
    setCurrentView(view);
    setSelectedCategoryFilter(filter);
    setHistoryStack(prev => {
      const top = prev[prev.length - 1];
      if (top && top.view === view && top.filter === filter) return prev;
      return [...prev, { view, filter }];
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryNavigate = (filterId: string | null) => {
    navigateTo('products', filterId);
  };
  
  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const handleGoBack = () => {
    // 1. First close any active modal or quick view overlay
    if (quickViewProduct) { setQuickViewProduct(null); return; }
    if (isCartOpen) { setIsCartOpen(false); return; }
    if (isSearchOpen) { setIsSearchOpen(false); return; }
    if (isCheckoutOpen) { setIsCheckoutOpen(false); return; }
    if (isAccountOpen) { setIsAccountOpen(false); return; }
    if (isAboutOpen) { setIsAboutOpen(false); return; }
    if (isContactOpen) { setIsContactOpen(false); return; }

    // 2. Otherwise pop navigation history state
    if (historyStack.length > 1) {
      const newStack = historyStack.slice(0, -1);
      const prev = newStack[newStack.length - 1];
      setCurrentView(prev.view);
      setSelectedCategoryFilter(prev.filter);
      setHistoryStack(newStack);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentView('home');
      setSelectedCategoryFilter(null);
    }
  };

  const canGoBack = historyStack.length > 1 || currentView !== 'home' || selectedCategoryFilter !== null || !!quickViewProduct || isCartOpen || isSearchOpen || isCheckoutOpen || isAccountOpen || isAboutOpen || isContactOpen;
  
  // Toast state
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  // Cart operations
  const handleAddToCart = (item: Omit<CartItem, 'id'>) => {
    const id = `${item.product.id}-${item.size}-${item.color}-${item.fabric}-${item.collar}`;
    setCart(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing) {
        return prev.map(i => i.id === id ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, { ...item, id }];
    });
    setToastMessage(`${item.product.name} added to bag`);
    setIsToastVisible(true);
  };

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
  };

  const handleRemoveItem = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartItemCount = useMemo(() => cart.reduce((total, item) => total + item.quantity, 0), [cart]);

  const dynamicCategories = useMemo(() => CATEGORIES.map(cat => {
    const count = PRODUCTS.filter(p => p.mainCategory === cat.slug).length;
    return { ...cat, itemCount: count };
  }), []);

  const featuredNewArrivals = useMemo(() => {
    const newArr = PRODUCTS.filter(p => p.badge === 'New' || p.mainCategory === 'jersey').slice(0, 4);
    return newArr.length > 0 ? newArr : PRODUCTS;
  }, []);

  const featuredBestSellers = useMemo(() => {
    const bs = PRODUCTS.filter(p => p.badge === 'Best Seller' || p.badge === 'Iconic' || (p.price && p.price > 1500)).slice(0, 4);
    return bs.length > 0 ? bs : PRODUCTS;
  }, []);

  return (
    <div className="min-h-screen bg-dark-bg text-[#e5e5e5] font-sans transition-colors duration-200 selection:bg-gold selection:text-black">
      <AnnouncementBar />
      <Navbar 
        cartItemCount={cartItemCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        canGoBack={canGoBack}
        onGoBack={handleGoBack}
        currentView={currentView}
        onViewChange={(v) => navigateTo(v, v === 'home' ? null : selectedCategoryFilter)}
        onNavigateCategory={handleCategoryNavigate}
      />

      <main>
        {currentView === 'home' ? (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Hero slides={HERO_SLIDES} onNavigateCategory={handleCategoryNavigate} />

            {/* Categories Section */}
            <section id="collections" className="py-8 sm:py-24 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
              <div className="flex justify-between items-end mb-4 sm:mb-12">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white mb-1 sm:mb-2">The Collections</h2>
                  <p className="text-gray-400 text-xs sm:text-sm">Curated essentials for the modern wardrobe.</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
                {dynamicCategories.map((category, idx) => (
                  <motion.div 
                    onClick={() => {
                      let filterId: string | null = category.slug;
                      if (category.slug === 't-shirts') filterId = 'half-sleeve';
                      if (category.slug === 'corporate-apparel') filterId = 'corporate';
                      handleCategoryNavigate(filterId);
                    }}
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="group block relative h-[200px] sm:h-[350px] lg:h-[400px] overflow-hidden bg-dark-card border border-dark-border glow-gold-hover cursor-pointer shadow-none rounded-sm"
                  >
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
                    <img src={category.image} alt={category.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 z-20 flex flex-col justify-end p-3 sm:p-8">
                      <span className="text-gold text-[9px] sm:text-xs uppercase tracking-widest font-bold mb-0.5 sm:mb-2">{category.itemCount} Items</span>
                      <h3 className="font-serif text-base sm:text-2xl text-white mb-0.5 sm:mb-2">{category.name}</h3>
                      <p className="text-gray-200 text-xs sm:text-sm hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">{category.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* New Arrivals */}
            <section id="shop" className="py-8 sm:py-24 bg-dark-card border-y border-dark-border">
              <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-4 sm:mb-12">
                  <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white">New Arrivals</h2>
                  <button onClick={() => navigateTo('products')} className="text-gold hover:text-gold-light text-xs sm:text-sm uppercase tracking-widest font-bold border-b border-gold pb-0.5 transition-colors">View All</button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
                  {featuredNewArrivals.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onQuickView={setQuickViewProduct}
                      onAddToCart={(p) => setQuickViewProduct(p)}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Trust Strip */}
            <section className="py-6 sm:py-16 bg-gold text-black border-y border-dark-border">
              <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8 divide-y-0 sm:divide-x divide-black/20">
                  {[
                    { icon: Truck, title: 'Free Shipping', desc: 'Nationwide delivery on all orders' },
                    { icon: ShieldCheck, title: 'Premium Quality', desc: 'Crafted with meticulous attention' },
                    { icon: Lock, title: 'Secure Payment', desc: 'Cash on Delivery available' },
                    { icon: RefreshCw, title: 'Easy Returns', desc: '7-day hassle-free return policy' }
                  ].map((feature, idx) => (
                    <div key={idx} className="flex flex-col items-center text-center p-1 sm:p-0">
                      <feature.icon className="w-5 h-5 sm:w-8 sm:h-8 mb-1.5 sm:mb-4 stroke-[1.5]" />
                      <h4 className="font-bold uppercase tracking-wider sm:tracking-widest text-[10px] sm:text-sm mb-0.5 sm:mb-2">{feature.title}</h4>
                      <p className="text-black/70 text-[9px] sm:text-xs leading-tight">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Best Sellers */}
            <section className="py-8 sm:py-24 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
              <div className="flex justify-between items-end mb-4 sm:mb-12">
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white">Signature Pieces</h2>
                <button onClick={() => navigateTo('products')} className="text-gold hover:text-gold-light text-xs sm:text-sm uppercase tracking-widest font-bold border-b border-gold pb-0.5 transition-colors">Shop Best Sellers</button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
                {featuredBestSellers.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onQuickView={setQuickViewProduct}
                    onAddToCart={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            </section>

            {/* Testimonials */}
            <section className="py-8 sm:py-24 bg-dark-card border-t border-dark-border relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 blur-[100px] rounded-full" />
              <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white mb-6 sm:mb-16 text-center">Words from the Club</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-8">
                  {TESTIMONIALS.map((t, idx) => (
                    <motion.div 
                      key={t.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-black border border-dark-border p-4 sm:p-8 relative glow-gold-hover rounded-sm shadow-none"
                    >
                      <div className="flex gap-1 text-gold mb-2 sm:mb-4">
                        {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-gold" />)}
                      </div>
                      <p className="text-gray-300 font-sans text-xs sm:text-base leading-relaxed mb-3 sm:mb-6 italic">"{t.quote}"</p>
                      <div className="flex justify-between items-end">
                        <div>
                          <h4 className="font-serif text-white text-sm sm:text-lg">{t.name}</h4>
                          <p className="text-gray-500 text-xs sm:text-sm font-sans">{t.location}</p>
                        </div>
                        {t.verifiedPurchase && (
                          <span className="text-[10px] sm:text-xs uppercase tracking-widest text-gold flex items-center gap-1 font-bold">
                            <ShieldCheck size={13} /> Verified
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        ) : (
          <ProductsView 
            onQuickView={setQuickViewProduct} 
            selectedFilter={selectedCategoryFilter}
            onSelectFilter={setSelectedCategoryFilter}
          />
        )}
      </main>

      <Footer onNavigateCategory={handleCategoryNavigate} />

      {/* Overlays */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />
      
      <QuickViewModal 
        isOpen={!!quickViewProduct} 
        onClose={() => setQuickViewProduct(null)} 
        product={quickViewProduct}
        onAddToCart={handleAddToCart}
      />

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        items={cart}
        onComplete={() => setCart([])}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      <SearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onQuickView={setQuickViewProduct}
      />

      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <AccountModal isOpen={isAccountOpen} onClose={() => setIsAccountOpen(false)} />

      <Toast 
        isVisible={isToastVisible} 
        message={toastMessage} 
        onClose={() => setIsToastVisible(false)}
        onAction={() => setIsCartOpen(true)}
        actionText="View Bag"
      />

      {/* Floating WhatsApp Quick Contact Button */}
      <a
        href="https://wa.me/8801959644684"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-3 rounded-full shadow-[0_4px_20px_rgba(16,185,129,0.4)] border border-emerald-400/40 transition-all duration-300 hover:scale-105 group"
        title="Chat on WhatsApp"
      >
        <img 
          src="https://res.cloudinary.com/sorfe6ve/image/upload/v1786529661/ChatGPT_Image_Aug_12_2026_04_14_05_PM.png" 
          alt="WhatsApp" 
          className="w-6 h-6 object-contain"
        />
        <span className="text-xs font-bold font-sans tracking-wide pr-1">
          Message Us
        </span>
      </a>
    </div>
  );
}
