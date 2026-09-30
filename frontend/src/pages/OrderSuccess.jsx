import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { 
  CheckCircle2, 
  Package, 
  Truck, 
  Clock, 
  ShieldCheck, 
  ArrowLeft,
  ShoppingBag,
  Sparkles 
} from 'lucide-react';

export default function OrderSuccess() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      api.getOrderById(id)
        .then(res => {
          if (res.success) setOrder(res.order);
          else setError('Order reference not found');
        })
        .catch(err => setError('Error loading order details'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="order-page-status">
        <Sparkles size={36} className="spin-gold" />
        <p>Retrieving your Haute Parfumerie manifest...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="order-page-status">
        <h2>Order Not Found</h2>
        <p>{error || 'No valid order reference provided.'}</p>
        <Link to="/shop" className="btn-primary">
          <ArrowLeft size={16} />
          <span>Return to Catalog</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="order-success-page">
      <div className="page-container order-container">
        <div className="order-receipt-card">
          <div className="receipt-header">
            <CheckCircle2 size={48} className="gold-success-icon" />
            <span className="receipt-eyebrow">Haute Parfumerie Order Confirmation</span>
            <h1 className="receipt-title">Order #{order.orderId}</h1>
            <p className="receipt-sub">Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { dateStyle: 'long' })}</p>
          </div>

          <div className="receipt-meta-grid">
            <div className="receipt-block">
              <Truck size={18} className="gold-icon" />
              <div>
                <strong>Estimated Delivery</strong>
                <span>{order.estimatedDelivery}</span>
              </div>
            </div>

            <div className="receipt-block">
              <ShieldCheck size={18} className="gold-icon" />
              <div>
                <strong>Payment Method</strong>
                <span className="capitalize">{order.payment.method} ({order.payment.status})</span>
              </div>
            </div>

            <div className="receipt-block">
              <Package size={18} className="gold-icon" />
              <div>
                <strong>White Glove Courier To</strong>
                <span>{order.shipping.name}, {order.shipping.city} ({order.shipping.pincode})</span>
              </div>
            </div>
          </div>

          <div className="receipt-items-table">
            <h3 className="table-title">Purchased Flacons ({order.items.length})</h3>
            <div className="receipt-items-list">
              {order.items.map((item, idx) => (
                <div key={idx} className="receipt-item-row">
                  <div className="item-name-col">
                    <strong>{item.name}</strong>
                    <span className="item-size-pill">{item.size}</span>
                  </div>
                  <span className="item-qty">Qty: {item.qty}</span>
                  <span className="item-price">₹{item.total.toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>

            <div className="receipt-math">
              <div className="math-row">
                <span>Subtotal</span>
                <span>₹{order.pricing.subtotal.toLocaleString('en-IN')}</span>
              </div>
              {order.pricing.discount > 0 && (
                <div className="math-row discount">
                  <span>Privilege Voucher ({order.pricing.promoCode})</span>
                  <span>-₹{order.pricing.discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="math-row">
                <span>White Glove Courier</span>
                <span className="free-tag">COMPLIMENTARY</span>
              </div>
              <div className="math-row total-row">
                <span>Total Amount Paid</span>
                <span className="total-gold">₹{order.pricing.total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          <div className="receipt-footer-actions">
            <Link to="/shop" className="btn-primary">
              <ShoppingBag size={16} />
              <span>Explore More Fragrances</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
