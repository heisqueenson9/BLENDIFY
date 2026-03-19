const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /api/products — all products with filter, sort, search
router.get('/', async (req, res) => {
  try {
    const { category, tag, sort, search, minPrice, maxPrice, limit = 100 } = req.query;

    let query = {};

    if (category && category !== 'all') query.category = category;
    if (tag) query.tags = tag;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    let sortOption = {};
    if (sort === 'price-asc') sortOption = { price: 1 };
    else if (sort === 'price-desc') sortOption = { price: -1 };
    else if (sort === 'name') sortOption = { name: 1 };
    else if (sort === 'popular') sortOption = { popularity: -1 };
    else sortOption = { popularity: -1 };

    const products = await Product.find(query).sort(sortOption).limit(Number(limit));
    res.json({ success: true, count: products.length, products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/products/best-sellers
router.get('/best-sellers', async (req, res) => {
  try {
    const products = await Product.find().sort({ popularity: -1 }).limit(6);
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/products/trending
router.get('/trending', async (req, res) => {
  try {
    const products = await Product.find({ tags: 'trending' }).limit(4);
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/products/:id/related — same category, similar price
router.get('/:id/related', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Not found' });
    const related = await Product.find({
      category: product.category,
      _id: { $ne: product._id }
    }).limit(4);
    res.json({ success: true, products: related });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
