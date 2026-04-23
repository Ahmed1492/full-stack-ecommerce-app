import { connectDB } from "@/lib/db";
import { Order } from "@/lib/models";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const order = await Order.find().sort({ createdAt: -1 });
    return NextResponse.json({ order });
  } catch (e: any) {
    return NextResponse.json({ order: [], error: e.message }, { status: 500 });
  }
}
