import React, { useState, useEffect } from 'react';
import './home.css'; // Import your CSS file
import { Link } from 'react-router-dom';

const Home = () => {
  // State to manage product information
  const [products, setProducts] = useState([]);

  // Fetch product information from API when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/products'); // Adjust the API endpoint URL as needed
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="home-page">
      {/* Render product cards in a grid */}
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.images} alt={product.name} className="product-image" />
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">₹{product.price}</p>
            </div>

            <Link to={`/products/${product.id}`} className="product-link">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
