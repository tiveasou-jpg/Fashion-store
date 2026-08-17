import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Dress({ addToCart }) {
  const dressProducts = [
    { id: 1, name: 'Floral Dress', price: '$34.99', image: '/images/dress-1.jpg' },
    { id: 2, name: 'Satin Dress', price: '$42.50', image: '/images/dress-2.jpg' },
    { id: 3, name: 'Boho dress', price: '$28.00', image: '/images/dress-3.jpg' },
    { id: 4, name: 'Velvet Mini Dress', price: '$39.99', image: '/images/dress-4.jpg' },
    { id: 5, name: 'Slip Dress', price: '$48.50', image: '/images/dress-5.jpg' },
    { id: 6, name: 'Cotton Dress', price: '$22.99', image: '/images/dress-6.jpg' },
    { id: 7, name: 'Maxi Dress', price: '$54.00', image: '/images/dress-7.jpg' },
    { id: 8, name: 'Off-Shoulder', price: '$31.50', image: '/images/dress-8.jpg' },
    { id: 9, name: 'Ruffled Dress', price: '$36.99', image: '/images/dress-9.jpg' },
    { id: 10, name: 'A-Line Dress', price: '$29.00', image: '/images/dress-10.jpg' },
    { id: 11, name: 'Party Dress', price: '$45.99', image: '/images/dress-11.jpg' },
    { id: 12, name: 'Club Dress', price: '$27.50', image: '/images/dress-12.jpg' },
    { id: 13, name: 'Polka Dress', price: '$33.00', image: '/images/dress-13.jpg' },
    { id: 14, name: 'Evening Gown', price: '$59.99', image: '/images/dress-14.jpg' },
    { id: 15, name: 'Shirt Dress', price: '$26.50', image: '/images/dress-15.jpg' },
    { id: 16, name: 'Sundress', price: '$24.99', image: '/images/dress-16.jpg' },
    { id: 17, name: 'Hem Dress', price: '$38.00', image: '/images/dress-17.jpg' },
    { id: 18, name: 'Sweater Dress', price: '$41.50', image: '/images/dress-18.jpg' },
    { id: 19, name: 'Lace dress', price: '$35.99', image: '/images/dress-19.jpg' },
    { id: 20, name: 'Denim Dress', price: '$32.00', image: '/images/dress-20.jpg' },
    { id: 21, name: 'Puff dress', price: '$29.99', image: '/images/dress-21.jpg' },
    { id: 22, name: 'Cocktail Dress', price: '$62.50', image: '/images/dress-22.jpg' },
    { id: 23, name: 'Boho Maxi', price: '$37.00', image: '/images/dress-23.jpg' },
    { id: 24, name: 'Tank Dress', price: '$19.99', image: '/images/dress-24.jpg' },
    { id: 25, name: 'Bodycon', price: '$34.50', image: '/images/dress-25.jpg' },
    { id: 26, name: 'Mini Dress', price: '$28.99', image: '/images/dress-26.jpg' },
    { id: 27, name: 'Gingham dress', price: '$25.00', image: '/images/dress-27.jpg' },
    { id: 28, name: 'Tie-Front', price: '$31.99', image: '/images/dress-28.jpg' },
    { id: 29, name: 'Mesh Dress', price: '$44.00', image: '/images/dress-29.jpg' },
    { id: 30, name: 'Black Dress', price: '$49.99', image: '/images/dress-30.jpg' },
  ];

  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = dressProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.price.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCartClick = (product) => {
    if (addToCart) {
      addToCart({ ...product, title: product.name });
    } else {
      console.error("addToCart function is not passed into Dress component!");
    }
  };

  return (
    <div className="collection-page">
      <header className="collection-header">
        <Link to="/shop" className="category-link">
          &larr; back to shop
        </Link>
        <h1 className="collection-title">Our Collection</h1>
        <nav className="category-menu">
          <NavLink to="/jackets" className="category-link">Jackets</NavLink>
          <NavLink to="/dress" className="category-link">Dress</NavLink>
          <NavLink to="/summer-set" className="category-link">Summer Set</NavLink>
          <NavLink to="/skirts" className="category-link">Skirts</NavLink>
        </nav>
      </header>

      <div style={searchContainerStyle}>
        <input
          type="text"
          placeholder="Search items by name or price..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={searchInputStyle}
        />
      </div>

      <main className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="card">
                <div className="image-wrapper">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-info">
                  <h2 className="product-name">{product.name}</h2>
                  <p className="product-price">{product.price}</p>

                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCartClick(product)}
                    style={btnStyle}
                  >
                    Add to Cart 🛒
                  </button>
                </div>
              </div>
            </article>
          ))
        ) : (
          <p style={noResultStyle}>No dresses found matching "{searchTerm}".</p>
        )}
      </main>
    </div>
  );
}

// Inline Styles for Search Bar & Button
const searchContainerStyle = { margin: '20px auto', maxWidth: '400px', textAlign: 'center', padding: '0 15px' };
const searchInputStyle = { width: '100%', padding: '10px 16px', borderRadius: '25px', border: '1px solid #ccc', fontSize: '14px', outline: 'none' };
const btnStyle = { backgroundColor: '#ff6f61', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px', width: '100%' };
const noResultStyle = { textAlign: 'center', width: '100%', marginTop: '30px', color: '#666', fontSize: '16px' };