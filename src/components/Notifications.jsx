"use client";

import { useCartStore } from "@/hooks/userCartStore";
import { useNotificationStore } from "@/hooks/userNotificationsSrore";
import { useWixClient } from "@/hooks/useWixClient";
import { media as wixMedia } from "@wix/sdk";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Notifications() {
  const wixClient = useWixClient();
  const { cart, removeItem } = useCartStore();
  const { getNotifications, notifications, isLoading, counter } =
    useNotificationStore();
  const [allNot, setAllNot] = useState([]);

  useEffect(() => {
    getNotifications(); // fetch and store in Zustand
  }, []);
  let isLoggedIn = wixClient.auth.loggedIn();
  useEffect(() => {
    if (isLoggedIn) {
      setAllNot(notifications); // update local state when Zustand changes
    } else {
      setAllNot([]);
      if (localStorage.getItem("notifications")) {
        localStorage.removeItem("notifications");
      }
    }
  }, [notifications, isLoggedIn]);

  console.log("====================================");
  console.log("all ", allNot);
  console.log("couter ", counter);
  console.log("====================================");
  return (
    <div className="flex flex-col  gap-9">
      {isLoading ? (
        "Loading...."
      ) : !allNot || allNot?.length <= 0 ? (
        <div>there is no notifications</div>
      ) : (
        allNot?.map((item, index) => {
          let productPath = item.productName.split(" ").join("-").toLowerCase();

          return (
            <Link
              href={`/product/${productPath}`}
              key={index}
              className="flex min-w-[20rem] hover:bg-slate-100 duration-500 py-1 px-2 rounded-md cursor-pointer items-center gap-2  "
            >
              {item.productImage && (
                <Image
                  src={wixMedia.getScaledToFillImageUrl(
                    item.productImage,
                    50,
                    50,
                    {}
                  )}
                  alt=""
                  width={50}
                  height={50}
                  className="w-10 h-10 object-cover rounded-full"
                />
              )}
              {/* RIGHT */}
              <div className="">
                <span className=" cursor-pointer font-medium  text-[15px]    ">
                  Thanks for buying
                  <span className="text-[#D02E64] font-bold">
                    {" "}
                    {item?.productName?.length > 6
                      ? item.productName?.slice(0, 6) + "..."
                      : item?.productName}{" "}
                    !{" "}
                  </span>
                  Drop a review?
                </span>
              </div>
            </Link>
          );
        })
      )}
      {/* LEFT */}
    </div>
  );
}
