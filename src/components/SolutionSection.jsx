import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const beforeAfterCards = [
  {
    scenario: 'Keyboard Cleaning',
    before: {
      title: 'Before TurboClean Pro',
      points: ['Sticky keys due to dust', 'Wasted time with cotton swabs', 'Bacteria & hygiene issues', 'Frustrated and gave up'],
    },
    after: {
      title: 'After TurboClean Pro',
      points: ['Crystal clean keys in 30 seconds', 'Powerful suction removes all debris', 'Hygienic and germ-free keyboard', 'Feels brand new every time!'],
    },
  },
  {
    scenario: 'Car Interior',
    before: {
      title: 'Before TurboClean Pro',
      points: ['Crumbs and dust everywhere', 'Bulky vacuum with cord tangling', 'Can\'t reach tight spots', 'Embarrassed by dirty car'],
    },
    after: {
      title: 'After TurboClean Pro',
      points: ['Spotless car interior in minutes', 'Cordless — use anywhere freely', 'Long nozzle reaches every corner', 'Impress everyone who rides with you!'],
    },
  },
  {
    scenario: 'Laptop & PC',
    before: {
      title: 'Before TurboClean Pro',
      points: ['Canned air is expensive & wasteful', 'Blowing by mouth spreads moisture', 'Dust causes overheating', 'Computer slows down over time'],
    },
    after: {
      title: 'After TurboClean Pro',
      points: ['Powerful air blast clears all dust', 'Safe dry airflow — no damage', 'Computer runs cooler & faster', 'Extends the life of your device!'],
    },
  },
];

const SolutionSection = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="solution" className="section-padding bg-gradient-to-b from-dark-800 to-dark-900">
      <div className="section-container" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 badge bg-sky-500/10 border border-sky-500/20 text-sky-400 mb-4">
            <FaCheckCircle size={14} />
            <span>The Solution</span>
          </div>
          <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            TurboClean Pro <span className="gradient-text">Solves Everything</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            See the dramatic transformation with our revolutionary 2-in-1 cleaning technology.
          </p>
        </motion.div>

        {/* Before/After Cards */}
        <div className="space-y-8">
          {beforeAfterCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="rounded-3xl overflow-hidden border border-white/10"
            >
              {/* Scenario Label */}
              <div className="bg-gradient-to-r from-sky-500/20 to-blue-500/20 px-6 py-3 border-b border-white/10">
                <h3 className="font-display font-bold text-white text-lg">{card.scenario}</h3>
              </div>

              <div className="grid md:grid-cols-2">
                {/* Before */}
                <div className="bg-gradient-to-br from-red-500/10 to-dark-800 p-6 md:border-r border-white/10">
                  <div className="flex items-center gap-2 mb-4">
                    <FaTimesCircle className="text-red-400" size={20} />
                    <h4 className="font-semibold text-red-400">{card.before.title}</h4>
                  </div>
                  <ul className="space-y-2">
                    {card.before.points.map((p, j) => (
                      <li key={j} className="flex items-start gap-2 text-white/60 text-sm">
                        <span className="text-red-500 mt-0.5 flex-shrink-0">✗</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* After */}
                <div className="bg-gradient-to-br from-green-500/10 to-dark-800 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <FaCheckCircle className="text-green-400" size={20} />
                    <h4 className="font-semibold text-green-400">{card.after.title}</h4>
                  </div>
                  <ul className="space-y-2">
                    {card.after.points.map((p, j) => (
                      <li key={j} className="flex items-start gap-2 text-white/80 text-sm">
                        <span className="text-green-400 mt-0.5 flex-shrink-0">✓</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => navigate('/order')}
            className="btn-gold text-xl px-12 py-5"
          >
            🛒 Get TurboClean Pro — ₹699 Only!
          </button>
          <p className="text-white/40 text-sm mt-3">✅ Free Delivery · Cash On Delivery Available · Limited Stock</p>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionSection;
