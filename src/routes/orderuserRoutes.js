const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Orderuser = require('../models/Orderuser'); // Assuming Orderuser is defined similarly to Order.

// Endpoint to create an order (for both Order and Orderuser)
router.post('/', async (req, res) => {
  console.log('POST /orders hit'); // Log when the endpoint is called
  try {
    const { items, totalAmount } = req.body;
    
    // Create a new Order document
    const newOrder = new Order({ items, totalAmount });
    const savedOrder = await newOrder.save();

    // Check if Orderuser already exists (assuming we have a user identifier, e.g., userId)
    const userId = req.body.userId; // Get userId from request (ensure it is passed in the frontend)
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
