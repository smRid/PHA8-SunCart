"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { ArrowRight, Sun } from "lucide-react";

export default function PopularProducts({ products }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!loaded) {
    return (
      <section className="container-x flex min-h-[40vh] items-center justify-center py-20">
        <div className="flex flex-col items-center gap-4">
          <Sun className="w-10 h-10 text-sun-500 animate-spin" />
          <p className="text-sm font-semibold text-sun-600">Loading popular products…</p>
        </div>
      </section>
    );
  }

  return (
    <section className="container-x py-20">
      <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <span className="eyebrow">Popular this season</span>
          <h2 className="section-title mt-2">Most-loved by our crew</h2>
        </div>

        <Link
          href="/products"
          className="btn-ghost-sun group self-start sm:self-end"
        >
          View all products{" "}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            priority={index === 0}
          />
        ))}
      </div>
    </section>
  );
}
