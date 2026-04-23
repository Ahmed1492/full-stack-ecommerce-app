import { connectDB } from "@/lib/db";
import { User } from "@/lib/models";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { _id, email, username, firstname, surname } = await req.json();
    await User.findByIdAndUpdate(
      _id,
      { _id, email, username, firstname, surname },
      { upsert: true, new: true }
    );
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
