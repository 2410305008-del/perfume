const express = require('express');
const router = express.Router();
const { createOrder, getOrderById, getOrders } = require('../controllers/ordersController');

router.post('/', createOrder);
router.get('/', getOrders);
router.get('/:id', getOrderById);

module.exports = router;
