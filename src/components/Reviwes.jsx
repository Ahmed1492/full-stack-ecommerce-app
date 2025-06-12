"use client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Reviwes({ productId, user, product }) {
  const [reviwes, setReviews] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [isShow, setIsShow] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [hasOrderItem, setHasOrderItem] = useState(false);

  console.log("====================================");
  // console.log("productId , ", productId);
  // console.log("user.contactId , ", user.contactId);
  console.log("====================================");

  const [userD, setUserD] = useState({
    productId: productId,
    userId: user?.contactId,
  });
  const [newComment, setNewComment] = useState({
    content: "",
    productId: productId,
    title: user?.profile?.nickname,
    userId: user?.contactId,
  });
  dayjs.extend(relativeTime);

  const getReviwes = async () => {
    try {
      let myResponse = await axios.get(
        `http://localhost:2000/comment/${productId}`
      );
      // console.log(">>>", myResponse.data.result);
      setReviews(myResponse.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const createComment = async () => {
    try {
      // console.log("productId", productId);
      // console.log("user", user);
      // console.log("newComment", newComment);
      setLoading(true);
      let myResponse = await axios.post(
        `http://localhost:2000/comment`,
        newComment
      );
      await getReviwes();
      await isUserComment();
      // console.log(myResponse);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const isUserComment = async (userId) => {
    try {
      console.log("====================================");
      console.log(userD);
      console.log("====================================");
      let myResponse = await axios.post(
        `http://localhost:2000/checkUserComment`,
        userD
      );
      console.log("<><><>", myResponse.data.hasCommented);

      setIsShow(myResponse.data.hasCommented);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllReviwes = async () => {
    try {
      let myResponse = await axios.get("http://localhost:2000/orders");
      // console.log("test>>", myResponse.data.order);

      console.log("====================================");
      console.log("userId", user.contactId);
      console.log("product", product);

      await hasUserOrderedItem(
        myResponse.data.order,
        user.contactId,
        productId
      );
      console.log("====================================");
      // setAllOrders(myResponse.data.order);
    } catch (error) {}
  };

  async function hasUserOrderedItem(orders, userId, itemId) {
    for (const order of orders) {
      if (order.receiveId === userId) {
        for (const item of order.selectedItem) {
          if (item.id === itemId) {
            setHasOrderItem(true);
            console.log("result is ", true);

            return true; // Found a matching order
          }
        }
      }
    }
    setHasOrderItem(false);

    console.log("result is ", false);
    return false; // No match found
  }

  useEffect(() => {
    getReviwes();
    isUserComment();
    getAllReviwes();
  }, []);
  return (
    <>
      <h2 className="text-2xl font-bold text-center">Reviews</h2>
      {reviwes.map((section) => {
        return (
          <div
            className="flex flex-col border-b border-slate-200 pb-4 gap-2"
            key={section._id}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-medium">{section?.title}</h2>
                <p className="tracking-wide font-medium">{section.content}</p>
              </div>
              <span className="text-gray-700 font-medium">
                {dayjs(section.createdAt).fromNow()}
              </span>
            </div>
          </div>
        );
      })}

      {!isShow && hasOrderItem && (
        <div className="flex justify-center mt-7">
          <input
            onChange={(e) =>
              setNewComment({ ...newComment, content: e.target.value })
            }
            className="bg-slate-100 w-[80%] outline-none px-3 py-3 rounded-md"
            type="text"
            placeholder="Leave A Comment..!"
          />
          <button
            onClick={createComment}
            className={`${
              isLoading ? "bg-slate-200" : "bg-[#D02E64]"
            } py-3 px-3 text-white`}
          >
            Comment
          </button>
        </div>
      )}
    </>
  );
}
