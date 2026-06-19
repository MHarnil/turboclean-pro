import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiTruck, FiShield, FiStar, FiArrowRight, FiRefreshCw, FiAward
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import productImg1 from '../assets/product1.jpg';
import productImg2 from '../assets/product2.jpg';
import productImg3 from '../assets/product3.jpg';
import imgBattery  from '../assets/img-battery.jpg';
import imgCompare  from '../assets/img-comparison.jpg';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' }
  }),
};

const products = [
  {
    id: 'turboclean',
    name: 'TurboClean Pro',
    subtitle: 'Rechargeable 4-in-1 Compressed Air Duster',
    description: '91000RPM powerful suction & blowing. Perfect for your car, keyboard, and home.',
    price: 699,
    mrp: 1999,
    rating: 4.8,
    reviews: 1247,
    badge: 'BEST SELLER',
    badgeColor: 'bg-orange-500',
    img: productImg1,
    route: '/product/turboclean',
  },
];

const trustItems = [
  { icon: <FiTruck size={28} />, title: 'Free Shipping', sub: 'On every order' },
  { icon: <FiStar size={28} />, title: '4.8★ Rated', sub: '1200+ reviews' },
  { icon: <FiShield size={28} />, title: '100% Safe', sub: 'Secure payments' },
  { icon: <FiRefreshCw size={28} />, title: 'Easy Returns', sub: '7-day policy' },
  { icon: <FiAward size={28} />, title: 'Genuine Product', sub: 'Quality assured' },
  { icon: <FiTruck size={28} />, title: '3–5 Day Delivery', sub: 'Pan India' },
];

const marqueeItems = [
  '🚚 FREE SHIPPING on all orders',
  '✅ Cash on Delivery available',
  '⭐ 4.8/5 Customer Rating',
  '🛡️ 100% Genuine Products',
  '📦 3–5 Day Fast Delivery',
  '🔥 Limited Stock – Order Now!',
];

const StoreFront = () => {
  const navigate = useNavigate();
  const catalogRef = useRef(null);

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar onCatalogClick={scrollToCatalog} />

      {/* ── MARQUEE STRIP ─────────────────────────────────── */}
      <div className="bg-[#1a1c4e] text-white py-2 overflow-hidden select-none">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="text-xs font-semibold mx-8 whitespace-nowrap opacity-90">{item}</span>
          ))}
        </div>
      </div>

      {/* ── HERO SECTION ───────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#1a1c4e] via-[#34367f] to-[#1e3a8a] text-white relative overflow-hidden">
        {/* Animated blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-400/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Left text */}
            <div className="flex-1 text-center md:text-left">
              <motion.div
                initial="hidden" animate="visible" variants={fadeUp}
                className="inline-block bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider"
              >
                🔥 Flash Sale — Up to 60% OFF
              </motion.div>
              <motion.h1
                custom={1} initial="hidden" animate="visible" variants={fadeUp}
                className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-4"
              >
                India's #1 Online<br />
                <span className="text-blue-300">Smart Store</span>
              </motion.h1>
              <motion.p
                custom={2} initial="hidden" animate="visible" variants={fadeUp}
                className="text-gray-300 text-lg mb-8 max-w-md mx-auto md:mx-0"
              >
                Premium products. Lightning fast delivery. Cash on Delivery available across India.
              </motion.p>
              <motion.div
                custom={3} initial="hidden" animate="visible" variants={fadeUp}
                className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start"
              >
                <button
                  onClick={() => navigate('/product/turboclean')}
                  className="btn-blue px-8 py-4 text-base font-bold flex items-center justify-center gap-2 rounded-xl"
                >
                  Shop Now <FiArrowRight />
                </button>
                <a
                  href="https://wa.me/919999999999"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 rounded-xl text-base font-bold hover:bg-white/10 transition-colors"
                >
                  <FaWhatsapp size={20} className="text-green-400" /> WhatsApp Us
                </a>
              </motion.div>

              {/* Mini trust row */}
              <motion.div
                custom={4} initial="hidden" animate="visible" variants={fadeUp}
                className="flex items-center gap-6 mt-8 justify-center md:justify-start flex-wrap"
              >
                <div className="text-sm text-gray-400 flex items-center gap-1"><FiTruck className="text-blue-300" /> Free Delivery</div>
                <div className="text-sm text-gray-400 flex items-center gap-1"><FiShield className="text-green-400" /> 100% Safe</div>
                <div className="text-sm text-gray-400 flex items-center gap-1"><FiStar className="text-yellow-400" /> 4.8/5 Rating</div>
              </motion.div>
            </div>

            {/* Right product image */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex-1 flex items-center justify-center relative"
            >
              <div className="relative w-full max-w-sm md:max-w-md">
                <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-3xl scale-110" />
                <motion.img
                  src={productImg1}
                  alt="TurboClean Pro"
                  className="relative w-full object-contain drop-shadow-2xl animate-float rounded-2xl"
                  style={{ maxHeight: '400px' }}
                />
                {/* Floating badge */}
                <motion.div
                  animate={{ y: [0, -6, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-6 -right-4 bg-white text-[#34367f] text-xs font-bold px-3 py-2 rounded-xl shadow-xl"
                >
                  💪 1200Pa Suction
                </motion.div>
                <motion.div
                  animate={{ y: [0, 6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute bottom-12 -left-4 bg-white text-[#34367f] text-xs font-bold px-3 py-2 rounded-xl shadow-xl"
                >
                  🔋 2000mAh Battery
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TRUST BADGES ROW ───────────────────────────────── */}
      <section className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {trustItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center text-center p-3 hover:bg-gray-50 rounded-xl transition-colors"
              >
                <div className="text-[#34367f] mb-2">{item.icon}</div>
                <div className="font-bold text-sm text-gray-800">{item.title}</div>
                <div className="text-xs text-gray-500">{item.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT CATALOG ────────────────────────────────── */}
      <section ref={catalogRef} className="py-16 bg-gray-50" id="catalog">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-[#34367f] font-bold uppercase tracking-widest text-sm mb-2">Our Products</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Featured Collection</h2>
            <div className="w-16 h-1 bg-[#34367f] rounded mx-auto mt-3" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                onClick={() => navigate(product.route)}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 flex flex-col group"
              >
                <div className="relative bg-gray-50 p-6 flex items-center justify-center h-56">
                  <span className={`absolute top-3 left-3 ${product.badgeColor} text-white text-xs font-bold px-2.5 py-1 rounded-full z-10`}>
                    {product.badge}
                  </span>
                  <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full z-10">
                    COD Available
                  </span>
                  <img
                    src={product.img}
                    alt={product.name}
                    className="max-h-44 object-contain group-hover:scale-105 transition-transform duration-400"
                  />
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <p className="text-[#34367f] text-xs font-bold uppercase tracking-wider mb-1">Electronics</p>
                  <h3 className="font-black text-gray-900 text-base mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-grow">{product.description}</p>
                  <div className="flex items-center gap-1 mb-3">
                    {'★★★★★'.split('').map((s, i) => (
                      <span key={i} className="text-yellow-400 text-sm">★</span>
                    ))}
                    <span className="text-xs text-gray-500 ml-1">{product.rating} ({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-black text-[#34367f]">₹{product.price}</span>
                      <span className="text-sm text-gray-400 line-through ml-2">₹{product.mrp}</span>
                    </div>
                    <button className="bg-[#34367f] text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-[#2a2c6a] transition-colors">
                      View →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURE BANNER ─────────────────────────────────── */}
      <section className="bg-[#34367f] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <motion.div
              initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} className="flex-1"
            >
              <h2 className="text-3xl md:text-4xl font-black mb-4">Why Choose E-RUUP?</h2>
              <p className="text-blue-200 mb-8 text-lg">We deliver premium quality products right to your door with complete peace of mind.</p>
              <div className="space-y-4">
                {[
                  ['✅', 'Genuine & Quality-Tested Products'],
                  ['🚚', 'Free Shipping Pan India'],
                  ['💰', 'Cash on Delivery — Pay when it arrives'],
                  ['📦', 'Fast 3–5 Day Delivery'],
                  ['🔄', 'Hassle-free 7-Day Return Policy'],
                ].map(([icon, text], i) => (
                  <motion.div
                    key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-3 text-sm font-medium"
                  >
                    <span className="text-xl">{icon}</span>
                    <span className="text-gray-100">{text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 grid grid-cols-2 gap-4"
            >
              {[productImg2, imgCompare, productImg3, imgBattery].map((img, i) => (
                <div key={i} onClick={() => navigate('/product/turboclean')} className="rounded-xl overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform">
                  <img src={img} alt="Product" className="w-full h-36 object-cover" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="text-[#34367f] font-bold uppercase tracking-widest text-sm mb-2">Reviews</p>
            <h2 className="text-3xl font-black text-gray-900">What Our Customers Say</h2>
            <div className="w-16 h-1 bg-[#34367f] rounded mx-auto mt-3" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Rahul M.', city: 'Mumbai', stars: 5, text: 'Superb product! Delivered in just 3 days. My car is spotless now. Highly recommend TurboClean Pro.' },
              { name: 'Priya S.', city: 'Delhi', stars: 5, text: 'Amazing suction power. I use it for my keyboard and car seats. Worth every rupee. Great quality!' },
              { name: 'Amit K.', city: 'Bangalore', stars: 5, text: 'Excellent product and fast delivery. E-RUUP is my go-to store now. The COD option made it very easy!' },
            ].map((r, i) => (
              <motion.div
                key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex mb-3">
                  {Array(r.stars).fill(0).map((_, j) => <span key={j} className="text-yellow-400 text-lg">★</span>)}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">"{r.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#34367f] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {r.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-gray-900">{r.name}</div>
                    <div className="text-xs text-gray-500">{r.city}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ─────────────────────────────────────── */}
      <section className="bg-gradient-to-r from-[#1a1c4e] to-[#34367f] text-white py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black mb-4"
          >
            Ready to Order? 🎉
          </motion.h2>
          <p className="text-blue-200 mb-8 text-lg">Cash on Delivery • Free Shipping • 3–5 Day Delivery</p>
          <button
            onClick={() => navigate('/product/turboclean')}
            className="bg-white text-[#34367f] font-black text-lg px-10 py-4 rounded-2xl hover:bg-gray-100 transition-colors shadow-xl hover:scale-105 transform duration-200"
          >
            Shop Now — ₹699 Only! 🚀
          </button>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer className="bg-[#111] text-gray-400 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-9 h-9 bg-[#34367f] rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-lg">E</span>
            </div>
            <span className="text-white font-black text-xl tracking-widest">E-RUUP</span>
          </div>
          <p className="text-sm mb-2">Your Trusted Online Store | India</p>
          <p className="text-xs text-gray-600">© 2024 E-RUUP. All rights reserved. | Cash on Delivery available.</p>
        </div>
      </footer>
    </div>
  );
};

export default StoreFront;
