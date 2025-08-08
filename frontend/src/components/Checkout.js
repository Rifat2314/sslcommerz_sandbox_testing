import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const [formData, setFormData] = useState({
    productName: '',
    amount: '',
    customerName: '',
    customerEmail: '',
    customerPhone: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.productName.trim()) newErrors.productName = 'Product name is required';
    if (!formData.amount || formData.amount <= 0) newErrors.amount = 'Valid amount required';
    if (!formData.customerName.trim()) newErrors.customerName = 'Name is required';
    if (!/^\S+@\S+\.\S+$/.test(formData.customerEmail)) newErrors.customerEmail = 'Invalid email';
    if (!/^01[3-9]\d{8}$/.test(formData.customerPhone)) newErrors.customerPhone = 'Invalid BD phone';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/payment/initiate', formData);
      
      // Open payment in new tab
      const paymentWindow = window.open(res.data.paymentUrl, '_blank');
      
      // Fallback if popup blocked
      if (!paymentWindow || paymentWindow.closed) {
        window.location.href = res.data.paymentUrl;
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Payment initiation failed');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto', padding: '2rem', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Product Name*</label>
          <input
            type="text"
            value={formData.productName}
            onChange={(e) => setFormData({...formData, productName: e.target.value})}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.3rem' }}
          />
          {errors.productName && <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors.productName}</p>}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Amount (BDT)*</label>
          <input
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData({...formData, amount: e.target.value})}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.3rem' }}
          />
          {errors.amount && <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors.amount}</p>}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Your Name*</label>
          <input
            type="text"
            value={formData.customerName}
            onChange={(e) => setFormData({...formData, customerName: e.target.value})}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.3rem' }}
          />
          {errors.customerName && <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors.customerName}</p>}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Email*</label>
          <input
            type="email"
            value={formData.customerEmail}
            onChange={(e) => setFormData({...formData, customerEmail: e.target.value})}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.3rem' }}
          />
          {errors.customerEmail && <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors.customerEmail}</p>}
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label>Phone (01XXXXXXXXX)*</label>
          <input
            type="text"
            value={formData.customerPhone}
            onChange={(e) => setFormData({...formData, customerPhone: e.target.value})}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.3rem' }}
          />
          {errors.customerPhone && <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors.customerPhone}</p>}
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          style={{
            width: '100%',
            padding: '0.8rem',
            backgroundColor: isLoading ? '#ccc' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          {isLoading ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
};

export default Checkout;