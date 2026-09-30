import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist, openQuickView } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.size || '50ml');

  const inWishlist = isInWishlist(product.id);

  // Find price for selected size if available
  const sizeObj = product.sizes?.find(s => s.size === selectedSize);
  const currentPrice = sizeObj ? sizeObj.price : product.price;

  // Ensure image path starts with / if relative
  const imageSrc = product.img.startsWith('/') ? product.img : `/${product.img}`;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, selectedSize, 1);
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    openQuickView(product);
  };

  return (
    <div className="product-card">
      {/* ── Card Media / Image ── */}
      <div className="product-card-img-wrapper" onClick={handleQuickView}>
        {product.badge && (
          <span className={`product-badge ${product.badgeClass || 'badge-new'}`}>
            {product.badge}
          </span>
        )}

        <img 
          src={imageSrc} 
          alt={product.name} 
          className="product-card-img" 
          loading="lazy"
        />

        {/* Floating Action Overlays */}
        <div className="card-actions-overlay">
          <button 
            type="button"
            className={`card-action-icon-btn ${inWishlist ? 'active' : ''}`}
            onClick={handleToggleWishlist}
            aria-label="Toggle Wishlist"
            title={inWishlist ? "Saved in Wishlist" : "Add to Wishlist"}
          >
            <Heart size={18} fill={inWishlist ? "var(--pink-accent)" : "none"} color={inWishlist ? "var(--pink-accent)" : "currentColor"} />
          </button>
          
          <button 
            type="button"
            className="card-action-icon-btn"
            onClick={handleQuickView}
            aria-label="Quick View"
            title="Quick Fragrance Details"
          >
            <Eye size={18} />
          </button>
        </div>
      </div>

      {/* ── Card Content ── */}
      <div className="product-card-info">
        <div className="product-card-meta">
          <span className="product-category-label">{product.categoryLabel || product.category}</span>
          <div className="product-rating">
            <Star size={13} fill="#d4af37" color="#d4af37" />
            <span className="rating-score">{product.stars}</span>
            <span className="rating-count">({product.reviews})</span>
          </div>
        </div>

        <h3 className="product-card-title" onClick={handleQuickView}>{product.name}</h3>
        <p className="product-card-notes">{product.notes}</p>

        {/* Size Selector Pills */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="product-sizes-bar">
            {product.sizes.map((s) => (
              <button
                key={s.size}
                type="button"
                className={`size-pill ${selectedSize === s.size ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSize(s.size);
                }}
              >
                {s.size}
              </button>
            ))}
          </div>
        )}

        {/* Price & Add to Bag */}
        <div className="product-card-footer">
          <div className="product-pricing">
            <span className="price-currency">₹</span>
            <span className="price-amount">{currentPrice.toLocaleString('en-IN')}</span>
            {product.originalPrice && (
              <span className="price-original">₹{product.originalPrice.toLocaleString('en-IN')}</span>
            )}
          </div>

          <button 
            type="button"
            className="add-to-bag-btn" 
            onClick={handleAddToCart}
            title="Add to Shopping Bag"
          >
            <ShoppingBag size={16} />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>
    </div>
  );
}
