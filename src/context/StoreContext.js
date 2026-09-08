import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { FiCheckCircle, FiShoppingBag, FiX } from "react-icons/fi";
import { Productlist } from "../Service api/Productlist";

const StoreContext = createContext(null);
const CART_KEY = "shopnest-cart";

export function StoreProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState(null);
  const notificationTimer = useRef(null);
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    let active = true;
    Productlist()
      .then((data) => active && setProducts(Array.isArray(data) ? data : []))
      .catch(() => active && setError("Products load nahi ho paaye. Please try again."))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) => item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item);
      }
      return [...current, { ...product, quantity }];
    });
    setNotification({ title: product.title, image: product.thumbnail, quantity });
    clearTimeout(notificationTimer.current);
    notificationTimer.current = setTimeout(() => setNotification(null), 2000);
  };

  useEffect(() => () => clearTimeout(notificationTimer.current), []);

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCart((current) => current.map((item) => item.id === id ? { ...item, quantity } : item));
  };

  const removeFromCart = (id) => setCart((current) => current.filter((item) => item.id !== id));
  const clearCart = () => setCart([]);

  const value = useMemo(() => ({
    products,
    loading,
    error,
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartCount: cart.reduce((sum, item) => sum + item.quantity, 0),
    cartTotal: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
  }), [products, loading, error, cart]);

  return <StoreContext.Provider value={value}>
    {children}
    {notification && <div className="cart-toast" role="status" aria-live="polite">
      <div className="toast-icon"><FiCheckCircle /></div>
      <img src={notification.image} alt="" />
      <div className="toast-copy"><strong>Added to your cart</strong><span>{notification.quantity > 1 ? `${notification.quantity} × ` : ""}{notification.title}</span></div>
      <FiShoppingBag className="toast-bag" />
      <button onClick={() => setNotification(null)} aria-label="Close notification"><FiX /></button>
      <div className="toast-progress" />
    </div>}
  </StoreContext.Provider>;
}

export const useStore = () => useContext(StoreContext);
