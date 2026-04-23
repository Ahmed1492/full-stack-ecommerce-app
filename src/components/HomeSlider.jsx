"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const SLIDES = [
  {
    id: 1,
    badge: "Limited Time",
    title: "Winter Sale\nCollection",
    description: "Up to 50% off on selected styles. Don't miss out.",
    cta: "Shop the Sale",
    url: "/deals",
    img: "https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg",
    accent: "#D02E64",
    bg: "from-rose-950 via-pink-900 to-rose-800",
  },
  {
    id: 2,
    badge: "New Season",
    title: "Summer\nWarmers",
    description: "Stay cozy with fresh arrivals and discounts up to 40%.",
    cta: "Explore Now",
    url: "/shop",
    img: "https://images.pexels.com/photos/5531551/pexels-photo-5531551.jpeg",
    accent: "#3B82F6",
    bg: "from-blue-950 via-indigo-900 to-blue-800",
  },
  {
    id: 3,
    badge: "Just Dropped",
    title: "Spring Fresh\nArrivals",
    description: "New arrivals every week. Be the first to wear the latest.",
    cta: "See What's New",
    url: "/shop",
    img: "https://images.pexels.com/photos/29906028/pexels-photo-29906028.jpeg",
    accent: "#10B981",
    bg: "from-emerald-950 via-teal-900 to-emerald-800",
  },
  {
    id: 4,
    badge: "Trending",
    title: "Street Style\nEssentials",
    description: "Curated looks for every occasion. Shop the collection.",
    cta: "Shop Now",
    url: "/list?cat=all-products",
    img: "https://images.pexels.com/photos/15658380/pexels-photo-15658380.jpeg",
    accent: "#F59E0B",
    bg: "from-amber-950 via-orange-900 to-amber-800",
  },
];

export default function HomeSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent((p) => (p + 1) % SLIDES.length), []);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [paused, next]);

  return (
    <div
      className="relative w-full h-[92vh] max-h-[700px] min-h-[480px] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      {SLIDES.map((slide, index) => {
        const isActive = index === current;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Background image */}
            <Image
              src={slide.img}
              alt={slide.title}
              fill
              sizes="100vw"
              className={`object-cover transition-transform duration-[8000ms] ${
                isActive ? "scale-105" : "scale-100"
              }`}
              priority={index === 0}
            />

            {/* Dark gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.bg} opacity-75`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex items-center px-[10%]">
              <div
                className={`max-w-xl transition-all duration-700 delay-200 ${
                  isActive ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
              >
                {/* Badge */}
                <span
                  className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5"
                  style={{ backgroundColor: slide.accent + "33", color: slide.accent, border: `1px solid ${slide.accent}55` }}
                >
                  {slide.badge}
                </span>

                {/* Title */}
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-4 whitespace-pre-line drop-shadow-lg">
                  {slide.title}
                </h1>

                {/* Description */}
                <p className="text-white/70 text-base md:text-lg mb-8 max-w-sm leading-relaxed">
                  {slide.description}
                </p>

                {/* CTA */}
                <div className="flex items-center gap-4">
                  <Link
                    href={slide.url}
                    className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-300 hover:gap-3 hover:shadow-lg"
                    style={{ backgroundColor: slide.accent }}
                  >
                    {slide.cta}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Link>
                  <Link
                    href="/list?cat=all-products"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-white border border-white/30 hover:bg-white/10 transition-all duration-300"
                  >
                    Browse All
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        className="absolute left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center text-xl transition backdrop-blur-sm"
        aria-label="Previous"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center text-xl transition backdrop-blur-sm"
        aria-label="Next"
      >
        ›
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`rounded-full transition-all duration-300 ${
              index === current
                ? "w-7 h-2 bg-white"
                : "w-2 h-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-7 right-[10%] z-20 text-white/50 text-xs font-medium tabular-nums">
        {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
      </div>

      {/* Progress bar */}
      {!paused && (
        <div className="absolute bottom-0 left-0 right-0 z-20 h-0.5 bg-white/10">
          <div
            key={current}
            className="h-full bg-white/60"
            style={{ animation: "progress 5s linear forwards" }}
          />
        </div>
      )}

      <style jsx>{`
        @keyframes progress {
          from { width: 0% }
          to   { width: 100% }
        }
      `}</style>
    </div>
  );
}
