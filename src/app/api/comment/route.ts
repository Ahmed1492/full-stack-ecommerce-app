import { connectDB } from "@/lib/db";
import { Comment } from "@/lib/models";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const comment = await Comment.create(body);
    return NextResponse.json({ success: true, id: comment._id });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
