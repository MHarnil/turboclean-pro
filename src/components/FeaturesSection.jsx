import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaWind, FaBolt, FaUsb, FaLeaf, FaBatteryFull, FaTools } from 'react-icons/fa';
import { MdScreenshotMonitor } from 'react-icons/md';

const features = [
  {
    icon: <FaWind size={36} />,
    title: 'Powerful 1200Pa Suction',
    description: 'Industry-leading 1200Pa suction power removes all dust, debris, crumbs and particles instantly.',
    color: 'from-sky-500/30 to-blue-500/20',
    border: 'border-sky-500/30',
    iconColor: 'text-sky-400',
    tag: 'Most Powerful',
  },
  {
    icon: <FaBolt size={36} />,
    title: 'Air Blower Function',
    description: 'Powerful air blower mode blasts dust from keyboards, cameras, and hard-to-reach spaces effortlessly.',
    color: 'from-yellow-500/30 to-amber-500/20',
    border: 'border-yellow-500/30',
    iconColor: 'text-yellow-400',
    tag: '2-in-1',
  },
  {
    icon: <FaUsb size={36} />,
    title: 'USB-C Rechargeable',
    description: 'Type-C USB charging — charge from laptop, power bank, car charger, or wall adapter. No proprietary cables.',
    color: 'from-purple-500/30 to-pink-500/20',
    border: 'border-purple-500/30',
    iconColor: 'text-purple-400',
    tag: 'Universal',
  },
  {
    icon: <FaLeaf size={36} />,
    title: 'Lightweight & Portable',
    description: 'Ultra-compact and lightweight design fits in your bag, glove box, or desk drawer. Clean anywhere, anytime.',
    color: 'from-green-500/30 to-teal-500/20',
    border: 'border-green-500/30',
    iconColor: 'text-green-400',
    tag: 'Portable',
  },
  {
    icon: <FaBatteryFull size={36} />,
    title: '2400mAh Long Battery',
    description: 'High-capacity 2400mAh lithium battery provides 15-25 minutes of continuous cleaning power.',
    color: 'from-rose-500/30 to-red-500/20',
    border: 'border-rose-500/30',
    iconColor: 'text-rose-400',
    tag: 'Long Lasting',
  },
  {
    icon: <FaTools size={36} />,
    title: 'Multi-Purpose Attachments',
    description: 'Comes with long nozzle, brush head, and blowing head. Switch between attachments in seconds.',
    color: 'from-cyan-500/30 to-sky-500/20',
    border: 'border-cyan-500/30',
    iconColor: 'text-cyan-400',
    tag: '5 Attachments',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const FeaturesSection = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="features" className="section-padding bg-gradient-to-b from-dark-900 to-dark-800">
      <div className="section-container" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 badge bg-sky-500/10 border border-sky-500/20 text-sky-400 mb-4">
            <MdScreenshotMonitor size={16} />
            <span>Core Features</span>
          </div>
          <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            Engineered for <span className="gradient-text">Peak Performance</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Every feature designed with one goal in mind — the cleanest, fastest, most satisfying cleaning experience possible.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className={`feature-card bg-gradient-to-br ${feature.color} border ${feature.border} relative overflow-hidden`}
            >
              {/* Tag */}
              <span className="absolute top-4 right-4 text-xs font-semibold bg-white/10 px-2 py-1 rounded-full text-white/60">
                {feature.tag}
              </span>

              {/* Icon */}
              <div className={`${feature.iconColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="font-display font-bold text-xl text-white mb-3 group-hover:gradient-text transition-all">
                {feature.title}
              </h3>
              <p className="text-white/60 leading-relaxed text-sm">
                {feature.description}
              </p>

              {/* Bottom decoration */}
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${feature.color} opacity-50`} />
            </motion.div>
          ))}
        </motion.div>

        {/* Feature highlight box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 gradient-border p-8 text-center"
        >
          <p className="text-2xl font-display font-bold text-white mb-2">
            All of this for just{' '}
            <span className="text-yellow-400 text-3xl font-black">₹699</span>
          </p>
          <p className="text-white/50 mb-6">That's less than the price of a restaurant meal. But it cleans your life every day.</p>
          <button
            onClick={() => navigate('/order')}
            className="btn-gold"
          >
            Order Now — Limited Stock! 🔥
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
