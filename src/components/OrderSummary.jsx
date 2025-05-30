"use client";
import { useCartStore } from "@/hooks/userCartStore";
import { useWixClient } from "@/hooks/useWixClient";
import { media as wixMedia } from "@wix/sdk";
import Image from "next/image";
import React, { useEffect } from "react";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
const OrderSummary = () => {
  const { cart } = useCartStore();
  // let result = getCart();

  console.log("cart ,", cart.lineItems);

  return (
    <div className="bg-slate-200 rounded-md py-2 px-3">
      <div className="flex my-4 items-center border-b-2 border-slate-300   pb-4 justify-between">
        <h3>Order Summary (1)</h3>
        <button>Edit Cart</button>
      </div>
      {cart?.lineItems?.map((item) => (
        <div
          key={item?._id}
          className="flex  gap-7 border-b-2 border-slate-300   pb-4   justify-between "
        >
          <div className="flex items-center gap-4">
            {item.image && (
              <Image
                src={wixMedia.getScaledToFillImageUrl(item.image, 72, 96, {})}
                alt=""
                width={80}
                height={96}
                className="w-20 h-24 object-cover rounded-md"
              />
            )}

            <div className="flex  flex-col gap-2">
              <div className="flex items-center justify-between gap-12">
                <span className="max-w-60 font-medium  text-lg">
                  {item?.productName?.original}
                </span>
              </div>
              <div className="flex items-center justify-between gap-7">
                <span className=" text-gray-500  font-normal  ">
                  Qty.{item?.quantity}
                </span>
              </div>
            </div>
          </div>
          <span className="mt-5">${item.price.amount}</span>

          {/* RIGHT */}
        </div>
      ))}

      <div className="border-b-2 border-slate-300   pb-4 ">
        <div className="flex items-center  justify-between">
          <span className="font-medium mt-3 text-gray-800">Subtitle</span>
          <span className="font-medium mt-3 text-gray-800">$0.00</span>
        </div>
        <div className="flex items-center  justify-between">
          <span className="font-medium mt-3 text-gray-800">Delivery</span>
          <span className="font-medium mt-3 text-gray-800">
            <span className="w-12 h-1 bg-red-600 "></span>
            ____
          </span>
        </div>
        <div className="flex items-center  justify-between">
          <span className="font-medium mt-3 text-gray-800">Sale Tex</span>
          <span className="font-medium mt-3 text-gray-800">$0.00</span>
        </div>
      </div>
      <div className="flex items-center pb-4  justify-between">
        <span className="font-medium mt-3 text-gray-800">Total</span>
        <span className="font-medium mt-3 text-gray-800">$0.00</span>
      </div>
    </div>
  );
};

export default OrderSummary;
