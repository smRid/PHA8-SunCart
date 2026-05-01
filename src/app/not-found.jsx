import {
  ArrowLeft,
  Compass,
  Home,
  Search,
  ShoppingBag,
  Sparkles,
  Sun,
  Waves,
} from "lucide-react";
import Link from "next/link";

const quickLinks = [
  {
    href: "/products",
    icon: ShoppingBag,
    title: "Shop Summer Picks",
    text: "Find sunglasses, linen, SPF, and beach-ready essentials.",
  },
  {
    href: "/my-profile",
    icon: Compass,
    title: "My Profile",
    text: "Check your saved details and sunny account space.",
  },
  {
    href: "/",
    icon: Search,
    title: "Back to Home",
    text: "Return to the main SunCart collection page.",
  },
];

export default function NotFoundPage() {
  return (
    <main className="relative isolate overflow-hidden px-4 py-16 sm:py-24">
      <div className="pointer-events-none absolute -left-28 top-8 h-72 w-72 rounded-full bg-ocean-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-4 h-96 w-96 rounded-full bg-sun-200/60 blur-3xl" />
      <div className="pointer-events-none absolute right-8 top-24 hidden h-48 w-48 md:block">
        <div className="sun-rays absolute inset-0 animate-spin-slow rounded-full" />
        <div className="absolute inset-12 rounded-full bg-gradient-to-br from-sun-200 to-sun-500 shadow-2xl shadow-sun-500/20" />
      </div>

      <section className="container-x relative">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/80 bg-white/60 p-5 shadow-[0_30px_80px_-45px_rgba(74,26,8,0.45)] backdrop-blur md:p-8">
          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-72 overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-sun-300 via-sun-500 to-sun-700 p-8 text-white shadow-2xl shadow-sun-700/20">
              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full border-[34px] border-white/20" />
              <div className="absolute -bottom-16 left-8 h-36 w-36 rounded-full bg-ocean-300/40 blur-2xl" />
              <Waves className="absolute bottom-6 right-8 h-24 w-24 text-white/20" />

              <div className="relative z-10 flex h-full min-h-56 flex-col justify-between">
                <span className="chip w-fit bg-white/20 text-white ring-1 ring-white/30">
                  <Sparkles className="h-3.5 w-3.5" />
                  Route drifted away
                </span>

                <div>
                  <div className="font-display text-[7rem] font-bold leading-none tracking-tight sm:text-[9rem]">
                    404
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-white/80">
                    <Sun className="h-4 w-4" />
                    SunCart Lost & Found
                  </div>
                </div>
              </div>
            </div>

            <div className="py-2 text-center lg:text-left">
              <span className="chip border border-sun-200 bg-white text-sun-700">
                <Compass className="h-3.5 w-3.5" />
                Nothing here
              </span>

              <h1 className="mt-4 font-display text-4xl leading-tight text-sun-900 sm:text-5xl">
                This page took a little beach detour.
              </h1>

              <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-neutral/70 lg:mx-0">
                The link may be broken, moved, or catching golden hour
                somewhere else. Let&apos;s get you back to the summer essentials
                that are actually in stock.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                <Link href="/" className="btn-sun">
                  <Home className="h-4 w-4" />
                  Go Home
                </Link>
                <Link href="/products" className="btn-ghost-sun">
                  Browse Products
                  <ArrowLeft className="h-4 w-4 rotate-180" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 grid max-w-5xl gap-4 md:grid-cols-3">
          {quickLinks.map(({ href, icon: Icon, title, text }) => (
            <Link
              key={title}
              href={href}
              className="card-sun group block p-5 hover:-translate-y-1 hover:border-sun-200"
            >
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-sun-100 text-sun-700 transition group-hover:bg-sun-500 group-hover:text-white">
                <Icon className="h-5 w-5" />
              </span>
              <h2 className="mt-4 font-display text-xl text-sun-900">
                {title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-neutral/60">{text}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
