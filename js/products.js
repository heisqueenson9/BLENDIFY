// ============================================================
// BLENDIFY — Products Data & Recommender Engine (18 Products)
// ============================================================

// ── BLENDER IMAGES FROM /images FOLDER ──────────────────────────
const BLENDER_IMAGES = [
  'images/photo_1_2026-03-18_10-56-41.jpg',
  'images/photo_2_2026-03-18_10-56-41.jpg',
  'images/photo_3_2026-03-18_10-56-41.jpg',
  'images/photo_4_2026-03-18_10-56-41.jpg',
  'images/photo_1_2026-03-18_10-48-50.jpg',
  'images/photo_2_2026-03-18_10-48-50.jpg',
  'images/photo_3_2026-03-18_10-48-50.jpg',
  'images/photo_1_2026-03-18_10-42-48.jpg',
  'images/photo_2_2026-03-18_10-42-48.jpg',
  'images/photo_1_2026-03-18_10-39-18.jpg',
  'images/photo_2_2026-03-18_10-39-18.jpg',
  'images/photo_3_2026-03-18_10-39-18.jpg',
  'images/photo_1_2026-03-18_10-25-39.jpg',
  'images/photo_2_2026-03-18_10-25-39.jpg',
  'images/photo_1_2026-03-18_10-15-58.jpg',
  'images/photo_2_2026-03-18_10-15-58.jpg',
  'images/photo_3_2026-03-18_10-15-58.jpg',
  'images/photo_4_2026-03-18_10-15-58.jpg',
  'images/photo_5_2026-03-18_10-15-58.jpg',
  'images/photo_1_2026-03-18_09-07-41.jpg',
  'images/photo_2_2026-03-18_09-07-41.jpg',
  'images/photo_3_2026-03-18_09-07-41.jpg',
];

// Map 1-18 products to specific images
const img = (id) => BLENDER_IMAGES[(id - 1) % BLENDER_IMAGES.length];

const PRODUCTS = [
  { id: 1, name: "PureSip Blender", price: 350.00, oldPrice: null, badge: "Best Seller", badgeClass: "", stars: "★★★★★", reviews: 214, image: img(1), bg: "#f0f0f0", category: "portable", tags: ["portable", "bestseller"], description: "The original. 450ml BPA-free cup, 6-blade stainless system, USB-C charging. 20 blends per charge.", inStock: true, popularity: 9 },
  { id: 2, name: "BlendEase Mini", price: 250.00, oldPrice: null, badge: "Trending", badgeClass: "badge-hot", stars: "★★★★★", reviews: 189, image: img(2), bg: "#e8f5b0", category: "portable", tags: ["portable", "trending"], description: "Compact 300ml option — perfect for single-serve protein shakes. Fits in any bag.", inStock: true, popularity: 8 },
  { id: 3, name: "PowerBlend Pro", price: 450.00, oldPrice: 520.00, badge: "Sale", badgeClass: "badge-sale", stars: "★★★★★", reviews: 312, image: img(3), bg: "#e0f2f1", category: "commercial", tags: ["commercial", "sale"], description: "Our heavy-duty powerhouse. Crushes ice and frozen fruit effortlessly with a 1000W upgraded motor.", inStock: true, popularity: 10 },
  { id: 4, name: "SwiftJuice Mini", price: 280.00, oldPrice: null, badge: "", badgeClass: "", stars: "★★★★☆", reviews: 84, image: img(4), bg: "#fff8e1", category: "portable", tags: ["portable"], description: "Sleek travel design with an integrated sipping lid. Makes blending on the go easier than ever.", inStock: true, popularity: 7 },
  { id: 5, name: "GreenPulse Blender", price: 320.00, oldPrice: null, badge: "New", badgeClass: "badge-new", stars: "★★★★★", reviews: 120, image: img(5), bg: "#dcedc8", category: "smart", tags: ["smart", "new"], description: "The kiwi green edition. 6-point stainless steel blades with an intelligent pulsing mode for tougher greens.", inStock: true, popularity: 9 },
  { id: 6, name: "TurboMix Elite", price: 499.00, oldPrice: 550.00, badge: "Sale", badgeClass: "badge-sale", stars: "★★★★★", reviews: 440, image: img(6), bg: "#ffebee", category: "commercial", tags: ["commercial", "trending"], description: "Professional-grade smart blender. Digital touch panel, variable speed control, and heavy glass jar.", inStock: true, popularity: 10 },
  { id: 7, name: "AquaBlend Smart", price: 360.00, oldPrice: null, badge: "Smart", badgeClass: "badge-new", stars: "★★★★★", reviews: 210, image: img(7), bg: "#e1f5fe", category: "smart", tags: ["smart", "bestseller"], description: "Gorgeous blue finish with a digital UI countdown. Auto-stop feature ensures the perfect consistency every time.", inStock: true, popularity: 9 },
  { id: 8, name: "StealthMix Commercial", price: 580.00, oldPrice: 650.00, badge: "Pro", badgeClass: "badge-hot", stars: "★★★★★", reviews: 180, image: img(8), bg: "#cfd8dc", category: "commercial", tags: ["commercial"], description: "Matte black heavy-duty blender. Sound enclosure, commercial motor, indestructible jar.", inStock: true, popularity: 7 },
  { id: 9, name: "RoseGold Elegance", price: 340.00, oldPrice: null, badge: "", badgeClass: "", stars: "★★★★☆", reviews: 70, image: img(9), bg: "#fce4ec", category: "smart", tags: ["smart"], description: "Aesthetic rose gold body meets incredible blending power. An absolute statement piece for your kitchen.", inStock: true, popularity: 5 },
  { id: 10, name: "NatureBlend Glass", price: 310.00, oldPrice: null, badge: "Eco", badgeClass: "badge-new", stars: "★★★★★", reviews: 145, image: img(10), bg: "#f1f8e9", category: "smart", tags: ["eco", "smart"], description: "A sustainably designed blender featuring a pure glass jar and a bamboo-finish wooden base.", inStock: true, popularity: 8 },
  { id: 11, name: "HyperSpeed 5000", price: 495.00, oldPrice: null, badge: "", badgeClass: "", stars: "★★★★★", reviews: 300, image: img(11), bg: "#efebe9", category: "commercial", tags: ["commercial", "trending"], description: "Ultra-high performance silver blender. Specifically engineered to turn whole fruits and seeds into liquid instantly.", inStock: true, popularity: 8 },
  { id: 12, name: "VitaMixer Compact", price: 275.00, oldPrice: null, badge: "", badgeClass: "", stars: "★★★★☆", reviews: 90, image: img(12), bg: "#fffde7", category: "portable", tags: ["portable"], description: "Vibrant yellow edition. Small enough for standard cup holders but strong enough for daily smoothie bowls.", inStock: true, popularity: 6 },
  { id: 13, name: "JetBlend Go", price: 260.00, oldPrice: null, badge: "Trending", badgeClass: "badge-hot", stars: "★★★★★", reviews: 215, image: img(13), bg: "#e0f7fa", category: "portable", tags: ["portable", "trending"], description: "Cyan portable travel unit designed specifically for hikers and frequent flyers. Leak-proof guaranteed.", inStock: true, popularity: 9 },
  { id: 14, name: "ProChef Elite", price: 590.00, oldPrice: null, badge: "Pro", badgeClass: "badge-hot", stars: "★★★★★", reviews: 87, image: img(14), bg: "#eceff1", category: "commercial", tags: ["commercial"], description: "The ultimate stainless steel professional suite. Features manual override controls for exact blending physics.", inStock: true, popularity: 7 },
  { id: 15, name: "SmoothTouch Digital", price: 400.00, oldPrice: null, badge: "", badgeClass: "", stars: "★★★★☆", reviews: 50, image: img(15), bg: "#ffffff", category: "smart", tags: ["smart"], description: "Pure white digital touch blender with smart heating functions for warm soups and cold beverages.", inStock: true, popularity: 5 },
  { id: 16, name: "NeonFit Portable", price: 330.00, oldPrice: null, badge: "New", badgeClass: "badge-new", stars: "★★★★★", reviews: 199, image: img(16), bg: "#f1f8e9", category: "portable", tags: ["portable", "bestseller"], description: "Neon green active lifestyle blender featuring an ultra-lightweight titan plastic body and carabiner lid.", inStock: true, popularity: 8 },
  { id: 17, name: "CrimsonVortex", price: 380.00, oldPrice: null, badge: "Sale", badgeClass: "badge-sale", stars: "★★★★★", reviews: 120, image: img(17), bg: "#ffebee", category: "commercial", tags: ["commercial"], description: "Deep red high-speed blender capable of vortex-level liquid fusion. Incredible power.", inStock: true, popularity: 6 },
  { id: 18, name: "SlateGrey Mini", price: 210.00, oldPrice: null, badge: "", badgeClass: "", stars: "★★★★☆", reviews: 80, image: img(18), bg: "#e0e0e0", category: "portable", tags: ["portable"], description: "Slate grey single-serve blender designed for the minimalist modern aesthetic.", inStock: true, popularity: 5 },
];

// Recommender Functions
function getRelatedProducts(currentId, count = 4) {
  const current = PRODUCTS.find(p => p.id === currentId) || PRODUCTS[0];
  return PRODUCTS.filter(p => p.id !== currentId && p.category === current.category).slice(0, count);
}
function getBestSellers(count = 4) {
  return [...PRODUCTS].sort((a,b) => b.popularity - a.popularity).slice(0, count);
}
function getTrending(count = 4) {
  return PRODUCTS.filter(p => p.tags.includes('trending')).slice(0, count);
}

// Complex recommender (price similarity crossover)
function getYouMayLike(currentId, count = 4) {
  const current = PRODUCTS.find(p => p.id === currentId);
  if(!current) return [];
  const others = PRODUCTS.filter(p => p.id !== currentId && p.category !== current.category);
  others.sort((a,b) => Math.abs(a.price - current.price) - Math.abs(b.price - current.price));
  return others.slice(0, count);
}

// "Frequently Bought Together" (pairs accessories with blenders)
function getFrequentlyBoughtWith(currentId, count = 3) {
  const current = PRODUCTS.find(p => p.id === currentId);
  if(!current) return [];
  return PRODUCTS.filter(p => p.id !== currentId && Math.abs(current.price - p.price) > 50).reverse().slice(0, count);
}

// --- DOM Rendering ---
function productCardHTML(p) {
  const oldPrice = p.oldPrice ? `<span class="price-old">${p.oldPrice.toFixed(2)}L</span>` : "";
  const badgeHTML = p.badge ? `<span class="product-badge ${p.badgeClass}">${p.badge}</span>` : "";
  const isFromPages = window.location.pathname.includes('/pages/');
  
  return `
    <div class="product-card">
      <div class="product-img" style="background: ${p.bg}; border-radius:12px; transition:border 0.2s; position:relative;">
        ${badgeHTML}
        <!-- Wrap in link -->
        <a href="${isFromPages ? 'product.html' : 'pages/product.html'}?id=${p.id}" style="display:block;width:100%;height:100%;">
          <img src="${p.image}" alt="${p.name}" loading="lazy" style="width:100%;height:100%;object-fit:cover;">
        </a>
      </div>
      <div class="product-info" style="display:flex;flex-direction:column;flex:1;">
        <a href="${isFromPages ? 'product.html' : 'pages/product.html'}?id=${p.id}" class="product-card-link" style="text-decoration:none;color:inherit;flex:1;display:flex;flex-direction:column;">
          <h4>${p.name}</h4>
          <span class="stars" style="margin-bottom:8px;">${p.stars} <small style="color:var(--text-muted);">(${p.reviews})</small></span>
          <div class="product-price">
            <span class="price-main">${p.price.toFixed(2)}L</span>
            ${oldPrice}
          </div>
        </a>
        <button class="btn-primary" style="margin-top:12px;width:100%;justify-content:center;padding:12px;" onclick="addToCart(${p.id})">🛒 Quick Add</button>
      </div>
    </div>
  `;
}

function renderHomepageProducts() {
  const container = document.getElementById("productsGrid");
  if (!container) return;
  container.innerHTML = "";
  // Render Featured/Initial products
  PRODUCTS.slice(0, 8).forEach(p => {
    container.innerHTML += productCardHTML(p);
  });
  attachCardListeners();
}

function renderBestSellers(gridId = "bestSellersGrid", count = 4) {
  const c = document.getElementById(gridId);
  if(!c) return;
  c.innerHTML = getBestSellers(count).map(p => productCardHTML(p)).join('');
}

function renderTrending(gridId = "trendingGrid", count = 4) {
  const c = document.getElementById(gridId);
  if(!c) return;
  c.innerHTML = getTrending(count).map(p => productCardHTML(p)).join('');
}

function renderRelatedProducts(gridId, category, excludeId, count = 4) {
  const container = document.getElementById(gridId);
  if (!container) return;
  const items = PRODUCTS.filter(p => p.category === category && p.id !== excludeId).slice(0, count);
  if (items.length === 0) {
    container.innerHTML = "<p>No related products found.</p>";
    return;
  }
  container.innerHTML = items.map(p => productCardHTML(p)).join('');
  attachCardListeners();
}

function renderShopProducts(filter = "all") {
  const container = document.getElementById("shopGrid");
  if (!container) return;
  container.innerHTML = "";
  
  let maxPrice = 9999;
  const priceRange = document.getElementById("priceRange");
  if(priceRange) maxPrice = parseInt(priceRange.value);

  const searchInput = document.getElementById("searchInput");
  const query = searchInput ? searchInput.value.toLowerCase() : "";

  let filtered = PRODUCTS.filter(p => {
    let matchFilter = filter === "all" || p.category === filter || p.tags.includes(filter);
    let matchPrice = p.price <= maxPrice;
    let matchQuery = p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query);
    return matchFilter && matchPrice && matchQuery;
  });

  if (filtered.length === 0) {
    container.innerHTML = "<p style='grid-column:1/-1;text-align:center;padding:40px;color:var(--text-muted);'>No products match your criteria. Try loosening your filters.</p>";
  }

  filtered.forEach(p => {
    container.innerHTML += productCardHTML(p);
  });
  
  const countLabel = document.getElementById("productCount");
  if(countLabel) countLabel.textContent = `Showing ${filtered.length} products`;
  
  attachCardListeners();
}

function attachCardListeners() {
  document.querySelectorAll(".product-img").forEach(img => {
    img.addEventListener("mouseenter", () => {
      img.style.borderColor = "var(--lime)";
      img.style.transform = "translateY(-4px)";
      img.style.boxShadow = "var(--shadow-md)";
    });
    img.addEventListener("mouseleave", () => {
      img.style.borderColor = "transparent";
      img.style.transform = "none";
      img.style.boxShadow = "none";
    });
  });
}

// ─── INIT ───
document.addEventListener("DOMContentLoaded", () => {
  renderHomepageProducts();
  renderBestSellers("bestSellersGrid", 4);
  renderShopProducts("all");
});
