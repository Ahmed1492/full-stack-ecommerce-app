"use client";
import Image from "next/image";
import React from "react";
import { media as wixMedia } from "@wix/sdk";
import Link from "next/link";
import { split } from "postcss/lib/list";

export default function Orderinfo({ orderDetails }) {
  return (
    <div className="flex items-center flex-wrap gap-[2rem]">
      {orderDetails?.selectedItem?.map((item) => {
        let itemUrl = item?.productName
          ?.toLowerCase()
          .replace(/\s+/g, "-") // replace spaces with "-"
          .replace(/[^\w\-]+/g, "") // remove special characters
          .replace(/\-\-+/g, "-") // replace multiple dashes with one
          .trim();
        console.log("====================================");
        console.log("url ", itemUrl);
        console.log("====================================");
        return (
          <Link
            href={`/product/${itemUrl}`}
            key={item?.id}
            className="flex flex-col items-centers gap-7  justifys-between "
          >
            <div className="w-[9rem] h-[9rem] relative ">
              <Image
                src={wixMedia.getScaledToFillImageUrl(item.img, 360, 480, {})}
                alt=""
                fill
                className="absolute object-cover rounded-md"
              />
            </div>
            {/* RIGHT */}
            <div className="flex justify-center flex-col gap-2">
              <span className="max-w-60 font-medium  text-lg">
                <span>{item?.productName?.slice(0, 9) + "..."}</span>
              </span>
              <span>${item.price}</span>

              <span className=" text-gray-500  font-normal  ">
                Qty.{item?.quantity}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
