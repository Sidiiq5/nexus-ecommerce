import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('nexus_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('nexus_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product) => {
    const exists = wishlist.find(item => item.id === product.id);
    if (exists) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
      toast.success(`${product.name} removed from wishlist`);
    } else {
      setWishlist([...wishlist, product]);
      toast.success(`${product.name} added to wishlist`);
    }
  };

  const isInWishlist = (id) => {
    return wishlist.some(item => item.id === id);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
