import React from "react";

export default function CustomizeProduct() {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="font-medium text-xl">Choose a Color </h3>
      {/* COLORS */}
      <div className="flex items-center gap-2">
        <div className="ring-2 ring-blue-400  flex justify-center cursor-pointer items-center rounded-full w-11 h-11 relative  ">
          <span className="bg-black w-9 h-9  rounded-full"></span>
        </div>
        <div className="  flex justify-center items-center cursor-pointer rounded-full w-11 h-11 relative  ">
          <span className="bg-red-500 w-9 h-9  rounded-full"></span>
        </div>
        <div className="bg-green-500 w-10 h-10 flex justify-center cursor-not-allowed items-center  rounded-full border border-gray-300">
          <span className="w-1 h-14 rounded-2xl bg-red-400  -rotate-45" />
        </div>
      </div>
      <h3 className="font-medium text-xl">Choose a Size </h3>
      {/* SIZES */}
      <div className="flex items-center gap-3">
        <button className="bg-[#f69cba] px-[10px] w-24 text-center font-medium py-[8px] text-white rounded-xl">
          Large
        </button>
        <button className=" border border-red-600 px-[10px] w-24 text-center font-medium py-[8px] text-red-700 rounded-xl">
          Medium
        </button>
        <button className="bg-[#EB306F] px-[10px] w-24 text-center font-medium py-[8px] text-white rounded-xl">
          Small
        </button>
      </div>
    </div>
  );
}
