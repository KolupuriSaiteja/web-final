const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {
  getUser,
  updateUser,
  signup,
  signin,
} = require('./user/userController');
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('./products/productController');
const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} = require('./order/orderController');

const app = express();
const port = 4123;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

mongoose
  .connect(
    'mongodb+srv://kolupurisaiteja444:saiteja123@cluster0.hezv0xb.mongodb.net/web-final'
  )
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });

// User Routes
app.post('/users/signup', signup);
app.post('/users/signin', signin);
app.get('/users/:id', getUser);
app.put('/users/:id', updateUser);

// Product Routes
app.get('/products', getAllProducts);
app.get('/products/:id', getProductById);
app.post('/products', createProduct);
app.put('/products/:id', updateProduct);
app.delete('/products/:id', deleteProduct);

// Order Routes
app.get('/orders', getAllOrders);
app.get('/orders/:id', getOrderById);
app.post('/orders', createOrder);
app.put('/orders/:id', updateOrder);
app.delete('/orders/:id', deleteOrder);

app.get('/', (req, res) => {
  res.send('Hello, Saiteja API!');
});

app.listen(port, () => {
  console.log(`Saiteja Server is running on http://localhost:${port}`);
});
