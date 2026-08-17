import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function Navbar({ cartCount = 0, user, isAdmin, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Searching for: ${searchQuery}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="navbar-header">
      {/* 1. Logo link pointing to Home */}
      <div className="logo">
        <NavLink to="/Fashion"onClick={closeMenu}>Fashion</NavLink>
      </div>

      <button 
        className={`hamburger ${isOpen ? 'active' : ''}`} 
        onClick={toggleMenu}
        aria-label="Toggle navigation"
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      <nav className={`nav-menu ${isOpen ? 'open' : ''}`}>
        <NavLink to="/" onClick={closeMenu}>Home</NavLink>
        <NavLink to="/shop" onClick={closeMenu}>Shop</NavLink>
        <NavLink to="/about" onClick={closeMenu}>About</NavLink>
        <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
        
        {/* 🔒 Admin link visible only when logged in and isAdmin === true */}
        {user && isAdmin && (
          <NavLink 
            to="/admin" 
            onClick={closeMenu}
            style={{
              backgroundColor: '#FFF0ED',
              color: '#FF6B52',
              borderRadius: '25px',
              padding: '6px 18px',
              fontWeight: '700',
              textDecoration: 'none',
              display: 'inline-block'
            }}
          >
            Admin
          </NavLink>
        )}
      </nav>

      <div className="icons" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        {/* Interactive Search Input / Icon */}
        {showSearch ? (
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <input 
              type="text" 
              placeholder="Search store..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: '6px 12px',
                borderRadius: '15px',
                border: '1px solid #ff6f61',
                outline: 'none',
                fontSize: '13px'
              }}
              autoFocus
            />
            <button 
              type="button" 
              onClick={() => setShowSearch(false)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', color: '#888' }}
            >
              ✕
            </button>
          </form>
        ) : (
          <span 
            role="img" 
            aria-label="search" 
            onClick={() => setShowSearch(true)} 
            style={{ cursor: 'pointer' }}
            title="Search"
          >
            🔍
          </span>
        )}

        {/* Cart Icon linked to /checkout */}
        <Link to="/checkout" onClick={closeMenu} title="Shopping Cart" style={{ textDecoration: 'none', position: 'relative', display: 'flex', alignItems: 'center' }}>
          <span role="img" aria-label="cart" style={{ cursor: 'pointer' }}>🛒</span>
          {cartCount > 0 && (
            <span style={{
              backgroundColor: '#ff6f61',
              color: '#fff',
              borderRadius: '50%',
              padding: '2px 6px',
              fontSize: '11px',
              marginLeft: '4px',
              fontWeight: 'bold'
            }}>
              {cartCount}
            </span>
          )}
        </Link>

        {/* 👤 Account / Logout Button */}
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#ff6f61' }}>
              👤 {user.email?.split('@')[0]}
            </span>
            <button 
              onClick={onLogout} 
              style={{ 
                padding: '4px 10px', 
                backgroundColor: '#ff4d4d', 
                color: '#fff', 
                border: 'none', 
                borderRadius: '6px', 
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" onClick={closeMenu} title="Login / Account" style={{ textDecoration: 'none' }}>
            <span role="img" aria-label="profile" style={{ cursor: 'pointer' }}>👤</span>
          </Link>
        )}
      </div>
    </header>
  );
}