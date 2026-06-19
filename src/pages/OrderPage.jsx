import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMinus, FiPlus, FiCheckCircle, FiAlertCircle,
  FiLoader, FiArrowLeft, FiShield, FiTruck, FiPhone,
  FiCopy, FiShare2,
} from 'react-icons/fi';
import {
  FaStar, FaShieldAlt, FaTruck, FaPhone, FaLock,
  FaBolt, FaWind, FaBatteryFull, FaTools, FaWhatsapp,
} from 'react-icons/fa';
import { MdVerified, MdEmail } from 'react-icons/md';

// Product images — all 7
import productImg  from '../assets/product1.jpg';
import productImg2 from '../assets/product2.jpg';
import productImg3 from '../assets/product3.jpg';
import productImg4 from '../assets/product4.jpg';
import productImg5 from '../assets/product5.jpg';
import imgBattery  from '../assets/img-battery.jpg';
import imgFilter   from '../assets/img-filter.jpg';
import imgCompare  from '../assets/img-comparison.jpg';
import imgBlower   from '../assets/img-blower.jpg';
import imgSize     from '../assets/img-features.jpg';


// Generate unique order number e.g. TCP-230618-4821
const genOrderId = () => {
  const d = new Date();
  const date = `${String(d.getDate()).padStart(2,'0')}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getFullYear()).slice(2)}`;
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `TCP-${date}-${rand}`;
};

const PRICE = 699;
const MRP   = 1399;

const indianStates = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh',
  'Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka',
  'Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram',
  'Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu',
  'Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal',
  'Delhi','Jammu and Kashmir','Ladakh','Puducherry','Chandigarh',
  'Dadra and Nagar Haveli','Daman and Diu','Lakshadweep',
  'Andaman and Nicobar Islands',
];

const init = {
  fullName:'', phone:'', altPhone:'', email:'',
  address:'', city:'', state:'', pincode:'',
};

const OrderPage = () => {
  const navigate   = useNavigate();
  const [qty, setQty]       = useState(1);
  const [form, setForm]     = useState(init);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle|loading|success|error
  const [activeImg, setActiveImg] = useState(0);
  const [orderData, setOrderData] = useState(null); // saved after success
  const [copied, setCopied]       = useState(false);

  const total   = qty * PRICE;
  const savings = qty * (MRP - PRICE);

  const change = (e) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }));
  };

  const validate = () => {
    const err = {};
    if (!form.fullName.trim())             err.fullName = 'Full name is required';
    if (!/^[6-9]\d{9}$/.test(form.phone)) err.phone    = 'Enter valid 10-digit mobile number';
    if (form.altPhone && !/^[6-9]\d{9}$/.test(form.altPhone)) err.altPhone = 'Enter valid alternate number';
    if (!form.email || !form.email.trim()) err.email    = 'Email required — we\'ll send your order confirmation here';
    else if (!/\S+@\S+\.\S+/.test(form.email)) err.email = 'Enter valid email address';
    if (!form.address.trim())              err.address  = 'Complete address is required';
    if (!form.city.trim())                 err.city     = 'City is required';
    if (!form.state)                       err.state    = 'Please select your state';
    if (!/^\d{6}$/.test(form.pincode))     err.pincode  = 'Enter valid 6-digit pincode';
    return err;
  };

  const submit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (Object.keys(err).length) {
      setErrors(err);
      setTimeout(() => {
        document.querySelector('[data-err]')?.scrollIntoView({ behavior:'smooth', block:'center' });
      }, 50);
      return;
    }
    setStatus('loading');

    const orderId     = genOrderId();
    const orderDate   = new Date().toLocaleString('en-IN', { timeZone:'Asia/Kolkata' });
    const delivDate   = new Date();
    delivDate.setDate(delivDate.getDate() + 4);
    const deliveryStr = delivDate.toLocaleDateString('en-IN', { weekday:'long', day:'numeric', month:'long', year:'numeric', timeZone:'Asia/Kolkata' });

    let awbNumber    = '';
    let iThinkCreated = false;

    try {
      // Single API call — server handles emails + iThink
      const response = await fetch('/api/create-order', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          customerName: form.fullName,
          phone:        form.phone,
          email:        form.email,
          address:      form.address,
          city:         form.city,
          state:        form.state,
          pincode:      form.pincode,
          quantity:     qty,
          totalAmount:  total,
          orderDate,
          deliveryDate: deliveryStr,
        }),
      });

      const result = await response.json();
      awbNumber    = result.awbNumber    || '';
      iThinkCreated = result.iThinkCreated || false;

      setOrderData({
        orderId, orderDate, deliveryStr,
        fullAddress: `${form.address}, ${form.city}, ${form.state} - ${form.pincode}`,
        awbNumber, iThinkCreated,
        name:  form.fullName, phone: form.phone,
        email: form.email,   qty,   total,
        city:  form.city, state: form.state, pincode: form.pincode,
      });
      setStatus('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setStatus('error');
    }
  };


  const copyOrderId = () => {
    if (!orderData) return;
    navigator.clipboard.writeText(orderData.orderId).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // WhatsApp message to customer confirming their order
  const openWhatsApp = () => {
    if (!orderData) return;
    const msg = encodeURIComponent(
      `✅ *TurboClean Pro Order Confirmed!*\n\n` +
      `Order ID: *${orderData.orderId}*\n` +
      `Product: TurboClean Pro (${orderData.qty} unit${orderData.qty>1?'s':''})\n` +
      `Amount: *₹${orderData.total}* (Cash on Delivery)\n` +
      `Delivery to: ${orderData.city}, ${orderData.state}\n` +
      `Expected by: *${orderData.deliveryStr}*\n\n` +
      `Thank you for ordering! 🙏 — TurboClean Pro Team`
    );
    window.open(`https://wa.me/91${orderData.phone}?text=${msg}`, '_blank');
  };

  const field = (name) =>
    `w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/30 focus:outline-none focus:bg-white/10 transition-all duration-200 text-sm ${
      errors[name]
        ? 'border-red-500 bg-red-500/5 focus:border-red-400'
        : 'border-white/15 focus:border-sky-500'
    }`;

  // Gallery: Main product first, then feature images
  const imgs = [
    productImg,   // Main product + all attachments
    productImg2,  // Multi-use: Car, Travel, Office, Home
    productImg3,  // Quick charging + Type-C USB
    imgBattery,   // 2000mAh battery specs
    imgFilter,    // Washable filter
    imgCompare,   // Vacuum vs Blower comparison
    imgBlower,    // In-car usage
    productImg4,  // Package contents
    imgSize,      // Size specs
    productImg5,  // Clean side shot
  ];

  /* ── SUCCESS PAGE ─────────────────────────────────────────────────────── */
  if (status === 'success' && orderData) {
    return (
      <div className="min-h-screen bg-dark-900 font-sans">
        {/* Top bar */}
        <div className="bg-dark-800/95 backdrop-blur-xl border-b border-white/10 h-14 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-sky-400 to-blue-600 rounded-lg flex items-center justify-center">
              <FaBolt className="text-white text-xs" />
            </div>
            <span className="font-display font-bold text-white">
              Turbo<span className="text-sky-400">Clean</span> Pro
            </span>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-10">
          <motion.div
            initial={{ opacity:0, y:30 }}
            animate={{ opacity:1, y:0 }}
            transition={{ type:'spring', stiffness:180, damping:22 }}
            className="space-y-5"
          >
            {/* ── Hero success block ── */}
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-5">
                <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
                <div className="relative w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(34,197,94,0.5)]">
                  <FiCheckCircle size={44} className="text-white" />
                </div>
              </div>
              <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.2}}>
                <h1 className="font-display font-black text-3xl md:text-4xl text-white mb-1">Order Confirmed! 🎉</h1>
                <p className="text-green-400 font-semibold text-lg">Thank you, {orderData.name}!</p>
              </motion.div>
            </div>

            {/* ── Order ID card ── */}
            <motion.div
              initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} transition={{delay:0.25}}
              className="bg-gradient-to-r from-sky-500/15 to-blue-500/10 border border-sky-500/30 rounded-3xl p-5"
            >
              <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-2 text-center">Your Order ID</p>
              <div className="flex items-center justify-center gap-3">
                <span className="font-display font-black text-2xl md:text-3xl text-sky-300 tracking-wider">
                  {orderData.orderId}
                </span>
                <button
                  onClick={copyOrderId}
                  className="flex items-center gap-1 text-xs bg-sky-500/20 hover:bg-sky-500/30 text-sky-400 px-3 py-1.5 rounded-lg transition-colors"
                >
                  {copied ? '✓ Copied!' : <><FiCopy size={12}/> Copy</>}
                </button>
              </div>
              <p className="text-white/40 text-xs text-center mt-2">📸 Screenshot karo — ye aapka order reference hai</p>

              {/* iThink status */}
              <div className="mt-3 pt-3 border-t border-white/10">
                {orderData.iThinkCreated ? (
                  <div className="flex items-center justify-center gap-2 text-green-400 text-xs font-semibold">
                    <span>✅</span>
                    <span>Shipment auto-created on iThink Logistics!</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 text-white/30 text-xs">
                    <span>📦</span>
                    <span>Shipment processing — will appear in iThink shortly</span>
                  </div>
                )}
                {orderData.awbNumber && (
                  <p className="text-center mt-1.5 text-xs">
                    <span className="text-white/40">AWB / Tracking: </span>
                    <span className="text-yellow-400 font-bold font-mono">{orderData.awbNumber}</span>
                  </p>
                )}
              </div>
            </motion.div>

            {/* ── Delivery timeline ── */}
            <motion.div
              initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.3}}
              className="card-glass rounded-3xl p-5"
            >
              <h3 className="font-display font-bold text-white mb-4 text-base">📦 Delivery Timeline</h3>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gradient-to-b from-green-500 via-sky-500 to-white/10" />
                {[
                  { icon:'✅', label:'Order Placed',       sub: orderData.orderDate,        done: true  },
                  { icon:'📞', label:'Order Confirmed',    sub:'We will call you shortly',   done: false },
                  { icon:'📦', label:'Packed & Dispatched',sub:'Within 24 hours',            done: false },
                  { icon:'🚚', label:'Out for Delivery',   sub:'2-4 business days',          done: false },
                  { icon:'🏠', label:'Delivered to You',   sub: orderData.deliveryStr,       done: false },
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-4 mb-4 last:mb-0 pl-10 relative">
                    <div className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center text-sm z-10 ${
                      step.done
                        ? 'bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.5)]'
                        : i === 1 ? 'bg-sky-600' : 'bg-white/10'
                    }`}>
                      {step.icon}
                    </div>
                    <div>
                      <p className={`font-semibold text-sm ${step.done ? 'text-green-400' : i===1 ? 'text-sky-300' : 'text-white/50'}`}>
                        {step.label}
                      </p>
                      <p className="text-white/30 text-xs mt-0.5">{step.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── Order details ── */}
            <motion.div
              initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.35}}
              className="card-glass rounded-3xl p-5"
            >
              <h3 className="font-display font-bold text-white mb-4 text-base">🧾 Order Details</h3>
              <div className="space-y-3">
                {[
                  ['Order ID',      orderData.orderId],
                  ['Product',       `TurboClean Pro × ${orderData.qty} unit${orderData.qty>1?'s':''}`],
                  ['Total Amount',  `₹${orderData.total} (Cash on Delivery)`],
                  ['Delivery',      'FREE Shipping'],
                  ['Deliver To',    orderData.fullAddress],
                  ['Expected By',   orderData.deliveryStr],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-3 text-sm border-b border-white/5 pb-3 last:border-0 last:pb-0">
                    <span className="text-white/40 flex-shrink-0 w-28">{k}</span>
                    <span className="text-white font-medium">{v}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── Confirmation notices ── */}
            <motion.div
              initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.4}}
              className="space-y-3"
            >
              {/* Email notice */}
              {orderData.email && (
                <div className="flex items-start gap-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4">
                  <MdEmail className="text-blue-400 flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="text-blue-300 font-semibold text-sm">Confirmation Email Sent!</p>
                    <p className="text-white/50 text-xs mt-0.5">
                      Order confirmation sent to <span className="text-white">{orderData.email}</span><br/>
                      (Spam folder bhi check karo agar nahi mila)
                    </p>
                  </div>
                </div>
              )}

              {/* Phone call notice */}
              <div className="flex items-start gap-3 bg-green-500/10 border border-green-500/20 rounded-2xl p-4">
                <FaPhone className="text-green-400 flex-shrink-0 mt-0.5" size={16} />
                <div>
                  <p className="text-green-300 font-semibold text-sm">Call Coming Soon!</p>
                  <p className="text-white/50 text-xs mt-0.5">
                    Hum jald hi <span className="text-white">{orderData.phone}</span> pe call karenge order confirm karne ke liye.
                  </p>
                </div>
              </div>

              {/* Screenshot tip */}
              <div className="flex items-start gap-3 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4">
                <span className="text-xl flex-shrink-0">📸</span>
                <div>
                  <p className="text-yellow-300 font-semibold text-sm">Screenshot Lo!</p>
                  <p className="text-white/50 text-xs mt-0.5">
                    Is page ka screenshot lo aur order ID save karo — future reference ke liye zaruri hai.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ── Action buttons ── */}
            <motion.div
              initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.45}}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {/* WhatsApp share */}
              <button
                onClick={openWhatsApp}
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20c45e] text-white font-bold py-4 rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-[0_4px_20px_rgba(37,211,102,0.35)]"
              >
                <FaWhatsapp size={22} />
                Save on WhatsApp
              </button>

              {/* Back home */}
              <button
                onClick={() => navigate('/')}
                className="btn-primary py-4 rounded-2xl"
              >
                ← Back to Home
              </button>
            </motion.div>

            {/* Support line */}
            <p className="text-center text-white/30 text-xs">
              Help chahiye? Email karo —{' '}
              <a href="mailto:starlight6114@gmail.com" className="text-sky-400 hover:underline">starlight6114@gmail.com</a>
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  /* ── MAIN ORDER PAGE ──────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-dark-900 font-sans">

      {/* ── TOP HEADER BAR ─────────────────────────────────────────────── */}
      <header className="bg-dark-800/95 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          {/* Back button */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
          >
            <FiArrowLeft size={18} />
            <span className="hidden sm:inline">Back to Product</span>
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-sky-400 to-blue-600 rounded-lg flex items-center justify-center">
              <FaBolt className="text-white text-xs" />
            </div>
            <span className="font-display font-bold text-white text-base">
              Turbo<span className="text-sky-400">Clean</span> Pro
            </span>
          </div>

          {/* Secure badge */}
          <div className="flex items-center gap-1.5 text-green-400 text-xs font-medium">
            <FiShield size={14} />
            <span className="hidden sm:inline">Secure Checkout</span>
          </div>
        </div>

        {/* Step indicator */}
        <div className="bg-dark-900/60 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center gap-2 text-xs text-white/40 overflow-x-auto no-scrollbar whitespace-nowrap">
            <span className="text-sky-400 font-medium">Home</span>
            <span>›</span>
            <span className="text-sky-400 font-medium">Product</span>
            <span>›</span>
            <span className="text-white font-semibold">Place Order</span>
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT ───────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-[1fr_480px] gap-8 items-start">

          {/* ═══════════════════════════════════════════════════════════════
              LEFT — PRODUCT SUMMARY
          ═══════════════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity:0, x:-20 }}
            animate={{ opacity:1, x:0 }}
            transition={{ duration:0.5 }}
            className="space-y-5"
          >
            {/* Product Card */}
            <div className="card-glass rounded-3xl overflow-hidden">
              {/* Image viewer */}
              <div className="relative bg-gradient-to-br from-dark-800 to-dark-700 p-4 sm:p-8">
                <motion.img
                  key={activeImg}
                  src={imgs[activeImg]}
                  alt="TurboClean Pro"
                  initial={{ opacity:0, scale:0.96 }}
                  animate={{ opacity:1, scale:1 }}
                  transition={{ duration:0.3 }}
                  className="w-full max-h-72 sm:max-h-96 object-contain mx-auto"
                  style={{ filter:'drop-shadow(0 8px 32px rgba(14,165,233,0.25))' }}
                />
                {/* Badges on image */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="badge bg-red-500 text-white text-xs px-2.5 py-1 rounded-lg font-bold shadow">50% OFF</span>
                  <span className="badge bg-green-500 text-white text-xs px-2.5 py-1 rounded-lg font-bold shadow">Free Delivery</span>
                </div>
                {/* Thumb nav */}
                <div className="flex gap-2 justify-center mt-4">
                  {imgs.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                        i === activeImg ? 'border-sky-500 scale-105' : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-contain bg-dark-800 p-1" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product details */}
              <div className="p-5 sm:p-6 border-t border-white/10">
                {/* Name & rating */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h1 className="font-display font-black text-xl sm:text-2xl text-white leading-tight">
                      TurboClean Pro
                    </h1>
                    <p className="text-white/50 text-sm mt-0.5">Portable Electric Dust Blower & Vacuum Cleaner</p>
                  </div>
                  <span className="flex-shrink-0 bg-green-600/90 text-white text-xs font-bold px-2.5 py-1.5 rounded-lg">
                    In Stock
                  </span>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_,i) => <FaStar key={i} className="text-yellow-400 text-sm" />)}
                  </div>
                  <span className="text-yellow-400 font-bold text-sm">4.8</span>
                  <span className="text-white/30 text-xs">· 5,000+ Reviews</span>
                  <span className="ml-1 flex items-center gap-0.5 text-green-400 text-xs font-medium">
                    <MdVerified size={14} /> Verified
                  </span>
                </div>

                {/* Price */}
                <div className="bg-gradient-to-r from-yellow-500/10 to-amber-500/5 border border-yellow-500/20 rounded-2xl p-4 mb-4">
                  <div className="flex items-end gap-3">
                    <span className="font-display font-black text-4xl text-yellow-400">₹{PRICE}</span>
                    <div className="mb-1">
                      <span className="text-white/40 line-through text-base block leading-none">₹{MRP}</span>
                      <span className="text-green-400 text-sm font-bold">Save ₹{MRP - PRICE} (50% OFF)</span>
                    </div>
                  </div>
                  <p className="text-white/50 text-xs mt-2 flex items-center gap-1">
                    <FiTruck size={12} /> <span>Free delivery · Estimated 2-5 business days</span>
                  </p>
                </div>

                {/* Key features quick list */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {[
                    { icon:<FaWind className="text-sky-400" />,       text:'1200Pa Suction' },
                    { icon:<FaBolt className="text-yellow-400" />,    text:'Air Blower Mode' },
                    { icon:<FaBatteryFull className="text-green-400" />, text:'2400mAh Battery' },
                    { icon:<FaTools className="text-purple-400" />,   text:'5 Attachments' },
                  ].map((f, i) => (
                    <div key={i} className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2 text-xs text-white/70">
                      {f.icon} {f.text}
                    </div>
                  ))}
                </div>

                {/* What's in the box */}
                <div className="border-t border-white/10 pt-4">
                  <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-2">In The Box</p>
                  <div className="grid grid-cols-2 gap-1 text-xs text-white/60">
                    {['1× TurboClean Pro Vacuum','1× Long Nozzle','1× Brush Head','1× Blowing Head','1× HEPA Filter','1× USB-C Cable + Carry Bag'].map((item,i) => (
                      <span key={i} className="flex items-center gap-1">
                        <span className="text-green-400">✓</span> {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Badges Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon:<FaShieldAlt className="text-green-400" size={20} />, title:'COD Available',   sub:'Pay on delivery' },
                { icon:<FaTruck className="text-sky-400" size={20} />,      title:'Free Shipping',   sub:'Pan India' },
                { icon:<FaStar className="text-yellow-400" size={20} />,    title:'4.8★ Rating',     sub:'5000+ orders' },
                { icon:<FaLock className="text-purple-400" size={20} />,    title:'Secure Order',    sub:'100% safe' },
              ].map((b,i) => (
                <div key={i} className="card-glass rounded-2xl p-3 text-center">
                  <div className="flex justify-center mb-1">{b.icon}</div>
                  <p className="text-white text-xs font-semibold leading-tight">{b.title}</p>
                  <p className="text-white/40 text-xs">{b.sub}</p>
                </div>
              ))}
            </div>

            {/* Customer reviews snippet */}
            <div className="card-glass rounded-3xl p-5">
              <h3 className="font-display font-bold text-white mb-4 flex items-center gap-2 text-base">
                <FaStar className="text-yellow-400" /> Customer Reviews
              </h3>
              <div className="space-y-4">
                {[
                  { name:'Rahul Sharma', city:'Mumbai', text:'Amazing suction power! Cleaned my entire car in 10 minutes. Battery lasted the whole time. 100% worth it at this price!', rating:5 },
                  { name:'Priya Patel',  city:'Ahmedabad', text:'Keyboard looks brand new! The brush attachment is perfect. Fast delivery too. Will definitely recommend!', rating:5 },
                  { name:'Amit Verma',   city:'Delhi', text:'Best gadget I\'ve bought this year. Laptop runs cooler now, gaming setup is spotless. Excellent value!', rating:5 },
                ].map((r,i) => (
                  <div key={i} className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {r.name.split(' ').map(n=>n[0]).join('')}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-white text-sm font-semibold">{r.name}</span>
                          <span className="text-green-400 text-xs flex items-center gap-0.5"><MdVerified size={12}/> Verified</span>
                        </div>
                        <span className="text-white/40 text-xs">{r.city}</span>
                      </div>
                      <div className="ml-auto flex">
                        {[...Array(r.rating)].map((_,j) => <FaStar key={j} className="text-yellow-400 text-xs" />)}
                      </div>
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed">"{r.text}"</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ═══════════════════════════════════════════════════════════════
              RIGHT — ORDER FORM (STICKY)
          ═══════════════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity:0, x:20 }}
            animate={{ opacity:1, x:0 }}
            transition={{ duration:0.5, delay:0.1 }}
            className="lg:sticky lg:top-[5.5rem] space-y-4"
          >
            <form onSubmit={submit} noValidate>

              {/* ── QUANTITY + PRICE BOX ───────────────────────────────── */}
              <div className="card-glass rounded-3xl p-5 mb-4">
                <h2 className="font-display font-bold text-white text-lg mb-4 flex items-center gap-2">
                  🛒 Complete Your Order
                </h2>

                {/* Qty */}
                <div className="mb-4">
                  <label className="text-white/50 text-xs font-semibold uppercase tracking-wider block mb-2">Quantity</label>
                  <div className="flex items-center gap-4 bg-white/5 rounded-xl p-2 w-fit">
                    <button
                      type="button"
                      onClick={() => setQty(q => Math.max(1, q-1))}
                      disabled={qty<=1}
                      className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition disabled:opacity-30 text-white"
                    ><FiMinus /></button>
                    <span className="font-display font-black text-2xl text-white min-w-[2rem] text-center">{qty}</span>
                    <button
                      type="button"
                      onClick={() => setQty(q => Math.min(10, q+1))}
                      disabled={qty>=10}
                      className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition disabled:opacity-30 text-white"
                    ><FiPlus /></button>
                  </div>
                </div>

                {/* Live price calc */}
                <div className="bg-dark-700/50 rounded-2xl p-4 space-y-2 text-sm mb-4">
                  <div className="flex justify-between text-white/50">
                    <span>Price × {qty}</span>
                    <span>₹{PRICE} × {qty} = ₹{total}</span>
                  </div>
                  <div className="flex justify-between text-white/50">
                    <span>You save</span>
                    <span className="text-green-400 font-medium">-₹{savings}</span>
                  </div>
                  <div className="flex justify-between text-white/50">
                    <span>Delivery</span>
                    <span className="text-green-400 font-medium">FREE</span>
                  </div>
                  <div className="border-t border-white/10 pt-2 flex justify-between items-center">
                    <span className="font-bold text-white">Total</span>
                    <span className="font-display font-black text-2xl text-yellow-400">₹{total}</span>
                  </div>
                </div>

                {/* Payment mode */}
                <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3 mb-1">
                  <FiShield className="text-green-400 flex-shrink-0" size={18} />
                  <div>
                    <p className="text-green-400 text-sm font-semibold">Cash on Delivery Available</p>
                    <p className="text-white/40 text-xs">Pay when product arrives at your door</p>
                  </div>
                </div>
              </div>

              {/* ── PERSONAL INFO ──────────────────────────────────────── */}
              <div className="card-glass rounded-3xl p-5 mb-4">
                <h3 className="font-display font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 bg-sky-500 rounded-full text-xs flex items-center justify-center font-black">1</span>
                  Personal Information
                </h3>
                <div className="space-y-3">

                  <div data-err={errors.fullName||undefined}>
                    <label className="block text-white/50 text-xs font-medium mb-1">Full Name *</label>
                    <input type="text" name="fullName" value={form.fullName} onChange={change}
                      placeholder="e.g. Rahul Sharma" className={field('fullName')} />
                    {errors.fullName && <p className="text-red-400 text-xs mt-1">⚠ {errors.fullName}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div data-err={errors.phone||undefined}>
                      <label className="block text-white/50 text-xs font-medium mb-1">Phone *</label>
                      <input type="tel" name="phone" value={form.phone} onChange={change}
                        placeholder="9876543210" maxLength={10} className={field('phone')} />
                      {errors.phone && <p className="text-red-400 text-xs mt-1">⚠ {errors.phone}</p>}
                    </div>
                    <div data-err={errors.altPhone||undefined}>
                      <label className="block text-white/50 text-xs font-medium mb-1">Alt Phone</label>
                      <input type="tel" name="altPhone" value={form.altPhone} onChange={change}
                        placeholder="Optional" maxLength={10} className={field('altPhone')} />
                      {errors.altPhone && <p className="text-red-400 text-xs mt-1">⚠ {errors.altPhone}</p>}
                    </div>
                  </div>

                  <div data-err={errors.email||undefined}>
                    <label className="block text-white/50 text-xs font-medium mb-1">
                      Email Address *
                      <span className="ml-2 text-sky-400 font-normal">(Order confirmation yahan aayegi)</span>
                    </label>
                    <input type="email" name="email" value={form.email} onChange={change}
                      placeholder="rahul@gmail.com" className={field('email')} />
                    {errors.email && <p className="text-red-400 text-xs mt-1">⚠ {errors.email}</p>}
                  </div>
                </div>
              </div>

              {/* ── DELIVERY ADDRESS ───────────────────────────────────── */}
              <div className="card-glass rounded-3xl p-5 mb-4">
                <h3 className="font-display font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 bg-sky-500 rounded-full text-xs flex items-center justify-center font-black">2</span>
                  Delivery Address
                </h3>
                <div className="space-y-3">

                  <div data-err={errors.address||undefined}>
                    <label className="block text-white/50 text-xs font-medium mb-1">Complete Address *</label>
                    <textarea name="address" value={form.address} onChange={change}
                      placeholder="House No., Street, Landmark, Area" rows={2}
                      className={`${field('address')} resize-none`} />
                    {errors.address && <p className="text-red-400 text-xs mt-1">⚠ {errors.address}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div data-err={errors.city||undefined}>
                      <label className="block text-white/50 text-xs font-medium mb-1">City *</label>
                      <input type="text" name="city" value={form.city} onChange={change}
                        placeholder="Mumbai" className={field('city')} />
                      {errors.city && <p className="text-red-400 text-xs mt-1">⚠ {errors.city}</p>}
                    </div>
                    <div data-err={errors.pincode||undefined}>
                      <label className="block text-white/50 text-xs font-medium mb-1">Pincode *</label>
                      <input type="text" name="pincode" value={form.pincode} onChange={change}
                        placeholder="400001" maxLength={6} className={field('pincode')} />
                      {errors.pincode && <p className="text-red-400 text-xs mt-1">⚠ {errors.pincode}</p>}
                    </div>
                  </div>

                  <div data-err={errors.state||undefined}>
                    <label className="block text-white/50 text-xs font-medium mb-1">State *</label>
                    <select name="state" value={form.state} onChange={change}
                      className={`${field('state')} custom-select`}>
                      <option value="" className="bg-dark-800">Select State</option>
                      {indianStates.map(s => (
                        <option key={s} value={s} className="bg-dark-800">{s}</option>
                      ))}
                    </select>
                    {errors.state && <p className="text-red-400 text-xs mt-1">⚠ {errors.state}</p>}
                  </div>
                </div>
              </div>

              {/* ── PLACE ORDER BUTTON ─────────────────────────────────── */}
              <button
                type="submit"
                id="place-order-btn"
                disabled={status==='loading'}
                className="w-full btn-gold py-5 text-base rounded-2xl disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_8px_32px_rgba(251,191,36,0.3)] hover:shadow-[0_8px_40px_rgba(251,191,36,0.5)]"
              >
                {status==='loading'
                  ? <span className="flex items-center gap-2 justify-center"><FiLoader className="animate-spin" size={20}/> Placing Order...</span>
                  : `🛒 Place Order — ₹${total} (COD)`
                }
              </button>

              {status==='error' && (
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-sm mt-3">
                  <FiAlertCircle /><span>Something went wrong. Please try again or contact us.</span>
                </div>
              )}

              {/* Mini trust strip */}
              <div className="flex items-center justify-center gap-4 mt-3 text-white/30 text-xs">
                <span className="flex items-center gap-1"><FiShield size={11}/> Safe & Secure</span>
                <span>·</span>
                <span className="flex items-center gap-1"><FaTruck size={11}/> Free Delivery</span>
                <span>·</span>
                <span className="flex items-center gap-1"><FiPhone size={11}/> 24/7 Support</span>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
