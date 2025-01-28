"use client";
import Image from "next/image";
import React, { useState } from "react";

export default function ProductImage() {
  const [index, setIndex] = useState(0);
  const images = [
    {
      id: 1,
      url: "https://images.pexels.com/photos/19226322/pexels-photo-19226322/free-photo-of-forest-landscape-with-ferns.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },
    {
      id: 2,
      url: "https://images.pexels.com/photos/29971507/pexels-photo-29971507/free-photo-of-tranquil-forest-scene-in-winter-england.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },
    {
      id: 3,
      url: "https://images.pexels.com/photos/1882017/pexels-photo-1882017.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },
  ];
  return (
    <div className="w-full h-max">
      {/* MAIN IMAGE */}
      <div className="w-[100%] h-[20rem]  md:h-[30rem] relative ">
        <Image
          src={images[index].url}
          alt=""
          fill
          sizes="50%"
          className="object-cover rounded-md"
        />
      </div>
      {/* SMALL IMAGES */}
      <div className="flex justify-between flex-wrap gap-4 mt-5 w-full ">
        {images.map((image, index) => (
          <div key={image.id} className="relative w-[7rem] h-[5rem] ">
            <Image
              src={image.url}
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
