"use client";

import { LogOut, Menu, ShoppingBag, Sun, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { signOut, useSession } from "@/lib/auth-client";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/my-profile", label: "My Profile" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    toast.success("See you soon");
    setOpen(false);
    router.push("/");
    router.refresh();
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled
          ? "border-b border-sun-100 bg-base-100/80 shadow-sm backdrop-blur-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between sm:h-20">
        <Link href="/" className="group flex items-center gap-2">
          <span className="relative inline-flex h-10 w-10 items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-sun-300 opacity-70 blur-md transition-opacity group-hover:opacity-100" />
            <span className="relative grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-sun-300 via-sun-400 to-sun-600 shadow-inner">
              <Sun className="h-5 w-5 text-white" />
            </span>
          </span>

          <span className="leading-none">
            <span className="block font-display text-2xl tracking-tight text-sun-800">
              Sun<span className="text-sun-500">Cart</span>
            </span>
            <span className="block text-[10px] uppercase tracking-[0.3em] text-sun-600">
              Summer Essentials
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                    active
                      ? "border border-sun-100 bg-white text-sun-800 shadow-sm"
                      : "text-neutral hover:bg-white/60 hover:text-sun-700"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          {isPending ? (
            <div className="h-10 w-24 animate-pulse rounded-full bg-white/60" />
          ) : session?.user ? (
            <>
              <Link
                href="/my-profile"
                className="flex items-center gap-2 rounded-full border border-sun-100 bg-white py-1 pl-1 pr-3 transition hover:border-sun-300"
                title={session.user.name}
              >
                <span className="grid h-8 w-8 place-items-center overflow-hidden rounded-full bg-sun-200 ring-2 ring-sun-300">
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || "user"}
                      width={32}
                      height={32}
                      unoptimized
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="font-bold text-sun-800">
                      {(session.user.name || "U").charAt(0).toUpperCase()}
                    </span>
                  )}
                </span>
                <span className="max-w-[120px] truncate text-sm font-semibold text-sun-800">
                  {session.user.name?.split(" ")[0] || "Sunny"}
                </span>
              </Link>

              <button
                type="button"
                onClick={handleSignOut}
                className="btn-ghost-sun !px-4 !py-2 !text-sm"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="btn-ghost-sun !px-5 !py-2 !text-sm">
                Login
              </Link>
              <Link href="/register" className="btn-sun !px-5 !py-2 !text-sm">
                <ShoppingBag className="h-4 w-4" /> Register
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="rounded-full border border-sun-100 bg-white/70 p-2 md:hidden"
          aria-label="Open menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <div
        className={`overflow-hidden transition-[max-height] duration-300 md:hidden ${
          open ? "max-h-[480px]" : "max-h-0"
        }`}
      >
        <div className="container-x space-y-2 pb-4">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-2xl border border-sun-100 bg-white/80 px-4 py-3 font-semibold text-sun-800"
            >
              {item.label}
            </Link>
          ))}

          {session?.user ? (
            <button
              type="button"
              onClick={handleSignOut}
              className="btn-ghost-sun w-full justify-center"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="btn-ghost-sun justify-center"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className="btn-sun justify-center"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
