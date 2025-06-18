import React from "react";
import UpdateUser from "@/components/UpdateUser";
import OrderHistory from "@/components/OrderHistory";
import { wixClientServer } from "@/lib/wixClientServer";
import { members } from "@wix/members";
import LoginFirst from "@/components/LoginFirst";
export default async function page() {
  const wixClient = await wixClientServer();
  const isLoggedIn = wixClient.auth.loggedIn();

  if (!isLoggedIn) return <LoginFirst />;

  let member;

  try {
    member = await wixClient?.members?.getCurrentMember({
      fieldsets: [members.Set.FULL],
    });
  } catch (error) {
    console.log(error);
  }
  console.log("member ", member?.member);
  return (
    <div className="flex items-center1 justify-between w-[80%] mt-3 m-auto">
      <div className="xl:w-[30rem]">
        <UpdateUser user={member?.member} />
      </div>
      <div className="xl:w-[41rem] mt-3">
        <OrderHistory user={member?.member} />
      </div>
    </div>
  );
}
