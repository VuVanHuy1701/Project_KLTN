const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Endpoint để tạo đơn hàng
router.post('/', async (req, res) => {
  console.log('POST /orders hit'); // Log khi endpoint được gọi
  try {
    const { items, totalAmount } = req.body;
    const newOrder = new Order({ items, totalAmount });
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error placing order:', error.message);
    res.status(500).json({ message: 'Failed to place order', error: error.message });
  }
});


//cập nhật trang thái đơn hàng
router.patch('/orders/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
    res.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order status:', error.message);
    res.status(500).json({ message: 'Failed to update status', error: error.message });
  }
});



  module.exports = router;
