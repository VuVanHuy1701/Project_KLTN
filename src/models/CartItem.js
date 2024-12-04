const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
    accID: {
        type: mongoose.Schema.Types.ObjectId, // References the Cart by ID
        ref: 'Cart',
        required: true
    },
    productID: {
        type: mongoose.Schema.Types.ObjectId, // References the Product by ID
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    note: {
        type: String,
        required: false,
        default: '' // Optional note for additional information or customization
    }
});

const CartItem = mongoose.model('CartItem', CartItemSchema);

module.exports = CartItem;
