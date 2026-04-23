import { connectDB } from "@/lib/db";
import { Order } from "@/lib/models";
import { NextResponse } from "next/server";

export async function GET(_req: Request, { params }: { params: { orderId: string } }) {
  try {
    await connectDB();
    const order = await Order.findById(params.orderId);
    if (!order) return NextResponse.json({ order: null });
    return NextResponse.json({ order });
  } catch (e: any) {
    return NextResponse.json({ order: null, error: e.message }, { status: 500 });
  }
}
