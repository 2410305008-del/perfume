/* ========================================================
   YOUR SCENT — Haute Parfumerie Modular Backend Server
   Node.js + Express + Persistent JSON Storage
   ======================================================== */

const express = require('express');
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./routes');

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ──────────────────────────────────────────
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger
app.use((req, res, next) => {
  const time = new Date().toISOString().split('T')[1].split('.')[0];
  console.log(`[${time}] ${req.method} ${req.originalUrl}`);
  next();
});

// Static assets (images fallback)
const rootImagesDir = path.join(__dirname, '..', '..', 'images');
app.use('/images', express.static(rootImagesDir));

// ── API Routes ──────────────────────────────────────────
app.use('/api', apiRoutes);

// Root Health / Info endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Your Scent Haute Parfumerie API',
    status: 'online',
    version: '2.0.0',
    documentation: {
      health: '/api/health',
      products: '/api/products',
      orders: '/api/orders',
      contact: '/api/contact',
      newsletter: '/api/newsletter',
      quiz: '/api/quiz/recommend'
    }
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Endpoint not found: ${req.method} ${req.originalUrl}` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal Haute Parfumerie Server Error',
    error: process.env.NODE_ENV === 'production' ? undefined : err.message
  });
});

// ── Start Server ────────────────────────────────────────
let server;
if (require.main === module) {
  server = app.listen(PORT, () => {
    console.log(`
  ══════════════════════════════════════════════════════════
  🌸 YOUR SCENT — MODULAR BACKEND ONLINE
  ══════════════════════════════════════════════════════════
  Server Port:     http://localhost:${PORT}
  Health Check:    http://localhost:${PORT}/api/health
  Products API:    http://localhost:${PORT}/api/products
  Orders API:      http://localhost:${PORT}/api/orders
  ══════════════════════════════════════════════════════════
    `);
  });
}

module.exports = { app, server };

