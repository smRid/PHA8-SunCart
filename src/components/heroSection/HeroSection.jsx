"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Flame, Sparkles, Sun, Wind } from "lucide-react";

const SLIDES = [
  {
    eyebrow: "Summer Sale",
    title: "Up to 50% off",
    subtitle: "the entire Sun-Drenched Collection",
    cta: { href: "/products", label: "Shop the sale" },
    badge: { icon: Flame, text: "Hot Deals" },
    bg: "from-sun-300 via-sun-400 to-sun-600",
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1400&q=80",
  },
  {
    eyebrow: "New Arrivals",
    title: "Linen, Straw & Salt",
    subtitle: "the easiest summer wardrobe",
    cta: { href: "/products", label: "Explore collection" },
    badge: { icon: Sparkles, text: "Just Dropped" },
    bg: "from-ocean-300 via-ocean-400 to-ocean-600",
    image:
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1400&q=80",
  },
  {
    eyebrow: "Reef-safe SPF",
    title: "Glow without the burn",
    subtitle: "skincare made for sun, sea & city days",
    cta: { href: "/products", label: "Discover skincare" },
    badge: { icon: Wind, text: "Skin Loved" },
    bg: "from-sun-200 via-sun-300 to-ocean-300",
    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1400&q=80",
  },
];

export default function HeroSection() {
  const [active, setActive] = useState(0);
  const slide = SLIDES[active];
  const Badge = slide.badge.icon;

  useEffect(() => {
    const id = setInterval(() => {
      setActive((previous) => (previous + 1) % SLIDES.length);
    }, 5500);

    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] opacity-90">
        <div className="sun-rays absolute inset-0 animate-spin-slow rounded-full" />
        <div className="absolute inset-12 rounded-full bg-gradient-to-br from-sun-200 via-sun-300 to-sun-500 shadow-2xl" />
      </div>

      <div className="container-x grid items-center gap-10 pb-20 pt-10 sm:pt-16 lg:grid-cols-2">
        <div className="relative z-10">
          <span className="chip border border-sun-200 bg-white text-sun-700">
            <Sun className="h-3.5 w-3.5" /> {slide.eyebrow}
          </span>

          <h1 className="mt-4 font-display text-5xl leading-[0.95] text-sun-900 sm:text-6xl lg:text-7xl">
            <span>{slide.title}</span>
            <br />
            <span className="text-sun-700/80">{slide.subtitle}</span>
          </h1>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href={slide.cta.href} className="btn-sun group">
              {slide.cta.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>

            <Link href="/products" className="btn-ghost-sun">
              Browse all products
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-2">
            {SLIDES.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Slide ${index + 1}`}
                onClick={() => setActive(index)}
                className={`h-2 rounded-full transition-all ${
                  index === active ? "w-10 bg-sun-500" : "w-4 bg-sun-200"
                }`}
              />
            ))}

            <span className="ml-3 text-xs uppercase tracking-widest text-sun-700/70">
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(SLIDES.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="relative h-[440px] sm:h-[520px]">
          <div
            className={`absolute inset-0 overflow-hidden rounded-[2.5rem] bg-gradient-to-br ${slide.bg} shadow-2xl`}
            style={{ animation: "float 8s ease-in-out infinite" }}
          >
            <Image
              key={slide.image}
              src={slide.image}
              alt={`${slide.title} featured image`}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-full w-full object-cover opacity-90 mix-blend-multiply"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div className="text-white">
                <div className="text-xs uppercase tracking-[0.3em] opacity-80">
                  Featured
                </div>
                <div className="font-display text-2xl">{slide.title}</div>
              </div>

              <span className="chip bg-white/95 text-sun-700">
                <Badge className="h-3.5 w-3.5" /> {slide.badge.text}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-y border-sun-200/70 bg-white/60 backdrop-blur">
        <div className="overflow-hidden">
          <div className="marquee-track flex gap-12 whitespace-nowrap py-4 font-display text-2xl text-sun-700">
            {Array.from({ length: 2 }).map((_, groupIndex) => (
              <div key={groupIndex} className="flex shrink-0 gap-12 pr-12">
                {[
                  "Summer Sale 50% off",
                  "Free shipping over $40",
                  "New: Linen drop",
                  "Reef-safe SPF",
                  "Skincare bundles",
                  "Polarized UV400",
                ].map((text) => (
                  <span key={text} className="opacity-80">
                    {text}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
