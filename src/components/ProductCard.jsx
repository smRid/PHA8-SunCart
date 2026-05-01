import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

export default function ProductCard({ product, priority = false }) {
  const hasDiscount =
    product.originalPrice && product.originalPrice > product.price;

  return (
    <article className="card-sun group flex flex-col overflow-hidden">
      <div className="relative aspect-[4/5] overflow-hidden bg-sun-100/40">
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {hasDiscount ? (
          <span className="chip absolute left-3 top-3 bg-sun-500 text-white shadow">
            -
            {Math.round(
              ((product.originalPrice - product.price) /
                product.originalPrice) *
                100,
            )}
            %
          </span>
        ) : null}

        {product.highlight ? (
          <span className="chip absolute right-3 top-3 border border-sun-100 bg-white/90 text-sun-700">
            {product.highlight}
          </span>
        ) : null}

        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/90 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold uppercase tracking-wider text-sun-600">
            {product.brand}
          </span>

          <span className="inline-flex items-center gap-1 font-semibold text-sun-800">
            <Star className="h-3.5 w-3.5 fill-sun-400 stroke-sun-500" />
            {product.rating}
          </span>
        </div>

        <h3 className="font-display text-xl leading-tight text-sun-900">
          {product.name}
        </h3>

        <p className="line-clamp-2 text-sm text-neutral/70">
          {product.description}
        </p>

        <div className="mt-auto flex items-end justify-between pt-4">
          <div className="leading-none">
            <div className="font-display text-2xl text-sun-700">
              ${product.price}
            </div>

            {hasDiscount ? (
              <div className="text-sm text-neutral/40 line-through">
                ${product.originalPrice}
              </div>
            ) : null}
          </div>

          <Link
            href={`/products/${product.id}`}
            className="btn-sun !px-4 !py-2 !text-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
