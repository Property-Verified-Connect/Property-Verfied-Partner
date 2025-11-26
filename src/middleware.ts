import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  console.log("🔵 Incoming Request:", pathname);

  // Read ONLY client-side cookies (middleware cannot read httpOnly cookies)
  const clientTokenUser = req.cookies.get("client_token_partner")?.value;

  console.log("🔍 Cookies in middleware:", {
    clientTokenUserExists: !!clientTokenUser,
    tokenValue: clientTokenUser || "❌ No token"
  });

  // Public routes
  const isPublicRoute =
    pathname.startsWith("/auth") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    pathname === "/";

  console.log("📌 Route check:", {
    pathname,
    isPublicRoute,
  });

  if (isPublicRoute) {
    console.log("🟢 Public route → allowed");
    return NextResponse.next();
  }

  // Protected route: needs client token
  if (!clientTokenUser) {
    console.log("❌ No client_token_partner → redirect to login");

    const loginUrl = new URL("/auth/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);

    return NextResponse.redirect(loginUrl);
  }

  // Token exists
  console.log("🟩 Token found → access granted");
  return NextResponse.next();
}

// Apply to dashboard only
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
