import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';
import { Send, MapPin, Mail, Phone, ShieldCheck, Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  const { showToast } = useCart();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      const res = await api.subscribeNewsletter(email);
      showToast(res.message);
      if (res.success) setEmail('');
    } catch (err) {
      showToast('Failed to join newsletter. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="luxury-footer">
      {/* ── Newsletter Privilege Section ── */}
      <div className="footer-newsletter-banner">
        <div className="footer-container newsletter-flex">
          <div className="newsletter-text">
            <span className="newsletter-eyebrow">
              <Sparkles size={14} className="gold-icon" /> Private Atelier Circle
            </span>
            <h3 className="newsletter-title">Join Our Exclusive Fragrance Salon</h3>
            <p className="newsletter-desc">
              Receive private invitations to limited batch harvests, bespoke flacon releases, and an immediate 10% privilege voucher.
            </p>
          </div>
          <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
            <div className="newsletter-input-group">
              <input 
                type="email" 
                placeholder="Enter your private email address..." 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" disabled={loading} className="newsletter-submit-btn">
                {loading ? 'Joining...' : <><span>Join Salon</span> <Send size={15} /></>}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ── Main Footer Grid ── */}
      <div className="footer-main">
        <div className="footer-container footer-grid">
          {/* Col 1: Maison Heritage */}
          <div className="footer-col brand-col">
            <span className="footer-brand-title">YOUR SCENT</span>
            <span className="footer-brand-subtitle">Haute Parfumerie Française</span>
            <p className="footer-about-text">
              Born in Grasse, France and celebrated in Mumbai, Your Scent crafts limited-edition extrait de parfum blending timeless European nobility with mystical oriental botanicals.
            </p>
            <div className="footer-badges">
              <span className="footer-badge"><ShieldCheck size={14} /> 100% Pure Extracts</span>
              <span className="footer-badge"><Heart size={14} /> Cruelty-Free</span>
            </div>
          </div>

          {/* Col 2: The Collections */}
          <div className="footer-col">
            <h4 className="footer-heading">Fragrance Salons</h4>
            <ul className="footer-links">
              <li><Link to="/shop?category=floral">Grasse Rose & Florals</Link></li>
              <li><Link to="/shop?category=fresh">Mediterranean Citrus</Link></li>
              <li><Link to="/shop?category=woody">Mysore Woods & Oud</Link></li>
              <li><Link to="/shop?category=oriental">Velvet Night Amber</Link></li>
              <li><Link to="/shop">Complete Catalog</Link></li>
            </ul>
          </div>

          {/* Col 3: The Maison */}
          <div className="footer-col">
            <h4 className="footer-heading">The Maison</h4>
            <ul className="footer-links">
              <li><Link to="/about">Our Artisanal Story</Link></li>
              <li><Link to="/about#process">The Grasse Distillation</Link></li>
              <li><Link to="/contact">Private Consultations</Link></li>
              <li><Link to="/contact#locations">Boutique Salons</Link></li>
              <li><Link to="/contact#faq">Concierge FAQ</Link></li>
            </ul>
          </div>

          {/* Col 4: Boutique Salons & Contact */}
          <div className="footer-col">
            <h4 className="footer-heading">Private Ateliers</h4>
            <div className="footer-contact-info">
              <div className="contact-item">
                <MapPin size={16} className="gold-icon" />
                <span>28 Place Vendôme, Paris • Marine Drive, Mumbai</span>
              </div>
              <div className="contact-item">
                <Phone size={16} className="gold-icon" />
                <span>+91 98765 43210 (VIP Line)</span>
              </div>
              <div className="contact-item">
                <Mail size={16} className="gold-icon" />
                <span>concierge@yourscent.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer Bottom Bar ── */}
      <div className="footer-bottom">
        <div className="footer-container bottom-flex">
          <p className="copyright-text">
            © {new Date().getFullYear()} YOUR SCENT Atelier Parfumerie. All rights reserved.
          </p>
          <div className="bottom-links">
            <span>Discreet White Glove Delivery</span>
            <span className="dot">•</span>
            <span>Hand-numbered Flacons</span>
            <span className="dot">•</span>
            <span>Artisanal Batch Authenticity</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
