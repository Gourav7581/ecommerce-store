import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingBag, FiStar } from "react-icons/fi";
import { useStore } from "../context/StoreContext";

export default function ProductCard({ product }) {
  const { addToCart } = useStore();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-image-wrap">
        <img src={product.thumbnail} alt={product.title} loading="lazy" />
        {product.discountPercentage > 10 && <span className="discount">-{Math.round(product.discountPercentage)}%</span>}
      </Link>
      <div className="product-info">
        <p className="product-category">{product.category?.replaceAll("-", " ")}</p>
        <Link to={`/product/${product.id}`}><h3>{product.title}</h3></Link>
        <div className="product-meta">
          <span className="rating"><FiStar /> {product.rating?.toFixed(1)}</span>
          <strong>${product.price.toFixed(2)}</strong>
        </div>
        <button className={`add-button ${added ? "added" : ""}`} onClick={handleAdd}>
          <FiShoppingBag /> {added ? "Added" : "Add to cart"}
        </button>
      </div>
    </article>
  );
}
