import { BadgeCheck } from "lucide-react";

const brands = [
  {
    name: "SunShade",
    category: "Eyewear",
    initial: "S",
    color: "from-sun-300 to-sun-500",
    description: "Polarized & UV400 sunglasses crafted in Italy.",
  },
  {
    name: "Tropico",
    category: "Apparel",
    initial: "T",
    color: "from-ocean-300 to-ocean-500",
    description: "Linen, cotton, and breezy resort silhouettes.",
  },
  {
    name: "Solara",
    category: "Skincare",
    initial: "S",
    color: "from-yellow-200 to-sun-400",
    description: "Reef-safe SPF and tropical glow rituals.",
  },
  {
    name: "DuneCo",
    category: "Beach Gear",
    initial: "D",
    color: "from-amber-100 to-yellow-300",
    description: "Sand-free towels, raffia hats, and seaside basics.",
  },
];

export default function TopBrands() {
  return (
    <section className="container-x py-20">
      <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <span className="eyebrow">Top Brands</span>
          <h2 className="section-title mt-2">
            Houses we love,{" "}summer-tested
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {brands.map((brand) => (
          <article
            key={brand.name}
            className="group rounded-3xl border border-white bg-white/80 p-6 shadow-[0_18px_50px_-30px_rgba(20,20,40,0.45)] transition-all hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(242,107,31,0.45)]"
          >
            <div
              className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${brand.color} font-display text-3xl text-white shadow-sm transition-transform group-hover:scale-105`}
            >
              {brand.initial}
            </div>

            <div className="mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sun-600">
              <BadgeCheck className="h-3.5 w-3.5" />
              {brand.category}
            </div>

            <h3 className="mt-1 font-display text-2xl text-sun-900">
              {brand.name}
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-neutral/60">
              {brand.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
