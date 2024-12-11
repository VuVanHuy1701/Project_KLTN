const mongoose = require('mongoose');

const orderUserSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // The user ID
  items: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      total: { type: Number, required: true },
      note: { type: String, default: '' }, // Optional note
    }
  ],
  totalAmount: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
  status: { type: String, default: 'pending' }
});

const Orderuser = mongoose.model('Orderuser', orderUserSchema);

module.exports = Orderuser;
