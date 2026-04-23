import { connectDB } from "@/lib/db";
import { Order } from "@/lib/models";
import { NextResponse } from "next/server";

export async function GET(_req: Request, { params }: { params: { userId: string } }) {
  try {
    await connectDB();
    const result = await Order.find({ receiveId: params.userId }).sort({ createdAt: -1 });
    return NextResponse.json({ result });
  } catch (e: any) {
    return NextResponse.json({ result: [], error: e.message }, { status: 500 });
  }
}
