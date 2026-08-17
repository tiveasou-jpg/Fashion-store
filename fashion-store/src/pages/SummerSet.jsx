import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function SummerSet({ addToCart }) {
  const summerSetProducts = [
  { id: 1, name: 'Linen Two-Piece', price: '$32.99', image: 'https://i.pinimg.com/736x/5e/69/06/5e6906ae586d4210ccb136b373e5881f.jpg' },
  { id: 2, name: 'Floral Crop & Short', price: '$28.50', image: 'https://i.pinimg.com/736x/0d/e2/3a/0de23a3cfc78cb772315e61291eff365.jpg' },
  { id: 3, name: 'Knit Co-ord Set', price: '$35.00', image: 'https://i.pinimg.com/736x/0e/30/fa/0e30fa826ae687b883603a6acc60c802.jpg' },
  { id: 4, name: 'Beach Lounge Duo', price: '$29.99', image: 'https://i.pinimg.com/736x/6f/a7/42/6fa74250e492cfc5d7d2472ee5f3b97d.jpg' },
  { id: 5, name: 'Striped Short Set', price: '$31.50', image: 'https://i.pinimg.com/736x/5c/c9/49/5cc949b837c9f0f1c53284b1aebabf1e.jpg' },
  { id: 6, name: 'Cotton Breeze Set', price: '$27.00', image: 'https://i.pinimg.com/736x/0a/e4/5a/0ae45aa7040ccb568902f44871d75f1a.jpg' },
  { id: 7, name: 'Pastel Co-ord', price: '$33.99', image: 'https://i.pinimg.com/1200x/30/cf/a5/30cfa5f39700dc071f66ab041ca164b1.jpg' },
  { id: 8, name: 'Boho Summer Set', price: '$36.00', image: 'https://i.pinimg.com/736x/7c/65/ee/7c65ee5e0175f2d0e34951e5dd820862.jpg' },
  { id: 9, name: 'Casual Ribbed Set', price: '$24.50', image: 'https://i.pinimg.com/736x/30/3a/d3/303ad3b780e317c16ac9c7e46bf8c27e.jpg' },
  { id: 10, name: 'Satin Resort Duo', price: '$38.50', image: 'https://i.pinimg.com/736x/9d/27/cb/9d27cb5ccd7618e75b700780abe6f07d.jpg' },
  { id: 11, name: 'Tie-Dye Co-ord', price: '$23.99', image: 'https://i.pinimg.com/736x/95/a4/6d/95a46d5e85c1cf9e431b2cf57865bb4b.jpg' },
  { id: 12, name: 'Gingham Two-Piece', price: '$29.00', image: 'https://i.pinimg.com/736x/70/12/af/7012af5fe3fa04fbbbdf9f4c5b5a8443.jpg' },
  { id: 13, name: 'Tank & Shorts Set', price: '$21.99', image: 'https://i.pinimg.com/736x/7a/83/f2/7a83f2637847f89400f4bd986439df18.jpg' },
  { id: 14, name: 'Crochet Beach Set', price: '$37.50', image: 'https://i.pinimg.com/736x/87/46/a6/8746a69f5a3e9f8a98a2e47b8ce628a6.jpg' },
  { id: 15, name: 'Plaid Summer Duo', price: '$30.99', image: 'https://i.pinimg.com/736x/2f/15/a9/2f15a9358c8a683f124cbfe954b962a7.jpg' },
  { id: 16, name: 'Vacation Resort Set', price: '$41.00', image: 'https://i.pinimg.com/736x/7d/11/36/7d1136c2a9b82420fd2bdbe5a4d8dd90.jpg' },
  { id: 17, name: 'Denim Style Co-ord', price: '$39.99', image: 'https://i.pinimg.com/736x/f5/12/93/f51293c2bb123c6ada83fd8ab31412d4.jpg' },
  { id: 18, name: 'Seamless Lounge Set', price: '$28.00', image: 'https://i.pinimg.com/736x/d8/82/fd/d882fd1f131cf5b8e366350322d5c280.jpg' },
  { id: 19, name: 'Tropical Print Set', price: '$32.50', image: 'https://i.pinimg.com/736x/cf/4e/24/cf4e24f8139211072a4d8d900fd0c0d2.jpg' },
  { id: 20, name: 'Button-Down Duo', price: '$34.00', image: 'https://i.pinimg.com/736x/ed/47/16/ed4716c080f2b3b53c43f943b4060032.jpg' },
  { id: 21, name: 'Ruffle Crop Set', price: '$27.99', image: 'https://i.pinimg.com/736x/15/04/bd/1504bd39e6237667007738e47ec8c8df.jpg' },
  { id: 22, name: 'Smocked Summer Set', price: '$31.00', image: 'https://i.pinimg.com/1200x/db/61/d9/db61d9e1b52d65f5dea1d9c37159d72b.jpg' },
  { id: 23, name: 'Athleisure Co-ord', price: '$26.50', image: 'https://i.pinimg.com/736x/73/5f/19/735f19c9bcb9bdcc98b2deb9be3d50bd.jpg' },
  { id: 24, name: 'Terrycloth Set', price: '$33.00', image: 'https://i.pinimg.com/736x/cc/8f/1d/cc8f1dcf950c20bfd22b61623aef958b.jpg' },
  { id: 25, name: 'Wrap Top & Short', price: '$35.99', image: 'https://i.pinimg.com/736x/b4/e4/66/b4e4663397c178026391f98e26d3ed25.jpg' },
  { id: 26, name: 'Mesh Beach Duo', price: '$29.50', image: 'https://i.pinimg.com/736x/34/6c/10/346c10d8c2348a6a585b2655b9224019.jpg' },
  { id: 27, name: 'High-Waist Co-ord', price: '$30.00', image: 'https://i.pinimg.com/736x/50/fd/05/50fd05c92d22fb6c15db1b4043a0c125.jpg' },
  { id: 28, name: 'Linen Skirt Set', price: '$36.99', image: 'https://i.pinimg.com/1200x/00/4a/7e/004a7e4fad1006df46a4688922d68f0d.jpg' },
  { id: 29, name: 'Chill Out Two-Piece', price: '$25.99', image: 'https://i.pinimg.com/1200x/29/a3/ad/29a3adb4b4d63c120209c7095e12de3a.jpg' },
  { id: 30, name: 'Sunny Day Combo', price: '$28.99', image: 'https://i.pinimg.com/736x/f8/07/dd/f807ddaa358e641bd338510b6dfc5eb5.jpg' },
];

  // State to manage search input value
  const [searchTerm, setSearchTerm] = useState('');

  // Filter products by name or price based on search input
  const filteredProducts = summerSetProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.price.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="collection-page">
      {/* Category Navigation Header */}
      <header className="collection-header">
        <Link to="/shop" className="category-link">
          &larr; back to shop
        </Link>

        <h1 className="collection-title">Our Collection</h1>

        <nav className="category-menu">
          <NavLink to="/jackets" className="category-link">
            Jackets
          </NavLink>
          <NavLink to="/dress" className="category-link">
            Dress
          </NavLink>
          <NavLink to="/summer-set" className="category-link">
            Summer Set
          </NavLink>
          <NavLink to="/skirts" className="category-link">
            Skirts
          </NavLink>
        </nav>
      </header>

      {/* 🔍 Search Input Field */}
      <div style={searchContainerStyle}>
        <input
          type="text"
          placeholder="Search summer sets by name or price..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={searchInputStyle}
        />
      </div>

      {/* Product Grid */}
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

                  {/* 🛒 Add to Cart Button */}
                  <button
                    className="add-to-cart-btn"
                    onClick={() => addToCart && addToCart({ ...product, title: product.name })}
                    style={btnStyle}
                  >
                    Add to Cart 🛒
                  </button>
                </div>
              </div>
            </article>
          ))
        ) : (
          <p style={noResultStyle}>No items found matching "{searchTerm}".</p>
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
};

const noResultStyle = {
  textAlign: 'center',
  width: '100%',
  marginTop: '30px',
  color: '#666',
  fontSize: '16px',
};