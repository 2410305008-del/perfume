import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../services/api';
import ProductCard from '../components/ProductCard';
import { 
  Filter, 
  Search, 
  SlidersHorizontal, 
  Sparkles, 
  RotateCcw,
  ArrowUpDown 
} from 'lucide-react';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const currentCategory = searchParams.get('category') || 'all';
  const currentSearch = searchParams.get('search') || '';
  const [sort, setSort] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(5000);
  const [searchInput, setSearchInput] = useState(currentSearch);

  const categories = [
    { id: 'all', label: 'All Creations' },
    { id: 'floral', label: 'Floral Bouquet' },
    { id: 'woody', label: 'Woody & Oud' },
    { id: 'oriental', label: 'Oriental & Amber' },
    { id: 'fresh', label: 'Fresh Citrus' },
    { id: 'aquatic', label: 'Marine & Aquatic' }
  ];

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = {
        category: currentCategory !== 'all' ? currentCategory : undefined,
        search: currentSearch || undefined,
        sort: sort !== 'featured' ? sort : undefined,
        maxPrice: maxPrice < 5000 ? maxPrice : undefined
      };
      const res = await api.getProducts(params);
      if (res.success) {
        setProducts(res.products);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentCategory, currentSearch, sort, maxPrice]);

  const handleCategoryChange = (catId) => {
    const params = new URLSearchParams(searchParams);
    if (catId === 'all') {
      params.delete('category');
    } else {
      params.set('category', catId);
    }
    setSearchParams(params);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchInput.trim()) {
      params.set('search', searchInput.trim());
    } else {
      params.delete('search');
    }
    setSearchParams(params);
  };

  const handleResetFilters = () => {
    setSearchInput('');
    setMaxPrice(5000);
    setSort('featured');
    setSearchParams({});
  };

  return (
    <div className="shop-page">
      {/* ── Page Header ── */}
      <section className="shop-header-banner">
        <div className="page-container">
          <div className="breadcrumb-nav">
            <span>Maison</span>
            <span className="sep">/</span>
            <span className="current">Fragrance Catalog</span>
          </div>
          <h1 className="shop-page-title">The Haute Parfumerie Catalog</h1>
          <p className="shop-page-subtitle">
            Limited-edition extraits de parfum, bottled at 30% concentration for unmatched depth and unforgettable presence.
          </p>
        </div>
      </section>

      {/* ── Filter Controls & Categories ── */}
      <section className="shop-controls-section">
        <div className="page-container">
          {/* Category Tabs */}
          <div className="category-tabs-bar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`category-tab-btn ${currentCategory === cat.id ? 'active' : ''}`}
                onClick={() => handleCategoryChange(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Filter Toolbar */}
          <div className="shop-toolbar">
            {/* Search within catalog */}
            <form className="catalog-search-form" onSubmit={handleSearchSubmit}>
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search notes or names..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              {searchInput && (
                <button 
                  type="button" 
                  className="clear-search" 
                  onClick={() => { setSearchInput(''); handleResetFilters(); }}
                >
                  ×
                </button>
              )}
            </form>

            {/* Price Slider Filter */}
            <div className="price-slider-group">
              <span className="slider-label">Max Price: <strong>₹{maxPrice.toLocaleString('en-IN')}</strong></span>
              <input 
                type="range" 
                min="1500" 
                max="5000" 
                step="250"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="luxury-slider"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="sort-dropdown-group">
              <ArrowUpDown size={15} className="sort-icon" />
              <select 
                value={sort} 
                onChange={(e) => setSort(e.target.value)}
                className="luxury-select"
              >
                <option value="featured">Featured Artisanal</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Connoisseur Rating</option>
                <option value="name">Alphabetical (A–Z)</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* ── Product Grid ── */}
      <section className="shop-grid-section">
        <div className="page-container">
          {loading ? (
            <div className="shop-loading-state">
              <Sparkles size={32} className="spin-gold" />
              <p>Curating flacons from our atelier vault...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="shop-empty-state">
              <SlidersHorizontal size={48} className="empty-icon" />
              <h3>No Fragrances Match Your Filter Criteria</h3>
              <p>Try widening your search terms or adjusting the price slider.</p>
              <button className="btn-secondary" onClick={handleResetFilters}>
                <RotateCcw size={15} />
                <span>Reset All Filters</span>
              </button>
            </div>
          ) : (
            <>
              <div className="shop-results-meta">
                <span>Showing <strong>{products.length}</strong> rare fragrances</span>
              </div>
              <div className="products-grid">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
