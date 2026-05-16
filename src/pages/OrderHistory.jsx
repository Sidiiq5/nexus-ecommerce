import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Package } from 'lucide-react';
import './OrderHistory.css';

const OrderHistory = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const allOrders = JSON.parse(localStorage.getItem('nexus_orders') || '[]');
    const userOrders = allOrders.filter(o => o.userId === currentUser?.id);
    setOrders(userOrders);
  }, [currentUser]);

  return (
    <div className="orders-page fade-in">
      <div className="container">
        <h1 className="page-title">Order History</h1>
        
        {orders.length === 0 ? (
          <div className="no-orders glass">
            <Package size={48} className="mb-4 text-secondary" />
            <h2>No orders found</h2>
            <p>You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order.id} className="order-card glass">
                <div className="order-header">
                  <div>
                    <h3>Order {order.id}</h3>
                    <p className="order-date">{new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <div className="order-status-total">
                    <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span>
                    <span className="order-total">${order.total.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="order-items">
                  {order.items.map(item => (
                    <div key={item.id} className="order-item">
                      <img src={item.image} alt={item.name} className="order-item-image" />
                      <div className="order-item-info">
                        <p className="order-item-name">{item.name}</p>
                        <p className="order-item-qty">Qty: {item.quantity}</p>
                      </div>
                      <p className="order-item-price">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
