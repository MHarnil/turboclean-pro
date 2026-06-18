import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const ExitIntentPopup = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e) => {
      if (!hasShown && e.clientY <= 10) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    // Also show after 45 seconds if not shown
    const timer = setTimeout(() => {
      if (!hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    }, 45000);

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timer);
    };
  }, [hasShown]);

  const handleClose = () => setIsVisible(false);

  const handleOrder = () => {
    setIsVisible(false);
    navigate('/order');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[999]"
            onClick={handleClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 40 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="pointer-events-auto bg-dark-800 border border-sky-500/30 rounded-3xl p-8 max-w-md w-full shadow-glow-lg relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />

              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
              >
                <FiX size={22} />
              </button>

              {/* Content */}
              <div className="relative z-10 text-center">
                {/* Emoji */}
                <div className="text-6xl mb-4">⚡</div>

                {/* Badge */}
                <span className="inline-flex items-center gap-1 badge bg-red-500/20 border border-red-500/30 text-red-400 text-xs mb-4">
                  🔥 Wait! Don't Miss This Deal
                </span>

                <h2 className="font-display font-black text-2xl text-white mb-2">
                  Grab Your <span className="gradient-text">TurboClean Pro</span>
                </h2>
                <p className="text-white/60 text-sm mb-4">
                  Before you go — get India's best portable vacuum cleaner at an unbeatable price!
                </p>

                {/* Price offer */}
                <div className="bg-gradient-to-r from-sky-500/10 to-blue-500/10 border border-sky-500/20 rounded-2xl p-4 mb-6">
                  <div className="flex items-center justify-center gap-3">
                    <span className="font-display font-black text-4xl text-yellow-400">₹699</span>
                    <div className="text-left">
                      <span className="text-white/40 line-through text-base block">₹1,399</span>
                      <span className="text-green-400 text-sm font-bold">50% OFF</span>
                    </div>
                  </div>
                  <p className="text-white/50 text-xs mt-1">FREE Delivery · Cash On Delivery Available</p>
                </div>

                {/* Features quick list */}
                <ul className="text-left space-y-1.5 mb-6">
                  {[
                    '✅ 1200Pa Powerful Suction',
                    '✅ Air Blower + Vacuum 2-in-1',
                    '✅ 2400mAh USB Rechargeable',
                    '✅ 5 Multi-Purpose Attachments',
                    '✅ Free Delivery Pan India',
                  ].map((item, i) => (
                    <li key={i} className="text-white/70 text-sm">{item}</li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={handleOrder}
                  className="btn-gold w-full text-base py-4 mb-3"
                >
                  🛒 Yes! I Want It For ₹699
                </button>
                <button
                  onClick={handleClose}
                  className="text-white/30 hover:text-white/50 text-xs transition-colors w-full"
                >
                  No thanks, I'll pay full price later
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentPopup;
