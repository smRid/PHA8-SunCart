"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useShop } from "@/context/ShopContext";
import {
  BadgeCheck,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Star,
} from "lucide-react";

export default function ProductDetailsClient({ product, discount }) {
  const gallery = useMemo(
    () => [product.image, product.image, product.image, product.image],
    [product.image],
  );

  const { addToCart, isWishlisted, toggleWishlist } = useShop();
  const saved = isWishlisted(product.id);

  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);

  const inStock = product.stock > 0;
  const lowStock = product.stock > 0 && product.stock <= 5;
  const total = (product.price * qty).toFixed(2);
  const reviewCount = Math.round((product.rating || 4.5) * 30);

  const dec = () => setQty((value) => Math.max(1, value - 1));
  const inc = () =>
    setQty((value) => Math.min(product.stock || 99, value + 1));

  const onAddToCart = () => {
    addToCart(product, qty);
    toast.success(`${qty} x ${product.name} added to cart`);
  };

  const onSave = () => {
    toggleWishlist(product);
    toast.success(saved ? "Removed from wishlist" : "Saved to wishlist");
  };

  return (
    <>
      <div className="relative">
        <div className="group relative aspect-square overflow-hidden rounded-[2rem] bg-gradient-to-br from-sun-100 to-ocean-100 shadow-xl">
          <div className="sun-rays absolute inset-0 animate-spin-slow opacity-30" />

          <Image
            src={gallery[activeImg]}
            alt={product.name}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="absolute inset-0 h-full w-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
          />

          {discount > 0 ? (
            <span className="chip absolute left-4 top-4 bg-sun-600 text-white shadow-lg">
              -{discount}% off
            </span>
          ) : null}

          {product.highlight ? (
            <span className="chip absolute right-4 top-4 border border-sun-100 bg-white/90 text-sun-700 shadow-sm">
              {product.highlight}
            </span>
          ) : null}
        </div>

        <div className="mt-3 grid grid-cols-4 gap-2">
          {gallery.map((src, index) => (
            <button
              type="button"
              key={`${src}-${index}`}
              onClick={() => setActiveImg(index)}
              className={`relative aspect-square cursor-pointer overflow-hidden rounded-2xl border bg-white transition ${
                activeImg === index
                  ? "border-sun-500 ring-2 ring-sun-300"
                  : "border-sun-100 hover:border-sun-300"
              }`}
              aria-label={`Show image ${index + 1}`}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="25vw"
                className="h-full w-full object-cover opacity-90 transition hover:opacity-100"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="self-start lg:sticky lg:top-24">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="chip bg-sun-100 text-sun-700">
            {product.category}
          </span>

          <span className="chip bg-ocean-100 text-ocean-600">
            <BadgeCheck className="h-3.5 w-3.5" /> Authentic
          </span>

          {product.tags?.map((tag) => (
            <span
              key={tag}
              className="chip border border-sun-100 bg-white text-sun-700"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="text-sm font-bold uppercase tracking-wider text-sun-600">
          {product.brand}
        </div>

        <h1 className="mt-1 font-display text-4xl leading-tight text-sun-900 sm:text-5xl">
          {product.name}
        </h1>

        <div className="mt-3 flex items-center gap-3">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className={`h-4 w-4 ${
                  index < Math.round(product.rating)
                    ? "fill-sun-400 stroke-sun-500"
                    : "stroke-sun-300"
                }`}
              />
            ))}
          </div>

          <span className="text-sm text-neutral/70">
            {product.rating} ({reviewCount} reviews)
          </span>
        </div>

        <div className="mt-6 flex flex-wrap items-end gap-3">
          <div className="font-display text-5xl leading-none text-sun-700">
            ${product.price}
          </div>

          {product.originalPrice && product.originalPrice > product.price ? (
            <>
              <div className="mb-1 text-xl text-neutral/40 line-through">
                ${product.originalPrice}
              </div>
              <span className="chip mb-1 border border-sun-200 bg-sun-50 text-sun-700">
                You save ${(product.originalPrice - product.price).toFixed(2)}
              </span>
            </>
          ) : null}
        </div>

        <p className="mt-5 text-lg leading-relaxed text-neutral/80">
          {product.description}
        </p>

        <div className="mt-5 flex items-center gap-2 text-sm">
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              !inStock
                ? "bg-red-500"
                : lowStock
                  ? "bg-amber-500"
                  : "bg-green-500"
            }`}
          />

          <span className="font-semibold text-sun-800">
            {!inStock
              ? "Sold out"
              : lowStock
                ? `Only ${product.stock} left. Order soon!`
                : "In stock. Ready to ship"}
          </span>
        </div>

        <div className="mt-6 flex items-center gap-4">
          <span className="text-sm font-semibold text-sun-800">Quantity</span>

          <div className="inline-flex items-center rounded-full border border-sun-200 bg-white">
            <button
              type="button"
              onClick={dec}
              disabled={qty <= 1}
              className="grid h-10 w-10 cursor-pointer place-items-center rounded-full text-sun-700 hover:bg-sun-50 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>

            <span className="w-10 text-center font-bold text-sun-900">
              {qty}
            </span>

            <button
              type="button"
              onClick={inc}
              disabled={qty >= (product.stock || 99)}
              className="grid h-10 w-10 cursor-pointer place-items-center rounded-full text-sun-700 hover:bg-sun-50 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <span className="ml-auto text-sm text-neutral/60">
            Total{" "}
            <span className="text-base font-bold text-sun-800">${total}</span>
          </span>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onAddToCart}
            disabled={!inStock}
            className="btn-sun cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ShoppingBag className="h-4 w-4" /> Add to cart
          </button>

          <button
            type="button"
            onClick={onSave}
            className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border px-5 py-3 font-semibold transition ${
              saved
                ? "border-sun-300 bg-sun-100 text-sun-800"
                : "border-sun-100 bg-white text-sun-700 hover:bg-sun-50"
            }`}
          >
            <Heart
              className={`h-4 w-4 ${
                saved ? "fill-sun-500 stroke-sun-600" : ""
              }`}
            />
            {saved ? "Saved" : "Save"}
          </button>
        </div>
      </div>
    </>
  );
}
