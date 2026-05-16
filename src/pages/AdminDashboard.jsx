import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, PackageSearch, Users, Settings } from 'lucide-react';
import AdminOverview from './AdminOverview';
import AdminInventory from './AdminInventory';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const location = useLocation();

  return (
    <div className="admin-layout fade-in">
      <aside className="admin-sidebar glass">
        <h2 className="admin-logo">Admin<span>Panel</span></h2>
        <nav className="admin-nav">
          <Link to="/admin" className={`admin-nav-link ${location.pathname === '/admin' ? 'active' : ''}`}>
            <LayoutDashboard size={20} /> Overview
          </Link>
          <Link to="/admin/inventory" className={`admin-nav-link ${location.pathname === '/admin/inventory' ? 'active' : ''}`}>
            <PackageSearch size={20} /> Inventory
          </Link>
          <Link to="/admin/customers" className={`admin-nav-link ${location.pathname === '/admin/customers' ? 'active' : ''}`}>
            <Users size={20} /> Customers
          </Link>
          <Link to="/admin/settings" className={`admin-nav-link ${location.pathname === '/admin/settings' ? 'active' : ''}`}>
            <Settings size={20} /> Settings
          </Link>
        </nav>
      </aside>

      <div className="admin-main">
        <Routes>
          <Route index element={<AdminOverview />} />
          <Route path="inventory" element={<AdminInventory />} />
          <Route path="*" element={<div className="container" style={{padding: '2rem'}}><h3>Under Construction</h3></div>} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
