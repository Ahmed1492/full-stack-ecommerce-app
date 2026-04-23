"use client";
import { useCartStore } from "@/hooks/userCartStore";
import { useWixClient } from "@/hooks/useWixClient";
import { useState } from "react";

export default function AddProduct({ productId, variantId, stockNumber }) {
  const wixClient = useWixClient();
  const isLoggedIn = wixClient.auth.loggedIn();
  const { addItem } = useCartStore();

  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [added, setAdded] = useState(false);

  if (stockNumber < 1) {
    return (
      <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-2xl px-4 py-3">
        <span className="text-red-400 text-lg">⚠️</span>
        <p className="text-red-500 font-medium text-sm">Out of Stock</p>
      </div>
    );
  }

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      await addItem(wixClient, productId, variantId, quantity, isLoggedIn);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-700 text-sm">Quantity</h3>
        <span className="text-xs text-orange-500 font-medium bg-orange-50 px-2 py-1 rounded-full">
          {stockNumber} left in stock
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* Counter */}
        <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden select-none">
          <button
            onClick={() => setQuantity((p) => Math.max(1, p - 1))}
            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition text-lg font-medium"
          >
            −
          </button>
          <span className="w-10 text-center text-sm font-semibold text-gray-800">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((p) => Math.min(stockNumber, p + 1))}
            disabled={quantity >= stockNumber}
            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:text-gray-300 transition text-lg font-medium"
          >
            +
          </button>
        </div>

        {/* Add to cart */}
        <button
          onClick={handleAddToCart}
          disabled={isLoading}
          className={`flex-1 py-3 rounded-xl font-semibold text-sm transition flex items-center justify-center gap-2 ${
            added
              ? "bg-green-500 text-white"
              : isLoading
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-[#D02E64] hover:bg-[#b02555] active:scale-[0.98] text-white"
          }`}
        >
          {isLoading ? (
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          ) : added ? (
            "✓ Added to Cart"
          ) : (
            "Add to Cart"
          )}
        </button>
      </div>
    </div>
  );
}
