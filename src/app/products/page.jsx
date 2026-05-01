"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import products from "@/data/products.json";
import { ChevronDown, Search, SlidersHorizontal } from "lucide-react";

const CATEGORIES = [
  "All",
  ...new Set(products.map((product) => product.category)),
];

export default function ProductsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    let list = products.filter((product) => {
      const matchesQuery =
        !normalizedQuery ||
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.brand.toLowerCase().includes(normalizedQuery);

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesQuery && matchesCategory;
    });

    if (sort === "price-asc") {
      list = [...list].sort((a, b) => a.price - b.price);
    }

    if (sort === "price-desc") {
      list = [...list].sort((a, b) => b.price - a.price);
    }

    if (sort === "rating") {
      list = [...list].sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [query, category, sort]);

  return (
    <div className="container-x py-12">
      <section className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-sun-200 via-sun-100 to-ocean-100 p-8 sm:p-12">
        <span className="eyebrow">Catalogue</span>

        <h1 className="section-title mt-2">
          Everything you&apos;ll need this summer
        </h1>

        <p className="mt-3 max-w-xl text-neutral/70">
          {products.length} hand-picked summer essentials.
        </p>
      </section>

      <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <label className="flex max-w-md flex-1 items-center gap-2 rounded-full border border-sun-200/80 bg-white px-4 py-2.5 shadow-sm transition focus-within:border-sun-400 focus-within:ring-4 focus-within:ring-sun-200/45">
          <Search className="h-4 w-4 shrink-0 text-sun-500" />
          <span className="sr-only">Search products or brands</span>

          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products or brands..."
            className="min-w-0 flex-1 border-0 bg-transparent p-0 text-sm text-sun-900 outline-none placeholder:text-neutral/45 focus:ring-0"
          />
        </label>

        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                category === item
                  ? "bg-sun-500 text-white shadow"
                  : "border border-sun-100 bg-white text-sun-700 hover:bg-sun-100/45"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <label className="relative flex self-start items-center gap-2 rounded-full border border-sun-200/80 bg-white px-3 py-2.5 pr-9 shadow-sm transition focus-within:border-sun-400 focus-within:ring-4 focus-within:ring-sun-200/45 lg:self-auto">
          <SlidersHorizontal className="h-4 w-4 shrink-0 text-sun-500" />
          <span className="sr-only">Sort products</span>

          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="appearance-none border-0 bg-transparent p-0 text-sm font-semibold text-sun-800 outline-none focus:ring-0"
          >
            <option value="featured">Featured</option>
            <option value="rating">Top Rated</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>

          <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-sun-500" />
        </label>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-16 text-center">
          <div className="font-display text-3xl text-sun-800">
            No matches yet
          </div>

          <p className="mt-2 text-neutral/60">
            Try a different search or category.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
