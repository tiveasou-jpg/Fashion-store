import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-text">
          <p className="small-text">Latest Fashion style For Women</p>
          <h1>FASHION</h1>
          <p className="hero-description">
            Discover the latest dresses, skirts, and trendy outfits designed to 
            make you look beautiful and confident every day.
          </p>
          
          {/* Navigates to /shop when clicked */}
          <button className="shop-btn" onClick={() => navigate('/shop')}>
            Shop Now
          </button>
        </div>

        <div className="hero-image">
          <div className="image-card">
            <img 
              src="https://i.pinimg.com/736x/07/0f/c9/070fc942fbdd1a94b108f7c74c57d09e.jpg" 
              alt="Missou Chic Store Illustration" 
            />
          </div>
        </div>
      </section>
    </div>
  );
}