import React from "react";
import { wixClientServer } from "@/lib/wixClientServer";
import { members } from "@wix/members";
import { redirect } from "next/navigation";
import ProfileClient from "@/components/ProfileClient";

export default async function ProfilePage() {
  const wixClient = await wixClientServer();
  const isLoggedIn = wixClient.auth.loggedIn();

  if (!isLoggedIn) redirect("/login");

  let member = null;
  try {
    const res = await wixClient?.members?.getCurrentMember({
      fieldsets: [members.Set.FULL],
    });
    member = res?.member || null;
    console.log("member _id:", member?._id, "contactId:", member?.contactId);
  } catch (error) {
    console.log(error);
  }

  return <ProfileClient user={member} />;
}
