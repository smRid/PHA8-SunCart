import { Globe, Mail, Phone, Send, Sun } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="w-full bg-slate-900 border-t border-slate-800 font-display text-sm leading-relaxed mt-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto px-8 py-16">
          <div className="col-span-1">
            <div className="text-xl font-bold  mb-4 flex items-center gap-2 md:text-2xl text-amber-500">
              <Sun className="text-amber-500 fill-amber-500" size={20} />
              SunCart
            </div>
            <p className="text-slate-400">
              Curating the finest summer essentials for your next adventure.
            </p>
            <div className="flex gap-4 mt-6">
              <Globe
                className="text-slate-400 hover:text-amber-400 cursor-pointer"
                size={20}
              />
              <Mail
                className="text-slate-400 hover:text-amber-400 cursor-pointer"
                size={20}
              />
              <Phone
                className="text-slate-400 hover:text-amber-400 cursor-pointer"
                size={20}
              />
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">About Us</h4>
            <ul className="space-y-4">
              <li>
                <Link
                  className="text-slate-400 hover:text-amber-400 transition-colors"
                  href="#"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  className="text-slate-400 hover:text-amber-400 transition-colors"
                  href="#"
                >
                  Sustainability
                </Link>
              </li>
              <li>
                <Link
                  className="text-slate-400 hover:text-amber-400 transition-colors"
                  href="#"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <Link
                  className="text-slate-400 hover:text-amber-400 transition-colors"
                  href="#"
                >
                  Shop All
                </Link>
              </li>
              <li>
                <Link
                  className="text-slate-400 hover:text-amber-400 transition-colors"
                  href="#"
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  className="text-slate-400 hover:text-amber-400 transition-colors"
                  href="#"
                >
                  Order Tracking
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">Newsletter</h4>
            <p className="text-slate-400 mb-4">
              Catch the waves. Get 10% off your first summer order.
            </p>
            <form className="flex gap-2">
              <input
                className="bg-slate-800 border-none rounded px-4 py-2 w-full text-white text-sm focus:ring-1 focus:ring-amber-500"
                placeholder="Email address"
                type="email"
              />
              <button type="submit" className="bg-amber-500 text-slate-900 p-2 rounded flex items-center justify-center">
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-8 py-8 border-t border-slate-800/50 text-center text-slate-500">
          © 2026 SunCart Summer Essentials. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
