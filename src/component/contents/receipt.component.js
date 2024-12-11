import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Css/receipt.css'; // Include relevant CSS

// Function to format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

const IndexReceipt = () => {
  const [orders, setOrders] = useState([]); // State to store all orders
  const [filteredOrders, setFilteredOrders] = useState([]); // State to store filtered orders
  const [searchTerm, setSearchTerm] = useState(''); // State for the search input

  useEffect(() => {
    fetchOrders(); // Fetch orders when the component is mounted
  }, []);

  useEffect(() => {
    // Filter orders whenever the search term changes
    const filtered = orders.filter((order) =>
      order.userId.toLowerCase().includes(searchTerm.toLowerCase()) // Match userId
    );
    setFilteredOrders(filtered); // Update displayed orders
  }, [searchTerm, orders]); // Re-run filtering when search term or orders change

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/orders'); // API URL to fetch orders
      setOrders(response.data);
      setFilteredOrders(response.data); // Initialize filtered orders
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <div className="receipt-container">


      {/* Display filtered orders */}
      {filteredOrders.length > 0 ? (
        filteredOrders.map((order) => (
          <div className="receipt-card" key={order._id}>
            <div className="text-top">
              <h1 className="store-name">TIỆM MÌ KAYYY</h1>
              <p className="store-info">Đường Số 24 KDC An Khánh, P. An Khánh, TP.HCM</p>
              <p className="store-info">ĐT: 0974.300.007 - 0909.191.195</p>
            </div>
            <div className="text-center font-bold mt-4">
              <p>HÓA ĐƠN BÁN HÀNG</p>
              <p>Bàn {order.tableNumber}</p>
            </div>
            <div className="flex justify-between">
              <p>Ngày: {new Date(order.orderDate).toLocaleDateString('vi-VN')}</p>
              <p>Giờ: {new Date(order.orderDate).toLocaleTimeString('vi-VN')}</p>
            </div>
            <div className="">
              <p>Ghi chú: {order.note || "Không có"}</p>
            </div>
            <table className="table">
              <thead>
                <tr className="table-header">
                  <th className="table-cell">Mặt hàng</th>
                  <th className="table-cell">SL</th>
                  <th className="table-cell">Giá</th>
                  <th className="table-cell">T tiền</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, index) => (
                  <tr className="table-row" key={index}>
                    <td className="table-cell">{item.name}</td>
                    <td className="table-cell">{item.quantity}</td>
                    <td className="table-cell">{formatCurrency(item.price)}</td>
                    <td className="table-cell">{formatCurrency(item.price * item.quantity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between font-bold mt-4">
              <p>Tổng:</p>
              <p>{formatCurrency(order.totalAmount)}</p>
            </div>
            <div className="text-center mt-4">
              <p>Cảm ơn Quý khách. Hẹn gặp lại!</p>
            </div>
            <button className="text-lg font-bold btn btn-send">
    Thanh Toán
  </button>
          </div>
        ))
      ) : (
        <p>No orders found</p> // Display message when no orders match the search term
      )}
    </div>
  );
};

export default IndexReceipt;
