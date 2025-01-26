import Image from "next/image";
import ProductList from "@/components/ProductList";
import Filters from "@/components/Filters";

export default function SingleCategory() {
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
      <h2 className="text-xl font-bold my-8">All Products for You!</h2>
      <ProductList />
    </div>
  );
}
