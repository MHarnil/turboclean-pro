// api/create-order.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const GMAIL_USER     = process.env.GMAIL_USER;
  const GMAIL_APP_PASS = process.env.GMAIL_APP_PASS;
  const ITHINK_TOKEN   = process.env.ITHINK_ACCESS_TOKEN;
  const ITHINK_SECRET  = process.env.ITHINK_SECRET_KEY;

  const {
    orderId, customerName, phone, email,
    address, city, state, pincode,
    quantity, totalAmount, orderDate, deliveryDate,
  } = req.body;

  console.log('📦 New order received:', orderId, '| Customer email:', email || 'NOT PROVIDED');

  if (!GMAIL_USER || !GMAIL_APP_PASS) {
    console.error('❌ Gmail credentials missing in environment variables!');
    return res.status(500).json({ success: false, error: 'Email config missing on server' });
  }

  const fullAddress = `${address}, ${city}, ${state} - ${pincode}`;
  const savings     = (1399 - 699) * quantity;

  // ── Nodemailer Gmail Transporter ────────────────────────────────────────
  const transporter = nodemailer.createTransport({
    host:   'smtp.gmail.com',
    port:   465,
    secure: true,
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASS,
    },
  });

  // ── Email 1: SELLER Notification ────────────────────────────────────────
  const sellerHtml = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;background:#0a1628;color:#ffffff;border-radius:16px;overflow:hidden;">
      <div style="background:linear-gradient(135deg,#0ea5e9,#0369a1);padding:24px;text-align:center;">
        <h1 style="margin:0;font-size:22px;">⚡ TurboClean Pro — New Order!</h1>
      </div>
      <div style="padding:24px;">
        <div style="background:#152a52;border-radius:12px;padding:16px;margin-bottom:20px;text-align:center;">
          <p style="margin:0;font-size:11px;color:#7dd3fc;text-transform:uppercase;letter-spacing:1px;">Order ID</p>
          <p style="margin:8px 0 0;font-size:24px;font-weight:bold;color:#38bdf8;">${orderId}</p>
          <p style="margin:4px 0 0;font-size:12px;color:#94a3b8;">${orderDate}</p>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:10px 4px;color:#94a3b8;width:35%;">👤 Name</td><td style="padding:10px 4px;font-weight:bold;border-bottom:1px solid #1e3a5f;">${customerName}</td></tr>
          <tr><td style="padding:10px 4px;color:#94a3b8;">📱 Phone</td><td style="padding:10px 4px;border-bottom:1px solid #1e3a5f;">${phone}</td></tr>
          <tr><td style="padding:10px 4px;color:#94a3b8;">📧 Email</td><td style="padding:10px 4px;border-bottom:1px solid #1e3a5f;">${email || 'Not provided'}</td></tr>
          <tr><td style="padding:10px 4px;color:#94a3b8;">📍 Address</td><td style="padding:10px 4px;border-bottom:1px solid #1e3a5f;">${fullAddress}</td></tr>
          <tr><td style="padding:10px 4px;color:#94a3b8;">📦 Qty</td><td style="padding:10px 4px;border-bottom:1px solid #1e3a5f;">${quantity} unit${quantity > 1 ? 's' : ''}</td></tr>
          <tr><td style="padding:10px 4px;color:#94a3b8;">💰 Amount</td><td style="padding:10px 4px;font-size:20px;font-weight:bold;color:#fbbf24;">₹${totalAmount} (COD)</td></tr>
        </table>
        <div style="margin-top:20px;background:#0f2040;border-radius:10px;padding:14px;text-align:center;">
          <p style="margin:0;font-size:13px;color:#94a3b8;">Expected Delivery</p>
          <p style="margin:6px 0 0;font-weight:bold;color:#38bdf8;">${deliveryDate || '4-5 Business Days'}</p>
        </div>
      </div>
      <div style="padding:14px;text-align:center;background:#050a14;font-size:11px;color:#64748b;">turboclean.ruup.in</div>
    </div>`;

  // ── Email 2: CUSTOMER Confirmation ──────────────────────────────────────
  const customerHtml = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;background:#f8fafc;color:#1e293b;border-radius:16px;overflow:hidden;">
      <div style="background:linear-gradient(135deg,#22c55e,#16a34a);padding:32px;text-align:center;">
        <div style="font-size:56px;margin-bottom:8px;">✅</div>
        <h1 style="margin:0;font-size:26px;color:#ffffff;">Order Confirmed!</h1>
        <p style="margin:8px 0 0;color:#dcfce7;font-size:15px;">Thank you, ${customerName}!</p>
      </div>
      <div style="padding:28px;">
        <div style="background:linear-gradient(135deg,#eff6ff,#dbeafe);border:2px solid #93c5fd;border-radius:14px;padding:20px;margin-bottom:24px;text-align:center;">
          <p style="margin:0;font-size:11px;color:#3b82f6;text-transform:uppercase;letter-spacing:2px;font-weight:bold;">Your Order ID</p>
          <p style="margin:10px 0 0;font-size:30px;font-weight:bold;color:#1d4ed8;letter-spacing:3px;">${orderId}</p>
          <p style="margin:6px 0 0;font-size:12px;color:#64748b;">📸 Screenshot karo — yeh aapka reference number hai</p>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:24px;">
          <tr style="background:#f1f5f9;"><td style="padding:12px;color:#64748b;width:40%;border-radius:8px 0 0 0;">📦 Product</td><td style="padding:12px;font-weight:bold;">TurboClean Pro × ${quantity}</td></tr>
          <tr><td style="padding:12px;color:#64748b;">💰 Amount</td><td style="padding:12px;font-size:20px;font-weight:bold;color:#16a34a;">₹${totalAmount} <span style="font-size:13px;color:#64748b;">(Cash on Delivery)</span></td></tr>
          <tr style="background:#f1f5f9;"><td style="padding:12px;color:#64748b;">🚚 Shipping</td><td style="padding:12px;color:#16a34a;font-weight:bold;">FREE Delivery</td></tr>
          <tr><td style="padding:12px;color:#64748b;">📍 Deliver To</td><td style="padding:12px;">${fullAddress}</td></tr>
          <tr style="background:#f1f5f9;"><td style="padding:12px;color:#64748b;">🗓️ Expected By</td><td style="padding:12px;font-weight:bold;color:#2563eb;">${deliveryDate || '4-5 Business Days'}</td></tr>
        </table>
        <div style="border-left:4px solid #22c55e;padding:16px;background:#f0fdf4;border-radius:0 8px 8px 0;margin-bottom:20px;">
          <p style="margin:0;font-weight:bold;color:#15803d;font-size:14px;">💰 Aapne ₹${savings} bachaye!</p>
          <p style="margin:6px 0 0;font-size:13px;color:#64748b;">MRP ₹${1399 * quantity} ki jagah sirf ₹${totalAmount}</p>
        </div>
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px;">
          <p style="margin:0 0 12px;font-weight:bold;color:#1e293b;font-size:14px;">📋 Aage Kya Hoga:</p>
          <div style="font-size:13px;color:#475569;line-height:2;">
            ✅ Order placed — ho gaya!<br>
            📞 Hum aapko call karenge order confirm karne ke liye<br>
            📦 Product 24 hours mein pack ho jayega<br>
            🚚 2-4 business days mein delivery<br>
            💵 Delivery pe cash dena hoga (COD)
          </div>
        </div>
      </div>
      <div style="padding:20px;text-align:center;background:#f1f5f9;">
        <p style="margin:0;font-size:13px;color:#64748b;">Koi problem? Email karo: <a href="mailto:${GMAIL_USER}" style="color:#2563eb;">${GMAIL_USER}</a></p>
        <p style="margin:8px 0 0;font-size:11px;color:#94a3b8;">TurboClean Pro • turboclean.ruup.in</p>
      </div>
    </div>`;

  // ── Send Seller Email ────────────────────────────────────────────────────
  let sellerSent   = false;
  let customerSent = false;
  let customerError = '';

  try {
    await transporter.sendMail({
      from:    `"TurboClean Pro Orders" <${GMAIL_USER}>`,
      to:      GMAIL_USER,
      subject: `🛒 New Order ${orderId} — ${customerName} | ₹${totalAmount}`,
      html:    sellerHtml,
    });
    sellerSent = true;
    console.log('✅ Seller email sent to:', GMAIL_USER);
  } catch (err) {
    console.error('❌ Seller email failed:', err.message);
  }

  // ── Send Customer Confirmation Email ────────────────────────────────────
  if (email && email.includes('@')) {
    console.log('📧 Attempting customer email to:', email);
    try {
      await transporter.sendMail({
        from:    `"TurboClean Pro" <${GMAIL_USER}>`,
        to:      email,
        subject: `✅ Order Confirmed! ${orderId} | TurboClean Pro`,
        html:    customerHtml,
        // Extra headers to improve deliverability
        headers: {
          'X-Priority': '1',
          'X-Mailer': 'TurboClean Pro',
        },
      });
      customerSent = true;
      console.log('✅ Customer email sent to:', email);
    } catch (err) {
      customerError = err.message;
      console.error('❌ Customer email failed:', err.message);
    }
  } else {
    console.log('⚠️ No valid customer email provided — skipping customer email');
    customerError = 'No email provided';
  }

  // ── iThink Logistics ────────────────────────────────────────────────────
  let awbNumber    = '';
  let iThinkCreated = false;
  let iThinkError  = '';

  console.log('🔑 iThink creds present:', !!ITHINK_TOKEN, !!ITHINK_SECRET);

  if (ITHINK_TOKEN && ITHINK_SECRET) {
    try {
      const iPayload = {
        data: {
          security_token: ITHINK_TOKEN,
          secret_key:     ITHINK_SECRET,
          order:          orderId,
          order_date:     orderDate,
          auto_pickup:    '1',
          payment_type:   'cod',
          total_amount:   String(totalAmount),
          collect_amount: String(totalAmount),
          height: '8', breadth: '10', length: '20', weight: '0.5',
          seller_name: 'TurboClean Pro',
          seller_inv:  orderId,
          shipments: [{
            name:           customerName,
            add:            address,
            city:           city,
            state:          state,
            country:        'India',
            pin:            String(pincode),
            phone:          String(phone),
            order:          orderId,
            payment_type:   'cod',
            collect_amount: String(totalAmount),
            total_amount:   String(totalAmount),
            email:          email || '',
            products_desc:  `TurboClean Pro x${quantity}`,
            cod_amount:     String(totalAmount),
            order_date:     orderDate,
            pieces:         String(quantity),
            weight:         String(0.5 * quantity),
            height: '8', breadth: '10', length: '20',
            seller_name:    'TurboClean Pro',
            seller_inv:     orderId,
            quantity:       String(quantity),
          }],
        },
      };

      console.log('📤 Sending to iThink:', JSON.stringify(iPayload).slice(0, 300));

      const iRes  = await fetch('https://my.ithinklogistics.com/api_v3/order/add.json', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(iPayload),
      });

      const iText = await iRes.text();
      console.log('📥 iThink raw response (status', iRes.status, '):', iText.slice(0, 500));

      const iData = JSON.parse(iText);
      if (iData.status === 'true' || iData.status === true) {
        iThinkCreated = true;
        awbNumber     = iData.data?.awb_number || iData.data?.[0]?.awb_number || '';
        console.log('✅ iThink shipment created! AWB:', awbNumber);
      } else {
        iThinkError = iData.message || iData.error || JSON.stringify(iData);
        console.error('❌ iThink rejected order:', iThinkError);
      }
    } catch (err) {
      iThinkError = err.message;
      console.error('❌ iThink exception:', err.message);
    }
  } else {
    console.warn('⚠️ iThink credentials missing — skipping');
  }

  return res.status(200).json({
    success:       sellerSent,
    sellerSent,
    customerSent,
    customerError,
    iThinkCreated,
    awbNumber,
    message: sellerSent ? 'Order processed!' : 'Email failed',
  });
}
