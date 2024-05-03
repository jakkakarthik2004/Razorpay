import './App.css';
import { Route } from 'react-router-dom';
import PaymentGatewayRazorpay from './Components/PaymentGatewayRazorpay'
import GooglePay from './Components/GooglePay';
function App() {
  return (
    <>
      <PaymentGatewayRazorpay/>
    </>
  );
}

export default App;