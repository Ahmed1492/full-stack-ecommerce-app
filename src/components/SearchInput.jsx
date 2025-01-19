"use client";
import Image from "next/image";

export default function SearchInput() {
  return (
    <div className="bg-gray-100 flex justify-between items-center  md:w-full lg:w-4/5 xl:w-3/5 py-2 px-3 rounded-md">
      <input
        type="text"
        placeholder="Search..."
        className="bg-transparent border-none outline-none"
      />
      <Image src="/search.png" alt="" width={16} height={16} />
    </div>
  );
}
