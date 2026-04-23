"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useRef } from "react";

export default function ShopSearch({ defaultValue }) {
  const router     = useRouter();
  const pathname   = usePathname();
  const params     = useSearchParams();
  const timer      = useRef(null);

  const handleChange = (e) => {
    const val = e.target.value.trim();
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const p = new URLSearchParams(params);
      if (val) p.set("name", val); else p.delete("name");
      p.delete("page");
      router.replace(`${pathname}?${p.toString()}`, { scroll: false });
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearTimeout(timer.current);
    const val = e.currentTarget.querySelector("input").value.trim();
    const p = new URLSearchParams(params);
    if (val) p.set("name", val); else p.delete("name");
    p.delete("page");
    router.replace(`${pathname}?${p.toString()}`, { scroll: false });
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-lg">
      <input
        type="text"
        defaultValue={defaultValue}
        onChange={handleChange}
        placeholder="Search products..."
        className="w-full bg-white border border-gray-200 rounded-2xl pl-11 pr-4 py-3 text-sm outline-none focus:border-[#D02E64] focus:ring-2 focus:ring-pink-100 transition shadow-sm"
      />
      <svg
        className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
      </svg>
      {defaultValue && (
        <button
          type="button"
          onClick={() => {
            const input = document.querySelector("input[placeholder='Search products...']");
            if (input) input.value = "";
            const p = new URLSearchParams(params);
            p.delete("name");
            router.replace(`${pathname}?${p.toString()}`, { scroll: false });
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm"
        >
          ✕
        </button>
      )}
    </form>
  );
}
