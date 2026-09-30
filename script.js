/* ============================================
   YOUR SCENT — Luxury Parfumerie Core Logic
   Features: Cart, Wishlist, Quick View Modal,
   Live Search, Multi-step Checkout, Fragrance Quiz,
   Theme Switcher & Centralized Chatbot.
   ============================================ */

// ── Haute Parfumerie Product Database ──────────
const products = [
  {
    id: 1,
    name: 'Rose Bloom',
    category: 'floral',
    categoryLabel: 'Floral',
    price: 2499,
    originalPrice: 3200,
    desc: 'An exquisite bouquet of morning-harvested Grasse roses, blooming peony petals, and velvety white cashmere musk.',
    badge: 'Bestseller',
    badgeClass: 'badge-new',
    stars: 4.9,
    reviews: 312,
    bestseller: true,
    img: 'images/perfume-rose.png',
    size: '50ml',
    sizes: [
      { size: '30ml', price: 1799, label: 'Travel Flacon' },
      { size: '50ml', price: 2499, label: 'Signature 50ml' },
      { size: '100ml', price: 3999, label: 'Grand Flacon' }
    ],
    notes: 'May Rose, French Peony, White Musk',
    pyramid: {
      top: 'Pink Pepper, Dewy Bergamot, Sweet Lychee',
      heart: 'May Rose, Velvet Peony, Violet Petals',
      base: 'Cashmere Musk, White Amber, Tuscan Cedar'
    },
    longevity: '10–12 Hours',
    sillage: 'Moderate to Heavy',
    quizVibe: 'floral',
    quizOccasion: 'romantic'
  },
  {
    id: 2,
    name: 'Lavender Dreams',
    category: 'floral',
    categoryLabel: 'Floral',
    price: 2199,
    originalPrice: 2800,
    desc: 'Sun-drenched Provence lavender harmonized with soft French violet and a soothing, sensual Bourbon vanilla base.',
    badge: 'New',
    badgeClass: 'badge-fave',
    stars: 4.8,
    reviews: 198,
    bestseller: true,
    img: 'images/perfume-lavender.png',
    size: '50ml',
    sizes: [
      { size: '30ml', price: 1599, label: 'Travel Flacon' },
      { size: '50ml', price: 2199, label: 'Signature 50ml' },
      { size: '100ml', price: 3599, label: 'Grand Flacon' }
    ],
    notes: 'Provence Lavender, Violet, Bourbon Vanilla',
    pyramid: {
      top: 'Wild Lavender, Clary Sage, French Mint',
      heart: 'Iris, Violet Blossom, Heliotrope',
      base: 'Bourbon Vanilla, Tonka Bean, Sandalwood'
    },
    longevity: '8–10 Hours',
    sillage: 'Soft & Intimate',
    quizVibe: 'calm',
    quizOccasion: 'everyday'
  },
  {
    id: 3,
    name: 'Jasmine Noir',
    category: 'floral',
    categoryLabel: 'Floral',
    price: 2699,
    originalPrice: 3400,
    desc: 'Intoxicating night-blooming jasmine layered with creamy Mysore sandalwood, dark spices, and precious golden amber.',
    badge: 'Limited',
    badgeClass: 'badge-hot',
    stars: 4.9,
    reviews: 145,
    bestseller: false,
    img: 'images/perfume-jasmine.png',
    size: '50ml',
    sizes: [
      { size: '30ml', price: 1999, label: 'Travel Flacon' },
      { size: '50ml', price: 2699, label: 'Signature 50ml' },
      { size: '100ml', price: 4299, label: 'Grand Flacon' }
    ],
    notes: 'Sambac Jasmine, Mysore Sandalwood, Golden Amber',
    pyramid: {
      top: 'Bitter Almond, Neroli, Cardamom Pods',
      heart: 'Sambac Jasmine, Night-blooming Cereus, Tuberose',
      base: 'Mysore Sandalwood, Dark Amber, Patchouli'
    },
    longevity: '12+ Hours',
    sillage: 'Enchanting & Heavy',
    quizVibe: 'mysterious',
    quizOccasion: 'evening'
  },
  {
    id: 4,
    name: 'Citrus Glow',
    category: 'fresh',
    categoryLabel: 'Fresh Citrus',
    price: 1999,
    originalPrice: 2600,
    desc: 'Crisp Sicilian lemon peel and orange blossom kissed by Mediterranean sea mist and delicate green tea infusion.',
    badge: 'Sale',
    badgeClass: 'badge-sale',
    stars: 4.9,
    reviews: 276,
    bestseller: true,
    img: 'images/perfume-citrus.png',
    size: '50ml',
    sizes: [
      { size: '30ml', price: 1499, label: 'Travel Flacon' },
      { size: '50ml', price: 1999, label: 'Signature 50ml' },
      { size: '100ml', price: 3299, label: 'Grand Flacon' }
    ],
    notes: 'Sicilian Lemon, Orange Blossom, Green Tea',
    pyramid: {
      top: 'Sicilian Lemon, Bergamot, Mandora',
      heart: 'Orange Blossom, Japanese Green Tea, Jasmine Water',
      base: 'White Musk, Driftwood, Vetiver'
    },
    longevity: '7–9 Hours',
    sillage: 'Radiant & Energizing',
    quizVibe: 'fresh',
    quizOccasion: 'daytime'
  },
  {
    id: 5,
    name: 'Lemonade Fizz',
    category: 'fresh',
    categoryLabel: 'Fresh Citrus',
    price: 1799,
    originalPrice: 2400,
    desc: 'Sparkling Japanese yuzu, pink grapefruit, and effervescent mint leaves over a clean, crystalline cedarwood base.',
    badge: 'Trending',
    badgeClass: 'badge-new',
    stars: 4.6,
    reviews: 89,
    bestseller: false,
    img: 'images/perfume-lemonade.png',
    size: '30ml',
    sizes: [
      { size: '30ml', price: 1799, label: 'Travel Flacon' },
      { size: '50ml', price: 2399, label: 'Signature 50ml' },
      { size: '100ml', price: 3699, label: 'Grand Flacon' }
    ],
    notes: 'Japanese Yuzu, Pink Grapefruit, White Cedar',
    pyramid: {
      top: 'Yuzu, Pink Grapefruit, Sparkling Soda',
      heart: 'Crushed Spearmint, Lemongrass, Lily of the Valley',
      base: 'White Cedar, Clean Musk, Blonde Woods'
    },
    longevity: '8 Hours',
    sillage: 'Fresh & Sparkling',
    quizVibe: 'fresh',
    quizOccasion: 'daytime'
  },
  {
    id: 6,
    name: 'Ocean Mist',
    category: 'aquatic',
    categoryLabel: 'Aquatic',
    price: 2299,
    originalPrice: 2900,
    desc: 'The crisp purity of crashing Pacific waves, marine algae, and sun-bleached driftwood carrying salty ocean air.',
    badge: 'Bestseller',
    badgeClass: 'badge-new',
    stars: 4.8,
    reviews: 231,
    bestseller: true,
    img: 'images/perfume-aquatic.png',
    size: '50ml',
    sizes: [
      { size: '30ml', price: 1699, label: 'Travel Flacon' },
      { size: '50ml', price: 2299, label: 'Signature 50ml' },
      { size: '100ml', price: 3799, label: 'Grand Flacon' }
    ],
    notes: 'Sea Salt, Marine Breeze, Sunken Driftwood',
    pyramid: {
      top: 'Sea Breeze, Blue Calone, Crisp Cucumber',
      heart: 'Water Lily, Marine Algae, Salty Air',
      base: 'Driftwood, Ambergris Accord, Oakmoss'
    },
    longevity: '9–11 Hours',
    sillage: 'Airy & Vast',
    quizVibe: 'aquatic',
    quizOccasion: 'summer'
  },
  {
    id: 7,
    name: 'Aqua Serenity',
    category: 'aquatic',
    categoryLabel: 'Aquatic',
    price: 2099,
    originalPrice: 2700,
    desc: 'A tranquil mountain spring waterfall surrounded by chilled water lilies, crushed mint, and soothing powdery musk.',
    badge: 'Rare',
    badgeClass: 'badge-hot',
    stars: 4.7,
    reviews: 117,
    bestseller: false,
    img: 'images/perfume-aqua-serenity.png',
    size: '30ml',
    sizes: [
      { size: '30ml', price: 2099, label: 'Travel Flacon' },
      { size: '50ml', price: 2799, label: 'Signature 50ml' },
      { size: '100ml', price: 4199, label: 'Grand Flacon' }
    ],
    notes: 'Crisp Mint, Water Lily, Soft Powder',
    pyramid: {
      top: 'Glacial Mint, Morning Dew, Rain Accord',
      heart: 'White Lotus, Blue Water Lily, Cyclamen',
      base: 'Mineral Amber, Sheer Musk, Cashmeran'
    },
    longevity: '8–10 Hours',
    sillage: 'Subtle & Peaceful',
    quizVibe: 'aquatic',
    quizOccasion: 'everyday'
  },
  {
    id: 8,
    name: 'Cherry Blossom',
    category: 'floral',
    categoryLabel: 'Floral',
    price: 2599,
    originalPrice: 3100,
    desc: 'Whispers of Tokyo spring sakura blossoms entwined with ripe imperial lychee, white tea, and soft angelica musk.',
    badge: 'Seasonal',
    badgeClass: 'badge-new',
    stars: 4.9,
    reviews: 164,
    bestseller: false,
    img: 'images/perfume-cherry-blossom.png',
    size: '50ml',
    sizes: [
      { size: '30ml', price: 1899, label: 'Travel Flacon' },
      { size: '50ml', price: 2599, label: 'Signature 50ml' },
      { size: '100ml', price: 4099, label: 'Grand Flacon' }
    ],
    notes: 'Kyoto Sakura, Imperial Lychee, Angelica Musk',
    pyramid: {
      top: 'Imperial Lychee, Pink Freesia, Mandarin',
      heart: 'Kyoto Cherry Blossom, White Peony, Rosebud',
      base: 'Angelica Musk, Sandalwood, Clean Amber'
    },
    longevity: '9–11 Hours',
    sillage: 'Delicate & Romantic',
    quizVibe: 'floral',
    quizOccasion: 'romantic'
  }
];

// ── State & API Configuration ─────────────────
const API_BASE = (typeof window !== 'undefined' && window.location.origin && (window.location.origin.includes('localhost') || window.location.origin.includes('127.0.0.1')))
  ? `${window.location.origin}/api`
  : 'http://localhost:5000/api';

let cart = JSON.parse(localStorage.getItem('ys_cart') || '[]');
let wishlist = JSON.parse(localStorage.getItem('ys_wish') || '[]');
let activePromo = null; // { code: 'SCENT10', discount: 0.1, type: 'percent' }

function saveCart() {
  localStorage.setItem('ys_cart', JSON.stringify(cart));
}

function saveWishlist() {
  localStorage.setItem('ys_wish', JSON.stringify(wishlist));
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getDiscountedTotal() {
  const base = getCartTotal();
  if (!activePromo) return base;
  if (activePromo.type === 'percent') {
    return Math.round(base * (1 - activePromo.discount));
  } else if (activePromo.type === 'flat') {
    return Math.max(0, base - activePromo.discount);
  }
  return base;
}

// ── Cart Operations ───────────────────────────
function addToCart(productId, chosenSize = '50ml', chosenQty = 1) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const sizeObj = product.sizes?.find(s => s.size === chosenSize) || { size: chosenSize, price: product.price };
  const cartItemId = `${productId}-${sizeObj.size}`;
  const existing = cart.find(c => c.cartItemId === cartItemId);

  if (existing) {
    existing.qty += chosenQty;
  } else {
    cart.push({
      ...product,
      cartItemId,
      selectedSize: sizeObj.size,
      price: sizeObj.price,
      qty: chosenQty
    });
  }

  saveCart();
  updateCartUI();
  renderCartItems();
  openCart();
  showToast(`🛒 Added ${chosenQty}x ${product.name} (${sizeObj.size}) to bag!`);
}

function removeFromCart(cartItemId) {
  cart = cart.filter(c => c.cartItemId !== cartItemId);
  saveCart();
  updateCartUI();
  renderCartItems();
}

function changeQty(cartItemId, delta) {
  const item = cart.find(c => c.cartItemId === cartItemId);
  if (!item) return;
  item.qty += delta;
  if (item.qty < 1) {
    removeFromCart(cartItemId);
    return;
  }
  saveCart();
  updateCartUI();
  renderCartItems();
}

function updateCartUI() {
  const totalCount = cart.reduce((sum, i) => sum + i.qty, 0);
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = totalCount;
    el.style.display = totalCount > 0 ? 'flex' : 'none';
  });

  const cartTotalEl = document.getElementById('cartTotal');
  if (cartTotalEl) {
    cartTotalEl.textContent = '₹' + getCartTotal().toLocaleString('en-IN');
  }
}

function renderCartItems() {
  const container = document.getElementById('cartItems');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="drawer-empty">
        <div class="empty-icon">🛍️</div>
        <h4>Your Bag is Empty</h4>
        <p>Explore our bespoke natural perfumes and find your signature scent.</p>
        <a href="shop.html" class="btn-primary" style="margin-top:20px" onclick="closeCart()">Explore Collection →</a>
      </div>`;
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="drawer-item">
      <img src="${item.img}" alt="${item.name}" class="drawer-item-img" onerror="this.src='images/perfume-rose.png'">
      <div class="drawer-item-info">
        <div class="drawer-item-title">${item.name}</div>
        <div class="drawer-item-meta">${item.categoryLabel} • ${item.selectedSize}</div>
        <div class="drawer-item-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</div>
        <div class="drawer-item-controls">
          <button class="qty-btn" onclick="changeQty('${item.cartItemId}', -1)">−</button>
          <span class="qty-val">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty('${item.cartItemId}', 1)">+</button>
        </div>
      </div>
      <button class="drawer-close" onclick="removeFromCart('${item.cartItemId}')" title="Remove" style="width:30px;height:30px;font-size:12px">✕</button>
    </div>
  `).join('');
}

function openCart() {
  closeWishlist();
  closeSearchModal();
  document.getElementById('cartSidebar')?.classList.add('open');
  document.getElementById('cartOverlay')?.classList.add('open');
  renderCartItems();
  updateCartUI();
}

function closeCart() {
  document.getElementById('cartSidebar')?.classList.remove('open');
  document.getElementById('cartOverlay')?.classList.remove('open');
}

// ── Wishlist Operations ───────────────────────
function toggleWishlist(productId, btn = null) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const idx = wishlist.indexOf(productId);
  if (idx > -1) {
    wishlist.splice(idx, 1);
    showToast(`💔 Removed ${product.name} from wishlist`);
  } else {
    wishlist.push(productId);
    showToast(`🤍 Added ${product.name} to wishlist!`);
  }

  saveWishlist();
  updateWishlistUI();
  renderWishlistItems();

  // Update button states on page
  document.querySelectorAll(`.product-wishlist[data-id="${productId}"]`).forEach(b => {
    b.classList.toggle('active', wishlist.includes(productId));
    b.textContent = wishlist.includes(productId) ? '❤️' : '🤍';
  });
}

function updateWishlistUI() {
  const count = wishlist.length;
  document.querySelectorAll('.wishlist-count').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
}

function renderWishlistItems() {
  const container = document.getElementById('wishlistItems');
  if (!container) return;

  if (wishlist.length === 0) {
    container.innerHTML = `
      <div class="drawer-empty">
        <div class="empty-icon">🤍</div>
        <h4>Your Wishlist is Empty</h4>
        <p>Save your most-adored fragrances to revisit anytime.</p>
        <a href="shop.html" class="btn-secondary" style="margin-top:20px" onclick="closeWishlist()">Browse Fragrances</a>
      </div>`;
    return;
  }

  const wishProducts = products.filter(p => wishlist.includes(p.id));
  container.innerHTML = wishProducts.map(item => `
    <div class="drawer-item">
      <img src="${item.img}" alt="${item.name}" class="drawer-item-img" onerror="this.src='images/perfume-rose.png'">
      <div class="drawer-item-info">
        <div class="drawer-item-title">${item.name}</div>
        <div class="drawer-item-meta">${item.categoryLabel} • ${item.size}</div>
        <div class="drawer-item-price">₹${item.price.toLocaleString('en-IN')}</div>
        <button class="btn-primary btn-sm" style="margin-top:8px" onclick="addToCart(${item.id}); toggleWishlist(${item.id})">Move to Bag 🛒</button>
      </div>
      <button class="drawer-close" onclick="toggleWishlist(${item.id})" title="Remove" style="width:30px;height:30px;font-size:12px">✕</button>
    </div>
  `).join('');
}

function openWishlist() {
  closeCart();
  closeSearchModal();
  document.getElementById('wishlistDrawer')?.classList.add('open');
  document.getElementById('wishlistOverlay')?.classList.add('open');
  renderWishlistItems();
  updateWishlistUI();
}

function closeWishlist() {
  document.getElementById('wishlistDrawer')?.classList.remove('open');
  document.getElementById('wishlistOverlay')?.classList.remove('open');
}

// ── Product Quick View Modal ───────────────────
let currentQuickViewProduct = null;
let currentQuickViewSize = '50ml';
let currentQuickViewQty = 1;

function openQuickView(productId) {
  const p = products.find(item => item.id === productId);
  if (!p) return;

  currentQuickViewProduct = p;
  currentQuickViewSize = '50ml';
  currentQuickViewQty = 1;

  const modal = document.getElementById('quickViewModal');
  if (!modal) return;

  document.getElementById('qvImg').src = p.img;
  document.getElementById('qvTag').textContent = `${p.categoryLabel} Collection`;
  document.getElementById('qvTitle').textContent = p.name;
  document.getElementById('qvRating').innerHTML = `★ ${p.stars} <em>(${p.reviews} verified reviews)</em>`;
  document.getElementById('qvDesc').textContent = p.desc;
  
  // Olfactory pyramid
  document.getElementById('qvTopNotes').textContent = p.pyramid?.top || p.notes;
  document.getElementById('qvHeartNotes').textContent = p.pyramid?.heart || p.notes;
  document.getElementById('qvBaseNotes').textContent = p.pyramid?.base || p.notes;
  document.getElementById('qvLongevity').textContent = p.longevity || '8–12 Hours';
  document.getElementById('qvSillage').textContent = p.sillage || 'Moderate';

  // Sizes
  renderQuickViewSizes();
  updateQuickViewPrice();

  modal.classList.add('open');
}

function renderQuickViewSizes() {
  const container = document.getElementById('qvSizes');
  if (!container || !currentQuickViewProduct) return;

  container.innerHTML = currentQuickViewProduct.sizes.map(s => `
    <button class="size-btn ${s.size === currentQuickViewSize ? 'active' : ''}" onclick="selectQuickViewSize('${s.size}')">
      <div class="size-name">${s.size}</div>
      <div class="size-price">₹${s.price.toLocaleString('en-IN')}</div>
    </button>
  `).join('');
}

function selectQuickViewSize(size) {
  currentQuickViewSize = size;
  renderQuickViewSizes();
  updateQuickViewPrice();
}

function updateQuickViewPrice() {
  if (!currentQuickViewProduct) return;
  const sizeObj = currentQuickViewProduct.sizes.find(s => s.size === currentQuickViewSize) || { price: currentQuickViewProduct.price };
  const singlePrice = sizeObj.price;
  const totalPrice = singlePrice * currentQuickViewQty;

  document.getElementById('qvPrice').textContent = `₹${totalPrice.toLocaleString('en-IN')}`;
  document.getElementById('qvOrigPrice').textContent = `₹${(Math.round(totalPrice * 1.3)).toLocaleString('en-IN')}`;
  document.getElementById('qvQtyVal').textContent = currentQuickViewQty;
}

function changeQuickViewQty(delta) {
  currentQuickViewQty = Math.max(1, currentQuickViewQty + delta);
  updateQuickViewPrice();
}

function addQuickViewToCart() {
  if (!currentQuickViewProduct) return;
  addToCart(currentQuickViewProduct.id, currentQuickViewSize, currentQuickViewQty);
  closeQuickView();
}

function closeQuickView() {
  document.getElementById('quickViewModal')?.classList.remove('open');
}

// ── Render Products into Grids ─────────────────
function renderProducts(containerId, productList, limit = null) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const list = limit ? productList.slice(0, limit) : productList;
  if (list.length === 0) {
    container.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:50px 20px;color:var(--text-light)">
        <div style="font-size:3rem;margin-bottom:12px">🌸</div>
        <p>No fragrances match your selection. Try adjusting your filters.</p>
      </div>`;
    return;
  }

  container.innerHTML = list.map(p => `
    <div class="product-card animate-in" data-id="${p.id}">
      <div class="product-img-wrap">
        <span class="product-badge ${p.badgeClass}">${p.badge}</span>
        <img src="${p.img}" alt="${p.name}" onerror="this.src='images/perfume-rose.png'">
        <button class="product-wishlist ${wishlist.includes(p.id) ? 'active' : ''}" data-id="${p.id}"
          onclick="toggleWishlist(${p.id}, this)">${wishlist.includes(p.id) ? '❤️' : '🤍'}</button>
        <div class="product-overlay">
          <button class="overlay-btn overlay-btn-quick" onclick="openQuickView(${p.id})">Details 👁️</button>
          <button class="overlay-btn overlay-btn-cart" onclick="addToCart(${p.id})">Add to Bag 🛒</button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-category">${p.categoryLabel}</div>
        <h3 class="product-name" onclick="openQuickView(${p.id})">${p.name}</h3>
        <div class="product-notes-preview">Notes: ${p.notes}</div>
        <p class="product-desc">${p.desc}</p>
        <div class="product-footer">
          <span class="product-price">₹${p.price.toLocaleString('en-IN')}<span>₹${p.originalPrice.toLocaleString('en-IN')}</span></span>
          <span class="product-stars">★ ${p.stars} <em>(${p.reviews})</em></span>
        </div>
      </div>
    </div>
  `).join('');

  observeAnimations();
}

// ── Glassmorphic Live Search Modal ────────────
function openSearchModal() {
  const overlay = document.getElementById('searchModal');
  if (!overlay) return;
  overlay.classList.add('open');
  const input = document.getElementById('modalSearchInput');
  if (input) {
    input.focus();
    handleLiveSearch(input.value);
  }
}

function closeSearchModal() {
  document.getElementById('searchModal')?.classList.remove('open');
}

function handleLiveSearch(query) {
  const q = (query || '').toLowerCase().trim();
  const resultsBox = document.getElementById('searchResultsBox');
  if (!resultsBox) return;

  const matches = products.filter(p => 
    p.name.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.notes.toLowerCase().includes(q) ||
    p.desc.toLowerCase().includes(q)
  );

  if (matches.length === 0) {
    resultsBox.innerHTML = `
      <div style="text-align:center;padding:40px 10px;color:var(--text-light)">
        <div style="font-size:2.5rem;margin-bottom:10px">🔍</div>
        <p>No perfumes found for "${query}". Try searching for Rose, Citrus, or Aquatic.</p>
      </div>`;
    return;
  }

  resultsBox.innerHTML = matches.map(p => `
    <div class="search-result-item" onclick="openQuickView(${p.id}); closeSearchModal();">
      <img src="${p.img}" alt="${p.name}" class="search-item-img" onerror="this.src='images/perfume-rose.png'">
      <div class="search-item-info">
        <div class="search-item-title">${p.name}</div>
        <div class="search-item-notes">${p.categoryLabel} • ${p.notes}</div>
      </div>
      <div class="search-item-price">₹${p.price.toLocaleString('en-IN')}</div>
    </div>
  `).join('');
}

function applySearchTag(tag) {
  const input = document.getElementById('modalSearchInput');
  if (input) {
    input.value = tag;
    handleLiveSearch(tag);
  }
}

// ── Multi-Step Checkout Modal ──────────────────
let checkoutStep = 1;

function openCheckoutModal() {
  if (cart.length === 0) {
    showToast('🛍️ Your bag is empty! Add perfumes to proceed.');
    return;
  }
  closeCart();
  checkoutStep = 1;
  renderCheckoutStep();
  document.getElementById('checkoutModal')?.classList.add('open');
}

function closeCheckoutModal() {
  document.getElementById('checkoutModal')?.classList.remove('open');
}

function renderCheckoutStep() {
  document.querySelectorAll('.step-item').forEach((el, idx) => {
    const stepNum = idx + 1;
    el.classList.toggle('active', stepNum === checkoutStep);
    el.classList.toggle('completed', stepNum < checkoutStep);
  });

  document.querySelectorAll('.checkout-step-content').forEach((el, idx) => {
    el.classList.toggle('active', idx + 1 === checkoutStep);
  });

  if (checkoutStep === 2) {
    renderCheckoutSummary();
  }
}

function nextCheckoutStep() {
  if (checkoutStep === 1) {
    const name = document.getElementById('shipName')?.value.trim();
    const phone = document.getElementById('shipPhone')?.value.trim();
    const address = document.getElementById('shipAddress')?.value.trim();
    if (!name || !phone || !address) {
      showToast('⚠️ Please fill in all shipping details');
      return;
    }
  }

  if (checkoutStep < 3) {
    checkoutStep++;
    renderCheckoutStep();
  } else if (checkoutStep === 3) {
    // Process final simulated payment
    processFinalOrder();
  }
}

function prevCheckoutStep() {
  if (checkoutStep > 1) {
    checkoutStep--;
    renderCheckoutStep();
  }
}

function renderCheckoutSummary() {
  const container = document.getElementById('checkoutItemsReview');
  if (!container) return;

  container.innerHTML = cart.map(item => `
    <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--border);font-size:0.9rem">
      <div>
        <strong>${item.name}</strong> (${item.selectedSize}) × ${item.qty}
      </div>
      <div>₹${(item.price * item.qty).toLocaleString('en-IN')}</div>
    </div>
  `).join('');

  const subtotal = getCartTotal();
  const finalTotal = getDiscountedTotal();
  const discountAmount = subtotal - finalTotal;

  document.getElementById('coSubtotal').textContent = `₹${subtotal.toLocaleString('en-IN')}`;
  document.getElementById('coDiscount').textContent = discountAmount > 0 ? `-₹${discountAmount.toLocaleString('en-IN')}` : '₹0';
  document.getElementById('coTotal').textContent = `₹${finalTotal.toLocaleString('en-IN')}`;
}

async function applyCouponCode() {
  const input = document.getElementById('promoInput');
  const code = (input?.value || '').trim().toUpperCase();
  if (!code) return;

  try {
    const res = await fetch(`${API_BASE}/coupons/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    });
    const data = await res.json();
    if (data.success && data.coupon) {
      activePromo = data.coupon;
      showToast(`🎁 ${data.message || 'Voucher Applied!'}`);
    } else {
      showToast(`❌ ${data.message || 'Invalid voucher code'}`);
      return;
    }
  } catch (err) {
    // Graceful offline fallback
    if (code === 'SCENT10') {
      activePromo = { code: 'SCENT10', discount: 0.1, type: 'percent' };
      showToast('🎁 10% Luxury Discount Applied!');
    } else if (code === 'SPRING500') {
      activePromo = { code: 'SPRING500', discount: 500, type: 'flat' };
      showToast('🌸 ₹500 Spring Voucher Applied!');
    } else {
      showToast('❌ Invalid promo code. Try SCENT10 or SPRING500');
      return;
    }
  }

  renderCheckoutSummary();
}

function selectPaymentMethod(method, tab) {
  document.querySelectorAll('.payment-tab').forEach(t => t.classList.remove('active'));
  tab.classList.add('active');

  const upiBox = document.getElementById('upiPaymentView');
  const cardBox = document.getElementById('cardPaymentView');
  const codBox = document.getElementById('codPaymentView');

  if (upiBox) upiBox.style.display = method === 'upi' ? 'block' : 'none';
  if (cardBox) cardBox.style.display = method === 'card' ? 'block' : 'none';
  if (codBox) codBox.style.display = method === 'cod' ? 'block' : 'none';
}

async function processFinalOrder() {
  const btn = document.getElementById('placeOrderBtn');
  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Securing Your Luxury Order... ✨';
  }

  const shipping = {
    name: document.getElementById('shipName')?.value.trim() || 'Valued Guest',
    phone: document.getElementById('shipPhone')?.value.trim() || '',
    email: document.getElementById('shipEmail')?.value.trim() || '',
    address: document.getElementById('shipAddress')?.value.trim() || '',
    city: document.getElementById('shipCity')?.value.trim() || 'Mumbai',
    pincode: document.getElementById('shipPincode')?.value.trim() || '400001'
  };

  const paymentMethod = document.querySelector('.payment-tab.active .pay-title')?.textContent?.toLowerCase() || 'upi';
  let orderId = `YS-2026-${Math.floor(100000 + Math.random() * 900000)}`;

  try {
    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: cart,
        shipping,
        paymentMethod,
        promoCode: activePromo ? activePromo.code : null
      })
    });
    const data = await res.json();
    if (data.success && data.order) {
      orderId = data.order.orderId;
    }
  } catch (err) {
    console.warn('Backend offline, proceeding with client-side order confirmation.');
  }

  const orderBadgeEl = document.getElementById('confirmedOrderId');
  if (orderBadgeEl) orderBadgeEl.textContent = orderId;

  // Clear cart
  cart = [];
  activePromo = null;
  saveCart();
  updateCartUI();

  // Show confirmation step
  checkoutStep = 4;
  renderCheckoutStep();
  showToast('🎉 Congratulations! Your luxury fragrance is being prepared.');
}

async function handleNewsletterSubscription(email) {
  if (!email) return;
  try {
    const res = await fetch(`${API_BASE}/newsletter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    showToast(data.message || '✨ Welcome to the Private Circle!');
  } catch (err) {
    showToast('🎁 Welcome! Promo code SCENT10 applied.');
  }
}

async function handleConciergeSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const name = document.getElementById('contactName')?.value.trim();
  const email = document.getElementById('contactEmail')?.value.trim();
  const phone = document.getElementById('contactPhone')?.value.trim();
  const inquiryNature = document.getElementById('contactNature')?.value;
  const message = document.getElementById('contactMessage')?.value.trim();

  try {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, inquiryNature, message })
    });
    const data = await res.json();
    showToast(data.message || '✨ Your inquiry has been received by our atelier.');
  } catch (err) {
    showToast('✨ Your inquiry has been received by our atelier.');
  }
  form.reset();
}

// ── Interactive Fragrance Quiz ────────────────
let quizAnswers = {};

function selectQuizOption(questionKey, value, btn) {
  const parent = btn.closest('.quiz-options-grid');
  parent.querySelectorAll('.quiz-option-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  quizAnswers[questionKey] = value;

  // Auto-advance or calculate result
  if (questionKey === 'vibe') {
    document.getElementById('quizStep1').style.display = 'none';
    document.getElementById('quizStep2').style.display = 'block';
    document.getElementById('quizProgressFill').style.width = '66%';
  } else if (questionKey === 'occasion') {
    document.getElementById('quizStep2').style.display = 'none';
    document.getElementById('quizStep3').style.display = 'block';
    document.getElementById('quizProgressFill').style.width = '100%';
  } else if (questionKey === 'notes') {
    calculateQuizResult();
  }
}

function calculateQuizResult() {
  document.getElementById('quizStep3').style.display = 'none';
  const resultCard = document.getElementById('quizResultStep');
  resultCard.style.display = 'block';

  let match = products.find(p => p.quizVibe === quizAnswers.vibe) ||
              products.find(p => p.quizOccasion === quizAnswers.occasion) ||
              products[0];

  document.getElementById('quizMatchName').textContent = match.name;
  document.getElementById('quizMatchNotes').textContent = `Dominant Accords: ${match.notes}`;
  document.getElementById('quizMatchDesc').textContent = match.desc;
  document.getElementById('quizMatchImg').src = match.img;
  
  const actionBtn = document.getElementById('quizMatchAction');
  if (actionBtn) {
    actionBtn.onclick = () => {
      openQuickView(match.id);
    };
  }
}

function restartQuiz() {
  quizAnswers = {};
  document.getElementById('quizStep1').style.display = 'block';
  document.getElementById('quizStep2').style.display = 'none';
  document.getElementById('quizStep3').style.display = 'none';
  document.getElementById('quizResultStep').style.display = 'none';
  document.getElementById('quizProgressFill').style.width = '33%';
  document.querySelectorAll('.quiz-option-btn').forEach(b => b.classList.remove('selected'));
}

// ── Luxury Theme Switcher ──────────────────────
function initTheme() {
  const savedTheme = localStorage.getItem('ys_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('ys_theme', next);
  updateThemeIcon(next);
  showToast(next === 'dark' ? '🌙 Switched to Midnight Luxury Mode' : '☀️ Switched to Sunlit Garden Mode');
}

function updateThemeIcon(theme) {
  document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
    btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    btn.title = theme === 'dark' ? 'Switch to Sunlit Mode' : 'Switch to Midnight Mode';
  });
}

// ── Toast System ──────────────────────────────
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}

// ── Centralized Chatbot ───────────────────────
function toggleChatbot() {
  const box = document.getElementById('chatbot-box');
  if (!box) return;
  box.classList.toggle('open');
}

// ── Animations Observer ───────────────────────
function observeAnimations() {
  const els = document.querySelectorAll('.animate-in:not(.visible)');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
}

// ── Navigation & Global Listeners ─────────────
function initNavigation() {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 30);
    });
  }

  // Hamburger
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
    });
  }

  // Cart open/close triggers
  document.getElementById('cartBtn')?.addEventListener('click', openCart);
  document.getElementById('cartOverlay')?.addEventListener('click', closeCart);
  document.getElementById('cartClose')?.addEventListener('click', closeCart);

  // Wishlist triggers
  document.getElementById('wishlistBtn')?.addEventListener('click', openWishlist);
  document.getElementById('wishlistOverlay')?.addEventListener('click', closeWishlist);
  document.getElementById('wishlistClose')?.addEventListener('click', closeWishlist);

  // Search trigger
  document.getElementById('searchBtn')?.addEventListener('click', openSearchModal);
  document.getElementById('searchModalClose')?.addEventListener('click', closeSearchModal);
  document.getElementById('searchModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'searchModal') closeSearchModal();
  });

  // Keyboard shortcut '/' opens search, 'Escape' closes modals
  window.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      e.preventDefault();
      openSearchModal();
    } else if (e.key === 'Escape') {
      closeSearchModal();
      closeQuickView();
      closeCart();
      closeWishlist();
      closeCheckoutModal();
    }
  });

  // Live search input listener
  document.getElementById('modalSearchInput')?.addEventListener('input', (e) => {
    handleLiveSearch(e.target.value);
  });
}

// ── App Init ──────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  updateCartUI();
  updateWishlistUI();
  observeAnimations();
});
