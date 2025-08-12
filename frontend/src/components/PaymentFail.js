import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentFail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const tranId = params.get('tran_id');
  const error = params.get('error');

  const errorMessages = {
    validation: 'Payment verification failed',
    processing: 'Error processing your payment',
    default: 'Payment was not completed successfully'
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '2rem', boxShadow: '0 0 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
      <h1 style={{ color: '#f44336' }}>Payment Failed</h1>
      
      {tranId && (
        <p style={{ margin: '1rem 0' }}>
          Transaction ID: <strong>{tranId}</strong>
        </p>
      )}
      
      <p style={{ margin: '1rem 0', color: '#555' }}>
        {errorMessages[error] || errorMessages.default}
      </p>

      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <button 
          onClick={() => navigate('/')}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Return Home
        </button>
        
        <button 
          onClick={() => navigate('/')} // Change to your checkout page path if different
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#FF9800',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default PaymentFail;