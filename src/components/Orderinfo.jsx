"use client";
import Image from "next/image";
import Link from "next/link";
import { media as wixMedia } from "@wix/sdk";

export default function Orderinfo({ orderDetails }) {
  if (!orderDetails?.selectedItem?.length) {
    return <p className="text-sm text-gray-400">No items found.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {orderDetails.selectedItem.map((item) => {
        const itemUrl = item?.productName
          ?.toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]+/g, "")
          .replace(/--+/g, "-")
          .trim();

        let imgSrc = null;
        try {
          if (item.img) imgSrc = wixMedia.getScaledToFillImageUrl(item.img, 160, 160, {});
        } catch {}

        return (
          <Link
            href={`/product/${itemUrl}`}
            key={item?.id}
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition group"
          >
            {/* Image */}
            <div className="relative w-14 h-14 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
              {imgSrc ? (
                <Image src={imgSrc} alt={item.productName || ""} fill className="object-cover" sizes="56px" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl">🛍️</div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate group-hover:text-[#D02E64] transition">
                {item.productName}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">Qty: {item.quantity}</p>
            </div>

            {/* Price */}
            <span className="text-sm font-bold text-gray-900 flex-shrink-0">
              ${(+item.price * item.quantity).toFixed(2)}
            </span>
          </Link>
        );
      })}

      {/* Subtotal */}
      <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
        <span className="text-xs text-gray-400">Subtotal</span>
        <span className="text-sm font-bold text-gray-900">
          ${orderDetails.selectedItem
            .reduce((s, i) => s + +i.price * i.quantity, 0)
            .toFixed(2)}
        </span>
      </div>
    </div>
  );
}
