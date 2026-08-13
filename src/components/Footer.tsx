import React from 'react';
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react';

interface FooterProps {
  onNavigateCategory?: (filterId: string | null) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateCategory }) => {
  return (
    <footer className="bg-black text-gray-400 pt-20 pb-10 border-t border-dark-border transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div>
            <a href="#" className="block mb-6">
              <img 
                src="https://res.cloudinary.com/sorfe6ve/image/upload/v1786518062/Horizontal-LOGO-WHITE.png" 
                alt="FIBBO APPARELS" 
                className="h-10 object-contain"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://res.cloudinary.com/sorfe6ve/image/upload/v1786518062/Horizontal-LOGO-WHITE.png';
                }}
              />
            </a>
            <p className="text-gray-400 font-sans text-sm leading-relaxed mb-6">
              Wear Confidence. Define Luxury. Premium streetwear designed in Bangladesh for the modern aesthetic.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-gold transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-gold transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-gold transition-colors"><Youtube size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-sans font-bold uppercase tracking-widest text-sm mb-6">Explore</h4>
            <ul className="space-y-4">
              <li>
                <button 
                  type="button"
                  onClick={() => onNavigateCategory?.(null)}
                  className="text-gray-400 hover:text-gold transition-colors text-sm font-sans"
                >
                  Shop All
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => onNavigateCategory?.('half-sleeve')}
                  className="text-gray-400 hover:text-gold transition-colors text-sm font-sans"
                >
                  T-Shirts
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => onNavigateCategory?.('polo')}
                  className="text-gray-400 hover:text-gold transition-colors text-sm font-sans"
                >
                  Polo Shirts
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => onNavigateCategory?.('jersey')}
                  className="text-gray-400 hover:text-gold transition-colors text-sm font-sans"
                >
                  Jerseys
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-sans font-bold uppercase tracking-widest text-sm mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 text-sm font-sans">
                <MapPin size={16} className="text-gold shrink-0 mt-0.5" />
                <span>Siddhirganj, Narayanganj<br />Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm font-sans">
                <Phone size={16} className="text-gold shrink-0" />
                <a 
                  href="https://wa.me/8801959644684" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-gold transition-colors flex items-center gap-2"
                >
                  <span>+880 1959644684</span>
                  <span className="text-[10px] bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 font-bold px-1.5 py-0.5 rounded uppercase">WhatsApp</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm font-sans">
                <Mail size={16} className="text-gold shrink-0" />
                <span>support@fibboapparels.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-sans font-bold uppercase tracking-widest text-sm mb-6">The FIBBO Club</h4>
            <p className="text-gray-400 font-sans text-sm mb-4">
              Subscribe to receive updates, access to exclusive drops, and more.
            </p>
            <form className="flex flex-col gap-3" onSubmit={e => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-dark-bg border border-dark-border p-3 text-white focus:border-gold outline-none text-sm font-sans placeholder-slate-400"
                required
              />
              <button 
                type="submit"
                className="bg-gold text-black hover:bg-gold-light transition-colors font-bold uppercase tracking-widest text-xs py-3"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        <div className="border-t border-dark-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs font-sans">
            &copy; {new Date().getFullYear()} FIBBO Apparels. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs font-sans text-gray-500">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gold transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
