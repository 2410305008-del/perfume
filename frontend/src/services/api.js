/* ========================================================
   YOUR SCENT — Centralized API Client Service
   Communicates with Express REST API Backend
   ======================================================== */

const API_BASE = '/api';

export const api = {
  // ── Products API ──────────────────────────────────────
  async getProducts(params = {}) {
    const query = new URLSearchParams();
    if (params.category && params.category !== 'all') query.append('category', params.category);
    if (params.search) query.append('search', params.search);
    if (params.sort) query.append('sort', params.sort);
    if (params.limit) query.append('limit', params.limit);
    if (params.minPrice) query.append('minPrice', params.minPrice);
    if (params.maxPrice) query.append('maxPrice', params.maxPrice);

    const res = await fetch(`${API_BASE}/products?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  },

  async getProductById(id) {
    const res = await fetch(`${API_BASE}/products/${id}`);
    if (!res.ok) throw new Error('Failed to fetch fragrance details');
    return res.json();
  },

  // ── Coupons API ───────────────────────────────────────
  async validateCoupon(code) {
    const res = await fetch(`${API_BASE}/coupons/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    });
    return res.json();
  },

  // ── Orders API ────────────────────────────────────────
  async createOrder(orderData) {
    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    return res.json();
  },

  async getOrderById(orderId) {
    const res = await fetch(`${API_BASE}/orders/${orderId}`);
    if (!res.ok) throw new Error('Order not found');
    return res.json();
  },

  // ── Concierge Inquiries API ───────────────────────────
  async submitInquiry(inquiryData) {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiryData)
    });
    return res.json();
  },

  // ── Newsletter Subscription API ───────────────────────
  async subscribeNewsletter(email) {
    const res = await fetch(`${API_BASE}/newsletter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    return res.json();
  },

  // ── Fragrance Quiz Recommendation API ─────────────────
  async getQuizRecommendation(answers) {
    const res = await fetch(`${API_BASE}/quiz/recommend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(answers)
    });
    return res.json();
  },

  // ── Health Check ──────────────────────────────────────
  async checkHealth() {
    const res = await fetch(`${API_BASE}/health`);
    return res.json();
  },

  // ── Auth API ───────────────────────────────────────────
  async register(data) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async login(data) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async getMe(token) {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  }
};
