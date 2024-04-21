const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.ObjectId, required: true, ref: 'Product' },
  quantity: {
    type: Number,
    required: true,
  },
});

const creditCardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
  expiry: { type: String, required: true },
  cvc: { type: String, required: true },
});

const addressSchema = new mongoose.Schema({
  addressLine: { type: String, default: '' },
  city: { type: String, default: '' },
  postalCode: { type: String, default: '' },
  province: { type: String, default: '' },
  country: { type: String, default: '' },
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, required: true, ref: 'User' },
  total: {
    type: Number,
    required: true,
  },
  orderItems: { type: [orderItemSchema], required: true },
  creditCard: { type: [creditCardSchema], required: true },
  address: { type: [addressSchema], required: true },
  orderDateTime: {
    type: Date,
    default: Date.now,
  },
});

exports.OrderModel = mongoose.model('Order', orderSchema);
