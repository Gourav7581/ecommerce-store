import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Cart from "../pages/Cart";
import Singleproduct from "../component/Singleproduct";

export default function Mainroute() {
  return <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/shop" element={<Shop />} />
    <Route path="/men" element={<Shop audience="men" title="Men's collection" />} />
    <Route path="/women" element={<Shop audience="women" title="Women's collection" />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/product/:id" element={<Singleproduct />} />
    <Route path="*" element={<Shop title="Find your next favorite" />} />
  </Routes>;
}
