import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LayoutDashboard, Menu, X, LogOut, Settings } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentUser, logout, isAdmin } = useAuth();
  const { cartCount } = useCart();

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="navbar glass">
      <div className="container nav-container">
        <Link to="/" className="nav-logo">
          NEXUS<span>.</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav-links desktop-only">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
          <Link to="/products" className={`nav-link ${location.pathname === '/products' ? 'active' : ''}`}>Products</Link>
        </nav>

        <div className="nav-actions">
          {isAdmin && (
            <Link to="/admin" className="icon-btn desktop-only" title="Admin Dashboard">
              <LayoutDashboard size={20} />
            </Link>
          )}
          
          {currentUser ? (
            <>
              <Link to="/profile" className="icon-btn desktop-only" title="Profile">
                <Settings size={20} />
              </Link>
              <button onClick={handleLogout} className="icon-btn desktop-only" title="Logout">
                <LogOut size={20} />
              </button>
            </>
          ) : (
            <Link to="/login" className="icon-btn desktop-only" title="Login">
              <User size={20} />
            </Link>
          )}

          <Link to="/cart" className="cart-btn icon-btn">
            <ShoppingCart size={20} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          <button className="icon-btn mobile-menu-btn" onClick={toggleMenu}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu glass fade-in">
          <nav className="mobile-nav-links">
            <Link to="/" className="mobile-nav-link" onClick={toggleMenu}>Home</Link>
            <Link to="/products" className="mobile-nav-link" onClick={toggleMenu}>Products</Link>
            
            {currentUser ? (
              <>
                {isAdmin && <Link to="/admin" className="mobile-nav-link" onClick={toggleMenu}>Admin Dashboard</Link>}
                <Link to="/profile" className="mobile-nav-link" onClick={toggleMenu}>Profile</Link>
                <button 
                  className="mobile-nav-link" 
                  style={{background: 'none', border: 'none', fontFamily: 'inherit', cursor: 'pointer', padding: 0}} 
                  onClick={() => { handleLogout(); toggleMenu(); }}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="mobile-nav-link" onClick={toggleMenu}>Login / Sign Up</Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
