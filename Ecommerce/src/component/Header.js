import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiSearch, FiShoppingBag, FiX } from "react-icons/fi";
import logo from "../image/logo.png";
import { useStore } from "../context/StoreContext";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { cartCount } = useStore();
  const submitSearch = (event) => {
    event.preventDefault();
    if (query.trim()) navigate(`/shop?q=${encodeURIComponent(query.trim())}`);
    setOpen(false);
  };
  const links = [["/", "Home"], ["/shop", "Shop"], ["/men", "Men"], ["/women", "Women"], ["/about", "About"], ["/contact", "Contact"]];
  return <header className="site-header">
    <div className="announcement">Free delivery on orders over $100 · Easy 7-day returns</div>
    <div className="header-inner container">
      <Link to="/" className="brand"><img src={logo} alt="ShopNest" /><span>Shop<span>Nest</span></span></Link>
      <button className="menu-toggle" aria-label="Toggle menu" onClick={() => setOpen(!open)}>{open ? <FiX /> : <FiMenu />}</button>
      <nav className={open ? "main-navigation open" : "main-navigation"}>
        {links.map(([path, name]) => <NavLink key={path} to={path} onClick={() => setOpen(false)}>{name}</NavLink>)}
      </nav>
      <div className="header-actions">
        <form className="header-search" onSubmit={submitSearch}><FiSearch /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products" aria-label="Search products" /></form>
        <Link to="/cart" className="cart-link" aria-label={`Cart with ${cartCount} items`}><FiShoppingBag /><span>{cartCount}</span></Link>
      </div>
    </div>
  </header>;
}
