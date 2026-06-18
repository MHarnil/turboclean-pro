import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const StickyBuyBtn = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = document.getElementById('hero')?.offsetHeight || 600;
      setIsVisible(window.scrollY > heroHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToOrder = () => navigate('/order');

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
        >
          <div className="bg-dark-900/98 backdrop-blur-xl border-t border-white/10 px-4 py-3 pb-safe">
            <div className="flex items-center gap-3">
              <div className="flex-1 text-left">
                <p className="text-xs text-white/50 leading-none">TurboClean Pro</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-display font-black text-xl text-yellow-400">₹699</span>
                  <span className="text-white/30 line-through text-sm">₹1,399</span>
                  <span className="text-green-400 text-xs font-semibold">50% OFF</span>
                </div>
              </div>
              <button
                id="sticky-buy-btn"
                onClick={scrollToOrder}
                className="btn-gold text-sm px-6 py-3 rounded-xl flex-shrink-0"
              >
                🛒 Buy Now
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyBuyBtn;
