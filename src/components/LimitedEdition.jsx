import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LimitedEdition() {
  return (
    <section className="container-x pb-20">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-sun-500 via-sun-400 to-sun-300 p-10 text-white shadow-xl sm:p-14">
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute -bottom-16 -left-10 h-72 w-72 rounded-full bg-ocean-300/40 blur-3xl" />

        <div className="relative max-w-2xl">
          <span className="chip border border-white/30 bg-white/20 text-white backdrop-blur">
            Limited Edition
          </span>

          <h3 className="mt-4 font-display text-3xl sm:text-5xl">
            The Golden Hour Bundle is here.
          </h3>

          <p className="mt-3 max-w-lg text-lg text-white/90">
            Shades, SPF, hat and a bottle - bundled at 30% off.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-sun-700 shadow transition hover:scale-[1.02]"
            >
              Shop the bundle <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/20 px-6 py-3 font-semibold backdrop-blur transition hover:bg-black/30"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
