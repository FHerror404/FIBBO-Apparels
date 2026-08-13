import React, { useState, useEffect, useMemo } from 'react';
import { PRODUCTS } from '../data/mockData';
import { ProductCard } from './ProductCard';
import { Product } from '../types';
import { motion } from 'motion/react';
import { X } from 'lucide-react';

interface ProductsViewProps {
  onQuickView: (product: Product) => void;
  selectedFilter?: string | null;
  onSelectFilter?: (filter: string | null) => void;
}

export const ProductsView: React.FC<ProductsViewProps> = ({ 
  onQuickView, 
  selectedFilter = null,
  onSelectFilter 
}) => {
  const [internalFilter, setInternalFilter] = useState<string | null>(selectedFilter);

  useEffect(() => {
    setInternalFilter(selectedFilter);
  }, [selectedFilter]);

  const activeFilter = internalFilter;

  const handleFilterClick = (id: string) => {
    const nextFilter = activeFilter === id ? null : id;
    setInternalFilter(nextFilter);
    if (onSelectFilter) {
      onSelectFilter(nextFilter);
    }
  };

  // Helper to count matching products for each filter
  const getProductCountForFilter = (id: string): number => {
    return PRODUCTS.filter(p => {
      if (id === 'half-sleeve') {
        return p.subCategory === 'half-sleeve' || p.sleeves === 'Half Sleeve' || (p.mainCategory === 't-shirts' && p.subCategory !== 'full-sleeve' && p.subCategory !== 'double-printed');
      }
      if (id === 'full-sleeve') {
        return p.subCategory === 'full-sleeve' || p.sleeves === 'Full Sleeve';
      }
      if (id === 'double-printed') {
        return p.subCategory === 'double-printed' || p.type === 'Double Printed T-Shirt';
      }
      if (id === 'polo') {
        return p.mainCategory === 'polo';
      }
      if (id === 'corporate') {
        return p.mainCategory === 'corporate-apparel';
      }
      if (id === 'jersey') {
        return p.mainCategory === 'jersey';
      }
      return p.subCategory === id || p.mainCategory === id;
    }).length;
  };

  // Relevant filter chip options
  const filterOptions = useMemo(() => [
    { id: 'half-sleeve', name: 'Half Sleeve T-shirt' },
    { id: 'full-sleeve', name: 'Full Sleeve T-shirt' },
    { id: 'double-printed', name: 'Double Printed T-shirt' },
    { id: 'polo', name: 'Polo T-shirt' },
    { id: 'corporate', name: 'Corporate Apparel' },
    { id: 'jersey', name: 'Jersey' }
  ].map(opt => ({
    ...opt,
    count: getProductCountForFilter(opt.id)
  })), [PRODUCTS]);

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    let list = PRODUCTS;
    if (activeFilter) {
      list = PRODUCTS.filter(p => {
        if (activeFilter === 'half-sleeve') {
          return p.subCategory === 'half-sleeve' || p.sleeves === 'Half Sleeve' || (p.mainCategory === 't-shirts' && p.subCategory !== 'full-sleeve' && p.subCategory !== 'double-printed');
        }
        if (activeFilter === 'full-sleeve') {
          return p.subCategory === 'full-sleeve' || p.sleeves === 'Full Sleeve';
        }
        if (activeFilter === 'double-printed') {
          return p.type === 'Double Printed T-Shirt' || p.subCategory === 'double-printed';
        }
        if (activeFilter === 'polo') {
          return p.mainCategory === 'polo';
        }
        if (activeFilter === 'jersey') {
          return p.mainCategory === 'jersey';
        }
        if (activeFilter === 'corporate') {
          return p.mainCategory === 'corporate-apparel';
        }
        return true;
      });
    }

    return [...list].sort((a, b) => {
      const codeA = parseInt(a.code || '0', 10);
      const codeB = parseInt(b.code || '0', 10);
      return codeA - codeB;
    });
  }, [activeFilter]);

  const activeOptionObj = filterOptions.find(f => f.id === activeFilter);

  return (
    <div className="py-8 sm:py-20 max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 min-h-screen pt-20 sm:pt-28">
      
      {/* SECTION HEADER & TITLE */}
      <div className="mb-3 sm:mb-6">
        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-0.5 sm:mb-2">Shop Collection</h1>
        <p className="text-gray-400 text-xs font-sans">Browse our full range of premium apparel</p>
      </div>

      {/* TOP WRAPPED FILTER PILLS CHIPS BAR */}
      <div className="mb-3 sm:mb-6">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {filterOptions.map((opt) => {
            const isSelected = activeFilter === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleFilterClick(opt.id)}
                className={`flex items-center gap-1 px-2.5 sm:px-4 py-1 sm:py-2 rounded-full text-[10px] sm:text-xs font-sans transition-all border ${
                  isSelected 
                    ? 'bg-gold/15 border-gold text-gold font-bold shadow-sm' 
                    : 'bg-dark-card/90 border-dark-border text-gray-300 hover:border-gold hover:text-white'
                }`}
              >
                <span>{opt.name}</span>
                <span className={`text-[9px] sm:text-[10px] font-normal ${isSelected ? 'text-gold/80' : 'text-gray-500'}`}>
                  {opt.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ACTIVE FILTER STATUS BAR */}
      {activeFilter && (
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-6 pb-2 border-b border-dark-border">
          <div className="flex items-center gap-1.5 bg-dark-card border border-gold text-gold text-[10px] sm:text-xs font-bold px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full">
            <span>{activeOptionObj?.name || activeFilter}</span>
            <button 
              type="button"
              onClick={() => handleFilterClick(activeFilter)}
              className="hover:text-white transition-colors"
              title="Remove filter"
            >
              <X size={12} />
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              setInternalFilter(null);
              if (onSelectFilter) onSelectFilter(null);
            }}
            className="text-[11px] sm:text-xs text-gray-400 hover:text-white underline font-sans transition-colors"
          >
            Clear
          </button>
        </div>
      )}

      {/* PRODUCT GRID */}
      <motion.div 
        key={activeFilter || 'all'}
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-6"
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onQuickView={onQuickView}
              onAddToCart={(p) => onQuickView(p)}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-20 border border-dark-border bg-dark-card rounded-sm">
            <p className="text-gray-400 font-sans text-sm mb-3">No products matched the selected filter.</p>
            <button 
              type="button"
              onClick={() => {
                setInternalFilter(null);
                if (onSelectFilter) onSelectFilter(null);
              }}
              className="text-gold border border-gold px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-gold hover:text-black transition-all"
            >
              View All Products
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
