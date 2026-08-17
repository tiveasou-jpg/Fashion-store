import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth, db } from './firebase.js'; 
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import Header from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Pages
import Admin from './pages/Admin.jsx';
import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import Jackets from './pages/Jackets.jsx';
import Dress from './pages/Dress.jsx';
import SummerSet from './pages/SummerSet.jsx';
import Skirts from './pages/Skirts.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Checkout from './pages/Checkout.jsx';

export default function App() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  // Verify whether the logged-in account has admin rights
  const checkAdminStatus = async (currentUser) => {
    if (!currentUser) {
      setIsAdmin(false);
      return;
    }

    // 1. Fallback / Direct username check
    const userIdentifier = currentUser.email?.split('@')[0]?.toLowerCase() || '';
    if (userIdentifier === 'tyy' || currentUser.email === 'tyy@gmail.com') {
      setIsAdmin(true);
      return;
    }

    // 2. Fetch role from Firestore Database
    try {
      const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
      if (userDoc.exists() && userDoc.data().role === 'admin') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      console.error("Error fetching admin status from Firestore:", error);
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await checkAdminStatus(currentUser);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (userData) => {
    setUser(userData);
    if (userData) {
      await checkAdminStatus(userData);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsAdmin(false);
      alert("Logged out successfully!");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    const itemName = product.name || product.title || 'Item';
    alert(`${itemName} added to cart!`);
  };

  const clearCart = () => setCart([]);

  const totalPrice = cart.reduce((sum, item) => {
    const numericPrice = typeof item.price === 'number'
      ? item.price
      : parseFloat(String(item.price).replace(/[^0-9.]/g, '')) || 0;
    return sum + numericPrice;
  }, 0);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px', fontSize: '18px' }}>
        Loading application...
      </div>
    );
  }

  return (
    <Router basename="/Fashion-store">
      <div className="container">
        <Header 
          cartCount={cart.length} 
          user={user} 
          isAdmin={isAdmin} 
          onLogout={handleLogout} 
        />
        
        <Routes>
          {/* 🔒 Admin Route */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute user={user} isAdmin={isAdmin}>
                <Admin />
              </ProtectedRoute>
            } 
          />

          <Route path="/" element={<Home />} />
          
          <Route 
            path="/shop" 
            element={<Shop addToCart={addToCart} user={user} isAdmin={isAdmin} />} 
          />
          
          <Route path="/jackets" element={<Jackets addToCart={addToCart} />} />
          <Route path="/dress" element={<Dress addToCart={addToCart} />} />
          <Route path="/summer-set" element={<SummerSet addToCart={addToCart} />} />
          <Route path="/skirts" element={<Skirts addToCart={addToCart} />} />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          
          <Route 
            path="/checkout" 
            element={
              <Checkout 
                cartItems={cart} 
                totalPrice={totalPrice} 
                clearCart={clearCart} 
              />
            } 
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}