"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import Image from "next/image";

dayjs.extend(relativeTime);

const STATUS_COLORS = {
  PAID: "bg-green-100 text-green-700",
  NOT_PAID: "bg-red-100 text-red-600",
  PENDING: "bg-yellow-100 text-yellow-700",
  REFUNDED: "bg-gray-100 text-gray-600",
};

export default function ProfileOrders({ userId }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!userId) return;
    axios
      .get(`/api/userOrders/${userId}`)
      .then((res) => setOrders(res?.data?.result || []))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <OrdersSkeleton />;

  if (error)
    return (
      <p className="text-center text-red-500 py-10">Failed to load orders.</p>
    );

  if (orders.length === 0)
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-gray-400">
        <Image src="/order.svg" alt="" width={48} height={48} className="opacity-40" />
        <p className="text-lg font-medium">No orders yet</p>
        <Link
          href="/list"
          className="text-sm text-[#D02E64] underline underline-offset-2"
        >
          Start shopping
        </Link>
      </div>
    );

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Image src="/order.svg" alt="" width={22} height={22} />
        <h2 className="text-xl font-semibold text-gray-800">
          Orders <span className="text-gray-400 font-normal text-base">({orders.length})</span>
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        {orders.map((order) => {
          const statusKey = order.paymentStatus?.toUpperCase().replace(/\s/g, "_");
          const colorClass = STATUS_COLORS[statusKey] || "bg-gray-100 text-gray-600";
          return (
            <Link
              key={order._id}
              href={`/orders/${order._id}`}
              prefetch={true}
              className="flex items-center justify-between px-5 py-4 rounded-xl border border-gray-100 hover:border-[#D02E64] hover:shadow-sm transition group"
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-mono text-gray-500">
                  #{order._id.slice(0, 8)}...
                </span>
                <span className="text-xs text-gray-400">{dayjs(order.createdAt).fromNow()}</span>
              </div>

              <span className="text-base font-semibold text-gray-800">${order.price}</span>

              <span className={`text-xs font-medium px-3 py-1 rounded-full ${colorClass}`}>
                {order.paymentStatus}
              </span>

              <span className="text-[#D02E64] text-sm opacity-0 group-hover:opacity-100 transition">
                View →
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function OrdersSkeleton() {
  return (
    <div className="flex flex-col gap-3 animate-pulse">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-16 bg-gray-100 rounded-xl" />
      ))}
    </div>
  );
}
