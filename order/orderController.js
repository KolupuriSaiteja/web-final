const { OrderModel } = require('./orderModel');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const order = await OrderModel.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to create order' });
  }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to get orders' });
  }
};

// Get an order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to get order' });
  }
};

// Update an order
exports.updateOrder = async (req, res) => {
  try {
    const order = await OrderModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to update order' });
  }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
  try {
    const order = await OrderModel.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to delete order' });
  }
};
