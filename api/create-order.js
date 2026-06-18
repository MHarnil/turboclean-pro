// api/create-order.js
// Vercel Serverless Function
// 1. iThink Logistics pe shipment create karta hai
// 2. Seller ko Gmail se order email bhejta hai
// 3. Customer ko confirmation email bhejta hai

import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // ── Credentials from Vercel Environment Variables ──────────────────────
  const GMAIL_USER       = process.env.GMAIL_USER;        // starlight6114@gmail.com
  const GMAIL_APP_PASS   = process.env.GMAIL_APP_PASS;    // 16-digit app password
  const ITHINK_TOKEN     = process.env.ITHINK_ACCESS_TOKEN;
  const ITHINK_SECRET    = process.env.ITHINK_SECRET_KEY;
  // ────────────────────────────────────────────────────────────────────────

  const {
    orderId, customerName, phone, email,
    address, city, state, pincode,
    quantity, totalAmount, orderDate, deliveryDate,
  } = req.body;

  // ── Gmail Transporter ───────────────────────────────────────────────────
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASS,
    },
  });

  const fullAddress = `${address}, ${city}, ${state} - ${pincode}`;
  const savings     = (1399 - 699) * quantity;

  // ── Email 1: Seller Notification ────────────────────────────────────────
  const sellerMail = {
    from: `"TurboClean Pro Orders" <${GMAIL_USER}>`,
    to: GMAIL_USER,
    subject: `🛒 New Order ${orderId} — ${customerName} | ₹${totalAmount}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;background:#0a1628;color:#ffffff;border-radius:16px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#0ea5e9,#0369a1);padding:24px;text-align:center;">
          <h1 style="margin:0;font-size:24px;">⚡ TurboClean Pro</h1>
          <p style="margin:8px 0 0;opacity:0.85;">New Order Received!</p>
        </div>
        <div style="padding:28px;">
          <div style="background:#152a52;border-radius:12px;padding:16px;margin-bottom:16px;">
            <p style="margin:0;font-size:12px;color:#7dd3fc;text-transform:uppercase;letter-spacing:1px;">Order ID</p>
            <p style="margin:6px 0 0;font-size:22px;font-weight:bold;color:#38bdf8;">${orderId}</p>
            <p style="margin:4px 0 0;font-size:12px;color:#94a3b8;">${orderDate}</p>
          </div>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr style="border-bottom:1px solid #1e3a5f;">
              <td style="padding:10px 4px;color:#94a3b8;width:40%;">👤 Customer</td>
              <td style="padding:10px 4px;font-weight:bold;">${customerName}</td>
            </tr>
            <tr style="border-bottom:1px solid #1e3a5f;">
              <td style="padding:10px 4px;color:#94a3b8;">📱 Phone</td>
              <td style="padding:10px 4px;">${phone}</td>
            </tr>
            <tr style="border-bottom:1px solid #1e3a5f;">
              <td style="padding:10px 4px;color:#94a3b8;">📧 Email</td>
              <td style="padding:10px 4px;">${email || 'Not provided'}</td>
            </tr>
            <tr style="border-bottom:1px solid #1e3a5f;">
              <td style="padding:10px 4px;color:#94a3b8;">📍 Address</td>
              <td style="padding:10px 4px;">${fullAddress}</td>
            </tr>
            <tr style="border-bottom:1px solid #1e3a5f;">
              <td style="padding:10px 4px;color:#94a3b8;">📦 Quantity</td>
              <td style="padding:10px 4px;">${quantity} unit${quantity > 1 ? 's' : ''}</td>
            </tr>
            <tr style="border-bottom:1px solid #1e3a5f;">
              <td style="padding:10px 4px;color:#94a3b8;">💰 Amount</td>
              <td style="padding:10px 4px;font-size:18px;font-weight:bold;color:#fbbf24;">₹${totalAmount}</td>
            </tr>
            <tr>
              <td style="padding:10px 4px;color:#94a3b8;">🚀 Delivery</td>
              <td style="padding:10px 4px;color:#34d399;">Cash on Delivery (COD)</td>
            </tr>
          </table>
          <div style="background:#0f2040;border:1px solid #1e3a5f;border-radius:10px;padding:14px;margin-top:20px;text-align:center;">
            <p style="margin:0;font-size:13px;color:#94a3b8;">Expected Delivery</p>
            <p style="margin:6px 0 0;font-weight:bold;color:#38bdf8;">${deliveryDate || '4-5 Business Days'}</p>
          </div>
        </div>
        <div style="padding:16px;text-align:center;background:#050a14;font-size:12px;color:#64748b;">
          TurboClean Pro • turboclean.ruup.in
        </div>
      </div>
    `,
  };

  // ── Email 2: Customer Confirmation ──────────────────────────────────────
  const customerMail = email ? {
    from: `"TurboClean Pro" <${GMAIL_USER}>`,
    to: email,
    subject: `✅ Order Confirmed! ${orderId} | TurboClean Pro`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;background:#0a1628;color:#ffffff;border-radius:16px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#22c55e,#16a34a);padding:28px;text-align:center;">
          <div style="font-size:52px;margin-bottom:8px;">✅</div>
          <h1 style="margin:0;font-size:26px;">Order Confirmed!</h1>
          <p style="margin:8px 0 0;opacity:0.9;font-size:15px;">Thank you, ${customerName}! Your order is placed.</p>
        </div>
        <div style="padding:28px;">
          <div style="background:linear-gradient(135deg,#0ea5e920,#0369a120);border:1px solid #0ea5e940;border-radius:12px;padding:20px;margin-bottom:20px;text-align:center;">
            <p style="margin:0;font-size:12px;color:#7dd3fc;text-transform:uppercase;letter-spacing:1px;">Your Order ID</p>
            <p style="margin:8px 0 0;font-size:28px;font-weight:bold;color:#38bdf8;letter-spacing:2px;">${orderId}</p>
            <p style="margin:6px 0 0;font-size:12px;color:#64748b;">📸 Screenshot karo — yeh aapka reference number hai</p>
          </div>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr style="border-bottom:1px solid #1e3a5f;">
              <td style="padding:12px 4px;color:#94a3b8;width:40%;">📦 Product</td>
              <td style="padding:12px 4px;font-weight:bold;">TurboClean Pro × ${quantity}</td>
            </tr>
            <tr style="border-bottom:1px solid #1e3a5f;">
              <td style="padding:12px 4px;color:#94a3b8;">💰 Amount</td>
              <td style="padding:12px 4px;font-size:20px;font-weight:bold;color:#fbbf24;">₹${totalAmount} <span style="font-size:13px;color:#34d399;">(COD)</span></td>
            </tr>
            <tr style="border-bottom:1px solid #1e3a5f;">
              <td style="padding:12px 4px;color:#94a3b8;">🚚 Delivery Free</td>
              <td style="padding:12px 4px;color:#34d399;font-weight:bold;">FREE Shipping</td>
            </tr>
            <tr style="border-bottom:1px solid #1e3a5f;">
              <td style="padding:12px 4px;color:#94a3b8;">📍 Deliver To</td>
              <td style="padding:12px 4px;">${fullAddress}</td>
            </tr>
            <tr>
              <td style="padding:12px 4px;color:#94a3b8;">🗓️ Expected By</td>
              <td style="padding:12px 4px;color:#38bdf8;font-weight:bold;">${deliveryDate || '4-5 Business Days'}</td>
            </tr>
          </table>
          <div style="margin-top:24px;">
            <p style="font-size:13px;font-weight:bold;color:#e2e8f0;margin-bottom:12px;">📦 What Happens Next:</p>
            <div style="display:flex;flex-direction:column;gap:8px;">
              ${['✅ Order Placed — Done!',
                 '📞 Hum aapko call karenge confirm karne ke liye',
                 '📦 Product 24 hours mein pack ho jayega',
                 '🚚 2-4 din mein delivery',
                 '💵 Delivery pe Cash dena hoga (COD)']
                .map(s => `<div style="background:#152a52;border-radius:8px;padding:10px 14px;font-size:13px;">${s}</div>`)
                .join('')}
            </div>
          </div>
          <div style="background:#fbbf2410;border:1px solid #fbbf2430;border-radius:12px;padding:14px;margin-top:20px;text-align:center;">
            <p style="margin:0;font-size:13px;color:#fbbf24;font-weight:bold;">💰 Aapne Bachaye ₹${savings}!</p>
            <p style="margin:6px 0 0;font-size:12px;color:#94a3b8;">MRP ₹${1399 * quantity} ki jagah sirf ₹${totalAmount}</p>
          </div>
        </div>
        <div style="padding:20px;text-align:center;background:#050a14;">
          <p style="margin:0;font-size:13px;color:#94a3b8;">Koi problem? Email karo:</p>
          <a href="mailto:${GMAIL_USER}" style="color:#38bdf8;font-size:13px;">${GMAIL_USER}</a>
          <p style="margin:12px 0 0;font-size:11px;color:#475569;">TurboClean Pro • turboclean.ruup.in</p>
        </div>
      </div>
    `,
  } : null;

  // ── Send Emails ─────────────────────────────────────────────────────────
  const emailResults = await Promise.allSettled([
    transporter.sendMail(sellerMail),
    ...(customerMail ? [transporter.sendMail(customerMail)] : []),
  ]);

  const sellerSent   = emailResults[0]?.status === 'fulfilled';
  const customerSent = customerMail ? emailResults[1]?.status === 'fulfilled' : false;

  // ── iThink Logistics (optional — runs silently) ─────────────────────────
  let awbNumber    = '';
  let iThinkCreated = false;

  if (ITHINK_TOKEN && ITHINK_SECRET) {
    try {
      const iThinkPayload = {
        data: {
          security_token: ITHINK_TOKEN,
          secret_key:     ITHINK_SECRET,
          order:          orderId,
          order_date:     orderDate,
          auto_pickup:    '1',
          payment_type:   'cod',
          total_amount:   totalAmount,
          collect_amount: totalAmount,
          height: '8', breadth: '10', length: '20', weight: '0.5',
          seller_name: 'TurboClean Pro',
          seller_inv:  orderId,
          shipments: [{
            name:           customerName,
            add:            address,
            city:           city,
            state:          state,
            country:        'India',
            pin:            pincode,
            phone:          phone,
            order:          orderId,
            payment_type:   'cod',
            collect_amount: totalAmount,
            total_amount:   totalAmount,
            email:          email || '',
            products_desc:  `TurboClean Pro x${quantity}`,
            cod_amount:     totalAmount,
            order_date:     orderDate,
            pieces:         quantity,
            weight:         (0.5 * quantity).toString(),
            height: '8', breadth: '10', length: '20',
            seller_name: 'TurboClean Pro',
            seller_inv:  orderId,
            quantity:    quantity.toString(),
          }],
        },
      };

      const iRes = await fetch('https://my.ithinklogistics.com/api_v3/order/add.json', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(iThinkPayload),
      });
      const iData = await iRes.json();
      if (iData.status === 'true' || iData.status === true) {
        iThinkCreated = true;
        awbNumber     = iData.data?.awb_number || iData.data?.[0]?.awb_number || '';
      }
    } catch { /* silent */ }
  }

  return res.status(200).json({
    success:      sellerSent,
    sellerSent,
    customerSent,
    iThinkCreated,
    awbNumber,
    message: sellerSent
      ? 'Order processed successfully!'
      : 'Order saved but email delivery failed',
  });
}
