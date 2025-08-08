const express = require('express');
const router = express.Router();
const {
  initiatePayment,
  paymentSuccess,
  paymentFail,
  getOrderDetails
} = require('../controllers/paymentController');

// Initiate payment
router.post('/initiate', initiatePayment);

// SSLCommerz callbacks
router.post('/success', paymentSuccess);
router.post('/fail', paymentFail);
router.post('/cancel', paymentFail); // Same handler as fail

// Get order details
router.get('/order/:tranId', getOrderDetails);

module.exports = router;