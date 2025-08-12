const Order = require('../models/Order');
const axios = require('axios');
const qs = require('querystring');

exports.initiatePayment = async (req, res) => {
  try {
    const { productName, amount, customerName, customerEmail, customerPhone } = req.body;

    // Validation
    if (!productName || !amount || !customerName || !customerEmail || !customerPhone) {
      return res.status(400).json({ error: 'All fields are required!' });
    }

    const tran_id = `TXN${Date.now()}`;
    const newOrder = new Order({
      productName,
      amount,
      customerName,
      customerEmail,
      customerPhone,
      transactionId: tran_id
    });

    await newOrder.save();

    const sslczData = {
      store_id: process.env.SSLCOMMERZ_STORE_ID,
      store_passwd: process.env.SSLCOMMERZ_STORE_PASS,
      total_amount: amount,
      currency: 'BDT',
      tran_id,
      success_url: `${process.env.BACKEND_URL}/api/payment/success`,
      fail_url: `${process.env.BACKEND_URL}/api/payment/fail`,
      cancel_url: `${process.env.BACKEND_URL}/api/payment/cancel`,
      ipn_url: `${process.env.BACKEND_URL}/api/payment/ipn`,
      cus_name: customerName,
      cus_email: customerEmail,
      cus_phone: customerPhone,
      shipping_method: 'NO',
      product_name: productName,
      product_category: 'General',
      product_profile: 'general',
      cus_add1: 'N/A',
      cus_city: 'N/A',
      cus_country: 'Bangladesh',
      emi_option: '0',
      emi_allow: '0'
    };

    const response = await axios.post(
      'https://sandbox.sslcommerz.com/gwprocess/v4/api.php',
      qs.stringify(sslczData),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    if (!response.data.GatewayPageURL) {
      throw new Error('Payment initiation failed');
    }

    // Save SSLCommerz response
    newOrder.sslczResponse = response.data;
    await newOrder.save();

    res.json({ 
      paymentUrl: response.data.GatewayPageURL,
      tranId: tran_id 
    });

  } catch (err) {
    console.error('Payment initiation error:', err);
    res.status(500).json({ 
      error: 'Payment processing failed',
      details: err.message 
    });
  }
};

exports.paymentSuccess = async (req, res) => {
  try {
    const { tran_id, val_id, amount, currency, bank_tran_id } = req.body;

    // Validate with SSLCommerz
    const validationUrl = `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${val_id}&store_id=${process.env.SSLCOMMERZ_STORE_ID}&store_passwd=${process.env.SSLCOMMERZ_STORE_PASS}&format=json`;
    
    const validationResponse = await axios.get(validationUrl);
    
    if (validationResponse.data.status !== 'VALID') {
      throw new Error('Payment validation failed');
    }

    // Update order
    const updatedOrder = await Order.findOneAndUpdate(
      { transactionId: tran_id },
      { 
        paymentStatus: 'Success',
        paymentDetails: validationResponse.data
      },
      { new: true }
    );

    if (!updatedOrder) {
      throw new Error('Order not found');
    }

    // Redirect to frontend with transaction ID
    res.redirect(`${process.env.FRONTEND_URL}/success?tran_id=${tran_id}`);

  } catch (err) {
    console.error('Payment success error:', err);
    res.redirect(`${process.env.FRONTEND_URL}/fail?error=validation`);
  }
};

exports.paymentFail = async (req, res) => {
  try {
    const { tran_id } = req.body;
    
    await Order.findOneAndUpdate(
      { transactionId: tran_id },
      { paymentStatus: 'Failed' }
    );
    
    res.redirect(`${process.env.FRONTEND_URL}/fail?tran_id=${tran_id}`);
  } catch (err) {
    res.redirect(`${process.env.FRONTEND_URL}/fail?error=processing`);
  }
};

exports.getOrderDetails = async (req, res) => {
  try {
    const order = await Order.findOne({ transactionId: req.params.tranId });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};