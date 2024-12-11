const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const app = express();
const PORT = 5000;

const bodyParser = require('body-parser');

app.use(bodyParser.json());

const path = require('path');

app.use(cors());
// Middleware
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://0.0.0.0/DB_Shop_Food')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Failed to connect to MongoDB', err);
  });

const productRoutes = require('./src/routes/productRoutes');
app.use('/products', productRoutes);

const cartRoute = require('./src/routes/cartRoutes');
app.use('/carts', cartRoute);

const orderRoute = require('./src/routes/orderRoutes');
app.use('/orders', orderRoute);

const ordersuccessRoute = require('./src/routes/ordersuccessRoutes');
app.use('/ordersuccess', ordersuccessRoute);

app.use("/uploads", express.static("uploads"));


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
