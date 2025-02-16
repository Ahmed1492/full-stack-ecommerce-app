"use client";

import { useState } from "react";

export default function AddProduct() {
  const [quantity, setQuantity] = useState(0);
  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };
  const handleDecrease = () => {
    if (quantity !== 0) {
      setQuantity((prev) => prev - 1);
    }
  };
  return (
    <div className="flex flex-col gap-5">
      <h3 className="font-medium text-xl">Choose a Quantity </h3>
      <div className="flex items-center gap-8">
        {/* COUNTER */}
        <div className="flex items-center justify-between w-[95%]">
          <div className="flex flex-col gap-5 items-center">
            <div className="flex items-center gap-8">
              <div className="bg-gray-100 rounded-3xl px-[17px] py-[10px] text-lg flex items-center gap-10 ">
                <button onClick={handleDecrease}>-</button>
                <span>{quantity}</span>
                <button onClick={handleIncrease}>+</button>
              </div>
              <div className="text-sm">
                Only <span className="text-[#b54f46]">4 items</span> left!{" "}
                <br />
                Dont miss it
              </div>
            </div>
          </div>
          <button className="border border-[#b54f46] w-[8rem] py-3 text-sm font-medium text-[#b54f46] rounded-2xl">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
