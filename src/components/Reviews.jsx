import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaStar } from 'react-icons/fa';
import { FiChevronDown } from 'react-icons/fi';

const reviews = [
  {
    name: 'Rahul Sharma',
    city: 'Mumbai',
    avatar: 'RS',
    avatarColor: 'from-sky-500 to-blue-600',
    rating: 5,
    date: '15 June 2026',
    title: 'Absolutely love this product!',
    review: 'I bought this for cleaning my car and laptop. The suction power is surprisingly strong for such a small device. My car seats look spotless now. Highly recommend to anyone looking for a portable cleaning solution!',
    verified: true,
    helpful: 47,
  },
  {
    name: 'Priya Patel',
    city: 'Ahmedabad',
    avatar: 'PP',
    avatarColor: 'from-pink-500 to-rose-600',
    rating: 5,
    date: '12 June 2026',
    title: 'Perfect for keyboard cleaning!',
    review: 'I\'m a content creator and my keyboard was a mess. This TurboClean Pro cleaned it in under 2 minutes. The blower mode is super effective. Packaging was great and delivery was on time. 5 stars!',
    verified: true,
    helpful: 38,
  },
  {
    name: 'Amit Verma',
    city: 'Delhi',
    avatar: 'AV',
    avatarColor: 'from-amber-500 to-orange-600',
    rating: 5,
    date: '10 June 2026',
    title: 'Great value for money!',
    review: 'At ₹699, this is an absolute steal. I\'ve been using it for 3 weeks now and it still holds a charge well. Used it on my gaming setup, car, and even cleaned my AC filters. Amazing product!',
    verified: true,
    helpful: 55,
  },
  {
    name: 'Neha Singh',
    city: 'Bangalore',
    avatar: 'NS',
    avatarColor: 'from-purple-500 to-violet-600',
    rating: 5,
    date: '8 June 2026',
    title: 'My laptop runs cooler now!',
    review: 'My laptop was overheating due to dust in vents. After using TurboClean Pro in blower mode, the temperature dropped significantly. I wish I had bought this earlier. Excellent product!',
    verified: true,
    helpful: 62,
  },
  {
    name: 'Rakesh Kumar',
    city: 'Chennai',
    avatar: 'RK',
    avatarColor: 'from-teal-500 to-cyan-600',
    rating: 5,
    date: '5 June 2026',
    title: 'Superb suction power!',
    review: 'I was skeptical about buying a cheap vacuum but this exceeded my expectations. The 1200Pa suction is real — it pulled out dust I couldn\'t even see. Fast delivery and good packaging. Will buy again!',
    verified: true,
    helpful: 41,
  },
  {
    name: 'Vishal Shah',
    city: 'Pune',
    avatar: 'VS',
    avatarColor: 'from-green-500 to-emerald-600',
    rating: 5,
    date: '3 June 2026',
    title: 'Best cleaning gadget I own!',
    review: 'Bought this for my car interior cleaning. The long nozzle attachment reaches under seats easily. Battery lasts plenty long for a full car clean. My car looks brand new after every clean. Fantastic product!',
    verified: true,
    helpful: 29,
  },
  {
    name: 'Sneha Gupta',
    city: 'Hyderabad',
    avatar: 'SG',
    avatarColor: 'from-red-500 to-rose-600',
    rating: 5,
    date: '1 June 2026',
    title: 'Saved my camera from dust!',
    review: 'As a photographer, dust on my camera is my worst nightmare. This blower is perfect — gentle enough for camera bodies but powerful enough to clear everything. Much better than rubber blowers. Highly recommended!',
    verified: true,
    helpful: 73,
  },
  {
    name: 'Arjun Patel',
    city: 'Surat',
    avatar: 'AP',
    avatarColor: 'from-indigo-500 to-blue-600',
    rating: 5,
    date: '28 May 2026',
    title: 'Fantastic for PC cleaning!',
    review: 'I clean my PC cabinet every month and this has made the job so easy. The blower mode with the narrow nozzle gets into every corner. No more compressed air cans! USB charging is a great plus. Highly satisfied.',
    verified: true,
    helpful: 44,
  },
  {
    name: 'Karan Mehta',
    city: 'Jaipur',
    avatar: 'KM',
    avatarColor: 'from-yellow-500 to-amber-600',
    rating: 5,
    date: '25 May 2026',
    title: 'Wife loves it for home cleaning!',
    review: 'My wife uses this for cleaning shelves, sofa corners, and window sills. The brush attachment is perfect for these tasks. We\'ve been using it daily for a month and the battery shows no signs of degradation. Great buy!',
    verified: true,
    helpful: 58,
  },
  {
    name: 'Pooja Joshi',
    city: 'Kolkata',
    avatar: 'PJ',
    avatarColor: 'from-pink-500 to-fuchsia-600',
    rating: 5,
    date: '22 May 2026',
    title: 'Exactly as described, 10/10!',
    review: 'Ordered with some doubt but received a product that exceeded all expectations. The build quality feels premium for the price. COD option gave me confidence to order. Will definitely recommend to friends and family!',
    verified: true,
    helpful: 36,
  },
];

const ReviewCard = ({ review, index, isInView }) => {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.review.length > 150;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="card-glass rounded-2xl p-6 hover:border-yellow-500/30 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${review.avatarColor} flex items-center justify-center font-bold text-white text-sm flex-shrink-0`}>
            {review.avatar}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-white text-sm">{review.name}</h4>
              {review.verified && (
                <span className="text-xs text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded-full">✓ Verified</span>
              )}
            </div>
            <p className="text-white/40 text-xs">{review.city} · {review.date}</p>
          </div>
        </div>

        {/* Stars */}
        <div className="flex items-center gap-0.5">
          {[...Array(review.rating)].map((_, i) => (
            <FaStar key={i} className="text-yellow-400 text-sm" />
          ))}
        </div>
      </div>

      {/* Review title */}
      <h5 className="font-semibold text-white text-sm mb-2">"{review.title}"</h5>

      {/* Review text */}
      <p className="text-white/60 text-sm leading-relaxed">
        {isLong && !expanded ? `${review.review.slice(0, 150)}...` : review.review}
      </p>
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sky-400 text-xs mt-1 hover:underline"
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}

      {/* Helpful */}
      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
        <span className="text-white/30 text-xs">{review.helpful} people found this helpful</span>
      </div>
    </motion.div>
  );
};

const Reviews = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [showAll, setShowAll] = useState(false);

  const displayedReviews = showAll ? reviews : reviews.slice(0, 6);

  return (
    <section id="reviews" className="section-padding bg-gradient-to-b from-dark-900 to-dark-800">
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
            <span>Customer Reviews</span>
          </div>
          <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            What India is <span className="gold-text">Saying</span>
          </h2>

          {/* Rating summary */}
          <div className="flex flex-col items-center gap-3 mb-6">
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400 text-2xl" />
              ))}
            </div>
            <div className="flex items-center gap-4 text-white/60">
              <span className="font-display font-bold text-4xl text-white">4.8</span>
              <div className="text-left">
                <p className="text-white/80 font-medium">Excellent</p>
                <p className="text-white/50 text-sm">Based on 5,000+ reviews</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Review Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedReviews.map((review, i) => (
            <ReviewCard key={i} review={review} index={i} isInView={isInView} />
          ))}
        </div>

        {/* Show More / CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-10 flex flex-col items-center gap-4"
        >
          {!showAll && (
            <button
              onClick={() => setShowAll(true)}
              className="flex items-center gap-2 text-sky-400 hover:text-sky-300 transition-colors font-medium"
            >
              <span>Show all 10 reviews</span>
              <FiChevronDown />
            </button>
          )}
          <button
            onClick={() => navigate('/order')}
            className="btn-gold"
          >
            🛒 Join 5000+ Happy Customers — ₹699
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Reviews;
