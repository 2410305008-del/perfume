import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import QuickViewModal from './components/QuickViewModal';
import CheckoutModal from './components/CheckoutModal';
import FragranceQuizModal from './components/FragranceQuizModal';
import SearchModal from './components/SearchModal';
import ChatbotWidget from './components/ChatbotWidget';
import Toast from './components/Toast';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';
import OrderSuccess from './pages/OrderSuccess';
import Auth from './pages/Auth';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
      <CartProvider>
        <div className="app-container">
          <ScrollToTop />
          <Navbar />
          
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/order/:id" element={<OrderSuccess />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>

          <Footer />

          {/* Global Drawers & Modals */}
          <CartDrawer />
          <WishlistDrawer />
          <QuickViewModal />
          <CheckoutModal />
          <FragranceQuizModal />
          <SearchModal />
          <ChatbotWidget />
          <Toast />
        </div>
      </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
