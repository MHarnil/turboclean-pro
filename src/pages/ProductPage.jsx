import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import OrderModal from '../components/OrderModal';
import {
  FiTruck, FiShield, FiCheck, FiChevronDown,
  FiPackage, FiZap, FiWind, FiChevronLeft, FiChevronRight,
} from 'react-icons/fi';
import { FaBatteryFull } from 'react-icons/fa';

import productImg1 from '../assets/product1.jpg';
import productImg2 from '../assets/product2.jpg';
import productImg3 from '../assets/product3.jpg';
import imgBattery  from '../assets/img-battery.jpg';
import imgFilter   from '../assets/img-filter.jpg';
import imgCompare  from '../assets/img-comparison.jpg';
import imgBlower   from '../assets/img-blower.jpg';
import imgSize     from '../assets/img-features.jpg';

const PRICING = { 1: 699, 2: 999, 3: 1399 };
const MRP     = { 1: 1999, 2: 2799, 3: 3799 };

const thumbnails = [productImg1, productImg2, imgBlower, imgCompare, productImg3, imgBattery, imgFilter, imgSize];

const faqs = [
  { q: 'Does it work as both a vacuum and air blower?', a: 'Yes! TurboClean Pro is a 4-in-1 device — vacuum cleaner, air blower, LED flashlight, and dust collector, all in one.' },
  { q: 'How long does the battery last?', a: '2000mAh lithium battery. 30 minutes continuous use. Charges fully in 2.5–3 hours via Type-C USB.' },
  { q: 'Is it suitable for car cleaning?', a: 'Absolutely! It is designed for car interiors — seats, mats, dashboards, and AC vents. Also great for keyboards, sofas, and shelves.' },
  { q: 'Do you offer Cash on Delivery?', a: 'Yes, we offer COD across all of India. You only pay when the product is delivered to your doorstep.' },
  { q: 'How many days will delivery take?', a: 'We deliver within 3–5 business days across India. Free shipping on all orders.' },
];

const ProductPage = () => {
  const [selectedPack, setSelectedPack] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const sliderRef = useRef(null);

  // Scroll to top when page loads
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, []);

  const currentPrice = PRICING[selectedPack];
  const currentMrp   = MRP[selectedPack];
  const discount     = Math.round(((currentMrp - currentPrice) / currentMrp) * 100);

  const slideLeft  = () => sliderRef.current?.scrollBy({ left: -80, behavior: 'smooth' });
  const slideRight = () => sliderRef.current?.scrollBy({ left:  80, behavior: 'smooth' });

  const handlePackSelect = (pack) => { setSelectedPack(pack); };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      {/* ── Breadcrumb ────────────────────────── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-2 text-xs text-gray-500 flex items-center gap-2">
          <a href="/" className="hover:text-[#34367f] transition-colors">Home</a>
          <span>/</span>
          <a href="/" className="hover:text-[#34367f] transition-colors">Electronics</a>
          <span>/</span>
          <span className="text-gray-800 font-medium">TurboClean Pro</span>
        </div>
      </div>

      {/* ── PRODUCT TOP SECTION ───────────────── */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex flex-col lg:flex-row">

            {/* Left: Gallery */}
            <div className="lg:w-1/2 p-3 md:p-4">
              {/* TurboClean Pro Brand Badge */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-2 bg-[#34367f] text-white px-3 py-1.5 rounded-lg">
                  <FiZap size={14} className="text-blue-200" />
                  <span className="font-black text-xs tracking-wider">TURBOCLEAN PRO</span>
                </div>
                <div className="flex items-center gap-1 bg-orange-100 text-orange-600 px-2.5 py-1 rounded-lg text-xs font-bold">
                  🔥 BEST SELLER
                </div>
              </div>

              {/* Main Image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImg}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.25 }}
                  className="border border-gray-100 rounded-xl overflow-hidden flex justify-center items-center bg-gray-50 mb-3"
                  style={{ height: '420px' }}
                >
                  <img src={thumbnails[activeImg]} alt="TurboClean Pro" className="w-full h-full object-contain p-2" />
                </motion.div>
              </AnimatePresence>

              {/* Sliding Thumbnails with arrows */}
              <div className="relative flex items-center gap-1">
                <button
                  onClick={slideLeft}
                  className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-100 hover:bg-[#34367f] hover:text-white flex items-center justify-center transition-colors"
                >
                  <FiChevronLeft size={16} />
                </button>
                <div ref={sliderRef} className="flex gap-2 overflow-x-auto no-scrollbar flex-1 py-1">
                  {thumbnails.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`flex-shrink-0 border-2 rounded-lg overflow-hidden w-16 h-16 transition-all ${
                        activeImg === i
                          ? 'border-[#34367f] shadow-md scale-105'
                          : 'border-gray-200 opacity-60 hover:opacity-100 hover:border-gray-400'
                      }`}
                    >
                      <img src={img} alt={`View ${i+1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
                <button
                  onClick={slideRight}
                  className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-100 hover:bg-[#34367f] hover:text-white flex items-center justify-center transition-colors"
                >
                  <FiChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Right: Product Details */}
            <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-start border-t lg:border-t-0 lg:border-l border-gray-100">
              {/* Stock badge */}
              <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 text-xs font-bold px-3 py-1.5 rounded-full mb-4 w-max border border-red-200">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                HOT PRODUCT | LOW STOCK
              </div>

              <h1 className="text-xl md:text-2xl font-black text-gray-900 leading-tight mb-4">
                Rechargeable 4-in-1 Compressed Air Duster with 91000RPM Adjustable Speed and 6000mAh Power
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-5">
                <div className="flex">
                  {[1,2,3,4,5].map(i => <span key={i} className="text-yellow-400 text-base">★</span>)}
                </div>
                <span className="text-sm font-bold text-gray-700">4.8</span>
                <span className="text-sm text-gray-500">(1,247 reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <span className="text-3xl font-black text-[#34367f]">₹{currentPrice}.00</span>
                <span className="text-base text-gray-400 line-through">₹{currentMrp}.00</span>
                <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">SAVE {discount}%</span>
              </div>

              {/* Pack Selection */}
              <div className="mb-6">
                <p className="text-sm font-bold text-gray-700 mb-3">Choose Quantity:</p>
                <div className="flex gap-3 flex-wrap">
                  {[1, 2, 3].map(pack => (
                    <button
                      key={pack}
                      onClick={() => handlePackSelect(pack)}
                      className={`pack-btn ${selectedPack === pack ? 'active' : ''}`}
                    >
                      Pack of {pack} @ ₹{PRICING[pack]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Order Now Button */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn-primary py-4 text-lg rounded-xl mb-4 w-full"
              >
                🛒 Order Now – Cash on Delivery
              </button>

              {/* Delivery Info */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FiTruck className="text-[#34367f]" />
                  <span>Get it by <strong>3–5 Business Days</strong></span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FiCheck className="text-green-500" />
                  <span>FREE Shipping on this order</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FiShield className="text-[#34367f]" />
                  <span>100% Genuine Product | 7-Day Return Policy</span>
                </div>
              </div>

              {/* Quick specs */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: <FiZap size={18} />, label: '91000 RPM' },
                  { icon: <FaBatteryFull size={18} />, label: '2000mAh Battery' },
                  { icon: <FiWind size={18} />, label: '1200Pa Suction' },
                  { icon: <FiPackage size={18} />, label: '4-in-1 Device' },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2.5 border border-gray-200">
                    <span className="text-[#34367f]">{s.icon}</span>
                    <span className="text-xs font-bold text-gray-700">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── PRODUCT DETAILS ───────────────────── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-14">

        {[
          {
            title: 'Superior Blowing Power',
            body: 'The 4-in-1 Powerful Compressed Air Duster is an innovative and versatile tool designed to meet all your cleaning needs. Equipped with a high-speed 91000RPM motor, this air duster delivers a powerful blast of air to remove dust, debris, and other contaminants from any surface.',
            img: imgBlower,
          },
          {
            title: 'Powerful Suction Mode',
            body: 'In addition to blowing air, this device also functions as a vacuum cleaner. Its strong 1200Pa suction capability efficiently captures dust, dirt, and small debris, making it perfect for cleaning car seats, keyboards, shelves, and tight crevices.',
            img: productImg1,
          },
          {
            title: 'Dual Mode: Vacuum & Air Blower',
            body: 'Switch between vacuum and blower mode instantly. Perfect for deep-cleaning car interiors, removing dust from electronics, and clearing vents. One tool — endless uses.',
            img: imgCompare,
          },
          {
            title: 'Easy & Quick Charging',
            body: '2000mAh lithium battery provides 30 minutes of continuous use. Recharges in just 2.5–3 hours via Type-C USB. Compatible with laptop ports, power banks, car chargers, and wall adapters.',
            img: productImg3,
          },
          {
            title: 'Washable Filter — Reuse & Save',
            body: 'The high-quality HEPA-style filter is fully washable. Simply rinse it under water, let it dry, and it\'s ready to use again. Zero waste, zero extra costs.',
            img: imgFilter,
          },
          {
            title: '2000mAh Lithium Battery',
            body: '2000mAh high-capacity lithium battery ensures 30 minutes of endurance time and 30T standby time. Never run out of power mid-clean again.',
            img: imgBattery,
          },
        ].map((section, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-0`}>
              <div className="md:w-1/2">
                <img src={section.img} alt={section.title} className="w-full h-64 md:h-80 object-cover" />
              </div>
              <div className="md:w-1/2 p-8">
                <h2 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight">{section.title}</h2>
                <div className="w-10 h-1 bg-[#34367f] rounded mb-4" />
                <p className="text-gray-600 leading-relaxed">{section.body}</p>
              </div>
            </div>
          </motion.div>
        ))}

        {/* ── SPECIFICATIONS TABLE ─────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="bg-[#34367f] px-6 py-4">
            <h2 className="text-xl font-black text-white">Technical Specifications</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {[
              ['Motor Speed', '91,000 RPM'],
              ['Suction Power', '1200 Pa'],
              ['Battery', '2000mAh Lithium'],
              ['Charging Time', '2.5–3 Hours'],
              ['Working Time', '30 Minutes'],
              ['Charging Port', 'Type-C USB'],
              ['Weight', '0.85 lbs (approx 385g)'],
              ['Dimensions', '7 inch × 1.6 inch'],
              ['LED Flashlight', 'Built-in'],
              ['Filter', 'Washable & Reusable'],
              ['In The Box', '1× Vacuum, 1× Long Nozzle, 1× Brush Head, 1× Blowing Head, 1× USB Cable'],
            ].map(([key, val], i) => (
              <div key={i} className={`flex px-6 py-3 text-sm ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <span className="w-1/2 font-semibold text-gray-700">{key}</span>
                <span className="w-1/2 text-gray-600">{val}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── FAQ ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-black text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <FiChevronDown
                    className={`flex-shrink-0 ml-4 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-4 text-sm text-gray-600 border-t border-gray-100 pt-3">{faq.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── BOTTOM ORDER CTA ─────────────────── */}
        <div className="bg-gradient-to-r from-[#1a1c4e] to-[#34367f] rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-black mb-2">Ready to Order? 🎉</h3>
          <p className="text-blue-200 mb-6">Cash on Delivery • Free Shipping • 3–5 Day Delivery across India</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-[#34367f] font-black text-lg px-10 py-4 rounded-2xl hover:bg-gray-100 transition-all hover:scale-105 transform"
          >
            🛒 Order Now — ₹{currentPrice} Only!
          </button>
        </div>
      </div>

      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedPack={selectedPack}
        price={currentPrice}
      />
    </div>
  );
};

export default ProductPage;
