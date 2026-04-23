"use client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import StarReview from "./StarReview";
import { useNotificationStore } from "../hooks/userNotificationsSrore";

dayjs.extend(relativeTime);

export default function Reviwes({ productId, user, product }) {
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [hasOrderItem, setHasOrderItem] = useState(false);
  const [isShow, setIsShow] = useState(true);
  const [mode, setMode] = useState("create");
  const [menuOpen, setMenuOpen] = useState({ status: false, id: "" });
  const [updatedComment, setUpdatedComment] = useState(null);
  const { removeNotification } = useNotificationStore();

  const [newComment, setNewComment] = useState({
    content: "",
    productId,
    title: user?.profile?.nickname,
    slug: user?.profile?.slug,
    userId: user?.contactId,
    starsNumber: 0,
  });

  const userD = { productId, userId: user?.contactId };

  const getReviews = async () => {
    try {
      const res = await axios.get(`/api/comment/${productId}`);
      setReviews(res.data.result);
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingReviews(false);
    }
  };

  const isUserComment = async () => {
    if (!user?.contactId) return;
    try {
      const res = await axios.post(`/api/checkUserComment`, userD);
      setIsShow(res.data.hasCommented);
    } catch (e) { console.log(e); }
  };

  const checkUserOrdered = async () => {
    if (!user?.contactId) return;
    try {
      const res = await axios.get("/api/orders");
      const orders = res.data.order;
      const found = orders.some(
        (o) => o.receiveId === user.contactId &&
          o.selectedItem?.some((item) => item.id === productId)
      );
      setHasOrderItem(found);
    } catch (e) { console.log(e); }
  };

  const createComment = async () => {
    setLoading(true);
    try {
      await axios.post(`/api/comment`, newComment);
      removeNotification(`${userD.userId}-${userD.productId}`);
      await getReviews();
      await isUserComment();
    } catch (e) { console.log(e); }
    finally { setLoading(false); }
  };

  const handleUpdate = async () => {
    try {
      await axios.patch(`/api/comment/${updatedComment._id}`, updatedComment);
      setMode("create");
      setMenuOpen({ status: false });
      await getReviews();
    } catch (e) { console.log(e); }
  };

  const handleDelete = async (comment) => {
    try {
      await axios.delete(`/api/comment/${comment._id}`);
      setMenuOpen({ status: false });
      setIsShow(false);
      setHasOrderItem(true);
      await getReviews();
    } catch (e) { console.log(e); }
  };

  useEffect(() => {
    getReviews();
    isUserComment();
    checkUserOrdered();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + (r.starsNumber || 0), 0) / reviews.length).toFixed(1)
    : null;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-gray-900">Reviews</h2>
          {reviews.length > 0 && (
            <span className="text-sm text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
              {reviews.length}
            </span>
          )}
        </div>
        {avgRating && (
          <div className="flex items-center gap-2">
            <StarReview initialRating={Math.round(avgRating)} readOnly />
            <span className="text-sm font-semibold text-gray-700">{avgRating}</span>
          </div>
        )}
      </div>

      {/* Reviews list */}
      {loadingReviews ? (
        <div className="flex flex-col gap-4 animate-pulse">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-4 py-4 border-b border-gray-100">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex-shrink-0" />
              <div className="flex-1 flex flex-col gap-2">
                <div className="h-3 bg-gray-100 rounded w-1/4" />
                <div className="h-3 bg-gray-100 rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-10 text-gray-400">
          <span className="text-4xl">💬</span>
          <p className="text-sm font-medium">No reviews yet</p>
          <p className="text-xs">Be the first to share your thoughts!</p>
        </div>
      ) : (
        <div className="flex flex-col divide-y divide-gray-100">
          {reviews.map((review) => {
            const isOwner = userD.userId === review.userId?._id;
            return (
              <div key={review._id} className="py-5 flex gap-4">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D02E64] to-[#a0204a] text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                  {(review.userId?.firstname?.[0] || review.slug?.[0] || "?").toUpperCase()}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-gray-800 text-sm">
                          {review.userId?.firstname} {review.userId?.surname}
                        </span>
                        {isOwner && (
                          <span className="text-xs text-[#D02E64] bg-pink-50 px-2 py-0.5 rounded-full">You</span>
                        )}
                        {review.updatedBrfore && (
                          <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">Edited</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">
                        @{review.userId?.username || review.slug || "user"}
                      </p>
                    </div>

                    {/* Options menu */}
                    {isOwner && (
                      <div className="relative flex-shrink-0">
                        <button
                          onClick={() => setMenuOpen({ status: !menuOpen.status, id: review._id })}
                          className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center transition"
                        >
                          <Image src="/option.svg" alt="" width={16} height={16} />
                        </button>
                        {menuOpen.status && menuOpen.id === review._id && (
                          <>
                            <div className="fixed inset-0 z-40" onClick={() => setMenuOpen({ status: false })} />
                            <div className="absolute right-0 top-8 z-50 bg-white border border-gray-100 shadow-xl rounded-xl py-1.5 min-w-[130px]">
                              <button
                                onClick={() => { setUpdatedComment(review); setMode("update"); setMenuOpen({ status: false }); }}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                              >
                                <Image src="/update.svg" alt="" width={16} height={16} />
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(review)}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition"
                              >
                                <Image src="/delete-red.svg" alt="" width={16} height={16} />
                                Delete
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 mt-2">
                    <StarReview initialRating={review.starsNumber || 0} readOnly />
                    <span className="text-xs text-gray-400">{dayjs(review.updatedAt).fromNow()}</span>
                  </div>
                  <p className="text-sm text-gray-700 mt-2 leading-relaxed">{review.content}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Update form */}
      {mode === "update" && updatedComment && (
        <div className="bg-gray-50 rounded-2xl p-5 flex flex-col gap-4 border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700">Edit your review</h3>
          <StarReview
            initialRating={updatedComment.starsNumber}
            readOnly={false}
            updatedComment={updatedComment}
            setUpdatedComment={setUpdatedComment}
            mode="update"
          />
          <div className="flex gap-2">
            <input
              value={updatedComment.content}
              onChange={(e) => setUpdatedComment({ ...updatedComment, content: e.target.value })}
              className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#D02E64] transition"
              placeholder="Update your review..."
            />
            <button
              onClick={handleUpdate}
              className="px-5 py-2.5 bg-[#D02E64] hover:bg-[#b02555] text-white text-sm font-semibold rounded-xl transition"
            >
              Save
            </button>
            <button
              onClick={() => setMode("create")}
              className="px-4 py-2.5 border border-gray-200 text-gray-500 text-sm rounded-xl hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Create form */}
      {!isShow && hasOrderItem && mode === "create" && (
        <div className="bg-gray-50 rounded-2xl p-5 flex flex-col gap-4 border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700">Leave a review</h3>
          <StarReview
            initialRating={0}
            readOnly={false}
            newComment={newComment}
            setNewComment={setNewComment}
          />
          <div className="flex gap-2">
            <input
              onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
              className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#D02E64] transition"
              placeholder="Share your thoughts about this product..."
            />
            <button
              onClick={createComment}
              disabled={isLoading}
              className={`px-5 py-2.5 text-white text-sm font-semibold rounded-xl transition ${
                isLoading ? "bg-gray-300 cursor-not-allowed" : "bg-[#D02E64] hover:bg-[#b02555]"
              }`}
            >
              {isLoading ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
