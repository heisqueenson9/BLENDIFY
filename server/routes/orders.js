const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const { protect } = require('../middleware/auth');

// POST /api/orders — create order
router.post('/', async (req, res) => {
  try {
    const {
      items,
      shippingAddress,
      subtotal,
      shipping = 0,
      discount = 0,
      total,
      couponCode = '',
      payment = { method: 'demo', status: 'pending' }
    } = req.body;

    const order = await Order.create({
      user: req.user?.id || null,
      guestEmail: shippingAddress?.email,
      items,
      shippingAddress,
      subtotal,
      shipping,
      discount,
      total,
      couponCode,
      payment,
      status: 'pending'
    });

    // Clear DB cart if user is authenticated
    if (req.user) {
      await Cart.findOneAndDelete({ user: req.user.id });
    }

    res.status(201).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/orders/my — get user orders
router.get('/my', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/orders/:id — get single order
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PATCH /api/orders/:id/status — update order status (admin)
router.patch('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
