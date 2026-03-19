const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  productId: { type: Number }, // for static/demo mode
  name: { type: String },
  price: { type: Number },
  image: { type: String },
  quantity: { type: Number, required: true, min: 1, default: 1 }
});

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [cartItemSchema],
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Compute cart totals
cartSchema.virtual('total').get(function () {
  return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
});

module.exports = mongoose.model('Cart', cartSchema);
