"use client";
import Image from "next/image";
import React, { useState } from "react";

export default function ProductImage({ items }) {
  const [index, setIndex] = useState(0);

  return (
    <div className="w-full h-max">
      {/* MAIN IMAGE */}
      <div className="w-[100%] h-[20rem]  md:h-[30rem] relative ">
        <Image
          src={items[index]?.image?.url}
          alt=""
          fill
          sizes="50%"
          className="object-cover rounded-md"
        />
      </div>
      {/* SMALL IMAGES */}
      <div className="flex justify-between flex-wrap gap-4 mt-5 w-full ">
        {items.map((item, index) => (
          <div key={item._id} className="relative w-[7rem] h-[5rem] ">
            <Image
              src={item?.image?.url}
              alt=""
              fill
              className="object-cover w-32 h-w-32 rounded-md cursor-pointer"
              onClick={() => setIndex(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
