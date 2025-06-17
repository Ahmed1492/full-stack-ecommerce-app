"use client";
import { useCartStore } from "@/hooks/userCartStore";
import { useWixClient } from "@/hooks/useWixClient";

export default function AddToCart({
  productId,
  variantId,
  quantity = 1,
  item,
}) {
  const { addItem } = useCartStore();
  const wixClient = useWixClient();

  const isLoggedIn = wixClient.auth.loggedIn();

  const handleClick = async () => {
    let newObj = {
      wixClient,
      productId,
      variantId,
      quantity,
      isLoggedIn,
    };
    try {
      await addItem(
        wixClient,
        productId,
        variantId, 
        quantity,
        isLoggedIn
      );
      console.log("from global page ", newObj);
    } catch (err) {
      console.error("❌ Failed to add item:", err);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 text-sm py-2 bg-transparent border border-red-400 text-red-400 rounded-2xl mt-2"
    >
      Add to Cart
    </button>
  );
}
