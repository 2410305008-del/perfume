import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import {
  Sparkles,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  ArrowRight,
  ShieldCheck,
  Crown,
  Gift,
  Droplet
} from 'lucide-react';

export default function Auth() {
  const { login, register, isAuthenticated } = useAuth();
  const { showToast } = useCart();
  const navigate = useNavigate();

  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  // If already authenticated, redirect home
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let res;
      if (mode === 'login') {
        res = await login(formData.email, formData.password);
      } else {
        if (!formData.name.trim()) {
          setError('Please enter your name');
          setLoading(false);
          return;
        }
        if (formData.password.length < 6) {
          setError('Password must be at least 6 characters');
          setLoading(false);
          return;
        }
        res = await register(formData.name, formData.email, formData.password, formData.phone);
      }

      if (res.success) {
        showToast(res.message);
        navigate('/', { replace: true });
      } else {
        setError(res.message || 'Something went wrong');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setError('');
    setFormData({ name: '', email: '', password: '', phone: '' });
  };

  return (
    <div className="auth-page">
      {/* ── Decorative Background ── */}
      <div className="auth-bg-shapes">
        <div className="auth-blob auth-blob-1" />
        <div className="auth-blob auth-blob-2" />
        <div className="auth-blob auth-blob-3" />
      </div>

      <div className="auth-layout">
        {/* ── Left: Benefits Panel ── */}
        <div className="auth-benefits-panel">
          <div className="auth-benefits-content">
            <Link to="/" className="auth-brand-logo">
              <span className="auth-brand-sub">Haute Parfumerie</span>
              <span className="auth-brand-name">YOUR SCENT</span>
              <span className="auth-brand-origin">Paris • Mumbai</span>
            </Link>

            <h2 className="auth-benefits-title">
              {mode === 'login'
                ? 'Welcome Back to the Atelier'
                : 'Join the Private Atelier Circle'}
            </h2>

            <p className="auth-benefits-desc">
              {mode === 'login'
                ? 'Sign in to access your curated fragrances, track orders, and continue your olfactory journey.'
                : 'Create your private account to unlock exclusive member privileges and personalized scent curation.'}
            </p>

            <div className="auth-perks-list">
              <div className="auth-perk-item">
                <div className="perk-icon-wrap">
                  <Gift size={18} />
                </div>
                <div>
                  <strong>Welcome 10% Voucher</strong>
                  <span>Receive code SCENT10 instantly upon joining</span>
                </div>
              </div>

              <div className="auth-perk-item">
                <div className="perk-icon-wrap">
                  <Crown size={18} />
                </div>
                <div>
                  <strong>VIP Private Releases</strong>
                  <span>First access to limited batch harvests</span>
                </div>
              </div>

              <div className="auth-perk-item">
                <div className="perk-icon-wrap">
                  <Droplet size={18} />
                </div>
                <div>
                  <strong>Free Discovery Samples</strong>
                  <span>Complimentary 3ml flacons with every order</span>
                </div>
              </div>

              <div className="auth-perk-item">
                <div className="perk-icon-wrap">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <strong>Order History & Tracking</strong>
                  <span>Full White Glove Courier visibility</span>
                </div>
              </div>
            </div>

            <div className="auth-fragrance-quote">
              <p>"A fragrance is a personal signature no one can forge."</p>
              <span>— Jean-Marc Fontaine, Maître Parfumeur</span>
            </div>
          </div>
        </div>

        {/* ── Right: Auth Form Card ── */}
        <div className="auth-form-panel">
          <div className="auth-form-card">
            <div className="auth-form-header">
              <div className="auth-sparkle-badge">
                <Sparkles size={14} className="gold-icon" />
                <span>{mode === 'login' ? 'Member Access' : 'Private Registration'}</span>
              </div>

              <h1 className="auth-form-title">
                {mode === 'login' ? 'Sign In' : 'Create Account'}
              </h1>

              <p className="auth-form-subtitle">
                {mode === 'login'
                  ? 'Access your private Haute Parfumerie profile'
                  : 'Begin your bespoke olfactory experience'}
              </p>
            </div>

            {/* ── Error Message ── */}
            {error && (
              <div className="auth-error-box">
                <span>{error}</span>
              </div>
            )}

            {/* ── The Form ── */}
            <form className="auth-form" onSubmit={handleSubmit}>
              {/* Name (only register) */}
              {mode === 'register' && (
                <div className="auth-field">
                  <label htmlFor="auth-name">Full Name</label>
                  <div className="auth-input-wrap">
                    <User size={17} className="auth-input-icon" />
                    <input
                      id="auth-name"
                      type="text"
                      name="name"
                      placeholder="e.g. Radhika Sharma"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div className="auth-field">
                <label htmlFor="auth-email">Email Address</label>
                <div className="auth-input-wrap">
                  <Mail size={17} className="auth-input-icon" />
                  <input
                    id="auth-email"
                    type="email"
                    name="email"
                    placeholder="your-name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="auth-field">
                <label htmlFor="auth-password">
                  Password
                  {mode === 'register' && (
                    <span className="field-hint">(min. 6 characters)</span>
                  )}
                </label>
                <div className="auth-input-wrap">
                  <Lock size={17} className="auth-input-icon" />
                  <input
                    id="auth-password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder={mode === 'login' ? 'Enter your password' : 'Create a secure password'}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                    autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                  />
                  <button
                    type="button"
                    className="toggle-password-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              {/* Phone (only register, optional) */}
              {mode === 'register' && (
                <div className="auth-field">
                  <label htmlFor="auth-phone">
                    Phone <span className="field-hint">(Optional — for VIP courier)</span>
                  </label>
                  <div className="auth-input-wrap">
                    <Phone size={17} className="auth-input-icon" />
                    <input
                      id="auth-phone"
                      type="tel"
                      name="phone"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      autoComplete="tel"
                    />
                  </div>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="auth-submit-btn"
                disabled={loading}
              >
                {loading ? (
                  <span className="auth-loading-text">
                    <Sparkles size={16} className="spin-gold" />
                    {mode === 'login' ? 'Signing In...' : 'Creating Account...'}
                  </span>
                ) : (
                  <>
                    <span>{mode === 'login' ? 'Sign In to Atelier' : 'Create Private Account'}</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            {/* ── Toggle Mode Link ── */}
            <div className="auth-toggle-bar">
              {mode === 'login' ? (
                <p>
                  New to Your Scent?{' '}
                  <button type="button" className="auth-toggle-link" onClick={toggleMode}>
                    Create an Account
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <button type="button" className="auth-toggle-link" onClick={toggleMode}>
                    Sign In
                  </button>
                </p>
              )}
            </div>

            {/* ── Trust Badges ── */}
            <div className="auth-trust-badges">
              <span>
                <ShieldCheck size={13} /> 256-bit Encrypted
              </span>
              <span className="trust-dot">•</span>
              <span>
                <Lock size={13} /> Private & Secure
              </span>
              <span className="trust-dot">•</span>
              <span>
                <Sparkles size={13} /> No Spam, Ever
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
