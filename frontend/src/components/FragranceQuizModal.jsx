import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';
import { X, Sparkles, RefreshCw, ShoppingBag, ArrowRight } from 'lucide-react';

export default function FragranceQuizModal() {
  const { isQuizOpen, closeQuiz, addToCart, showToast } = useCart();

  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({ vibe: '', occasion: '', sillage: '' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  if (!isQuizOpen) return null;

  const handleSelect = async (key, val) => {
    const updated = { ...answers, [key]: val };
    setAnswers(updated);

    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      setLoading(true);
      try {
        const res = await api.getQuizRecommendation(updated);
        if (res.success) {
          setResult(res.recommendation);
          setStep(4);
        } else {
          showToast('Could not calculate recommendation.');
        }
      } catch (err) {
        showToast('Error finding your signature scent.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRestart = () => {
    setStep(1);
    setAnswers({ vibe: '', occasion: '', sillage: '' });
    setResult(null);
  };

  const handleClaim = () => {
    if (result) {
      addToCart(result, result.size || '50ml', 1);
      closeQuiz();
    }
  };

  return (
    <div className="quiz-overlay" onClick={closeQuiz}>
      <div className="quiz-modal" onClick={(e) => e.stopPropagation()}>
        <button className="quiz-close-btn" onClick={closeQuiz}>
          <X size={20} />
        </button>

        {/* ── Header ── */}
        <div className="quiz-header">
          <div className="quiz-badge">
            <Sparkles size={14} className="gold-icon" />
            <span>Master Perfumer Atelier Algorithm</span>
          </div>
          <h2 className="quiz-title">Discover Your Signature Fragrance</h2>
          <p className="quiz-subtitle">Answer 3 curated questions to unveil the flacon harmonized to your aura.</p>
        </div>

        {/* ── QUESTION 1: Vibe ── */}
        {step === 1 && (
          <div className="quiz-step">
            <span className="quiz-step-tag">Question 1 of 3</span>
            <h3 className="quiz-question">What olfactory atmosphere speaks to your spirit?</h3>
            <div className="quiz-options-grid">
              <button 
                type="button" 
                className="quiz-option-card"
                onClick={() => handleSelect('vibe', 'floral')}
              >
                <span className="opt-emoji">🌹</span>
                <span className="opt-title">Velvet Floral</span>
                <span className="opt-desc">Grasse roses, blooming jasmine, and powdery white musk.</span>
              </button>

              <button 
                type="button" 
                className="quiz-option-card"
                onClick={() => handleSelect('vibe', 'fresh')}
              >
                <span className="opt-emoji">🍋</span>
                <span className="opt-title">Crisp & Sparkling</span>
                <span className="opt-desc">Sicilian lemon, Mediterranean breeze, and green tea dew.</span>
              </button>

              <button 
                type="button" 
                className="quiz-option-card"
                onClick={() => handleSelect('vibe', 'woody')}
              >
                <span className="opt-emoji">🌲</span>
                <span className="opt-title">Deep Woods & Oud</span>
                <span className="opt-desc">Mysore sandalwood, smoky cedar, and ancient amber resin.</span>
              </button>

              <button 
                type="button" 
                className="quiz-option-card"
                onClick={() => handleSelect('vibe', 'mysterious')}
              >
                <span className="opt-emoji">✨</span>
                <span className="opt-title">Nocturnal Oriental</span>
                <span className="opt-desc">Dark vanilla, golden saffron, and intoxicating midnight flora.</span>
              </button>
            </div>
          </div>
        )}

        {/* ── QUESTION 2: Occasion ── */}
        {step === 2 && (
          <div className="quiz-step">
            <span className="quiz-step-tag">Question 2 of 3</span>
            <h3 className="quiz-question">When do you desire this scent to envelop you?</h3>
            <div className="quiz-options-grid">
              <button 
                type="button" 
                className="quiz-option-card"
                onClick={() => handleSelect('occasion', 'everyday')}
              >
                <span className="opt-emoji">🕊️</span>
                <span className="opt-title">Everyday Signature</span>
                <span className="opt-desc">Subtle, comforting, and an effortless extension of yourself.</span>
              </button>

              <button 
                type="button" 
                className="quiz-option-card"
                onClick={() => handleSelect('occasion', 'romantic')}
              >
                <span className="opt-emoji">🕯️</span>
                <span className="opt-title">Intimate Rendezvous</span>
                <span className="opt-desc">Alluring, skin-close, and unforgettable to those near.</span>
              </button>

              <button 
                type="button" 
                className="quiz-option-card"
                onClick={() => handleSelect('occasion', 'evening')}
              >
                <span className="opt-emoji">🎭</span>
                <span className="opt-title">Grand Gala & Evening</span>
                <span className="opt-desc">Commanding presence with opulent sillage and royal trail.</span>
              </button>

              <button 
                type="button" 
                className="quiz-option-card"
                onClick={() => handleSelect('occasion', 'daytime')}
              >
                <span className="opt-emoji">☀️</span>
                <span className="opt-title">Sunny Escapes</span>
                <span className="opt-desc">Breezy, invigorating, and refreshing in sun-drenched moments.</span>
              </button>
            </div>
          </div>
        )}

        {/* ── QUESTION 3: Sillage ── */}
        {step === 3 && (
          <div className="quiz-step">
            <span className="quiz-step-tag">Question 3 of 3</span>
            <h3 className="quiz-question">What projection do you wish to bestow?</h3>
            {loading ? (
              <div className="quiz-loading-state">
                <Sparkles size={32} className="spin-gold" />
                <p>Master Perfumer is harmonizing your olfactory profile...</p>
              </div>
            ) : (
              <div className="quiz-options-grid">
                <button 
                  type="button" 
                  className="quiz-option-card"
                  onClick={() => handleSelect('sillage', 'soft')}
                >
                  <span className="opt-emoji">🌸</span>
                  <span className="opt-title">Intimate & Gentle</span>
                  <span className="opt-desc">Whispers close to the pulse points.</span>
                </button>

                <button 
                  type="button" 
                  className="quiz-option-card"
                  onClick={() => handleSelect('sillage', 'moderate')}
                >
                  <span className="opt-emoji">👑</span>
                  <span className="opt-title">Balanced Elegance</span>
                  <span className="opt-desc">Radiates an arm's length of refined grace.</span>
                </button>

                <button 
                  type="button" 
                  className="quiz-option-card"
                  onClick={() => handleSelect('sillage', 'heavy')}
                >
                  <span className="opt-emoji">💫</span>
                  <span className="opt-title">Unapologetic Aura</span>
                  <span className="opt-desc">Leaves an ethereal memory long after you depart.</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── RESULT SCREEN ── */}
        {step === 4 && result && (
          <div className="quiz-result-view">
            <div className="result-match-pill">
              <Sparkles size={14} /> 98% Olfactory Harmony Match
            </div>
            
            <div className="result-product-card">
              <img 
                src={result.img.startsWith('/') ? result.img : `/${result.img}`} 
                alt={result.name} 
                className="result-img"
              />
              <div className="result-info">
                <span className="result-category">{result.categoryLabel || result.category}</span>
                <h3 className="result-title">{result.name}</h3>
                <p className="result-desc">{result.desc}</p>
                <div className="result-notes-pill">
                  <strong>Signature Notes:</strong> {result.notes}
                </div>
                <div className="result-price-row">
                  <span className="result-price">₹{result.price.toLocaleString('en-IN')}</span>
                  <span className="result-size">({result.size || '50ml'})</span>
                </div>
              </div>
            </div>

            <div className="quiz-result-actions">
              <button className="btn-secondary" onClick={handleRestart}>
                <RefreshCw size={15} />
                <span>Retake Quiz</span>
              </button>
              <button className="btn-primary" onClick={handleClaim}>
                <ShoppingBag size={17} />
                <span>Claim This Flacon</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
