"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/deals", label: "Deals" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1">
      {LINKS.map(({ href, label }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              isActive
                ? "text-[#D02E64]"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            {label}
            {isActive && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#D02E64] rounded-full" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
