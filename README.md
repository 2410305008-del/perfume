# 🌸 Your Scent — Haute Parfumerie Française (Full Stack Application)

A luxury e-commerce web application for an artisanal haute parfumerie house, transformed into a modern full-stack architecture with a **React (Vite + React Router)** frontend and a modular **Node.js / Express** backend.

---

## 🏛️ Project Architecture

```
YourScent/
├── backend/                         # Modular Express.js REST API
│   ├── data/                        # Persistent JSON database
│   │   ├── products.json            # Fragrance catalog & olfactory pyramids
│   │   ├── orders.json              # Placed customer orders
│   │   ├── inquiries.json           # Concierge consultation requests
│   │   └── subscribers.json         # VIP newsletter members
│   ├── src/
│   │   ├── controllers/             # Products, Orders, Coupons, Contact, Quiz
│   │   ├── routes/                  # Modular REST API endpoints (/api/*)
│   │   ├── utils/                   # JSON storage helpers
│   │   └── server.js                # Express server configuration
│   └── package.json
│
├── frontend/                        # Luxury React Frontend (Vite + React Router)
│   ├── public/
│   │   └── images/                  # High-res flacon & hero photography
│   ├── src/
│   │   ├── components/              # Navbar, Footer, ProductCard, CartDrawer,
│   │   │                            # WishlistDrawer, QuickViewModal, CheckoutModal,
│   │   │                            # FragranceQuizModal, SearchModal, ChatbotWidget, Toast
│   │   ├── context/                 # CartContext (cart, wishlist, modals), ThemeContext
│   │   ├── pages/                   # Home, Shop (Catalog), About, Contact, OrderSuccess
│   │   ├── services/api.js          # Centralized API service
│   │   ├── styles/                  # global.css, components.css, pages.css
│   │   ├── App.jsx                  # Main application & routing
│   │   └── main.jsx                 # Vite application entry point
│   ├── index.html
│   ├── vite.config.js               # Dev proxy: /api -> http://localhost:5000
│   └── package.json
│
├── package.json                     # Root workspace orchestrator
└── README.md
```

---

## 🚀 Quick Start Guide

### 1. Run Full-Stack App (Frontend + Backend Concurrently)
From the root directory:
```bash
npm run dev
```
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000/api](http://localhost:5000/api)
- **API Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

### 2. Run Independently

#### Run Backend Server:
```bash
npm run dev:backend
# or: cd backend && node src/server.js
```

#### Run Frontend Client:
```bash
npm run dev:frontend
# or: cd frontend && npm run dev
```

---

## ✨ Features & Capabilities

- 🌹 **Maison Home Page (`/`)**: Hero crystal flacon showcase, interactive fragrance quiz teaser, curated bestsellers, atelier story, connoisseur reviews.
- 🧴 **Fragrance Catalog (`/shop`)**: Dynamic filtering by olfactory family (Floral, Citrus, Woody, Oriental), max-price slider, sorting (Price Low/High, Rating, Name), and real-time search.
- 📖 **Atelier Heritage (`/about`)**: Savoir-faire story, 4-step distillation process (Dawn harvest, alembic distillation, 45-day French oak maturation, hand filling), ethical metrics.
- 🛎️ **Private Concierge (`/contact`)**: Bespoke consultation booking form submitting directly to backend, boutique atelier locations (Paris, Mumbai, Dubai), interactive FAQ accordion.
- 🛍️ **Luxury Shopping Bag Drawer**: Free courier progress indicator, flacon size switcher, quantity controls, voucher privilege validation (`SCENT10`, `SPRING500`, `FREESHIP`).
- 💳 **White Glove Checkout Flow**: Multi-step checkout modal with address validation, UPI / Card / COD payment methods, instant order generation.
- 📜 **Order Tracking & Receipt (`/order/:id`)**: Dedicated confirmation view with order ID, delivery estimation, and manifest.
- 🔮 **Master Fragrance Finder Quiz**: 3-question olfactory harmony quiz with algorithmic recommendation.
- 🔍 **Live Instant Search**: Full-screen modal with popular note tags (Rose, Citrus, Lavender, Vanilla) and real-time query results.
- 💬 **Atelier Concierge Chatbot**: Interactive floating concierge offering fragrance recommendations and customer assistance.
- 🌓 **Day & Midnight Theme**: Seamless light atelier and midnight dark luxury modes.
