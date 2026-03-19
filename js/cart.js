// ============================================================
// BLENDIFY — Cart Logic (Robust)
// ============================================================

let cart = [];
try {
  cart = JSON.parse(localStorage.getItem("blendify_cart") || "[]");
} catch(e) {
  cart = []; // Fallback if data is corrupted
}

function saveCart() {
  localStorage.setItem("blendify_cart", JSON.stringify(cart));
  updateCartUI();
}

function addToCart(productId, qty = 1) {
  if (typeof PRODUCTS === 'undefined') {
    console.error("Products not loaded yet.");
    return;
  }
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, qty });
  }

  saveCart();
  showCartToast(productId);
  openCart();
}

function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId);
  saveCart();
  renderCartDrawer();
}

function updateQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  
  if (item.qty + delta > 0) {
    item.qty += delta;
  } else {
    removeFromCart(productId);
    return;
  }
  saveCart();
  renderCartDrawer();
}

function getCartTotal() {
  return cart.reduce((sum, i) => sum + i.price * i.qty, 0);
}

function getCartCount() {
  return cart.reduce((sum, i) => sum + i.qty, 0);
}

function updateCartUI() {
  const badges = document.querySelectorAll(".cart-badge, #cartCount");
  const count = getCartCount();
  
  badges.forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? "flex" : "none";
  });
}

function renderCartDrawer() {
  const itemsContainer = document.querySelector(".cart-items");
  const footer = document.querySelector(".cart-footer");
  const header = document.querySelector(".cart-header h3");

  if (!itemsContainer) return;

  const count = getCartCount();
  if (header) header.textContent = `Your Cart (${count})`;

  if (cart.length === 0) {
    itemsContainer.innerHTML = `
      <div style="text-align:center;padding:60px 20px;color:var(--text-muted);">
        <div style="font-size:3rem;margin-bottom:16px;">🛒</div>
        <p>Your cart is empty.</p>
        <button onclick="closeCart();" class="btn-primary" style="margin-top:20px;">Continue Shopping</button>
      </div>`;
    if (footer) footer.innerHTML = "";
    return;
  }

  itemsContainer.innerHTML = cart.map((item, index) => `
    <div class="cart-item" style="animation: slideInRight ${0.2 + (index*0.1)}s ease">
      <div class="cart-item-img" style="overflow:hidden;border-radius:12px;">
        <img src="${item.image}" alt="${item.name}" style="width:100%;height:100%;object-fit:cover;">
      </div>
      <div class="cart-item-info">
        <h4 style="font-size:.9rem;font-weight:700;">${item.name}</h4>
        <div style="display:flex;align-items:center;gap:12px;margin:8px 0;background:var(--gray-50);width:max-content;padding:4px 6px;border-radius:24px;border:1px solid var(--gray-200);">
          <button onclick="updateQty(${item.id}, -1)" style="width:24px;height:24px;background:var(--white);border-radius:50%;border:1px solid var(--gray-200);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:var(--transition);">-</button>
          <span style="font-size:.85rem;font-weight:600;min-width:12px;text-align:center;">${item.qty}</span>
          <button onclick="updateQty(${item.id}, 1)" style="width:24px;height:24px;background:var(--white);border-radius:50%;border:1px solid var(--gray-200);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:var(--transition);">+</button>
        </div>
        <span style="font-weight:600;color:var(--lime-dark);">${(item.price * item.qty).toFixed(2)}L</span>
      </div>
      <button class="remove-item" onclick="removeFromCart(${item.id})" style="font-size:1.6rem;opacity:0.6;background:none;border:none;cursor:pointer;">×</button>
    </div>
  `).join("");

  // Resolve base path for links
  const isFromPages = window.location.pathname.includes('/pages/');

  if (footer) {
    footer.innerHTML = `
      <div class="cart-subtotal" style="display:flex;justify-content:space-between;font-size:1.1rem;margin-bottom:16px;border-top:1px solid var(--gray-200);padding-top:16px;">
        <span style="font-family:var(--font-display);letter-spacing:1px;color:var(--text-muted);">Total</span>
        <strong style="color:var(--lime-dark);">${getCartTotal().toFixed(2)}L</strong>
      </div>
      <p style="text-align:center;font-size:.75rem;color:var(--text-muted);margin-bottom:12px;">Shipping & taxes calculated at checkout.</p>
      <a href="${isFromPages ? 'checkout.html' : 'pages/checkout.html'}" class="btn-primary full-width" style="margin-bottom:12px;justify-content:center;">Checkout Now 🔐</a>
    `;
  }
}

function openCart() {
  const drawer = document.getElementById("cartDrawer");
  const overlay = document.getElementById("cartOverlay");
  if (drawer && overlay) {
    drawer.classList.add("open");
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
    renderCartDrawer();
  }
}

function closeCart() {
  const drawer = document.getElementById("cartDrawer");
  const overlay = document.getElementById("cartOverlay");
  if (drawer && overlay) {
    drawer.classList.remove("open");
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }
}

function showCartToast(productId) {
  if (typeof PRODUCTS === 'undefined') return;
  const p = PRODUCTS.find(x => x.id === productId);
  if (!p) return;
  
  let toast = document.getElementById("cartToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "cartToast";
    toast.style.cssText = `
      position:fixed;bottom:80px;right:24px;
      background:var(--black);color:var(--white);
      padding:16px 24px;border-radius:12px;
      border:1px solid var(--lime);
      font-size:.85rem;font-weight:600;
      z-index:500; transform:translateY(20px); opacity:0;
      transition:all .4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      pointer-events:none; display:flex; align-items:center; gap:12px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    `;
    document.body.appendChild(toast);
  }
  
  toast.innerHTML = `
    <img src="${p.image}" style="width:36px;height:36px;border-radius:8px;object-fit:cover;">
    <div><strong>${p.name}</strong> added to cart</div>
  `;
  
  toast.style.transform = "translateY(0) scale(1)";
  toast.style.opacity = "1";
  
  setTimeout(() => { 
    toast.style.transform = "translateY(20px) scale(0.95)"; 
    toast.style.opacity = "0"; 
  }, 3500);
}

// ─── Initialization ───
document.addEventListener("DOMContentLoaded", () => {
  updateCartUI();
  
  // Attach cart toggles safely
  const btns = document.querySelectorAll("#cartToggle, .cart-btn");
  btns.forEach(btn => {
    // remove existing to prevent double fires
    const newBtn = btn.cloneNode(true);
    if(btn.parentNode) btn.parentNode.replaceChild(newBtn, btn);
    newBtn.addEventListener("click", openCart);
  });
  
  // Attach overlay click
  const overlay = document.getElementById("cartOverlay");
  if (overlay) overlay.addEventListener("click", closeCart);
});
