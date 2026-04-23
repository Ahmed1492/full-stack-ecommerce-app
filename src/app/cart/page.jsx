"use client";
import { useCartStore } from "@/hooks/userCartStore";
import { useWixClient } from "@/hooks/useWixClient";
import { media as wixMedia } from "@wix/sdk";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

export default function CartPage() {
  const { cart, removeItem, isLoading } = useCartStore();
  const wixClient = useWixClient();
  const router = useRouter();

  const total = useMemo(() => {
    if (!cart?.lineItems) return 0;
    return cart.lineItems.reduce(
      (sum, item) => sum + item.quantity * +item.price.amount,
      0
    );
  }, [cart?.lineItems]);

  if (isLoading) return <CartSkeleton />;

  if (!cart?.lineItems?.length) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <Image src="/cart2.svg" alt="" width={64} height={64} className="opacity-30" />
        <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
        <p className="text-gray-400 text-sm">Looks like you haven&apos;t added anything yet.</p>
        <Link
          href="/list"
          className="mt-2 px-6 py-3 bg-[#D02E64] text-white rounded-xl text-sm font-medium hover:bg-[#b02555] transition"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <p className="text-gray-400 text-sm mt-1">
              {cart.lineItems.length} {cart.lineItems.length === 1 ? "item" : "items"}
            </p>
          </div>
          <Link href="/list" className="text-sm text-[#D02E64] hover:underline">
            ← Continue Shopping
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Items */}
          <div className="flex-1 flex flex-col gap-4">
            {cart.lineItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-5"
              >
                {item.image && (
                  <div className="relative w-20 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50">
                    <Image
                      src={wixMedia.getScaledToFillImageUrl(item.image, 160, 192, {})}
                      alt={item.productName?.original || ""}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 truncate">
                    {item.productName?.original}
                  </p>
                  <p className="text-xs text-gray-400 mt-1 capitalize">
                    {item.availability?.status?.toLowerCase()}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</p>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <span className="font-bold text-gray-900 text-lg">
                    ${(item.quantity * +item.price.amount).toFixed(2)}
                  </span>
                  <button
                    onClick={() => removeItem(wixClient, item._id)}
                    className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 transition"
                  >
                    <Image src="/delete-red.svg" alt="" width={14} height={14} />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="w-full lg:w-80 sticky top-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-800">Order Summary</h3>
              </div>

              <div className="px-6 py-4 flex flex-col gap-3">
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

              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                <span className="font-bold text-gray-900">Total</span>
                <span className="font-bold text-xl text-gray-900">${total.toFixed(2)}</span>
              </div>

              <div className="px-6 py-5">
                <button
                  onClick={() => router.push("/checkout")}
                  className="w-full py-3.5 bg-[#D02E64] text-white rounded-xl font-semibold text-sm hover:bg-[#b02555] active:scale-[0.99] transition"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto px-4 flex flex-col gap-4 animate-pulse">
        <div className="h-8 w-48 bg-gray-200 rounded-lg" />
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 flex gap-5 h-28">
            <div className="w-20 h-full bg-gray-100 rounded-xl" />
            <div className="flex-1 flex flex-col gap-2 justify-center">
              <div className="h-4 bg-gray-100 rounded w-2/3" />
              <div className="h-3 bg-gray-100 rounded w-1/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
