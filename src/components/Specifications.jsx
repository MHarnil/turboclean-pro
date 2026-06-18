import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaTable } from 'react-icons/fa';

const specs = [
  { label: 'Product Name', value: 'TurboClean Pro', highlight: true },
  { label: 'Model', value: 'TC-Pro 2024 Edition', highlight: false },
  { label: 'Suction Power', value: '1200 Pa', highlight: true },
  { label: 'Battery Capacity', value: '2400 mAh Lithium-ion', highlight: true },
  { label: 'Charging Type', value: 'Type-C USB', highlight: false },
  { label: 'Charging Time', value: '2.5 - 3 Hours', highlight: false },
  { label: 'Working Time', value: '15 - 25 Minutes', highlight: true },
  { label: 'Function', value: 'Vacuum + Air Blower (2-in-1)', highlight: true },
  { label: 'Weight', value: 'Lightweight (~300g)', highlight: false },
  { label: 'Noise Level', value: '≤ 70dB (Quiet Operation)', highlight: false },
  { label: 'Usage', value: 'Car · Laptop · Keyboard · Camera · Home', highlight: true },
  { label: 'Attachments Included', value: 'Long Nozzle, Brush Head, Blowing Head, HEPA Filter', highlight: false },
  { label: 'Charging Indicator', value: 'Red = Charging · Green = Fully Charged', highlight: false },
  { label: 'Compatible With', value: 'Laptop, Power Bank, Car Charger, Wall Adapter', highlight: false },
  { label: 'Warranty', value: '6 Months Manufacturer Warranty', highlight: true },
  { label: 'In the Box', value: '1x Vacuum, 1x Long Nozzle, 1x Brush Head, 1x Blowing Head, 1x USB-C Cable, 1x Carry Bag', highlight: false },
];

const Specifications = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="specs" className="section-padding bg-gradient-to-b from-dark-900 to-dark-800">
      <div className="section-container" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 badge bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mb-4">
            <FaTable size={12} />
            <span>Technical Specs</span>
          </div>
          <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            Product <span className="gradient-text">Specifications</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Every detail engineered for maximum performance and reliability.
          </p>
        </motion.div>

        {/* Spec Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="card-glass rounded-3xl overflow-hidden">
            {/* Table header */}
            <div className="bg-gradient-to-r from-sky-500/20 to-blue-500/20 px-6 py-4 border-b border-white/10">
              <h3 className="font-display font-bold text-white text-lg">TurboClean Pro — Complete Specifications</h3>
            </div>

            {/* Table rows */}
            <div className="divide-y divide-white/5">
              {specs.map((spec, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.04 }}
                  className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 px-6 py-4 hover:bg-white/5 transition-colors ${
                    spec.highlight ? 'bg-sky-500/5' : ''
                  }`}
                >
                  <div className="sm:w-1/3 flex items-center gap-2">
                    {spec.highlight && <div className="w-1 h-4 bg-sky-500 rounded-full flex-shrink-0" />}
                    <span className="text-white/60 text-sm font-medium">{spec.label}</span>
                  </div>
                  <div className="sm:w-2/3 sm:pl-4">
                    <span className={`text-sm font-semibold ${spec.highlight ? 'text-white' : 'text-white/80'}`}>
                      {spec.value}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer note */}
            <div className="bg-dark-800/50 px-6 py-4 border-t border-white/10">
              <p className="text-white/40 text-xs">
                * Specifications subject to change without notice. Actual performance may vary based on usage conditions.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Specifications;
