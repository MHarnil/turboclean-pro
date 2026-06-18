import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaKeyboard, FaCar, FaDesktop, FaHome, FaCamera, FaDotCircle } from 'react-icons/fa';
import { MdDangerous } from 'react-icons/md';

const problems = [
  {
    icon: <FaKeyboard size={32} />,
    title: 'Dust Inside Keyboards',
    description: 'Crumbs, dust and debris accumulate between keys causing sticky keys, hygiene issues and reduced lifespan.',
    color: 'from-red-500/20 to-orange-500/20',
    border: 'border-red-500/30',
    iconColor: 'text-red-400',
  },
  {
    icon: <FaCar size={32} />,
    title: 'Dirty Car Interiors',
    description: 'Food crumbs, dirt, and dust in car seats and floor mats are impossible to clean with standard tools.',
    color: 'from-orange-500/20 to-yellow-500/20',
    border: 'border-orange-500/30',
    iconColor: 'text-orange-400',
  },
  {
    icon: <FaDesktop size={32} />,
    title: 'Dusty CPU Cabinets',
    description: 'Accumulated dust causes overheating, reduced performance, and shortens the life of your expensive computer.',
    color: 'from-yellow-500/20 to-amber-500/20',
    border: 'border-yellow-500/30',
    iconColor: 'text-yellow-400',
  },
  {
    icon: <FaDotCircle size={32} />,
    title: 'Hard-to-Reach Corners',
    description: 'Standard vacuums cannot reach tight corners, vents, and gaps. Dust builds up in hidden spots silently.',
    color: 'from-pink-500/20 to-red-500/20',
    border: 'border-pink-500/30',
    iconColor: 'text-pink-400',
  },
  {
    icon: <FaCamera size={32} />,
    title: 'Camera Lens Dust',
    description: 'Even tiny dust particles on camera sensors and lenses ruin your precious photos and videos forever.',
    color: 'from-purple-500/20 to-pink-500/20',
    border: 'border-purple-500/30',
    iconColor: 'text-purple-400',
  },
  {
    icon: <FaHome size={32} />,
    title: 'Unreachable Home Corners',
    description: 'Tight spaces behind furniture, air vents and shelves accumulate dust that triggers allergies and health issues.',
    color: 'from-rose-500/20 to-pink-500/20',
    border: 'border-rose-500/30',
    iconColor: 'text-rose-400',
  },
];

const ProblemSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="problems" className="section-padding bg-gradient-to-b from-dark-900 to-dark-800">
      <div className="section-container" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 badge bg-red-500/10 border border-red-500/20 text-red-400 mb-4">
            <MdDangerous size={16} />
            <span>The Problem</span>
          </div>
          <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            Sound <span className="text-red-400">Familiar?</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Millions of Indians struggle with these cleaning problems every single day.
            Traditional cleaning methods simply don't work.
          </p>
        </motion.div>

        {/* Problem Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative bg-gradient-to-br ${problem.color} border ${problem.border} rounded-2xl p-6 group hover:scale-105 transition-all duration-300`}
            >
              <div className="flex items-start gap-4">
                <div className={`${problem.iconColor} opacity-80 group-hover:opacity-100 mt-1 flex-shrink-0 group-hover:scale-110 transition-all duration-300`}>
                  {problem.icon}
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-red-300 transition-colors">
                    {problem.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </div>
              {/* Problem indicator */}
              <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
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
          <p className="text-2xl font-display font-bold text-white mb-2">
            What if there was a <span className="text-sky-400">smarter solution?</span>
          </p>
          <p className="text-white/50 mb-6">Introducing TurboClean Pro — the one device that solves all these problems.</p>
          <button
            onClick={() => document.getElementById('solution')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary"
          >
            See The Solution ↓
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
