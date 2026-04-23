"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useRef, useState } from "react";

const SORT_OPTIONS = [
  { label: "Newest",            value: "asc lastUpdated" },
  { label: "Oldest",            value: "desc lastUpdated" },
  { label: "Price: Low → High", value: "asc price" },
  { label: "Price: High → Low", value: "desc price" },
];

const PRICE_PRESETS = [
  { label: "Under $50",    min: "",  max: "50" },
  { label: "$50 – $100",  min: "50", max: "100" },
  { label: "$100 – $200", min: "100",max: "200" },
  { label: "Over $200",   min: "200",max: "" },
];

export default function ShopFilters({ categories, searchParams }) {
  const router   = useRouter();
  const pathname = usePathname();
  const params   = useSearchParams();

  const activeCat   = searchParams?.cat    || "all-products";
  const activeSort  = searchParams?.SortBy || "";
  const activeMin   = searchParams?.min    || "";
  const activeMax   = searchParams?.max    || "";
  const activeType  = searchParams?.Type   || "";

  const [sortOpen, setSortOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const minRef   = useRef(null);
  const maxRef   = useRef(null);
  const minTimer = useRef(null);
  const maxTimer = useRef(null);

  const push = useCallback((updates) => {
    const p = new URLSearchParams(params);
    Object.entries(updates).forEach(([k, v]) => {
      if (v) p.set(k, v); else p.delete(k);
    });
    p.delete("page");
    router.replace(`${pathname}?${p.toString()}`, { scroll: false });
  }, [params, pathname, router]);

  const clearAll = () => {
    if (minRef.current) minRef.current.value = "";
    if (maxRef.current) maxRef.current.value = "";
    router.replace(`${pathname}?cat=${activeCat}`, { scroll: false });
  };

  const activePreset = PRICE_PRESETS.find(
    (p) => p.min === activeMin && p.max === activeMax
  );

  const hasFilters = activeSort || activeMin || activeMax || activeType;

  return (
    <div className="flex flex-col gap-4">
      {/* ── Category pills ── */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hidden pb-1">
        {categories.map((cat) => {
          const active = activeCat === cat.slug;
          return (
            <button
              key={cat._id}
              onClick={() => push({ cat: cat.slug })}
              className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium border transition-all ${
                active
                  ? "bg-[#D02E64] text-white border-[#D02E64] shadow-sm"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#D02E64] hover:text-[#D02E64]"
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* ── Second row: type + price + sort + clear ── */}
      <div className="flex flex-wrap items-center gap-3">

        {/* Type toggle */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
          {["", "physical", "digital"].map((t) => (
            <button
              key={t}
              onClick={() => push({ Type: t })}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                activeType === t
                  ? "bg-white text-gray-800 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t === "" ? "All" : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Price preset dropdown */}
        <div className="relative">
          <button
            onClick={() => { setPriceOpen((p) => !p); setSortOpen(false); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition ${
              priceOpen || activeMin || activeMax
                ? "border-[#D02E64] text-[#D02E64] bg-pink-50"
                : "border-gray-200 text-gray-600 bg-white hover:border-gray-300"
            }`}
          >
            {activePreset ? activePreset.label : "Price"}
            <svg className={`w-3.5 h-3.5 transition-transform ${priceOpen ? "rotate-180" : ""}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {priceOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setPriceOpen(false)} />
              <div className="absolute left-0 mt-2 z-50 bg-white border border-gray-100 shadow-xl rounded-xl py-2 min-w-[180px]">
                {PRICE_PRESETS.map((preset) => {
                  const isActive = activePreset?.label === preset.label;
                  return (
                    <button
                      key={preset.label}
                      onClick={() => { push({ min: preset.min, max: preset.max }); setPriceOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm transition ${
                        isActive ? "bg-pink-50 text-[#D02E64] font-medium" : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {preset.label}
                      {isActive && <span className="float-right">✓</span>}
                    </button>
                  );
                })}
                <div className="border-t border-gray-100 mt-1 pt-1 px-3 pb-2 flex gap-2">
                  <input
                    ref={minRef}
                    defaultValue={activeMin}
                    type="number" min="0" placeholder="Min $"
                    onChange={(e) => {
                      clearTimeout(minTimer.current);
                      minTimer.current = setTimeout(() => push({ min: e.target.value }), 600);
                    }}
                    className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs outline-none focus:border-[#D02E64] transition"
                  />
                  <input
                    ref={maxRef}
                    defaultValue={activeMax}
                    type="number" min="0" placeholder="Max $"
                    onChange={(e) => {
                      clearTimeout(maxTimer.current);
                      maxTimer.current = setTimeout(() => push({ max: e.target.value }), 600);
                    }}
                    className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs outline-none focus:border-[#D02E64] transition"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Sort dropdown */}
        <div className="relative">
          <button
            onClick={() => { setSortOpen((p) => !p); setPriceOpen(false); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition ${
              sortOpen || activeSort
                ? "border-[#D02E64] text-[#D02E64] bg-pink-50"
                : "border-gray-200 text-gray-600 bg-white hover:border-gray-300"
            }`}
          >
            {SORT_OPTIONS.find(s => s.value === activeSort)?.label || "Sort By"}
            <svg className={`w-3.5 h-3.5 transition-transform ${sortOpen ? "rotate-180" : ""}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {sortOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setSortOpen(false)} />
              <div className="absolute right-0 mt-2 z-50 bg-white border border-gray-100 shadow-xl rounded-xl py-1.5 min-w-[180px]">
                {SORT_OPTIONS.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => { push({ SortBy: s.value }); setSortOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm transition ${
                      activeSort === s.value
                        ? "bg-pink-50 text-[#D02E64] font-medium"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {s.label}
                    {activeSort === s.value && <span className="float-right">✓</span>}
                  </button>
                ))}
                {activeSort && (
                  <button
                    onClick={() => { push({ SortBy: "" }); setSortOpen(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-50 border-t border-gray-100 transition"
                  >
                    Clear sort
                  </button>
                )}
              </div>
            </>
          )}
        </div>

        {/* Active filter chips */}
        {activeMin && (
          <span className="flex items-center gap-1.5 text-xs bg-pink-50 text-[#D02E64] border border-pink-200 px-3 py-1.5 rounded-full font-medium">
            Min ${activeMin}
            <button onClick={() => push({ min: "" })} className="hover:text-red-500">✕</button>
          </span>
        )}
        {activeMax && (
          <span className="flex items-center gap-1.5 text-xs bg-pink-50 text-[#D02E64] border border-pink-200 px-3 py-1.5 rounded-full font-medium">
            Max ${activeMax}
            <button onClick={() => push({ max: "" })} className="hover:text-red-500">✕</button>
          </span>
        )}

        {/* Clear all */}
        {hasFilters && (
          <button
            onClick={clearAll}
            className="ml-auto text-xs text-red-400 hover:text-red-600 border border-red-200 hover:border-red-400 px-3 py-2 rounded-xl transition"
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  );
}
