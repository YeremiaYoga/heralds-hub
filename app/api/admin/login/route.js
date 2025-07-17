import { NextResponse } from "next/server";

function isInJawa(lat, lon) {
  return lat >= -9.0 && lat <= -5.5 && lon >= 105.0 && lon <= 114.5;
}
export async function POST(req) {
  const { username, password, location } = await req.json();

  if (!location || !location.latitude || !location.longitude) {
    return NextResponse.json(
      { message: "Lokasi tidak tersedia. Izinkan akses lokasi." },
      { status: 403 }
    );
  }

  const { latitude, longitude } = location;

  if (!isInJawa(latitude, longitude)) {
    return NextResponse.json(
      { message: "Login hanya diperbolehkan dari wilayah Jawa" },
      { status: 403 }
    );
  }

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const res = NextResponse.json({ success: true });

    res.cookies.set("admin_session", "valid", {
      httpOnly: true,
      path: "/",
      maxAge: 600 * 5,
    });

    return res;
  }

  console.log("Login gagal: Username/password salah");
  return NextResponse.json(
    { message: "Username atau password salah" },
    { status: 401 }
  );
}
