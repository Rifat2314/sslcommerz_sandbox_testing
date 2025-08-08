import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Checkout from './components/Checkout';
import PaymentSuccess from './components/PaymentSuccess';
import PaymentFail from './components/PaymentFail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Checkout />} />
        <Route path="/success" element={<PaymentSuccess />} />
        <Route path="/fail" element={<PaymentFail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;