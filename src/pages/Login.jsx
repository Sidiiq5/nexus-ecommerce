import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoginMode) {
      if (login(email, password)) {
        navigate('/');
      }
    } else {
      if (signup(name, email, password)) {
        navigate('/');
      }
    }
  };

  return (
    <div className="login-page fade-in">
      <div className="login-container glass">
        <h2 className="login-title">{isLoginMode ? 'Welcome Back' : 'Create Account'}</h2>
        <p className="login-subtitle">
          {isLoginMode ? 'Enter your credentials to access your account' : 'Sign up to start exploring premium products'}
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          {!isLoginMode && (
            <div className="input-group">
              <UserIcon className="input-icon" size={20} />
              <input type="text" className="input with-icon" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required />
            </div>
          )}
          
          <div className="input-group">
            <Mail className="input-icon" size={20} />
            <input type="email" className="input with-icon" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          
          <div className="input-group">
            <Lock className="input-icon" size={20} />
            <input type="password" className="input with-icon" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>

          {isLoginMode && (
            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" className="forgot-password">Forgot Password?</a>
            </div>
          )}

          <button type="submit" className="btn btn-primary w-100">
            {isLoginMode ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="toggle-mode">
          <p>
            {isLoginMode ? "Don't have an account?" : "Already have an account?"}
            <button className="text-btn" type="button" onClick={() => setIsLoginMode(!isLoginMode)}>
              {isLoginMode ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
