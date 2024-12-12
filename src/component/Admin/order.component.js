import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Button, Container } from 'reactstrap';
import "./Css/admin.css";

// Format currency for orders
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOrderTerm, setSearchOrderTerm] = useState(""); // State for order search input

  useEffect(() => {
    fetchProducts();
    fetchOrders(); // Fetch orders when the component is mounted
  }, []);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  useEffect(() => {
    const filtered = orders.filter(order =>
      order.userId.toLowerCase().includes(searchOrderTerm.toLowerCase()) // Match userId in orders
    );
    setFilteredOrders(filtered);
  }, [searchOrderTerm, orders]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products');
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/orders');
      setOrders(response.data);
      setFilteredOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
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
        <a className="active" href="#"><i className="fas fa-box"></i> Products</a>
        <a href="#"><i className="fas fa-th-large"></i> Dashboard</a>
        <a href="/Dh"><i className="fas fa-shopping-cart"></i> Order</a>
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

        {/* Order Management Section */}
        <div className="order-management">
          <h2>Order Management</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>User ID</th>
                  <th>Table</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Total Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order, index) => (
                    <tr key={order._id}>
                      <td>{index + 1}</td>
                      <td>{order.userId}</td>
                      <td>{order.tableNumber}</td>
                      <td>{new Date(order.orderDate).toLocaleDateString('vi-VN')}</td>
                      <td>{new Date(order.orderDate).toLocaleTimeString('vi-VN')}</td>
                      <td>{formatCurrency(order.totalAmount)}</td>
                      <td>
                        <Button color="info">View</Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No orders found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Product Management Section */}
        
      </div>
    </Container>
  );
};

export default AdminPage;
