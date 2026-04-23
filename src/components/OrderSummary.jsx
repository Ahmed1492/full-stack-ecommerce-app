"use client";
import { useCartStore } from "@/hooks/userCartStore";
import { media as wixMedia } from "@wix/sdk";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";

const OrderSummary = ({ user }) => {
  const { cart } = useCartStore();

  const total = useMemo(() => {
    if (!cart?.lineItems) return 0;
    return cart.lineItems.reduce(
      (sum, item) => sum + item.quantity * +item.price.amount, 0
    );
  }, [cart?.lineItems]);

  const shipping = 0;
  const tax = 0;

  if (!cart?.lineItems?.length) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
        <p className="text-gray-400 text-sm">Your cart is empty.</p>
        <Link href="/list" className="text-[#D02E64] text-sm underline mt-2 inline-block">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-semibold text-gray-800">
          Order Summary
          <span className="ml-2 text-xs font-normal text-gray-400">
            ({cart.lineItems.length} {cart.lineItems.length === 1 ? "item" : "items"})
          </span>
        </h3>
        <Link href="/cart" className="text-xs text-[#D02E64] hover:underline font-medium">
          Edit Cart
        </Link>
      </div>

      {/* Items */}
      <div className="px-6 py-4 flex flex-col gap-4 max-h-72 overflow-y-auto scrollbar-hidden">
        {cart.lineItems.map((item) => (
          <div key={item._id} className="flex items-center gap-3">
            {item.image && (
              <div className="relative w-14 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-50">
                <Image
                  src={wixMedia.getScaledToFillImageUrl(item.image, 112, 128, {})}
                  alt={item.productName?.original || ""}
                  fill
                  className="object-cover"
                />
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#D02E64] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {item.quantity}
                </span>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">
                {item.productName?.original}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">Qty {item.quantity}</p>
            </div>
            <span className="text-sm font-semibold text-gray-800 flex-shrink-0">
              ${(item.quantity * +item.price.amount).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* Promo Code */}
      <div className="px-6 pb-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Promo code"
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#D02E64] transition"
          />
          <button className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-700 transition">
            Apply
          </button>
        </div>
      </div>

      {/* Totals */}
      <div className="px-6 py-4 border-t border-gray-100 flex flex-col gap-2.5">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Shipping</span>
          <span className="text-green-600 font-medium">Free</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Tax</span>
          <span>$0.00</span>
        </div>
      </div>

      {/* Grand Total */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
        <span className="font-bold text-gray-900">Total</span>
        <span className="font-bold text-xl text-gray-900">${total.toFixed(2)}</span>
      </div>

      {/* Payment icons */}
      <div className="px-6 py-3 border-t border-gray-100 flex items-center gap-2 justify-center">
        {["/visa.png", "/mastercard.png", "/paypal.png"].map((src) => (
          <Image key={src} src={src} alt="" width={36} height={22} className="object-contain opacity-60" />
        ))}
      </div>
    </div>
  );
};

export default OrderSummary;
