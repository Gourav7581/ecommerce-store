import React from "react";
import { Link } from "react-router-dom";
import { FiInstagram, FiMail, FiMapPin } from "react-icons/fi";

export default function Footer() {
  return <footer className="site-footer"><div className="container footer-grid"><div className="footer-brand"><h3>Shop<span>Nest</span></h3><p>Everyday products selected for quality, value, and effortless style.</p><span><FiMapPin/> Rajasthan, India</span><span><FiMail/> grprem75@gmail.com</span></div><div><h4>Shop</h4><Link to="/shop">All products</Link><Link to="/men">Men</Link><Link to="/women">Women</Link></div><div><h4>Company</h4><Link to="/about">About us</Link><Link to="/contact">Contact</Link><Link to="/cart">Your cart</Link></div><div><h4>Follow</h4><a href="https://www.instagram.com/gouravrathi53?stkn=MXIzMnUwNGJucTlxbA==" target="_blank" rel="noreferrer"><FiInstagram/> Instagram</a><p className="footer-small">Mon–Sat · 10am–6pm</p></div></div><div className="container footer-bottom"><span>© 2026 ShopNest. All rights reserved.</span><span>Built for better everyday shopping.</span></div></footer>;
}
