import React from 'react';
import { FiSearch, FiUser, FiShoppingCart } from 'react-icons/fi';

const Navbar = () => {
  return (
    <header className="bg-[#34367f] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Nav Links */}
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-sm hover:text-gray-200">Home</a>
            <a href="#" className="text-sm font-semibold hover:text-gray-200">Our Products</a>
            <a href="#" className="text-sm hover:text-gray-200">Contact</a>
          </nav>

          {/* Center: Logo */}
          <div className="flex-shrink-0 flex items-center justify-center font-bold text-2xl tracking-widest uppercase">
            <a href="/" className="flex items-center">
              <span className="font-light">HOME</span>
              <span className="ml-2 font-black">PICKSS</span>
            </a>
          </div>

          {/* Right: Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:text-gray-200" aria-label="Search">
              <FiSearch size={20} />
            </button>
            <button className="p-2 hover:text-gray-200" aria-label="User Account">
              <FiUser size={20} />
            </button>
            <button className="p-2 hover:text-gray-200 relative" aria-label="Cart">
              <FiShoppingCart size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
