import { connectDB } from "@/lib/db";
import { Comment } from "@/lib/models";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { userId, productId } = await req.json();
    const existing = await Comment.findOne({ userId, productId });
    return NextResponse.json({ hasCommented: !!existing });
  } catch (e: any) {
    return NextResponse.json({ hasCommented: false, error: e.message }, { status: 500 });
  }
}
