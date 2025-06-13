"use client";

import { useCartStore } from "@/hooks/userCartStore";
import { useWixClient } from "@/hooks/useWixClient";
import { media as wixMedia } from "@wix/sdk";
import Image from "next/image";
import React, { useEffect } from "react";

export default function ShoppingProductList() {
  const wixClient = useWixClient();

  const { isLoading, cart, removeItem } = useCartStore();

  console.log("====================================");
  // console.log("isLoading", isLoading);
  console.log(cart.lineItems);

  useEffect(() => {
    // console.log("isLoading", isLoading);
  }, []);

  return (
    <div className="flex flex-col  gap-9">
      {isLoading ? (
        "Loading...."
      ) : !cart?.lineItems || cart?.lineItems?.length <= 0 ? (
        <div>Cart Is Empty</div>
      ) : (
        cart?.lineItems.map((item) => (
          <div key={item?._id} className="flex items-center gap-7  ">
            {item.image && (
              <Image
                src={wixMedia.getScaledToFillImageUrl(item.image, 72, 96, {})}
                alt=""
                width={80}
                height={96}
                className="w-20 h-24 object-cover rounded-md"
              />
            )}
            {/* RIGHT */}
            <div className="flex w-full   flex-col gap-2">
              <div className="flex items-center justify-between gap-12">
                <span className="max-w-48 font-medium  text-lg">
                  {item?.productName?.original}
                </span>
                <span>${item.price.amount}</span>
              </div>
              <span className="self-start font-normal text-gray-500 ">
                {item.availability.status}
              </span>
              <div className="flex items-center justify-between gap-7">
                <span className=" text-gray-500  font-normal  ">
                  Qty.{item?.quantity}
                </span>
                <span
                  onClick={() => removeItem(wixClient, item._id)}
                  className="text-[#254F93] cursor-pointer font-normal "
                >
                  Remove
                </span>
              </div>
            </div>
          </div>
        ))
      )}
      {/* LEFT */}
    </div>
  );
}
