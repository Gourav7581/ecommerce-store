import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiCheck, FiMinus, FiPlus, FiShoppingBag, FiStar, FiTruck } from "react-icons/fi";
import Header from "./Header";
import Footer from "./Footer";
import { useStore } from "../context/StoreContext";

export default function Singleproduct() {
  const { id } = useParams();
  const { products, loading, addToCart } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const product = products.find((item) => item.id === Number(id));
  const add = () => { addToCart(product, quantity); setAdded(true); setTimeout(() => setAdded(false), 1500); };

  return <><Header /><main className="product-page container">
    <Link to="/shop" className="back-link"><FiArrowLeft /> Back to shopping</Link>
    {loading ? <div className="state-message">Loading product…</div> : !product ? <div className="state-message"><h2>Product not found</h2><Link to="/shop">Browse products</Link></div> :
      <div className="product-detail">
        <div className="detail-gallery"><img src={product.thumbnail} alt={product.title}/></div>
        <div className="detail-content"><p className="eyebrow">{product.category.replaceAll("-", " ")}</p><h1>{product.title}</h1><div className="detail-rating"><FiStar /> {product.rating.toFixed(1)} <span>· {product.stock} in stock</span></div><p className="detail-price">${product.price.toFixed(2)}</p><p className="detail-description">{product.description}</p>
          <div className="quantity-row"><span>Quantity</span><div className="quantity-control"><button onClick={() => setQuantity(Math.max(1, quantity - 1))}><FiMinus /></button><span>{quantity}</span><button onClick={() => setQuantity(quantity + 1)}><FiPlus /></button></div></div>
          <button className={`button primary full ${added ? "added" : ""}`} onClick={add}>{added ? <FiCheck/> : <FiShoppingBag/>}{added ? "Added to cart" : `Add to cart · $${(product.price * quantity).toFixed(2)}`}</button>
          <div className="delivery-note"><FiTruck/><span><strong>Fast, tracked delivery</strong>Estimated dispatch in 1–2 business days</span></div>
        </div>
      </div>}
  </main><Footer /></>;
}
