"use server";

import { wixClientServer } from "./wixClientServer";

export const updateUser = async (formData: FormData) => {
  const wixClient = await wixClientServer();
  const id = formData.get("id") as string;
  const username = formData.get("username") as string;
  const firstname = formData.get("firstname") as string;
  const lastname = formData.get("lastname") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;

  try {
    const response = await wixClient.members.updateMember(id, {
      contact: {
        firstName: firstname || undefined,
        lastName: lastname || undefined,
        phones: phone ? [phone] : undefined,
      },
      loginEmail: email || undefined,
      profile: { nickname: username || undefined },
    });
    console.log("from wix client", response);
  } catch (error) {
    console.log(error);
  }
};
