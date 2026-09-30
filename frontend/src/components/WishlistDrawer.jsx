import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

export default function WishlistDrawer() {
  const { 
    isWishlistOpen, 
    closeWishlist, 
    wishlist, 
    toggleWishlist, 
    addToCart 
  } = useCart();

  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isWishlistOpen) {
      setLoading(true);
      api.getProducts()
        .then(res => {
          if (res.success) setAllProducts(res.products);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [isWishlistOpen]);

  if (!isWishlistOpen) return null;

  const savedProducts = allProducts.filter(p => wishlist.includes(p.id));

  const handleMoveToBag = (product) => {
    addToCart(product, product.size || '50ml', 1);
    toggleWishlist(product.id);
  };

  return (
    <div className="wishlist-drawer-overlay" onClick={closeWishlist}>
      <aside className="wishlist-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="wishlist-drawer-header">
          <div className="wishlist-title-wrapper">
            <Heart size={20} className="gold-icon" fill="var(--pink-accent)" color="var(--pink-accent)" />
            <h2 className="wishlist-drawer-title">Private Wishlist</h2>
            <span className="wishlist-count-pill">{wishlist.length} saved</span>
          </div>
          <button className="wishlist-close-btn" onClick={closeWishlist} aria-label="Close Wishlist">
            <X size={20} />
          </button>
        </div>

        <div className="wishlist-items-container">
          {savedProducts.length === 0 ? (
            <div className="wishlist-empty-state">
              <Heart size={48} className="empty-wishlist-icon" />
              <h3>Your Wishlist is Empty</h3>
              <p>Save your favorite extrait de parfum creations to revisit anytime.</p>
              <button className="empty-wishlist-cta" onClick={closeWishlist}>
                Explore Catalog
              </button>
            </div>
          ) : (
            <div className="wishlist-items-list">
              {savedProducts.map((product) => {
                const imgPath = product.img?.startsWith('/') ? product.img : `/${product.img}`;
                return (
                  <div key={product.id} className="wishlist-item-row">
                    <img src={imgPath} alt={product.name} className="wishlist-item-thumb" />
                    
                    <div className="wishlist-item-details">
                      <div className="wishlist-item-top">
                        <h4 className="wishlist-item-name">{product.name}</h4>
                        <button 
                          className="wishlist-item-remove"
                          onClick={() => toggleWishlist(product.id)}
                          title="Remove from wishlist"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <p className="wishlist-item-notes">{product.notes}</p>
                      
                      <div className="wishlist-item-bottom">
                        <span className="wishlist-item-price">₹{product.price.toLocaleString('en-IN')}</span>
                        <button 
                          className="wishlist-move-btn"
                          onClick={() => handleMoveToBag(product)}
                        >
                          <ShoppingBag size={14} />
                          <span>Move to Bag</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
