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

const validateCoupon = (req, res) => {
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
};

module.exports = {
  COUPONS,
  validateCoupon
};
