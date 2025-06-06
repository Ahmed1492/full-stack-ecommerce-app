import React from "react";
import UpdateUser from "@/components/UpdateUser";
import OrderHistory from "@/components/OrderHistory";
import { wixClientServer } from "@/lib/wixClientServer";
import { members } from "@wix/members";
export default async function page() {
  const wixClient = await wixClientServer();
  const member = await wixClient?.members?.getCurrentMember({
    fieldsets: [members.Set.FULL],
  });

  console.log("====================================");
  console.log("member ", member.member);
  console.log("====================================");
  return (
    <div className="flex items-center justify-between w-[80%] mt-3 m-auto">
      <div className="xl:w-[30rem]">
        <UpdateUser user={member?.member} />
      </div>
      <div className="xl:w-[41rem]">
        <OrderHistory user={member?.member} />
      </div>
    </div>
  );
}
