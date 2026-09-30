const express = require('express');
const router = express.Router();

const productsRoutes = require('./products.routes');
const ordersRoutes = require('./orders.routes');
const couponsRoutes = require('./coupons.routes');
const contactRoutes = require('./contact.routes');
const newsletterRoutes = require('./newsletter.routes');
const quizRoutes = require('./quiz.routes');
const authRoutes = require('./auth.routes');

// Health Check
router.get('/health', (req, res) => {
  res.json({
    status: 'online',
    maison: 'Your Scent Haute Parfumerie',
    version: '2.0.0',
    timestamp: new Date().toISOString()
  });
});

// Resource Routers
router.use('/products', productsRoutes);
router.use('/orders', ordersRoutes);
router.use('/coupons', couponsRoutes);
router.use('/contact', contactRoutes);
router.use('/newsletter', newsletterRoutes);
router.use('/quiz', quizRoutes);
router.use('/auth', authRoutes);

module.exports = router;
