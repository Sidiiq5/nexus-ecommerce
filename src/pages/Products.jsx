import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { Search, Filter } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import './Products.css';

const Products = () => {
  const { products } = useProducts();
  const { addToCart } = useCart();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(1000);

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesPrice = product.price <= maxPrice;
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="products-page fade-in">
      <div className="container products-container">
        <div className="products-header">
          <h1 className="page-title">Explore Collection</h1>
        </div>

        <div className="products-layout">
          <aside className="products-sidebar glass">
            <div className="sidebar-section">
              <h3 className="sidebar-title"><Search size={18} /> Search</h3>
              <input 
                type="text" 
                className="input" 
                placeholder="Search products..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="sidebar-section">
              <h3 className="sidebar-title"><Filter size={18} /> Category</h3>
              <div className="category-list">
                {categories.map(cat => (
                  <label key={cat} className="category-label">
                    <input 
                      type="radio" 
                      name="category" 
                      value={cat} 
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </div>

            <div className="sidebar-section">
              <h3 className="sidebar-title">Price Range</h3>
              <div className="price-slider-container">
                <input 
                  type="range" 
                  min="0" 
                  max="1000" 
                  step="10" 
                  value={maxPrice} 
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="price-slider"
                />
                <div className="price-labels">
                  <span>$0</span>
                  <span>${maxPrice}</span>
                </div>
              </div>
            </div>
          </aside>

          <div className="products-main">
            {filteredProducts.length > 0 ? (
              <div className="products-grid">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} onAdd={addToCart} />
                ))}
              </div>
            ) : (
              <div className="no-results glass">
                <p>No products found matching your criteria.</p>
                <button 
                  className="btn btn-outline" 
                  style={{marginTop: '1rem'}}
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                    setMaxPrice(1000);
                  }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
