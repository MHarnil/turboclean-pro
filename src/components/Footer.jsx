import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBolt, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const navigate = useNavigate();
  const scrollToOrder = () => navigate('/order');

  const currentYear = new Date().getFullYear();

  const policyLinks = [
    { label: 'Privacy Policy', href: '#privacy' },
    { label: 'Terms & Conditions', href: '#terms' },
    { label: 'Shipping Policy', href: '#shipping' },
    { label: 'Refund Policy', href: '#refund' },
  ];

  return (
    <footer className="bg-dark-900 border-t border-white/10">
      {/* Main Footer */}
      <div className="section-container py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-sky-400 to-blue-600 rounded-lg flex items-center justify-center shadow-glow">
                <FaBolt className="text-white" />
              </div>
              <span className="font-display font-bold text-xl text-white">
                Turbo<span className="gradient-text">Clean</span> Pro
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-5 max-w-sm">
              India's #1 portable electric dust blower and mini vacuum cleaner. Trusted by 5000+ customers across India for powerful, convenient cleaning.
            </p>
            <button
              onClick={scrollToOrder}
              className="btn-gold text-sm px-6 py-3"
            >
              🛒 Order Now — ₹699
            </button>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-white mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', id: 'hero' },
                { label: 'Features', id: 'features' },
                { label: 'Use Cases', id: 'usecases' },
                { label: 'Reviews', id: 'reviews' },
                { label: 'Specifications', id: 'specs' },
                { label: 'FAQ', id: 'faq' },
                { label: 'Order Now', id: 'order' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-white/50 hover:text-sky-400 transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-bold text-white mb-4 text-sm uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:starlight6114@gmail.com"
                  className="flex items-start gap-3 text-white/50 hover:text-sky-400 transition-colors text-sm group"
                >
                  <FaEnvelope className="mt-0.5 flex-shrink-0 group-hover:text-sky-400" />
                  <span>starlight6114@gmail.com</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/50 text-sm">
                <FaMapMarkerAlt className="mt-0.5 flex-shrink-0" />
                <span>Ships across India<br />2-5 Business Days</span>
              </li>
            </ul>

            {/* Business hours */}
            <div className="mt-6 card-glass rounded-xl p-4">
              <p className="text-xs text-white/40 font-medium uppercase tracking-wider mb-2">Support Hours</p>
              <p className="text-white/60 text-xs">Mon - Sat: 9:00 AM - 7:00 PM</p>
              <p className="text-white/60 text-xs">Sun: 10:00 AM - 4:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Policy Section */}
      <div className="border-t border-white/10 py-6">
        <div className="section-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-xs text-center md:text-left">
              © {currentYear} TurboClean Pro. All rights reserved. Made with ❤️ in India.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              {policyLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-white/30 hover:text-white/60 transition-colors text-xs"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-dark-800/50 py-3">
        <div className="section-container">
          <p className="text-white/20 text-xs text-center">
            This website uses cookies for analytics and personalization. By continuing, you agree to our cookie policy.
            TurboClean Pro is not affiliated with any third-party brands mentioned on this page.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
