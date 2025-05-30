import React from "react";

export default function page() {
  return (
    <div className="flex flex-col gap-4 mt-[4rem] items-center">
      <h3 className="text-center font-semibold text-2xl">Order Detaisl</h3>
      {/* Order Id */}
      <div className="flex flex-col gap-4 text-left justify-start  text-xl font-light   mt-[2rem]   ">
        <span>Order Id :1232132k1lj132lk12lldsql</span>
        {/* Receiver name */}
        <span>Receiver name :ahmed mohamed</span>
        {/* Receiver Email */}
        <span>Receiver Email :ahmed@gmail.com</span>
        {/* price */}
        <span>price : 0.0</span>
        {/* Payment Status */}
        <span> Payment Status :PAID</span>
        {/* Order Status */}
        <span> Order Status :APPROVED</span>
        {/* Delivery Address */}
        <span>
          Delivery Address :Ms. Susan Holmes, 4 Princeton, Little Whinging,
        </span>

        <span
          className="border-b border-black text-lg pb-0 text-gray-800 font-semibold cursor-pointer
         text-center self-center mt-[1rem] w-max "
        >
          Have A Problem ? Contact Us
        </span>
      </div>
    </div>
  );
}
