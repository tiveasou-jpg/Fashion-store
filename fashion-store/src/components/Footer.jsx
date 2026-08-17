import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase'; // Ensure firebase.js is in src/
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);

    try {
      // Save subscriber email to Firestore in 'subscribers' collection
      await addDoc(collection(db, 'subscribers'), {
        email: email,
        subscribedAt: serverTimestamp()
      });

      alert("Thank you for subscribing!");
      setEmail(''); // Clear input box
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <h2>Fashion Store</h2>
          <p>Discover the latest fashion trends and express your unique style.</p>
        </div>

        <div className="footer-links">
          <h3>Shop</h3>
          <ul>
            <li><Link to="/jackets">Jackets</Link></li>
            <li><Link to="/dress">Dress</Link></li>
            <li><Link to="/summer-set">Summer set</Link></li>
            <li><Link to="/skirts">Skirts</Link></li>
          </ul>
        </div>

        <div className="footer-links">
          <h3>Company</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-newsletter">
          <h3>Newsletter</h3>
          <p>Subscribe for new arrivals and special offers.</p>
          <form onSubmit={handleSubscribe}>
            <input 
              type="email" 
              placeholder="Your Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Fashion Store | Designed with ❤</p>
      </div>
    </footer>
  );
}