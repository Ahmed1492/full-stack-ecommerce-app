import mongoose, { Schema, models } from "mongoose";

// ── User ──────────────────────────────────────────────────────────
const UserSchema = new Schema(
  {
    _id: { type: String, required: true },
    email: String,
    username: String,
    firstname: String,
    surname: String,
    phone: String,
  },
  { timestamps: true, _id: false }
);

// ── Order ─────────────────────────────────────────────────────────
const OrderSchema = new Schema(
  {
    receiveId: String,
    receiverName: String,
    receiverEmail: String,
    phone: String,
    address: String,
    price: Number,
    paymentStatus: { type: String, default: "pending" },
    orderStatus: { type: String, default: "processing" },
    selectedItem: [
      {
        id: String,
        productName: String,
        price: Number,
        quantity: Number,
        img: String,
        itemType: String,
      },
    ],
  },
  { timestamps: true }
);

// ── Comment ───────────────────────────────────────────────────────
const CommentSchema = new Schema(
  {
    productId: String,
    userId: { type: String, ref: "User" },
    content: String,
    title: String,
    slug: String,
    starsNumber: { type: Number, default: 0 },
    updatedBrfore: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User   = models.User   || mongoose.model("User",    UserSchema);
export const Order  = models.Order  || mongoose.model("Order",   OrderSchema);
export const Comment = models.Comment || mongoose.model("Comment", CommentSchema);
