import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiSearch, FiUser, FiShoppingCart, FiMenu, FiX,
  FiChevronRight
} from 'react-icons/fi';

const Navbar = ({ onCatalogClick }) => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleCatalog = () => {
    setMobileOpen(false);
    if (onCatalogClick) {
      onCatalogClick();
    } else {
      navigate('/#catalog');
    }
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
      {/* Top announcement bar */}
      <div className="bg-[#1a1c4e] text-white text-xs py-1.5 text-center font-medium tracking-wide">
        🚚 FREE SHIPPING on all orders | 3–5 Day Delivery across India
      </div>

      {/* Main header */}
      <div className="bg-[#34367f] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Nav links */}
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              <button onClick={() => navigate('/')} className="hover:text-blue-200 transition-colors">Home</button>
              <button onClick={handleCatalog} className="hover:text-blue-200 transition-colors">Our Products</button>
              <button onClick={() => navigate('/')} className="hover:text-blue-200 transition-colors">Contact</button>
            </nav>

            {/* Center: E-RUUP Logo */}
            <button onClick={() => navigate('/')} className="flex-shrink-0 flex items-center gap-2 group">
              <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-md">
                <span className="text-[#34367f] font-black text-lg leading-none">E</span>
              </div>
              <div className="flex flex-col items-start leading-none">
                <span className="font-black text-xl tracking-widest">E-RUUP</span>
                <span className="text-[10px] text-blue-200 font-medium tracking-wider">Your Trusted Store</span>
              </div>
            </button>

            {/* Right: Icons */}
            <div className="flex items-center gap-1">
              <button className="p-2 rounded-lg hover:bg-white/10 transition-colors hidden md:block" aria-label="Search">
                <FiSearch size={20} />
              </button>
              <button className="p-2 rounded-lg hover:bg-white/10 transition-colors hidden md:block" aria-label="Account">
                <FiUser size={20} />
              </button>
              <button className="p-2 rounded-lg hover:bg-white/10 transition-colors" aria-label="Cart">
                <FiShoppingCart size={20} />
              </button>
              <button className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
                {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#2a2c6a] text-white px-4 pb-4 pt-2 space-y-2 border-t border-white/10">
          <button onClick={() => { navigate('/'); setMobileOpen(false); }} className="flex items-center justify-between w-full py-3 border-b border-white/10 text-sm">
            Home <FiChevronRight />
          </button>
          <button onClick={handleCatalog} className="flex items-center justify-between w-full py-3 border-b border-white/10 text-sm">
            Our Products <FiChevronRight />
          </button>
          <button onClick={() => { navigate('/'); setMobileOpen(false); }} className="flex items-center justify-between w-full py-3 text-sm">
            Contact <FiChevronRight />
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
