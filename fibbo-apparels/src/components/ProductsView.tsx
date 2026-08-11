import React, { useState } from 'react';
import { CATEGORIES, SUBCATEGORIES, PRODUCTS } from '../data/mockData';
import { ProductCard } from './ProductCard';
import { Product } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';

interface ProductsViewProps {
  onQuickView: (product: Product) => void;
}

export const ProductsView: React.FC<ProductsViewProps> = ({ onQuickView }) => {
  const [activeMainCategory, setActiveMainCategory] = useState<string | null>(null);
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);

  const mainCategoryObj = activeMainCategory ? CATEGORIES.find(c => c.slug === activeMainCategory) : null;
  const subCategoryList = activeMainCategory ? SUBCATEGORIES[activeMainCategory as keyof typeof SUBCATEGORIES] : [];
  const subCategoryObj = activeSubCategory ? subCategoryList.find(s => s.slug === activeSubCategory) : null;
  
  const displayedProducts = (activeMainCategory && activeSubCategory) 
    ? PRODUCTS.filter(p => p.mainCategory === activeMainCategory && p.subCategory === activeSubCategory)
    : [];

  const breadcrumbs = [
    { name: 'All Products', onClick: () => { setActiveMainCategory(null); setActiveSubCategory(null); } }
  ];
  if (mainCategoryObj) {
    breadcrumbs.push({ name: mainCategoryObj.name, onClick: () => setActiveSubCategory(null) });
  }
  if (subCategoryObj) {
    breadcrumbs.push({ name: subCategoryObj.name, onClick: () => {} });
  }

  const renderBreadcrumbs = () => (
    <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-sans mb-8 overflow-x-auto whitespace-nowrap pb-2">
      {breadcrumbs.map((crumb, idx) => (
        <React.Fragment key={crumb.name}>
          {idx > 0 && <ChevronRight size={14} className="text-dark-border" />}
          <button 
            onClick={crumb.onClick}
            className={`transition-colors ${idx === breadcrumbs.length - 1 ? 'text-gold' : 'text-gray-500 hover:text-white'}`}
          >
            {crumb.name}
          </button>
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen pt-32">
      {renderBreadcrumbs()}

      <AnimatePresence mode="wait">
        {/* VIEW 1: MAIN CATEGORIES */}
        {!activeMainCategory && (
          <motion.div
            key="main-categories"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
          >
            <h1 className="font-serif text-4xl md:text-5xl text-white mb-12">Our Collections</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {CATEGORIES.map((category) => (
                <div 
                  key={category.id}
                  onClick={() => setActiveMainCategory(category.slug)}
                  className="group block relative h-[350px] overflow-hidden bg-dark-card border border-dark-border glow-gold-hover cursor-pointer"
                >
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors z-10" />
                  <img src={category.image} alt={category.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 z-20 flex flex-col justify-center items-center p-8 text-center">
                    <h3 className="font-serif text-3xl text-white mb-4 group-hover:text-gold transition-colors">{category.name}</h3>
                    <button className="text-white text-xs uppercase tracking-widest font-bold border-b border-white pb-1 group-hover:border-gold group-hover:text-gold transition-colors">
                      Explore Collection
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* VIEW 2: SUBCATEGORIES */}
        {activeMainCategory && !activeSubCategory && (
          <motion.div
            key="sub-categories"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
          >
            <h1 className="font-serif text-4xl md:text-5xl text-white mb-6">{mainCategoryObj?.name}</h1>
            <p className="text-gray-400 font-sans max-w-2xl mb-12">{mainCategoryObj?.description}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {subCategoryList.map((sub) => (
                <div 
                  key={sub.slug}
                  onClick={() => setActiveSubCategory(sub.slug)}
                  className="group bg-dark-card border border-dark-border p-8 hover:border-gold glow-gold-hover cursor-pointer transition-all flex flex-col items-center text-center h-48 justify-center"
                >
                  <h3 className="font-serif text-2xl text-white group-hover:text-gold transition-colors mb-4">{sub.name}</h3>
                  <span className="text-gray-500 text-xs uppercase tracking-widest group-hover:text-white transition-colors flex items-center gap-2">
                    View Products <ChevronRight size={14} />
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* VIEW 3: PRODUCT COLLECTION / CUSTOM BRANDING */}
        {activeMainCategory && activeSubCategory && (
          <motion.div
            key="products"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
          >
            <h1 className="font-serif text-4xl md:text-5xl text-white mb-12">{subCategoryObj?.name}</h1>
            
            {activeSubCategory === 'custom-branding' ? (
              <div className="bg-dark-card border border-dark-border p-10 max-w-4xl">
                <h2 className="font-serif text-3xl text-gold mb-6">Elevate Your Corporate Identity</h2>
                <div className="space-y-6 text-gray-300 font-sans mb-10">
                  <p>We provide premium customization services for corporate teams, events, and organizations.</p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-400">
                    <li>High-density Custom Printing</li>
                    <li>Premium Logo Embroidery</li>
                    <li>Corporate Branding Packages</li>
                    <li>Bulk Custom Orders</li>
                  </ul>
                </div>
                <button 
                  onClick={() => {
                    const msg = encodeURIComponent('Hello FIBBO,\nI am interested in Custom Branding.\n\nPlease contact me regarding:\nProduct:\nQuantity:\nBranding requirement:');
                    window.open(`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '8801959644684'}?text=${msg}`, '_blank');
                  }}
                  className="bg-gold text-black font-bold uppercase tracking-widest text-sm px-8 py-4 hover:bg-gold-light transition-colors"
                >
                  Inquire on WhatsApp
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {displayedProducts.length > 0 ? (
                  displayedProducts.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onQuickView={onQuickView}
                      onAddToCart={(p) => onQuickView(p)}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-20 border border-dark-border bg-dark-card">
                    <p className="text-gray-500 font-sans">No products available in this category yet.</p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
