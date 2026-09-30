import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';
import { 
  Sparkles, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck,
  CheckCircle2 
} from 'lucide-react';

export default function Contact() {
  const { showToast } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryNature: 'Personal Fragrance Consultation',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: 'What is the difference between Extrait de Parfum and Eau de Parfum?',
      a: 'Extrait de Parfum possesses the highest fragrance oil concentration (25% to 35%), diluted in minimal alcohol. This delivers exceptional longevity (10–14+ hours), gentle skin diffusion, and a velvety olfactory trail without the harsh alcohol flash of commercial sprays.'
    },
    {
      q: 'Are complimentary discovery samples included with my order?',
      a: 'Oui. Every order of a signature 50ml or 100ml flacon includes two complimentary 3ml discovery flacons of your choice, allowing you to test other creations from our private collection before uncapping the main box.'
    },
    {
      q: 'What is the White Glove Courier timeframe?',
      a: 'All orders are dispatched via temperature-regulated courier within 24 hours. Metros in India (Mumbai, Delhi, Bengaluru) receive next-day or 2-day delivery; international deliveries to Europe and the Middle East arrive within 4–6 business days.'
    },
    {
      q: 'Can our crystal flacons be engraved with personal monograms?',
      a: 'Certainly. For bespoke gifts and bridal suites, our Paris atelier offers hand-carved gold leaf engraving of initials and dates. Simply specify your request in the consultation booking form.'
    },
    {
      q: 'What is your returns policy?',
      a: 'Unopened flacons with their protective wax seal intact may be returned within 14 days of delivery for an exchange or full refund. Each order includes a separate sample spray so you may experience the scent before breaking the flacon seal.'
    }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please complete all required fields.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.submitInquiry(formData);
      if (res.success) {
        setSubmitted(true);
        showToast('Consultation inquiry dispatched to our Master Atelier.');
      } else {
        showToast(res.message || 'Error submitting inquiry');
      }
    } catch (err) {
      showToast('Network error submitting inquiry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      {/* ── Page Header ── */}
      <section className="contact-hero-section">
        <div className="page-container">
          <div className="contact-hero-content">
            <span className="contact-hero-tag">
              <Sparkles size={14} className="gold-icon" /> Private Atelier Concierge
            </span>
            <h1 className="contact-hero-title">Book a Bespoke Consultation</h1>
            <p className="contact-hero-desc">
              Whether curating a bridal suite, designing a custom wedding scent, or acquiring a private flacon, our master noses are at your distinguished service.
            </p>
          </div>
        </div>
      </section>

      {/* ── Form & Ateliers Grid ── */}
      <section className="contact-main-section">
        <div className="page-container contact-layout-grid">
          {/* Left: Consultation Form */}
          <div className="contact-form-card">
            {submitted ? (
              <div className="inquiry-success-state">
                <CheckCircle2 size={56} className="gold-success-icon" />
                <h3>Inquiry Received with Distinction</h3>
                <p>
                  Thank you, <strong>{formData.name}</strong>. Our Master Perfume Concierge will contact you within 24 business hours at <em>{formData.email}</em>.
                </p>
                <button 
                  className="btn-secondary" 
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      inquiryNature: 'Personal Fragrance Consultation',
                      message: ''
                    });
                  }}
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form className="concierge-inquiry-form" onSubmit={handleSubmit}>
                <div className="form-title-group">
                  <h2 className="form-heading">Send a Private Missive</h2>
                  <p className="form-subheading">Personalized attention from our Grasse & Mumbai maîtres.</p>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label>Your Distinguished Name *</label>
                    <input 
                      type="text" 
                      name="name" 
                      required 
                      placeholder="e.g. Radhika Sharma"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-field">
                    <label>Private Email Address *</label>
                    <input 
                      type="email" 
                      name="email" 
                      required 
                      placeholder="e.g. radhika@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label>Telephone Number (Optional)</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-field">
                    <label>Nature of Inquiry</label>
                    <select 
                      name="inquiryNature" 
                      value={formData.inquiryNature}
                      onChange={handleChange}
                      className="luxury-select"
                    >
                      <option value="Personal Fragrance Consultation">Personal Fragrance Consultation</option>
                      <option value="Bespoke Wedding Flacons">Bespoke Wedding Flacons</option>
                      <option value="Corporate & VIP Gifting">Corporate & VIP Gifting</option>
                      <option value="Private Atelier Masterclass">Private Atelier Masterclass</option>
                      <option value="Press & Editorial Inquiries">Press & Editorial Inquiries</option>
                    </select>
                  </div>
                </div>

                <div className="form-field full-width">
                  <label>Olfactory Preferences & Message *</label>
                  <textarea 
                    name="message" 
                    rows={5} 
                    required
                    placeholder="Describe your desired olfactory notes, the occasion, or specific questions for our master perfumer..."
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={loading} 
                  className="btn-primary form-submit-btn"
                >
                  {loading ? 'Dispatching...' : (
                    <>
                      <span>Transmit to Atelier Concierge</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right: Boutique Salons */}
          <div className="contact-info-sidebar">
            <div className="sidebar-block boutique-salons-block" id="locations">
              <span className="sidebar-eyebrow">Our Global Salons</span>
              <h3 className="sidebar-title">Boutique Ateliers</h3>

              <div className="boutique-card">
                <div className="boutique-header">
                  <MapPin size={16} className="gold-icon" />
                  <strong>Place Vendôme Atelier</strong>
                </div>
                <p>28 Place Vendôme, 75001 Paris, France</p>
                <span className="hours"><Clock size={12} /> Tue–Sat: 10:00 – 19:00 CET</span>
              </div>

              <div className="boutique-card">
                <div className="boutique-header">
                  <MapPin size={16} className="gold-icon" />
                  <strong>Mumbai Marine Flagship</strong>
                </div>
                <p>14 Marine Drive, Nariman Point, Mumbai 400021</p>
                <span className="hours"><Clock size={12} /> Mon–Sun: 11:00 – 20:30 IST</span>
              </div>

              <div className="boutique-card">
                <div className="boutique-header">
                  <MapPin size={16} className="gold-icon" />
                  <strong>Dubai Private Salon</strong>
                </div>
                <p>The Galleria, Al Maryah Island, Abu Dhabi / Dubai</p>
                <span className="hours"><Clock size={12} /> Mon–Sun: 10:00 – 22:00 GST</span>
              </div>
            </div>

            <div className="sidebar-block vip-direct-block">
              <span className="sidebar-eyebrow">Direct Assistance</span>
              <h3 className="sidebar-title">VIP Concierge Line</h3>
              <p>For urgent orders, white-glove same-day courier in Mumbai, or immediate consultation:</p>
              <div className="vip-link-item">
                <Phone size={16} className="gold-icon" />
                <a href="tel:+919876543210">+91 98765 43210</a>
              </div>
              <div className="vip-link-item">
                <Mail size={16} className="gold-icon" />
                <a href="mailto:concierge@yourscent.com">concierge@yourscent.com</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section className="contact-faq-section" id="faq">
        <div className="page-container">
          <div className="section-header-center">
            <span className="section-eyebrow">Questions & Réponses</span>
            <h2 className="section-main-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">Everything you wish to know about our formulations, packaging, and delivery.</p>
          </div>

          <div className="faq-accordion-container">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className={`faq-item ${isOpen ? 'open' : ''}`}>
                  <button 
                    className="faq-question-bar"
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {isOpen && (
                    <div className="faq-answer-body">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
