import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  CreditCard, 
  QrCode, 
  Truck, 
  Banknote, 
  ArrowLeft, 
  ArrowRight,
  PackageCheck
} from 'lucide-react';

export default function CheckoutModal() {
  const { 
    isCheckoutOpen, 
    closeCheckout, 
    cart, 
    subtotal, 
    discount, 
    total, 
    appliedCoupon, 
    clearCart,
    showToast 
  } = useCart();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderResult, setOrderResult] = useState(null);

  const [shipping, setShipping] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: 'Mumbai',
    pincode: '400001'
  });

  const [paymentMethod, setPaymentMethod] = useState('upi');

  if (!isCheckoutOpen) return null;

  const handleInputChange = (e) => {
    setShipping({
      ...shipping,
      [e.target.name]: e.target.value
    });
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (!shipping.name || !shipping.phone || !shipping.address) {
      showToast('Please complete all required shipping fields');
      return;
    }
    setStep(2);
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const orderPayload = {
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          selectedSize: item.size,
          price: item.price,
          qty: item.qty
        })),
        shipping,
        paymentMethod,
        promoCode: appliedCoupon ? appliedCoupon.code : null
      };

      const res = await api.createOrder(orderPayload);
      if (res.success) {
        setOrderResult(res.order);
        setStep(3);
        clearCart();
        showToast('Your luxury order has been confirmed!');
      } else {
        showToast(res.message || 'Error processing order');
      }
    } catch (err) {
      showToast('Network error processing your order');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    closeCheckout();
    // Reset state after close
    setTimeout(() => {
      setStep(1);
      setOrderResult(null);
    }, 400);
  };

  return (
    <div className="checkout-overlay" onClick={handleClose}>
      <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
        <button className="checkout-close-btn" onClick={handleClose}>
          <X size={20} />
        </button>

        {/* ── Steps Progress Indicator ── */}
        {step < 3 && (
          <div className="checkout-progress-bar">
            <div className={`checkout-step-indicator ${step >= 1 ? 'active' : ''}`}>
              <span className="step-num">1</span>
              <span className="step-text">White Glove Shipping</span>
            </div>
            <div className="step-connector" />
            <div className={`checkout-step-indicator ${step >= 2 ? 'active' : ''}`}>
              <span className="step-num">2</span>
              <span className="step-text">Payment & Review</span>
            </div>
          </div>
        )}

        {/* ── STEP 1: Shipping Address ── */}
        {step === 1 && (
          <form className="checkout-form" onSubmit={handleNextStep}>
            <div className="form-header">
              <h3 className="checkout-section-title">White Glove Courier Destination</h3>
              <p className="checkout-section-desc">Hand-packaged in silk and velvet flacon boxes.</p>
            </div>

            <div className="form-grid">
              <div className="form-group full-width">
                <label>Full Name *</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  placeholder="e.g. Radhika Sharma"
                  value={shipping.name} 
                  onChange={handleInputChange} 
                />
              </div>

              <div className="form-group">
                <label>Contact Phone (VIP Courier) *</label>
                <input 
                  type="tel" 
                  name="phone" 
                  required 
                  placeholder="+91 98765 43210"
                  value={shipping.phone} 
                  onChange={handleInputChange} 
                />
              </div>

              <div className="form-group">
                <label>Private Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="radhika@example.com"
                  value={shipping.email} 
                  onChange={handleInputChange} 
                />
              </div>

              <div className="form-group full-width">
                <label>Delivery Suite / Address *</label>
                <input 
                  type="text" 
                  name="address" 
                  required 
                  placeholder="Apartment, Street Address, Landmark"
                  value={shipping.address} 
                  onChange={handleInputChange} 
                />
              </div>

              <div className="form-group">
                <label>City *</label>
                <input 
                  type="text" 
                  name="city" 
                  required 
                  value={shipping.city} 
                  onChange={handleInputChange} 
                />
              </div>

              <div className="form-group">
                <label>Pincode / Postal Code *</label>
                <input 
                  type="text" 
                  name="pincode" 
                  required 
                  value={shipping.pincode} 
                  onChange={handleInputChange} 
                />
              </div>
            </div>

            <div className="checkout-footer-buttons">
              <button type="button" className="btn-secondary" onClick={handleClose}>
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                <span>Continue to Payment</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </form>
        )}

        {/* ── STEP 2: Payment Method & Order Summary ── */}
        {step === 2 && (
          <div className="checkout-payment-step">
            <div className="form-header">
              <h3 className="checkout-section-title">Select Payment Preference</h3>
              <p className="checkout-section-desc">Encrypted 256-bit luxury transaction gateway.</p>
            </div>

            <div className="payment-methods-grid">
              <button
                type="button"
                className={`payment-method-card ${paymentMethod === 'upi' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('upi')}
              >
                <QrCode size={24} className="gold-icon" />
                <div className="method-text">
                  <strong>UPI / QR Code</strong>
                  <span>GPay, PhonePe, Paytm & BHIM</span>
                </div>
              </button>

              <button
                type="button"
                className={`payment-method-card ${paymentMethod === 'card' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('card')}
              >
                <CreditCard size={24} className="gold-icon" />
                <div className="method-text">
                  <strong>Luxury Card</strong>
                  <span>Visa, Mastercard, Amex Black</span>
                </div>
              </button>

              <button
                type="button"
                className={`payment-method-card ${paymentMethod === 'cod' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('cod')}
              >
                <Banknote size={24} className="gold-icon" />
                <div className="method-text">
                  <strong>White Glove COD</strong>
                  <span>Pay upon discrete delivery</span>
                </div>
              </button>
            </div>

            {/* Quick Summary of Bag */}
            <div className="checkout-summary-card">
              <h4 className="summary-card-title">Order Flacons ({cart.length})</h4>
              <div className="checkout-items-preview">
                {cart.map(item => (
                  <div key={item.cartItemId} className="preview-row">
                    <span>{item.name} ({item.size}) × {item.qty}</span>
                    <span>₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>

              <div className="summary-math">
                <div className="math-row">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discount > 0 && (
                  <div className="math-row discount">
                    <span>Voucher Privilege ({appliedCoupon?.code})</span>
                    <span>-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="math-row">
                  <span>White Glove Courier</span>
                  <span className="free-tag">COMPLIMENTARY</span>
                </div>
                <div className="math-row total">
                  <span>Total Amount Due</span>
                  <span className="total-gold">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <div className="checkout-footer-buttons">
              <button type="button" className="btn-secondary" onClick={() => setStep(1)}>
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>
              <button 
                type="button" 
                className="btn-primary" 
                onClick={handlePlaceOrder}
                disabled={loading}
              >
                {loading ? 'Authorizing...' : (
                  <>
                    <span>Confirm Order (₹{total.toLocaleString('en-IN')})</span>
                    <ShieldCheck size={16} />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: Order Confirmation Success ── */}
        {step === 3 && orderResult && (
          <div className="checkout-success-view">
            <div className="success-icon-wrapper">
              <CheckCircle2 size={56} className="gold-success-icon" />
            </div>

            <span className="success-eyebrow">Haute Parfumerie Confirmation</span>
            <h2 className="success-title">Order Successfully Confirmed</h2>
            <p className="success-sub">
              Thank you, <strong>{orderResult.shipping.name}</strong>. Your artisanal flacons are now entering bespoke packaging at our atelier.
            </p>

            <div className="order-details-box">
              <div className="order-badge-row">
                <span className="order-id-label">Order Reference:</span>
                <span className="order-id-val">{orderResult.orderId}</span>
              </div>
              <div className="order-meta-grid">
                <div className="meta-block">
                  <Truck size={16} className="gold-icon" />
                  <div>
                    <strong>Courier Status</strong>
                    <span>{orderResult.estimatedDelivery}</span>
                  </div>
                </div>
                <div className="meta-block">
                  <ShieldCheck size={16} className="gold-icon" />
                  <div>
                    <strong>Payment</strong>
                    <span className="capitalize">{orderResult.payment.method} ({orderResult.payment.status})</span>
                  </div>
                </div>
              </div>

              <div className="confirmed-items-list">
                {orderResult.items.map(it => (
                  <div key={it.id + it.size} className="confirmed-item-row">
                    <span>{it.name} ({it.size}) × {it.qty}</span>
                    <span>₹{it.total.toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>

              <div className="confirmed-total-row">
                <span>Total Paid</span>
                <span className="total-gold">₹{orderResult.pricing.total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button className="btn-primary full-width" onClick={handleClose}>
              <PackageCheck size={18} />
              <span>Return to Collections</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
