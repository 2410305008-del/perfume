import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { 
  X, 
  Star, 
  ShoppingBag, 
  Heart, 
  Clock, 
  Wind, 
  Layers, 
  Sparkles,
  Plus,
  Minus 
} from 'lucide-react';

export default function QuickViewModal() {
  const { 
    quickViewProduct, 
    closeQuickView, 
    addToCart, 
    toggleWishlist, 
    isInWishlist 
  } = useCart();

  const [selectedSize, setSelectedSize] = useState('50ml');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedSize(quickViewProduct.size || '50ml');
      setQuantity(1);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const inWishlist = isInWishlist(quickViewProduct.id);
  const imgPath = quickViewProduct.img?.startsWith('/') ? quickViewProduct.img : `/${quickViewProduct.img}`;

  const sizeObj = quickViewProduct.sizes?.find(s => s.size === selectedSize);
  const currentPrice = sizeObj ? sizeObj.price : quickViewProduct.price;

  const handleAdd = () => {
    addToCart(quickViewProduct, selectedSize, quantity);
    closeQuickView();
  };

  return (
    <div className="quickview-overlay" onClick={closeQuickView}>
      <div className="quickview-modal" onClick={(e) => e.stopPropagation()}>
        <button className="quickview-close-btn" onClick={closeQuickView} aria-label="Close details">
          <X size={20} />
        </button>

        <div className="quickview-grid">
          {/* ── Left Flacon Gallery ── */}
          <div className="quickview-media">
            {quickViewProduct.badge && (
              <span className={`modal-badge ${quickViewProduct.badgeClass || 'badge-new'}`}>
                {quickViewProduct.badge}
              </span>
            )}
            <img src={imgPath} alt={quickViewProduct.name} className="quickview-img" />
            
            <div className="quickview-specs-pill">
              <span className="spec-item">
                <Clock size={13} className="gold-icon" /> {quickViewProduct.longevity || '8–12 Hours'}
              </span>
              <span className="spec-dot">•</span>
              <span className="spec-item">
                <Wind size={13} className="gold-icon" /> {quickViewProduct.sillage || 'Enchanting Sillage'}
              </span>
            </div>
          </div>

          {/* ── Right Flacon Details ── */}
          <div className="quickview-info">
            <span className="quickview-category">{quickViewProduct.categoryLabel || quickViewProduct.category}</span>
            <h2 className="quickview-title">{quickViewProduct.name}</h2>

            <div className="quickview-rating-row">
              <div className="rating-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="#d4af37" color="#d4af37" />
                ))}
              </div>
              <span className="rating-text">{quickViewProduct.stars} ({quickViewProduct.reviews} connoisseur reviews)</span>
            </div>

            <p className="quickview-desc">{quickViewProduct.desc}</p>

            {/* Olfactory Pyramid */}
            {quickViewProduct.pyramid && (
              <div className="olfactory-pyramid">
                <div className="pyramid-header">
                  <Layers size={14} className="gold-icon" />
                  <span>The Olfactory Pyramid</span>
                </div>
                <div className="pyramid-notes-list">
                  <div className="pyramid-tier">
                    <span className="tier-label">Top:</span>
                    <span className="tier-content">{quickViewProduct.pyramid.top}</span>
                  </div>
                  <div className="pyramid-tier">
                    <span className="tier-label">Heart:</span>
                    <span className="tier-content">{quickViewProduct.pyramid.heart}</span>
                  </div>
                  <div className="pyramid-tier">
                    <span className="tier-label">Base:</span>
                    <span className="tier-content">{quickViewProduct.pyramid.base}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Size Selector */}
            {quickViewProduct.sizes && (
              <div className="quickview-size-selector">
                <label className="section-label">Select Flacon Size:</label>
                <div className="sizes-grid">
                  {quickViewProduct.sizes.map((s) => (
                    <button
                      key={s.size}
                      type="button"
                      className={`size-card ${selectedSize === s.size ? 'active' : ''}`}
                      onClick={() => setSelectedSize(s.size)}
                    >
                      <span className="size-label">{s.size}</span>
                      <span className="size-name">{s.label}</span>
                      <span className="size-price">₹{s.price.toLocaleString('en-IN')}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price & Quantity & Actions */}
            <div className="quickview-purchase-bar">
              <div className="pricing-box">
                <span className="currency">₹</span>
                <span className="amount">{currentPrice.toLocaleString('en-IN')}</span>
              </div>

              <div className="qty-counter-modal">
                <button 
                  className="qty-btn" 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus size={13} />
                </button>
                <span className="qty-val">{quantity}</span>
                <button 
                  className="qty-btn" 
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus size={13} />
                </button>
              </div>

              <button className="modal-add-to-bag" onClick={handleAdd}>
                <ShoppingBag size={17} />
                <span>Add to Bag</span>
              </button>

              <button 
                className={`modal-wishlist-toggle ${inWishlist ? 'active' : ''}`}
                onClick={() => toggleWishlist(quickViewProduct.id)}
                title="Save to Wishlist"
              >
                <Heart size={18} fill={inWishlist ? "var(--pink-accent)" : "none"} color={inWishlist ? "var(--pink-accent)" : "currentColor"} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
