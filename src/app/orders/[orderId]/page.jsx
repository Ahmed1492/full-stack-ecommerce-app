import React from "react";
import { connectDB } from "@/lib/db";
import { Order } from "@/lib/models";
import Link from "next/link";
import Orderinfo from "@/components/Orderinfo";

const STATUS_STYLES = {
  paid:        { dot: "bg-green-500",  pill: "bg-green-100 text-green-700",  label: "Paid" },
  pending:     { dot: "bg-yellow-400", pill: "bg-yellow-100 text-yellow-700", label: "Pending" },
  processing:  { dot: "bg-blue-500",   pill: "bg-blue-100 text-blue-700",    label: "Processing" },
  refunded:    { dot: "bg-gray-400",   pill: "bg-gray-100 text-gray-600",    label: "Refunded" },
  delivered:   { dot: "bg-green-500",  pill: "bg-green-100 text-green-700",  label: "Delivered" },
  shipped:     { dot: "bg-indigo-500", pill: "bg-indigo-100 text-indigo-700",label: "Shipped" },
};

const STEPS = ["Order Placed", "Processing", "Shipped", "Delivered"];

function getStatus(key) {
  return STATUS_STYLES[key?.toLowerCase()] || STATUS_STYLES.pending;
}

function getStepIndex(orderStatus) {
  const s = orderStatus?.toLowerCase();
  if (s === "delivered") return 3;
  if (s === "shipped")   return 2;
  if (s === "processing") return 1;
  return 0;
}

export default async function OrderPage({ params }) {
  const { orderId } = params;
  let order = null;

  try {
    await connectDB();
    order = await Order.findById(orderId).lean();
  } catch (e) {
    console.log(e);
  }

  if (!order)
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 text-gray-400">
        <span className="text-6xl">📦</span>
        <h2 className="text-xl font-bold text-gray-700">Order not found</h2>
        <p className="text-sm">This order doesn't exist or may have been removed.</p>
        <Link href="/profile" className="mt-2 px-5 py-2.5 bg-[#D02E64] text-white text-sm font-semibold rounded-xl hover:bg-[#b02555] transition">
          Back to My Orders
        </Link>
      </div>
    );

  const paymentStyle = getStatus(order.paymentStatus);
  const orderStyle   = getStatus(order.orderStatus);
  const stepIndex    = getStepIndex(order.orderStatus);
  const shortId      = String(order._id).slice(-8).toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-[10%]">
      <div className="max-w-5xl mx-auto">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
          <Link href="/" className="hover:text-[#D02E64] transition">Home</Link>
          <span>/</span>
          <Link href="/profile" className="hover:text-[#D02E64] transition">My Orders</Link>
          <span>/</span>
          <span className="text-gray-600 font-medium">#{shortId}</span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-xs text-[#D02E64] font-semibold uppercase tracking-widest mb-1">Order Details</p>
            <h1 className="text-3xl font-extrabold text-gray-900">#{shortId}</h1>
            <p className="text-sm text-gray-400 mt-1">
              Placed on {new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          <Link
            href="/profile"
            className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:border-[#D02E64] hover:text-[#D02E64] transition w-max"
          >
            ← All Orders
          </Link>
        </div>

        {/* Progress tracker */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-6">Order Progress</h2>
          <div className="flex items-center">
            {STEPS.map((step, i) => {
              const done    = i <= stepIndex;
              const current = i === stepIndex;
              return (
                <React.Fragment key={step}>
                  <div className="flex flex-col items-center gap-2 flex-shrink-0">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                      done
                        ? "bg-[#D02E64] border-[#D02E64] text-white"
                        : "bg-white border-gray-200 text-gray-300"
                    } ${current ? "ring-4 ring-pink-100" : ""}`}>
                      {done ? "✓" : i + 1}
                    </div>
                    <span className={`text-xs font-medium text-center leading-tight max-w-[60px] ${done ? "text-gray-700" : "text-gray-300"}`}>
                      {step}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-1 mb-5 rounded-full transition-all ${i < stepIndex ? "bg-[#D02E64]" : "bg-gray-100"}`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-5">
          {/* LEFT */}
          <div className="flex-1 flex flex-col gap-5">

            {/* Status badges */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-sm font-semibold text-gray-700 mb-4">Status</h2>
              <div className="flex flex-wrap gap-4">
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs text-gray-400 uppercase tracking-wide">Payment</span>
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${paymentStyle.pill}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${paymentStyle.dot}`} />
                    {paymentStyle.label}
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs text-gray-400 uppercase tracking-wide">Fulfillment</span>
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${orderStyle.pill}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${orderStyle.dot}`} />
                    {orderStyle.label}
                  </span>
                </div>
              </div>
            </div>

            {/* Delivery info */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-sm font-semibold text-gray-700 mb-4">Delivery Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: "👤", label: "Receiver",  value: order.receiverName },
                  { icon: "📧", label: "Email",     value: order.receiverEmail },
                  { icon: "📞", label: "Phone",     value: order.phone },
                  { icon: "📍", label: "Address",   value: order.address },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3 bg-gray-50 rounded-xl p-3">
                    <span className="text-lg flex-shrink-0">{icon}</span>
                    <div className="min-w-0">
                      <p className="text-xs text-gray-400">{label}</p>
                      <p className="text-sm font-medium text-gray-800 truncate">{value || "—"}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="bg-gradient-to-r from-[#D02E64] to-[#a0204a] rounded-2xl p-6 flex items-center justify-between text-white">
              <div>
                <p className="text-pink-200 text-xs font-medium mb-1">Total Paid</p>
                <p className="text-3xl font-extrabold">${order.price?.toFixed(2)}</p>
              </div>
              <span className="text-5xl opacity-20">💳</span>
            </div>

            {/* Help */}
            <Link
              href="/contact"
              className="flex items-center gap-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:border-[#D02E64] transition group"
            >
              <span className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center text-xl flex-shrink-0">💬</span>
              <div>
                <p className="text-sm font-semibold text-gray-800 group-hover:text-[#D02E64] transition">Have a problem?</p>
                <p className="text-xs text-gray-400">Contact our support team</p>
              </div>
              <span className="ml-auto text-gray-300 group-hover:text-[#D02E64] transition">→</span>
            </Link>
          </div>

          {/* RIGHT — Items */}
          <div className="w-full lg:w-80">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
              <h2 className="text-sm font-semibold text-gray-700 mb-5">
                Items
                <span className="ml-2 text-xs font-normal text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                  {order.selectedItem?.length || 0}
                </span>
              </h2>
              <Orderinfo orderDetails={order} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
