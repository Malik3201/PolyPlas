import { NextResponse } from "next/server";
import { getImageKitAuthParams } from "@/lib/imagekit";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (!session?.value || session.value !== process.env.ADMIN_SESSION_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const params = getImageKitAuthParams();
    return NextResponse.json(params);
  } catch {
    return NextResponse.json({ error: "Failed to generate auth params" }, { status: 500 });
  }
}
