import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  Tag, 
  ArrowRight, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export default function CartDrawer() {
  const { 
    cart, 
    isCartOpen, 
    closeCart, 
    removeFromCart, 
    updateQty, 
    subtotal, 
    discount, 
    total, 
    appliedCoupon, 
    applyCoupon, 
    removeCoupon,
    openCheckout 
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 2500;
  const progressPercent = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remainingForFreeShip = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setCouponLoading(true);
    await applyCoupon(couponInput.trim());
    setCouponLoading(false);
    setCouponInput('');
  };

  const handleProceedToCheckout = () => {
    closeCart();
    openCheckout();
  };

  return (
    <div className="cart-drawer-overlay" onClick={closeCart}>
      <aside className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        {/* ── Drawer Header ── */}
        <div className="cart-drawer-header">
          <div className="cart-title-wrapper">
            <ShoppingBag size={20} className="gold-icon" />
            <h2 className="cart-drawer-title">Your Private Bag</h2>
            <span className="cart-count-pill">{cart.length} flacons</span>
          </div>
          <button className="cart-close-btn" onClick={closeCart} aria-label="Close Bag">
            <X size={20} />
          </button>
        </div>

        {/* ── Complimentary Courier Progress ── */}
        <div className="free-shipping-box">
          <div className="shipping-text-row">
            {remainingForFreeShip > 0 ? (
              <span>Add <strong className="gold-accent">₹{remainingForFreeShip.toLocaleString('en-IN')}</strong> for Complimentary Courier</span>
            ) : (
              <span className="shipping-unlocked">✨ You have unlocked Complimentary White Glove Courier!</span>
            )}
          </div>
          <div className="shipping-bar-track">
            <div 
              className="shipping-bar-fill" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* ── Cart Items List ── */}
        <div className="cart-items-container">
          {cart.length === 0 ? (
            <div className="cart-empty-state">
              <ShoppingBag size={48} className="empty-cart-icon" />
              <h3>Your Bag is Untouched</h3>
              <p>Explore our Grasse creations and select your personal signature flacon.</p>
              <button className="empty-cart-cta" onClick={closeCart}>
                Discover Fragrances
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map((item) => {
                const imgPath = item.img?.startsWith('/') ? item.img : `/${item.img}`;
                return (
                  <div key={item.cartItemId} className="cart-item-row">
                    <img src={imgPath} alt={item.name} className="cart-item-thumb" />
                    
                    <div className="cart-item-details">
                      <div className="cart-item-top">
                        <h4 className="cart-item-name">{item.name}</h4>
                        <button 
                          className="cart-item-remove"
                          onClick={() => removeFromCart(item.cartItemId)}
                          title="Remove"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <div className="cart-item-meta">
                        <span className="cart-item-size">{item.size}</span>
                        <span className="cart-item-unit">₹{item.price.toLocaleString('en-IN')}</span>
                      </div>

                      <div className="cart-item-bottom">
                        <div className="qty-counter">
                          <button 
                            className="qty-btn" 
                            onClick={() => updateQty(item.cartItemId, -1)}
                            disabled={item.qty <= 1}
                          >
                            <Minus size={12} />
                          </button>
                          <span className="qty-value">{item.qty}</span>
                          <button 
                            className="qty-btn" 
                            onClick={() => updateQty(item.cartItemId, 1)}
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <span className="cart-item-total">
                          ₹{(item.price * item.qty).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Drawer Footer & Checkout ── */}
        {cart.length > 0 && (
          <div className="cart-drawer-footer">
            {/* Coupon Box */}
            {appliedCoupon ? (
              <div className="active-coupon-pill">
                <div className="coupon-info">
                  <Tag size={15} className="gold-icon" />
                  <span>Voucher <strong>{appliedCoupon.code}</strong> Applied (-₹{discount.toLocaleString('en-IN')})</span>
                </div>
                <button className="remove-coupon-btn" onClick={removeCoupon}>
                  <X size={14} />
                </button>
              </div>
            ) : (
              <form className="cart-coupon-form" onSubmit={handleApplyCoupon}>
                <input 
                  type="text" 
                  placeholder="Privilege Voucher (e.g. SCENT10)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                />
                <button type="submit" disabled={couponLoading}>
                  {couponLoading ? '...' : 'Apply'}
                </button>
              </form>
            )}

            {/* Price Calculations */}
            <div className="cart-summary-rows">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discount > 0 && (
                <div className="summary-row discount-row">
                  <span>Privilege Discount</span>
                  <span>-₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="summary-row">
                <span>White Glove Courier</span>
                <span className="free-tag">COMPLIMENTARY</span>
              </div>
              <div className="summary-row grand-total-row">
                <span>Total Due</span>
                <span className="grand-total-val">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button 
              className="checkout-cta-btn"
              onClick={handleProceedToCheckout}
            >
              <span>White Glove Checkout</span>
              <ArrowRight size={18} />
            </button>

            <div className="cart-guarantee-note">
              <ShieldCheck size={14} />
              <span>Directly Bottled in Grasse • Authenticity Guaranteed</span>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
