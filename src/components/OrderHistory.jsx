import React from "react";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
export default async function OrderHistory() {
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
  dayjs.extend(relativeTime);

  let userId = "a9d38b31-e2d0-4884-aecc-8d12e1c6c838";

  const getUserOrders = async () => {
    try {
      let myResponse = await axios.get(
        `http://localhost:2000/userOrders/${userId}`
      );
      // console.log("====================================");
      // console.log(myResponse.data.result);
      // console.log("====================================");
      return myResponse?.data?.result;
    } catch (error) {
      console.log(error);
    }
  };
  // getUserOrders();
  let allOrders = await getUserOrders();
  // console.log(" allOrders", allOrders);

  return (
    <div className="">
      <h2 className="text-2xl mb-[2rem] font-semibold ">Orders</h2>
      {/* ALL ORDERS */}
      <div className="flex flex-col gap-[1rem]">
        {allOrders?.map((order, index) => (
          <Link
            href={`/orders/${order._id}`}
            key={index}
            className={`cursor-pointer ${
              (index + 1) % 2 === 0 ? "bg-slate-100" : ""
            }  px-4 py-5 rounded-md   text-lg flex items-center gap-[3rem]`}
          >
            <span>
              {order._id.slice(0, 4)}...{order._id.slice(-4)}
            </span>

            <span>${order.price}</span>
            <span>{dayjs(order.createdAt).fromNow()}</span>
            <span>{order.paymentStatus}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
