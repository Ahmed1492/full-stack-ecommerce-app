import axios from "axios";
import Image from "next/image";
import React from "react";
import Orderinfo from "@/components/Orderinfo";
export default async function page({ params }) {
  const { orderId } = params;
  console.log("orderId ", orderId);

  let getOrder = async () => {
    try {
      let myResponse = await axios.get(
        `http://localhost:2000/orders/${orderId}`
      );
      console.log(myResponse.data.order);

      return myResponse.data.order;
    } catch (error) {
      console.log(error);
    }
  };
  let orderDetails = await getOrder();

  if (!orderDetails)
    return (
      <div>
        <h2 className="text-2xl text-center mt-[4rem]">not found order!</h2>
      </div>
    );
  return (
    <div className="flex items-center gap-[9rem] min-=h-[90vh] justify-center mt-12 py-[2rem]">
      <div className="flex flex-col gap-4 mt-[4rem] items-censter">
        <h3 className="text-centera font-semibold text-2xl">Order Detaisl</h3>
        {/* Order Id */}
        <div className="flex flex-col gap-4 text-left justify-start  text-xl font-light   mt-[2rem]   ">
          <span>Order Id :{orderDetails?._id}</span>
          {/* Receiver name */}
          <span>Receiver name :{orderDetails?.receiverName}</span>
          {/* Receiver Email */}
          <span>Receiver Email :{orderDetails?.receiverEmail}</span>
          {/* price */}
          <span>price : ${orderDetails?.price}</span>
          {/* Payment Status */}
          <span> Payment Status :{orderDetails?.paymentStatus}</span>
          {/* Order Status */}
          <span> Order Status :{orderDetails?.orderStatus}</span>
          {/* Delivery Address */}
          <span>Delivery Address :{orderDetails?.address}</span>

          <span
            className="border-b border-black text-lg pb-0 text-gray-800 font-semibold cursor-pointer
          mt-[1rem] w-max "
          >
            Have A Problem ? Contact Us
          </span>
        </div>
      </div>
      <div className="max-w-[40%]">
        <Orderinfo orderDetails={orderDetails} />
      </div>
    </div>
  );
}
