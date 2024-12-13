import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Css/menu.css'; 

// Function to format numbers as currency
const formatNumber = (number) => {
  return new Intl.NumberFormat('de-DE').format(number);
};

const IndexProduct = () => {
  const [products, setProducts] = useState([]); // State to store all products
  const [filteredProducts, setFilteredProducts] = useState([]); // State to store filtered products based on search term
  const [searchTerm, setSearchTerm] = useState(''); // State for the search input

  useEffect(() => {
    fetchProducts(); // Fetch product s when the component is mounted
  }, []);

  useEffect(() => {
    // Filter products whenever the search term changes
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) // Match product name
    );
    setFilteredProducts(filtered); // Update the displayed products
  }, [searchTerm, products]); // Re-run filtering when search term or products change

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products'); // API URL to fetch products
      setProducts(response.data);
      setFilteredProducts(response.data); // Initialize filtered products
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return description.slice(0, maxLength) + "... read more"; // Truncate description if it's too long
    }
    return description;
  };

  return (
    <div className="menu">
      {/* Search input at the top */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term as user types
        />
      </div>

      {/* Display filtered products */}
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <a href={`/detail/${product._id}`} className="menu-item" key={product._id}>
            <img
              className="img-food"
              src={require(`/uploads/${product.img}`)}
              alt={truncateDescription(product.name, 20)}
            />
            <div className="description">{truncateDescription(product.name, 30)}</div>
            <div className="price">{formatNumber(product.price)}</div>
          </a>
        ))
      ) : (
        <p>No products found</p> // Display message when no products match the search term
      )}
    </div>
  );
};

export default IndexProduct;
