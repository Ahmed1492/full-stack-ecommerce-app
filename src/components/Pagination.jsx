"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Pagination({ currentPage, hasPrev, hasNext }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const goTo = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.replace(`${pathname}?${params.toString()}`, { scroll: true });
  };

  return (
    <div className="flex items-center justify-center gap-4 mt-12">
      <button
        disabled={!hasPrev}
        onClick={() => goTo(currentPage - 1)}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:border-[#D02E64] hover:text-[#D02E64] hover:bg-pink-50 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-gray-600 disabled:hover:bg-white transition"
      >
        ← Previous
      </button>

      <span className="text-sm text-gray-400 font-medium">
        Page {currentPage + 1}
      </span>

      <button
        disabled={!hasNext}
        onClick={() => goTo(currentPage + 1)}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:border-[#D02E64] hover:text-[#D02E64] hover:bg-pink-50 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-gray-600 disabled:hover:bg-white transition"
      >
        Next →
      </button>
    </div>
  );
}
