import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingBag } from 'react-icons/fi';

const orders = [
  { name: 'Rahul', city: 'Mumbai', qty: 1, time: '2 minutes ago' },
  { name: 'Priya', city: 'Delhi', qty: 2, time: '5 minutes ago' },
  { name: 'Amit', city: 'Bangalore', qty: 1, time: '8 minutes ago' },
  { name: 'Neha', city: 'Hyderabad', qty: 3, time: '10 minutes ago' },
  { name: 'Rakesh', city: 'Chennai', qty: 1, time: '12 minutes ago' },
  { name: 'Vishal', city: 'Pune', qty: 2, time: '15 minutes ago' },
  { name: 'Sneha', city: 'Kolkata', qty: 1, time: '17 minutes ago' },
  { name: 'Arjun', city: 'Jaipur', qty: 2, time: '20 minutes ago' },
  { name: 'Karan', city: 'Surat', qty: 1, time: '22 minutes ago' },
  { name: 'Pooja', city: 'Ahmedabad', qty: 2, time: '25 minutes ago' },
  { name: 'Vikram', city: 'Lucknow', qty: 1, time: '28 minutes ago' },
  { name: 'Anita', city: 'Chandigarh', qty: 3, time: '30 minutes ago' },
  { name: 'Suresh', city: 'Nagpur', qty: 1, time: '33 minutes ago' },
  { name: 'Divya', city: 'Vadodara', qty: 2, time: '35 minutes ago' },
  { name: 'Manoj', city: 'Indore', qty: 1, time: '38 minutes ago' },
];

const LiveOrderPopup = () => {
  const [currentOrder, setCurrentOrder] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [orderIndex, setOrderIndex] = useState(0);

  const showNextOrder = useCallback(() => {
    const order = orders[orderIndex % orders.length];
    setCurrentOrder(order);
    setIsVisible(true);
    setOrderIndex((prev) => prev + 1);

    // Auto-hide after 5 seconds
    setTimeout(() => {
      setIsVisible(false);
    }, 5000);
  }, [orderIndex]);

  useEffect(() => {
    // Initial delay before first popup
    const initialTimer = setTimeout(() => {
      showNextOrder();
    }, 5000);

    return () => clearTimeout(initialTimer);
  }, []);

  useEffect(() => {
    if (!isVisible && currentOrder) {
      // Show next order after 15 seconds
      const timer = setTimeout(() => {
        showNextOrder();
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, currentOrder, showNextOrder]);

  if (!currentOrder) return null;

  const amount = currentOrder.qty * 699;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -200, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-24 md:bottom-8 left-4 z-50 notification-popup"
        >
          <div className="bg-dark-800 border border-sky-500/30 rounded-2xl shadow-glow p-4 flex items-center gap-3 max-w-xs">
            {/* Icon */}
            <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <FiShoppingBag className="text-white" size={18} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-semibold leading-tight">
                <span className="text-sky-400">{currentOrder.name}</span> from{' '}
                <span className="text-sky-400">{currentOrder.city}</span> just ordered!
              </p>
              <p className="text-white/60 text-xs mt-0.5">
                {currentOrder.qty > 1
                  ? `Ordered ${currentOrder.qty} units (₹${amount})`
                  : `Ordered TurboClean Pro (₹699)`}
              </p>
              <p className="text-white/30 text-xs mt-0.5">🕐 {currentOrder.time}</p>
            </div>

            {/* Verified badge */}
            <div className="text-green-400 flex-shrink-0">
              <span className="text-xs">✓</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LiveOrderPopup;
