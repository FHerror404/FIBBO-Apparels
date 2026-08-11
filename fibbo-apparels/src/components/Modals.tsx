import React, { useState } from 'react';
import { Product, CartItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search as SearchIcon, ShieldCheck, MapPin, Phone, Mail } from 'lucide-react';
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
          onClick={onClose} className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto custom-scrollbar"
        >
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            onClick={e => e.stopPropagation()}
            className={`w-full ${maxWidth} bg-dark-bg border border-dark-border relative my-8`}
          >
            <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-gold text-white hover:text-black transition-colors rounded-none">
              <X size={20} />
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

  // Reset state when product changes
  React.useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || '');
      setSelectedColor(product.colors[0]?.name || '');
      setSelectedFabric(product.fabricOptions?.[0] || '');
      setSelectedCollar(product.collarOptions?.[0] || '');
      setQuantity(product.minimumOrder || 1);
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
    let msg = `*Product Inquiry - FIBBO Apparels*\n\n`;
    msg += `*Product:* ${product.name}\n`;
    msg += `*Quantity:* ${quantity}\n`;
    if (selectedColor) msg += `*Color:* ${selectedColor}\n`;
    if (selectedSize) msg += `*Size:* ${selectedSize}\n`;
    if (selectedFabric) msg += `*Fabric:* ${selectedFabric}\n`;
    if (selectedCollar) msg += `*Collar:* ${selectedCollar}\n`;
    if (product.price) msg += `*Price Estimate:* ৳${(product.price * quantity).toLocaleString()}\n`;
    
    const encodedMsg = encodeURIComponent(msg);
    const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '8801959644684';
    window.open(`https://wa.me/${waNumber}?text=${encodedMsg}`, '_blank');
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} maxWidth="max-w-5xl">
      <div className="flex flex-col md:flex-row max-h-[90vh] overflow-y-auto custom-scrollbar">
        {/* Image */}
        <div className="w-full md:w-1/2 bg-[#1a1a1a] aspect-[4/5] md:aspect-auto md:min-h-full">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        
        {/* Details */}
        <div className="w-full md:w-1/2 p-8 flex flex-col">
          <h2 className="font-serif text-3xl text-white mb-2">{product.name}</h2>
          
          <div className="flex items-center gap-3 mb-6">
            {product.price ? (
              <>
                <span className="text-gold font-sans text-xl">৳ {product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-gray-500 font-sans line-through">৳ {product.originalPrice.toLocaleString()}</span>
                )}
              </>
            ) : (
              <span className="text-gold font-sans text-xl italic">Price on request</span>
            )}
          </div>
          
          <p className="text-gray-400 font-sans mb-6 text-sm leading-relaxed">{product.description}</p>
          
          {/* Options */}
          <div className="space-y-6 mb-8 flex-grow">
            {product.colors && product.colors.length > 0 && (
              <div>
                <span className="text-xs uppercase tracking-widest text-gray-500 mb-3 block">Color: {selectedColor}</span>
                <div className="flex gap-3">
                  {product.colors.map(color => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === color.name ? 'border-gold scale-110' : 'border-transparent hover:border-gray-500'}`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <span className="text-xs uppercase tracking-widest text-gray-500 mb-3 block">Size</span>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 text-sm font-sans transition-all border ${selectedSize === size ? 'border-gold text-gold bg-gold/10' : 'border-dark-border text-gray-400 hover:border-gray-500'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.fabricOptions && product.fabricOptions.length > 0 && (
              <div>
                <span className="text-xs uppercase tracking-widest text-gray-500 mb-3 block">Fabric Option</span>
                <div className="flex flex-wrap gap-2">
                  {product.fabricOptions.map(fab => (
                    <button
                      key={fab}
                      onClick={() => setSelectedFabric(fab)}
                      className={`px-4 py-2 text-sm font-sans transition-all border ${selectedFabric === fab ? 'border-gold text-gold bg-gold/10' : 'border-dark-border text-gray-400 hover:border-gray-500'}`}
                    >
                      {fab}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.collarOptions && product.collarOptions.length > 0 && (
              <div>
                <span className="text-xs uppercase tracking-widest text-gray-500 mb-3 block">Collar Option</span>
                <div className="flex flex-wrap gap-2">
                  {product.collarOptions.map(col => (
                    <button
                      key={col}
                      onClick={() => setSelectedCollar(col)}
                      className={`px-4 py-2 text-sm font-sans transition-all border ${selectedCollar === col ? 'border-gold text-gold bg-gold/10' : 'border-dark-border text-gray-400 hover:border-gray-500'}`}
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <span className="text-xs uppercase tracking-widest text-gray-500 mb-3 block">Quantity {product.minimumOrder ? `(Min: ${product.minimumOrder})` : ''}</span>
              <div className="flex items-center border border-dark-border w-32">
                <button 
                  onClick={() => setQuantity(Math.max(product.minimumOrder || 1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-white hover:text-gold transition-colors"
                >
                  -
                </button>
                <input 
                  type="number" 
                  value={quantity} 
                  onChange={(e) => setQuantity(Math.max(product.minimumOrder || 1, parseInt(e.target.value) || 1))}
                  className="w-12 h-10 bg-transparent text-white text-center font-sans text-sm outline-none border-x border-dark-border"
                />
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-white hover:text-gold transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
            <button 
              onClick={handleAdd}
              className="w-full border border-gold text-gold font-sans font-bold text-sm tracking-widest uppercase py-4 hover:bg-gold hover:text-black glow-gold-hover transition-all"
            >
              Add to Bag
            </button>
            <button 
              onClick={handleOrderWhatsApp}
              className="w-full bg-gold text-black font-sans font-bold text-sm tracking-widest uppercase py-4 hover:bg-gold-light glow-gold-hover transition-all"
            >
              Order on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

// --- Checkout Modal ---
interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onComplete: () => void;
}

export const CheckoutModal: React.FC<CheckoutProps> = ({ isOpen, onClose, items, onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', phone: '', address: '', city: '', payment: 'COD'
  });

  const subtotal = items.reduce((total, item) => total + ((item.product.price || 0) * item.quantity), 0);
  const shipping = 0; // Free nationwide shipping

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      // Build WhatsApp message
      let msg = `*New Order - FIBBO Apparels*\n\n`;
      msg += `*Customer:* ${formData.name}\n`;
      msg += `*Phone:* ${formData.phone}\n`;
      msg += `*Address:* ${formData.address}, ${formData.city}\n`;
      msg += `*Payment:* ${formData.payment}\n\n`;
      msg += `*Order Details:*\n`;
      items.forEach(item => {
        let details = [];
        if (item.size) details.push(item.size);
        if (item.color) details.push(item.color);
        if (item.fabric) details.push(item.fabric);
        if (item.collar) details.push(item.collar);
        let detailsStr = details.length > 0 ? ` (${details.join(', ')})` : '';
        let priceStr = item.product.price ? ` - ৳${item.product.price * item.quantity}` : ' - Price on request';
        msg += `- ${item.quantity}x ${item.product.name}${detailsStr}${priceStr}\n`;
      });
      msg += `\n*Total Estimate:* ৳${subtotal + shipping}`;

      const encodedMsg = encodeURIComponent(msg);
      const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '8801959644684';
      window.open(`https://wa.me/${waNumber}?text=${encodedMsg}`, '_blank');
      
      onComplete();
      onClose();
      setStep(1); // Reset
    }
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} maxWidth="max-w-5xl">
      <div className="flex flex-col lg:flex-row bg-dark-bg">
        {/* Form Section */}
        <div className="w-full lg:w-3/5 p-8 border-r border-dark-border">
          <h2 className="font-serif text-3xl text-white mb-8">Checkout</h2>
          
          <div className="flex gap-4 mb-8">
            <div className={`flex-1 pb-4 border-b-2 ${step === 1 ? 'border-gold text-gold' : 'border-dark-border text-gray-500'}`}>
              <span className="text-xs uppercase tracking-widest">Step 1</span>
              <p className="font-serif mt-1">Shipping</p>
            </div>
            <div className={`flex-1 pb-4 border-b-2 ${step === 2 ? 'border-gold text-gold' : 'border-dark-border text-gray-500'}`}>
              <span className="text-xs uppercase tracking-widest">Step 2</span>
              <p className="font-serif mt-1">Payment</p>
            </div>
          </div>

          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-400">Full Name *</label>
                    <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-black border border-dark-border p-3 text-white focus:border-gold outline-none transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-400">Phone Number *</label>
                    <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-black border border-dark-border p-3 text-white focus:border-gold outline-none transition-colors" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs uppercase tracking-widest text-gray-400">Full Address *</label>
                    <input required type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full bg-black border border-dark-border p-3 text-white focus:border-gold outline-none transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-400">City *</label>
                    <input required type="text" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full bg-black border border-dark-border p-3 text-white focus:border-gold outline-none transition-colors" />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                {['Cash on Delivery', 'bKash / Mobile Wallet', 'Credit/Debit Card', 'Apple Pay'].map((method) => (
                  <label key={method} className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${formData.payment === method ? 'border-gold bg-gold/5' : 'border-dark-border bg-black hover:border-gray-600'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.payment === method ? 'border-gold' : 'border-gray-500'}`}>
                        {formData.payment === method && <div className="w-2 h-2 rounded-full bg-gold" />}
                      </div>
                      <span className="text-white font-sans">{method}</span>
                    </div>
                    {method === 'Cash on Delivery' && <ShieldCheck size={20} className="text-gold" />}
                  </label>
                ))}
                
                <div className="bg-gold/10 border border-gold/30 p-4 mt-6">
                  <p className="text-sm text-gold font-sans flex items-center gap-2">
                    <ShieldCheck size={16} /> Order will be confirmed via WhatsApp.
                  </p>
                </div>
              </motion.div>
            )}

            <div className="pt-6 flex gap-4">
              {step === 2 && (
                <button type="button" onClick={() => setStep(1)} className="px-6 py-4 border border-dark-border text-white hover:text-gold hover:border-gold transition-colors font-sans text-sm uppercase tracking-widest">
                  Back
                </button>
              )}
              <button type="submit" className="flex-1 bg-gold text-black font-sans font-bold text-sm tracking-widest uppercase py-4 hover:bg-gold-light glow-gold-hover transition-all">
                {step === 1 ? 'Continue to Payment' : 'Confirm Order via WhatsApp'}
              </button>
            </div>
          </form>
        </div>

        {/* Order Summary Section */}
        <div className="w-full lg:w-2/5 p-8 bg-black">
          <h3 className="font-serif text-xl text-white mb-6">Order Summary</h3>
          <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto custom-scrollbar pr-2">
            {items.map(item => (
              <div key={item.id} className="flex gap-4">
                <div className="w-16 h-20 bg-dark-bg border border-dark-border relative">
                  <img src={item.product.image} className="w-full h-full object-cover" alt="" />
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-gold text-black rounded-full text-xs flex items-center justify-center font-bold">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-serif text-sm">{item.product.name}</h4>
                  <div className="text-gray-500 text-xs font-sans mt-1 space-y-0.5">
                    {item.size && <span>{item.size} </span>}
                    {item.color && <span>/ {item.color} </span>}
                    {item.fabric && <span>/ {item.fabric} </span>}
                    {item.collar && <span>/ {item.collar}</span>}
                  </div>
                </div>
                <div className="text-white text-sm font-sans whitespace-nowrap">
                  {item.product.price ? `৳ ${(item.product.price * item.quantity).toLocaleString()}` : <span className="text-gold italic text-xs">Request Price</span>}
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-dark-border pt-4 space-y-3 font-sans text-sm">
            <div className="flex justify-between text-gray-400">
              <span>Estimate Subtotal</span>
              <span>৳{subtotal.toLocaleString()} {items.some(i => !i.product.price) && '+'}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Shipping</span>
              <span className="text-gold">Free</span>
            </div>
            <div className="border-t border-dark-border pt-3 flex justify-between text-white text-lg">
              <span>Total Estimate</span>
              <span>৳{subtotal.toLocaleString()} {items.some(i => !i.product.price) && '+'}</span>
            </div>
          </div>
        </div>
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
  
  const results = query ? PRODUCTS.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.category.includes(query.toLowerCase())) : [];

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} maxWidth="max-w-3xl">
      <div className="p-8">
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
                  className="flex gap-4 p-3 hover:bg-black border border-transparent hover:border-dark-border cursor-pointer transition-colors"
                  onClick={() => {
                    onClose();
                    onQuickView(product);
                  }}
                >
                  <img src={product.image} alt={product.name} className="w-16 h-20 object-cover bg-black" />
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
    <div className="p-10 text-center">
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
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 p-10 bg-black">
        <h2 className="font-serif text-3xl text-white mb-8">Get in Touch</h2>
        <div className="space-y-6 text-gray-300 font-sans text-sm">
          <div className="flex items-start gap-4">
            <MapPin className="text-gold shrink-0 mt-1" size={20} />
            <p>Siddhirganj, Narayanganj<br/>Dhaka, Bangladesh</p>
          </div>
          <div className="flex items-center gap-4">
            <Phone className="text-gold shrink-0" size={20} />
            <p>+880 1959644684</p>
          </div>
          <div className="flex items-center gap-4">
            <Mail className="text-gold shrink-0" size={20} />
            <p>support@fibboapparels.com</p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 p-10">
        <form className="space-y-4" onSubmit={e => { e.preventDefault(); onClose(); }}>
          <input required type="text" placeholder="Name" className="w-full bg-black border border-dark-border p-3 text-white focus:border-gold outline-none" />
          <input required type="email" placeholder="Email" className="w-full bg-black border border-dark-border p-3 text-white focus:border-gold outline-none" />
          <textarea required placeholder="Message" rows={4} className="w-full bg-black border border-dark-border p-3 text-white focus:border-gold outline-none resize-none" />
          <button type="submit" className="w-full bg-gold text-black font-bold uppercase tracking-widest p-4 hover:bg-gold-light transition-colors">Send Message</button>
        </form>
      </div>
    </div>
  </ModalWrapper>
);

export const AccountModal: React.FC<{isOpen: boolean, onClose: () => void}> = ({isOpen, onClose}) => (
  <ModalWrapper isOpen={isOpen} onClose={onClose} maxWidth="max-w-md">
    <div className="p-10">
      <h2 className="font-serif text-3xl text-white mb-2 text-center">Welcome Back</h2>
      <p className="text-center text-gray-400 font-sans text-sm mb-8">Sign in to access your FIBBO club benefits.</p>
      <form className="space-y-4" onSubmit={e => { e.preventDefault(); onClose(); }}>
        <input required type="email" placeholder="Email Address" className="w-full bg-black border border-dark-border p-4 text-white focus:border-gold outline-none" />
        <input required type="password" placeholder="Password" className="w-full bg-black border border-dark-border p-4 text-white focus:border-gold outline-none" />
        <button type="submit" className="w-full bg-gold text-black font-bold uppercase tracking-widest p-4 hover:bg-gold-light transition-colors mt-2">Sign In</button>
      </form>
      <div className="mt-6 text-center">
        <button className="text-gray-500 hover:text-gold text-sm font-sans transition-colors">Forgot password?</button>
      </div>
    </div>
  </ModalWrapper>
);
