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

  removeItem: (itemId: string, wixClient: WixClientType) => Promise<void>;
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
    set({ isLoading: true });

    if (!wixClient || !wixClient.currentCart) {
      console.error("Invalid wixClient or currentCart is undefined");
      set({ isLoading: false });
      return;
    }

    try {
      const response =
        await wixClient.currentCart.removeLineItemsFromCurrentCart([itemId]);

      if (response?.cart) {
        set({
          cart: response.cart,
          counter: response.cart.lineItems?.length || 0,
          isLoading: false,
        });
      } else {
        console.warn("No cart returned in removeItem response");
        set({ isLoading: false });
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
      set({ isLoading: false });
    }
  },
}));
