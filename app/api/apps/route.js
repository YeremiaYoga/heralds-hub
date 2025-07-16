import { getJsonBinData } from "@/lib/jsonbin";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await getJsonBinData();
  return NextResponse.json(data);
}
