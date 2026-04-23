import Image from "next/image";
import ProductList from "@/components/ProductList";
import Filters from "@/components/Filters";
import { wixClientServer } from "@/lib/wixClientServer";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import SkeletonLoader from "@/components/SkeletonLoader";
import Pagination from "@/components/Pagination";

export default async function ListPage({ searchParams }) {
  let cat;
  try {
    const wixClient = await wixClientServer();
    cat = await wixClient?.collections?.getCollectionBySlug(
      searchParams?.cat || "all-products"
    );
  } catch (error) {
    return notFound();
  }

  return (
    <div className="px-[10%] mt-5 pb-16">
      {/* Banner */}
      <div className="bg-gradient-to-r from-pink-50 to-pink-100 rounded-2xl flex flex-col lg:flex-row items-center justify-between px-10 py-10 mb-2 overflow-hidden relative">
        <div className="absolute right-0 top-0 w-64 h-64 bg-pink-200/30 rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="flex flex-col gap-4 z-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#D02E64]">
            Limited Offer
          </span>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
            Grab up to 50% off on<br />Selected Products
          </h1>
          <p className="text-gray-500 text-sm max-w-xs">
            Shop the latest trends at unbeatable prices. New deals added weekly.
          </p>
          <button className="bg-[#D02E64] hover:bg-[#b02555] active:scale-95 transition text-white py-3 px-6 rounded-xl text-sm font-semibold w-max">
            Shop Now
          </button>
        </div>
        <div className="hidden lg:block w-[22%] relative h-72">
          <Image src="/woman.png" className="object-cover" alt="" fill sizes="100%" />
        </div>
      </div>

      {/* Filters */}
      <Filters />

      {/* Heading */}
      <h2 className="text-xl font-bold mt-8 mb-5 text-gray-800">
        {cat?.collection?.name || "All Products"}
      </h2>

      {/* Product list — key forces re-suspend when params change */}
      <Suspense key={JSON.stringify(searchParams)} fallback={<SkeletonLoader />}>
        <ProductList
          type="list"
          categoryId={cat?.collection?._id || "00000000-000000-000000-000000000001"}
          searchParams={searchParams}
        />
      </Suspense>
    </div>
  );
}
