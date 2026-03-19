require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

// ── 5 APPROVED BLENDER IMAGES ──────────────────────────────
const BLENDER_IMAGES = [
  '/images/photo_1_2026-03-18_09-07-41.jpg',
  '/images/photo_2_2026-03-18_09-07-41.jpg',
  '/images/photo_3_2026-03-18_09-07-41.jpg',
  '/images/photo_1_2026-03-18_10-25-39.jpg',
  '/images/photo_2_2026-03-18_10-25-39.jpg',
];

// Smart rotation: image index based on product ID
const img = (id) => BLENDER_IMAGES[(id - 1) % 5];

const products = [
  { id: 1, name: "PureSip Blender", price: 350, oldPrice: null, badge: "Best Seller", badgeClass: "", stars: "★★★★★", reviews: 214, image: img(1), bg: "#f0f0f0", category: "portable", tags: ["portable","bestseller"], description: "The original. 450ml BPA-free cup, 6-blade stainless system, USB-C charging. 20 blends per charge.", inStock: true, popularity: 9 },
  { id: 2, name: "BlendEase Mini", price: 250, oldPrice: null, badge: "Trending", badgeClass: "badge-hot", stars: "★★★★★", reviews: 189, image: img(2), bg: "#e8f5b0", category: "portable", tags: ["portable","trending"], description: "Compact 300ml option — perfect for single-serve protein shakes. Fits in any bag.", inStock: true, popularity: 8 },
  { id: 3, name: "PowerBlend Pro", price: 450, oldPrice: 520, badge: "Sale", badgeClass: "badge-sale", stars: "★★★★★", reviews: 312, image: img(3), bg: "#e0f2f1", category: "commercial", tags: ["commercial","sale"], description: "Our heavy-duty powerhouse. Crushes ice and frozen fruit effortlessly with a 1000W upgraded motor.", inStock: true, popularity: 10 },
  { id: 4, name: "SwiftJuice Mini", price: 280, oldPrice: null, badge: "", badgeClass: "", stars: "★★★★☆", reviews: 84, image: img(4), bg: "#fff8e1", category: "portable", tags: ["portable"], description: "Sleek travel design with an integrated sipping lid. Makes blending on the go easier than ever.", inStock: true, popularity: 7 },
  { id: 5, name: "GreenPulse Blender", price: 320, oldPrice: null, badge: "New", badgeClass: "badge-new", stars: "★★★★★", reviews: 120, image: img(5), bg: "#dcedc8", category: "smart", tags: ["smart","new"], description: "The kiwi green edition. 6-point stainless steel blades with an intelligent pulsing mode for tougher greens.", inStock: true, popularity: 9 },
  { id: 6, name: "TurboMix Elite", price: 499, oldPrice: 550, badge: "Sale", badgeClass: "badge-sale", stars: "★★★★★", reviews: 440, image: img(6), bg: "#ffebee", category: "commercial", tags: ["commercial","trending"], description: "Professional-grade smart blender. Digital touch panel, variable speed control, and heavy glass jar.", inStock: true, popularity: 10 },
  { id: 7, name: "AquaBlend Smart", price: 360, oldPrice: null, badge: "Smart", badgeClass: "badge-new", stars: "★★★★★", reviews: 210, image: img(7), bg: "#e1f5fe", category: "smart", tags: ["smart","bestseller"], description: "Gorgeous blue finish with a digital UI countdown. Auto-stop feature ensures the perfect consistency every time.", inStock: true, popularity: 9 },
  { id: 8, name: "StealthMix Commercial", price: 580, oldPrice: 650, badge: "Pro", badgeClass: "badge-hot", stars: "★★★★★", reviews: 180, image: img(8), bg: "#cfd8dc", category: "commercial", tags: ["commercial"], description: "Matte black heavy-duty blender. Sound enclosure, commercial motor, indestructible jar.", inStock: true, popularity: 7 },
  { id: 9, name: "RoseGold Elegance", price: 340, oldPrice: null, badge: "", badgeClass: "", stars: "★★★★☆", reviews: 70, image: img(9), bg: "#fce4ec", category: "smart", tags: ["smart"], description: "Aesthetic rose gold body meets incredible blending power. An absolute statement piece for your kitchen.", inStock: true, popularity: 5 },
  { id: 10, name: "NatureBlend Glass", price: 310, oldPrice: null, badge: "Eco", badgeClass: "badge-new", stars: "★★★★★", reviews: 145, image: img(10), bg: "#f1f8e9", category: "smart", tags: ["eco","smart"], description: "A sustainably designed blender featuring a pure glass jar and a bamboo-finish wooden base.", inStock: true, popularity: 8 },
  { id: 11, name: "HyperSpeed 5000", price: 495, oldPrice: null, badge: "", badgeClass: "", stars: "★★★★★", reviews: 300, image: img(11), bg: "#efebe9", category: "commercial", tags: ["commercial","trending"], description: "Ultra-high performance silver blender. Engineered to turn whole fruits and seeds into liquid instantly.", inStock: true, popularity: 8 },
  { id: 12, name: "VitaMixer Compact", price: 275, oldPrice: null, badge: "", badgeClass: "", stars: "★★★★☆", reviews: 90, image: img(12), bg: "#fffde7", category: "portable", tags: ["portable"], description: "Vibrant yellow edition. Small enough for standard cup holders but strong enough for daily smoothie bowls.", inStock: true, popularity: 6 },
  { id: 13, name: "JetBlend Go", price: 260, oldPrice: null, badge: "Trending", badgeClass: "badge-hot", stars: "★★★★★", reviews: 215, image: img(13), bg: "#e0f7fa", category: "portable", tags: ["portable","trending"], description: "Cyan portable travel unit designed specifically for hikers and frequent flyers. Leak-proof guaranteed.", inStock: true, popularity: 9 },
  { id: 14, name: "ProChef Elite", price: 590, oldPrice: null, badge: "Pro", badgeClass: "badge-hot", stars: "★★★★★", reviews: 87, image: img(14), bg: "#eceff1", category: "commercial", tags: ["commercial"], description: "The ultimate stainless steel professional suite. Features manual override controls for exact blending physics.", inStock: true, popularity: 7 },
  { id: 15, name: "SmoothTouch Digital", price: 400, oldPrice: null, badge: "", badgeClass: "", stars: "★★★★☆", reviews: 50, image: img(15), bg: "#ffffff", category: "smart", tags: ["smart"], description: "Pure white digital touch blender with smart heating functions for warm soups and cold beverages.", inStock: true, popularity: 5 },
  { id: 16, name: "NeonFit Portable", price: 330, oldPrice: null, badge: "New", badgeClass: "badge-new", stars: "★★★★★", reviews: 199, image: img(16), bg: "#f1f8e9", category: "portable", tags: ["portable","bestseller"], description: "Neon green active lifestyle blender featuring an ultra-lightweight titan plastic body and carabiner lid.", inStock: true, popularity: 8 },
  { id: 17, name: "CrimsonVortex", price: 380, oldPrice: null, badge: "Sale", badgeClass: "badge-sale", stars: "★★★★★", reviews: 120, image: img(17), bg: "#ffebee", category: "commercial", tags: ["commercial"], description: "Deep red high-speed blender capable of vortex-level liquid fusion. Incredible power.", inStock: true, popularity: 6 },
  { id: 18, name: "SlateGrey Mini", price: 210, oldPrice: null, badge: "", badgeClass: "", stars: "★★★★☆", reviews: 80, image: img(18), bg: "#e0e0e0", category: "portable", tags: ["portable"], description: "Slate grey single-serve blender designed for the minimalist modern aesthetic.", inStock: true, popularity: 5 },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/blendify');
    await Product.deleteMany({});
    const created = await Product.insertMany(products);
    console.log(`✅ Seeded ${created.length} products successfully!`);
    console.log('🖼️  All products use the 5 approved blender images (rotated)');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
}

seed();
