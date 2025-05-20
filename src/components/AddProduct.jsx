"use client";

import { useWixClient } from "@/hooks/useWixClient";
import { useState } from "react";

export default function AddProduct({
  productId,
  variantId,
  stockNumber,
  quantity,
  setQuantity,
}) {
  const wixClient = useWixClient();
  const addItem = async () => {
    console.log("productId ", productId);
    console.log("variantId ", variantId);
    const response = await wixClient.currentCart.addToCurrentCart({
      lineItems: [
        {
          catalogReference: {
            appId: process.env.NEXT_PUBLIC_WIX_APP_ID,
            catalogItemId: productId,
            ...(variantId && { options: { variantId } }),
          },
          quantity: stockNumber,
        },
      ],
    });
  };
  // const [quantity, setQuantity] = useState(0);
  const handleIncrease = () => {
    if (quantity < stockNumber) {
      setQuantity((prev) => prev + 1);
    }
  };
  console.log("stockNumber ", stockNumber);

  const handleDecrease = () => {
    if (quantity !== 0) {
      setQuantity((prev) => prev - 1);
    }
  };
  return (
    <div className="flex flex-col gap-5">
      {stockNumber < 1 ? (
        <div className="text-red-600 ">Product Is Out Of Stock</div>
      ) : (
        <>
          <h3 className="font-medium text-xl">Choose a Quantity </h3>
          <div className="flex items-center gap-8">
            {/* COUNTER */}
            <div className="flex items-center justify-between w-[95%]">
              <div className="flex flex-col gap-5 items-center">
                <div className="flex items-center gap-8">
                  <div className="bg-gray-100 rounded-3xl px-[17px] py-[10px] text-lg flex items-center gap-10  ">
                    <button onClick={handleDecrease}>-</button>
                    <span>{quantity}</span>
                    <button onClick={handleIncrease}>+</button>
                  </div>

                  <div className="text-sm">
                    Only{" "}
                    <span className="text-[#b54f46]">{stockNumber} items</span>{" "}
                    left! <br />
                    Dont miss it
                  </div>
                </div>
              </div>
              <button
                onClick={addItem}
                className="border border-[#b54f46] w-[8rem] py-3 text-sm font-medium text-[#b54f46] rounded-2xl"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
