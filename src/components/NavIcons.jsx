"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ShoppingProductList from "@/components/ShoppingProductList";
import { useWixClient } from "@/hooks/useWixClient";
export default function NavIcons() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const router = useRouter();
  const wixClient = useWixClient();

  let isLoggedIn = wixClient.auth.loggedIn();

  const handleProfile = () => {
    setIsCartOpen(false);
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      setIsProfileOpen((prev) => !prev);
    }
  };
  const handleCart = () => {
    setIsProfileOpen(false);
    setIsCartOpen((prev) => !prev);
  };
  useEffect(() => {
    // handleProfile();
  }, [isLoggedIn]);

  return (
    <div className="flex items-center  gap-6">
      <div className="relative min-w-9 ">
        <Image
          className="cursor-pointer "
          src="/profile.png"
          alt=""
          width={22}
          height={22}
          // onClick={handleProfile}
          // onClick={login}
        />
        {isProfileOpen && (
          <div className="flex flex-col gap-3 shadow-lg bg-white rounded-md px-4 py-3 absolute top-8 min-w-36 font-medium -left-9 z-30 ">
            <Link href="/">Profile</Link>
            <span>LogOut</span>
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
          2
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
