// const express = require('express');
// const router = express.Router();
// const Order = require('../models/Order');

// // Endpoint để tạo đơn hàng
// router.post('/', async (req, res) => {
//   console.log('POST /orders hit'); // Log khi endpoint được gọi
//   try {
//     const { items, totalAmount } = req.body;
//     const newOrder = new Order({ items, totalAmount });
//     const savedOrder = await newOrder.save();
//     res.status(201).json(savedOrder);
//   } catch (error) {
//     console.error('Error placing order:', error.message);
//     res.status(500).json({ message: 'Failed to place order', error: error.message });
//   }
// });


// //cập nhật trang thái đơn hàng
// router.patch('/orders/:id/status', async (req, res) => {
//   try {
//     const { status } = req.body;
//     const updatedOrder = await Order.findByIdAndUpdate(
//       req.params.id,
//       { status },
//       { new: true }
//     );
//     if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
//     res.json(updatedOrder);
//   } catch (error) {
//     console.error('Error updating order status:', error.message);
//     res.status(500).json({ message: 'Failed to update status', error: error.message });
//   }
// });

//   module.exports = router;



const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Orderuser = require('../models/Orderuser'); // Ensure you have the Orderuser model

// Endpoint to create an order
router.post('/', async (req, res) => {
  console.log('POST /orders hit'); // Log when the endpoint is called
  try {
    const { items, totalAmount, userId } = req.body; // Add userId from request body

    // Create a new Order document
    const newOrder = new Order({ items, totalAmount });
    const savedOrder = await newOrder.save();

    // Check if Orderuser already exists (assuming we have a user identifier, e.g., userId)
    const existingOrderUser = await Orderuser.findOne({ userId });

    if (existingOrderUser) {
      // Update the existing Orderuser by adding new items
      existingOrderUser.items = [...existingOrderUser.items, ...items];
      existingOrderUser.totalAmount += totalAmount; // Update the total amount
      const updatedOrderUser = await existingOrderUser.save();
      res.status(201).json({ order: savedOrder, orderUser: updatedOrderUser });
    } else {
      // Create a new Orderuser if one doesn't exist
      const newOrderUser = new Orderuser({
        userId,
        items,
        totalAmount,
      });
      const savedOrderUser = await newOrderUser.save();
      res.status(201).json({ order: savedOrder, orderUser: savedOrderUser });
    }
  } catch (error) {
    console.error('Error placing order:', error.message);
    res.status(500).json({ message: 'Failed to place order', error: error.message });
  }
});

// Endpoint to update order status
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
