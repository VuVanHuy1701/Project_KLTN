const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      total: { type: Number, required: true },
      note: { type: String, required: true }  // Add the note field
    }
  ],
  totalAmount: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
  status: { type: String, default: 'pending' } // Trạng thái đơn hàng
});


const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
