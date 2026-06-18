import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaCar, FaLaptop, FaKeyboard, FaGamepad, FaCamera, FaHome } from 'react-icons/fa';

const useCases = [
  {
    icon: <FaCar size={40} />,
    title: 'Car Cleaning',
    description: 'Vacuum seat crumbs, dust from dashboard and floor mats. Cordless freedom inside your car.',
    emoji: '🚗',
    color: 'from-sky-600/30 to-blue-600/20',
    border: 'border-sky-500/40',
    iconColor: 'text-sky-400',
    tip: 'Best with Long Nozzle',
  },
  {
    icon: <FaLaptop size={40} />,
    title: 'Laptop Cleaning',
    description: 'Blow dust from vents, keyboard and ports. Keep your laptop cool and performing at peak speed.',
    emoji: '💻',
    color: 'from-violet-600/30 to-purple-600/20',
    border: 'border-violet-500/40',
    iconColor: 'text-violet-400',
    tip: 'Best with Blowing Head',
  },
  {
    icon: <FaKeyboard size={40} />,
    title: 'Keyboard Cleaning',
    description: 'Powerful suction removes all dust, crumbs and debris from between keys in under 30 seconds.',
    emoji: '⌨️',
    color: 'from-emerald-600/30 to-green-600/20',
    border: 'border-emerald-500/40',
    iconColor: 'text-emerald-400',
    tip: 'Best with Brush Head',
  },
  {
    icon: <FaGamepad size={40} />,
    title: 'Gaming Setup Cleaning',
    description: 'Clean your gaming PC, console vents, controller buttons and gaming desk without any hassle.',
    emoji: '🎮',
    color: 'from-rose-600/30 to-pink-600/20',
    border: 'border-rose-500/40',
    iconColor: 'text-rose-400',
    tip: 'Vacuum + Blower Mode',
  },
  {
    icon: <FaCamera size={40} />,
    title: 'Camera Cleaning',
    description: 'Safely remove dust from camera bodies, lens mounts, and accessories without risking damage.',
    emoji: '📷',
    color: 'from-amber-600/30 to-yellow-600/20',
    border: 'border-amber-500/40',
    iconColor: 'text-amber-400',
    tip: 'Gentle Air Mode',
  },
  {
    icon: <FaHome size={40} />,
    title: 'Home Cleaning',
    description: 'Clean shelves, sofa crevices, window sills, curtains and all those hard-to-reach spots at home.',
    emoji: '🏠',
    color: 'from-teal-600/30 to-cyan-600/20',
    border: 'border-teal-500/40',
    iconColor: 'text-teal-400',
    tip: 'All Attachments',
  },
];

const UseCases = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="usecases" className="section-padding bg-gradient-to-b from-dark-800 to-dark-900">
      <div className="section-container" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 badge bg-green-500/10 border border-green-500/20 text-green-400 mb-4">
            <span>✨</span>
            <span>Use Cases</span>
          </div>
          <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            One Device,{' '}
            <span className="gradient-text">Endless Possibilities</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            TurboClean Pro adapts to every cleaning challenge with its versatile attachments and dual-mode functionality.
          </p>
        </motion.div>

        {/* Use Case Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`relative bg-gradient-to-br ${useCase.color} border ${useCase.border} rounded-3xl p-6 cursor-pointer group overflow-hidden`}
            >
              {/* Background emoji watermark */}
              <div className="absolute -bottom-4 -right-4 text-8xl opacity-10 group-hover:opacity-20 transition-opacity select-none">
                {useCase.emoji}
              </div>

              {/* Icon */}
              <div className={`${useCase.iconColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {useCase.icon}
              </div>

              {/* Content */}
              <h3 className="font-display font-bold text-xl text-white mb-2">
                {useCase.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed mb-4">
                {useCase.description}
              </p>

              {/* Tip badge */}
              <span className="inline-flex items-center gap-1 text-xs bg-white/10 text-white/60 px-3 py-1 rounded-full">
                💡 {useCase.tip}
              </span>

              {/* Hover shine effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%)'
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center mt-12"
        >
          <p className="text-white/60 mb-2 text-lg">
            <span className="text-white font-semibold">6 use cases</span> · <span className="text-white font-semibold">5 attachments</span> · <span className="text-white font-semibold">1 amazing price</span>
          </p>
          <button
            onClick={() => navigate('/order')}
            className="btn-gold mt-4"
          >
            Get Yours Now — ₹699 🚀
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default UseCases;
