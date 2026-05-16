import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

const initialProducts = [
  { id: '1', name: 'Midnight Keychron K8', category: 'Accessories', price: 99.99, image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', description: 'Premium mechanical keyboard with customizable RGB.' },
  { id: '2', name: 'Stealth Gaming Mouse', category: 'Accessories', price: 79.99, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', description: 'Ultra-lightweight wireless gaming mouse.' },
  { id: '3', name: 'Aura Studio Headphones', category: 'Audio', price: 249.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', description: 'High-fidelity over-ear headphones with noise cancellation.' },
  { id: '4', name: 'Nebula Smartwatch', category: 'Wearables', price: 199.99, image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', description: 'Sleek smartwatch with health tracking and OLED display.' },
  { id: '5', name: 'Eclipse Monitor Light Bar', category: 'Accessories', price: 45.00, image: 'https://images.unsplash.com/photo-1585647573033-030f6a27e704?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', description: 'Reduces eye strain with adjustable color temperature.' },
  { id: '6', name: 'Zenith Wireless Charger', category: 'Electronics', price: 35.99, image: 'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', description: 'Fast charging pad compatible with all Qi devices.' }
];

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('nexus_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  useEffect(() => {
    localStorage.setItem('nexus_products', JSON.stringify(products));
  }, [products]);

  const addProduct = (product) => {
    const newProduct = { ...product, id: Date.now().toString() };
    setProducts([...products, newProduct]);
    toast.success('Product added successfully!');
  };

  const updateProduct = (id, updatedData) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updatedData } : p));
    toast.success('Product updated successfully!');
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
    toast.success('Product deleted!');
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
