const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  quantity: { type: Number, required: true, min: 1 }
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  guestEmail: { type: String },
  items: [orderItemSchema],
  subtotal: { type: Number, required: true },
  shipping: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  total: { type: Number, required: true },
  couponCode: { type: String, default: '' },
  shippingAddress: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, default: 'Ghana' },
    zip: { type: String }
  },
  payment: {
    method: { type: String, enum: ['paystack', 'demo', 'cod'], default: 'demo' },
    status: { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending' },
    reference: { type: String, default: '' },
    transactionId: { type: String, default: '' },
    paidAt: { type: Date }
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  trackingNumber: { type: String, default: '' },
  notes: { type: String, default: '' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
