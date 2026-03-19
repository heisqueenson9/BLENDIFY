# 🍃 BLENDIFY - Portable Blender E-Commerce Store

A modern, fully responsive, production-ready e-commerce website for Blendify portable blenders. Built with HTML5, CSS3, and vanilla JavaScript with zero dependencies.

**Status**: ✅ PRODUCTION READY | **Deployment**: Vercel Ready | **Testing**: Localhost Compatible

---

## 🎯 Features

### E-Commerce Functionality
- ✓ 8 Featured Products with full details
- ✓ Advanced filtering (category, price, status)
- ✓ Smart sorting (featured, price, alphabetical)
- ✓ Persistent shopping cart (localStorage)
- ✓ Quick view modal for products
- ✓ Individual product detail pages
- ✓ Related products suggestions

### User Experience
- ✓ Fully responsive design (mobile-first)
- ✓ Smooth scrolling animations
- ✓ Sticky navbar with scroll effects
- ✓ Mobile hamburger menu
- ✓ Toast notifications
- ✓ Loading spinner
- ✓ Back-to-top button

### Content Pages (22 total)
- Homepage, Shop, Product Detail, Cart, Checkout
- About, Blog, Blog Post, Contact, FAQ
- Policies (Privacy, Terms, Returns, Shipping, Cookies)
- Support (Careers, Order Tracking, Account)

---

## 🎨 Design System

**Color Palette:**
- Lime: #C5E710 (Primary)
- Lime Light: #F4DF6B (Secondary)
- Olive Mid: #8E9630 (Tertiary)
- Olive Dark: #607423 (Dark)
- Black: #010A00 (Text/Background)

**Fonts:**
- Display: Bebas Neue
- Body: DM Sans
- Italic: Playfair Display

**Responsive:** 480px, 768px, 900px, 1200px breakpoints

---

## 📁 Project Structure

```
blendify/
├── index.html                    # Homepage
├── vercel.json                   # Vercel config
├── DEPLOYMENT_REPORT.md          # Detailed audit report
├── README.md                     # This file
├── css/
│   ├── main.css                  # Main stylesheet (2000+ lines)
│   └── loader.css                # Loading animation
├── js/
│   ├── main.js                   # Global functionality
│   ├── products.js               # Product data & rendering
│   └── cart.js                   # Shopping cart logic
├── pages/
│   ├── shop.html                 # Product listing
│   ├── product.html              # Product detail
│   ├── cart.html                 # Cart page
│   ├── checkout.html             # Checkout form
│   ├── account.html              # Login page
│   ├── about.html                # About page
│   ├── blog.html                 # Blog home
│   ├── blog-post.html            # Blog article
│   ├── contact.html              # Contact & FAQ
│   ├── faq.html                  # FAQ page
│   ├── privacy.html              # Privacy policy
│   ├── terms.html                # Terms
│   ├── returns.html              # Return policy
│   ├── shipping.html             # Shipping info
│   ├── cookies.html              # Cookie policy
│   ├── careers.html              # Careers
│   └── track.html                # Order tracking
└── public/
    └── images/
        └── favicon.svg           # Brand favicon
```

---

## 🚀 Quick Start

### 1. Local Testing
```bash
cd blendify

# Python:
python -m http.server 3000

# Visit: http://localhost:3000
```

### 2. Deploy to Vercel
```bash
npm install -g vercel
vercel
# Follow prompts to deploy!
npm install -g vercel

# 2. Navigate to project folder
cd blendify

# 3. Deploy
vercel

# Follow prompts → Project name: blendify → Deploy ✅
```

### Option B — Drag & Drop (No CLI)
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Click **"Deploy"** → drag the entire `blendify/` folder
4. Done — your site is live! 🎉

### Option C — GitHub (Best for teams)
1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → Import Git Repository
3. Select your repo → Deploy
4. Auto-deploys on every push ✅

---

## 📄 Pages Included

| Page | File | Description |
|------|------|-------------|
| Homepage | `index.html` | Hero, products, testimonials, blog preview |
| Shop | `pages/shop.html` | All products with sidebar filters + sort |
| About Us | `pages/about.html` | Story, values, team, B2C model |
| Blog | `pages/blog.html` | Articles grid + sidebar |
| Contact | `pages/contact.html` | Form + FAQ accordion |
| Privacy Policy | `pages/privacy.html` | Full privacy policy |
| Terms & Conditions | `pages/terms.html` | Full T&Cs |
| Returns | `pages/returns.html` | 30-day return policy |

---

## ✨ Features

- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Sticky navbar with scroll effect
- ✅ Mobile hamburger menu
- ✅ Cart drawer with localStorage persistence
- ✅ Product Quick View modal
- ✅ Scroll reveal animations
- ✅ Search bar toggle
- ✅ Newsletter form
- ✅ FAQ accordion
- ✅ Cookie consent banner
- ✅ Back-to-top button
- ✅ Product filtering & sorting
- ✅ Security headers via vercel.json
- ✅ SEO meta tags on all pages

---

## 🔌 Extending for WordPress/WooCommerce

This static site serves as your exact design reference. To build the WordPress version:

1. **Designer (Member 2):** Use Astra theme + Elementor to replicate the CSS variables and layout
2. **Product Manager (Members 3 & 4):** Use the PRODUCTS array in `js/products.js` as your product catalogue reference
3. **Content Writers (Members 5 & 6):** The About, FAQ, Privacy, Terms, and Returns pages are fully written
4. **Plugin Manager (Member 7):** Cart logic = WooCommerce, Newsletter = MailPoet, Chat = Tawk.to
5. **SEO (Member 8):** Meta descriptions are already written on each page — copy into Yoast SEO

---

## 📊 Business Model
**B2C (Business-to-Consumer)** — Direct-to-consumer online sales. Blendify designs, manufactures, and sells directly to end customers via the web store with no retail intermediaries.

---

*Built for DCIT 209 E-Business Group Project • © 2025 Blendify*
