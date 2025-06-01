import React from "react";

export default function OrderHistory() {
  const allHistoryOrders = [
    {
      orderId: "sgfa231....",
      price: "0.00",
      time: "1 hour age",
      status: "APPROVED",
    },
    {
      orderId: "sgfa231....",
      price: "0.00",
      time: "1 hour age",
      status: "APPROVED",
    },
    {
      orderId: "sgfa231....",
      price: "0.00",
      time: "1 hour age",
      status: "APPROVED",
    },
    {
      orderId: "sgfa231....",
      price: "0.00",
      time: "1 hour age",
      status: "APPROVED",
    },
  ];

  return (
    <div className="">
      <h2 className="text-2xl mb-[2rem] font-semibold ">Orders</h2>
      {/* ALL ORDERS */}
      <div className="flex flex-col gap-[1rem]">
        {allHistoryOrders.map((order, index) => (
          <div
            key={index}
            className={`cursor-pointer ${
              (index + 1) % 2 === 0 ? "bg-slate-100" : ""
            }  px-4 py-5 rounded-md   text-lg flex items-center gap-[3rem]`}
          >
            <span>ksadls....</span>
            <span>0.00$</span>
            <span>1 hour ago</span>
            <span>APPROVED</span>
          </div>
        ))}
      </div>
    </div>
  );
}
