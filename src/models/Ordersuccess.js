const mongoose = require('mongoose');

const orderSuccessSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // The user ID
  fullName: { type: String, required: true }, // Full name of the user
  phoneNumber: { type: String, required: true }, // Phone number
  email: { type: String, required: true }, // Email address
  paymentMethod: { type: String, required: true }, // Payment method, e.g., 'cash', 'credit card'
  items: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      total: { type: Number, required: true }, 
    }
  ],
  totalAmount: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
  status: { type: String, default: 'pending' } // Order status
}, { collection: 'Ordersuccess' }); // Specify the collection name

const Ordersuccess = mongoose.model('Ordersuccess', orderSuccessSchema);

module.exports = Ordersuccess;
