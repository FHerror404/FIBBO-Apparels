import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  onAction?: () => void;
  actionText?: string;
}

export const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose, onAction, actionText }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-4 bg-dark-card border border-dark-border p-4 shadow-2xl rounded-sm text-white"
        >
          <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
            <Check size={16} className="text-gold" />
          </div>
          <p className="text-white font-sans text-sm">{message}</p>
          {onAction && actionText && (
            <button 
              onClick={() => {
                onAction();
                onClose();
              }}
              className="ml-4 text-xs font-bold uppercase tracking-widest text-gold hover:text-gold-light transition-colors"
            >
              {actionText}
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
