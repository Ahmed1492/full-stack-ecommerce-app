import React from "react";
import CheckoutDetails from "@/components/CheckoutDetails";
// import UserInfo from "@/components/UserInfo";
import OrderSummary from "@/components/OrderSummary.jsx";
import { members } from "@wix/members";
import { wixClientServer } from "@/lib/wixClientServer";
import { useCartStore } from "@/hooks/userCartStore";
import axios from "axios";
export default async function page() {
  const wixClient = await wixClientServer();
  const member = await wixClient.members.getCurrentMember({
    fieldsets: [members.Set.FULL],
  });

  return (
    <div className="flex flex-col-reverse md:flex-row gap-y-6 flex-wrap xl:flex-nowrap xl:justify-center pt-5 gap-3 w-[70%] m-auto">
      <div className="w-[100%] md:w-[53%] lg:w-[55%] xl:w-[37rem]">
        <CheckoutDetails user={member?.member} />
        {/* <UserInfo /> */}
      </div>
      <div className="w-[100%] md:w-[45%] lg:w-[40%] xl:w-[25rem]">
        <OrderSummary user={member?.member} />
      </div>
    </div>
  );
}
