import React from 'react';
import { useCart } from '../context/CartContext';
import { Sparkles } from 'lucide-react';

export default function Toast() {
  const { toast } = useCart();

  if (!toast.show) return null;

  return (
    <div className="luxury-toast-container">
      <div className="luxury-toast-pill">
        <Sparkles size={16} className="toast-gold-icon" />
        <span className="toast-message">{toast.message}</span>
      </div>
    </div>
  );
}
