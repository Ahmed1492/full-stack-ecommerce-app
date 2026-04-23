import { connectDB } from "@/lib/db";
import { Comment, User } from "@/lib/models";
import { NextResponse } from "next/server";

export async function GET(_req: Request, { params }: { params: { productId: string } }) {
  try {
    await connectDB();
    const comments = await Comment.find({ productId: params.productId })
      .sort({ createdAt: -1 })
      .lean();

    // Manually populate userId with user data
    const userIds = [...new Set(comments.map((c: any) => c.userId))];
    const users = await User.find({ _id: { $in: userIds } }).lean();
    const userMap: any = {};
    users.forEach((u: any) => { userMap[u._id] = u; });

    const result = comments.map((c: any) => ({
      ...c,
      userId: userMap[c.userId] || { _id: c.userId, username: c.slug, firstname: "", surname: "" },
    }));

    return NextResponse.json({ result });
  } catch (e: any) {
    return NextResponse.json({ result: [], error: e.message }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { productId: string } }) {
  try {
    await connectDB();
    const body = await req.json();
    await Comment.findByIdAndUpdate(params.productId, {
      content: body.content,
      starsNumber: body.starsNumber,
      updatedBrfore: true,
    });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { productId: string } }) {
  try {
    await connectDB();
    await Comment.findByIdAndDelete(params.productId);
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
