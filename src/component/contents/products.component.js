import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component'; // Import LazyLoadImage
import 'react-lazy-load-image-component/src/effects/blur.css'; // Optional: Blur effect for lazy images
import './Css/menu.css';

const formatNumber = (number) => {
  return new Intl.NumberFormat('de-DE').format(number);
};

const IndexProduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products');
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return description.slice(0, maxLength) + "... read more";
    }
    return description;
  };

  return (
    <div className="menu">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <a href={`/detail/${product._id}`} className="menu-item" key={product._id}>
            <LazyLoadImage
              className="img-food"
              src={require(`/uploads/${product.img}`)}
              alt={truncateDescription(product.name, 20)}
              effect="blur" // Add blur effect while loading
            />
            <div className="description">{truncateDescription(product.name, 30)}</div>
            <div className="price">{formatNumber(product.price)}</div>
          </a>
        ))
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
};

export default IndexProduct;
