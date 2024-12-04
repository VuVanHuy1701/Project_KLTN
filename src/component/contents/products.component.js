import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './Css/menu.css';

const formatNumber = (number) => {
    return new Intl.NumberFormat('de-DE').format(number);
  };

const IndexProduct = () => {
    const [products, setProducts] = useState([]); // Lưu danh sách sản phẩm

  useEffect(() => {
    fetchProducts(); // Gọi API để lấy sản phẩm khi component được render
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products'); // Đường dẫn API
      setProducts(response.data);
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
            {products.map((product) => (
                // <a href={`/detail/${item.id}`} className="menu-item" key={item.id}> link đến ID sản phẩm
                <a href={`/detail/${product._id}`} className="menu-item" key={product._id}>
                    <img className='img-food' src={require(`../assets/foodImg/${product.img}`)} alt={truncateDescription(product.name, 20)} />
                    <div className="description">{truncateDescription(product.name, 30)}</div>
                    <div className="price">{formatNumber(product.price)}</div>
                </a>
            ))}
        </div>
    );
}; 

export default IndexProduct;
