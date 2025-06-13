"use client";
import { useCartStore } from "@/hooks/userCartStore";
import axios from "axios";
import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useWixClient } from "@/hooks/useWixClient";
import { useNotificationStore } from "../hooks/userNotificationsSrore";

const CheckoutDetails = ({ user }) => {
  const { cart, resetCart } = useCartStore();
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  let wixClient = useWixClient();

  let selectedItem =
    cart?.lineItems &&
    cart?.lineItems?.map((item) => {
      return {
        id: item?.catalogReference?.catalogItemId,
        quantity: item?.quantity,
        productName: item.productName.original,
        price: item.price.amount,
        img: item.image,
        itemType: item.itemType.preset,
      };
    });
  const [orderData, setOrderData] = useState({
    receiveId: user.contactId,
    phone: "",
    price: 0,
    address: "",
    receiverName: "",
    firstname: "",
    lastname: "",
    receiverEmail: user.loginEmail,
    paymentStatus: "pending",
    orderStatus: "processing",
    selectedItem,
  });

  const handleOrderNotification = (order) => {
    console.log("order.id ", order.receiveId);

    order?.selectedItem?.forEach((item) => {
      console.log("item.name ", item.productName);
      console.log("item.image ", item.img);
      addNotification({
        id: `${order.receiveId}-${item._id}`, // unique per item
        productName: item.productName,
        productImage: item.img, // or item.img
        message: `Thanks for buying ${item.productName.slice(
          0,
          6
        )}...! Drop a review?`,
        date: new Date().toLocaleString(),
      });
    });
  };

  // console.log("user from client ", user);
  // console.log("cart ", cart.lineItems);

  const handleCollectData = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    const updatedData = {
      ...orderData,
      [key]: value,
    };

    updatedData.receiverName = `${updatedData.firstname || ""} ${
      updatedData.lastname || ""
    }`.trim();

    setOrderData(updatedData);
    console.log("Updated orderData:", updatedData);
  };

  const goToOrderPage = (orderId) => {
    router.push(`orders/${orderId}`); // Navigate to another route
  };

  const createOrder = async () => {
    try {
      const response = await axios.post(
        "http://localhost:2000/createOrder",
        orderData
      );
      if (response.data.result) {
        let orderId = await response.data.result.orderId;
        return await goToOrderPage(orderId);
      }
    } catch (error) {
      console.error(
        "Error creating order:",
        error.response?.data || error.message
      );
    }
  };

  const createNewUser = async () => {
    // {  username, firstname, surname,  }
    let newUser = {
      _id: user._id,
      email: user.loginEmail,
      username: user.profile.slug,
      firstname: user.profile.nickname,
      surname: "",
    };
    // console.log(user);

    try {
      let myResponse = await axios.post(
        `http://localhost:2000/createUser`,
        newUser
      );
      console.log(myResponse);
    } catch (error) {
      console.log(error);
    }
  };
  const { addNotification } = useNotificationStore();

  const handleCheckout = async () => {
    try {
      setLoading(true);
      let userId = user.contactId;
      const response = await axios.get(`http://localhost:2000/user/${userId}`);

      const isUserExist = await response.data.success;
      // console.log(isUserExist);

      if (!isUserExist) {
        await createNewUser();
        console.log("user not Exist we added user and order!");
      }
      console.log("user Exist we added order only!");
      await createOrder(orderData);
      await resetCart(wixClient);
      await handleOrderNotification(orderData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useMemo(() => {
    if (cart?.lineItems) {
      let total = cart.lineItems.reduce((sum, item) => {
        return sum + item.quantity * +item.price.amount;
      }, 0);
      setOrderData({ ...orderData, price: total });

      console.log("Total:", total);
    }
  }, [cart?.lineItems]);

  return (
    <div>
      <div className="bg-slate-200 py-2 px-3 w-[94%] flex justify-between items-center  ">
        <p className="text-gray-600">
          Logged in as {user?.loginEmail || "NAN"}
        </p>
        <p className="border-b cursor-pointer border-gray-700">Logout</p>
      </div>

      <>
        {/* DELIVERY DETAILS */}
        <h2 className="text-xl mt-4 mb-3">Delvery Details</h2>
        {/* INPUTS */}

        {/* FIRST NAME */}
        <div className="flex flex-col mt-5 gap-1">
          <label className="text-gray-700" htmlFor="">
            First name
          </label>
          <input
            name="firstname"
            onChange={handleCollectData}
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
            name="lastname"
            onChange={handleCollectData}
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
            name="phone"
            onChange={handleCollectData}
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
            onChange={handleCollectData}
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
            name="address"
            onChange={handleCollectData}
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
            onChange={handleCollectData}
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
              onChange={handleCollectData}
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
              onChange={handleCollectData}
              className=" border border-gray-300   py-2 px-3 rounded-sm"
              type="text"
            />
          </div>
        </div>
        {/* BUTTON  */}
      </>
      <button
        onClick={handleCheckout}
        className={`${
          isLoading ? "bg-slate-400 cursor-not-allowed" : "bg-black"
        } text-white mt-7   w-[94%] py-3 px-3 rounded-md`}
      >
        Continue
      </button>
    </div>
  );
};

export default CheckoutDetails;
