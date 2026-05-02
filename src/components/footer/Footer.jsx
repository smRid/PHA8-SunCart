"use client";

import Link from "next/link";
import { Mail, MapPin, Phone, Sun } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-24 text-sun-50">
      <svg
        viewBox="0 0 1440 120"
        className="block w-full h-12 sm:h-16 -mb-px"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,64L60,69.3C120,75,240,85,360,80C480,75,600,53,720,58.7C840,64,960,96,1080,96C1200,96,1320,64,1380,48L1440,32L1440,120L0,120Z"
          fill="#4A1A08"
        />
      </svg>

      <div className="bg-gradient-to-b from-sun-900 via-[#3a1306] to-[#240a02]">
        <div className="container-x py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <span className="w-11 h-11 rounded-full bg-gradient-to-br from-sun-300 to-sun-500 grid place-items-center shadow-lg">
                <Sun className="w-6 h-6 text-white" />
              </span>

              <div className="leading-tight">
                <div className="font-display text-3xl text-white">
                  Sun<span className="text-sun-300">Cart</span>
                </div>

                <div className="text-[10px] tracking-[0.3em] uppercase text-sun-300">
                  Summer Essentials
                </div>
              </div>
            </Link>

            <p className="mt-5 max-w-md text-sun-100/80">
              SunCart curates the finest summer essentials — from polarized
              shades to reef-safe SPF — handpicked to make every golden hour
              count.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-6 flex max-w-md p-1 rounded-full bg-white/10 backdrop-blur"
            >
              <input
                type="email"
                placeholder="Get sun-soaked deals weekly"
                className="flex-1 bg-transparent px-4 py-2 border-0 outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0 placeholder:text-sun-100/60 text-white"
              />

              <button type="submit" className="btn-sun !py-2 !px-5 !text-sm cursor-pointer">
                Subscribe
              </button>
            </form>
          </div>

          <div>
            <h4 className="font-display text-xl text-white mb-4">Explore</h4>

            <ul className="space-y-2 text-sun-100/80">
              <li>
                <Link href="/" className="hover:text-sun-300 transition">
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/products"
                  className="hover:text-sun-300 transition"
                >
                  All Products
                </Link>
              </li>

              <li>
                <Link
                  href="/my-profile"
                  className="hover:text-sun-300 transition"
                >
                  My Profile
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy"
                  className="hover:text-sun-300 transition"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xl text-white mb-4">Contact</h4>

            <ul className="space-y-3 text-sun-100/80 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-sun-300" />
                12 Beachview Lane, Cox&apos;s Bazar, BD
              </li>

              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sun-300" />
                +880 1700 000000
              </li>

              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sun-300" />
                info@suncart.shop
              </li>
            </ul>

            <div className="flex items-center gap-2 mt-5">
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 grid place-items-center rounded-full bg-white/10 hover:bg-sun-500 hover:text-white transition border border-white/10"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7.75 2A5.75 5.75 0 0 0 2 7.75v8.5A5.75 5.75 0 0 0 7.75 22h8.5A5.75 5.75 0 0 0 22 16.25v-8.5A5.75 5.75 0 0 0 16.25 2h-8.5ZM4 7.75A3.75 3.75 0 0 1 7.75 4h8.5A3.75 3.75 0 0 1 20 7.75v8.5A3.75 3.75 0 0 1 16.25 20h-8.5A3.75 3.75 0 0 1 4 16.25v-8.5Zm8 1.75a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0Zm9.25-5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"/>
                </svg>
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="w-9 h-9 grid place-items-center rounded-full bg-white/10 hover:bg-sun-500 hover:text-white transition border border-white/10"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M13.544 10.456 20.814 2h-1.723l-6.313 7.338L7.554 2H2l7.617 11.09L2 22h1.723l6.66-7.738L16.447 22H22l-8.456-11.544Zm-2.357 2.74-.772-1.104L4.64 3.3h2.643l4.955 7.086.772 1.104 6.443 9.214h-2.643l-5.623-8.508Z"/>
                </svg>
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 grid place-items-center rounded-full bg-white/10 hover:bg-sun-500 hover:text-white transition border border-white/10"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.093 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.563V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.129 22 16.992 22 12Z"/>
                </svg>
              </a>

              <a
                href="#"
                aria-label="YouTube"
                className="w-9 h-9 grid place-items-center rounded-full bg-white/10 hover:bg-sun-500 hover:text-white transition border border-white/10"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="container-x py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-sun-200/70">
            <p>© {new Date().getFullYear()} SunCart. All rights reserved.</p>

            <p className="flex items-center gap-3">
              <Link href="/privacy" className="hover:text-sun-300">
                Privacy
              </Link>

              <span className="opacity-30">•</span>

              <Link href="/terms" className="hover:text-sun-300">
                Terms
              </Link>

              <span className="opacity-30">•</span>

              <Link href="/cookies" className="hover:text-sun-300">
                Cookies
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
