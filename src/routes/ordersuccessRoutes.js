// routes/ordersuccessRoutes.js
const express = require('express');
const Ordersuccess = require('../models/Ordersuccess'); // Adjust the path if needed
const Orderuser = require('../models/Orderuser');

const router = express.Router();

// Route to handle placing an order
router.post('/place-order', async (req, res) => {
  const { userId, fullName, phoneNumber, email, paymentMethod, items, totalAmount } = req.body;

  const order = new Ordersuccess({
    userId,
    fullName,
    phoneNumber,
    email,
    paymentMethod,
    items,
    totalAmount,
    status: 'pending',
  });

  try {
    // Lưu đơn hàng vào cơ sở dữ liệu
    await order.save();

    // Xóa tất cả dữ liệu trong bảng Orderuser
    await Orderuser.deleteMany();

    res.status(200).send("Order placed successfully and previous orders cleared!");
  } catch (err) {
    console.error("Error saving order:", err.message);
    res.status(500).send(`Failed to place the order: ${err.message}`);
  }
});

module.exports = router;
