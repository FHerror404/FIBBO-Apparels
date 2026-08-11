import React, { useState } from 'react';
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
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  
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

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const newArrivals = PRODUCTS.filter(p => p.badge === 'New' || p.mainCategory === 'jersey').slice(0, 4);
  const bestSellers = PRODUCTS.filter(p => p.badge === 'Best Seller' || p.badge === 'Iconic' || (p.price && p.price > 1500)).slice(0, 4);

  return (
    <div className="min-h-screen bg-dark-bg text-[#e5e5e5] font-sans selection:bg-gold selection:text-black">
      <AnnouncementBar />
      <Navbar 
        cartItemCount={cartItemCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        currentView={currentView}
        onViewChange={setCurrentView}
      />

      <main>
        {currentView === 'home' ? (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Hero slides={HERO_SLIDES} />

            {/* Categories Section */}
            <section id="collections" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-end mb-12">
                <div>
                  <h2 className="font-serif text-3xl md:text-4xl text-white mb-2">The Collections</h2>
                  <p className="text-gray-400 text-sm">Curated essentials for the modern wardrobe.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {CATEGORIES.map((category, idx) => (
                  <motion.div 
                    onClick={() => setCurrentView('products')}
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="group block relative h-[400px] overflow-hidden bg-dark-card border border-dark-border glow-gold-hover cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
                    <img src={category.image} alt={category.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 z-20 flex flex-col justify-end p-8">
                      <span className="text-gold text-xs uppercase tracking-widest font-bold mb-2">{category.itemCount} Items</span>
                      <h3 className="font-serif text-2xl text-white mb-2">{category.name}</h3>
                      <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">{category.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* New Arrivals */}
            <section id="shop" className="py-24 bg-dark-card border-y border-dark-border">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                  <h2 className="font-serif text-3xl md:text-4xl text-white">New Arrivals</h2>
                  <button onClick={() => setCurrentView('products')} className="text-gold hover:text-gold-light text-sm uppercase tracking-widest font-bold border-b border-gold pb-1 transition-colors">View All</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {newArrivals.map(product => (
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
            <section className="py-16 bg-gold text-black border-y border-dark-border">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-black/20">
                  {[
                    { icon: Truck, title: 'Free Shipping', desc: 'Nationwide delivery on all orders' },
                    { icon: ShieldCheck, title: 'Premium Quality', desc: 'Crafted with meticulous attention' },
                    { icon: Lock, title: 'Secure Payment', desc: 'Cash on Delivery available' },
                    { icon: RefreshCw, title: 'Easy Returns', desc: '7-day hassle-free return policy' }
                  ].map((feature, idx) => (
                    <div key={idx} className={`flex flex-col items-center text-center ${idx > 0 ? 'pt-8 sm:pt-0' : ''}`}>
                      <feature.icon size={32} className="mb-4 stroke-[1.5]" />
                      <h4 className="font-bold uppercase tracking-widest text-sm mb-2">{feature.title}</h4>
                      <p className="text-black/70 text-xs">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Best Sellers */}
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-end mb-12">
                <h2 className="font-serif text-3xl md:text-4xl text-white">Signature Pieces</h2>
                <button onClick={() => setCurrentView('products')} className="text-gold hover:text-gold-light text-sm uppercase tracking-widest font-bold border-b border-gold pb-1 transition-colors">Shop Best Sellers</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {bestSellers.map(product => (
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
            <section className="py-24 bg-dark-card border-t border-dark-border relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 blur-[100px] rounded-full" />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <h2 className="font-serif text-3xl md:text-4xl text-white mb-16 text-center">Words from the Club</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {TESTIMONIALS.map((t, idx) => (
                    <motion.div 
                      key={t.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-black border border-dark-border p-8 relative glow-gold-hover"
                    >
                      <div className="flex gap-1 text-gold mb-4">
                        {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} className="fill-gold" />)}
                      </div>
                      <p className="text-gray-300 font-sans leading-relaxed mb-6 italic">"{t.quote}"</p>
                      <div className="flex justify-between items-end">
                        <div>
                          <h4 className="font-serif text-white text-lg">{t.name}</h4>
                          <p className="text-gray-500 text-sm font-sans">{t.location}</p>
                        </div>
                        {t.verifiedPurchase && (
                          <span className="text-xs uppercase tracking-widest text-gold flex items-center gap-1">
                            <ShieldCheck size={14} /> Verified
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
          <ProductsView onQuickView={setQuickViewProduct} />
        )}
      </main>

      <Footer />

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
    </div>
  );
}
