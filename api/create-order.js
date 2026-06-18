// api/create-order.js
// Vercel Serverless Function — iThink Logistics Order Creation
// Ye file securely iThink API ko call karegi, API keys expose nahi honge

export default async function handler(req, res) {
  // Only POST allowed
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // iThink credentials — Vercel Environment Variables se aayenge
  const ACCESS_TOKEN = process.env.ITHINK_ACCESS_TOKEN;
  const SECRET_KEY   = process.env.ITHINK_SECRET_KEY;
  const WAREHOUSE_ID = process.env.ITHINK_WAREHOUSE_ID || ''; // optional

  if (!ACCESS_TOKEN || !SECRET_KEY) {
    console.error('iThink API credentials missing in environment variables');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const {
    orderId,
    customerName,
    phone,
    email,
    address,
    city,
    state,
    pincode,
    quantity,
    totalAmount,
    orderDate,
  } = req.body;

  // Validate required fields
  if (!orderId || !customerName || !phone || !address || !pincode) {
    return res.status(400).json({ error: 'Missing required order fields' });
  }

  // iThink API V3 payload
  const iThinkPayload = {
    data: {
      security_token: ACCESS_TOKEN,
      secret_key: SECRET_KEY,
      order: orderId,
      order_date: orderDate,
      auto_pickup: '1', // Auto pickup request
      payment_type: 'cod', // Cash on Delivery
      total_amount: totalAmount,
      collect_amount: totalAmount, // Amount to collect on delivery
      height: '8',
      breadth: '10',
      length: '20',
      weight: '0.5',         // 500 grams
      seller_gst_tin: '',    // Optional: Add your GST number
      seller_add: '',        // Optional: Your warehouse address
      seller_name: 'TurboClean Pro',
      seller_inv: orderId,
      shipments: [
        {
          name: customerName,
          add: address,
          city: city,
          state: state,
          country: 'India',
          pin: pincode,
          phone: phone,
          alt_phone: '',
          order: orderId,
          payment_type: 'cod',
          collect_amount: totalAmount,
          total_amount: totalAmount,
          email: email || '',
          products_desc: `TurboClean Pro x${quantity}`,
          hsn_code: '',
          cod_amount: totalAmount,
          order_date: orderDate,
          pieces: quantity,
          weight: (0.5 * quantity).toString(),
          height: '8',
          breadth: '10',
          length: '20',
          seller_add: '',
          seller_name: 'TurboClean Pro',
          seller_inv: orderId,
          quantity: quantity.toString(),
        },
      ],
    },
  };

  try {
    const response = await fetch(
      'https://my.ithinklogistics.com/api_v3/order/add.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(iThinkPayload),
      }
    );

    const result = await response.json();

    if (result.status === 'true' || result.status === true) {
      // Success — return AWB (tracking number) to frontend
      const awbNumber = result.data?.awb_number || result.data?.[0]?.awb_number || '';
      return res.status(200).json({
        success: true,
        awbNumber,
        message: 'Shipment created successfully on iThink',
        raw: result,
      });
    } else {
      // iThink returned error
      console.error('iThink API error:', result);
      return res.status(200).json({
        success: false,
        message: result.message || 'iThink order creation failed',
        raw: result,
      });
    }
  } catch (err) {
    console.error('iThink API call failed:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to connect to iThink Logistics API',
    });
  }
}
