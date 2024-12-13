import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container } from "reactstrap";
import "./Css/admin.css";

// Format currency for orders
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

const OrderSuccessPage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    fetchOrders(); // Fetch orders when the component is mounted
  }, []);

  useEffect(() => {
    setFilteredOrders(orders); // Display all orders initially
  }, [orders]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/ordersuccess`); // Use the correct route
      setOrders(response.data); // Update state with fetched orders
      setFilteredOrders(response.data); // Set filtered orders initially
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const [searchTerm, setSearchTerm] = useState(""); // State for the search input

  return (
    <Container>
      <div className="sidebar">
        <div>
          <h1>Welcome back, Admin</h1>
        </div>
        <a href="/admin">
          <i className="fas fa-box"></i> Products
        </a>
        <a href="/table">
          <i className=" active fas fa-th-large"></i> Table
        </a>
        <a href="/order-admin">
          <i className="fas fa-shopping-cart"></i>Order
        </a>
        <a className="active" href="/order-success">
          <i className="fas fa-shopping-cart"></i>Order Success
        </a>
        <a href="#">
          <i className="fas fa-user"></i> User
        </a>
        <a href="#">
          <i className="fas fa-bell"></i> Notifications
        </a>
        <a href="/login-page">
          <i className="fas fa-sign-out-alt"></i> Logout
        </a>
      </div>
      <div className="content">
        <div className="header">
          <h1>Order Success Management</h1>
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

        {/* Order Management Section */}
        <div className="order-management">
          <h2>Order Success Management</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Order ID</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Payment</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total Amount</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, index) =>
                  order.items.map((item, itemIndex) => (
                    <tr key={`${order._id}-${itemIndex}`}>
                      <td>{index + 1}</td>
                      <td>{order._id}</td> {/* Order ID */}
                      <td>{order.fullName}</td> {/* Full Name */}
                      <td>{order.phoneNumber}</td> {/* Phone Number */}
                      <td>{order.email}</td> {/* Email */}
                      <td>{order.paymentMethod}</td> {/* Payment Method */}
                      <td>{item.name}</td> {/* Product Name */}
                      <td>{item.quantity}</td> {/* Quantity */}
                      <td>{formatCurrency(item.price)}</td> {/* Price */}
                      <td>{formatCurrency(item.quantity * item.price)}</td>{" "}
                      {/* Total Amount */}
                      <td>
                        {new Date(order.orderDate).toLocaleString("vi-VN")}
                      </td>{" "}
                      {/* Date-Time */}
                      <td>
                        <Button color="info">View</Button> {/* View Button */}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default OrderSuccessPage;
