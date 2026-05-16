import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('nexus_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('nexus_users');
    return saved ? JSON.parse(saved) : [
      { id: '1', name: 'Admin User', email: 'admin@nexus.com', password: 'password', role: 'admin' },
      { id: '2', name: 'Test User', email: 'test@user.com', password: 'password', role: 'user' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('nexus_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('nexus_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('nexus_user');
    }
  }, [currentUser]);

  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      toast.success('Successfully logged in!');
      return true;
    }
    toast.error('Invalid email or password');
    return false;
  };

  const signup = (name, email, password) => {
    if (users.find(u => u.email === email)) {
      toast.error('Email already in use');
      return false;
    }
    const newUser = { id: Date.now().toString(), name, email, password, role: 'user' };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    toast.success('Account created successfully!');
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    toast.success('Logged out successfully');
  };

  const updateUser = (updatedData) => {
    const updatedUser = { ...currentUser, ...updatedData };
    setCurrentUser(updatedUser);
    setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
    toast.success('Profile updated successfully');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, signup, logout, updateUser, isAdmin: currentUser?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
};
