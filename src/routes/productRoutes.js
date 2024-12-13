const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

const multer = require("multer");
const path = require("path");

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific product by custom ID
router.get('/product/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Multer configuration for handling image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save images in the uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Create a new product
router.post("/", upload.single("img"), async (req, res) => {
  const { name, price, cate } = req.body;
  const img = req.file ? req.file.filename : ""; // Use only the filename, not the full path

  const product = new Product({
    name,
    price,
    cate,
    img,
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an existing product
router.put('/product/update/:id', upload.single("img"), async (req, res) => {
  const { id } = req.params;
  const { name, price, cate } = req.body;
  const img = req.file ? req.file.filename : undefined; // If a new image is uploaded, use it

  try {
    // Find the product by ID
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update product fields
    product.name = name || product.name;
    product.price = price || product.price;
    product.cate = cate || product.cate;

    // If a new image is uploaded, update the image field
    if (img) {
      product.img = img; 
    }

    // Save the updated product
    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a product
router.delete('/product/delete/:_id', async (req, res) => {
  const { _id } = req.params;
  try {
    const deletedItem = await Product.findOneAndDelete({ _id });
    if (deletedItem) {
      res.status(200).json({ message: 'Product deleted successfully.' });
    } else {
      res.status(404).json({ message: 'Product not found.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
