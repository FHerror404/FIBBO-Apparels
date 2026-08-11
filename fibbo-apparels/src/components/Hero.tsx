import React, { useState, useEffect } from 'react';
import { HeroSlide } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroProps {
  slides: HeroSlide[];
}

export const Hero: React.FC<HeroProps> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-80" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <p className="text-gold text-xs sm:text-sm tracking-[0.3em] font-bold mb-4">
                    {slides[currentSlide].eyebrow}
                  </p>
                  <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-bold leading-[1.1] text-white mb-2">
                    {slides[currentSlide].titleLine1}
                    <br />
                    <span className="text-gradient-gold">{slides[currentSlide].titleLine2}</span>
                  </h1>
                  <p className="mt-6 text-gray-300 font-sans text-base sm:text-lg max-w-lg leading-relaxed">
                    {slides[currentSlide].description}
                  </p>
                  <div className="mt-10">
                    <a 
                      href={slides[currentSlide].linkCategory ? `#${slides[currentSlide].linkCategory}` : '#shop'}
                      className="inline-block bg-gold text-black font-sans font-bold text-sm tracking-widest uppercase px-8 py-4 hover:bg-gold-light glow-gold-hover transition-all"
                    >
                      {slides[currentSlide].buttonText}
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute bottom-10 right-10 flex gap-4 z-20">
        <button 
          onClick={prevSlide}
          className="w-12 h-12 border border-white/20 flex items-center justify-center text-white hover:border-gold hover:text-gold transition-colors bg-black/20 backdrop-blur-sm"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={nextSlide}
          className="w-12 h-12 border border-white/20 flex items-center justify-center text-white hover:border-gold hover:text-gold transition-colors bg-black/20 backdrop-blur-sm"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-3 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-12 h-1 transition-colors ${idx === currentSlide ? 'bg-gold' : 'bg-white/20'}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
