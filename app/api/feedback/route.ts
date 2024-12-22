import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { feedback } = body;
    console.log("Feedback received:", feedback);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing feedback:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
