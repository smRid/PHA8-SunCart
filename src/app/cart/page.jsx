"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import { useShop } from "@/context/ShopContext";

export default function CartPage() {
  const {
    cart,
    cartCount,
    cartSubtotal,
    updateQty,
    removeFromCart,
    clearCart,
    toggleWishlist,
    isWishlisted,
  } = useShop();

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="container-x py-12">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1 text-sm font-semibold text-sun-600 hover:text-sun-800 transition mb-2"
          >
            <ArrowLeft className="w-4 h-4" /> Continue shopping
          </Link>

          <h1 className="font-display text-4xl text-sun-900">
            Shopping Cart
          </h1>

          <p className="text-neutral/60 mt-1">
            {cartCount} {cartCount === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            clearCart();
            toast.success("Cart cleared");
          }}
          className="btn-ghost-sun !py-2 !px-4 !text-sm cursor-pointer self-start"
        >
          <Trash2 className="w-4 h-4" /> Clear cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <article
              key={item.id}
              className="rounded-3xl bg-white/80 border border-sun-100 p-4 sm:p-5 flex gap-4 shadow-sm hover:shadow-md transition"
            >
              <Link
                href={`/products/${item.id}`}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-sun-50 shrink-0"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </Link>

              <div className="flex-1 min-w-0">
                <div className="text-xs uppercase tracking-wider font-bold text-sun-600">
                  {item.brand}
                </div>

                <Link
                  href={`/products/${item.id}`}
                  className="block font-display text-xl text-sun-900 leading-tight truncate hover:text-sun-700"
                >
                  {item.name}
                </Link>

                <div className="mt-1 flex items-baseline gap-2">
                  <span className="font-bold text-sun-700">
                    ${item.price}
                  </span>
                  {item.originalPrice && item.originalPrice > item.price ? (
                    <span className="text-xs line-through text-neutral/40">
                      ${item.originalPrice}
                    </span>
                  ) : null}
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center rounded-full border border-sun-200 bg-white">
                    <button
                      type="button"
                      onClick={() => updateQty(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="w-9 h-9 grid place-items-center rounded-full text-sun-700 hover:bg-sun-50 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                      aria-label="Decrease"
                    >
                      <Minus className="w-4 h-4" />
                    </button>

                    <span className="w-9 text-center font-bold text-sun-900">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() => updateQty(item.id, item.quantity + 1)}
                      className="w-9 h-9 grid place-items-center rounded-full text-sun-700 hover:bg-sun-50 cursor-pointer"
                      aria-label="Increase"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <span className="text-sm font-bold text-sun-800">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      toggleWishlist(item);
                      toast.success(
                        isWishlisted(item.id)
                          ? "Removed from wishlist"
                          : "Moved to wishlist",
                      );
                    }}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-sun-700 hover:text-sun-900 cursor-pointer"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isWishlisted(item.id)
                          ? "fill-sun-500 stroke-sun-600"
                          : ""
                      }`}
                    />
                    {isWishlisted(item.id) ? "Saved" : "Save for later"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      removeFromCart(item.id);
                      toast.success("Removed from cart");
                    }}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-neutral/60 hover:text-red-600 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" /> Remove
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="lg:sticky lg:top-24 self-start">
          <div className="card-sun p-6">
            <div className="font-display text-2xl text-sun-900">
              Order summary
            </div>

            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-neutral/70">
                  Subtotal ({cartCount} {cartCount === 1 ? "item" : "items"})
                </dt>
                <dd className="font-bold text-sun-800">
                  ${cartSubtotal.toFixed(2)}
                </dd>
              </div>

              <div className="flex items-center justify-between">
                <dt className="text-neutral/70">Shipping</dt>
                <dd className="font-semibold text-green-600">Free</dd>
              </div>

              <div className="border-t border-sun-100 pt-3 flex items-center justify-between">
                <dt className="font-display text-lg text-sun-900">Total</dt>
                <dd className="font-display text-2xl text-sun-700">
                  ${cartSubtotal.toFixed(2)}
                </dd>
              </div>
            </dl>

            <button
              type="button"
              onClick={() => {
                toast.success("Heading to secure checkout ☀️");
                clearCart();
              }}
              className="btn-sun w-full justify-center mt-6 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" /> Checkout
            </button>

            <div className="mt-4 flex items-center gap-2 text-xs text-neutral/60">
              <ShieldCheck className="w-4 h-4 text-sun-600 shrink-0" />
              Secure 256-bit SSL · 30-day returns · 2-year warranty
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="container-x py-20">
      <div className="max-w-xl mx-auto text-center">
        <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-sun-200 to-sun-400 grid place-items-center shadow-lg">
          <ShoppingCart className="w-10 h-10 text-white" />
        </div>

        <h1 className="mt-6 font-display text-4xl text-sun-900">
          Your cart is empty
        </h1>

        <p className="mt-2 text-neutral/60">
          Add your favorite summer essentials and they will appear here.
        </p>

        <Link href="/products" className="btn-sun mt-6 inline-flex">
          <ShoppingBag className="w-4 h-4" /> Shop products
        </Link>
      </div>
    </div>
  );
}
