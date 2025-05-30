"use client";
import React from "react";

const CheckoutDetails = ({ user }) => {
  console.log("user from client ", user);
  return (
    <div>
      <div className="bg-slate-200 py-2 px-3 w-[94%] flex justify-between items-center  ">
        <p className="text-gray-600">
          Logged in as {user?.loginEmail || "NAN"}
        </p>
        <p className="border-b cursor-pointer border-gray-700">Logout</p>
      </div>

      {/* DELIVERY DETAILS */}
      <h2 className="text-xl mt-4 mb-3">Delvery Details</h2>
      {/* INPUTS */}

      {/* FIRST NAME */}
      <div className="flex flex-col mt-5 gap-1">
        <label className="text-gray-700" htmlFor="">
          First name
        </label>
        <input
          className=" border border-gray-300  w-[94%] py-2 px-3 rounded-sm"
          type="text"
        />
      </div>

      {/* LAST NAME */}
      <div className="flex flex-col mt-5 gap-1">
        <label className="text-gray-700" htmlFor="">
          Last name
        </label>
        <input
          className=" border border-gray-300  w-[94%] py-2 px-3 rounded-sm"
          type="text"
        />
      </div>

      {/* PHONE */}

      <div className="flex flex-col mt-5 gap-1">
        <label className="text-gray-700" htmlFor="">
          Phone
        </label>
        <input
          className=" border border-gray-300  w-[94%] py-2 px-3 rounded-sm"
          type="text"
        />
      </div>

      {/* COUNTRY / REGION */}
      <div className="flex flex-col mt-5 gap-1">
        <label className="text-gray-700" htmlFor="">
          Country / Region
        </label>
        <select
          className=" border border-gray-300  w-[94%] py-2 px-3 rounded-sm"
          name=""
          id=""
        >
          <option value="">Egypt</option>
          <option value="">Egypt</option>
          <option value="">Egypt</option>
          <option value="">Egypt</option>
          <option value="">Egypt</option>
        </select>
      </div>

      {/* ADDRESS */}
      <div className="flex flex-col mt-5 gap-1">
        <label className="text-gray-700" htmlFor="">
          Address
        </label>
        <input
          className=" border border-gray-300  w-[94%] py-2 px-3 rounded-sm"
          type="text"
        />
      </div>

      {/* CITY */}
      <div className="flex flex-col mt-5 gap-1">
        <label className="text-gray-700" htmlFor="">
          City
        </label>
        <input
          className=" border border-gray-300  w-[94%] py-2 px-3 rounded-sm"
          type="text"
        />
      </div>

      {/* STATE */}
      <div className="flex items-center w-[94%] justify-between">
        <div className="flex flex-col w-[44%] mt-5 gap-1">
          <label className="text-gray-700" htmlFor="">
            state
          </label>
          <select
            className=" border border-gray-300  w-[94%] py-2 px-3 rounded-sm"
            name=""
            id=""
          >
            <option value="">Egypt</option>
            <option value="">Egypt</option>
            <option value="">Egypt</option>
            <option value="">Egypt</option>
            <option value="">Egypt</option>
          </select>
        </div>
        <div className="flex flex-col w-[44%] mt-5 gap-1">
          <label className="text-gray-700" htmlFor="">
            Zip / Postal Code
          </label>
          <input
            className=" border border-gray-300   py-2 px-3 rounded-sm"
            type="text"
          />
        </div>
      </div>
      {/* BUTTON  */}
      <button className="bg-black text-white mt-7  w-[94%] py-3 px-3 rounded-sm">
        Continue
      </button>
    </div>
  );
};

export default CheckoutDetails;
