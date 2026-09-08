import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiRefreshCw, FiShield, FiTruck } from "react-icons/fi";
import Header from "../component/Header";
import Footer from "../component/Footer";
import ProductCard from "../component/ProductCard";
import { useStore } from "../context/StoreContext";

export default function Home() {
  const { products, loading } = useStore();
  const featured = [...products].sort((a, b) => b.rating - a.rating).slice(0, 8);
  return <><Header /><main>
    <section className="home-hero"><div className="container hero-grid">
      <div className="hero-copy"><p className="eyebrow">New season · New essentials</p><h1>Everyday style,<br/><em>made effortless.</em></h1><p>Discover thoughtfully selected fashion, beauty, and lifestyle essentials—all in one beautiful place.</p><div className="hero-buttons"><Link to="/shop" className="button primary">Shop collection <FiArrowRight /></Link><Link to="/women" className="button secondary">Explore women</Link></div></div>
      <div className="hero-visual"><img src="/assets/images/left-banner-image.jpg" alt="New fashion collection"/><div className="hero-card"><strong>Up to 25% off</strong><span>Selected styles this week</span></div></div>
    </div></section>
    <section className="benefits container"><div><FiTruck/><span><strong>Fast delivery</strong>Free over $100</span></div><div><FiRefreshCw/><span><strong>Easy returns</strong>Within 7 days</span></div><div><FiShield/><span><strong>Secure shopping</strong>Your data is protected</span></div></section>
    <section className="category-showcase container"><div className="section-heading"><div><p className="eyebrow">Shop your way</p><h2>Collections for every mood</h2></div><Link to="/shop">View everything <FiArrowRight /></Link></div><div className="category-grid">
      <Link to="/women" className="category-card large"><img src="/assets/images/baner-right-image-01.jpg" alt="Women's collection"/><span><small>Fresh arrivals</small>Women</span></Link>
      <Link to="/men" className="category-card"><img src="/assets/images/baner-right-image-02.jpg" alt="Men's collection"/><span><small>Modern classics</small>Men</span></Link>
      <Link to="/shop?q=fragrance" className="category-card"><img src="/assets/images/baner-right-image-04.jpg" alt="Beauty collection"/><span><small>Finishing touches</small>Beauty & more</span></Link>
    </div></section>
    <section className="featured-section container"><div className="section-heading"><div><p className="eyebrow">Loved by shoppers</p><h2>Trending now</h2></div><Link to="/shop">Shop all <FiArrowRight /></Link></div>{loading ? <div className="state-message">Loading our picks…</div> : <div className="product-grid">{featured.map((product) => <ProductCard product={product} key={product.id}/>)}</div>}</section>
    <section className="newsletter container"><div><p className="eyebrow">Stay in the loop</p><h2>Good things, delivered.</h2><p>Join our list for new drops and members-only offers.</p></div><form onSubmit={(e) => e.preventDefault()}><input type="email" placeholder="Your email address" required/><button className="button primary">Subscribe</button></form></section>
  </main><Footer /></>;
}
