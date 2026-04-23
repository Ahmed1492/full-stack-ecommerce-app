"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/shop", label: "Shop", icon: "🛍️" },
  { href: "/deals", label: "Deals", icon: "🔥" },
  { href: "/about", label: "About", icon: "ℹ️" },
  { href: "/contact", label: "Contact", icon: "📬" },
];

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close on route change
  useEffect(() => { setIsOpen(false); }, [pathname]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="p-1.5 rounded-lg hover:bg-gray-100 transition"
        aria-label="Toggle menu"
      >
        <Image src="/menu.png" width={22} height={22} alt="" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-2xl transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <Link href="/" className="text-lg font-bold flex items-center gap-2">
            <Image src="/logo.png" alt="" width={20} height={20} />
            <span className="text-[#D02E64]">Tren<span className="text-gray-900">ova</span></span>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition"
          >
            ✕
          </button>
        </div>

        {/* Links */}
        <nav className="px-4 py-4 flex flex-col gap-1">
          {LINKS.map(({ href, label, icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? "bg-pink-50 text-[#D02E64]"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className="text-base">{icon}</span>
                {label}
                {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#D02E64]" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-6 py-6 border-t border-gray-100">
          <Link
            href="/shop"
            className="block w-full text-center py-3 bg-[#D02E64] text-white rounded-xl text-sm font-semibold hover:bg-[#b02555] transition"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}
