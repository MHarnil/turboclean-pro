import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaBolt } from 'react-icons/fa';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  const goToOrder = () => {
    navigate('/order');
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark-900/95 backdrop-blur-xl border-b border-white/10 shadow-2xl'
          : 'bg-transparent'
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8 bg-gradient-to-br from-sky-400 to-blue-600 rounded-lg flex items-center justify-center shadow-glow">
              <FaBolt className="text-white text-sm" />
            </div>
            <span className="font-display font-bold text-lg text-white">
              Turbo<span className="gradient-text">Clean</span> Pro
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-white/70">
            <button onClick={() => scrollTo('features')} className="hover:text-sky-400 transition-colors">Features</button>
            <button onClick={() => scrollTo('reviews')} className="hover:text-sky-400 transition-colors">Reviews</button>
            <button onClick={() => scrollTo('faq')} className="hover:text-sky-400 transition-colors">FAQ</button>
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <div className="text-right">
              <div className="text-xs text-white/50 line-through">₹1,399</div>
              <div className="text-lg font-bold text-yellow-400">₹699</div>
            </div>
            <button
              id="navbar-buy-btn"
              onClick={goToOrder}
              className="btn-gold text-sm px-5 py-2.5 rounded-xl"
            >
              Buy Now
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-dark-800/98 backdrop-blur-xl border-b border-white/10"
          >
            <div className="section-container py-4 flex flex-col gap-4">
              <button onClick={() => scrollTo('features')} className="text-left text-white/80 py-2 border-b border-white/10">Features</button>
              <button onClick={() => scrollTo('reviews')} className="text-left text-white/80 py-2 border-b border-white/10">Reviews</button>
              <button onClick={() => scrollTo('faq')} className="text-left text-white/80 py-2 border-b border-white/10">FAQ</button>
              <button
                onClick={goToOrder}
                className="btn-gold w-full text-center"
              >
                🛒 Buy Now — ₹699 Only!
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
