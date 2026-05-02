"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  Heart,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Trash2,
} from "lucide-react";
import { useShop } from "@/context/ShopContext";

export default function WishlistPage() {
  const { wishlist, addToCart, removeFromWishlist } = useShop();

  const moveToCart = (item) => {
    addToCart(item, 1);
    removeFromWishlist(item.id);
    toast.success(`${item.name} moved to cart`);
  };

  if (wishlist.length === 0) {
    return <EmptyWishlist />;
  }

  return (
    <div className="container-x py-12">
      <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-sun-300 via-sun-400 to-sun-600 p-8 sm:p-10 text-white">
        <div className="absolute -top-10 -right-10 w-72 h-72 rounded-full bg-white/30 blur-3xl" />
        <div className="absolute -bottom-16 -left-10 w-80 h-80 rounded-full bg-ocean-300/30 blur-3xl" />

        <div className="relative flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <div className="w-16 h-16 rounded-3xl bg-white/20 border border-white/30 backdrop-blur grid place-items-center">
            <Heart className="w-8 h-8 text-white fill-white/40" />
          </div>

          <div className="flex-1">
            <span className="chip bg-white/20 border border-white/30 backdrop-blur">
              <Sparkles className="w-3.5 h-3.5" /> Your saved sunshine
            </span>

            <h1 className="mt-2 font-display text-4xl sm:text-5xl">
              My Wishlist
            </h1>

            <p className="text-white/90 mt-1">
              {wishlist.length}{" "}
              {wishlist.length === 1 ? "item saved" : "items saved"} for later.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-full bg-white text-sun-700 font-bold px-5 py-3 shadow hover:scale-[1.02] transition self-start sm:self-auto"
          >
            <ArrowLeft className="w-4 h-4" /> Keep shopping
          </Link>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((item) => (
          <article
            key={item.id}
            className="card-sun overflow-hidden flex flex-col group"
          >
            <Link
              href={`/products/${item.id}`}
              className="relative aspect-[4/5] overflow-hidden bg-sun-50 block"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  removeFromWishlist(item.id);
                  toast.success("Removed from wishlist");
                }}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-sun-700 hover:text-red-600 grid place-items-center shadow transition cursor-pointer"
                aria-label="Remove from wishlist"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </Link>

            <div className="p-5 flex flex-col gap-2 flex-1">
              <div className="text-xs uppercase tracking-wider font-bold text-sun-600">
                {item.brand}
              </div>

              <Link
                href={`/products/${item.id}`}
                className="font-display text-xl leading-tight text-sun-900 hover:text-sun-700"
              >
                {item.name}
              </Link>

              <div className="mt-auto pt-4 flex items-end justify-between">
                <div className="leading-none">
                  <div className="text-2xl font-display text-sun-700">
                    ${item.price}
                  </div>

                  {item.originalPrice && item.originalPrice > item.price ? (
                    <div className="text-sm line-through text-neutral/40">
                      ${item.originalPrice}
                    </div>
                  ) : null}
                </div>

                <button
                  type="button"
                  onClick={() => moveToCart(item)}
                  className="btn-sun !py-2 !px-4 !text-sm cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" /> Add to cart
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function EmptyWishlist() {
  return (
    <div className="container-x py-20">
      <div className="max-w-xl mx-auto text-center">
        <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-sun-200 to-sun-400 grid place-items-center shadow-lg">
          <Heart className="w-10 h-10 text-white fill-white/40" />
        </div>

        <h1 className="mt-6 font-display text-4xl text-sun-900">
          No favourites yet
        </h1>

        <p className="mt-2 text-neutral/60">
          Tap the heart on any product to save it here for later.
        </p>

        <Link href="/products" className="btn-sun mt-6 inline-flex">
          <ShoppingCart className="w-4 h-4" /> Discover products
        </Link>
      </div>
    </div>
  );
}
