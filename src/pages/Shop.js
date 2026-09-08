import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../component/Header";
import Footer from "../component/Footer";
import ProductCard from "../component/ProductCard";
import { useStore } from "../context/StoreContext";

const groups = {
  men: ["mens-shirts", "mens-shoes", "mens-watches", "sunglasses"],
  women: ["womens-dresses", "womens-shoes", "womens-bags", "womens-jewellery", "womens-watches", "tops", "beauty", "fragrances"],
};

export default function Shop({ audience = "all", title = "Shop all products" }) {
  const { products, loading, error } = useStore();
  const [params] = useSearchParams();
  const query = params.get("q")?.trim().toLowerCase() || "";
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("featured");

  const audienceProducts = useMemo(() => audience === "all"
    ? products
    : products.filter((product) => groups[audience]?.includes(product.category)), [products, audience]);

  const categories = [...new Set(audienceProducts.map((product) => product.category))].sort();
  const visibleProducts = useMemo(() => {
    const result = audienceProducts.filter((product) =>
      (category === "all" || product.category === category) &&
      (!query || `${product.title} ${product.description} ${product.category}`.toLowerCase().includes(query))
    );
    return [...result].sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return b.discountPercentage - a.discountPercentage;
    });
  }, [audienceProducts, category, query, sort]);

  return <>
    <Header />
    <main>
      <section className="page-hero compact">
        <div className="container">
          <p className="eyebrow">Curated essentials</p>
          <h1>{query ? `Results for “${params.get("q")}”` : title}</h1>
          <p>Quality picks, honest prices, and a simple shopping experience.</p>
        </div>
      </section>
      <section className="catalog-section container">
        <div className="catalog-toolbar">
          <label>Category
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              <option value="all">All categories</option>
              {categories.map((item) => <option key={item} value={item}>{item.replaceAll("-", " ")}</option>)}
            </select>
          </label>
          <span className="result-count">{visibleProducts.length} products</span>
          <label>Sort by
            <select value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="featured">Featured</option><option value="rating">Top rated</option>
              <option value="low">Price: low to high</option><option value="high">Price: high to low</option>
            </select>
          </label>
        </div>
        {loading && <div className="state-message">Loading products…</div>}
        {error && <div className="state-message error">{error}</div>}
        {!loading && !error && visibleProducts.length === 0 && <div className="state-message">No matching products found.</div>}
        <div className="product-grid">{visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      </section>
    </main>
    <Footer />
  </>;
}
