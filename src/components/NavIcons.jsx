"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import ShoppingProductList from "@/components/ShoppingProductList";
import SkeletonCart from "@/components/SkeletonCart";
import Notifications from "@/components/Notifications";
import { useWixClient } from "@/hooks/useWixClient";
import Cookies from "js-cookie";
import { useCartStore } from "@/hooks/userCartStore";
import { useNotificationStore } from "../hooks/userNotificationsSrore";

export default function NavIcons() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const [total, setTotal] = useState(0);

  const router = useRouter();
  const wixClient = useWixClient();

  // let isLoggedIn = wixClient.auth.loggedIn();

  const pathName = usePathname();
  // console.log("====================================");
  // console.log("pathName ", pathName);
  // console.log("isLoggedIn ", isLoggedIn);
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
      // console.log("Still logged in after logout?", status); // Should be false
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsProfileOpen(false);
      router.push("/login");
    }
  };
  const { getNotifications, notifications } = useNotificationStore();
  const { getCart, counter, cart } = useCartStore();

  const { counter: notCounter, clearNotifications } = useNotificationStore();

  const pathname = usePathname(); // tells us where we are now

  const [loading, setLoading] = useState(false);

  const handleCheckout = () => {
    if (!cart?.lineItems?.length) return;

    setLoading(true);
    router.push("/checkout");

    setTimeout(() => {
      setIsCartOpen(false);
      setLoading(false);
    }, 1000); // 3000ms = 3 seconds
  };

  const delteNotifications = () => {
    if (localStorage.getItem("notifications")) {
      localStorage.removeItem("notifications");
      clearNotifications();
    }
    return;
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

  useEffect(() => {
    getNotifications(); // fetch and store in Zustand
  }, []);

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
      <div className="relative  min-w-9 ">
        <Image
          className="cursor-pointer ms-[1rem] "
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
                  className={`duration-500 hover:text-[#D02E64] ${
                    pathName === "/profile" && "text-[#D02E64]"
                  } `}
                  href="/profile"
                >
                  <div className="flex items-center gap-2">
                    <Image src="/mprofile.svg" alt="" width={22} height={20} />
                    <span>Profile</span>
                  </div>
                </Link>
                <div className="flex items-center gap-2">
                  <Image src="/logout.svg" alt="" width={22} height={20} />
                  <span
                    onClick={handleLogOut}
                    className=" duration-500 cursor-pointer hover:text-[#D02E64] "
                  >
                    {isLoading ? "loading..." : "LogOut"}
                  </span>
                </div>
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
      <div className="relative">
        <Image
          className="cursor-pointer min-w-[22px] "
          src="/notification.png"
          alt=""
          width={22}
          height={22}
          onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
        />
        <span className="absolute -top-2 left-3 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-sm text-white">
          {isLoggedIn ? notCounter : 0}
        </span>
        {isNotificationsOpen && (
          <div className="flex flex-col max-h-[34rem] overflow-y-auto   gap-2 shadow-2xl bg-white min-w-max rounded-lg p-4 absolute top-9 font-medium -right-2 z-30 ">
            <div className="flex items-center gap-2">
              <Image src="/notification.svg" alt="" width={34} height={30} />
              <h2 className="text-2xl my-3">Notifications</h2>
            </div>
            {notCounter !== 0 && (
              <button
                onClick={delteNotifications}
                className="flex justify-end w-max text-left self-end text-blue-400 font-medium cursor-pointer"
              >
                Clear All
              </button>
            )}
            <Suspense fallback="Loading...">
              <Notifications />
            </Suspense>
          </div>
        )}
      </div>
      <div className="relative min-w-9 z-50 ">
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
          <div className="flex flex-col min-w-[23rem] max-h-[34rem] overflow-y-auto    gap-5 shadow-2xl bg-white  rounded-lg p-4 absolute top-9 font-medium -right-2 z-30 ">
            <div className="flex items-center gap-2">
              <Image src="/cart2.svg" alt="" width={34} height={30} />

              <h2 className="text-2xl my-3">Shopping Cart</h2>
            </div>

            <Suspense fallback={<SkeletonCart />}>
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
                  <button
                    onClick={handleCheckout}
                    disabled={loading || !cart?.lineItems?.length}
                    className={`border text-sm py-3 px-4 rounded-md transition-all duration-200 ${
                      cart?.lineItems?.length
                        ? "bg-black text-white hover:bg-white hover:text-black"
                        : "bg-slate-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {loading ? "Loading..." : "Checkout"}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
