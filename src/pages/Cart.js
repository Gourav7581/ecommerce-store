import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiMinus, FiPlus, FiShoppingBag, FiTrash2 } from "react-icons/fi";
import Header from "../component/Header";
import Footer from "../component/Footer";
import { useStore } from "../context/StoreContext";

export default function Cart() {
  const { cart, cartTotal, updateQuantity, removeFromCart, clearCart } = useStore();
  const [checkoutNotice, setCheckoutNotice] = useState(false);
  const checkoutTimer = useRef(null);
  const shipping = cartTotal >= 100 || cartTotal === 0 ? 0 : 8;
  const showCheckoutNotice = () => {
    setCheckoutNotice(true);
    clearTimeout(checkoutTimer.current);
    checkoutTimer.current = setTimeout(() => setCheckoutNotice(false), 2000);
  };
  useEffect(() => () => clearTimeout(checkoutTimer.current), []);
  return <><Header /><main className="cart-page container">
    <div className="page-title"><p className="eyebrow">Your selection</p><h1>Shopping cart</h1></div>
    {!cart.length ? <section className="empty-cart"><FiShoppingBag/><h2>Your cart is empty</h2><p>Looks like you haven't found your new favorite yet.</p><Link to="/shop" className="button primary">Start shopping <FiArrowRight/></Link></section> :
      <div className="cart-layout"><section className="cart-items"><div className="cart-list-heading"><h2>{cart.length} {cart.length === 1 ? "item" : "items"}</h2><button onClick={clearCart}>Clear cart</button></div>
        {cart.map((item) => <article className="cart-item" key={item.id}><Link to={`/product/${item.id}`}><img src={item.thumbnail} alt={item.title}/></Link><div className="cart-item-info"><p>{item.category?.replaceAll("-", " ")}</p><Link to={`/product/${item.id}`}><h3>{item.title}</h3></Link><strong>${item.price.toFixed(2)}</strong><div className="cart-item-actions"><div className="quantity-control"><button onClick={() => updateQuantity(item.id, item.quantity - 1)}><FiMinus/></button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.id, item.quantity + 1)}><FiPlus/></button></div><button className="remove-button" onClick={() => removeFromCart(item.id)}><FiTrash2/> Remove</button></div></div><strong className="line-total">${(item.price * item.quantity).toFixed(2)}</strong></article>)}
      </section><aside className="order-summary"><h2>Order summary</h2><div><span>Subtotal</span><strong>${cartTotal.toFixed(2)}</strong></div><div><span>Delivery</span><strong>{shipping ? `$${shipping.toFixed(2)}` : "Free"}</strong></div>{cartTotal < 100 && <p>Add ${(100-cartTotal).toFixed(2)} more for free delivery.</p>}<div className="summary-total"><span>Total</span><strong>${(cartTotal + shipping).toFixed(2)}</strong></div><button className="button primary full" onClick={showCheckoutNotice}>Proceed to checkout <FiArrowRight/></button><small>Taxes calculated at checkout</small></aside></div>}
  </main><Footer />{checkoutNotice && <div className="checkout-notice" role="status" aria-live="polite"><div className="checkout-notice-icon">!</div><div><strong>Checkout is coming soon</strong><span>Payment functionality is not available right now.</span></div><div className="checkout-notice-progress" /></div>}</>;
}
