import React from "react";
import UpdateUser from "@/components/UpdateUser";
import OrderHistory from "@/components/OrderHistory";
export default function page() {
  return (
    <div className="flex items-center justify-between w-[80%] mt-3 m-auto">
      <div className="xl:w-[30rem]">
        <UpdateUser />
      </div>
      <div className="xl:w-[41rem]">
        <OrderHistory />
      </div>
    </div>
  );
}
