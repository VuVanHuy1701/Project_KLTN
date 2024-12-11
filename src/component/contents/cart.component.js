import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './Css/cart.css';

const OrderInfo = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/carts/664d422b63ee97ae2888b892');
      const itemsWithProductData = await Promise.all(
        response.data.map(async (item) => {
          const productResponse = await axios.get(`http://localhost:5000/products/product/${item.productID._id}`);
          return { ...item, product: productResponse.data };
        })
      );
      setCartItems(itemsWithProductData);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }; 

  const handleRemoveItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5000/carts/664d422b63ee97ae2888b892/item/${itemId}`);
      setCartItems((prevCartItems) => prevCartItems.filter((item) => item._id !== itemId));
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleQuantityChange = async (productId, isIncrease) => {
    const endpoint = `http://localhost:5000/carts/664d422b63ee97ae2888b892/item/${productId}`;
    const action = isIncrease ? { action: true } : { action: false };
  
    try {
      await axios.patch(endpoint, action);
      fetchCartItems();
    } catch (err) {
      console.error(err);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.productID.price * item.quantity,
      0
    );
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat('de-DE').format(number);
  };

  // const handlePlaceOrder = async () => {
  //   try {
  //     const orderItems = cartItems.map((item) => ({
  //       name: item.productID.name,
  //       quantity: item.quantity,
  //       price: item.productID.price,
  //       total: item.productID.price * item.quantity,
  //     }));
  //     const totalAmount = calculateTotal();
  
  //     const response = await axios.post('http://localhost:5000/orders', {
  //       items: orderItems,
  //       totalAmount,
  //     });
  
  //     alert('Đơn hàng đã được gửi thành công!');
  //     console.log('Order placed:', response.data); // Log thông tin đơn hàng
  //     setCartItems([]); // Xóa giỏ hàng sau khi đặt hàng
  //   } catch (error) {
  //     console.error('Error placing order:', error.response?.data || error.message);
  //     alert(`Gửi đơn hàng thất bại: ${error.response?.data?.message || error.message}`);
  //   }
  // };

  const handlePlaceOrder = async () => {
    try {
      const orderItems = cartItems.map((item) => ({
        name: item.productID.name,
        quantity: item.quantity,
        price: item.productID.price,
        total: item.productID.price * item.quantity,
        note: item.note || 'Không có ghi chú', // Include the note
      }));
      const totalAmount = calculateTotal();
  
      // Gửi yêu cầu tạo đơn hàng
      const response = await axios.post('http://localhost:5000/orders', {
        items: orderItems,
        totalAmount,
      });
  
      // Gửi yêu cầu xóa tất cả các sản phẩm trong giỏ hàng
      await axios.delete('http://localhost:5000/carts/clear');
  
      alert('Đơn hàng đã được gửi thành công!');
      setCartItems([]); // Xóa giỏ hàng trong giao diện
    } catch (error) {
      console.error('Error placing order:', error.response?.data || error.message);
      alert(`Gửi đơn hàng thất bại: ${error.response?.data?.message || error.message}`);
    }
  };
  
  
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="order-info-container">
      <div className="header">
        <h1 className="title">THÔNG TIN ĐƠN HÀNG</h1>
      </div>

      <div className="p-4 h-[calc(100%-8rem)] overflow-auto">
      {cartItems.map((item, index) => (
          <div key={index} className="order-item">
            <img 
              alt="Shopping item"
              className="item-img"  
              src={item.productID.img ? require(`/uploads/${item.productID.img}`) : ''} />
            <div className="item-details">
              <h2 className="item-title">{item.productID.name}</h2>
              <p className="item-note">Ghi chú: {item.note || 'Không có ghi chú'}</p>
              <div className="item-actions">
                <button
                  className="action-button"
                  onClick={() => handleQuantityChange(item.productID._id, false)}
                  disabled={item.quantity <= 1}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <p className="text-blue-500 mx-2">
                 x {item.quantity}
                </p>
                <button
                  className="action-button"
                  onClick={() => handleQuantityChange(item.productID._id, true)}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            </div>
            <div className="text-right">
              <p className="item-price">{formatNumber(item.productID.price * item.quantity)}</p>
              <button className="trash-button" onClick={() => handleRemoveItem(item.productID._id)}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="footer">
  <button onClick={handlePlaceOrder} className="text-lg font-bold btn btn-send">
    Gửi Đơn
  </button>
</div>

      <div className="total-container">
        <p className="total-amount">
          Tổng cộng: {calculateTotal()} VND
        </p>
      </div>
    </div>
  );
};

export default OrderInfo;
