import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

export default function Shop({ addToCart, isAdmin }) {
  const defaultProducts = [
    { id: '1', title: 'Jacket', price: '$29.99', image: 'https://i.pinimg.com/736x/9f/a6/5a/9fa65af1205c4d52fd61b1055c241235.jpg' },
    { id: '2', title: 'Dress', price: '$99.99', image: 'https://i.pinimg.com/736x/45/ac/16/45ac16d38822efc2be682051d0c4cf8e.jpg' },
    { id: '3', title: 'Summer set', price: '$29.99', image: 'https://i.pinimg.com/736x/af/ab/50/afab500134bec662e9d0b24b60e5f5d7.jpg' },
    { id: '4', title: 'Skirt', price: '$19.99', image: 'https://i.pinimg.com/1200x/f0/bb/d1/f0bbd154846d69042d182705ac153ce5.jpg' },
  ];

  const [products, setProducts] = useState(defaultProducts);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        if (!querySnapshot.empty) {
          const fetchedProducts = querySnapshot.docs.map((docItem) => ({
            id: docItem.id,
            ...docItem.data(),
          }));

          const firestoreIds = new Set(fetchedProducts.map((p) => p.id));
          const uniqueDefaults = defaultProducts.filter((p) => !firestoreIds.has(p.id));

          setProducts([...uniqueDefaults, ...fetchedProducts]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // 🗑️ Delete Product Handler
  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteDoc(doc(db, 'products', id));
      } catch (error) {
        console.warn("Item not in Firestore database or permission restricted:", error);
      }

      setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
    }
  };

  // Safe price formatting helper
  const formatPrice = (price) => {
    if (price === undefined || price === null) return '$0.00';
    const strPrice = String(price).trim();
    return strPrice.startsWith('$') ? strPrice : `$${strPrice}`;
  };

  return (
    <div className="shop-page">
      <section className="collection">
        <h2>Our Top Collection</h2>
        <div className="category-btns">
          <Link to="/jackets" className="category-btn"><button>Jackets</button></Link>
          <Link to="/dress" className="category-btn"><button>Dress</button></Link>
          <Link to="/summer-set" className="category-btn"><button>Summer set</button></Link>
          <Link to="/skirts" className="category-btn"><button>Skirts</button></Link>
        </div>
      </section>

      <div className="products">
        {products.map((product) => (
          <div className="card" key={product.id}>
            <img 
              src={product.image || product.imageUrl || 'https://via.placeholder.com/200?text=No+Image'} 
              alt={product.title || product.name || 'Product'} 
            />
            <h3>{product.title || product.name}</h3>
            <p>{formatPrice(product.price)}</p>
            
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '10px' }}>
              {/* 🛒 Add to Cart Button */}
              <button 
                onClick={() => addToCart && addToCart(product)}
                style={styles.cartBtn}
              >
                Add to Cart 🛒
              </button>

              {/* 🗑️ Delete Button (Admin Only) */}
              {isAdmin && (
                <button 
                  onClick={() => handleDeleteProduct(product.id)}
                  style={styles.deleteBtn}
                >
                  Delete 🗑️
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  cartBtn: {
    backgroundColor: '#ff6f61',
    color: '#fff',
    border: 'none',
    padding: '8px 14px',
    borderRadius: '20px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  deleteBtn: {
    backgroundColor: '#ff4d4d',
    color: '#fff',
    border: 'none',
    padding: '8px 14px',
    borderRadius: '20px',
    fontWeight: 'bold',
    cursor: 'pointer',
  }
};