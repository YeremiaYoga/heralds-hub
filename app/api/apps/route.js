import { getJsonBinData, getSocialData } from "@/lib/jsonbin";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  let data;

  if (type === "social") {
    data = await getSocialData();
  } else {
    data = await getJsonBinData();
  }

  if (!data) {
    return NextResponse.json({ message: "Failed to fetch data" }, { status: 500 });
  }

  return NextResponse.json(data);
}
