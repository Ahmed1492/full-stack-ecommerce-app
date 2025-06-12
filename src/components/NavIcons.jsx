"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import ShoppingProductList from "@/components/ShoppingProductList";
import { useWixClient } from "@/hooks/useWixClient";
import Cookies from "js-cookie";
import { useCartStore } from "@/hooks/userCartStore";
export default function NavIcons() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [total, setTotal] = useState(0);

  const router = useRouter();
  const wixClient = useWixClient();

  // let isLoggedIn = wixClient.auth.loggedIn();

  const pathName = usePathname();
  // console.log("====================================");
  // console.log("pathName ", pathName);
  console.log("isLoggedIn ", isLoggedIn);
  // console.log("====================================");
  const handleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleCart = () => {
    setIsProfileOpen(false);
    setIsCartOpen((prev) => !prev);
  };
  const handleLogOut = async () => {
    Cookies.remove("refreshToken");
    setIsLoading(true);
    setIsLoggedIn(false); // Update local state immediately
    try {
      await wixClient.auth.logout(); // Important!
      const status = await wixClient.auth.loggedIn();
      console.log("Still logged in after logout?", status); // Should be false
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsProfileOpen(false);
      router.push("/login");
    }
  };

  const { getCart, counter, cart } = useCartStore();
  const getCart2 = async () => {
    getCart(wixClient);
  };

  useEffect(() => {
    getCart(wixClient);
  }, []);

  useEffect(() => {
    const checkLogin = async () => {
      const status = await wixClient.auth.loggedIn();
      setIsLoggedIn(status);
    };
    checkLogin();
  }, [pathName, isLoggedIn]);

  useMemo(() => {
    if (cart?.lineItems) {
      let totalCart = cart.lineItems.reduce((sum, item) => {
        return sum + item.quantity * +item.price.amount;
      }, 0);

      setTotal(totalCart);
      // console.log("Total from nav:", total);
    }
  }, [cart?.lineItems]);

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
          // href="/profile"
          // onClick={login}
        />
        {isProfileOpen &&
          (isLoggedIn ? (
            <>
              <div className="flex flex-col gap-3 shadow-lg bg-white rounded-md px-4 py-3 absolute top-8 min-w-36 font-medium -left-9 z-30 ">
                <Link
                  className={`hover:text-[#D02E64] ${
                    pathName === "/profile" && "text-[#D02E64]"
                  } `}
                  href="/profile"
                >
                  Profile
                </Link>
                <span
                  onClick={handleLogOut}
                  className="cursor-pointer hover:text-[#D02E64] "
                >
                  {isLoading ? "loading..." : "LogOut"}
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-3 shadow-lg bg-white rounded-md px-4 py-3 absolute top-8 min-w-36 font-medium -left-9 z-30 ">
                <Link
                  className={`hover:text-[#D02E64] ${
                    pathName === "/login" && "text-[#D02E64]"
                  } `}
                  href="/login"
                >
                  Log in
                </Link>
              </div>
            </>
          ))}
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
          <div className="flex flex-col   gap-5 shadow-2xl bg-white min-w-max rounded-lg p-4 absolute top-9 font-medium -right-2 z-30 ">
            <h2 className="text-2xl my-3">Shopping Cart</h2>
            <Suspense fallback="Loading...">
              <ShoppingProductList />
            </Suspense>

            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">Subtotal</span>
                <span className="text-lg font-bold">${total || 0}</span>
              </div>
              <p className="text-gray-500 font-medium">
                Lorem ipsum dolor sit amet.
              </p>
              <div className="flex items-center justify-between mt-6">
                <button className="bg-white  border-1   border-gray-400 border hover:bg-black hover:text-white  transition-all duration-200 text-sm py-3 px-3 rounded-md">
                  View Cart
                </button>

                {cart?.lineItems && (
                  <Link
                    href={cart?.lineItems?.length == 0 ? pathName : "/checkout"}
                    className={`${
                      cart.lineItems.length === 0
                        ? "bg-slate-300 cursor-not-allowed"
                        : "bg-black text-white  hover:bg-white hover:text-black "
                    }   border text-sm    transition-all duration-200  py-3 px-3 rounded-md`}
                  >
                    Checkout
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
