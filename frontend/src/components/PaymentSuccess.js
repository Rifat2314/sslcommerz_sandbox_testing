import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentSuccess = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tranId = params.get('tran_id');

    const fetchOrderDetails = async () => {
      try {
        if (!tranId) throw new Error('No transaction ID provided');
        
        const response = await axios.get(`http://localhost:5000/api/payment/order/${tranId}`);
        
        if (!response.data) throw new Error('Order not found');
        
        setOrder(response.data);
      } catch (err) {
        console.error('Failed to fetch order:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [location]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>Processing your payment...</h2>
        <p>Please wait while we verify your transaction</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
        <h2>Verification Error</h2>
        <p>{error}</p>
        <button 
          onClick={() => navigate('/')}
          style={{
            padding: '0.5rem 1rem',
            marginTop: '1rem',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '2rem', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      <h1 style={{ color: '#4CAF50', textAlign: 'center' }}>Payment Successful!</h1>
      
      <div style={{ marginTop: '2rem' }}>
        <h3>Order Details</h3>
        <table style={{ width: '100%', marginTop: '1rem', borderCollapse: 'collapse' }}>
          <tbody>
            <tr style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>Transaction ID:</td>
              <td style={{ padding: '0.5rem' }}>{order.transactionId}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>Amount:</td>
              <td style={{ padding: '0.5rem' }}>{order.amount} BDT</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>Product:</td>
              <td style={{ padding: '0.5rem' }}>{order.productName}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>Status:</td>
              <td style={{ padding: '0.5rem', color: '#4CAF50' }}>{order.paymentStatus}</td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>Date:</td>
              <td style={{ padding: '0.5rem' }}>
                {new Date(order.updatedAt).toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <button 
        onClick={() => navigate('/')}
        style={{
          display: 'block',
          width: '100%',
          padding: '0.8rem',
          marginTop: '2rem',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '1rem'
        }}
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default PaymentSuccess;