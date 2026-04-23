"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const CATEGORY_EMOJIS = {
  "all-products": "🛍️",
  accessories: "👜",
  featured: "⭐",
  home: "🏠",
  sales: "🔥",
  shose: "👟",
  tshirts: "👕",
};

const CATEGORY_COLORS = [
  "from-pink-100 to-rose-50",
  "from-blue-100 to-indigo-50",
  "from-amber-100 to-yellow-50",
  "from-green-100 to-emerald-50",
  "from-purple-100 to-violet-50",
  "from-orange-100 to-red-50",
  "from-teal-100 to-cyan-50",
  "from-fuchsia-100 to-pink-50",
];

export default function CategoryList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const rowRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const dragMoved = useRef(false);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((data) => setItems(data.items || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const onMouseDown = (e) => {
    isDragging.current = true;
    dragMoved.current = false;
    startX.current = e.pageX - rowRef.current.offsetLeft;
    scrollLeft.current = rowRef.current.scrollLeft;
    rowRef.current.style.cursor = "grabbing";
    rowRef.current.style.userSelect = "none";
  };

  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    const x = e.pageX - rowRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    if (Math.abs(walk) > 4) dragMoved.current = true;
    rowRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const stopDrag = () => {
    isDragging.current = false;
    if (rowRef.current) {
      rowRef.current.style.cursor = "grab";
      rowRef.current.style.userSelect = "";
    }
  };

  const onTouchStart = (e) => {
    startX.current = e.touches[0].pageX - rowRef.current.offsetLeft;
    scrollLeft.current = rowRef.current.scrollLeft;
    dragMoved.current = false;
  };

  const onTouchMove = (e) => {
    const x = e.touches[0].pageX - rowRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    if (Math.abs(walk) > 4) dragMoved.current = true;
    rowRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const onLinkClick = (e) => {
    if (dragMoved.current) e.preventDefault();
  };

  if (loading) return <CategorySkeleton />;

  return (
    <div className="relative px-[10%]">
      {/* Right fade — hint that more items exist */}
      <div className="pointer-events-none absolute right-[10%] top-0 bottom-4 w-16 bg-gradient-to-l from-white to-transparent z-10" />

      <div
        ref={rowRef}
        className="flex gap-4 overflow-x-auto scrollbar-hidden cursor-grab pb-2"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
      >
        {items.map((item, index) => {
          const emoji = CATEGORY_EMOJIS[item.slug] || "🏷️";
          const gradient = CATEGORY_COLORS[index % CATEGORY_COLORS.length];

          return (
            <Link
              key={item._id || index}
              href={`/list?cat=${item.slug}`}
              onClick={onLinkClick}
              draggable={false}
              // Each item takes 1/5 of the container width (minus gaps), min 120px so small screens still look good
              className="group flex flex-col items-center gap-3 flex-shrink-0"
              style={{ width: "calc(20% - 13px)", minWidth: "120px" }}
            >
              <div
                className={`relative w-full rounded-2xl overflow-hidden bg-gradient-to-br ${gradient} border border-white shadow-sm group-hover:shadow-md group-hover:scale-[1.04] transition-all duration-300`}
                style={{ aspectRatio: "1 / 1" }}
              >
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    sizes="20vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    draggable={false}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl">
                    {emoji}
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>

              <span className="text-xs font-semibold text-gray-700 group-hover:text-[#D02E64] transition-colors capitalize text-center leading-tight w-full truncate">
                {item.name.toLowerCase().replace(/-/g, " ")}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function CategorySkeleton() {
  return (
    <div className="px-[10%] flex gap-4 overflow-hidden animate-pulse">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="flex flex-col items-center gap-3 flex-shrink-0"
          style={{ width: "calc(20% - 13px)", minWidth: "120px" }}
        >
          <div className="w-full bg-gray-100 rounded-2xl" style={{ aspectRatio: "1 / 1" }} />
          <div className="h-3 bg-gray-100 rounded w-3/4" />
        </div>
      ))}
    </div>
  );
}
