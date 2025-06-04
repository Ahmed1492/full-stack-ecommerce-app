import { updateUser } from "@/lib/actions";
import axios from "axios";
import React from "react";

export default async function UpdateUser({ user }) {
  if (!user.contactId) {
    return <div>not logged in..!</div>;
  }
  let userId = user.contactId;
  const updateUserOnDB = async () => {
    try {
      let myResponse = await axios.patch(
        `http://localhost:2000/updateUser/${userId}`
      );
      console.log("from my db", myResponse);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="">
      <form
        action={updateUser}
        // onSubmit={handleSubmit}
        className="flex flex-col gap-2 mt-24  m-auto  "
      >
        <h1 className="font-extrabold text-2xl">Profile</h1>

        <input
          name="id"
          hidden
          value={user?.contactId}
          //onChange={(e) => setUsername(e.target.value)}
          className="outline-none border w-[100%] py-2 px-3"
          type="text"
          placeholder="Enter Your Username"
        />

        {/* USER NAME */}

        <label className="mt-5" htmlFor="">
          Username
        </label>
        <input
          name="username"
          //onChange={(e) => setUsername(e.target.value)}
          className="outline-none border w-[100%] py-2 px-3"
          type="text"
          placeholder="Enter Your Username"
        />

        {/* FIRST NAME */}

        <label className="mt-5" htmlFor="">
          firstname
        </label>
        <input
          name="firstname"
          //onChange={(e) => setPassword(e.target.value)}
          className="outline-none border w-[100%] py-2 px-3"
          type="text"
          placeholder="Enter Your firstname"
        />

        {/* last NAME */}
        <label className="mt-5" htmlFor="">
          lastname
        </label>
        <input
          //onChange={(e) => setPassword(e.target.value)}
          className="outline-none border w-[100%] py-2 px-3"
          type="text"
          placeholder="Enter Your lastname"
          name="lastname"
        />
        <label className="mt-5" htmlFor="">
          Phone
        </label>
        <input
          name="phone"
          //onChange={(e) => setPassword(e.target.value)}
          className="outline-none border w-[100%] py-2 px-3"
          type="number"
          placeholder="Enter Your Phone"
        />

        <label className="mt-5" htmlFor="">
          Email
        </label>
        <input
          name="email"
          //onChange={(e) => setEmail(e.target.value)}
          className="outline-none border w-[100%] py-2 px-3"
          type="email"
          placeholder="Enter Your Email"
        />

        <button
          // onClick={updateUserOnDB}
          className="bg-[#D02E64] text-white py-2 rounded-lg mt-7"
        >
          Update
        </button>
      </form>
    </div>
  );
}
