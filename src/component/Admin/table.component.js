import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Css/table.css";
import "./Css/admin.css";

const App = () => {
  const [selectedTable, setSelectedTable] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAddItemModalOpen, setAddItemModalOpen] = useState(false);
  const [products, setProducts] = useState([ // Assuming initial product data
    { name: "Phở", quantity: 2, price: 50000 },
    { name: "Bún chả", quantity: 1, price: 60000 },
    { name: "Nem rán", quantity: 3, price: 30000 },
  ]);
  const [menuItems, setMenuItems] = useState([]); // Lưu danh sách món ăn từ API
  const [userOrders, setUserOrders] = useState([]); // Lưu đơn hàng của người dùng

  const userId = "someUserId"; // Replace with actual user ID if available

  // Gọi API để lấy danh sách món ăn
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products");
        setMenuItems(response.data); // Lưu danh sách món ăn từ API vào state
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    fetchMenuItems();
  }, []); // Chỉ gọi một lần khi component được mount

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  // Gọi API để lấy đơn hàng của người dùng
  const fetchUserOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/orders/user`);
      setUserOrders(response.data); // Lưu đơn hàng của người dùng vào state
    } catch (error) {
      console.error("Lỗi khi gọi API lấy đơn hàng:", error);
    }
  };

  const openModal = (tableName) => {
    setSelectedTable(tableName);
    setModalOpen(true);
    fetchUserOrders(); // Fetch orders when modal is opened
  };

  const closeModal = () => setModalOpen(false);

  const openAddItemModal = () => setAddItemModalOpen(true);

  const closeAddItemModal = () => setAddItemModalOpen(false);

  const increaseQuantity = (index) => {
    const updatedProducts = [...products];
    updatedProducts[index].quantity += 1;
    setProducts(updatedProducts);
  };

  const decreaseQuantity = (index) => {
    const updatedProducts = [...products];
    if (updatedProducts[index].quantity > 1) {
      updatedProducts[index].quantity -= 1;
      setProducts(updatedProducts);
    }
  };

  const deleteProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  const addProduct = (name, price) => {
    // Update products state
    const newProduct = { name, quantity: 1, price };
    setProducts([...products, newProduct]);
  
    // Update userOrders state (to ensure the new product is also in user orders)
    setUserOrders((prevOrders) => {
      const updatedOrders = [...prevOrders];
      const tableIndex = updatedOrders.findIndex(order => order.table === selectedTable);
      
      // If the table already has an order
      if (tableIndex !== -1) {
        const tableOrder = updatedOrders[tableIndex];
        const existingItemIndex = tableOrder.items.findIndex(item => item.name === name);
        
        if (existingItemIndex !== -1) {
          // If the item already exists, increment the quantity
          tableOrder.items[existingItemIndex].quantity += 1;
        } else {
          // If the item is new to the table, add it to the items
          tableOrder.items.push({ name, price, quantity: 1 });
        }
      } else {
        // If no orders exist for the selected table, create a new order
        updatedOrders.push({
          table: selectedTable,
          items: [{ name, price, quantity: 1 }]
        });
      }
      
      return updatedOrders;
    });
  
    closeAddItemModal();  // Close the modal after adding the product
  };
  
  const approveOrder = async () => {
    try {
      // Chuẩn bị dữ liệu đơn hàng
      const updatedOrder = {
        table: selectedTable,
        items: userOrders.map(order => order.items).flat() // Dữ liệu món ăn từ tất cả đơn hàng
      };
  
      // Gửi yêu cầu duyệt đơn
      const response = await axios.post("http://localhost:5000/orders/approve", updatedOrder);
  
      if (response.status === 200) {
        alert("Đơn hàng đã được duyệt thành công!");
        setUserOrders([]); // Reset đơn hàng
        setModalOpen(false); // Đóng modal
      } else {
        alert("Có lỗi khi duyệt đơn hàng.");
      }
    } catch (error) {
      console.error("Lỗi khi duyệt đơn hàng:", error); // Ghi lại lỗi chi tiết
      alert("Có lỗi xảy ra khi duyệt đơn.");
    }
  };
  

  return (
    <div>
      <div className="sidebar sidebar-table">
        <div>
          <h1>Welcome back, Admin</h1>
        </div>
        <a href="/admin">
          <i className="fas fa-box"></i> Products
        </a>
        <a className="active" href="/table">
          <i className="fas fa-th-large"></i> Table
        </a>
        <a href="/order-admin">
          <i className="fas fa-shopping-cart"></i> Order
        </a>
        <a href="/order-success"><i className="fas fa-shopping-cart"></i>Order Success</a>
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
          <h1>Welcome back, Admin</h1>
        </div>
        <div className="container-table">
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={i}
              className="table"
              onClick={() => openModal(`Table ${i + 1}`)}
            >
              Bàn {i + 1}
            </div>
          ))}
        </div>

        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>
                ×
              </span>
              <h2>{selectedTable}</h2>
              <table>
                <thead>
                  <tr>
                    <th>Tên món</th>
                    <th>Số lượng</th>
                    <th>Giá</th>
                    <th>Tổng tiền</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {userOrders.length > 0 ? (
                    userOrders.map((order, index) => (
                      order.items.map((item, itemIndex) => (
                        <tr key={`${order._id}-${itemIndex}`}>
                          <td>{item.name}</td>
                          <td>{item.quantity}</td>
                          <td>{formatCurrency(item.price)}</td>
                          <td>{formatCurrency(item.quantity * item.price)}</td>
                        <td>
                          <button onClick={() => deleteProduct(index)}>Xóa</button>
                        </td>
                      </tr>
                    ))))
                  ) : (
                    <tr>
                      <td colSpan="5">Chưa có đơn hàng nào</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div>
                <button onClick={approveOrder}>Duyệt đơn</button>
                <button onClick={openAddItemModal}>Thêm món</button>
              </div>
            </div>
          </div>
        )}

        {isAddItemModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeAddItemModal}>
                ×
              </span>
              <h2>Thêm món</h2>
              <div className="grid">
                {menuItems.map((item, index) => (
                  <div key={index} className="card">
                    <img
                      src={require(`/uploads/${item.img}`)}
                      alt={item.name}
                      style={{ width: "100px", height: "100px" }}
                    />
                    <h3>{item.name}</h3>
                    <p>{item.price.toLocaleString()} VND</p>
                    <button onClick={() => addProduct(item.name, item.price)}>
                      Thêm
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
