// PaymentPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Css/checkout.css';

const PaymentPage = ({ userId }) => {
  const navigate = useNavigate(); // Initialize navigate
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [promoCode, setPromoCode] = useState("");
  const [discountedTotal, setDiscountedTotal] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    paymentMethod: "",
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/orders');
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load orders");
        setLoading(false);
      }
    };
    fetchOrders();
  }, [userId]);

  useEffect(() => {
    const total = orders.reduce((sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + item.price * item.quantity, 0), 0);
    if (promoCode === "MIKAY") {
      setDiscountedTotal(total * 0.9);
    } else {
      setDiscountedTotal(total);
    }
  }, [promoCode, orders]);

  const [submitLoading, setSubmitLoading] = useState(false);

  const handleSubmit = async () => {
    // Kiểm tra thông tin bắt buộc
    if (!formData.fullName || !formData.phoneNumber || !formData.email || !formData.paymentMethod) {
      alert("Vui lòng điền đầy đủ thông tin Họ tên, Số điện thoại, Email, và chọn Hình thức thanh toán.");
      return;
    }
  
    setSubmitLoading(true);
    try {
      const orderDetails = {
        userId,
        ...formData,
        items: orders.flatMap(order => order.items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          total: item.price * item.quantity,
        }))),
        totalAmount: discountedTotal,
        paymentMethod: formData.paymentMethod,
      };
  
      const response = await axios.post('http://localhost:5000/ordersuccess/place-order', orderDetails);
      if (response.status === 200) {
        alert("Order placed successfully!");
        setOrders([]); // Clear cart items from the UI([]); // Clear cart items from the UI
        navigate('/product'); 
      }
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Failed to place the order.");
    } finally {
      setSubmitLoading(false);
    }
  };
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const total = orders.reduce((sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + item.price * item.quantity, 0), 0);

  return (
    <div className="checkout-container">
      <div className="title">
        <img src="https://storage.googleapis.com/a1aa/image/1dCxduVrJGr4GJfeeN4KXIXtNerjoop0ipQWqbPFZegSfETeJA.jpg" alt="Payment Icon" width="50" height="50" />
        <h1>Thanh toán</h1>
        <p>Vui lòng kiểm tra thông tin Khách hàng, thông tin Giỏ hàng trước khi Đặt hàng.</p>
      </div>
      <div className="form-container">
        <div className="form-group-checkout">
          <label htmlFor="name">Họ tên</label>
          <input
            id="name"
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />
          <label htmlFor="phone">Điện thoại</label>
          <input
            id="phone"
            type="text"
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
          />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <div className="payment-methods">
            <label>Hình thức thanh toán</label>
            <br />
            <input
              type="radio"
              id="cash"
              name="payment"
              value="cash"
              onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
            />
            <label htmlFor="cash">Tiền mặt</label>
            <br />
            <input
              type="radio"
              id="transfer"
              name="payment"
              value="transfer"
              onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
            />
            <label htmlFor="transfer">Chuyển khoản</label>
            <br />
            <input
              type="radio"
              id="cod"
              name="payment"
              value="cod"
              onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
            />
            <label htmlFor="cod">Ship COD</label>
          </div>
        </div>
        <div className="cart">
          <h2>Giỏ hàng <span>({orders.reduce((count, order) => count + order.items.length, 0)})</span></h2>
          <table>
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Số lượng</th>
                <th>Giá</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                order.items.map((item, itemIndex) => (
                  <tr key={`${index}-${itemIndex}`}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price.toLocaleString()}</td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
          <div className="total">Tổng thành tiền: {total.toLocaleString()}</div>
          {promoCode === "MIKAY" && <div className="discount">Giảm giá: -{(total * 0.2).toLocaleString()}</div>}
          <div className="final-total">Tổng tiền sau giảm: {discountedTotal.toLocaleString()}</div>
          <div className="promo-code">
            <input 
              type="text" 
              placeholder="Mã khuyến mãi" 
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="submit-btn">
  <button onClick={handleSubmit} disabled={submitLoading}>
    {submitLoading ? "Đang xử lý..." : "Đặt hàng"}
  </button>
</div>

    </div>
  );
};

export default PaymentPage;
