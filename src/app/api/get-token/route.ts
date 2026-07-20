import { NextResponse } from "next/server";
import { getTokenServer } from "@/lib/getTokenServer";

export async function GET() {
  try {
    const token = await getTokenServer();

    if (!token) {
      return NextResponse.json({ token: null }, { status: 401 });
    }

    return NextResponse.json({ token });
  } catch (error) {
    console.error("get-token route error:", error);
    return NextResponse.json({ token: null, error: "Failed to get token" }, { status: 500 });
  }
}