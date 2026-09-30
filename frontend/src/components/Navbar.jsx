import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  Sun, 
  Moon, 
  Sparkles, 
  Menu, 
  X,
  User as UserIcon,
  LogOut
} from 'lucide-react';

export default function Navbar() {
  const { 
    itemCount, 
    openCart, 
    wishlist, 
    openWishlist, 
    openSearch, 
    openQuiz,
    showToast
  } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, initials, logout } = useAuth();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* ── Announcement Bar ── */}
      <div className="announcement-bar">
        <div className="announcement-content">
          <span>✨ Complimentary White Glove Courier on orders over ₹2,500</span>
          <span className="announcement-sep">•</span>
          <span>Use Code <strong className="gold-code">SCENT10</strong> for 10% Welcome Privilege</span>
          <span className="announcement-sep">•</span>
          <span>Artisanal French Flacons Bottled in Grasse</span>
        </div>
      </div>

      {/* ── Main Navigation Header ── */}
      <header className="main-header">
        <div className="header-container">
          {/* Mobile Menu Trigger */}
          <button 
            className="mobile-menu-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Maison Brand Logo */}
          <Link to="/" className="brand-logo">
            <span className="brand-subtitle">Haute Parfumerie</span>
            <span className="brand-name">YOUR SCENT</span>
            <span className="brand-origin">Paris • Mumbai</span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav">
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
              Maison
            </Link>
            <Link to="/shop" className={`nav-link ${isActive('/shop') ? 'active' : ''}`}>
              Catalog
            </Link>
            <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>
              Atelier Story
            </Link>
            <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>
              Concierge
            </Link>
          </nav>

          {/* Navigation Action Buttons */}
          <div className="header-actions">
            {/* Fragrance Finder Quiz CTA */}
            <button 
              className="action-btn quiz-nav-btn" 
              onClick={openQuiz}
              title="Fragrance Finder Quiz"
            >
              <Sparkles size={16} className="quiz-icon-sparkle" />
              <span className="quiz-btn-text">Scent Finder</span>
            </button>

            {/* Live Search */}
            <button 
              className="action-btn" 
              onClick={openSearch} 
              aria-label="Search Fragrances"
              title="Search Catalog"
            >
              <Search size={18} />
            </button>

            {/* Theme Switcher */}
            <button 
              className="action-btn theme-toggle-btn" 
              onClick={toggleTheme}
              aria-label="Toggle Luxury Dark/Light Theme"
              title={`Switch to ${theme === 'light' ? 'Midnight Luxury' : 'Day Atelier'} Mode`}
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {/* Wishlist */}
            <button 
              className="action-btn wishlist-btn" 
              onClick={openWishlist}
              aria-label="View Saved Fragrances"
              title="Your Wishlist"
            >
              <Heart size={18} />
              {wishlist.length > 0 && (
                <span className="badge-count wishlist-badge">{wishlist.length}</span>
              )}
            </button>

            {/* Shopping Bag / Cart */}
            <button 
              className="action-btn cart-btn" 
              onClick={openCart}
              aria-label="View Shopping Bag"
              title="Shopping Bag"
            >
              <ShoppingBag size={19} />
              {itemCount > 0 && (
                <span className="badge-count cart-badge">{itemCount}</span>
              )}
            </button>

            {/* User Account / Sign In */}
            {isAuthenticated ? (
              <div className="user-menu-wrapper" ref={dropdownRef}>
                <button
                  className="user-avatar-btn"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  title={`Signed in as ${user?.name}`}
                  aria-label="Member Account Menu"
                >
                  <span className="user-avatar-initials">{initials}</span>
                </button>

                {userDropdownOpen && (
                  <div className="user-dropdown-menu">
                    <div className="user-dropdown-header">
                      <strong className="user-dropdown-name">{user?.name}</strong>
                      <span className="user-dropdown-email">{user?.email}</span>
                      <span className="user-vip-pill">✨ Atelier Member</span>
                    </div>
                    <div className="user-dropdown-divider" />
                    <button
                      className="user-dropdown-item logout-item"
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                        showToast('You have been signed out.');
                      }}
                    >
                      <LogOut size={15} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth"
                className="action-btn auth-nav-btn"
                title="Member Sign In / Join"
                aria-label="Member Sign In"
              >
                <UserIcon size={18} />
                <span className="auth-nav-label">Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* ── Mobile Navigation Drawer ── */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <span className="brand-name">YOUR SCENT</span>
              <button 
                className="close-drawer-btn" 
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
            <nav className="mobile-nav-links">
              <Link 
                to="/" 
                className={`mobile-nav-link ${isActive('/') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Maison Home
              </Link>
              <Link 
                to="/shop" 
                className={`mobile-nav-link ${isActive('/shop') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Perfume Catalog
              </Link>
              <Link 
                to="/about" 
                className={`mobile-nav-link ${isActive('/about') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Atelier Heritage
              </Link>
              <Link 
                to="/contact" 
                className={`mobile-nav-link ${isActive('/contact') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                VIP Concierge
              </Link>

              {/* Mobile Auth Link */}
              {isAuthenticated ? (
                <div className="mobile-user-section">
                  <div className="mobile-user-info">
                    <span className="user-avatar-initials">{initials}</span>
                    <div>
                      <strong>{user?.name}</strong>
                      <small>{user?.email}</small>
                    </div>
                  </div>
                  <button 
                    className="mobile-logout-btn"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                      showToast('You have been signed out.');
                    }}
                  >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/auth"
                  className={`mobile-nav-link mobile-auth-link ${isActive('/auth') ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <UserIcon size={18} />
                  <span>Member Sign In / Join</span>
                </Link>
              )}
            </nav>

            <div className="mobile-drawer-footer">
              <button 
                className="mobile-quiz-cta" 
                onClick={() => { setMobileMenuOpen(false); openQuiz(); }}
              >
                <Sparkles size={16} />
                <span>Take Fragrance Quiz</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
