import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const TrustSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const stats = [
    { value: '5000+', label: 'Happy Customers', icon: '😊' },
    { value: '4.8/5', label: 'Average Rating', icon: '⭐' },
    { value: 'FREE', label: 'Pan India Shipping', icon: '🚚' },
    { value: '100%', label: 'Secure Checkout', icon: '🔐' },
  ];

  return (
    <section id="trust" className="py-16 bg-gradient-to-r from-sky-900/30 via-dark-800 to-blue-900/30 border-y border-white/10">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="font-display font-black text-3xl gradient-text mb-1">{stat.value}</div>
              <div className="text-white/50 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection;
