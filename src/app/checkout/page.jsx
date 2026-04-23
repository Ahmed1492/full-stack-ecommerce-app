import React from "react";
import CheckoutDetails from "@/components/CheckoutDetails";
import OrderSummary from "@/components/OrderSummary.jsx";
import { members } from "@wix/members";
import { wixClientServer } from "@/lib/wixClientServer";
import { redirect } from "next/navigation";

export default async function CheckoutPage() {
  const wixClient = await wixClientServer();
  const isLoggedIn = wixClient.auth.loggedIn();

  if (!isLoggedIn) redirect("/login");

  const member = await wixClient.members.getCurrentMember({
    fieldsets: [members.Set.FULL],
  });

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Complete your order below
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* LEFT — Delivery + Payment */}
          <div className="w-full lg:flex-1">
            <CheckoutDetails user={member?.member} />
          </div>

          {/* RIGHT — Order Summary */}
          <div className="w-full lg:w-[22rem] sticky top-6">
            <OrderSummary user={member?.member} />
          </div>
        </div>
      </div>
    </div>
  );
}
