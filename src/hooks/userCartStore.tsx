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
<<<<<<< HEAD

  removeItem: (itemId: string, wixClient: WixClientType) => Promise<void>;
=======
  removeItem: (itemId: string) => Promise<void>;
>>>>>>> 71c62a656cc034351775fce1b829d4cf6aee78a2
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
<<<<<<< HEAD
    set((state) => ({ ...state, isLoading: true }));
    const response = await wixClient.currentCart.addToCurrentCart({
      lineItems: [
        {
          catalogReference: {
            appId: process.env.NEXT_PUBLIC_WIX_APP_ID,
            catalogItemId: productId,
            ...(variantId && { options: { variantId } }),
          },
          // Stock numer >> quantity
          quantity: quantity,
        },
      ],
    });

    set({
      cart: response.cart,
      counter: response.cart?.lineItems?.length,
      isLoading: false,
    });
  },
























  removeItem: async (wixClient, itemId) => {
    set((state) => ({ ...state, isLoading: true }));

    if (!wixClient || !wixClient.currentCart) {
      console.error("Invalid wixClient or currentCart is undefined");
      set((state) => ({ ...state, isLoading: false }));
      return;
    }

    try {
      const response =
        await wixClient.currentCart.removeLineItemsFromCurrentCart([itemId]);
      console.log("Removed item response:", response);

      if (response?.cart?.lineItems) {
        set({
          cart: response.cart,
          counter: response.cart.lineItems.length,
          isLoading: false,
        });
      } else {
        set((state) => ({ ...state, isLoading: false }));
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
      set((state) => ({ ...state, isLoading: false }));
    }
=======
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
>>>>>>> 71c62a656cc034351775fce1b829d4cf6aee78a2
  },
}));
