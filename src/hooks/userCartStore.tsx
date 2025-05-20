import { WixClientType } from "@/context/wixContext";
import { cart, currentCart } from "@wix/ecom";
import { create } from "zustand";

type CartItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image?: string; // optional
  variantId?: string; // optional
};

type CartState = {
  cart: currentCart.Cart;

  isLoading: boolean;
  counter: number;

  getCart: (wixClient: WixClientType) => Promise<void>;
  addItem: (
    wixClient: WixClientType,
    productId: string,
    variantId: string,
    quantity: number
  ) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
};

export const useCartStore = create<CartState>((set) => ({
  cart: [] as currentCart.Cart,
  isLoading: true,
  counter: 0,

  getCart: async (wixClient) => {
    const fetchedCart = await wixClient.currentCart.getCurrentCart();
    set({
      cart: fetchedCart || ([] as currentCart.Cart),
      isLoading: false,
      counter: fetchedCart?.lineItems?.length || 0,
    });
  },

  addItem: async (wixClient, productId, variantId, quantity) => {
    // // Add item to cart via wixClient API
    // await wixClient.currentCart.addLineItem({
    //   productId,
    //   variantId,
    //   quantity,
    // });

    // Refresh cart after adding
    const updatedCart = await wixClient.currentCart.getCurrentCart();
    set({
      cart: updatedCart || ({} as currentCart.Cart),
      counter: updatedCart?.lineItems?.length || 0,
    });
  },

  removeItem: async (itemId) => {
    // Assuming you have access to wixClient here or passed similarly
    // You might need to change signature to pass wixClient here as well
    // Example signature change:
    // removeItem: async (wixClient: WixClientType, itemId: string) => { ... }
    // For demo, assume wixClient is globally accessible or passed somehow
    // Replace with actual implementation
    // await wixClient.currentCart.removeLineItem(itemId);
    // Refresh cart after removing
    // const updatedCart = await wixClient.currentCart.getCurrentCart();
    // set({
    //   cart: updatedCart || ({} as currentCart.Cart),
    //   counter: updatedCart?.lineItems?.length || 0,
    // });
  },
}));
