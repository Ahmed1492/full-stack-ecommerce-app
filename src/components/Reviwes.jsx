"use client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import StarReview from "./StarReview";
import { useNotificationStore } from "../hooks/userNotificationsSrore";
import { myGetMemberFunction } from "../lib/getMember";
import Link from "next/link";
import { Trykker } from "next/font/google";
export default function Reviwes({ productId, user, product }) {
  const [reviwes, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [allOrders, setAllOrders] = useState([]);
  const [isShow, setIsShow] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [hasOrderItem, setHasOrderItem] = useState(false);
  const [mode, setMode] = useState("create");
  const [isMenueOpen, setIsMenueOpen] = useState({ status: false, id: "" });
  const [updatedComment, setUpdatedComment] = useState();
  const [commentedUser, setCommentedUser] = useState({
    _id: "",
    username: " ",
    firstname: " ",
    surname: " ",
    slug: "",
  });

  const [userD, setUserD] = useState({
    productId: productId,
    userId: user?.contactId,
  });
  const [newComment, setNewComment] = useState({
    content: "",
    productId: productId,
    title: user?.profile?.nickname,
    slug: user?.profile?.slug,
    userId: user?.contactId,
    starsNumber: 0,
  });
  dayjs.extend(relativeTime);

  const { removeNotification } = useNotificationStore();

  const getReviwes = async () => {
    try {
      let myResponse = await axios.get(
        `http://localhost:2000/comment/${productId}`
      );
      setLoadingReviews(true);

      // console.log(">>>", myResponse.data.result);
      setReviews(myResponse.data.result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingReviews(false);
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
      let id = `${userD.userId}-${userD.productId}`;
      let statid =
        "a9d38b31-e2d0-4884-aecc-8d12e1c6c838-531ab8cb-e761-4215-93da-f1558b25d4db";
      await getReviwes();
      await isUserComment();
      removeNotification(id);
      // console.log(myResponse);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const isUserComment = async (userId) => {
    try {
      // console.log("====================================");
      // console.log(userD);
      // console.log("====================================");
      let myResponse = await axios.post(
        `http://localhost:2000/checkUserComment`,
        userD
      );
      // console.log("<><><>", myResponse.data.hasCommented);

      setIsShow(myResponse.data.hasCommented);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllReviwes = async () => {
    try {
      let myResponse = await axios.get("http://localhost:2000/orders");

      await hasUserOrderedItem(
        myResponse.data.order,
        user.contactId,
        productId
      );

      // console.log("====================================");
      // setAllOrders(myResponse.data.order);
    } catch (error) {}
  };

  async function hasUserOrderedItem(orders, userId, itemId) {
    for (const order of orders) {
      if (order.receiveId === userId) {
        for (const item of order.selectedItem) {
          if (item.id === itemId) {
            setHasOrderItem(true);
            // console.log("result is ", true);

            return true; // Found a matching order
          }
        }
      }
    }
    setHasOrderItem(false);

    // console.log("result is ", false);
    return false; // No match found
  }

  const selectUpatedComment = (comment) => {
    setMode("update");
    setUpdatedComment(comment);
    // console.log("updated Comment", comment);
  };

  const handleUpdate = async () => {
    try {
      let myResponse = await axios.patch(
        `http://localhost:2000/comment/${updatedComment._id}`,
        updatedComment
      );
      // console.log(myResponse);

      setMode("create");
      setIsMenueOpen({ status: false });
      await getReviwes();
      await getAllReviwes();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (comment) => {
    try {
      let myResponse = await axios.delete(
        `http://localhost:2000/comment/${comment._id}`
      );
      console.log(myResponse.data);
      setIsMenueOpen({ status: false });
      await getReviwes();
      await getAllReviwes();
      setHasOrderItem(true);
      setIsShow(false);
      // hasOrderItem
      // isShow
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReviwes();
    isUserComment();
    getAllReviwes();
  }, []);
  return (
    <>
      <h2 className="text-2xl font-bold text-center">Reviews</h2>
      {loadingReviews && <div>Loading......</div>}

      {loadingReviews ? (
        <div>Loading......</div>
      ) : reviwes.length == 0 ? (
        <div> No Comments yet </div>
      ) : (
        reviwes.map((section) => {
          // console.log("section_id ,", section);

          return (
            <div
              className="flex flex-col border-b border-slate-200 pb-4 gap-2"
              key={section._id}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-medium">
                      {section?.userId?.firstname} {"  "}
                      {section?.userId?.surname && section?.userId?.surname}
                    </h2>
                    {userD.userId === section.userId._id && (
                      <span className="text-gray-400"> {"(you)"} </span>
                    )}
                    {section?.updatedBrfore && (
                      <>
                        <span className="text-gray-400"> {"(Edited)"} </span>
                      </>
                    )}
                  </div>
                  <p className="tracking-wide  text-gray-500">
                    @{section?.userId?.username || section.slug || "NAN"}
                  </p>
                  <div className="my-[14px] flex gap-6 items-center">
                    {/* Show comment start */}
                    <StarReview
                      initialRating={section?.starsNumber || 0}
                      readOnly={true}
                    />
                    <span className="text-gray-500 ">
                      {dayjs(section.updatedAt).fromNow()}
                      {/* {dayjs(section.createdAt).fromNow()} */}
                    </span>
                  </div>
                  <p className="tracking-wide font-medium">{section.content}</p>
                </div>
                {/* <span className="text-gray-700 font-medium">
                {dayjs(section.createdAt).fromNow()}
              </span> */}
                <div className="relative">
                  {userD.userId === section.userId._id && (
                    <Image
                      onClick={() =>
                        setIsMenueOpen({
                          status: !isMenueOpen.status,
                          id: section._id,
                        })
                      }
                      className="cursor-pointer max-w-9 max-h-8"
                      src="/option.svg"
                      alt=""
                      width={18}
                      height={10}
                    />
                  )}
                  {isMenueOpen.status && isMenueOpen?.id === section._id && (
                    <div className="flex flex-col gap-3 shadow-lg bg-white rounded-md px-4 py-3 absolute top-8 min-w-36 font-medium -left-9 z-30">
                      <div className="cursor-pointer select-none">
                        <div className="flex items-center gap-2">
                          <Image
                            src="/update.svg"
                            alt=""
                            width={22}
                            height={20}
                          />
                          <span
                            onClick={() => {
                              selectUpatedComment(section);
                              setIsMenueOpen({ status: false });
                            }}
                            className="hover:text-[#D02E64] duration-500"
                          >
                            Update
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Image
                          src="/delete.svg"
                          alt=""
                          width={22}
                          height={20}
                        />
                        <span
                          onClick={() => handleDelete(section)}
                          className="cursor-pointer hover:text-[#D02E64] duration-500 "
                        >
                          Delete
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })
      )}

      {mode === "update" && (
        <>
          <div className="ms-[2rem]">
            {/* Create Comment Start */}
            <StarReview
              initialRating={updatedComment.starsNumber}
              readOnly={false}
              newComment={newComment}
              setNewComment={setNewComment}
              updatedComment={updatedComment}
              setUpdatedComment={setUpdatedComment}
              mode={mode}
            />
          </div>
          <div className="flex justify-center  items-center mt-1">
            <input
              value={updatedComment.content}
              onChange={(e) =>
                setUpdatedComment({
                  ...updatedComment,
                  content: e.target.value,
                })
              }
              className="bg-slate-100 w-[80%] outline-none px-3 py-3 rounded-md"
              type="text"
              placeholder="update comment !"
            />
            <button
              onClick={handleUpdate}
              className={`${
                isLoading ? "bg-slate-200" : "bg-[#D02E64]"
              } py-3 px-3 text-white`}
            >
              Update
            </button>
          </div>
        </>
      )}

      {!isShow && hasOrderItem && (
        <>
          <div className="ms-[2rem]">
            {/* Create Comment Start */}
            <StarReview
              initialRating={0}
              readOnly={false}
              newComment={newComment}
              setNewComment={setNewComment}
            />
          </div>
          <div className="flex justify-center  items-center mt-1">
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
        </>
      )}
    </>
  );
}
