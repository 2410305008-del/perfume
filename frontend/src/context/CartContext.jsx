import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const CartContext = createContext();

export function CartProvider({ children }) {
  // ── Cart State ──────────────────────────────────────
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('yourscent_cart_v2');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // ── Wishlist State ──────────────────────────────────
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('yourscent_wishlist_v2');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // ── Modals & Drawers State ──────────────────────────
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // ── Toast Notification State ────────────────────────
  const [toast, setToast] = useState({ show: false, message: '' });

  // ── Coupon / Voucher State ──────────────────────────
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('yourscent_cart_v2', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('yourscent_wishlist_v2', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 3200);
  };

  // ── Cart Methods ────────────────────────────────────
  const addToCart = (product, chosenSize = '50ml', chosenQty = 1) => {
    const sizeObj = product.sizes?.find(s => s.size === chosenSize);
    const unitPrice = sizeObj ? sizeObj.price : product.price;
    const cartItemId = `${product.id}-${chosenSize}`;

    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].qty += chosenQty;
        return updated;
      } else {
        return [
          ...prev,
          {
            cartItemId,
            id: product.id,
            name: product.name,
            price: unitPrice,
            size: chosenSize,
            qty: chosenQty,
            img: product.img,
            notes: product.notes || product.categoryLabel
          }
        ];
      }
    });

    showToast(`Added ${product.name} (${chosenSize}) to your Bag`);
  };

  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
    showToast('Flacon removed from your Bag');
  };

  const updateQty = (cartItemId, delta) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // ── Wishlist Methods ────────────────────────────────
  const toggleWishlist = (product) => {
    const id = typeof product === 'object' ? product.id : product;
    setWishlist(prev => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('Removed from your Wishlist');
        return prev.filter(item => item !== id);
      } else {
        showToast('Saved to your Private Wishlist');
        return [...prev, id];
      }
    });
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  // ── Calculations ────────────────────────────────────
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percent') {
      discount = Math.round(subtotal * appliedCoupon.discount);
    } else if (appliedCoupon.type === 'flat') {
      discount = Math.min(subtotal, appliedCoupon.discount);
    }
  }

  const total = Math.max(0, subtotal - discount);
  const itemCount = cart.reduce((acc, item) => acc + item.qty, 0);

  // ── Coupon Logic ────────────────────────────────────
  const applyCoupon = async (code) => {
    if (!code || !code.trim()) {
      showToast('Please enter a voucher code');
      return { success: false, message: 'Please enter a voucher code' };
    }

    try {
      const result = await api.validateCoupon(code.trim());
      if (result.success) {
        setAppliedCoupon(result.coupon);
        showToast(result.message);
        return { success: true, message: result.message };
      } else {
        showToast(result.message || 'Invalid voucher code');
        return { success: false, message: result.message };
      }
    } catch (err) {
      showToast('Error validating voucher code');
      return { success: false, message: 'Error validating voucher code' };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Voucher removed');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        subtotal,
        discount,
        total,
        itemCount,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        isWishlistOpen,
        openWishlist: () => setIsWishlistOpen(true),
        closeWishlist: () => setIsWishlistOpen(false),
        quickViewProduct,
        openQuickView: (product) => setQuickViewProduct(product),
        closeQuickView: () => setQuickViewProduct(null),
        isCheckoutOpen,
        openCheckout: () => setIsCheckoutOpen(true),
        closeCheckout: () => setIsCheckoutOpen(false),
        isQuizOpen,
        openQuiz: () => setIsQuizOpen(true),
        closeQuiz: () => setIsQuizOpen(false),
        isSearchOpen,
        openSearch: () => setIsSearchOpen(true),
        closeSearch: () => setIsSearchOpen(false),
        toast,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
