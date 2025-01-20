import Image from "next/image";
import React from "react";

export default function ShoppingProductList() {
  return (
    <div className="flex items-center gap-7  justify-between ">
      {" "}
      {/* LEFT */}
      <Image
        src="https://images.pexels.com/photos/15447422/pexels-photo-15447422/free-photo-of-drone-shot-of-city-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
        alt=""
        width={80}
        height={96}
        className="w-20 h-24 object-cover rounded-md"
      />
      {/* RIGHT */}
      <div className="flex  flex-col gap-2">
        <div className="flex items-center justify-between gap-12">
          <span className="max-w-60 font-medium  text-lg">Classic Tog Bag</span>
          <span>$18</span>
        </div>
        <span className="self-start font-normal text-gray-500 ">AVAILABLE</span>
        <div className="flex items-center justify-between gap-7">
          <span className=" text-gray-500  font-normal  ">Qty.1</span>
          <span className="text-[#254F93] font-normal ">Remove</span>
        </div>
      </div>
    </div>
  );
}
