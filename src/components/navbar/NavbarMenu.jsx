"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavbarMenu = ({ href, className = "", children }) => {
  const pathName = usePathname();
  const isActive = pathName === href;

  return (
    <Link
      href={href}
      className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
        isActive
          ? "border border-[#f5c87b] bg-white/70 text-[#c0471f] shadow-sm"
          : "text-[#2b1b16] hover:bg-white/60 hover:text-[#e7662d]"
      } ${className}`}
    >
      {children}
    </Link>
  );
};

export default NavbarMenu;
