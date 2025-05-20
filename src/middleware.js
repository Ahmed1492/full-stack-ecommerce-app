// // middleware.js
// import { NextResponse } from "next/server";

// export function middleware(request) {
//   const token = request.cookies.get("refreshToken");
//   const isLoggedIn = !!token;
//   const pathname = request.nextUrl.pathname;

//   // Allow public routes without token
//   if (pathname === "/login" || pathname.startsWith("/public")) {
//     if (pathname === "/login" && isLoggedIn) {
//       // Redirect logged-in user away from login
//       return NextResponse.redirect(new URL("/", request.url));
//     }
//     return NextResponse.next();
//   }

//   // For any other routes, check if logged in
//   if (!isLoggedIn) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   // Logged-in users can access everything else
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"], // Match all except Next.js assets
// };


// ----------------------------------------


// middleware.js
import { createClient, OAuthStrategy } from "@wix/sdk";
import { NextResponse } from "next/server";


/*
- You must use request.cookies here because you're on the server and have no access 
  to browser APIs like document.cookie or js-cookie
*/

export async function middleware(request) {
  const token = request.cookies.get("refreshToken");
  const isLoggedIn = !!token;
  const pathname = request.nextUrl.pathname;

  // Allow public routes
  if (pathname === "/login" || pathname.startsWith("/public")) {
    if (pathname === "/login" && isLoggedIn) {
      // Redirect logged-in user away from login page
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // If token already exists, let the request continue
  if (isLoggedIn) {
    return NextResponse.next();
  }

  // If no token, generate one
  const wixClient = createClient({
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID,
    }),
  });

  const tokens = await wixClient.auth.generateVisitorTokens();

  // Create a response object
  const res = NextResponse.next();

  // Set refreshToken cookie on the response
  res.cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  return res;
}

// Match all routes except static files and favicon
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
