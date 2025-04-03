import React from "react";

export default function EmailCode({ setMode, setEmailCode, handleSubmit }) {
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 mt-24 w-[70%] md:w-[36%] lg:w-[30%] xl:w-[24%] m-auto  "
      >
        <h1 className="font-extrabold text-2xl">Reset Your Password</h1>

        <label className="mt-5" htmlFor="">
          Email Code
        </label>
        <input
          onChange={(e) => setEmailCode(e.target.value)}
          className="outline-none border w-[100%] py-2 px-3"
          type="text"
          placeholder="Enter Your Email"
        />

        <button className="bg-[#D02E64] text-white py-2 rounded-lg mt-7">
          Reset
        </button>
        <u onClick={() => setMode("login")} className="mt-2 cursor-pointer">
          Go back To Login
        </u>
      </form>
    </div>
  );
}
