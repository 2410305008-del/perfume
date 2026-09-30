import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Droplet, 
  Clock, 
  Layers, 
  ShieldCheck, 
  Award, 
  Heart, 
  ArrowRight,
  Sun,
  MapPin
} from 'lucide-react';

export default function About() {
  return (
    <div className="about-page">
      {/* ── Page Hero ── */}
      <section className="about-hero-section">
        <div className="page-container">
          <div className="about-hero-content">
            <span className="about-hero-tag">
              <Sparkles size={14} className="gold-icon" /> Haute Parfumerie Heritage
            </span>
            <h1 className="about-hero-title">
              Crafted in the Cradle of World Perfumery.
            </h1>
            <p className="about-hero-desc">
              Your Scent was born from a singular passion: to revive the unhurried nobility of historic French perfume compounding and unite it with the opulent botanicals of the ancient East.
            </p>
          </div>
        </div>
      </section>

      {/* ── Story Split Section ── */}
      <section className="about-story-section">
        <div className="page-container story-grid">
          <div className="story-image-wrap">
            <img 
              src="/images/about-story.png" 
              alt="Artisanal Perfumery Compounding" 
              className="story-photo" 
            />
            <div className="story-stat-badge">
              <strong>1889</strong>
              <span>Historic Atelier Roots</span>
            </div>
          </div>

          <div className="story-text-wrap">
            <span className="section-eyebrow">The Atelier Philosophy</span>
            <h2 className="section-main-title">Perfume as Pure Art, Never Mass Production</h2>
            <p className="story-paragraph">
              In an era dominated by synthetic quick-dry chemistry, Your Scent remains steadfastly devoted to the classical art of <em>lente macération</em>. Every flacon is an intimate dialogue between master parfumeur, soil, sun, and season.
            </p>
            <p className="story-paragraph">
              From dawn harvests in the lavender plateaus of Valensole and the rose valleys of Grasse, to ancient wild sandalwood sustainably gathered in Karnataka, each ingredient is chosen solely for its emotional resonance and purity.
            </p>

            <div className="story-quote-card">
              <p>
                "A true extrait de parfum should not announce your arrival abruptly; it should linger in the air like a cherished memory that refuses to fade."
              </p>
              <span className="quote-author">— Jean-Marc Fontaine, Maitre Parfumeur</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── The 4 Steps of Savoir-Faire ── */}
      <section className="about-process-section" id="process">
        <div className="page-container">
          <div className="section-header-center">
            <span className="section-eyebrow">Notre Savoir-Faire</span>
            <h2 className="section-main-title">The Four Pillars of Distillation</h2>
            <p className="section-subtitle">
              Every Your Scent flacon undergoes an unhurried, four-month artisanal evolution before bearing our wax seal.
            </p>
          </div>

          <div className="process-grid">
            <div className="process-card">
              <div className="process-num">01</div>
              <div className="process-icon">
                <Sun size={20} className="gold-icon" />
              </div>
              <h3 className="process-card-title">Dawn Hand-Harvest</h3>
              <p className="process-card-desc">
                Centifolia May Roses and night-blooming Sambac Jasmine are hand-plucked during dew hours when their essential oil density peaks.
              </p>
            </div>

            <div className="process-card">
              <div className="process-num">02</div>
              <div className="process-icon">
                <Droplet size={20} className="gold-icon" />
              </div>
              <h3 className="process-card-title">Cold Hydro-Distillation</h3>
              <p className="process-card-desc">
                Extracted using traditional copper alembics at gentle low pressures, preserving delicate top note volatility without scorch.
              </p>
            </div>

            <div className="process-card">
              <div className="process-num">03</div>
              <div className="process-icon">
                <Clock size={20} className="gold-icon" />
              </div>
              <h3 className="process-card-title">45-Day French Oak Aging</h3>
              <p className="process-card-desc">
                The concentrate matures in toasted Limousin oak casks, allowing the molecules to bind and develop our signature warm velvety base.
              </p>
            </div>

            <div className="process-card">
              <div className="process-num">04</div>
              <div className="process-icon">
                <Layers size={20} className="gold-icon" />
              </div>
              <h3 className="process-card-title">Hand Flacon Filling</h3>
              <p className="process-card-desc">
                Filtered three times through silk mesh, hand-poured into heavy crystal flacons, and individually inspected by our atelier team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sustainability & Metrics ── */}
      <section className="about-metrics-section">
        <div className="page-container">
          <div className="metrics-grid">
            <div className="metric-box">
              <span className="metric-big-num">30%</span>
              <span className="metric-label">Extrait Concentration</span>
              <p className="metric-sub">Guarantees 10–14 hours of persistent skin evolution</p>
            </div>

            <div className="metric-box">
              <span className="metric-big-num">100%</span>
              <span className="metric-label">Recyclable Crystal</span>
              <p className="metric-sub">Infinitely refillable flacons crafted in Normandy</p>
            </div>

            <div className="metric-box">
              <span className="metric-big-num">0%</span>
              <span className="metric-label">Harsh Additives</span>
              <p className="metric-sub">Strictly free of phthalates, parabens, and synthetic dyes</p>
            </div>

            <div className="metric-box">
              <span className="metric-big-num">100%</span>
              <span className="metric-label">Cruelty-Free Ethics</span>
              <p className="metric-sub">Certified ethical supply chain with direct farm partnerships</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="about-cta-section">
        <div className="page-container">
          <div className="about-cta-card">
            <h2>Experience Our Olfactory Universe</h2>
            <p>Explore the complete collection of extrait de parfum creations or book a private consultation.</p>
            <div className="about-cta-buttons">
              <Link to="/shop" className="btn-primary">
                <span>Explore Catalog</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn-secondary">
                <span>Book Consultation</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
