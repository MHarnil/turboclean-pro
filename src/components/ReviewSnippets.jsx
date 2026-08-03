import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';

import review1 from '../assets/review1.jpg';
import review2 from '../assets/review2.jpg';
import review3 from '../assets/review3.jpg';
import product1 from '../assets/product1.jpg';
import product2 from '../assets/product2.jpg';

const reviewImages = [
  { id: 1, src: review1, alt: 'Review 1' },
  { id: 2, src: review2, alt: 'Review 2' },
  { id: 3, src: review3, alt: 'Review 3' },
  { id: 4, src: product1, alt: 'Review 4' },
  { id: 5, src: product2, alt: 'Review 5' },
];

const customerComments = [
  { name: 'Kasish', rating: 5, text: 'Very helpful product. Amazed by the quality 😊' },
  { name: 'Rahul Sharma', rating: 5, text: 'Cleaned my car seats in 5 minutes! Super powerful.' },
  { name: 'Priya Patel', rating: 5, text: 'Awesome product for keyboard & laptop dust cleaning.' },
  { name: 'Amit Verma', rating: 5, text: 'At ₹699, this is absolute value for money!' },
  { name: 'Sneha Gupta', rating: 5, text: 'Fast delivery, received in 3 days. COD option is great.' },
];

export default function ReviewSnippets() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalImage, setModalImage] = useState(null);

  const prevComment = () => {
    setCurrentIndex((prev) => (prev === 0 ? customerComments.length - 1 : prev - 1));
  };

  const nextComment = () => {
    setCurrentIndex((prev) => (prev === customerComments.length - 1 ? 0 : prev + 1));
  };

  const current = customerComments[currentIndex];

  return (
    <div className="my-6 w-full text-left">
      {/* Title */}
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
        Review snippets
      </h3>

      {/* 5 Thumbnails Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5 mb-4">
        {reviewImages.map((img) => (
          <div
            key={img.id}
            onClick={() => setModalImage(img.src)}
            className="aspect-square rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 cursor-pointer hover:opacity-90 hover:scale-105 transition-all shadow-sm bg-gray-100 dark:bg-dark-800"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Review Comment Carousel Box */}
      <div className="relative bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-4 shadow-sm flex items-center justify-between gap-2">
        {/* Prev Button */}
        <button
          type="button"
          onClick={prevComment}
          className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-700 dark:text-white flex items-center justify-center text-sm transition-colors flex-shrink-0"
          aria-label="Previous review"
        >
          <FiChevronLeft size={18} />
        </button>

        {/* Comment Content */}
        <div className="flex-1 text-center px-2">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <span className="font-bold text-gray-900 dark:text-white text-sm">
              {current.name}
            </span>
            <div className="flex items-center text-amber-400 text-xs">
              {[...Array(current.rating)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
          </div>
          <p className="text-xs sm:text-sm text-gray-700 dark:text-white/80 font-medium">
            "{current.text}"
          </p>
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={nextComment}
          className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-700 dark:text-white flex items-center justify-center text-sm transition-colors flex-shrink-0"
          aria-label="Next review"
        >
          <FiChevronRight size={18} />
        </button>
      </div>

      {/* Fullscreen Image Lightbox Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setModalImage(null)}
        >
          <div className="relative max-w-2xl max-h-[85vh]">
            <button
              onClick={() => setModalImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-amber-400 p-2 text-2xl font-bold"
            >
              <FiX />
            </button>
            <img
              src={modalImage}
              alt="Review preview"
              className="rounded-2xl max-h-[80vh] w-auto object-contain border border-white/20 shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
