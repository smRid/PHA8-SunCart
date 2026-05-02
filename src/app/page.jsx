import HeroSection from "@/components/heroSection/HeroSection";
import LimitedEdition from "@/components/LimitedEdition";
import PopularProducts from "@/components/PopularProducts";
import SummerTips from "@/components/SummerTips";
import TopBrands from "@/components/TopBrands";
import products from "@/data/products.json";

export default function HomePage() {
  const popular = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <>
      <HeroSection />
      <PopularProducts products={popular} />
      <SummerTips />
      <TopBrands />
      <LimitedEdition />
    </>
  );
}
