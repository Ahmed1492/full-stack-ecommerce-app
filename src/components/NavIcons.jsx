"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ShoppingProductList from "@/components/ShoppingProductList";
import { useWixClient } from "@/hooks/useWixClient";
import Cookies from "js-cookie";
import { useCartStore } from "@/hooks/userCartStore";
export default function NavIcons() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const wixClient = useWixClient();

  let isLoggedIn = wixClient.auth.loggedIn();

  const pathName = usePathname();
  // console.log("====================================");
  // console.log("pathName ", pathName);
  // console.log("====================================");
  const handleProfile = () => {
    if (pathName === "/") {
      setIsCartOpen(false);

      setIsProfileOpen((prev) => !prev);
    } else {
      router.push("/login");
    }
  };

  const handleCart = () => {
    setIsProfileOpen(false);
    setIsCartOpen((prev) => !prev);
  };
  const handleLogOut = async () => {
    Cookies.remove("refreshToken");
    setIsLoading(true);

    try {
      // const { logOut } = await wixClient.auth.logout(window.location.href);
      router.push("/login");
      // router.push(logOut);
    } catch (error) {
      console.log(error);
    } finally {
      await setIsLoading(false);
      await setIsProfileOpen(false);
    }
  };

  const { getCart, counter, cart } = useCartStore();
  const getCart2 = async () => {
    getCart(wixClient);
  };

  useEffect(() => {
    console.log("cart ", cart);
    getCart(wixClient);
  }, [getCart]);

  return (
    <div className="flex items-center  gap-6">
      <div className="relative min-w-9 ">
        <Image
          className="cursor-pointer "
          src="/profile.png"
          alt=""
          width={22}
          height={22}
          onClick={handleProfile}
          // onClick={login}
        />
        {isProfileOpen && (
          <div className="flex flex-col gap-3 shadow-lg bg-white rounded-md px-4 py-3 absolute top-8 min-w-36 font-medium -left-9 z-30 ">
            <Link href="/profile">Profile</Link>
            <span onClick={handleLogOut} className="cursor-pointer ">
              {isLoading ? "loading..." : "LogOut"}
            </span>
          </div>
        )}
      </div>

      <Image
        className="cursor-pointer "
        src="/notification.png"
        alt=""
        width={22}
        height={22}
      />

      <div className="relative min-w-9 ">
        <Image
          className="cursor-pointer  "
          src="/cart.png"
          alt=""
          width={22}
          height={22}
          onClick={handleCart}
        />
        <span className="absolute -top-2 left-3 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-sm text-white">
          {counter}
        </span>
        {isCartOpen && (
          <div className="flex flex-col gap-5 shadow-2xl bg-white min-w-max rounded-lg p-4 absolute top-9 font-medium -right-2 z-30 ">
            <h2 className="text-2xl my-3">Shopping Cart</h2>

            <ShoppingProductList />

            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">Subtotal</span>
                <span className="text-lg font-bold">$18</span>
              </div>
              <p className="text-gray-500 font-medium">
                Lorem ipsum dolor sit amet.
              </p>
              <div className="flex items-center justify-between mt-6">
                <button className="bg-white  border-1   border-gray-400 border hover:bg-black hover:text-white  transition-all duration-200 text-sm py-3 px-3 rounded-md">
                  View Cart
                </button>
                <button className="bg-black  border text-sm hover:bg-white hover:text-black  transition-all duration-200 text-white py-3 px-3 rounded-md">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
