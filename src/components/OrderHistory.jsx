import React from "react";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import Image from "next/image";
export default async function OrderHistory({ user }) {
  dayjs.extend(relativeTime);

  // let userId = "a9d38b31-e2d0-4884-aecc-8d12e1c6c838";
  let userId = user?.contactId;

  const getUserOrders = async () => {
    try {
      let myResponse = await axios.get(
        `http://localhost:2000/userOrders/${userId}`
      );

      return myResponse?.data?.result;
    } catch (error) {
      console.log(error);
    }
  };
  // getUserOrders();
  let allOrders = await getUserOrders();
  // console.log(" allOrders", allOrders);

  if (allOrders?.length == 0)
    return (
      <>
        <h2 className="text-2xl text-center mb-[2rem] font-semibold ">
          Orders
        </h2>
        <h2 className="text-xl mb-[2rem] text-center font-semibold ">
          No Orders To Show!
        </h2>
      </>
    );

  return (
    <div className="">
      <div className="flex items-center gap-2 mb-[2rem]">
        <Image src="/order.svg" alt="" width={30} height={28} />
        <h2 className="text-2xl  font-semibold ">
          Orders ({allOrders?.length})
        </h2>
      </div>
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
