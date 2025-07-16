export const runtime = "nodejs";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookie = cookies().get("admin_session");
  const isLoggedIn = cookie?.value === "valid";
  return NextResponse.json({ isLoggedIn });
}
