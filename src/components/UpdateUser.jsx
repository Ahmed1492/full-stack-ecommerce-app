"use client";
import { updateUser } from "@/lib/actions";
import axios from "axios";
import React, { useState } from "react";

export default function UpdateUser({ user }) {
  let userId = user?.contactId;
  const [updatedUser, setUpdatedUser] = useState({
    username: "",
    firstname: " ",
    surname: " ",
    phone: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!user?.contactId) {
    return <div>not logged in..!</div>;
  }

  const collectData = (e) => {
    setMessage("");
    let key = e.target.name;
    let value = e.target.value;
    let newObj = { ...updatedUser };
    newObj[key] = value;
    setUpdatedUser(newObj);
    console.log(newObj);
  };

  const updateUserDb = async (e) => {
    setIsLoading(true);

    e.preventDefault();
    try {
      let myResponse = await axios.patch(
        `http://localhost:2000/updateUser/${userId}`,
        updatedUser
      );
      console.log("from my db", myResponse);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setMessage(" user updated Successfully!");
    }
  };
  return (
    <div className="">
      <form
        // onSubmit={handleSubmit}
        className="flex flex-col gap-2 mt-24  m-auto  "
      >
        <h1 className="font-extrabold text-2xl">Profile</h1>

        <input
          name="id"
          hidden
          defaultValue={user?.contactId}
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
          onChange={collectData}
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
          onChange={collectData}
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
          onChange={collectData}
          className="outline-none border w-[100%] py-2 px-3"
          type="text"
          placeholder="Enter Your lastname"
          name="surname"
        />
        <label className="mt-5" htmlFor="">
          Phone
        </label>
        <input
          onChange={collectData}
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
        {/*  */}
        <button
          onClick={updateUserDb}
          className={` ${
            isLoading ? "bg-[#a79ca0] cursor-not-allowed" : "bg-[#D02E64]"
          }  text-white py-2 rounded-lg mt-7`}
        >
          {isLoading ? "Updating...." : "Update"}
        </button>
      </form>
      {message && (
        <p className="mt-4 text-green-600 font-bold text-center">{message}</p>
      )}
    </div>
  );
}
