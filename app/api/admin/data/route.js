import { cookies } from "next/headers";
import { getJsonBinData, updateJsonBinData } from "@/lib/jsonbin";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("admin_session");


  if (cookie?.value !== "valid") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const data = await getJsonBinData();
  return NextResponse.json(data);
}

export async function PUT(req) {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("admin_session");
  if (cookie?.value !== "valid") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const success = await updateJsonBinData(body);
  return NextResponse.json({ success });
}
