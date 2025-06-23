import Image from "next/image";
import ProductList from "@/components/ProductList";
import Filters from "@/components/Filters";
import Pagination from "@/components/Pagination";
import { wixClientServer } from "@/lib/wixClientServer";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import SkeletonLoader from "@/components/SkeletonLoader";

export default async function SingleCategory({ searchParams }) {
  let cat;
  let error = false;
  try {
    const wixClient = await wixClientServer();
    error = false;
    cat = await wixClient?.collections?.getCollectionBySlug(
      searchParams?.cat || "all-products"
    );
  } catch (error) {
    console.log("====================================");
    console.log("error", error);
    console.log("====================================");
    if (error) return notFound();
  }

  return (
    <div className="px-[10%] mt-5">
      {/* TOP */}
      <div className="bg-pink-100 lg:py-0  py-10 rounded-lg flex flex-col lg:flex-row  items-center justify-around text-gray-900">
        {/* LEFT */}

        <div className="flex items-center w-[80%]   lg:w-[38%] flex-col gap-7">
          <h1 className="lg:text-4xl text-xl font-semibold lg:self-start">
            Grab up to 50% off on <br /> Selected Products
          </h1>
          <button className="bg-[#D52561]  lg:self-start text-white py-3 px-5 rounded-2xl text-sm">
            Buy now
          </button>
        </div>
        {/* RIGHT */}
        <div className=" lg:flex hidden w-[80%] lg:w-[27%] relative h-80">
          <Image
            src="/woman.png"
            className="object-cover"
            alt=""
            fill
            sizes="100%"
          />
        </div>
      </div>
      {/* FILTERS */}
      <Filters />
      {/* PRODUCT LIST */}
      <h2 className="text-xl font-bold my-8">
        {cat?.collection?.name} For You!
      </h2>
      <Suspense fallback={<SkeletonLoader />}>
        <ProductList
          type="list"
          categoryId={
            cat?.collection?._id || "00000000-000000-000000-000000000001"
          }
          searchParams={searchParams}
        />
      </Suspense>
    </div>
  );
}
