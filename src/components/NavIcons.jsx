"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import ShoppingProductList from "@/components/ShoppingProductList";
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

  const cartRef = useRef(null);
  const profileRef = useRef(null);
  const notifRef = useRef(null);

  const router = useRouter();
  const wixClient = useWixClient();
  const pathName = usePathname();

  // Close dropdowns on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) setIsCartOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setIsProfileOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setIsNotificationsOpen(false);
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleProfile = () => {
    setIsCartOpen(false);
    setIsNotificationsOpen(false);
    setIsProfileOpen((prev) => !prev);
  };

  const handleCart = () => {
    setIsProfileOpen(false);
    setIsNotificationsOpen(false);
    setIsCartOpen((prev) => !prev);
  };

  const handleLogOut = async () => {
    Cookies.remove("refreshToken");
    setIsLoading(true);
    setIsLoggedIn(false);
    try {
      await wixClient.auth.logout();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsProfileOpen(false);
      router.push("/login");
    }
  };

  const { getNotifications, markAllSeen } = useNotificationStore();
  const { getCart, counter, cart } = useCartStore();
  const { counter: notCounter, clearNotifications } = useNotificationStore();

  const delteNotifications = () => {
    if (localStorage.getItem("notifications")) {
      localStorage.removeItem("notifications");
      clearNotifications();
    }
  };

  useEffect(() => { getCart(wixClient); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    const checkLogin = async () => {
      const status = await wixClient.auth.loggedIn();
      setIsLoggedIn(status);
    };
    checkLogin();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathName]);
  // getNotifications is called inside Notifications.jsx — no need to call it here too

  useMemo(() => {
    if (cart?.lineItems) {
      const totalCart = cart.lineItems.reduce(
        (sum, item) => sum + item.quantity * +item.price.amount, 0
      );
      setTotal(totalCart);
    }
  }, [cart?.lineItems]);

  return (
    <div className="flex items-center gap-6">

      {/* Profile */}
      <div className="relative min-w-9" ref={profileRef}>
        <Image
          className="cursor-pointer ms-[1rem] hover:opacity-75 transition"
          src="/profile.png"
          alt=""
          width={22}
          height={22}
          onClick={handleProfile}
        />
        {isProfileOpen && (
          <div className="absolute top-10 -right-2 z-30 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            {isLoggedIn ? (
              <>
                {/* User header */}
                <div className="px-4 py-3 bg-gradient-to-r from-[#D02E64] to-[#a0204a]">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      👤
                    </div>
                    <div className="min-w-0">
                      <p className="text-white text-xs font-semibold truncate">My Account</p>
                      <p className="text-pink-200 text-[10px] truncate">Manage your profile</p>
                    </div>
                  </div>
                </div>
                {/* Links */}
                <div className="p-2 flex flex-col gap-0.5">
                  <Link
                    href="/profile"
                    onClick={() => setIsProfileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                      pathName === "/profile" ? "bg-pink-50 text-[#D02E64]" : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Image src="/mprofile.svg" alt="" width={16} height={16} />
                    Profile
                  </Link>
                  <Link
                    href="/orders"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                  >
                    <Image src="/order.svg" alt="" width={16} height={16} />
                    My Orders
                  </Link>
                  <div className="h-px bg-gray-100 my-1" />
                  <button
                    onClick={handleLogOut}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition w-full text-left"
                  >
                    <Image src="/logout.svg" alt="" width={16} height={16} />
                    {isLoading ? "Signing out..." : "Sign Out"}
                  </button>
                </div>
              </>
            ) : (
              <div className="p-3 flex flex-col gap-2">
                <p className="text-xs text-gray-400 px-2 pt-1 pb-0.5">Not signed in</p>
                <Link
                  href="/login"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#D02E64] text-white text-sm font-semibold rounded-xl hover:bg-[#b02555] transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/login"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Notifications */}
      <div className="relative" ref={notifRef}>
        <Image
          className="cursor-pointer min-w-[22px] hover:opacity-75 transition"
          src="/notification.png"
          alt=""
          width={22}
          height={22}
          onClick={() => {
            setIsCartOpen(false);
            setIsProfileOpen(false);
            const opening = !isNotificationsOpen;
            setIsNotificationsOpen(opening);
            if (opening) markAllSeen();
          }}
        />
        <span className="absolute -top-2 left-3 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-xs text-white font-bold">
          {isLoggedIn ? notCounter : 0}
        </span>
        {isNotificationsOpen && (
          <div className="flex flex-col max-h-[34rem] overflow-y-auto gap-2 shadow-xl bg-white min-w-max rounded-xl p-4 absolute top-9 -right-2 z-30 border border-gray-100">
            <div className="flex items-center justify-between gap-4 mb-1">
              <div className="flex items-center gap-2">
                <Image src="/notification.svg" alt="" width={24} height={24} />
                <h2 className="text-lg font-semibold">Notifications</h2>
              </div>
              {notCounter !== 0 && (
                <button
                  onClick={delteNotifications}
                  className="text-xs text-blue-400 hover:text-blue-600 transition font-medium"
                >
                  Clear All
                </button>
              )}
            </div>
            <Suspense fallback={<p className="text-sm text-gray-400">Loading...</p>}>
              <Notifications onClose={() => setIsNotificationsOpen(false)} />
            </Suspense>
          </div>
        )}
      </div>

      {/* Cart */}
      <div className="relative min-w-9 z-50" ref={cartRef}>
        <Image
          className="cursor-pointer hover:opacity-75 transition"
          src="/cart.png"
          alt=""
          width={22}
          height={22}
          onClick={handleCart}
        />
        <span className="absolute -top-2 left-3 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-xs text-white font-bold">
          {counter}
        </span>

        {isCartOpen && (
          <div
            className="flex flex-col w-[22rem] max-h-[34rem] shadow-2xl bg-white rounded-2xl absolute top-10 -right-2 z-30 border border-gray-100 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cart Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Image src="/cart2.svg" alt="" width={22} height={22} />
                <h2 className="text-base font-semibold text-gray-800">Shopping Cart</h2>
                {counter > 0 && (
                  <span className="text-xs bg-gray-100 text-gray-500 rounded-full px-2 py-0.5">{counter}</span>
                )}
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition text-lg leading-none"
              >
                ✕
              </button>
            </div>

            {/* Items — scrollable */}
            <div className="flex-1 overflow-y-auto px-4 py-3 scrollbar-hidden">
              <ShoppingProductList />
            </div>

            {/* Footer */}
            {cart?.lineItems?.length > 0 && (
              <div className="border-t border-gray-100 px-5 py-4 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">Subtotal</span>
                  <span className="text-base font-bold text-gray-900">${total.toFixed(2)}</span>
                </div>
                <div className="flex gap-2">
                  <Link
                    href="/cart"
                    onClick={() => setIsCartOpen(false)}
                    className="flex-1 text-center py-2.5 rounded-xl border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
                  >
                    View Cart
                  </Link>
                  <Link
                    href="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="flex-1 text-center py-2.5 rounded-xl bg-[#D02E64] text-white text-sm font-medium hover:bg-[#b02555] transition"
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
