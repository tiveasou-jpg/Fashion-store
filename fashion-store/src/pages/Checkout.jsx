import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { db, auth } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Checkout({ cartItems = [], totalPrice = 0, clearCart }) {
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    phone: '',
    address: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      // Save order details to Firebase Firestore 'orders' collection
      await addDoc(collection(db, 'orders'), {
        userId: auth.currentUser ? auth.currentUser.uid : 'guest',
        userEmail: auth.currentUser ? auth.currentUser.email : 'guest',
        customerName: shippingInfo.name,
        phone: shippingInfo.phone,
        address: shippingInfo.address,
        notes: shippingInfo.notes,
        items: cartItems,
        totalAmount: totalPrice,
        status: 'Pending',
        createdAt: serverTimestamp(),
      });

      alert('🎉 Order placed successfully!');
      
      // Clear cart items if a clear function was passed
      if (clearCart) clearCart();

      // Redirect back to home page
      navigate('/');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Checkout</h2>
        <p style={styles.subtitle}>Enter your details to complete your order</p>

        {/* Form Section */}
        <form onSubmit={handlePlaceOrder} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name *</label>
            <input
              type="text"
              name="name"
              placeholder="e.g. John Doe"
              value={shippingInfo.name}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Phone Number *</label>
            <input
              type="tel"
              name="phone"
              placeholder="e.g. 012 345 678"
              value={shippingInfo.phone}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Shipping Address *</label>
            <textarea
              name="address"
              placeholder="Street address, City..."
              value={shippingInfo.address}
              onChange={handleInputChange}
              required
              rows="3"
              style={{ ...styles.input, resize: 'none' }}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Order Notes (Optional)</label>
            <input
              type="text"
              name="notes"
              placeholder="Special instructions for delivery"
              value={shippingInfo.notes}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>

          {/* Order Summary */}
          <div style={styles.summaryBox}>
            <h3>Order Summary</h3>
            <div style={styles.summaryRow}>
              <span>Total Price:</span>
              <strong>${typeof totalPrice === 'number' ? totalPrice.toFixed(2) : totalPrice}</strong>
            </div>
          </div>

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Placing Order...' : 'Confirm & Place Order'}
          </button>
        </form>

        <div style={{ marginTop: '15px' }}>
          <Link to="/shop" style={styles.backLink}>
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px 20px',
  },
  card: {
    backgroundColor: '#fff0ee',
    padding: '35px 30px',
    borderRadius: '20px',
    maxWidth: '480px',
    width: '100%',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    color: '#666',
    marginBottom: '25px',
    fontSize: '14px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#444',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '15px',
    border: '1px solid #ffded8',
    outline: 'none',
    fontSize: '14px',
    boxSizing: 'border-box',
  },
  summaryBox: {
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '15px',
    marginTop: '10px',
    border: '1px dashed #ff6f61',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '16px',
    marginTop: '5px',
  },
  button: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#ff6f61',
    color: '#fff',
    border: 'none',
    borderRadius: '25px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '10px',
  },
  backLink: {
    color: '#ff6f61',
    textDecoration: 'none',
    fontSize: '14px',
    display: 'block',
    textAlign: 'center',
  },
};