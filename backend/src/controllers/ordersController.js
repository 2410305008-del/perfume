const { readData, writeData } = require('../utils/storage');
const { COUPONS } = require('./couponsController');

const createOrder = async (req, res) => {
  try {
    const { items, shipping, paymentMethod, promoCode } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Shopping bag cannot be empty' });
    }

    if (!shipping || !shipping.name || !shipping.phone || !shipping.address) {
      return res.status(400).json({ success: false, message: 'Incomplete shipping information' });
    }

    const allProducts = await readData('products.json', []);

    // Server-side verified calculation
    let subtotal = 0;
    const verifiedItems = items.map(item => {
      const product = allProducts.find(p => p.id === item.id);
      const chosenSize = item.selectedSize || item.size || '50ml';
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
        total: itemTotal,
        img: product ? product.img : item.img
      };
    });

    // Discount verification
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
};

const getOrderById = async (req, res) => {
  try {
    const orders = await readData('orders.json', []);
    const order = orders.find(o => o.orderId.toUpperCase() === req.params.id.toUpperCase());

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, order });
  } catch (error) {
    console.error('Error getting order:', error);
    res.status(500).json({ success: false, message: 'Error retrieving order' });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await readData('orders.json', []);
    res.json({ success: true, count: orders.length, orders });
  } catch (error) {
    console.error('Error getting orders list:', error);
    res.status(500).json({ success: false, message: 'Error retrieving orders list' });
  }
};

module.exports = {
  createOrder,
  getOrderById,
  getOrders
};
