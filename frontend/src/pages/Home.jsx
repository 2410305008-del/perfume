import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';
import ProductCard from '../components/ProductCard';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Droplet, 
  Feather, 
  Award, 
  Star, 
  Compass,
  Check 
} from 'lucide-react';

export default function Home() {
  const { openQuiz } = useCart();
  const [bestsellers, setBestsellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getProducts({ limit: 6 })
      .then(res => {
        if (res.success) {
          setBestsellers(res.products);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="home-page">
      {/* ── 1. Hero Section ── */}
      <section className="hero">
        <div className="hero-bg-shapes">
          <div className="hero-blob hero-blob-1" />
          <div className="hero-blob hero-blob-2" />
          <div className="hero-blob hero-blob-3" />
        </div>

        <div className="hero-content">
          <div className="hero-text-side">
            <div className="hero-tag">
              <Sparkles size={14} />
              <span>Haute Parfumerie Française • Grasse & Mumbai</span>
            </div>

            <h1 className="hero-title">
              Elegance Captured in Every Note.
            </h1>

            <p className="hero-sub">
              Artisanal fragrances crafted with rare botanical essences and centuries-old French mastery. Hand-bottled in bespoke crystal flacons for those who command distinction.
            </p>

            <div className="hero-cta-group">
              <Link to="/shop" className="btn-primary hero-btn">
                <span>Explore Catalog</span>
                <ArrowRight size={18} />
              </Link>
              <button className="btn-secondary hero-btn" onClick={openQuiz}>
                <Sparkles size={17} className="gold-icon" />
                <span>Find Your Scent</span>
              </button>
            </div>

            <div className="hero-features-strip">
              <div className="feature-item">
                <ShieldCheck size={16} className="gold-icon" />
                <span>White Glove Delivery</span>
              </div>
              <div className="feature-item">
                <Droplet size={16} className="gold-icon" />
                <span>100% Extrait de Parfum</span>
              </div>
              <div className="feature-item">
                <Feather size={16} className="gold-icon" />
                <span>2 Free Flacon Samples</span>
              </div>
            </div>
          </div>

          <div className="hero-visual-side">
            <div className="hero-image-halo" />
            <div className="hero-image-wrapper">
              <img 
                src="/images/hero.png" 
                alt="Your Scent Signature Crystal Flacon" 
                className="hero-main-flacon"
              />
              {/* Floating Floating Badges */}
              <div className="floating-badge badge-top-right">
                <Award size={15} className="gold-icon" />
                <span>Grasse May Rose Harvest</span>
              </div>
              <div className="floating-badge badge-bottom-left">
                <Sparkles size={15} className="gold-icon" />
                <span>Hand-Numbered Editions</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Fragrance Finder Banner ── */}
      <section className="quiz-teaser-section">
        <div className="page-container">
          <div className="quiz-teaser-card">
            <div className="quiz-teaser-info">
              <span className="quiz-teaser-eyebrow">
                <Compass size={15} className="gold-icon" /> Olfactory Consultation
              </span>
              <h2 className="quiz-teaser-title">Unsure of Your Signature Fragrance?</h2>
              <p className="quiz-teaser-desc">
                Take our 60-second interactive fragrance quiz designed by French master noses. Discover your tailored fragrance harmony with 98% accuracy.
              </p>
            </div>
            <button className="quiz-teaser-btn" onClick={openQuiz}>
              <span>Start Fragrance Quiz</span>
              <Sparkles size={17} />
            </button>
          </div>
        </div>
      </section>

      {/* ── 3. Curated Bestsellers Grid ── */}
      <section className="curated-section">
        <div className="page-container">
          <div className="section-header-center">
            <span className="section-eyebrow">La Sélection Privée</span>
            <h2 className="section-main-title">Curated Bestselling Flacons</h2>
            <p className="section-subtitle">
              The most cherished extrait de parfum creations, coveted for their sublime longevity and radiant sillage.
            </p>
          </div>

          {loading ? (
            <div className="products-loading-state">
              <Sparkles size={28} className="spin-gold" />
              <span>Fetching the Private Atelier Collection...</span>
            </div>
          ) : (
            <div className="products-grid">
              {bestsellers.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="section-footer-cta">
            <Link to="/shop" className="btn-outline">
              <span>Explore All 14 Artisanal Creations</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 4. Atelier Craftsmanship Heritage ── */}
      <section className="heritage-story-section">
        <div className="page-container heritage-grid">
          <div className="heritage-image-wrapper">
            <img 
              src="/images/about-hero.png" 
              alt="Grasse French Perfume Harvest" 
              className="heritage-photo" 
            />
            <div className="heritage-experience-badge">
              <strong>100+</strong>
              <span>Years of Grasse Mastery</span>
            </div>
          </div>

          <div className="heritage-content">
            <span className="section-eyebrow">Savoir-Faire Français</span>
            <h2 className="section-main-title">The Alchemy of Pure Botanical Distillation</h2>
            <p className="heritage-lead">
              Every drop of Your Scent is born in Grasse, the world's historic parfumerie capital in Provence. We harvest our Centifolia May Roses exclusively at dawn before the Mediterranean sun touches their petals.
            </p>

            <div className="heritage-pillars-list">
              <div className="pillar-item">
                <div className="pillar-icon">
                  <Droplet size={18} className="gold-icon" />
                </div>
                <div>
                  <h4 className="pillar-title">Pure Botanical Extracts</h4>
                  <p className="pillar-desc">Unadulterated natural absolutes, cold-macerated for 45 days in French oak flacons.</p>
                </div>
              </div>

              <div className="pillar-item">
                <div className="pillar-icon">
                  <Award size={18} className="gold-icon" />
                </div>
                <div>
                  <h4 className="pillar-title">Master Nose Compositions</h4>
                  <p className="pillar-desc">Formulated under the direction of heritage French parfumeurs bridging Europe and India.</p>
                </div>
              </div>

              <div className="pillar-item">
                <div className="pillar-icon">
                  <ShieldCheck size={18} className="gold-icon" />
                </div>
                <div>
                  <h4 className="pillar-title">Sustainable Hand-Blown Crystal</h4>
                  <p className="pillar-desc">Each flacon is infinitely refillable, topped with polished brass atomizers.</p>
                </div>
              </div>
            </div>

            <Link to="/about" className="btn-secondary">
              <span>Read Our Full Story</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 5. Client Connoisseur Testimonials ── */}
      <section className="testimonials-section">
        <div className="page-container">
          <div className="section-header-center">
            <span className="section-eyebrow">Critiques de Parfum</span>
            <h2 className="section-main-title">Voices of Connoisseurs</h2>
            <p className="section-subtitle">
              Echoes of delight from discerning patrons across Paris, Mumbai, London, and Dubai.
            </p>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#d4af37" color="#d4af37" />
                ))}
              </div>
              <p className="testimonial-quote">
                "Rose Bloom is pure olfactory poetry. It evolves on the skin for over 12 hours without losing its delicate, dewy freshness. Truly on par with the highest Place Vendôme perfume houses."
              </p>
              <div className="testimonial-author">
                <strong>Ananya Singhania</strong>
                <span>Mumbai • Haute Horlogerie Collector</span>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#d4af37" color="#d4af37" />
                ))}
              </div>
              <p className="testimonial-quote">
                "The Mysore Sandalwood and Amber in Jasmine Noir is hypnotic. I received compliments throughout a 6-hour charity gala. The White Glove packaging alone was breathtaking."
              </p>
              <div className="testimonial-author">
                <strong>Devendra Mehta</strong>
                <span>London • Luxury Brand Director</span>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#d4af37" color="#d4af37" />
                ))}
              </div>
              <p className="testimonial-quote">
                "Citrus Glow has become my daily morning ritual. Crisp Sicilian lemon balanced with delicate white tea notes that feel luminous, never sharp. Fast delivery to Delhi in 2 days."
              </p>
              <div className="testimonial-author">
                <strong>Kavita Oberoi</strong>
                <span>New Delhi • Interior Architect</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
