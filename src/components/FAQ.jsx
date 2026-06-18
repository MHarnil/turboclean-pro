import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiChevronDown, FiHelpCircle } from 'react-icons/fi';

const faqs = [
  {
    question: 'How long does the battery last on a single charge?',
    answer: 'The TurboClean Pro features a powerful 2400mAh lithium-ion battery that provides 15-25 minutes of continuous operation on a single full charge. This is more than enough for most cleaning tasks including a full car interior clean or a thorough keyboard and laptop cleaning session.',
  },
  {
    question: 'Is the TurboClean Pro rechargeable? How long does charging take?',
    answer: 'Yes! The TurboClean Pro is fully rechargeable via a standard Type-C USB cable. You can charge it from your laptop, power bank, car charger, or a wall adapter. A complete charge takes approximately 2.5-3 hours. The LED indicator turns red during charging and green when fully charged.',
  },
  {
    question: 'Can it safely clean laptops and electronic devices?',
    answer: 'Absolutely! The TurboClean Pro is specifically designed for safe use on electronic devices. The air blower mode provides a dry, controlled airflow that safely removes dust from laptop vents, keyboard gaps, and ports without any risk of moisture damage. Just ensure the device is switched off before cleaning.',
  },
  {
    question: 'Is Cash on Delivery (COD) available?',
    answer: 'Yes! Cash on Delivery is available across India. You only pay when the product is delivered to your doorstep. No advance payment, no credit card required. We also accept all major payment methods for prepaid orders.',
  },
  {
    question: 'How many attachments are included in the box?',
    answer: 'The TurboClean Pro comes with a complete set of 5 attachments: (1) Long Nozzle — for reaching tight corners and gaps, (2) Brush Head — gentle cleaning for keyboards and surfaces, (3) Blowing Head — for powerful air blowing mode, (4) HEPA Filter — for capturing fine dust particles, and a (5) Carry Bag for storage and travel. Plus a Type-C USB charging cable.',
  },
  {
    question: 'What is the suction power of TurboClean Pro?',
    answer: 'The TurboClean Pro delivers a powerful 1200Pa (Pascal) suction force — significantly stronger than most similarly priced portable vacuums. This suction power is sufficient to pick up fine dust, pet hair, food crumbs, and debris from various surfaces including car seats, keyboards, and upholstery.',
  },
  {
    question: 'What is the return and refund policy?',
    answer: 'We offer a 7-day hassle-free return policy. If you\'re not completely satisfied with the product for any reason, simply contact our customer support team within 7 days of delivery and we will arrange a pickup and full refund. No questions asked.',
  },
  {
    question: 'How long will delivery take?',
    answer: 'We deliver across India within 2-5 business days. Metro cities (Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Kolkata) typically receive orders within 2-3 days. Tier-2 and Tier-3 cities may take 4-5 business days. You\'ll receive a tracking number via SMS after dispatch.',
  },
];

const FAQItem = ({ faq, index, isInView }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={`card-glass rounded-2xl overflow-hidden transition-all duration-300 ${
        isOpen ? 'border-sky-500/40 shadow-glow' : ''
      }`}
    >
      {/* Question */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-white text-sm md:text-base pr-4">{faq.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            isOpen ? 'bg-sky-500 text-white' : 'bg-white/10 text-white/60'
          }`}
        >
          <FiChevronDown size={18} />
        </motion.div>
      </button>

      {/* Answer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 text-white/60 text-sm leading-relaxed border-t border-white/10 pt-4">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="faq" className="section-padding bg-gradient-to-b from-dark-800 to-dark-900">
      <div className="section-container" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 badge bg-sky-500/10 border border-sky-500/20 text-sky-400 mb-4">
            <FiHelpCircle size={14} />
            <span>FAQ</span>
          </div>
          <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Got questions? We've got answers. If you don't find what you're looking for, feel free to contact us.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} isInView={isInView} />
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-white/50 mb-4">Still have questions? We're here to help!</p>
          <a
            href="mailto:starlight6114@gmail.com"
            className="btn-primary inline-flex"
          >
            📧 Contact Support
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
