import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiX, FiZoomIn } from 'react-icons/fi';

// Import product images
import img1 from '../assets/product1.jpg';
import img2 from '../assets/product2.jpg';
import img3 from '../assets/product3.jpg';
import img4 from '../assets/product4.jpg';
import img5 from '../assets/product5.jpg';

const images = [
  { src: img1, alt: 'TurboClean Pro - Main Product View with Attachments' },
  { src: img2, alt: 'TurboClean Pro - Multiple Use Cases: Car, Travel, Office, Home' },
  { src: img3, alt: 'TurboClean Pro - Easy USB-C Charging with Long Battery Life' },
  { src: img4, alt: 'TurboClean Pro - Package Contents: Nozzle, Brush, Blowing Head' },
  { src: img5, alt: 'TurboClean Pro - Compact Portable Design with Accessories' },
];

const ProductGallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const prev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setActiveIndex((i) => (i + 1) % images.length);

  const prevLightbox = () => setLightboxIndex((i) => (i - 1 + images.length) % images.length);
  const nextLightbox = () => setLightboxIndex((i) => (i + 1) % images.length);

  return (
    <section id="gallery" className="section-padding bg-gradient-to-b from-dark-900 to-dark-800">
      <div className="section-container" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 badge bg-purple-500/10 border border-purple-500/20 text-purple-400 mb-4">
            <FiZoomIn size={14} />
            <span>Product Gallery</span>
          </div>
          <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            See It <span className="gradient-text">Up Close</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            High-resolution product photos showing every angle and attachment included in the box.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Main Image Display */}
          <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-dark-800 mb-4 aspect-[4/3] group cursor-pointer"
            onClick={() => setLightboxIndex(activeIndex)}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={activeIndex}
                src={images[activeIndex].src}
                alt={images[activeIndex].alt}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full object-contain p-4"
              />
            </AnimatePresence>

            {/* Overlay hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 card-glass px-4 py-2 rounded-xl flex items-center gap-2">
                <FiZoomIn size={18} />
                <span className="text-sm font-medium">Click to zoom</span>
              </div>
            </div>

            {/* Nav arrows */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 card-glass rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
            >
              <FiChevronLeft size={20} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 card-glass rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
            >
              <FiChevronRight size={20} />
            </button>

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 card-glass px-3 py-1 rounded-full text-xs text-white/70">
              {activeIndex + 1} / {images.length}
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 justify-center flex-wrap">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                  i === activeIndex
                    ? 'border-sky-500 shadow-glow scale-105'
                    : 'border-white/10 hover:border-white/30'
                }`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-contain bg-dark-800 p-1"
                />
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-overlay"
            onClick={() => setLightboxIndex(null)}
          >
            <div className="relative max-w-5xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
              {/* Close */}
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors"
              >
                <FiX size={32} />
              </button>

              {/* Image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: isZoomed ? 1.5 : 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className={`cursor-${isZoomed ? 'zoom-out' : 'zoom-in'} overflow-hidden rounded-2xl`}
                  onClick={() => setIsZoomed(!isZoomed)}
                >
                  <img
                    src={images[lightboxIndex].src}
                    alt={images[lightboxIndex].alt}
                    className="w-full max-h-[80vh] object-contain bg-dark-800 rounded-2xl"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Nav */}
              <button
                onClick={prevLightbox}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 rounded-full flex items-center justify-center hover:bg-black/80 transition-all text-white"
              >
                <FiChevronLeft size={24} />
              </button>
              <button
                onClick={nextLightbox}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 rounded-full flex items-center justify-center hover:bg-black/80 transition-all text-white"
              >
                <FiChevronRight size={24} />
              </button>

              {/* Caption */}
              <p className="text-center text-white/60 text-sm mt-4">{images[lightboxIndex].alt}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProductGallery;
