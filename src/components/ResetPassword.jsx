import React from "react";

export default function ResetPassword() {
  return (
    <div>
      <div className="flex flex-col gap-2 mt-24 w-[20%] m-auto  ">
        <h1 className="font-extrabold text-2xl">Reset Your Password</h1>

        <label className="mt-5" htmlFor="">
          Email
        </label>
        <input
          className="outline-none border w-[100%] py-2 px-3"
          type="email"
          placeholder="Enter Your Email"
        />

        <button className="bg-[#D02E64] text-white py-2 rounded-lg mt-7">
          Reset
        </button>
        <u className="mt-2">go To Login</u>
      </div>
    </div>
  );
}
