import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Bot, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { openQuiz, openCart } = useCart();
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Bonjour! Welcome to Your Scent Haute Parfumerie. I am your Private Atelier Concierge. How may I assist your olfactory journey today?'
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    'Recommend a signature gift',
    'How do I use a voucher code?',
    'What is White Glove Delivery?',
    'Take the Fragrance Quiz'
  ];

  const handleSend = (textToSend = null) => {
    const query = textToSend || input;
    if (!query || !query.trim()) return;

    const userMsg = { sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');

    // Formulate response
    setTimeout(() => {
      let reply = '';
      const lower = query.toLowerCase();

      if (lower.includes('quiz') || lower.includes('finder')) {
        reply = 'You can take our Master Fragrance Quiz to match with your exact notes! Opening it for you now...';
        openQuiz();
      } else if (lower.includes('voucher') || lower.includes('code') || lower.includes('discount')) {
        reply = 'Use our welcome voucher code "SCENT10" during checkout for an immediate 10% privilege discount on all artisanal flacons!';
      } else if (lower.includes('delivery') || lower.includes('shipping') || lower.includes('white glove')) {
        reply = 'Our White Glove Courier provides climate-controlled, discrete delivery within 3–5 business days across India. It is completely complimentary on orders over ₹2,500.';
      } else if (lower.includes('gift') || lower.includes('recommend')) {
        reply = 'For an unforgettable gift, "Rose Bloom" and "Jasmine Noir" are our most lauded extrait de parfum flacons, hand-packaged with personalized atelier calligraphy.';
      } else if (lower.includes('bag') || lower.includes('cart')) {
        reply = 'Opening your private shopping bag for you now...';
        openCart();
      } else {
        reply = 'Our master perfumers in Grasse and Mumbai are at your service. For bespoke wedding and private flacon orders, please book a consultation via our Concierge page!';
      }

      setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    }, 600);
  };

  return (
    <div className="chatbot-wrapper">
      {/* ── Floating Trigger Button ── */}
      <button 
        className={`chatbot-trigger-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open Luxury Concierge Chat"
        title="Atelier Concierge"
      >
        {isOpen ? <X size={22} /> : (
          <>
            <MessageCircle size={22} />
            <span className="chatbot-online-pulse" />
          </>
        )}
      </button>

      {/* ── Chat Window ── */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-title-block">
              <div className="chatbot-avatar">
                <Sparkles size={16} className="gold-icon" />
              </div>
              <div>
                <h4 className="chatbot-name">Atelier Concierge</h4>
                <span className="chatbot-status">Online • Grasse Master Parfumeur</span>
              </div>
            </div>
            <button className="chatbot-close" onClick={() => setIsOpen(false)}>
              <X size={18} />
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((m, idx) => (
              <div key={idx} className={`chat-message ${m.sender}`}>
                <div className="chat-bubble">
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions */}
          <div className="chatbot-quick-chips">
            {quickPrompts.map((prompt, i) => (
              <button 
                key={i} 
                className="quick-chip"
                onClick={() => handleSend(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input form */}
          <form 
            className="chatbot-input-form" 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          >
            <input 
              type="text" 
              placeholder="Ask our Master Parfumeur..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" disabled={!input.trim()}>
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
