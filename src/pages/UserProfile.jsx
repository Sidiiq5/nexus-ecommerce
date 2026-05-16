import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield } from 'lucide-react';
import './UserProfile.css';

const UserProfile = () => {
  const { currentUser, updateUser } = useAuth();
  
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || ''
  });

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formData);
  };

  if (!currentUser) return null;

  return (
    <div className="profile-page fade-in">
      <div className="container profile-container">
        <h1 className="page-title">Account Settings</h1>
        
        <div className="profile-layout glass">
          <div className="profile-sidebar">
            <div className="profile-avatar">
              <User size={64} />
            </div>
            <h3 className="profile-name">{currentUser.name}</h3>
            <p className="profile-role">{currentUser.role.toUpperCase()}</p>
          </div>
          
          <div className="profile-form-container">
            <form className="profile-form" onSubmit={handleSubmit}>
              <h3 className="section-title">Personal Information</h3>
              
              <div className="input-group">
                <label>Full Name</label>
                <div style={{position: 'relative'}}>
                  <User className="input-icon" size={20} />
                  <input type="text" name="name" className="input with-icon" value={formData.name} onChange={handleChange} required />
                </div>
              </div>
              
              <div className="input-group">
                <label>Email Address</label>
                <div style={{position: 'relative'}}>
                  <Mail className="input-icon" size={20} />
                  <input type="email" name="email" className="input with-icon" value={formData.email} onChange={handleChange} required />
                </div>
              </div>

              <div className="input-group">
                <label>Role</label>
                <div style={{position: 'relative'}}>
                  <Shield className="input-icon" size={20} />
                  <input type="text" className="input with-icon" value={currentUser.role} disabled />
                </div>
              </div>
              
              <button type="submit" className="btn btn-primary" style={{marginTop: '1rem'}}>
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
