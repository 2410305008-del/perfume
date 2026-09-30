import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';
import { Search, X, Star, ShoppingBag, ArrowRight } from 'lucide-react';

export default function SearchModal() {
  const { isSearchOpen, closeSearch, openQuickView, addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const popularTags = ['Rose', 'Oud', 'Santal', 'Vanilla', 'Leather', 'Neroli', 'Tuberose', 'Citrus', 'Aquatic'];

  useEffect(() => {
    if (!isSearchOpen) {
      setSearchTerm('');
      setResults([]);
      return;
    }

    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await api.getProducts({ search: searchTerm.trim() });
        if (res.success) {
          setResults(res.products);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [searchTerm, isSearchOpen]);

  if (!isSearchOpen) return null;

  return (
    <div className="search-overlay" onClick={closeSearch}>
      <div className="search-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="search-input-wrapper">
          <Search size={22} className="search-input-icon" />
          <input
            type="text"
            autoFocus
            placeholder="Search by fragrance name, botanical notes (e.g. Rose, Peony, Lemon)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-main-input"
          />
          <button className="search-close-icon" onClick={closeSearch}>
            <X size={22} />
          </button>
        </div>

        {/* Trending Tags */}
        <div className="search-tags-row">
          <span className="tags-label">Popular Olfactory Notes:</span>
          {popularTags.map((tag) => (
            <button
              key={tag}
              type="button"
              className="search-tag-chip"
              onClick={() => setSearchTerm(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div className="search-results-area">
          {loading && (
            <div className="search-status-text">Searching the Atelier archives...</div>
          )}

          {!loading && searchTerm && results.length === 0 && (
            <div className="search-status-text">
              No fragrances matched "{searchTerm}". Try searching for Rose, Citrus, or Lavender.
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="search-results-grid">
              {results.map((product) => {
                const imgPath = product.img?.startsWith('/') ? product.img : `/${product.img}`;
                return (
                  <div 
                    key={product.id} 
                    className="search-result-card"
                    onClick={() => {
                      closeSearch();
                      openQuickView(product);
                    }}
                  >
                    <img src={imgPath} alt={product.name} className="search-result-img" />
                    <div className="search-result-content">
                      <span className="search-result-cat">{product.categoryLabel || product.category}</span>
                      <h4 className="search-result-title">{product.name}</h4>
                      <p className="search-result-notes">{product.notes}</p>
                      <div className="search-result-footer">
                        <span className="search-result-price">₹{product.price.toLocaleString('en-IN')}</span>
                        <span className="search-view-link">
                          <span>View Details</span>
                          <ArrowRight size={13} />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
