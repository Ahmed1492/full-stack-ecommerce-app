"use client";

import { useCartStore } from "@/hooks/userCartStore";
import { useWixClient } from "@/hooks/useWixClient";
import { media as wixMedia } from "@wix/sdk";
import Image from "next/image";
import React, { useEffect } from "react";

export default function ShoppingProductList() {
  const wixClient = useWixClient();
  const { isLoading, cart, removeItem, moveGuestCartToUser } = useCartStore();

  useEffect(() => {
    moveGuestCartToUser(wixClient);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 animate-pulse px-1">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex gap-3 items-center">
            <div className="w-14 h-16 bg-gray-100 rounded-xl flex-shrink-0" />
            <div className="flex-1 flex flex-col gap-2">
              <div className="h-3 bg-gray-100 rounded w-3/4" />
              <div className="h-3 bg-gray-100 rounded w-1/2" />
              <div className="h-3 bg-gray-100 rounded w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!cart?.lineItems?.length) {
    return (
      <div className="flex flex-col items-center gap-3 py-6 text-gray-400">
        <Image
          src="/cart2.svg"
          alt=""
          width={40}
          height={40}
          className="opacity-30"
        />
        <p className="text-sm">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {cart.lineItems.map((item) => (
        <div
          key={item._id}
          className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition group"
        >
          {item.image && (
            <div className="relative w-14 h-16 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
              <Image
                src={wixMedia.getScaledToFillImageUrl(item.image, 112, 128, {})}
                alt={item.productName?.original || ""}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800 truncate leading-snug">
              {item.productName?.original}
            </p>
            <p className="text-xs text-gray-400 mt-0.5 capitalize">
              {item.availability?.status?.toLowerCase()}
            </p>
            <div className="flex items-center justify-between mt-1.5">
              <span className="text-xs text-gray-500">Qty {item.quantity}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeItem(wixClient, item._id);
                }}
                className="text-xs text-red-400 hover:text-red-600 transition opacity-0 group-hover:opacity-100"
              >
                Remove
              </button>
            </div>
          </div>

          <span className="text-sm font-semibold text-gray-800 flex-shrink-0">
            ${(item.quantity * +item.price.amount).toFixed(2)}
          </span>
        </div>
      ))}
    </div>
  );
}
