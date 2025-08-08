// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Checkout = () => {
//   const [formData, setFormData] = useState({
//     productName: '',
//     amount: '',
//     customerName: '',
//     customerEmail: '',
//     customerPhone: ''
//   });
//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.productName.trim()) newErrors.productName = 'Product name is required';
//     if (!formData.amount || formData.amount <= 0) newErrors.amount = 'Valid amount required';
//     if (!formData.customerName.trim()) newErrors.customerName = 'Name is required';
//     if (!/^\S+@\S+\.\S+$/.test(formData.customerEmail)) newErrors.customerEmail = 'Invalid email';
//     if (!/^01[3-9]\d{8}$/.test(formData.customerPhone)) newErrors.customerPhone = 'Invalid BD phone';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setIsLoading(true);
//     try {
//       const res = await axios.post('http://localhost:5000/api/payment/initiate', formData);
      
//       // Open payment in new tab
//       const paymentWindow = window.open(res.data.paymentUrl, '_blank');
      
//       // Fallback if popup blocked
//       if (!paymentWindow || paymentWindow.closed) {
//         window.location.href = res.data.paymentUrl;
//       }
//     } catch (err) {
//       alert(err.response?.data?.error || 'Payment initiation failed');
//       console.error(err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: '500px', margin: '2rem auto', padding: '2rem', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
//       <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Checkout</h2>
//       <form onSubmit={handleSubmit}>
//         <div style={{ marginBottom: '1rem' }}>
//           <label>Product Name*</label>
//           <input
//             type="text"
//             value={formData.productName}
//             onChange={(e) => setFormData({...formData, productName: e.target.value})}
//             style={{ width: '100%', padding: '0.5rem', marginTop: '0.3rem' }}
//           />
//           {errors.productName && <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors.productName}</p>}
//         </div>

//         <div style={{ marginBottom: '1rem' }}>
//           <label>Amount (BDT)*</label>
//           <input
//             type="number"
//             value={formData.amount}
//             onChange={(e) => setFormData({...formData, amount: e.target.value})}
//             style={{ width: '100%', padding: '0.5rem', marginTop: '0.3rem' }}
//           />
//           {errors.amount && <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors.amount}</p>}
//         </div>

//         <div style={{ marginBottom: '1rem' }}>
//           <label>Your Name*</label>
//           <input
//             type="text"
//             value={formData.customerName}
//             onChange={(e) => setFormData({...formData, customerName: e.target.value})}
//             style={{ width: '100%', padding: '0.5rem', marginTop: '0.3rem' }}
//           />
//           {errors.customerName && <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors.customerName}</p>}
//         </div>

//         <div style={{ marginBottom: '1rem' }}>
//           <label>Email*</label>
//           <input
//             type="email"
//             value={formData.customerEmail}
//             onChange={(e) => setFormData({...formData, customerEmail: e.target.value})}
//             style={{ width: '100%', padding: '0.5rem', marginTop: '0.3rem' }}
//           />
//           {errors.customerEmail && <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors.customerEmail}</p>}
//         </div>

//         <div style={{ marginBottom: '1.5rem' }}>
//           <label>Phone (01XXXXXXXXX)*</label>
//           <input
//             type="text"
//             value={formData.customerPhone}
//             onChange={(e) => setFormData({...formData, customerPhone: e.target.value})}
//             style={{ width: '100%', padding: '0.5rem', marginTop: '0.3rem' }}
//           />
//           {errors.customerPhone && <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors.customerPhone}</p>}
//         </div>

//         <button 
//           type="submit" 
//           disabled={isLoading}
//           style={{
//             width: '100%',
//             padding: '0.8rem',
//             backgroundColor: isLoading ? '#ccc' : '#4CAF50',
//             color: 'white',
//             border: 'none',
//             borderRadius: '4px',
//             cursor: 'pointer',
//             fontSize: '1rem'
//           }}
//         >
//           {isLoading ? 'Processing...' : 'Pay Now'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Checkout;

























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
      
      const paymentWindow = window.open(res.data.paymentUrl, '_blank');
      
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
    <div className="checkout-container">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name*</label>
          <input
            type="text"
            value={formData.productName}
            onChange={(e) => setFormData({...formData, productName: e.target.value})}
          />
          {errors.productName && <span className="error">{errors.productName}</span>}
        </div>

        <div className="form-group">
          <label>Amount (BDT)*</label>
          <input
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData({...formData, amount: e.target.value})}
          />
          {errors.amount && <span className="error">{errors.amount}</span>}
        </div>

        <div className="form-group">
          <label>Your Name*</label>
          <input
            type="text"
            value={formData.customerName}
            onChange={(e) => setFormData({...formData, customerName: e.target.value})}
          />
          {errors.customerName && <span className="error">{errors.customerName}</span>}
        </div>

        <div className="form-group">
          <label>Email*</label>
          <input
            type="email"
            value={formData.customerEmail}
            onChange={(e) => setFormData({...formData, customerEmail: e.target.value})}
          />
          {errors.customerEmail && <span className="error">{errors.customerEmail}</span>}
        </div>

        <div className="form-group">
          <label>Phone (01XXXXXXXXX)*</label>
          <input
            type="text"
            value={formData.customerPhone}
            onChange={(e) => setFormData({...formData, customerPhone: e.target.value})}
          />
          {errors.customerPhone && <span className="error">{errors.customerPhone}</span>}
        </div>

        <button type="submit" disabled={isLoading} className="pay-button">
          {isLoading ? 'Processing...' : 'Pay Now'}
        </button>
      </form>

      <style jsx>{`
        .checkout-container {
          max-width: 500px;
          margin: 2rem auto;
          padding: 2rem;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        h2 {
          text-align: center;
          margin-bottom: 1.5rem;
          color: #333;
        }
        
        .form-group {
          margin-bottom: 1.2rem;
        }
        
        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #555;
        }
        
        input {
          width: 100%;
          padding: 0.8rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
          transition: border 0.3s;
        }
        
        input:focus {
          outline: none;
          border-color: #4CAF50;
        }
        
        .error {
          color: #e74c3c;
          font-size: 0.85rem;
          margin-top: 0.3rem;
          display: block;
        }
        
        .pay-button {
          width: 100%;
          padding: 1rem;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.3s;
        }
        
        .pay-button:hover {
          background-color: #45a049;
        }
        
        .pay-button:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default Checkout;
