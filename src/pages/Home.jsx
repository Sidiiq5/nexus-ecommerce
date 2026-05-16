import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page fade-in">
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Elevate Your <span className="gradient-text">Lifestyle</span>
            </h1>
            <p className="hero-subtitle">
              Discover premium products curated for the modern aesthetic. Experience quality, design, and innovation in every item.
            </p>
            <div className="hero-actions">
              <Link to="/products" className="btn btn-primary btn-lg">
                Shop Now <ArrowRight size={20} className="ml-2" />
              </Link>
              <Link to="/products" className="btn btn-outline btn-lg">
                Explore Collection
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="glow-orb orb-1"></div>
            <div className="glow-orb orb-2"></div>
            <div className="hero-image-wrapper glass">
              {/* placeholder for hero image */}
              <img 
                src="https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Premium dark aesthetic setup" 
                className="hero-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features/Stats Section */}
      <section className="features-section border-top">
        <div className="container features-container">
          <div className="feature-item">
            <h3 className="feature-title">Premium Quality</h3>
            <p className="feature-desc">Curated materials and exceptional craftsmanship.</p>
          </div>
          <div className="feature-item">
            <h3 className="feature-title">Fast Shipping</h3>
            <p className="feature-desc">Worldwide delivery within 3-5 business days.</p>
          </div>
          <div className="feature-item">
            <h3 className="feature-title">24/7 Support</h3>
            <p className="feature-desc">Dedicated team ready to assist you anytime.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
