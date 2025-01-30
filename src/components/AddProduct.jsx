import React from "react";

export default function AddProduct() {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="font-medium text-xl">Choose a Quantity </h3>
      <div className="flex items-center gap-8">
        {/* COUNTER */}
        <div className="bg-gray-200 rounded-3xl px-[17px] py-[10px] text-lg flex items-center gap-10 ">
          <button>-</button>
          <span>1</span>
          <button>+</button>
        </div>
        <div className="text-sm">
          Only <span className="text-[#b54f46]">4 items</span> left! <br />
          Dont miss it
        </div>
      </div>
    </div>
  );
}
