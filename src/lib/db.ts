import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL!;
const DB_NAME = process.env.DATA_BASE_NAME || "wix_user_orders";

if (!MONGODB_URL) throw new Error("MONGODB_URL is not defined in .env");

// Reuse connection across hot reloads in dev
let cached = (global as any).__mongoose;
if (!cached) cached = (global as any).__mongoose = { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(`${MONGODB_URL}/${DB_NAME}`, {
      bufferCommands: false,
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
