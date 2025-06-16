import { members } from "@wix/members";


export async function myGetMemberFunction(_id, options) {
  try {
    const member = await members.getMember(_id, options);
    console.log("Member retrieved:", member);

    return member;
  } catch (error) {
    console.error(error);
    // Handle the error
  }
}



