"use client";

import { useNotificationStore } from "@/hooks/userNotificationsSrore";
import { useWixClient } from "@/hooks/useWixClient";
import { media as wixMedia } from "@wix/sdk";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Notifications({ onClose }) {
  const wixClient = useWixClient();
  const { getNotifications, notifications, isLoading, removeNotification } =
    useNotificationStore();

  const isLoggedIn = wixClient.auth.loggedIn();

  useEffect(() => {
    if (isLoggedIn) getNotifications();
  }, [isLoggedIn]);

  const items = isLoggedIn ? notifications : [];

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3 animate-pulse w-72">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex gap-3 items-center">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex-shrink-0" />
            <div className="flex-1 flex flex-col gap-1.5">
              <div className="h-3 bg-gray-100 rounded w-3/4" />
              <div className="h-3 bg-gray-100 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="flex flex-col items-center gap-2 py-6 text-gray-400 w-64">
        <Image src="/notification.svg" alt="" width={32} height={32} className="opacity-30" />
        <p className="text-sm">No notifications yet</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 w-72">
      {items.map((item, index) => {
        const productPath = item.productName.split(" ").join("-").toLowerCase();
        return (
          <div key={index} className="flex items-start gap-3 px-2 py-2.5 rounded-xl hover:bg-gray-50 transition group">
            <Link href={`/product/${productPath}`} onClick={onClose} className="flex items-start gap-3 flex-1 min-w-0">
              {item.productImage ? (
                <div className="relative w-10 h-10 flex-shrink-0 rounded-full overflow-hidden bg-gray-100">
                  <Image
                    src={wixMedia.getScaledToFillImageUrl(item.productImage, 80, 80, {})}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0 text-sm">
                  🛍️
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-700 leading-snug">
                  Thanks for buying{" "}
                  <span className="font-semibold text-[#D02E64]">
                    {item.productName.length > 12
                      ? item.productName.slice(0, 12) + "..."
                      : item.productName}
                  </span>
                  ! Drop a review?
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{item.date}</p>
              </div>
            </Link>
            <button
              onClick={() => removeNotification(item.id)}
              className="text-gray-300 hover:text-red-400 transition text-xs opacity-0 group-hover:opacity-100 flex-shrink-0 mt-1"
              title="Dismiss"
            >
              ✕
            </button>
          </div>
        );
      })}
    </div>
  );
}
