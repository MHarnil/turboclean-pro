import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaTruck, FaShieldAlt, FaStar, FaHeadset, FaLock, FaUndo } from 'react-icons/fa';

const whyCards = [
  {
    icon: <FaTruck size={36} />,
    title: 'Fast Delivery',
    description: 'Lightning-fast delivery across India. Get your TurboClean Pro at your doorstep in 2-5 business days.',
    color: 'from-sky-500/20 to-blue-500/10',
    border: 'border-sky-500/30',
    iconColor: 'text-sky-400',
    stat: '2-5 Days',
  },
  {
    icon: <FaStar size={36} />,
    title: 'Quality Checked',
    description: 'Every unit undergoes rigorous 12-point quality inspection before shipping to ensure perfect performance.',
    color: 'from-yellow-500/20 to-amber-500/10',
    border: 'border-yellow-500/30',
    iconColor: 'text-yellow-400',
    stat: '12-Point QC',
  },
  {
    icon: <FaShieldAlt size={36} />,
    title: 'Cash On Delivery',
    description: 'Pay only when you receive your order. No advance payment needed — complete peace of mind for you.',
    color: 'from-green-500/20 to-teal-500/10',
    border: 'border-green-500/30',
    iconColor: 'text-green-400',
    stat: 'COD Available',
  },
  {
    icon: <FaHeadset size={36} />,
    title: '24/7 Customer Support',
    description: 'Our dedicated support team is available round the clock to help you with any questions or issues.',
    color: 'from-purple-500/20 to-pink-500/10',
    border: 'border-purple-500/30',
    iconColor: 'text-purple-400',
    stat: '24/7 Support',
  },
  {
    icon: <FaLock size={36} />,
    title: 'Secure Ordering',
    description: '100% secure checkout process. Your personal and payment information is always encrypted and safe.',
    color: 'from-rose-500/20 to-red-500/10',
    border: 'border-rose-500/30',
    iconColor: 'text-rose-400',
    stat: '256-bit SSL',
  },
  {
    icon: <FaUndo size={36} />,
    title: 'Easy Returns',
    description: 'Not satisfied? We offer hassle-free returns within 7 days. Your satisfaction is our top priority.',
    color: 'from-cyan-500/20 to-teal-500/10',
    border: 'border-cyan-500/30',
    iconColor: 'text-cyan-400',
    stat: '7 Day Returns',
  },
];

const WhyChooseUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="why-us" className="section-padding bg-gradient-to-b from-dark-800 to-dark-900">
      <div className="section-container" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 badge bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 mb-4">
            <FaStar size={12} />
            <span>Why Choose Us</span>
          </div>
          <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            Shop With <span className="gold-text">Complete Confidence</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            We're committed to making your shopping experience safe, fast, and completely risk-free.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`feature-card bg-gradient-to-br ${card.color} border ${card.border} relative`}
            >
              {/* Stat badge */}
              <div className="absolute top-4 right-4">
                <span className={`text-xs font-bold ${card.iconColor} bg-white/10 px-2 py-1 rounded-full`}>
                  {card.stat}
                </span>
              </div>

              <div className={`${card.iconColor} mb-4`}>{card.icon}</div>
              <h3 className="font-display font-bold text-xl text-white mb-2">{card.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Trust Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 card-glass rounded-3xl p-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: '🏆', value: '5000+', label: 'Happy Customers' },
              { icon: '⭐', value: '4.8/5', label: 'Customer Rating' },
              { icon: '🚚', value: 'FREE', label: 'Delivery Pan India' },
              { icon: '🔐', value: '100%', label: 'Secure Checkout' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <span className="text-3xl">{item.icon}</span>
                <span className="font-display font-black text-2xl gradient-text">{item.value}</span>
                <span className="text-white/50 text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
