import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { CreditCard, CheckCircle } from 'lucide-react';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, total, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const handleCheckout = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    setTimeout(() => {
      // Mock saving order
      const newOrder = {
        id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toISOString(),
        total,
        items: cartItems,
        status: 'Processing'
      };
      
      const savedOrders = JSON.parse(localStorage.getItem('nexus_orders') || '[]');
      if (currentUser) {
        newOrder.userId = currentUser.id;
      }
      localStorage.setItem('nexus_orders', JSON.stringify([...savedOrders, newOrder]));
      
      clearCart();
      setIsProcessing(false);
      setIsSuccess(true);
      toast.success('Payment successful!');
      
      setTimeout(() => navigate('/orders'), 3000);
    }, 2000);
  };

  if (cartItems.length === 0 && !isSuccess) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h2>Your cart is empty</h2>
        <button className="btn btn-primary" onClick={() => navigate('/products')} style={{marginTop: '1rem'}}>Browse Products</button>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="checkout-success fade-in">
        <div className="success-card glass">
          <CheckCircle size={64} color="#10b981" className="success-icon" />
          <h2>Order Confirmed!</h2>
          <p>Thank you for your purchase. Your order is being processed.</p>
          <p>Redirecting to your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page fade-in">
      <div className="container checkout-container">
        <h1 className="page-title">Checkout</h1>
        
        <div className="checkout-layout">
          <div className="checkout-form-container glass">
            <form onSubmit={handleCheckout}>
              <h3 className="section-title">Shipping Information</h3>
              <div className="form-grid">
                <input type="text" name="name" className="input" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
                <input type="email" name="email" className="input" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
                <input type="text" name="address" className="input" placeholder="Street Address" value={formData.address} onChange={handleChange} required style={{gridColumn: '1 / -1'}} />
                <input type="text" name="city" className="input" placeholder="City" value={formData.city} onChange={handleChange} required />
                <input type="text" name="zip" className="input" placeholder="ZIP Code" value={formData.zip} onChange={handleChange} required />
              </div>

              <h3 className="section-title" style={{marginTop: '2rem'}}>Payment Details</h3>
              <div className="cc-mockup">
                <div className="cc-chip"></div>
                <div className="cc-number">{formData.cardNumber || '•••• •••• •••• ••••'}</div>
                <div className="cc-info">
                  <span>{formData.name || 'CARDHOLDER NAME'}</span>
                  <span>{formData.expiry || 'MM/YY'}</span>
                </div>
              </div>
              
              <div className="form-grid mt-4">
                <input type="text" name="cardNumber" className="input" placeholder="Card Number" value={formData.cardNumber} onChange={handleChange} maxLength="16" required style={{gridColumn: '1 / -1'}} />
                <input type="text" name="expiry" className="input" placeholder="MM/YY" value={formData.expiry} onChange={handleChange} maxLength="5" required />
                <input type="text" name="cvv" className="input" placeholder="CVV" value={formData.cvv} onChange={handleChange} maxLength="3" required />
              </div>

              <button type="submit" className="btn btn-primary btn-pay" disabled={isProcessing}>
                {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
              </button>
            </form>
          </div>
          
          <div className="checkout-summary glass">
            <h3>Order Summary</h3>
            <div className="summary-items">
              {cartItems.map(item => (
                <div key={item.id} className="summary-item">
                  <span className="summary-item-name">{item.quantity}x {item.name}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row total-row">
              <span>Total</span>
              <span className="total-price">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
