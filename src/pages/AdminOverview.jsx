import { BarChart3, Users, ShoppingBag, DollarSign } from 'lucide-react';
import { useEffect, useState } from 'react';
import './AdminOverview.css';

const AdminOverview = () => {
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    setOrders(JSON.parse(localStorage.getItem('nexus_orders') || '[]'));
  }, []);

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0) + 24592; // + initial mock data
  const totalOrders = orders.length + 384;

  return (
    <div className="container" style={{padding: '2rem'}}>
      <h1 className="page-title">Dashboard Overview</h1>
      
      <div className="stats-grid">
        <div className="stat-card glass">
          <div className="stat-icon-wrapper sales-icon">
            <DollarSign size={24} />
          </div>
          <div className="stat-info">
            <p className="stat-label">Total Revenue</p>
            <h3 className="stat-value">${totalRevenue.toFixed(2)}</h3>
            <p className="stat-trend positive">+12.5%</p>
          </div>
        </div>
        
        <div className="stat-card glass">
          <div className="stat-icon-wrapper orders-icon">
            <ShoppingBag size={24} />
          </div>
          <div className="stat-info">
            <p className="stat-label">Total Orders</p>
            <h3 className="stat-value">{totalOrders}</h3>
            <p className="stat-trend positive">+5.2%</p>
          </div>
        </div>
        
        <div className="stat-card glass">
          <div className="stat-icon-wrapper customers-icon">
            <Users size={24} />
          </div>
          <div className="stat-info">
            <p className="stat-label">New Customers</p>
            <h3 className="stat-value">1,204</h3>
            <p className="stat-trend negative">-2.1%</p>
          </div>
        </div>
        
        <div className="stat-card glass">
          <div className="stat-icon-wrapper traffic-icon">
            <BarChart3 size={24} />
          </div>
          <div className="stat-info">
            <p className="stat-label">Store Traffic</p>
            <h3 className="stat-value">42.5K</h3>
            <p className="stat-trend positive">+18.4%</p>
          </div>
        </div>
      </div>

      <div className="admin-sections">
        <div className="recent-orders glass">
          <h3 className="section-title">Recent Orders</h3>
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? orders.map(order => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{new Date(order.date).toLocaleDateString()}</td>
                    <td>${order.total.toFixed(2)}</td>
                    <td><span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></td>
                  </tr>
                )) : (
                  <tr>
                    <td>#ORD-0921</td>
                    <td>Oct 24, 2026</td>
                    <td>$124.99</td>
                    <td><span className="status completed">Completed</span></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
