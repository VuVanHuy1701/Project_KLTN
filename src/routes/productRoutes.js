const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all fish
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific fish by custom ID
router.get('/product/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Fish not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new product
router.post('/', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    category: req.body.category,
    image: req.body.image,
    price: req.body.price,
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/product/delete/:_id', async (req, res) => {
  const { _id } = req.params;
  try {
    const deletedItem = await Product.findOneAndDelete({ _id });
    if (deletedItem) {
      res.status(200).json({ message: 'Product item deleted successfully.' });
    } else {
      res.status(404).json({ message: 'Product item not found.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
