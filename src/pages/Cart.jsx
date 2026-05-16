import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, updateQuantity, removeItem, subtotal, shipping, total } = useCart();
  const navigate = useNavigate();

  return (
    <div className="cart-page fade-in">
      <div className="container cart-container">
        <h1 className="page-title">Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart glass">
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <Link to="/products" className="btn btn-primary mt-4">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item glass">
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <Link to={`/product/${item.id}`}><h3>{item.name}</h3></Link>
                    <p className="cart-item-category">{item.category}</p>
                    <p className="cart-item-price">${Number(item.price).toFixed(2)}</p>
                  </div>
                  <div className="cart-item-actions">
                    <div className="quantity-controls">
                      <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}><Minus size={16} /></button>
                      <span className="qty-value">{item.quantity}</span>
                      <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}><Plus size={16} /></button>
                    </div>
                    <button className="remove-btn" onClick={() => removeItem(item.id)}>
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="cart-summary glass">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row total-row">
                <span>Total</span>
                <span className="total-price">${total.toFixed(2)}</span>
              </div>
              <button className="btn btn-primary btn-checkout" onClick={() => navigate('/checkout')}>
                Proceed to Checkout <ArrowRight size={18} className="ml-2" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
