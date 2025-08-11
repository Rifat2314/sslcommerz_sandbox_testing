const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  amount: { type: Number, required: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerPhone: { type: String, required: true },
  transactionId: { type: String, required: true, unique: true },
  paymentStatus: { 
    type: String, 
    enum: ['Pending', 'Success', 'Failed'], 
    default: 'Pending' 
  },
  paymentDetails: { type: Object },
  sslczResponse: { type: Object }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);