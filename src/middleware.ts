import { NextRequest, NextResponse } from "next/server";

const ADMIN_PATHS = ["/admin"];
const ADMIN_PUBLIC_PATHS = ["/admin/login"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminPath = ADMIN_PATHS.some((p) => pathname.startsWith(p));
  const isPublicAdminPath = ADMIN_PUBLIC_PATHS.some((p) => pathname.startsWith(p));

  if (isAdminPath && !isPublicAdminPath) {
    const session = request.cookies.get("admin_session");
    const isAuthenticated = session?.value === process.env.ADMIN_SESSION_SECRET;

    if (!isAuthenticated) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
