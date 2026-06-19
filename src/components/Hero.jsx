import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShieldAlt, FaTruck, FaStar, FaLock, FaPhone } from 'react-icons/fa';
import CountdownTimer from './CountdownTimer';

// All product images
import productImg1 from '../assets/product1.jpg';
import productImg2 from '../assets/product2.jpg';
import productImg3 from '../assets/product3.jpg';
import imgBattery  from '../assets/img-battery.jpg';
import imgFilter   from '../assets/img-filter.jpg';
import imgCompare  from '../assets/img-comparison.jpg';
import imgBlower   from '../assets/img-blower.jpg';
import imgSize     from '../assets/img-features.jpg';

const heroImgs = [
  { src: productImg1, label: 'Product' },
  { src: productImg2, label: 'Uses' },
  { src: imgBlower,   label: 'Blower' },
  { src: imgCompare,  label: 'Modes' },
  { src: productImg3, label: 'Charging' },
  { src: imgBattery,  label: 'Battery' },
  { src: imgFilter,   label: 'Filter' },
  { src: imgSize,     label: 'Size' },
];

const Hero = () => {
  const navigate = useNavigate();
  const scrollToOrder = () => navigate('/order');
  const [activeImg, setActiveImg] = useState(0);

  // Auto-rotate every 3.5 seconds
  useEffect(() => {
    const t = setInterval(() => setActiveImg(p => (p + 1) % heroImgs.length), 3500);
    return () => clearInterval(t);
  }, []);

  const badges = [
    { icon: '🔥', text: 'Limited Stock', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
    { icon: '🏷️', text: '50% OFF', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
    { icon: '🚚', text: 'Free Delivery', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    { icon: '💳', text: 'Cash On Delivery', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
  ];

  const trustPoints = [
    { icon: <FaStar className="text-yellow-400" />, text: '4.8★ Rating' },
    { icon: <FaShieldAlt className="text-sky-400" />, text: '100% Safe' },
    { icon: <FaTruck className="text-green-400" />, text: 'Fast Delivery' },
    { icon: <FaLock className="text-purple-400" />, text: 'Secure Order' },
    { icon: <FaPhone className="text-pink-400" />, text: '24/7 Support' },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-hero-gradient"
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-600/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-700/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-3xl" />
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(14,165,233,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="section-container relative z-10 pt-24 pb-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT: Text Content */}
          <div className="order-2 lg:order-1">
            {/* Badges Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap gap-2 mb-6"
            >
              {badges.map((b, i) => (
                <span
                  key={i}
                  className={`badge border ${b.color} text-xs font-semibold`}
                >
                  {b.icon} {b.text}
                </span>
              ))}
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-black text-4xl md:text-5xl lg:text-6xl leading-tight mb-4"
            >
              Powerful Cleaning{' '}
              <span className="gradient-text text-shadow-glow">Anywhere,</span>{' '}
              <span className="text-white">Anytime</span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-white/70 mb-6 max-w-lg leading-relaxed"
            >
              Clean Your Car, Laptop, Keyboard & Home In Seconds with India's #1 Portable Electric Dust Blower & Vacuum Cleaner.
            </motion.p>

            {/* Product Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mb-6"
            >
              <h2 className="font-display font-bold text-2xl text-sky-300">TurboClean Pro</h2>
              <p className="text-sm text-white/50">Portable Electric Dust Blower & Vacuum Cleaner</p>
            </motion.div>

            {/* Price Block */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="flex items-end gap-2">
                <span className="text-5xl font-display font-black text-yellow-400 text-shadow-gold">₹699</span>
                <div className="flex flex-col mb-1">
                  <span className="text-white/40 line-through text-lg">₹1,399</span>
                  <span className="text-green-400 text-sm font-semibold">Save ₹700 (50% OFF)</span>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <button
                id="hero-buy-btn"
                onClick={scrollToOrder}
                className="btn-gold text-lg px-10 py-5 rounded-2xl w-full sm:w-auto"
              >
                🛒 Buy Now — ₹699 Only!
              </button>
              <button
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary bg-transparent border border-sky-500/50 from-transparent to-transparent hover:from-sky-500/20 hover:to-blue-500/20 text-sky-400 w-full sm:w-auto"
              >
                See Features ↓
              </button>
            </motion.div>

            {/* Countdown Timer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-8"
            >
              <CountdownTimer />
            </motion.div>

            {/* Trust Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              {trustPoints.map((t, i) => (
                <div key={i} className="flex items-center gap-1.5 text-sm text-white/60">
                  {t.icon}
                  <span>{t.text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: Product Image */}
          <div className="order-1 lg:order-2 flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
              className="relative"
            >
              {/* Glow rings */}
              <div className="absolute inset-0 rounded-full bg-sky-500/20 blur-3xl scale-110 animate-pulse-slow" />
              <div className="absolute inset-8 rounded-full bg-blue-400/10 blur-2xl animate-pulse-slow" style={{ animationDelay: '1s' }} />

              {/* Product Image Gallery */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10"
              >
                <div className="relative">
                  {/* Main rotating image */}
                  <div className="relative w-full max-w-md mx-auto overflow-hidden rounded-3xl" style={{ minHeight: '280px' }}>
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={activeImg}
                        src={heroImgs[activeImg].src}
                        alt="TurboClean Pro"
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.04 }}
                        transition={{ duration: 0.4 }}
                        className="w-full object-contain rounded-3xl"
                        style={{ filter: 'drop-shadow(0 0 40px rgba(14,165,233,0.4))', maxHeight: '340px' }}
                      />
                    </AnimatePresence>
                  </div>

                  {/* Thumbnail strip */}
                  <div className="flex justify-center gap-1.5 mt-3 flex-wrap px-2">
                    {heroImgs.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImg(i)}
                        className={`w-9 h-9 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                          i === activeImg
                            ? 'border-sky-400 scale-110 shadow-[0_0_8px_rgba(56,189,248,0.6)]'
                            : 'border-white/20 hover:border-white/50 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={img.src} alt={img.label} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>

                  {/* Floating feature badges */}
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-4 -right-2 md:-right-8 card-glass px-3 py-2 rounded-xl text-sm font-semibold text-white shadow-glow"
                  >
                    💪 1200Pa Suction
                  </motion.div>
                  <motion.div
                    animate={{ x: [0, -5, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute bottom-16 -left-2 md:-left-8 card-glass px-3 py-2 rounded-xl text-sm font-semibold text-white shadow-glow"
                  >
                    🔋 2400mAh Battery
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute bottom-4 right-4 card-glass px-3 py-2 rounded-xl text-sm font-semibold text-white shadow-glow"
                  >
                    ⚡ USB Rechargeable
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { value: '5000+', label: 'Happy Customers' },
            { value: '4.8★', label: 'Average Rating' },
            { value: '1200Pa', label: 'Suction Power' },
            { value: '2400mAh', label: 'Battery Capacity' },
          ].map((stat, i) => (
            <div key={i} className="card-glass p-4 text-center">
              <div className="text-2xl font-display font-bold gradient-text">{stat.value}</div>
              <div className="text-sm text-white/50 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
