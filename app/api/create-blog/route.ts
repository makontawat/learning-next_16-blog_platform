import { NextResponse } from "next/server";

export async function POST() {
  console.log("API Route");
  return NextResponse.json({ success: true });
}
