"use client";
import { useCartStore } from "@/hooks/userCartStore";
import axios from "axios";
import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useWixClient } from "@/hooks/useWixClient";
import { useNotificationStore } from "../hooks/userNotificationsSrore";
import Image from "next/image";

const COUNTRIES = [
  "Egypt", "United States", "United Kingdom", "Canada", "Germany",
  "France", "Saudi Arabia", "UAE", "Jordan", "Kuwait",
];

const PAYMENT_METHODS = [
  { id: "visa", label: "Visa", icon: "/visa.png" },
  { id: "mastercard", label: "Mastercard", icon: "/mastercard.png" },
  { id: "paypal", label: "PayPal", icon: "/paypal.png" },
];

const InputField = ({ label, name, type = "text", placeholder, onChange, required }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-medium text-gray-700">
      {label} {required && <span className="text-[#D02E64]">*</span>}
    </label>
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#D02E64] focus:ring-1 focus:ring-[#D02E64] transition bg-white"
    />
  </div>
);

const SectionCard = ({ step, title, children }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-5">
    <div className="flex items-center gap-3 mb-5">
      <span className="w-7 h-7 rounded-full bg-[#D02E64] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
        {step}
      </span>
      <h2 className="text-base font-semibold text-gray-800">{title}</h2>
    </div>
    {children}
  </div>
);

const CheckoutDetails = ({ user }) => {
  const { cart, resetCart } = useCartStore();
  const [isLoading, setLoading] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("visa");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const wixClient = useWixClient();
  const { addNotification } = useNotificationStore();

  const selectedItem = cart?.lineItems?.map((item) => ({
    id: item?.catalogReference?.catalogItemId,
    quantity: item?.quantity,
    productName: item.productName.original,
    price: item.price.amount,
    img: item.image,
    itemType: item.itemType.preset,
  })) || [];

  const [orderData, setOrderData] = useState({
    receiveId: user?.contactId || user?._id,
    phone: "",
    price: 0,
    address: "",
    receiverName: "",
    firstname: "",
    lastname: "",
    receiverEmail: user?.loginEmail,
    paymentStatus: "pending",
    orderStatus: "processing",
    selectedItem,
  });

  useMemo(() => {
    if (cart?.lineItems) {
      const total = cart.lineItems.reduce(
        (sum, item) => sum + item.quantity * +item.price.amount, 0
      );
      setOrderData((prev) => ({ ...prev, price: total }));
    }
  }, [cart?.lineItems]);

  const handleCollectData = (e) => {
    const { name, value } = e.target;
    setError("");
    setOrderData((prev) => {
      const updated = { ...prev, [name]: value };
      updated.receiverName = `${updated.firstname || ""} ${updated.lastname || ""}`.trim();
      return updated;
    });
  };

  const handleOrderNotification = (order) => {
    order?.selectedItem?.forEach((item) => {
      addNotification({
        id: `${order.receiveId}-${item.id}`,
        productName: item.productName,
        productImage: item.img,
        message: `Thanks for buying ${item.productName.slice(0, 6)}...! Drop a review?`,
        date: new Date().toLocaleString(),
      });
    });
  };

  const createNewUser = async () => {
    const newUser = {
      _id: user._id,
      email: user.loginEmail,
      username: user.profile?.slug,
      firstname: user.profile?.nickname,
      surname: "",
    };
    try {
      await axios.post(`/api/createUser`, newUser);
    } catch (error) {
      console.log(error);
    }
  };

  const createOrder = async () => {
    const response = await axios.post("/api/createOrder", orderData);
    if (response.data.result) {
      const orderId = response.data.result.orderId;
      // Show success animation then navigate
      setSuccess(true);
      await resetCart(wixClient);
      handleOrderNotification(orderData);
      setTimeout(() => router.push(`/orders/${orderId}`), 2200);
    }
  };

  const handleCheckout = async () => {
    if (!orderData.firstname || !orderData.address || !orderData.phone) {
      setError("Please fill in all required fields.");
      return;
    }
    try {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(`/api/user/${user.contactId}`);
        if (!response.data.success) await createNewUser();
      } catch {
        await createNewUser();
      }
      await createOrder();
    } catch (err) {
      console.log(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Success overlay */}
      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl px-10 py-12 flex flex-col items-center gap-5 max-w-sm mx-4 animate-[scaleIn_0.35s_ease-out]">
            {/* Animated checkmark */}
            <div className="relative w-24 h-24">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle
                  cx="50" cy="50" r="46"
                  fill="none" stroke="#D02E64" strokeWidth="6"
                  strokeDasharray="289" strokeDashoffset="289"
                  className="animate-[drawCircle_0.6s_ease-out_0.1s_forwards]"
                  style={{ strokeLinecap: "round" }}
                />
                <polyline
                  points="28,52 44,68 72,36"
                  fill="none" stroke="#D02E64" strokeWidth="6"
                  strokeDasharray="60" strokeDashoffset="60"
                  className="animate-[drawCheck_0.4s_ease-out_0.7s_forwards]"
                  style={{ strokeLinecap: "round", strokeLinejoin: "round" }}
                />
              </svg>
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900">Order Placed!</h2>
            <p className="text-gray-500 text-sm text-center leading-relaxed">
              Your order has been confirmed. We're preparing it for you right now.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Redirecting to your order...
            </div>
          </div>
        </div>
      )}

      {/* Account Info */}
      <div className="flex items-center justify-between bg-white border border-gray-100 rounded-2xl px-5 py-3.5 mb-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#D02E64] text-white text-xs font-bold flex items-center justify-center">
            {user?.loginEmail?.[0]?.toUpperCase() || "U"}
          </div>
          <div>
            <p className="text-xs text-gray-400">Logged in as</p>
            <p className="text-sm font-medium text-gray-800">{user?.loginEmail}</p>
          </div>
        </div>
        <span className="text-xs text-[#D02E64] font-medium bg-pink-50 px-3 py-1 rounded-full">
          Verified
        </span>
      </div>

      {/* Section 1 — Contact */}
      <SectionCard step="1" title="Contact Information">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField label="First Name" name="firstname" placeholder="John" onChange={handleCollectData} required />
          <InputField label="Last Name" name="lastname" placeholder="Doe" onChange={handleCollectData} />
          <InputField label="Phone" name="phone" type="tel" placeholder="+1 234 567 890" onChange={handleCollectData} required />
          <InputField label="Email" name="email" type="email" placeholder={user?.loginEmail} onChange={handleCollectData} />
        </div>
      </SectionCard>

      {/* Section 2 — Delivery */}
      <SectionCard step="2" title="Delivery Address">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              Country / Region <span className="text-[#D02E64]">*</span>
            </label>
            <select
              name="country"
              onChange={handleCollectData}
              className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#D02E64] focus:ring-1 focus:ring-[#D02E64] transition bg-white"
            >
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <InputField label="Street Address" name="address" placeholder="123 Main St" onChange={handleCollectData} required />

          <div className="grid grid-cols-2 gap-4">
            <InputField label="City" name="city" placeholder="Cairo" onChange={handleCollectData} />
            <InputField label="Zip / Postal Code" name="zip" placeholder="12345" onChange={handleCollectData} />
          </div>
        </div>
      </SectionCard>

      {/* Section 3 — Payment */}
      <SectionCard step="3" title="Payment Method">
        <div className="flex gap-3 flex-wrap">
          {PAYMENT_METHODS.map((method) => (
            <button
              key={method.id}
              type="button"
              onClick={() => setSelectedPayment(method.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 transition ${
                selectedPayment === method.id
                  ? "border-[#D02E64] bg-pink-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <Image src={method.icon} alt={method.label} width={36} height={24} className="object-contain" />
              <span className="text-sm font-medium text-gray-700">{method.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Card Number</label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={19}
                  placeholder="1234 5678 9012 3456"
                  onChange={(e) => {
                    const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
                    e.target.value = raw.replace(/(.{4})/g, "$1 ").trim();
                  }}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#D02E64] focus:ring-1 focus:ring-[#D02E64] transition bg-white tracking-widest pr-12"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 text-lg">💳</span>
              </div>
            </div>
          </div>

          {/* Expiry */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Expiry Date</label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={5}
              placeholder="MM / YY"
              onChange={(e) => {
                let val = e.target.value.replace(/\D/g, "").slice(0, 4);
                if (val.length >= 3) val = val.slice(0, 2) + " / " + val.slice(2);
                e.target.value = val;
              }}
              className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#D02E64] focus:ring-1 focus:ring-[#D02E64] transition bg-white tracking-widest"
            />
          </div>

          {/* CVV */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">CVV</label>
            <div className="relative">
              <input
                type="password"
                inputMode="numeric"
                maxLength={4}
                placeholder="•••"
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/\D/g, "").slice(0, 4);
                }}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#D02E64] focus:ring-1 focus:ring-[#D02E64] transition bg-white tracking-widest"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 text-sm">🔒</span>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Error */}
      {error && (
        <p className="text-red-500 text-sm font-medium mb-4 px-1">{error}</p>
      )}

      {/* Place Order Button */}
      <button
        onClick={handleCheckout}
        disabled={isLoading}
        className={`w-full py-4 rounded-xl text-white font-semibold text-base transition ${
          isLoading
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-[#D02E64] hover:bg-[#b02555] active:scale-[0.99]"
        }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Placing Order...
          </span>
        ) : (
          "Place Order"
        )}
      </button>

      <p className="text-center text-xs text-gray-400 mt-3">
        🔒 Your payment info is encrypted and secure
      </p>
    </div>
  );
};

export default CheckoutDetails;
