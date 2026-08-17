import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function JacketsPage({ addToCart }) {
  const products = [
  { id: 1, name: 'Denim Jacket', price: '$45.99', image: 'https://www1.assets-gap.com/webcontent/0062/242/045/cn62242045.jpg?q=h&w=768' },
  { id: 2, name: 'Bomber Jacket', price: '$59.99', image: 'https://www.alphaindustries.com/cdn/shop/files/ma-1-bomber-jacket-slim-fit-outerwear-cedar-red-xs-258670.jpg?v=1756747070&width=3840' },
  { id: 3, name: 'Trench Coat', price: '$64.99', image: 'https://cdn.saksfifthavenue.com/is/image/saks/0400026877291_BEIGEKHAKI?wid=380&hei=506&qlt=70&resMode=sharp2&op_usm=1.2,1,6,0' },
  { id: 4, name: 'Classic Trench', price: '$79.99', image: 'https://assets.burberry.com/is/image/Burberryltd/B1BBD7E2-2E10-42F4-9533-53109D309658?$BBY_V3_SL_1.275$&wid=581&hei=739' },
  { id: 5, name: 'Utility Jacket', price: '$52.00', image: 'https://www.schoffelcountry.com/cdn/shop/files/womens-lynton-utility-jacket-20-2234-6680-green-cutout-01.png?v=1765901308&width=2000' },
  { id: 6, name: 'Wool Blazer', price: '$49.99', image: 'https://media.stories.com/assets/005/c8/04/c804a37a19f023c151f07de09aa96a307c7533fe_xxl-1.jpg?imwidth=2560' },
  { id: 7, name: 'Puffer Coat', price: '$55.50', image: 'https://media.soliver.com/i/soliver/2161342.9999_flat?fmt=auto&qlt=default&scale=clamp&w=1024' },
  { id: 8, name: 'Cropped Jacket', price: '$36.00', image: 'https://image.hm.com/assets/hm/ca/87/ca8710e28846325a97abb8d8f81c321facc4b116.jpg' },
  { id: 9, name: 'Fleece Jacket', price: '$34.99', image: 'https://image.hm.com/assets/hm/8c/c5/8cc5dfa1df75821006d2e16351a0492ad8b8ed17.jpg' },
  { id: 10, name: 'Over-Shirt', price: '$38.50', image: 'https://image.hm.com/assets/hm/b8/bc/b8bc7bc8b015b320b5a6419fc022754ebcfa2373.jpg' },
  { id: 11, name: 'Cargo Jacket', price: '$42.99', image: 'https://image.hm.com/assets/hm/fd/80/fd8045bb9b1f00bec08ccece950648de3a2f9153.jpg' },
  { id: 12, name: 'Suede Jacket', price: '$54.99', image: 'https://image.hm.com/assets/hm/81/7e/817e10e532347643872af7ab0a2754cd5560dd73.jpg' },
  { id: 13, name: 'Leather Biker', price: '$68.00', image: 'https://m.media-amazon.com/images/I/61XTCJVwEtL._AC_UY350_.jpg' },
  { id: 14, name: 'Casual Blazer', price: '$44.50', image: 'https://image.hm.com/assets/hm/4b/8d/4b8d77e63aed21bcd9e311c8e0f2e75d96b24318.jpg' },
  { id: 15, name: 'Windbreaker', price: '$29.99', image: 'https://image.hm.com/assets/hm/c8/b0/c8b0c9e7a65a4337ae3b21c9694f87ba47ae6f2a.jpg' },
  { id: 16, name: 'Quilted Coat', price: '$46.99', image: 'https://i5.walmartimages.com/asr/b90f6f1f-616f-44af-88e5-df245591e90a.52160d8bbbb109bd7c9dd77db7b2f11d.jpeg' },
  { id: 17, name: 'Oversized Jean', price: '$48.00', image: 'https://img.kwcdn.com/product/fancy/d5b77ac2-80c2-460a-a5b9-7ce6c83a5c75.jpg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/webp' },
  { id: 18, name: 'Parka Coat', price: '$58.50', image: 'https://cdn-images.farfetch-contents.com/34/33/77/51/34337751_65669592_300.jpg' },
  { id: 19, name: 'Rain Jacket', price: '$35.50', image: 'https://www.rei.com/media/323261f6-e1cb-4680-a9fc-6c0e915de167.jpg' },
  { id: 20, name: 'Track Jacket', price: '$32.99', image: 'https://www.outdoorresearch.com/cdn/shop/files/3008943000E1.png?v=1770146394&width=1946' },
  { id: 21, name: 'Corduroy Jacket', price: '$47.50', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJX0EmotDjFXC5CUYmZtJxDr5NQmjsrdj3bA&s' },
  { id: 22, name: 'Short Trench', price: '$51.00', image: 'https://image.hm.com/assets/hm/7a/b6/7ab6d2a1e79310b735fb85bda7b89d3c6ab28ca9.jpg' },
  { id: 23, name: 'Padded Vest', price: '$28.99', image: 'https://img01.ztat.net/article/spp-media-p1/ce3590233d624de28d585ec0099b4cd5/9b1515f942594e8b905b4d4f4b2dfc2a.jpg?imwidth=300&filter=packshot' },
  { id: 24, name: 'Open Front Coat', price: '$39.00', image: 'https://image.hm.com/assets/hm/73/91/7391490954a72299090f1c4c2210689ce87aa59e.jpg' },
  { id: 25, name: 'Shearling Coat', price: '$68.99', image: 'https://cdn-images.farfetch-contents.com/33/33/88/68/33338868_64009661_300.jpg' },
  { id: 26, name: 'Crop Blazer', price: '$43.50', image: 'https://static.zara.net/assets/public/aebd/7e59/93b244b79d14/4f1ab6b0a7dd/00108022505-f1/00108022505-f1.jpg?ts=1772701684835&w=352' },
  { id: 27, name: 'Zip Utility', price: '$41.00', image: 'https://image.hm.com/assets/hm/fd/80/fd8045bb9b1f00bec08ccece950648de3a2f9153.jpg' },
  { id: 28, name: 'Anorak Jacket', price: '$44.99', image: 'https://img4.dhresource.com/webp/m/0x0/f3/albu/jc/j/24/c2c66998-7981-4004-a364-7696cb23b41c.jpg' },
  { id: 29, name: 'Faux Fur Coat', price: '$62.00', image: 'https://i.pinimg.com/1200x/92/8a/cb/928acba02052647bcfa3fdf18cdc6c36.jpg' },
  { id: 30, name: 'Moto Jacket', price: '$57.99', image: 'https://i.pinimg.com/1200x/04/3a/e4/043ae4c8e4286a643c67dd37b0ade162.jpg' }
];

  // State to hold search query
  const [searchTerm, setSearchTerm] = useState('');

  // Filter products by name or price based on search input
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.price.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="jackets-page">
      {/* Category Navigation Header */}
      <header className="collection-header">
        <Link to="/shop" className="category-link">
          &lt;-- back to shop
        </Link>

        <h1 className="collection-title">Our Collection</h1>
        <nav className="category-menu">
          <NavLink to="/jackets" className="category-link">Jackets</NavLink>
          <NavLink to="/dress" className="category-link">Dress</NavLink>
          <NavLink to="/summer-set" className="category-link">summer set</NavLink>
          <NavLink to="/skirts" className="category-link">skirts</NavLink>
        </nav>
      </header>

      {/* 🔍 Search Input */}
      <div style={searchContainerStyle}>
        <input
          type="text"
          placeholder="Search jackets by name or price..."
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
          <p style={noResultStyle}>No jackets found matching "{searchTerm}".</p>
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
  width: '100%'
};

const noResultStyle = {
  textAlign: 'center',
  width: '100%',
  marginTop: '30px',
  color: '#666',
  fontSize: '16px',
};