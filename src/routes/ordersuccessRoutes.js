// routes/ordersuccessRoutes.js
const express = require('express');
const Ordersuccess = require('../models/Ordersuccess'); // Adjust the path if needed

const router = express.Router();

// Route to handle placing an order
router.post('/', async (req, res) => {
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
    await order.save();
    res.status(200).send("Order placed successfully!");
  } catch (err) {
    console.error("Error saving order:", err);
    res.status(500).send("Failed to place the order.");
  }
});

module.exports = router;
