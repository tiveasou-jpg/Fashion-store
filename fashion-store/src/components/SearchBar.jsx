import React, { useState } from 'react';

export default function SearchBar({ products, onFilter }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase()) ||
      product.price.toLowerCase().includes(value.toLowerCase())
    );

    onFilter(filtered);
  };

  return (
    <div style={searchContainerStyle}>
      <input
        type="text"
        placeholder="Search products by name or price..."
        value={searchTerm}
        onChange={handleSearch}
        style={searchInputStyle}
      />
    </div>
  );
}

const searchContainerStyle = {
  margin: '20px auto',
  maxWidth: '400px',
  textAlign: 'center',
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