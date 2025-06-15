"use client";
import { useCartStore } from "@/hooks/userCartStore";
import { useWixClient } from "@/hooks/useWixClient";

export default function AddToCart({ productId }) {
  const { addItem } = useCartStore();
  const wixClient = useWixClient();

  console.log("====== outside page =====");
  console.log("product id", productId);
  console.log("========= outside page =========");

  const handleClick = async () => {
    console.log("🛒 CLICKED:", productId);

    try {
      await addItem(
        wixClient,
        productId,
        "00000000-0000-0000-0000-000000000000", // or actual variantId
        1
      );
      console.log("✅ Item added successfully:", productId);
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
