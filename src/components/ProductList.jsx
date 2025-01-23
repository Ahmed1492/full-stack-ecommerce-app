import Image from "next/image";
import React from "react";

export default function ProductList() {
  return (
    <div className="flex items-center gap-x-2 gap-y-9 justify-between flex-wrap ">
      <div className="w-[100%] md:w-[45%] lg:w-[35%] xl:w-[22%] h-max">
        {/* IMAGE */}
        <div className="w-full relative h-80">
          <Image
            src="https://images.pexels.com/photos/30345418/pexels-photo-30345418/free-photo-of-minimalist-workspace-with-blue-headphones-and-keyboard.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            className="cursor-pointer  object-cover rounded-md absolute z-30 hover:opacity-0 duration-500 ease-in-out "
            fill
            sizes="100%"
          />

          <Image
            src="https://images.pexels.com/photos/30286786/pexels-photo-30286786/free-photo-of-colorful-kite-in-bali-s-clear-summer-sky.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            className="cursor-pointer  object-cover rounded-md absolute"
            fill
            sizes="100%"
          />
        </div>
        {/* DESCRIPTION */}
        <div className="flex items-center justify-between mt-3">
          <span className="font-bold ">Degital Camera</span>
          <span className="font-bold ">$23</span>
        </div>
        <p className="text-gray-500 text-sm mt-2">
          Lorem ipsum dolor sit amet consectetur.
        </p>
        <button className="px-4 text-sm  py-2 bg-transparent border border-red-400 text-red-400 rounded-2xl mt-2">
          Add To Cart
        </button>
      </div>

      <div className="w-[100%] md:w-[40%] lg:w-[30%] xl:w-[22%] h-max">
        {/* IMAGE */}
        <div className="w-full relative h-80">
          <Image
            src="https://images.pexels.com/photos/30345418/pexels-photo-30345418/free-photo-of-minimalist-workspace-with-blue-headphones-and-keyboard.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            className="cursor-pointer  object-cover rounded-md absolute z-30 hover:opacity-0 duration-500 ease-in-out "
            fill
            sizes="100%"
          />

          <Image
            src="https://images.pexels.com/photos/30286786/pexels-photo-30286786/free-photo-of-colorful-kite-in-bali-s-clear-summer-sky.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            className="cursor-pointer  object-cover rounded-md absolute"
            fill
            sizes="100%"
          />
        </div>
        {/* DESCRIPTION */}
        <div className="flex items-center justify-between mt-3">
          <span className="font-bold ">Degital Camera</span>
          <span className="font-bold ">$23</span>
        </div>
        <p className="text-gray-500 text-sm mt-2">
          Lorem ipsum dolor sit amet consectetur.
        </p>
        <button className="px-4 text-sm  py-2 bg-transparent border border-red-400 text-red-400 rounded-2xl mt-2">
          Add To Cart
        </button>
      </div>
      <div className="w-[100%] md:w-[40%] lg:w-[30%] xl:w-[22%] h-max">
        {/* IMAGE */}
        <div className="w-full relative h-80">
          <Image
            src="https://images.pexels.com/photos/30345418/pexels-photo-30345418/free-photo-of-minimalist-workspace-with-blue-headphones-and-keyboard.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            className="cursor-pointer  object-cover rounded-md absolute z-30 hover:opacity-0 duration-500 ease-in-out "
            fill
            sizes="100%"
          />

          <Image
            src="https://images.pexels.com/photos/30286786/pexels-photo-30286786/free-photo-of-colorful-kite-in-bali-s-clear-summer-sky.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            className="cursor-pointer  object-cover rounded-md absolute"
            fill
            sizes="100%"
          />
        </div>
        {/* DESCRIPTION */}
        <div className="flex items-center justify-between mt-3">
          <span className="font-bold ">Degital Camera</span>
          <span className="font-bold ">$23</span>
        </div>
        <p className="text-gray-500 text-sm mt-2">
          Lorem ipsum dolor sit amet consectetur.
        </p>
        <button className="px-4 text-sm  py-2 bg-transparent border border-red-400 text-red-400 rounded-2xl mt-2">
          Add To Cart
        </button>
      </div>
      <div className="w-[100%] md:w-[40%] lg:w-[30%] xl:w-[22%] h-max">
        {/* IMAGE */}
        <div className="w-full relative h-80">
          <Image
            src="https://images.pexels.com/photos/30345418/pexels-photo-30345418/free-photo-of-minimalist-workspace-with-blue-headphones-and-keyboard.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            className="cursor-pointer  object-cover rounded-md absolute z-30 hover:opacity-0 duration-500 ease-in-out "
            fill
            sizes="100%"
          />

          <Image
            src="https://images.pexels.com/photos/30286786/pexels-photo-30286786/free-photo-of-colorful-kite-in-bali-s-clear-summer-sky.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            className="cursor-pointer  object-cover rounded-md absolute"
            fill
            sizes="100%"
          />
        </div>
        {/* DESCRIPTION */}
        <div className="flex items-center justify-between mt-3">
          <span className="font-bold ">Degital Camera</span>
          <span className="font-bold ">$23</span>
        </div>
        <p className="text-gray-500 text-sm mt-2">
          Lorem ipsum dolor sit amet consectetur.
        </p>
        <button className="px-4 text-sm  py-2 bg-transparent border border-red-400 text-red-400 rounded-2xl mt-2">
          Add To Cart
        </button>
      </div>
    </div>
  );
}
