const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');
const Order = require('../models/Order');

// Tạo giỏ hàng mới
// 1. Sửa đổi tên trường `accID` thành `userID` trong CartItem và Cart

// 2. Sửa đổi các endpoint trong cartRoutes

router.post('/', async (req, res) => {
    try {
        const newCart = new Cart(); // Không cần `userID`
        const savedCart = await newCart.save();
        res.status(201).json(savedCart);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/item', async (req, res) => {
    const { accID, productID, quantity } = req.body; // Sử dụng `accID` thay vì `cartID`
    try {
        const newItem = new CartItem({ accID, productID, quantity });
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
router.post('/cart', async (req, res) => {
    const { accID, productID, quantity, note } = req.body;

    try {
        // Check if the item already exists in the cart
        let cartItem = await CartItem.findOne({ accID, productID });
        if (cartItem) {
            // If it exists, update the quantity and note
            cartItem.quantity += quantity;
            cartItem.note = note || cartItem.note; // Update note if provided
        } else {
            // If it doesn't exist, create a new cart item with note
            cartItem = new CartItem({ accID, productID, quantity, note });
        }

        // Save the cart item
        await cartItem.save();
        res.status(201).json(cartItem);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while adding the product to the cart.' });
    }
});

// Xóa toàn bộ giỏ hàng
// Xóa toàn bộ giỏ hàng dựa trên cartID
// router.delete('/:cartID', async (req, res) => {
//     const { cartID } = req.params;
//     try {
//       await CartItem.deleteMany({ cartID }); // Xóa tất cả sản phẩm trong giỏ hàng
//       res.status(200).json({ message: 'Cart cleared successfully.' });
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });

// Xóa tất cả các sản phẩm trong giỏ hàng mà không cần tham chiếu đến ID
router.delete('/clear', async (req, res) => {
    try {
      await CartItem.deleteMany(); // Xóa tất cả các sản phẩm trong giỏ hàng
      res.status(200).json({ message: 'All cart items cleared successfully.' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  


router.get('/:userID', async (req, res) => {
    const { userID } = req.params;
    try {
        const cartItems = await CartItem.find({ accID: userID }).populate('productID');
        res.status(200).json(cartItems);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:userID/item/:productID', async (req, res) => {
    const { userID, productID } = req.params;
    try {
        const deletedItem = await CartItem.findOneAndDelete({ accID: userID, productID });
        if (deletedItem) {
            res.status(200).json({ message: 'Item removed from cart successfully.' });
        } else {
            res.status(404).json({ message: 'Item not found in cart.' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Tăng số lượng sản phẩm
router.patch('/:userID/item/:productID', async (req, res) => {
    const { userID, productID } = req.params;
    const { action, note } = req.body; // Add note to request body

    try {
        // Find the cart item for the user
        const cartItem = await CartItem.findOne({ accID: userID, productID });
        if (!cartItem) {
            return res.status(404).json({ message: 'Item not found in cart.' });
        }

        // Check the action to either increase or decrease quantity
        if (action === true) {
            cartItem.quantity += 1; // Increase quantity
        } else if (action === false) {
            cartItem.quantity -= 1; // Decrease quantity
            if (cartItem.quantity <= 0) {
                await CartItem.findOneAndDelete({ accID: userID, productID });
                return res.status(200).json({ message: 'Item removed from cart as quantity is zero.' });
            }
        } else {
            return res.status(400).json({ message: 'Invalid action.' });
        }

        // Update note if provided
        if (note) {
            cartItem.note = note;
        }

        // Save changes to the cart item
        await cartItem.save();
        res.status(200).json(cartItem);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
