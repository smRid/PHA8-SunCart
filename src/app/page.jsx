import Link from "next/link";
import HeroSection from "@/components/heroSection/HeroSection";
import LimitedEdition from "@/components/LimitedEdition";
import ProductCard from "@/components/ProductCard";
import SummerTips from "@/components/SummerTips";
import TopBrands from "@/components/TopBrands";
import products from "@/data/products.json";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  const popular = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <>
      <HeroSection />

      <section className="container-x py-20">
        <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="eyebrow">Popular this season</span>
            <h2 className="section-title mt-2">
              Most-loved by our crew
            </h2>
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
          {popular.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={index === 0}
            />
          ))}
        </div>
      </section>

      <SummerTips />
      <TopBrands />
      <LimitedEdition />
    </>
  );
}
