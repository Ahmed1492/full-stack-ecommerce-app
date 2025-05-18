// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("refreshToken");
  const isLoggedIn = !!token;
  const pathname = request.nextUrl.pathname;

  // Allow public routes without token
  if (pathname === "/login" || pathname.startsWith("/public")) {
    if (pathname === "/login" && isLoggedIn) {
      // Redirect logged-in user away from login
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // For any other routes, check if logged in
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Logged-in users can access everything else
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"], // Match all except Next.js assets
};
