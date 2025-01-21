import Image from 'next/image';
import React from 'react'

export default function Test() {
  return (
    <div className="customHeight  overflow-hidden ">
    <div className="w-max h-full flex items-center transition-all ease-in-out duration-1000 ">
      <div className="w-screen h-full flex flex-col  xl:flex-row">
        {/* LEFT */}
        <div className=" w-1/2  bg-red-100">
          <div className="flex flex-col gap-5 ">
            <h2>Lorem, ipsum dolor.</h2>
            <h1>
              Lorem ipsum dolor sit, <br /> amet consectetur adipisicing.
            </h1>
            <button>Shop now</button>
          </div>
        </div>
        {/* Right */}
        <div className=" w-1/2  customHieight relative  bg-blue-500">
          <Image
            src="https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            fill
            sizes="100%"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  </div>
  )
}
