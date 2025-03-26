"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Pagination = ({ currentPage, hasPrev, hasNext }) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const createPageUrl = (pageNumber) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    replace(`${pathName}?${params.toString()}`);
  };
  return (
    <div className="flex items-center justify-between w-full mt-12">
      <button
        disabled={!hasPrev}
        className="bg-[#D52561] text-white w-[7rem] py-3 px-2 text-sm rounded-md cursor-pointer disabled:cursor-not-allowed disabled:bg-pink-200"
        onClick={() => createPageUrl(currentPage - 1)}
      >
        Previous
      </button>
      <button
        disabled={!hasNext}
        className="bg-[#D52561] text-white w-[7rem] py-3 px-3 text-sm rounded-md cursor-pointer disabled:cursor-not-allowed disabled:bg-pink-200"
        onClick={() => createPageUrl(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
