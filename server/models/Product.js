const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  oldPrice: { type: Number, default: null },
  badge: { type: String, default: '' },
  badgeClass: { type: String, default: '' },
  stars: { type: String, default: '★★★★★' },
  reviews: { type: Number, default: 0 },
  image: { type: String, required: true },
  bg: { type: String, default: '#f0f0f0' },
  category: { type: String, enum: ['portable', 'commercial', 'smart'], required: true },
  tags: [{ type: String }],
  description: { type: String, required: true },
  inStock: { type: Boolean, default: true },
  popularity: { type: Number, default: 5, min: 1, max: 10 }
}, {
  timestamps: true
});

// Text search index
productSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);
