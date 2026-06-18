import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FiMinus, FiPlus, FiCheckCircle, FiAlertCircle, FiLoader } from 'react-icons/fi';
import { FaShieldAlt, FaTruck, FaStar, FaPhone } from 'react-icons/fa';
import CountdownTimer from './CountdownTimer';

const PRICE_PER_UNIT = 699;

// EmailJS Configuration — Replace with your actual IDs
const EMAILJS_SERVICE_ID = 'service_turboclean';
const EMAILJS_TEMPLATE_ID = 'template_order';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Puducherry', 'Chandigarh',
  'Dadra and Nagar Haveli', 'Daman and Diu', 'Lakshadweep', 'Andaman and Nicobar Islands',
];

const initialForm = {
  fullName: '',
  phone: '',
  altPhone: '',
  email: '',
  address: '',
  city: '',
  state: '',
  pincode: '',
};

const OrderSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [quantity, setQuantity] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const totalAmount = quantity * PRICE_PER_UNIT;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!/^[6-9]\d{9}$/.test(form.phone)) newErrors.phone = 'Enter a valid 10-digit mobile number';
    if (form.altPhone && !/^[6-9]\d{9}$/.test(form.altPhone)) newErrors.altPhone = 'Enter a valid alternate number';
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Enter a valid email address';
    if (!form.address.trim()) newErrors.address = 'Address is required';
    if (!form.city.trim()) newErrors.city = 'City is required';
    if (!form.state) newErrors.state = 'Please select your state';
    if (!/^\d{6}$/.test(form.pincode)) newErrors.pincode = 'Enter a valid 6-digit pincode';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Scroll to first error
      const firstError = document.querySelector('[data-error]');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setStatus('loading');

    const templateParams = {
      to_email: 'starlight6114@gmail.com',
      customer_name: form.fullName,
      phone: form.phone,
      alt_phone: form.altPhone || 'Not provided',
      email: form.email || 'Not provided',
      address: `${form.address}, ${form.city}, ${form.state} - ${form.pincode}`,
      quantity: quantity,
      total_amount: `₹${totalAmount}`,
      order_date: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    };

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY);
      setStatus('success');
      setForm(initialForm);
      setQuantity(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
    }
  };

  const fieldClass = (name) =>
    `input-field ${errors[name] ? 'border-red-500 bg-red-500/5' : ''}`;

  return (
    <section id="order" className="section-padding bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="section-container relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 badge bg-green-500/10 border border-green-500/20 text-green-400 mb-4">
            <FaShieldAlt size={12} />
            <span>Secure Order</span>
          </div>
          <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            Order <span className="gradient-text">TurboClean Pro</span> Now
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto mb-6">
            Fill in your details below and we'll deliver right to your doorstep. Cash on Delivery available!
          </p>
          <CountdownTimer />
        </motion.div>

        {/* Success Message */}
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto mb-8 bg-green-500/10 border border-green-500/30 rounded-3xl p-8 text-center"
          >
            <FiCheckCircle size={60} className="text-green-400 mx-auto mb-4" />
            <h3 className="font-display font-black text-2xl text-white mb-2">Order Placed Successfully! 🎉</h3>
            <p className="text-green-300 mb-2">Your TurboClean Pro order has been received.</p>
            <p className="text-white/60 text-sm">We'll call you shortly on your registered number to confirm the order. Expect delivery in 2-5 business days.</p>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-[1fr_360px] gap-8 max-w-5xl mx-auto">
          {/* ORDER FORM */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Personal Info */}
              <div className="card-glass rounded-2xl p-6">
                <h3 className="font-display font-bold text-white text-lg mb-5 flex items-center gap-2">
                  <span className="w-7 h-7 bg-sky-500 rounded-full flex items-center justify-center text-sm font-black">1</span>
                  Personal Information
                </h3>
                <div className="space-y-4">
                  <div data-error={errors.fullName || undefined}>
                    <label className="block text-white/60 text-sm mb-1.5 font-medium">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Sharma"
                      className={fieldClass('fullName')}
                    />
                    {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div data-error={errors.phone || undefined}>
                      <label className="block text-white/60 text-sm mb-1.5 font-medium">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="9876543210"
                        maxLength={10}
                        className={fieldClass('phone')}
                      />
                      {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                    </div>
                    <div data-error={errors.altPhone || undefined}>
                      <label className="block text-white/60 text-sm mb-1.5 font-medium">Alternate Phone</label>
                      <input
                        type="tel"
                        name="altPhone"
                        value={form.altPhone}
                        onChange={handleChange}
                        placeholder="Optional"
                        maxLength={10}
                        className={fieldClass('altPhone')}
                      />
                      {errors.altPhone && <p className="text-red-400 text-xs mt-1">{errors.altPhone}</p>}
                    </div>
                  </div>

                  <div data-error={errors.email || undefined}>
                    <label className="block text-white/60 text-sm mb-1.5 font-medium">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="rahul@gmail.com (Optional)"
                      className={fieldClass('email')}
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="card-glass rounded-2xl p-6">
                <h3 className="font-display font-bold text-white text-lg mb-5 flex items-center gap-2">
                  <span className="w-7 h-7 bg-sky-500 rounded-full flex items-center justify-center text-sm font-black">2</span>
                  Delivery Address
                </h3>
                <div className="space-y-4">
                  <div data-error={errors.address || undefined}>
                    <label className="block text-white/60 text-sm mb-1.5 font-medium">Complete Address *</label>
                    <textarea
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="House No., Street, Landmark, Area"
                      rows={3}
                      className={`${fieldClass('address')} resize-none`}
                    />
                    {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div data-error={errors.city || undefined}>
                      <label className="block text-white/60 text-sm mb-1.5 font-medium">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        placeholder="e.g. Ahmedabad"
                        className={fieldClass('city')}
                      />
                      {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city}</p>}
                    </div>
                    <div data-error={errors.pincode || undefined}>
                      <label className="block text-white/60 text-sm mb-1.5 font-medium">Pincode *</label>
                      <input
                        type="text"
                        name="pincode"
                        value={form.pincode}
                        onChange={handleChange}
                        placeholder="380015"
                        maxLength={6}
                        className={fieldClass('pincode')}
                      />
                      {errors.pincode && <p className="text-red-400 text-xs mt-1">{errors.pincode}</p>}
                    </div>
                  </div>

                  <div data-error={errors.state || undefined}>
                    <label className="block text-white/60 text-sm mb-1.5 font-medium">State *</label>
                    <select
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      className={`${fieldClass('state')} custom-select`}
                    >
                      <option value="" className="bg-dark-800">Select your state</option>
                      {indianStates.map((state) => (
                        <option key={state} value={state} className="bg-dark-800">{state}</option>
                      ))}
                    </select>
                    {errors.state && <p className="text-red-400 text-xs mt-1">{errors.state}</p>}
                  </div>
                </div>
              </div>

              {/* Submit button (mobile) */}
              <button
                type="submit"
                disabled={status === 'loading'}
                id="place-order-btn"
                className="btn-gold w-full text-lg py-5 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <span className="flex items-center gap-2 justify-center">
                    <FiLoader className="animate-spin" size={20} />
                    Placing Your Order...
                  </span>
                ) : (
                  '🛒 Place Order — ₹' + totalAmount + ' (COD)'
                )}
              </button>

              {status === 'error' && (
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-sm">
                  <FiAlertCircle size={18} />
                  <span>Something went wrong. Please try again or contact us directly.</span>
                </div>
              )}
            </form>
          </motion.div>

          {/* ORDER SUMMARY SIDEBAR */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-5"
          >
            {/* Product card */}
            <div className="card-glass rounded-2xl p-5">
              <h3 className="font-display font-bold text-white text-base mb-4 border-b border-white/10 pb-3">
                Order Summary
              </h3>

              {/* Product info */}
              <div className="mb-4">
                <p className="font-semibold text-white text-sm">TurboClean Pro</p>
                <p className="text-white/50 text-xs mt-0.5">Portable Dust Blower & Vacuum Cleaner</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-yellow-400 text-xs font-bold">₹699</span>
                  <span className="text-white/30 line-through text-xs">₹1,399</span>
                  <span className="text-green-400 text-xs">50% OFF</span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-5">
                <p className="text-white/60 text-sm mb-3">Quantity</p>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors disabled:opacity-40"
                    disabled={quantity <= 1}
                  >
                    <FiMinus />
                  </button>
                  <span className="font-display font-black text-2xl text-white min-w-[2rem] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                    className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors disabled:opacity-40"
                    disabled={quantity >= 10}
                  >
                    <FiPlus />
                  </button>
                </div>

                {/* Price breakdown */}
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-white/60">
                    <span>Price × {quantity}</span>
                    <span>₹{PRICE_PER_UNIT} × {quantity}</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Delivery</span>
                    <span className="text-green-400 font-semibold">FREE</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Discount (50% OFF)</span>
                    <span className="text-green-400">-₹{PRICE_PER_UNIT * quantity}</span>
                  </div>
                  <div className="border-t border-white/10 pt-3 flex justify-between items-center">
                    <span className="font-bold text-white">Total Amount</span>
                    <span className="font-display font-black text-2xl text-yellow-400">₹{totalAmount}</span>
                  </div>
                </div>
              </div>

              {/* Trust badges */}
              <div className="space-y-2 border-t border-white/10 pt-4">
                {[
                  { icon: <FaTruck className="text-sky-400" size={14} />, text: 'Free Delivery Pan India' },
                  { icon: <FaShieldAlt className="text-green-400" size={14} />, text: 'Cash on Delivery Available' },
                  { icon: <FaStar className="text-yellow-400" size={14} />, text: '4.8★ Rating · 5000+ Orders' },
                  { icon: <FaPhone className="text-purple-400" size={14} />, text: '24/7 Customer Support' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-white/60">
                    {item.icon}
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What you get */}
            <div className="card-glass rounded-2xl p-5">
              <h4 className="font-bold text-white text-sm mb-3">What's in the box?</h4>
              <ul className="space-y-2 text-xs text-white/60">
                {[
                  '✅ 1x TurboClean Pro Vacuum Cleaner',
                  '✅ 1x Long Nozzle Attachment',
                  '✅ 1x Brush Head Attachment',
                  '✅ 1x Blowing Head Attachment',
                  '✅ 1x HEPA Filter',
                  '✅ 1x Type-C USB Charging Cable',
                  '✅ 1x Carry Bag',
                ].map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OrderSection;
