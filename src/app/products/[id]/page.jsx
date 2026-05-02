import Link from "next/link";
import { notFound } from "next/navigation";
import ProductDetailsClient from "@/components/ProductDetailsClient";
import products from "@/data/products.json";
import {
  ArrowLeft,
  BadgeCheck,
  Leaf,
  Sparkles,
} from "lucide-react";

export function generateStaticParams() {
  return products.map((product) => ({ id: String(product.id) }));
}

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;
  const product = products.find((item) => String(item.id) === String(id));

  if (!product) {
    notFound();
  }

  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100,
        )
      : 0;

  const highlights = [
    {
      icon: Sparkles,
      title: product.highlight || "Premium quality",
      desc: "Hand-picked for the SunCart summer collection.",
    },
    {
      icon: Leaf,
      title: "Eco-conscious",
      desc: "Sustainably sourced and responsibly packaged.",
    },
    {
      icon: BadgeCheck,
      title: "Authentic guarantee",
      desc: `100% genuine ${product.brand} product.`,
    },
  ];

  return (
    <div className="container-x py-10">
      <nav className="flex items-center gap-2 text-sm text-neutral/60">
        <Link href="/" className="cursor-pointer hover:text-sun-700">
          Home
        </Link>
        <span>/</span>
        <Link href="/products" className="cursor-pointer hover:text-sun-700">
          Products
        </Link>
        <span>/</span>
        <Link
          href={`/products?category=${encodeURIComponent(product.category)}`}
          className="cursor-pointer hover:text-sun-700"
        >
          {product.category}
        </Link>
        <span>/</span>
        <span className="max-w-[40ch] truncate font-semibold text-sun-800">
          {product.name}
        </span>
      </nav>

      <Link
        href="/products"
        className="mt-4 inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-sun-700 hover:text-sun-900"
      >
        <ArrowLeft className="h-4 w-4" /> Back to all products
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-14">
        <ProductDetailsClient product={product} discount={discount} />
      </div>

      <section className="mt-16">
        <h2 className="font-display text-3xl text-sun-900">
          Why you&apos;ll love it
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card-sun flex items-start gap-4 p-6">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-sun-100">
                <Icon className="h-6 w-6 text-sun-600" />
              </div>

              <div>
                <div className="font-bold text-sun-900">{title}</div>
                <p className="mt-1 text-sm leading-relaxed text-neutral/70">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
