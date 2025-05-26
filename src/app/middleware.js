import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const isAuthenticated = request.cookies.has("auth-token");

  // Public paths that don't require authentication
  const isPublicPath = pathname === "/login";

  // Protected paths that require authentication
  const isProtectedPath =
    pathname === "/" ||
    pathname === "/dashboard" ||
    pathname.startsWith("/dashboard/");

  // Allow access to static files and API routes
  if (pathname.startsWith("/_next") || pathname.includes("/api/")) {
    return NextResponse.next();
  }

  // If the user is on a protected path and not authenticated, redirect to login
  if (isProtectedPath && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If the user is authenticated and tries to access login page, redirect to dashboard
  if (isPublicPath && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Match specific routes that need protection
export const config = {
  matcher: ["/", "/login", "/dashboard", "/dashboard/:path*"],
};
