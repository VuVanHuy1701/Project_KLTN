import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Button, Container } from 'reactstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component'; // Import LazyLoadImage
import 'react-lazy-load-image-component/src/effects/blur.css'; // Optional: Blur effect
import "./Css/admin.css";

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(product =>
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

  const handleRemoveItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5000/products/product/delete/${itemId}`);
      setProducts(products.filter(item => item._id !== itemId));
      setFilteredProducts(filteredProducts.filter(item => item._id !== itemId));
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container>
      <div className="sidebar">
        <h1>Welcome back, Admin</h1>
        <a className="active" href="/admin"><i className="fas fa-box"></i> Products</a>
        <a href="/table"><i className="active fas fa-th-large"></i> Table</a>
        <a href="/order-admin"><i className="fas fa-shopping-cart"></i>Order</a>
        <a href="/order-success"><i className="fas fa-shopping-cart"></i>Order Success</a>
        <a href="#"><i className="fas fa-user"></i> User</a>
        <a href="#"><i className="fas fa-bell"></i> Notifications</a>
        <a href="/login-page"><i className="fas fa-sign-out-alt"></i> Logout</a>
      </div>

      <div className="content">
        <div className="header">
          <h1>Welcome back, Admin</h1>
          <div className="search">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fas fa-search"></i>
          </div>
        </div>
        <div className="table-container-s">
          <div className="table-header">
            <h2>Quản lý sản phẩm</h2>
            <p className="total">Total Products: {filteredProducts.length}</p>
          </div>
          <Button className="add-button" tag={Link} to="/insert">+ Add New Product</Button>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Image</th>
                  <th>Count In Stock</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.map((product, index) => (
                  <tr key={product._id}>
                    <td>{indexOfFirstProduct + index + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>
                      {/* LazyLoadImage for Lazy Loading */}
                      <LazyLoadImage
                        src={require(`/uploads/${product.img}`)}
                        alt={product.name}
                        effect="blur" // Add blur effect while loading
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>{product.countInStock}</td>
                    <td>
                      <Button color="warning">
                        <Link to="/insert" state={{ product }}>Edit</Link>
                      </Button>
                      <Button color="danger" onClick={() => handleRemoveItem(product._id)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                disabled={currentPage === index + 1}
                className={currentPage === index + 1 ? 'active' : ''}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AdminPage;
