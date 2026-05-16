import { ShoppingBag, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import './ProductCard.css';

const ProductCard = ({ product, onAdd }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isFavorite = isInWishlist(product.id);

  return (
    <div className="product-card">
      <div className="product-image-container">
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.name} className="product-image" />
        </Link>
        <button 
          className={`wishlist-btn ${isFavorite ? 'active' : ''}`}
          onClick={() => toggleWishlist(product)}
        >
          <Heart size={20} fill={isFavorite ? '#ef4444' : 'none'} color={isFavorite ? '#ef4444' : '#fff'} />
        </button>
        <div className="product-overlay glass">
          <button className="btn btn-primary btn-add" onClick={() => onAdd(product)}>
            <ShoppingBag size={18} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
      <div className="product-info">
        <Link to={`/product/${product.id}`}>
          <h3 className="product-title">{product.name}</h3>
        </Link>
        <p className="product-category">{product.category}</p>
        <p className="product-price">${Number(product.price).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
