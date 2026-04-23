"use client";
import Image from "next/image";
import { useState } from "react";

export default function ProductImage({ items }) {
  const [index, setIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative w-full h-[26rem] md:h-[36rem] rounded-2xl overflow-hidden bg-gray-50 group">
        <Image
          src={items[index]?.image?.url}
          alt=""
          fill
          sizes="(max-width: 1024px) 90vw, 45vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority
        />
        {/* Arrows if multiple images */}
        {items.length > 1 && (
          <>
            <button
              onClick={() => setIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1))}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white shadow flex items-center justify-center text-gray-700 transition opacity-0 group-hover:opacity-100"
            >
              ‹
            </button>
            <button
              onClick={() => setIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1))}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white shadow flex items-center justify-center text-gray-700 transition opacity-0 group-hover:opacity-100"
            >
              ›
            </button>
          </>
        )}
        {/* Dot indicators */}
        {items.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i === index ? "bg-white w-4" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {items.length > 1 && (
        <div className="flex gap-3 flex-wrap">
          {items.map((item, i) => (
            <button
              key={item._id}
              onClick={() => setIndex(i)}
              className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition flex-shrink-0 ${
                i === index
                  ? "border-[#D02E64] shadow-md"
                  : "border-transparent hover:border-gray-300"
              }`}
            >
              <Image
                src={item?.image?.url}
                alt=""
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
