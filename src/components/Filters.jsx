"use client";
import React, { useCallback, useRef, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const TYPES = ["physical", "digital"];
const SORT_OPTIONS = [
  { label: "Price: Low to High", value: "asc price" },
  { label: "Price: High to Low", value: "desc price" },
  { label: "Newest", value: "asc lastUpdated" },
  { label: "Oldest", value: "desc lastUpdated" },
];
const CATEGORIES = [
  "all-products", "accessories", "featured",
  "home", "sales", "shose", "tshirts",
];

export default function Filters() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const minRef = useRef(null);
  const maxRef = useRef(null);
  const minTimer = useRef(null);
  const maxTimer = useRef(null);

  const [openMenu, setOpenMenu] = useState(null); // "type" | "cat" | "sort" | null
  const [selectedType, setSelectedType] = useState(searchParams.get("Type") || "");
  const [selectedCat, setSelectedCat] = useState(searchParams.get("cat") || "all-products");
  const [selectedSort, setSelectedSort] = useState(searchParams.get("SortBy") || "");

  const applyParam = useCallback((key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value && value.trim() !== "") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    // Reset to page 0 on filter change
    params.delete("page");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, pathname, router]);

  const handleType = (val) => {
    setSelectedType(val);
    setOpenMenu(null);
    applyParam("Type", val);
  };

  const handleCat = (val) => {
    setSelectedCat(val);
    setOpenMenu(null);
    applyParam("cat", val);
  };

  const handleSort = (val) => {
    setSelectedSort(val);
    setOpenMenu(null);
    applyParam("SortBy", val);
  };

  const handleMinPrice = (e) => {
    const val = e.target.value;
    clearTimeout(minTimer.current);
    minTimer.current = setTimeout(() => applyParam("min", val), 600);
  };

  const handleMaxPrice = (e) => {
    const val = e.target.value;
    clearTimeout(maxTimer.current);
    maxTimer.current = setTimeout(() => applyParam("max", val), 600);
  };

  const clearAll = () => {
    setSelectedType("");
    setSelectedCat("all-products");
    setSelectedSort("");
    if (minRef.current) minRef.current.value = "";
    if (maxRef.current) maxRef.current.value = "";
    router.replace(`${pathname}?cat=all-products`, { scroll: false });
  };

  const hasFilters = selectedType || selectedSort ||
    searchParams.get("min") || searchParams.get("max") ||
    (selectedCat && selectedCat !== "all-products");

  const sortLabel = SORT_OPTIONS.find(s => s.value === selectedSort)?.label || "Sort By";

  return (
    <div className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4">
      <div className="flex flex-wrap gap-3 items-center justify-between">
        {/* LEFT filters */}
        <div className="flex flex-wrap gap-3 items-center">

          {/* Type dropdown */}
          <Dropdown
            label={selectedType || "Type"}
            isOpen={openMenu === "type"}
            onToggle={() => setOpenMenu(openMenu === "type" ? null : "type")}
            onClose={() => setOpenMenu(null)}
          >
            {TYPES.map((t) => (
              <DropItem
                key={t}
                label={t}
                active={selectedType === t}
                onClick={() => handleType(t)}
              />
            ))}
            {selectedType && (
              <DropItem label="Clear" onClick={() => handleType("")} muted />
            )}
          </Dropdown>

          {/* Category dropdown */}
          <Dropdown
            label={selectedCat === "all-products" ? "Category" : selectedCat}
            isOpen={openMenu === "cat"}
            onToggle={() => setOpenMenu(openMenu === "cat" ? null : "cat")}
            onClose={() => setOpenMenu(null)}
          >
            {CATEGORIES.map((c) => (
              <DropItem
                key={c}
                label={c.replace(/-/g, " ")}
                active={selectedCat === c}
                onClick={() => handleCat(c)}
              />
            ))}
          </Dropdown>

          {/* Min price */}
          <input
            ref={minRef}
            defaultValue={searchParams.get("min") || ""}
            onChange={handleMinPrice}
            className="border border-gray-200 rounded-xl px-3 py-2 outline-none w-28 text-sm focus:border-[#D02E64] focus:ring-1 focus:ring-[#D02E64] transition"
            type="number"
            min="0"
            placeholder="Min $"
          />

          {/* Max price */}
          <input
            ref={maxRef}
            defaultValue={searchParams.get("max") || ""}
            onChange={handleMaxPrice}
            className="border border-gray-200 rounded-xl px-3 py-2 outline-none w-28 text-sm focus:border-[#D02E64] focus:ring-1 focus:ring-[#D02E64] transition"
            type="number"
            min="0"
            placeholder="Max $"
          />

          {/* Clear all */}
          {hasFilters && (
            <button
              onClick={clearAll}
              className="text-xs text-red-400 hover:text-red-600 border border-red-200 hover:border-red-400 px-3 py-2 rounded-xl transition"
            >
              Clear All
            </button>
          )}
        </div>

        {/* RIGHT — Sort */}
        <Dropdown
          label={sortLabel}
          isOpen={openMenu === "sort"}
          onToggle={() => setOpenMenu(openMenu === "sort" ? null : "sort")}
          onClose={() => setOpenMenu(null)}
          alignRight
        >
          {SORT_OPTIONS.map((s) => (
            <DropItem
              key={s.value}
              label={s.label}
              active={selectedSort === s.value}
              onClick={() => handleSort(s.value)}
            />
          ))}
          {selectedSort && (
            <DropItem label="Clear" onClick={() => handleSort("")} muted />
          )}
        </Dropdown>
      </div>
    </div>
  );
}

// ── Reusable Dropdown ──────────────────────────────────────────────
function Dropdown({ label, isOpen, onToggle, onClose, children, alignRight }) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition ${
          isOpen
            ? "border-[#D02E64] text-[#D02E64] bg-pink-50"
            : "border-gray-200 text-gray-600 bg-white hover:border-gray-300 hover:bg-gray-50"
        }`}
      >
        <span className="capitalize">{label}</span>
        <svg
          className={`w-3.5 h-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* backdrop to close */}
          <div className="fixed inset-0 z-40" onClick={onClose} />
          <div
            className={`absolute z-50 mt-2 bg-white border border-gray-100 shadow-xl rounded-xl py-1.5 min-w-[10rem] ${
              alignRight ? "right-0" : "left-0"
            }`}
          >
            {children}
          </div>
        </>
      )}
    </div>
  );
}

function DropItem({ label, active, onClick, muted }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2 text-sm capitalize transition ${
        muted
          ? "text-red-400 hover:bg-red-50"
          : active
          ? "bg-pink-50 text-[#D02E64] font-medium"
          : "text-gray-700 hover:bg-gray-50"
      }`}
    >
      {label}
      {active && !muted && <span className="float-right text-[#D02E64]">✓</span>}
    </button>
  );
}
