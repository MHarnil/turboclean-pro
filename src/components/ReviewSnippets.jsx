import React, { useState, useRef } from 'react';
import { FaStar } from 'react-icons/fa';
import { FiChevronLeft, FiChevronRight, FiX, FiCheckCircle } from 'react-icons/fi';

import review1 from '../assets/review1.jpg';
import review2 from '../assets/review2.jpg';
import review3 from '../assets/review3.jpg';
import review4 from '../assets/review4.jpg';
import review5 from '../assets/review5.jpg';
import review6 from '../assets/review6.jpg';
import review7 from '../assets/review7.jpg';
import product1 from '../assets/product1.jpg';
import product2 from '../assets/product2.jpg';

const reviewCards = [
  {
    id: 1,
    name: 'Rahul Sharma',
    city: 'Mumbai',
    date: '2 days ago',
    rating: 5,
    verified: true,
    image: review1,
    comment: 'Cleaned my car seats in 5 minutes! Super powerful suction.',
    avatarColor: 'bg-blue-600',
    initials: 'RS',
  },
  {
    id: 2,
    name: 'Hardik Shah',
    city: 'Surat',
    date: 'Yesterday',
    rating: 5,
    verified: true,
    image: review4,
    comment: 'Received complete package with all nozzle attachments. Excellent quality!',
    avatarColor: 'bg-teal-600',
    initials: 'HS',
  },
  {
    id: 3,
    name: 'Kasish P.',
    city: 'Delhi',
    date: '3 days ago',
    rating: 5,
    verified: true,
    image: review2,
    comment: 'Very helpful product. Amazed by the quality & build! 😊',
    avatarColor: 'bg-emerald-600',
    initials: 'KP',
  },
  {
    id: 4,
    name: 'Manish Joshi',
    city: 'Jaipur',
    date: '2 days ago',
    rating: 5,
    verified: true,
    image: review5,
    comment: 'Unboxed & tested immediately — suction power is 10/10. Great product!',
    avatarColor: 'bg-indigo-600',
    initials: 'MJ',
  },
  {
    id: 5,
    name: 'Priya Patel',
    city: 'Ahmedabad',
    date: '4 days ago',
    rating: 5,
    verified: true,
    image: review3,
    comment: 'Awesome product for keyboard & laptop dust cleaning!',
    avatarColor: 'bg-rose-600',
    initials: 'PP',
  },
  {
    id: 6,
    name: 'Vikram Singh',
    city: 'Chandigarh',
    date: '3 days ago',
    rating: 5,
    verified: true,
    image: review6,
    comment: 'Perfect for deep cleaning my AC vents & computer cabinet. Must buy!',
    avatarColor: 'bg-[#34367f]',
    initials: 'VS',
  },
  {
    id: 7,
    name: 'Amit Verma',
    city: 'Bangalore',
    date: '5 days ago',
    rating: 5,
    verified: true,
    image: product1,
    comment: 'At ₹699, this is absolute value for money. 100% recommended!',
    avatarColor: 'bg-amber-600',
    initials: 'AV',
  },
  {
    id: 8,
    name: 'Deepak Kumar',
    city: 'Kolkata',
    date: '4 days ago',
    rating: 5,
    verified: true,
    image: review7,
    comment: 'Battery backup is solid and USB-C charging is super convenient.',
    avatarColor: 'bg-cyan-700',
    initials: 'DK',
  },
  {
    id: 9,
    name: 'Sneha Gupta',
    city: 'Pune',
    date: '1 week ago',
    rating: 5,
    verified: true,
    image: product2,
    comment: 'Fast delivery, received in 3 days. COD option made ordering easy.',
    avatarColor: 'bg-purple-600',
    initials: 'SG',
  },
];

export default function ReviewSnippets() {
  const scrollRef = useRef(null);
  const [modalImage, setModalImage] = useState(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="my-6 w-full text-left">
      {/* Header bar */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-base font-black text-gray-900 dark:text-white flex items-center gap-1.5">
            <span>Customer Photos</span>
            <span className="text-xs bg-amber-400/20 text-amber-600 dark:text-amber-400 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <FaStar className="text-amber-400" size={11} /> 4.4 (728 Reviews)
            </span>
          </h3>
        </div>

        {/* Scroll Controls */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => scroll('left')}
            className="w-7 h-7 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-700 dark:text-white flex items-center justify-center transition-colors"
            aria-label="Scroll left"
          >
            <FiChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            className="w-7 h-7 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-700 dark:text-white flex items-center justify-center transition-colors"
            aria-label="Scroll right"
          >
            <FiChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Horizontal Customer Photo Cards Reel */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto no-scrollbar py-2 px-0.5 scroll-smooth"
      >
        {reviewCards.map((card) => (
          <div
            key={card.id}
            className="w-[230px] flex-shrink-0 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-3 shadow-sm hover:shadow-md hover:border-amber-400/50 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Customer Header */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full ${card.avatarColor} text-white flex items-center justify-center font-bold text-xs flex-shrink-0`}
                  >
                    {card.initials}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-tight">
                      {card.name}
                    </h4>
                    <span className="text-[10px] text-gray-400 block leading-tight">
                      {card.city} • {card.date}
                    </span>
                  </div>
                </div>

                {card.verified && (
                  <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-0.5 bg-emerald-50 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded-full">
                    <FiCheckCircle size={10} /> Verified
                  </span>
                )}
              </div>

              {/* Stars */}
              <div className="flex items-center text-amber-400 text-xs mb-2">
                {[...Array(card.rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              {/* Customer Photo */}
              <div
                onClick={() => setModalImage(card.image)}
                className="relative rounded-xl overflow-hidden aspect-[4/3] bg-gray-100 dark:bg-dark-800 cursor-pointer group mb-2 border border-gray-100 dark:border-white/5"
              >
                <img
                  src={card.image}
                  alt={`Photo review by ${card.name}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[11px] font-bold gap-1">
                  🔍 Tap to view
                </div>
              </div>

              {/* Comment text */}
              <p className="text-xs text-gray-700 dark:text-white/80 line-clamp-2 leading-relaxed font-medium">
                "{card.comment}"
              </p>
            </div>
          </div>
        ))}
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
              alt="Full customer photo review"
              className="rounded-2xl max-h-[80vh] w-auto object-contain border border-white/20 shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
