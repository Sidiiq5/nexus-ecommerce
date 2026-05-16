import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, ArrowLeft, Star } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <button className="btn btn-primary" onClick={() => navigate('/products')} style={{marginTop: '1rem'}}>Back to Products</button>
      </div>
    );
  }

  const isFavorite = isInWishlist(product.id);

  return (
    <div className="product-details-page fade-in">
      <div className="container">
        <button className="back-link" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} /> Back
        </button>
        
        <div className="details-layout">
          <div className="details-image-section glass">
            <img src={product.image} alt={product.name} className="details-image" />
          </div>
          
          <div className="details-info-section">
            <div className="details-header">
              <p className="details-category">{product.category}</p>
              <h1 className="details-title">{product.name}</h1>
              <div className="details-rating">
                <Star size={18} fill="#f59e0b" color="#f59e0b" />
                <Star size={18} fill="#f59e0b" color="#f59e0b" />
                <Star size={18} fill="#f59e0b" color="#f59e0b" />
                <Star size={18} fill="#f59e0b" color="#f59e0b" />
                <Star size={18} fill="#f59e0b" color="#f59e0b" />
                <span className="reviews-count">(24 reviews)</span>
              </div>
              <p className="details-price">${Number(product.price).toFixed(2)}</p>
            </div>
            
            <div className="details-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>
            
            <div className="details-actions">
              <button className="btn btn-primary btn-add-lg" onClick={() => addToCart(product)}>
                <ShoppingBag size={20} className="mr-2" /> Add to Cart
              </button>
              <button 
                className={`btn btn-outline btn-wishlist-lg ${isFavorite ? 'active' : ''}`}
                onClick={() => toggleWishlist(product)}
              >
                <Heart size={20} fill={isFavorite ? '#ef4444' : 'none'} color={isFavorite ? '#ef4444' : '#fff'} />
              </button>
            </div>
            
            <div className="details-features glass">
              <div className="feature">
                <strong>Free Shipping</strong>
                <p>On all orders over $150</p>
              </div>
              <div className="feature">
                <strong>Easy Returns</strong>
                <p>30-day money back guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
