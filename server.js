/* ============================================
   YOUR SCENT — Haute Parfumerie Backend API
   Node.js + Express + Persistent JSON Store
   ============================================ */

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_DIR = path.join(__dirname, 'data');

// ── Middleware ────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  const time = new Date().toISOString().split('T')[1].split('.')[0];
  console.log(`[${time}] ${req.method} ${req.originalUrl}`);
  next();
});

// Serve frontend static assets
app.use(express.static(__dirname));

// ── File Storage Helpers ──────────────────────
async function readData(fileName, fallback = []) {
  const filePath = path.join(DATA_DIR, fileName);
  try {
    const raw = await fsPromises.readFile(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    return fallback;
  }
}

async function writeData(fileName, data) {
  const filePath = path.join(DATA_DIR, fileName);
  await fsPromises.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
}

// ── Valid Coupons ─────────────────────────────
const COUPONS = {
  SCENT10: {
    code: 'SCENT10',
    discount: 0.1,
    type: 'percent',
    label: '10% Luxury Welcome Discount'
  },
  SPRING500: {
    code: 'SPRING500',
    discount: 500,
    type: 'flat',
    label: '₹500 Spring Season Voucher'
  },
  FREESHIP: {
    code: 'FREESHIP',
    discount: 0,
    type: 'free_shipping',
    label: 'Complimentary White Glove Courier'
  }
};

// ============================================
// REST API ENDPOINTS
// ============================================

// ── 1. Health Check ───────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    maison: 'Your Scent Haute Parfumerie',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// ── 2. Products API ───────────────────────────
app.get('/api/products', async (req, res) => {
  try {
    let products = await readData('products.json', []);
    const { category, search, sort, limit } = req.query;

    if (category && category !== 'all') {
      products = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase().trim();
      products = products.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.notes.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q)
      );
    }

    if (sort) {
      switch (sort) {
        case 'price-low':
          products.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          products.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          products.sort((a, b) => b.stars - a.stars);
          break;
        case 'name':
          products.sort((a, b) => a.name.localeCompare(b.name));
          break;
      }
    }

    if (limit) {
      const num = parseInt(limit, 10);
      if (!isNaN(num) && num > 0) {
        products = products.slice(0, num);
      }
    }

    res.json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving products' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const products = await readData('products.json', []);
    const id = parseInt(req.params.id, 10);
    const product = products.find(p => p.id === id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Fragrance not found' });
    }

    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving fragrance details' });
  }
});

// ── 3. Coupon Validation API ───────────────────
app.post('/api/coupons/validate', (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ success: false, message: 'Coupon code is required' });
  }

  const upper = code.trim().toUpperCase();
  const coupon = COUPONS[upper];

  if (!coupon) {
    return res.status(404).json({
      success: false,
      message: 'Invalid or expired voucher code. Try SCENT10 or SPRING500'
    });
  }

  res.json({
    success: true,
    message: `Voucher "${coupon.code}" activated!`,
    coupon
  });
});

// ── 4. Orders API ─────────────────────────────
app.post('/api/orders', async (req, res) => {
  try {
    const { items, shipping, paymentMethod, promoCode } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Shopping bag cannot be empty' });
    }

    if (!shipping || !shipping.name || !shipping.phone || !shipping.address) {
      return res.status(400).json({ success: false, message: 'Incomplete shipping information' });
    }

    const allProducts = await readData('products.json', []);

    // Secure server-side calculation
    let subtotal = 0;
    const verifiedItems = items.map(item => {
      const product = allProducts.find(p => p.id === item.id);
      const chosenSize = item.selectedSize || '50ml';
      const sizeObj = product?.sizes?.find(s => s.size === chosenSize);
      const unitPrice = sizeObj ? sizeObj.price : (product ? product.price : (item.price || 0));
      const qty = Math.max(1, parseInt(item.qty, 10) || 1);
      const itemTotal = unitPrice * qty;
      subtotal += itemTotal;

      return {
        id: item.id,
        name: product ? product.name : item.name,
        size: chosenSize,
        price: unitPrice,
        qty,
        total: itemTotal
      };
    });

    // Calculate discount
    let discount = 0;
    let appliedPromo = null;
    if (promoCode) {
      const upper = promoCode.trim().toUpperCase();
      if (COUPONS[upper]) {
        appliedPromo = COUPONS[upper];
        if (appliedPromo.type === 'percent') {
          discount = Math.round(subtotal * appliedPromo.discount);
        } else if (appliedPromo.type === 'flat') {
          discount = Math.min(subtotal, appliedPromo.discount);
        }
      }
    }

    const total = Math.max(0, subtotal - discount);
    const orderId = `YS-2026-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder = {
      orderId,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
      shipping: {
        name: shipping.name.trim(),
        phone: shipping.phone.trim(),
        email: (shipping.email || '').trim(),
        address: shipping.address.trim(),
        city: (shipping.city || 'Mumbai').trim(),
        pincode: (shipping.pincode || '400001').trim()
      },
      payment: {
        method: paymentMethod || 'upi',
        status: paymentMethod === 'cod' ? 'pending_delivery' : 'authorized'
      },
      pricing: {
        subtotal,
        discount,
        promoCode: appliedPromo ? appliedPromo.code : null,
        delivery: 'FREE',
        total
      },
      items: verifiedItems,
      estimatedDelivery: '3–5 Business Days'
    };

    // Save to persistent file
    const existingOrders = await readData('orders.json', []);
    existingOrders.unshift(newOrder);
    await writeData('orders.json', existingOrders);

    console.log(`[Order Placed] Order #${orderId} for ${shipping.name} — ₹${total}`);

    res.status(201).json({
      success: true,
      message: 'Luxury order successfully confirmed',
      order: newOrder
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ success: false, message: 'Server error processing order' });
  }
});

app.get('/api/orders/:id', async (req, res) => {
  try {
    const orders = await readData('orders.json', []);
    const order = orders.find(o => o.orderId.toUpperCase() === req.params.id.toUpperCase());

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving order' });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const orders = await readData('orders.json', []);
    res.json({ success: true, count: orders.length, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving orders list' });
  }
});

// ── 5. Contact / Concierge Inquiries API ──────
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, inquiryNature, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required' });
    }

    const inquiry = {
      id: `INQ-${Date.now()}`,
      createdAt: new Date().toISOString(),
      name: name.trim(),
      email: email.trim(),
      phone: (phone || '').trim(),
      inquiryNature: inquiryNature || 'Personal Fragrance Consultation',
      message: message.trim(),
      status: 'received'
    };

    const inquiries = await readData('inquiries.json', []);
    inquiries.unshift(inquiry);
    await writeData('inquiries.json', inquiries);

    console.log(`[Inquiry Received] From ${inquiry.name} (${inquiry.email})`);

    res.status(201).json({
      success: true,
      message: 'Your inquiry has been received by our master atelier. We shall respond within 24 hours.',
      inquiry
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error submitting inquiry' });
  }
});

app.get('/api/contact', async (req, res) => {
  try {
    const inquiries = await readData('inquiries.json', []);
    res.json({ success: true, count: inquiries.length, inquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving inquiries' });
  }
});

// ── 6. Newsletter Subscription API ────────────
app.post('/api/newsletter', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Valid email address is required' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const subscribers = await readData('subscribers.json', []);

    if (subscribers.some(s => s.email === cleanEmail)) {
      return res.json({
        success: true,
        message: 'You are already a distinguished member of our Private Atelier circle!'
      });
    }

    subscribers.push({
      email: cleanEmail,
      subscribedAt: new Date().toISOString()
    });

    await writeData('subscribers.json', subscribers);
    console.log(`[Newsletter] Subscribed: ${cleanEmail}`);

    res.status(201).json({
      success: true,
      message: 'Welcome to the Private Circle. Your 10% voucher code SCENT10 is active.'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error subscribing to newsletter' });
  }
});

// ── 7. Fragrance Quiz Recommendation API ──────
app.post('/api/quiz/recommend', async (req, res) => {
  try {
    const { vibe, occasion } = req.body;
    const products = await readData('products.json', []);

    let match = products.find(p => p.quizVibe === vibe);
    if (!match) {
      match = products.find(p => p.quizOccasion === occasion) || products[0];
    }

    res.json({
      success: true,
      matchScore: '98%',
      recommendation: match
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error calculating recommendation' });
  }
});

// ── Page Routing Shortcuts ────────────────────
app.get('/shop', (req, res) => res.sendFile(path.join(__dirname, 'shop.html')));
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'about.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'contact.html')));

// ── Start Server ──────────────────────────────
app.listen(PORT, () => {
  console.log(`
  ═══════════════════════════════════════════════════════
  🌸 YOUR SCENT — HAUTE PARFUMERIE BACKEND SERVER ONLINE
  ═══════════════════════════════════════════════════════
  Local URL:        http://localhost:${PORT}
  Catalog:          http://localhost:${PORT}/shop.html
  API Health:       http://localhost:${PORT}/api/health
  Products API:     http://localhost:${PORT}/api/products
  Orders API:       http://localhost:${PORT}/api/orders
  ═══════════════════════════════════════════════════════
  `);
});
