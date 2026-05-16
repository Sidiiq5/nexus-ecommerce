import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import { useAuth } from './context/AuthContext';
import './App.css'; 

const ProtectedRoute = ({ children, requireAdmin }) => {
  const { currentUser, isAdmin } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <Toaster position="bottom-right" toastOptions={{
        style: {
          background: '#1f1f1f',
          color: '#fff',
          border: '1px solid #2a2a2a'
        }
      }} />
      <Navbar />
      <main className="main-content fade-in">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          {/* We will add more routes later */}
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
