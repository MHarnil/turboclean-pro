import React, { useState } from 'react';
import { FiX, FiCheckCircle, FiCopy } from 'react-icons/fi';
import productImg from '../assets/product1.jpg';
import phonepeQr from '../assets/phonepe-qr.png';
import ReviewSnippets from './ReviewSnippets';

const genOrderId = () => {
  const d = new Date();
  const date = `${String(d.getDate()).padStart(2,'0')}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getFullYear()).slice(2)}`;
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `TCP-${date}-${rand}`;
};

const init = {
  fullName: '', phone: '', email: '',
  address: '', city: '', state: '', pincode: '',
  landmark: '',
};

const indianStates = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh',
  'Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka',
  'Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram',
  'Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu',
  'Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal',
  'Delhi','Jammu and Kashmir','Ladakh','Puducherry','Chandigarh'
];

const OrderModal = ({ isOpen, onClose, selectedPack, price }) => {
  const [form, setForm] = useState(init);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle|loading|success|error
  const [orderData, setOrderData] = useState(null);
  const [paymentMode, setPaymentMode] = useState('PREPAID'); // 'PREPAID' | 'COD'
  const [utrNumber, setUtrNumber]     = useState('');
  const [upiCopied, setUpiCopied]     = useState(false);

  if (!isOpen) return null;

  const baseTotal       = price;
  const prepaidDiscount = paymentMode === 'PREPAID' ? 60 : 0;
  const total           = Math.max(0, baseTotal - prepaidDiscount);
  const qty             = selectedPack;

  const change = (e) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }));
  };

  const validate = () => {
    const err = {};
    if (!form.fullName.trim()) err.fullName = 'Full name is required';
    if (!/^[6-9]\d{9}$/.test(form.phone)) err.phone = 'Enter valid 10-digit number';
    if (!form.address.trim()) err.address = 'Complete address is required';
    if (!form.landmark.trim()) err.landmark = 'Landmark is required';
    if (!form.city.trim()) err.city = 'City is required';
    if (!/^\d{6}$/.test(form.pincode)) err.pincode = 'Enter 6-digit pincode';
    return err;
  };

  const submit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (Object.keys(err).length) {
      setErrors(err);
      return;
    }
    setStatus('loading');

    const orderId = genOrderId();
    const orderDate = new Date().toLocaleString('en-IN', { timeZone:'Asia/Kolkata' });
    const delivDate = new Date();
    delivDate.setDate(delivDate.getDate() + 4);
    const deliveryStr = delivDate.toLocaleDateString('en-IN', { weekday:'long', day:'numeric', month:'long', year:'numeric', timeZone:'Asia/Kolkata' });

    try {
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          customerName: form.fullName,
          phone: form.phone,
          email: form.email || 'no-email@ruup.in', // User requested to simplify, we can use a dummy if they didn't provide
          address: `${form.address} ${form.landmark}`,
          city: form.city,
          state: form.state || 'Other',
          pincode: form.pincode,
          quantity: qty,
          totalAmount: total,
          orderDate,
          deliveryDate: deliveryStr,
          paymentMode,
          utrNumber,
          discountAmount: prepaidDiscount,
        }),
      });

      const result = await response.json();
      setOrderData({
        orderId, orderDate, deliveryStr,
        awbNumber: result.awbNumber || '',
        name: form.fullName, phone: form.phone,
        total, qty, city: form.city, state: form.state,
        paymentMode, utrNumber,
      });
      setStatus('success');

      // 🎯 Meta Pixel — Purchase event
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'Purchase', {
          value: total,
          currency: 'INR',
          content_name: 'TurboClean Pro',
          content_ids: ['TCP-001'],
          num_items: qty,
        });
      }
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

  if (status === 'success' && orderData) {
    return (
      <div className="modal-overlay">
        <div className="modal-content p-6 text-center">
          <div className="flex justify-end">
            <button onClick={onClose} className="p-2"><FiX size={24} /></button>
          </div>
          <FiCheckCircle size={64} className="text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Order Confirmed! 🎉</h2>
          <p className="text-gray-600 mb-2">Thank you, {orderData.name}!</p>
          <p className="text-sm text-blue-600 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 mb-5">
            📧 Order confirmation <strong>aapke email mein bheja ja raha hai</strong>.<br />
            <span className="text-xs text-gray-500">Agar inbox mein nahi dikh raha to <strong>Spam / Junk</strong> folder check karein.</span>
          </p>
          <div className="bg-gray-50 border rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-gray-500 font-semibold mb-1">Your Order ID</p>
            <div className="flex items-center justify-between">
              <span className="font-bold text-xl text-blue-600">{orderData.orderId}</span>
              <button onClick={copyOrderId} className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded flex items-center gap-1">
                {copied ? 'Copied ✓' : <><FiCopy /> Copy</>}
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-3">Amount to Pay (COD): <span className="font-bold text-gray-800">₹{orderData.total}</span></p>
            <p className="text-sm text-gray-500">Expected Delivery: <span className="font-bold text-gray-800">{orderData.deliveryStr}</span></p>
          </div>
          <button onClick={onClose} className="btn-blue w-full">Continue Shopping</button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-bold text-lg">Enter Your Full Delivery Address</h2>
          <button onClick={onClose}><FiX size={24} className="text-gray-500" /></button>
        </div>

        <div className="p-4 border-b flex items-center gap-4 bg-gray-50">
          <img src={productImg} alt="TurboClean" className="w-16 h-16 object-cover rounded" />
          <div>
            <h3 className="font-bold text-sm text-gray-800">Rechargeable 4-in-1 Compressed Air Duster</h3>
            <p className="text-sm text-gray-600">Pack of {selectedPack} @ ₹{price}</p>
          </div>
        </div>

        <form onSubmit={submit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Enter Your Phone Number <span className="text-red-500">*</span></label>
            <div className="flex">
              <span className="inline-flex items-center px-4 bg-gray-100 border border-r-0 border-gray-300 rounded-l text-gray-500 font-bold">+91</span>
              <input type="tel" name="phone" value={form.phone} onChange={change} className={`input-field rounded-l-none ${errors.phone ? 'border-red-500' : ''}`} placeholder="10-digit number" />
            </div>
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          <div>
            <input type="text" name="fullName" value={form.fullName} onChange={change} className={`input-field ${errors.fullName ? 'border-red-500' : ''}`} placeholder="Full name (First and Last name)" />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <input type="text" name="pincode" value={form.pincode} onChange={change} className={`input-field ${errors.pincode ? 'border-red-500' : ''}`} placeholder="Enter 6 Digit Pincode" />
            {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
          </div>

          <div>
            <input type="text" name="address" value={form.address} onChange={change} className={`input-field ${errors.address ? 'border-red-500' : ''}`} placeholder="House No. / Building Name / Street / Area" />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </div>

          <div>
            <input type="text" name="landmark" value={form.landmark} onChange={change} className={`input-field ${errors.landmark ? 'border-red-500' : ''}`} placeholder="Near- (Landmark / Near by location)" />
            {errors.landmark && <p className="text-red-500 text-xs mt-1">{errors.landmark}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <input type="text" name="city" value={form.city} onChange={change} className={`input-field ${errors.city ? 'border-red-500' : ''}`} placeholder="City" />
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
            </div>
            <div>
              <select name="state" value={form.state} onChange={change} className="input-field">
                <option value="">Select State</option>
                {indianStates.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          
          <div className="mt-4">
             <input type="email" name="email" value={form.email} onChange={change} className="input-field" placeholder="Email (Optional for tracking)" />
          </div>

          {status === 'error' && (
            <div className="bg-red-50 text-red-500 p-3 rounded text-sm">Something went wrong. Please try again.</div>
          )}

          {/* Payment Mode Selector */}
          <div className="border-t pt-4 mt-4 space-y-3">
            <label className="block text-xs font-black text-gray-800 uppercase tracking-wider">Select Payment Method</label>
            <div className="grid grid-cols-2 gap-2">
              <div
                onClick={() => setPaymentMode('PREPAID')}
                className={`p-3 rounded-xl border-2 cursor-pointer transition-all text-left ${
                  paymentMode === 'PREPAID'
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-xs text-gray-900 mb-0.5">
                  <input type="radio" checked={paymentMode === 'PREPAID'} onChange={() => setPaymentMode('PREPAID')} className="accent-emerald-500" />
                  <span>💳 Online / UPI</span>
                </div>
                <span className="text-[10px] bg-emerald-500 text-white font-bold px-1.5 py-0.5 rounded">₹60 OFF</span>
              </div>

              <div
                onClick={() => setPaymentMode('COD')}
                className={`p-3 rounded-xl border-2 cursor-pointer transition-all text-left ${
                  paymentMode === 'COD'
                    ? 'border-amber-500 bg-amber-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-xs text-gray-900 mb-0.5">
                  <input type="radio" checked={paymentMode === 'COD'} onChange={() => setPaymentMode('COD')} className="accent-amber-500" />
                  <span>🚚 Cash on Delivery</span>
                </div>
                <span className="text-[10px] text-gray-500 font-medium">Full Rs. {baseTotal}</span>
              </div>
            </div>

            {paymentMode === 'PREPAID' && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-center space-y-2">
                <p className="text-xs font-bold text-emerald-800">Scan Official PhonePe QR Code (Extra ₹60 OFF):</p>
                <div className="bg-black p-1.5 rounded-xl w-40 sm:w-44 mx-auto border-2 border-purple-500 shadow-md overflow-hidden">
                  <img
                    src={phonepeQr}
                    alt="Official PhonePe Payment QR Code"
                    className="w-full h-auto object-contain rounded-lg"
                  />
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xs font-mono font-bold text-gray-700">starlight6114@okicici</span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText('starlight6114@okicici');
                      setUpiCopied(true);
                      setTimeout(() => setUpiCopied(false), 2000);
                    }}
                    className="text-[10px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded"
                  >
                    {upiCopied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <input
                  type="text"
                  value={utrNumber}
                  onChange={(e) => setUtrNumber(e.target.value)}
                  placeholder="Enter 12-digit UTR / Txn No. (Optional)"
                  maxLength={12}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs"
                />
              </div>
            )}

            <div className="flex justify-between text-gray-900 text-lg font-black pt-2">
              <span>Total</span>
              <span className={paymentMode === 'PREPAID' ? 'text-emerald-600' : 'text-gray-900'}>
                Rs. {total}.00
              </span>
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className={`w-full py-4 text-base font-black rounded-xl text-white transition-all ${
                paymentMode === 'PREPAID' ? 'bg-emerald-600 hover:bg-emerald-700' : 'btn-blue'
              }`}
            >
              {status === 'loading' ? 'PROCESSING...' : `PLACE ORDER - Rs. ${total}.00`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderModal;
