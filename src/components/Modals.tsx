import React, { useState } from 'react';
import { Product, CartItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search as SearchIcon, ShieldCheck, MapPin, Phone, Mail, Heart, CheckCircle, Plus, Minus, Trash2, Maximize2 } from 'lucide-react';
import { PRODUCTS } from '../data/mockData';

// --- Shared Modal Wrapper ---
interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ isOpen, onClose, children, maxWidth = 'max-w-2xl' }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto custom-scrollbar"
        >
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            onClick={e => e.stopPropagation()}
            className={`w-full ${maxWidth} bg-dark-bg border border-dark-border text-white relative my-4 sm:my-8 shadow-2xl rounded-sm`}
          >
            <button onClick={onClose} className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 p-1.5 sm:p-2 bg-black/50 hover:bg-gold text-white hover:text-black transition-colors rounded-none">
              <X size={18} />
            </button>
            {children}
          </motion.div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

// --- Quick View Modal ---
interface QuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: Omit<CartItem, 'id'>) => void;
}

export const QuickViewModal: React.FC<QuickViewProps> = ({ product, isOpen, onClose, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedFabric, setSelectedFabric] = useState<string>('');
  const [selectedCollar, setSelectedCollar] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [sizeUnit, setSizeUnit] = useState<'INCH' | 'CM'>('INCH');
  const [isImageExpanded, setIsImageExpanded] = useState(false);

  // Reset state when product changes
  React.useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || 'M');
      setSelectedColor(product.colors[0]?.name || '');
      setSelectedFabric(product.fabricOptions?.[0] || '');
      setSelectedCollar(product.collarOptions?.[0] || '');
      setQuantity(product.minimumOrder || 1);
      setIsWishlisted(false);
      setIsImageExpanded(false);
    }
  }, [product]);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart({
      product,
      quantity,
      size: selectedSize,
      color: selectedColor,
      fabric: selectedFabric,
      collar: selectedCollar
    });
    onClose();
  };

  const handleOrderWhatsApp = () => {
    const productCode = product.code || product.id;
    let msg = `*Order Request - FIBBO Apparels*\n\n`;
    msg += `*Product Name:* ${product.name}\n`;
    msg += `*Product Code:* ${productCode}\n`;
    msg += `*Quantity:* ${quantity}\n`;
    if (selectedColor) msg += `*Color:* ${selectedColor}\n`;
    if (selectedSize) msg += `*Size:* ${selectedSize}\n`;
    if (selectedFabric) msg += `*Fabric:* ${selectedFabric}\n`;
    if (selectedCollar) msg += `*Collar:* ${selectedCollar}\n`;
    
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
    <>
      <ModalWrapper isOpen={isOpen} onClose={onClose} maxWidth="max-w-6xl">
        <div className="flex flex-col lg:flex-row max-h-[90vh] overflow-y-auto custom-scrollbar bg-dark-bg text-white">
          
          {/* LEFT COLUMN: Main Showcase */}
          <div className="w-full lg:w-[48%] p-3 sm:p-6 lg:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-dark-border">
            {/* Main Image Container */}
            <div className="relative w-full aspect-[3/4] bg-[#0c0c0c] border border-dark-border overflow-hidden group flex items-center justify-center p-1.5 sm:p-2 rounded-sm">
              {/* SALE / Badge */}
              <span className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-red-600 text-white font-bold text-[10px] sm:text-xs tracking-wider uppercase px-2 py-0.5 sm:px-3 sm:py-1 shadow-md z-10">
                {product.badge || 'SALE'}
              </span>

              {/* Uncropped Full Image */}
              <img 
                src={product.image || 'https://res.cloudinary.com/sorfe6ve/image/upload/f_auto,q_auto/v_block_tee'} 
                alt={product.name} 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain cursor-pointer transition-transform duration-300 group-hover:scale-[1.02]" 
                onClick={() => setIsImageExpanded(true)}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://res.cloudinary.com/sorfe6ve/image/upload/f_auto,q_auto/v_block_tee';
                }}
              />

              {/* Expand Overlay Button */}
              <button
                type="button"
                onClick={() => setIsImageExpanded(true)}
                className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-black/85 hover:bg-gold text-white hover:text-black border border-white/20 hover:border-gold px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-sm font-bold text-[10px] sm:text-xs uppercase tracking-wider flex items-center gap-1 shadow-lg z-20 backdrop-blur-md transition-all"
                title="Click to view full image overlay"
              >
                <Maximize2 size={12} /> Expand
              </button>
            </div>
            
            <p className="text-[10px] sm:text-[11px] text-gray-500 text-center mt-2 sm:mt-3 font-sans">
              Click image or Expand button to open full resolution overlay
            </p>
          </div>

        {/* RIGHT COLUMN: Product Information, Selectors, Guarantee & Size Chart */}
        <div className="w-full lg:w-[52%] p-3 sm:p-6 lg:p-8 flex flex-col gap-3 sm:gap-5 font-sans">
          
          {/* Header & Wishlist */}
          <div className="flex justify-between items-start gap-4">
            <h2 className="font-serif text-2xl lg:text-3xl font-bold text-white leading-snug">
              {product.name.replace(/\s*\([^)]*CODE[^)]*\)/gi, '')}
            </h2>
            <button 
              type="button"
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`p-2.5 border transition-all shrink-0 ${
                isWishlisted 
                  ? 'border-red-500 text-red-500 bg-red-500/10' 
                  : 'border-dark-border text-gray-400 hover:text-white hover:border-gold'
              }`}
              title="Add to Wishlist"
            >
              <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Product Code Row */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 bg-black/60 text-gold border border-gold/40 text-xs font-bold px-3 py-1 rounded-sm">
              Product Code: {product.code || product.id}
            </span>
            {product.type && (
              <span className="text-xs text-gray-400 font-medium bg-dark-card/60 px-2.5 py-1 border border-dark-border rounded-sm">
                {product.type}
              </span>
            )}
          </div>

          {/* Select Size Boxed Buttons */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block">Select Size:</label>
            <div className="flex flex-wrap gap-2">
              {(product.sizes || ['M', 'L', 'XL', 'XXL']).map(size => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[42px] px-3.5 py-2 text-xs font-bold uppercase border transition-all ${
                      isSelected 
                        ? 'border-gold text-gold bg-gold/10 shadow-sm' 
                        : 'border-dark-border bg-dark-card/60 text-gray-300 hover:border-gold'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Select Color Boxed Chips */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block">
                Select Color: <span className="text-white font-medium">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-2.5">
                {product.colors.map(color => {
                  const isSelected = selectedColor === color.name;
                  return (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color.name)}
                      className={`flex items-center gap-2 px-3 py-1.5 border transition-all ${
                        isSelected 
                          ? 'border-gold bg-gold/10 text-gold font-medium' 
                          : 'border-dark-border bg-dark-card/60 text-gray-300 hover:border-gold'
                      }`}
                    >
                      <span 
                        className="w-3.5 h-3.5 rounded-sm border border-white/30 shrink-0" 
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="text-xs tracking-wide uppercase">{color.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Fabric & Collar Options if applicable */}
          {product.fabricOptions && product.fabricOptions.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block">Fabric Option:</label>
              <div className="flex flex-wrap gap-2">
                {product.fabricOptions.map(fab => (
                  <button
                    key={fab}
                    type="button"
                    onClick={() => setSelectedFabric(fab)}
                    className={`px-3 py-1.5 text-xs font-medium border transition-all ${selectedFabric === fab ? 'border-gold text-gold bg-gold/10' : 'border-dark-border text-gray-400 hover:border-gold'}`}
                  >
                    {fab}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & CTA Row */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <div className="flex items-center border border-dark-border bg-dark-card/80 h-11 rounded-sm">
              <button 
                type="button"
                onClick={() => setQuantity(Math.max(product.minimumOrder || 1, quantity - 1))}
                className="w-9 h-full flex items-center justify-center text-gray-300 hover:text-gold transition-colors font-bold text-base"
              >
                -
              </button>
              <input 
                type="number" 
                value={quantity} 
                onChange={(e) => setQuantity(Math.max(product.minimumOrder || 1, parseInt(e.target.value) || 1))}
                className="w-10 h-full bg-transparent text-white text-center font-bold text-xs outline-none border-x border-dark-border"
              />
              <button 
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-9 h-full flex items-center justify-center text-gray-300 hover:text-gold transition-colors font-bold text-base"
              >
                +
              </button>
            </div>

            <button 
              type="button"
              onClick={handleAdd}
              className="flex-1 bg-gold text-black font-bold text-xs tracking-widest uppercase h-11 px-6 hover:bg-gold-light transition-all flex items-center justify-center gap-2 shadow-md rounded-sm"
            >
              <Plus size={16} /> Add To Cart
            </button>

            <button 
              type="button"
              onClick={handleOrderWhatsApp}
              className="bg-gold text-black hover:bg-gold-light font-bold text-xs tracking-widest uppercase h-11 px-5 transition-all flex items-center justify-center gap-2 shadow-md rounded-sm"
            >
              <span>Order now</span>
              <img 
                src="https://res.cloudinary.com/sorfe6ve/image/upload/v1786529661/ChatGPT_Image_Aug_12_2026_04_14_05_PM.png" 
                alt="Order now" 
                className="w-5 h-5 object-contain"
              />
            </button>
          </div>

          {/* Easy Returns & Exchange Guarantee Box */}
          <div className="p-3.5 bg-dark-card/90 border border-dark-border space-y-2 text-xs rounded-sm">
            <div className="flex items-center justify-between text-gold font-bold text-xs uppercase tracking-wider pb-1.5 border-b border-dark-border">
              <span className="flex items-center gap-2">
                <CheckCircle size={15} /> Easy Returns & Exchange
              </span>
              <span className="text-[10px] text-gray-400 font-normal">Terms apply</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-gray-300">
              <div className="flex items-center gap-1.5"><CheckCircle size={12} className="text-gold shrink-0" /> Tell us within 7 days</div>
              <div className="flex items-center gap-1.5"><CheckCircle size={12} className="text-gold shrink-0" /> Free return shipping*</div>
              <div className="flex items-center gap-1.5"><CheckCircle size={12} className="text-gold shrink-0" /> Instant refund on receipt</div>
            </div>
          </div>

          {/* Product Description & Detailed Specification */}
          <div className="space-y-2 text-xs text-gray-300 leading-relaxed pt-1">
            <p className="text-gray-400">{product.description}</p>
            
            <h4 className="font-bold text-white text-xs uppercase tracking-wider pt-2 border-t border-dark-border">
              Detailed Specification:
            </h4>
            <ul className="list-disc pl-4 space-y-1 text-gray-300">
              <li>Type: <span className="text-white font-medium">{product.type || 'Basic T-Shirt'}</span></li>
              <li>Fabric: <span className="text-white font-medium">{product.fabric || 'Micro PP'}</span></li>
              <li>Fit: <span className="text-white font-medium">{product.fit || 'Regular Fit, Crew Neck Mid-weight'}</span></li>
              <li>Sleeves: <span className="text-white font-medium">{product.sleeves || 'Half Sleeve'}</span></li>
              <li>Available Sizes: <span className="text-white font-medium">{(product.sizes || ['M', 'L', 'XL', 'XXL']).join(', ')}</span></li>
              <li>Available Colors: <span className="text-white font-medium">{product.colors ? product.colors.map(c => c.name).join(', ') : 'Black, White, Skyblue'}</span></li>
              <li>Customization: <span className="text-gold font-medium">{product.customizationAvailable !== false ? 'Available' : 'N/A'}</span></li>
            </ul>
          </div>

          {/* Size Chart Table */}
          <div className="pt-2 border-t border-dark-border">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-white text-xs uppercase tracking-wider">
                Size chart - In {sizeUnit.toLowerCase()}s (Expected Deviation &lt; 3%)
              </span>
              <div className="flex border border-dark-border bg-dark-card text-[10px] font-bold rounded-sm">
                <button 
                  type="button"
                  onClick={() => setSizeUnit('INCH')} 
                  className={`px-2.5 py-1 ${sizeUnit === 'INCH' ? 'bg-gold text-black' : 'text-gray-400 hover:text-white'}`}
                >
                  INCH
                </button>
                <button 
                  type="button"
                  onClick={() => setSizeUnit('CM')} 
                  className={`px-2.5 py-1 ${sizeUnit === 'CM' ? 'bg-gold text-black' : 'text-gray-400 hover:text-white'}`}
                >
                  CM
                </button>
              </div>
            </div>

            <div className="overflow-x-auto border border-dark-border bg-dark-card/60 text-xs font-sans rounded-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black/60 text-gold uppercase text-[10px] tracking-wider border-b border-dark-border">
                    <th className="p-2 border-r border-dark-border font-bold">Size</th>
                    <th className="p-2 border-r border-dark-border font-bold">Chest (round)</th>
                    <th className="p-2 border-r border-dark-border font-bold">Length</th>
                    <th className="p-2 font-bold">Sleeve</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-border text-gray-300 text-[11px]">
                  <tr>
                    <td className="p-2 border-r border-dark-border font-bold text-white">M</td>
                    <td className="p-2 border-r border-dark-border">{sizeUnit === 'INCH' ? '39"' : '99 cm'}</td>
                    <td className="p-2 border-r border-dark-border">{sizeUnit === 'INCH' ? '27.5"' : '70 cm'}</td>
                    <td className="p-2">{sizeUnit === 'INCH' ? '8.5"' : '21.5 cm'}</td>
                  </tr>
                  <tr className="bg-dark-card/40">
                    <td className="p-2 border-r border-dark-border font-bold text-white">L</td>
                    <td className="p-2 border-r border-dark-border">{sizeUnit === 'INCH' ? '40.5"' : '103 cm'}</td>
                    <td className="p-2 border-r border-dark-border">{sizeUnit === 'INCH' ? '28"' : '71 cm'}</td>
                    <td className="p-2">{sizeUnit === 'INCH' ? '8.75"' : '22 cm'}</td>
                  </tr>
                  <tr>
                    <td className="p-2 border-r border-dark-border font-bold text-white">XL</td>
                    <td className="p-2 border-r border-dark-border">{sizeUnit === 'INCH' ? '43"' : '109 cm'}</td>
                    <td className="p-2 border-r border-dark-border">{sizeUnit === 'INCH' ? '29"' : '74 cm'}</td>
                    <td className="p-2">{sizeUnit === 'INCH' ? '9"' : '23 cm'}</td>
                  </tr>
                  <tr className="bg-dark-card/40">
                    <td className="p-2 border-r border-dark-border font-bold text-white">2XL</td>
                    <td className="p-2 border-r border-dark-border">{sizeUnit === 'INCH' ? '45"' : '114 cm'}</td>
                    <td className="p-2 border-r border-dark-border">{sizeUnit === 'INCH' ? '30"' : '76 cm'}</td>
                    <td className="p-2">{sizeUnit === 'INCH' ? '9.25"' : '23.5 cm'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </ModalWrapper>

    <AnimatePresence>
      {isImageExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsImageExpanded(false)}
          className="fixed inset-0 bg-black/95 backdrop-blur-md z-[100] flex items-center justify-center p-4 sm:p-8"
        >
          <button
            type="button"
            onClick={() => setIsImageExpanded(false)}
            className="absolute top-6 right-6 bg-black/80 text-white hover:text-gold p-3 rounded-full border border-white/20 hover:border-gold transition-all z-[110] shadow-xl"
            title="Close full image overlay"
          >
            <X size={24} />
          </button>
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-full max-h-full flex items-center justify-center"
          >
            <img
              src={product.image || 'https://res.cloudinary.com/sorfe6ve/image/upload/f_auto,q_auto/v_block_tee'}
              alt={product.name}
              className="max-w-[92vw] max-h-[92vh] object-contain shadow-2xl rounded-sm border border-slate-700 dark:border-dark-border"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = 'https://res.cloudinary.com/sorfe6ve/image/upload/f_auto,q_auto/v_block_tee';
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </>
  );
};

// --- Checkout Modal ---
interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onComplete: () => void;
  onUpdateQuantity?: (id: string, newQuantity: number) => void;
  onRemoveItem?: (id: string) => void;
}

export const CheckoutModal: React.FC<CheckoutProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onComplete,
  onUpdateQuantity,
  onRemoveItem
}) => {
  const handleOrderWhatsApp = () => {
    if (items.length === 0) return;

    let msg = `*New Order Request - FIBBO Apparels*\n\n`;
    msg += `*Order Items:*\n`;
    items.forEach(item => {
      let details = [];
      if (item.size) details.push(`Size: ${item.size}`);
      if (item.color) details.push(`Color: ${item.color}`);
      if (item.fabric) details.push(`Fabric: ${item.fabric}`);
      if (item.collar) details.push(`Collar: ${item.collar}`);
      let detailsStr = details.length > 0 ? ` (${details.join(', ')})` : '';
      let codeStr = ` [Code: ${item.product.code || item.product.id}]`;
      msg += `- ${item.quantity}x ${item.product.name}${codeStr}${detailsStr}\n`;
    });

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
    
    onComplete();
    onClose();
  };

  const totalPcs = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} maxWidth="max-w-2xl">
      <div className="bg-dark-bg text-white p-3 sm:p-6 lg:p-8 rounded-sm">
        <div className="flex items-center justify-between mb-3 sm:mb-6 pb-2.5 sm:pb-4 border-b border-dark-border">
          <div>
            <h2 className="font-serif text-lg sm:text-2xl md:text-3xl text-white">Order Summary</h2>
            <p className="text-gray-400 text-[10px] sm:text-xs mt-0.5 sm:mt-1">Review your items and proceed directly to WhatsApp</p>
          </div>
          <span className="text-gold font-bold text-[10px] sm:text-xs bg-gold/10 border border-gold/30 px-2 py-0.5 sm:px-3 sm:py-1 rounded-sm">
            {totalPcs} {totalPcs === 1 ? 'Item' : 'Items'}
          </span>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12 text-gray-500 font-sans text-sm">
            Your shopping bag is empty
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6 max-h-[55vh] overflow-y-auto custom-scrollbar pr-1">
              {items.map(item => (
                <div key={item.id} className="flex gap-3.5 items-start bg-black/60 p-3.5 border border-dark-border rounded-sm">
                  <img 
                    src={item.product.image} 
                    loading="lazy"
                    decoding="async"
                    className="w-16 h-20 bg-dark-bg border border-dark-border object-contain p-1 shrink-0 rounded-sm" 
                    alt={item.product.name} 
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-serif text-sm truncate">{item.product.name}</h4>
                    
                    <div className="text-gray-400 text-xs font-sans mt-0.5 space-x-1">
                      {item.size && <span>Size: <strong className="text-gray-200">{item.size}</strong></span>}
                      {item.color && <span>/ {item.color}</span>}
                      {item.fabric && <span>/ {item.fabric}</span>}
                      {item.collar && <span>/ Collar: {item.collar}</span>}
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-gold text-[10px] font-bold font-sans border border-gold/30 px-2 py-0.5 bg-black rounded-sm">
                        Code: {item.product.code || item.product.id}
                      </span>

                      {/* Quantity + - controls */}
                      <div className="flex items-center gap-1 bg-black border border-dark-border px-1.5 py-0.5 rounded-sm">
                        <button 
                          type="button"
                          onClick={() => {
                            if (item.quantity > 1) {
                              onUpdateQuantity?.(item.id, item.quantity - 1);
                            } else {
                              onRemoveItem?.(item.id);
                            }
                          }}
                          className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gold transition-colors rounded-xs"
                          title="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        
                        <span className="text-xs font-bold text-white px-2 min-w-[20px] text-center font-sans">
                          {item.quantity}
                        </span>

                        <button 
                          type="button"
                          onClick={() => onUpdateQuantity?.(item.id, item.quantity + 1)}
                          className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gold transition-colors rounded-xs"
                          title="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove button */}
                  <button 
                    type="button"
                    onClick={() => onRemoveItem?.(item.id)}
                    className="text-gray-500 hover:text-red-500 transition-colors p-1"
                    title="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-dark-border pt-4 pb-2 space-y-2 font-sans text-xs">
              <div className="flex justify-between text-gray-400">
                <span>Delivery Charge</span>
                <span className="text-gold font-medium">Free Nationwide Shipping</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Order Confirmation</span>
                <span className="text-gray-300">Directly via WhatsApp</span>
              </div>
            </div>

            <div className="pt-4">
              <button 
                type="button"
                onClick={handleOrderWhatsApp}
                className="w-full bg-gold text-black font-sans font-bold text-sm tracking-widest uppercase py-4 hover:bg-gold-light transition-all flex items-center justify-center gap-2.5 shadow-md rounded-sm"
              >
                <span>ORDER NOW ON WHATSAPP</span>
                <img 
                  src="https://res.cloudinary.com/sorfe6ve/image/upload/v1786529661/ChatGPT_Image_Aug_12_2026_04_14_05_PM.png" 
                  alt="Order now" 
                  className="w-5 h-5 object-contain"
                />
              </button>
            </div>
          </>
        )}
      </div>
    </ModalWrapper>
  );
};

// --- Search Modal ---
interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuickView: (p: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onQuickView }) => {
  const [query, setQuery] = useState('');
  
  const results = query ? PRODUCTS.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.mainCategory.toLowerCase().includes(query.toLowerCase()) || p.subCategory.toLowerCase().includes(query.toLowerCase())) : [];

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} maxWidth="max-w-3xl">
      <div className="p-8 bg-dark-bg text-white rounded-sm">
        <div className="flex items-center border-b border-dark-border pb-4 mb-8">
          <SearchIcon size={24} className="text-gray-500 mr-4" />
          <input 
            autoFocus
            type="text" 
            placeholder="Search for products, categories..." 
            className="w-full bg-transparent text-2xl font-serif text-white outline-none placeholder:text-gray-700"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        
        {query && (
          <div>
            <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-6">Results ({results.length})</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[50vh] overflow-y-auto custom-scrollbar pr-2">
              {results.map(product => (
                <div 
                  key={product.id} 
                  className="flex gap-4 p-3 hover:bg-black border border-transparent hover:border-dark-border cursor-pointer transition-colors rounded-sm"
                  onClick={() => {
                    onClose();
                    onQuickView(product);
                  }}
                >
                  <img src={product.image} alt={product.name} className="w-16 h-20 object-contain p-1 bg-black rounded-sm" />
                  <div>
                    <h4 className="text-white font-serif">{product.name}</h4>
                    <p className="text-gold text-sm font-sans mt-1">৳ {product.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
              {results.length === 0 && <p className="text-gray-500 font-sans">No products found for "{query}".</p>}
            </div>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
};

// --- Info Modals (About, Contact, Account) ---
export const AboutModal: React.FC<{isOpen: boolean, onClose: () => void}> = ({isOpen, onClose}) => (
  <ModalWrapper isOpen={isOpen} onClose={onClose}>
    <div className="p-10 text-center bg-dark-bg text-white rounded-sm">
      <h2 className="font-serif text-4xl text-white mb-6">Our Story</h2>
      <div className="w-12 h-1 bg-gold mx-auto mb-8" />
      <div className="space-y-6 text-gray-300 font-sans leading-relaxed max-w-lg mx-auto text-sm">
        <p>
          FIBBO Apparels was born from a singular vision: to bridge the gap between luxury aesthetics and everyday streetwear in Bangladesh.
        </p>
        <p>
          We believe that confidence starts with what you wear. Every stitch, every fabric choice, and every silhouette is meticulously crafted to ensure you not only look exceptional but feel powerful.
        </p>
        <p>
          Designed in Dhaka. Crafted for the world. Wear Confidence. <span className="text-gold font-bold">Define Luxury.</span>
        </p>
      </div>
    </div>
  </ModalWrapper>
);

export const ContactModal: React.FC<{isOpen: boolean, onClose: () => void}> = ({isOpen, onClose}) => (
  <ModalWrapper isOpen={isOpen} onClose={onClose} maxWidth="max-w-4xl">
    <div className="flex flex-col md:flex-row bg-dark-bg rounded-sm overflow-hidden">
      <div className="w-full md:w-1/2 p-10 bg-black text-slate-100">
        <h2 className="font-serif text-3xl text-white mb-8">Get in Touch</h2>
        <div className="space-y-6 text-gray-300 font-sans text-sm">
          <div className="flex items-start gap-4">
            <MapPin className="text-gold shrink-0 mt-1" size={20} />
            <p>Siddhirganj, Narayanganj<br/>Dhaka, Bangladesh</p>
          </div>
          <div className="flex items-center gap-4">
            <Phone className="text-gold shrink-0" size={20} />
            <a 
              href="https://wa.me/8801959644684" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors flex items-center gap-1.5 font-medium"
            >
              <span>+880 1959644684</span>
              <span className="text-[10px] bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 font-bold px-1.5 py-0.5 rounded uppercase">WhatsApp</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Mail className="text-gold shrink-0" size={20} />
            <p>support@fibboapparels.com</p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 p-10 bg-dark-bg">
        <form className="space-y-4" onSubmit={e => { e.preventDefault(); onClose(); }}>
          <input required type="text" placeholder="Name" className="w-full bg-black border border-dark-border p-3 text-white focus:border-gold outline-none rounded-sm placeholder-slate-400" />
          <input required type="email" placeholder="Email" className="w-full bg-black border border-dark-border p-3 text-white focus:border-gold outline-none rounded-sm placeholder-slate-400" />
          <textarea required placeholder="Message" rows={4} className="w-full bg-black border border-dark-border p-3 text-white focus:border-gold outline-none resize-none rounded-sm placeholder-slate-400" />
          <button type="submit" className="w-full bg-gold text-black font-bold uppercase tracking-widest p-4 hover:bg-gold-light transition-colors shadow-md rounded-sm">Send Message</button>
        </form>
      </div>
    </div>
  </ModalWrapper>
);

export const AccountModal: React.FC<{isOpen: boolean, onClose: () => void}> = ({isOpen, onClose}) => (
  <ModalWrapper isOpen={isOpen} onClose={onClose} maxWidth="max-w-md">
    <div className="p-10 bg-dark-bg text-white rounded-sm">
      <h2 className="font-serif text-3xl text-white mb-2 text-center">Welcome Back</h2>
      <p className="text-center text-gray-400 font-sans text-sm mb-8">Sign in to access your FIBBO club benefits.</p>
      <form className="space-y-4" onSubmit={e => { e.preventDefault(); onClose(); }}>
        <input required type="email" placeholder="Email Address" className="w-full bg-black border border-dark-border p-4 text-white focus:border-gold outline-none rounded-sm placeholder-slate-400" />
        <input required type="password" placeholder="Password" className="w-full bg-black border border-dark-border p-4 text-white focus:border-gold outline-none rounded-sm placeholder-slate-400" />
        <button type="submit" className="w-full bg-gold text-black font-bold uppercase tracking-widest p-4 hover:bg-gold-light transition-colors mt-2 shadow-md rounded-sm">Sign In</button>
      </form>
      <div className="mt-6 text-center">
        <button className="text-gray-500 hover:text-gold text-sm font-sans transition-colors">Forgot password?</button>
      </div>
    </div>
  </ModalWrapper>
);
