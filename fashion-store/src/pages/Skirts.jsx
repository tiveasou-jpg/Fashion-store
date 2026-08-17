import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function SkirtsPage({ addToCart }) {
const products = [
  { id: 1, name: 'Pleated Mini', price: '$22.99', image: 'https://i.pinimg.com/1200x/65/14/19/6514190b705c8cd93dbe9b04b0e0b5d7.jpg' },
  { id: 2, name: 'Denim Skirt', price: '$34.50', image: 'https://i.pinimg.com/736x/d6/25/8f/d6258f082bb8668317e93fdb4ae89d48.jpg' },
  { id: 3, name: 'Floral Midi', price: '$28.99', image: 'https://i.pinimg.com/736x/a0/75/19/a075198686d89f61c9a55b131df1d763.jpg' },
  { id: 4, name: 'Satin Slip', price: '$32.00', image: 'https://i.pinimg.com/736x/4c/f2/2b/4cf22b8ccc04500f6d4ef6a38d0c4801.jpg' },
  { id: 5, name: 'A-Line Mini', price: '$25.99', image: 'https://i.pinimg.com/736x/9f/d8/80/9fd88035b797a0d37fdc22354a141aa8.jpg' },
  { id: 6, name: 'Plaid Tennis', price: '$24.50', image: 'https://i.pinimg.com/1200x/0c/26/0e/0c260ec7ac5de08dd0600eb06d25a485.jpg' },
  { id: 7, name: 'Tiered Maxi', price: '$38.00', image: 'https://i.pinimg.com/1200x/e0/2c/ae/e02cae7d70aa6713c9bda98082491155.jpg' },
  { id: 8, name: 'High-Waist Midi', price: '$29.99', image: 'https://i.pinimg.com/736x/ce/bb/8d/cebb8d2de4108fa534eac0e17d012d3e.jpg' },
  { id: 9, name: 'Wrap Skirt', price: '$27.50', image: 'https://i.pinimg.com/1200x/8b/c6/e6/8bc6e64148c77e1f64b5d43794c7158f.jpg' },
  { id: 10, name: 'Cargo Mini', price: '$31.00', image: 'https://i.pinimg.com/736x/0e/3d/16/0e3d16501682d8c3f7fe7ff979d64bd9.jpg' },
  { id: 11, name: 'Leather Look', price: '$36.99', image: 'https://i.pinimg.com/1200x/aa/31/b1/aa31b1f9e7ee8f65867b75191349a0e0.jpg' },
  { id: 12, name: 'Knit Midi', price: '$26.00', image: 'https://i.pinimg.com/1200x/80/67/a4/8067a47b7e1f2190e7c9026edddef656.jpg' },
  { id: 13, name: 'Ruffle Mini', price: '$23.99', image: 'https://i.pinimg.com/736x/2d/e5/46/2de5466cefe007cfc4720128f28e160d.jpg' },
  { id: 14, name: 'Split Midi', price: '$33.50', image: 'https://i.pinimg.com/1200x/2e/e7/c8/2ee7c820e56e57c49629227c50e1095e.jpg' },
  { id: 15, name: 'Checkered Skirt', price: '$25.00', image: 'https://i.pinimg.com/1200x/aa/66/f4/aa66f4b81804549b3dc631a413559a7a.jpg' },
  { id: 16, name: 'Tulle Skirt', price: '$39.99', image: 'https://i.pinimg.com/736x/e7/76/83/e7768343a16bcefbf244e94a32e8fd52.jpg' },
  { id: 17, name: 'Boho Maxi', price: '$37.00', image: 'https://i.pinimg.com/1200x/4e/02/0d/4e020d413ad378579eb9850328824d66.jpg' },
  { id: 18, name: 'Pencil Skirt', price: '$30.50', image: 'https://i.pinimg.com/736x/52/02/8a/52028a28998477f5fa7bbfc7a8bf09b8.jpg' },
  { id: 19, name: 'Button Mini', price: '$28.00', image: 'https://i.pinimg.com/736x/56/16/48/561648bf0bcb87938c52aaa019c23231.jpg' },
  { id: 20, name: 'Asym Skirt', price: '$31.99', image: 'https://i.pinimg.com/1200x/a6/55/4f/a6554f58b11470e540001a75016db735.jpg' },
  { id: 21, name: 'Smocked Midi', price: '$29.50', image: 'https://i.pinimg.com/736x/45/a8/db/45a8db8dc1f091afb42ce9d10993e2c3.jpg' },
  { id: 22, name: 'Velvet Mini', price: '$27.99', image: 'https://i.pinimg.com/1200x/4f/6f/66/4f6f66231e66de548b26708565e6e00a.jpg' },
  { id: 23, name: 'Corduroy Skirt', price: '$34.00', image: 'https://i.pinimg.com/1200x/9c/06/d9/9c06d9bae0312ffb3fb7868ac21f8f3a.jpg' },
  { id: 24, name: 'Ribbed Pencil', price: '$24.99', image: 'https://i.pinimg.com/736x/60/e5/49/60e5493d4e70a9717e7403f0eac757c4.jpg' },
  { id: 25, name: 'Polka Midi', price: '$32.50', image: 'https://i.pinimg.com/736x/e5/22/93/e52293077a2537b72d49383c8e379c48.jpg' },
  { id: 26, name: 'Linen Skirt', price: '$29.00', image: 'https://i.pinimg.com/1200x/ad/dd/2d/addd2dbba83383d7f9f962049ef35fbf.jpg' },
  { id: 27, name: 'Mesh Mini', price: '$22.50', image: 'https://i.pinimg.com/1200x/31/61/48/31614825dad1a6d88f4fb7a1e6d8b6fc.jpg' },
  { id: 28, name: 'Utility Midi', price: '$35.99', image: 'https://i.pinimg.com/736x/6a/24/dc/6a24dc3c2a29b384e6347d77fe5b0556.jpg' },
  { id: 29, name: 'Tiered Mini', price: '$26.50', image: 'https://i.pinimg.com/1200x/42/b9/1d/42b91dccd7920e0da29c05a079783bca.jpg' },
  { id: 30, name: 'Casual Basic', price: '$19.99', image: 'https://i.pinimg.com/236x/ac/24/0a/ac240a59bc46d3cf9cf8512ca701512a.jpg' }
];

  // State to manage search term
  const [searchTerm, setSearchTerm] = useState('');

  // Filter products by name or price
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.price.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="skirts-page">
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

      {/* 🔍 Search Input Field */}
      <div style={searchContainerStyle}>
        <input
          type="text"
          placeholder="Search skirts by name or price..."
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
                  
                  {/* Add to Cart Button */}
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => addToCart?.({ ...product, title: product.name })}
                    style={btnStyle}
                  >
                    Add to Cart 🛒
                  </button>
                </div>
              </div>
            </article>
          ))
        ) : (
          <p style={noResultStyle}>No skirts found matching "{searchTerm}".</p>
        )}
      </main>
    </div>
  );
}

// Inline Styles
const searchContainerStyle = {
  margin: '20px auto',
  maxWidth: '400px',
  textAlign: 'center',
  padding: '0 15px',
};

const searchInputStyle = {
  width: '100%',
  padding: '10px 16px',
  borderRadius: '25px',
  border: '1px solid #ccc',
  fontSize: '14px',
  outline: 'none',
  boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
};

const btnStyle = {
  backgroundColor: '#ff6f61',
  color: '#fff',
  border: 'none',
  padding: '8px 16px',
  borderRadius: '20px',
  fontWeight: 'bold',
  cursor: 'pointer',
  marginTop: '10px',
  width: '100%',
  transition: 'background-color 0.2s ease-in-out',
};

const noResultStyle = {
  textAlign: 'center',
  width: '100%',
  marginTop: '30px',
  color: '#666',
  fontSize: '16px',
};