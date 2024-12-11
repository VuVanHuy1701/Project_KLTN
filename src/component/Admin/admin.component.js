import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Button, Container } from 'reactstrap';
import "./admin.css";

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10); // Limit to 10 products per page
  const [searchTerm, setSearchTerm] = useState(""); // State for the search input

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products whenever the search term changes
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) // Match product name
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]); // Re-run filtering when products or search term change

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products');
      setProducts(response.data);
      setFilteredProducts(response.data); // Initially display all products
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

  // Get current products for the page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container>
      <div className="sidebar">
        <a className="active" href="#"><i className="fas fa-th-large"></i> Dashboard</a>
        <a href="#"><i className="fas fa-box"></i> Products</a>
        <a href="/Dh"><i className="fas fa-shopping-cart"></i> My Order</a>
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
              onChange={(e) => setSearchTerm(e.target.value)} // Update the search term
            />
            <i className="fas fa-search"></i>
          </div>
        </div>
        <div className="table-container-s">
          <div className="table-header">
            <h2>Quản lý sản phẩm</h2>
            <p className='total'>Total Products: {filteredProducts.length}</p> {/* Display total filtered product count */}
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
                    <td><img src={require(`/uploads/${product.img}`)} alt={product.name} style={{ width: "100px" }} /></td>
                    <td>{product.countInStock}</td>
                    <td>
                      <Button color="warning">Edit</Button>
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
