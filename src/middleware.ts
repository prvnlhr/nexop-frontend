import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "./lib/auth/session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // Skip static files and API routes
  if (pathname.startsWith("/_next") || pathname.startsWith("/api")) {
    return response;
  }

  const auth = await createServerClient();
  const { user } = await auth.getSession();

  // Set session data for client components
  if (user) {
    await auth.setSession({ user });
  } else {
    response.cookies.delete("session_data");
  }

  // 1. Handle unauthenticated users
  if (!user) {
    // Allow access to auth pages and public shop routes
    if (
      pathname.startsWith("/admin/auth") ||
      pathname.startsWith("/shop/auth") ||
      (pathname.startsWith("/shop") && !pathname.startsWith("/shop/user"))
    ) {
      return response;
    }

    // Redirect to appropriate sign-in for protected routes
    if (pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/admin/auth/sign-in", request.url));
    }
    if (pathname.startsWith("/shop/user")) {
      return NextResponse.redirect(new URL("/shop/auth/sign-in", request.url));
    }
  }
  // 2. Handle authenticated users
  else {
    // 2a. Admin users
    if (user.role === "admin") {
      // Redirect away from auth pages
      if (
        pathname.startsWith("/admin/auth") ||
        pathname.startsWith("/shop/auth")
      ) {
        return NextResponse.redirect(
          new URL("/admin/inventory/products", request.url)
        );
      }
      // Allow all other routes
      return response;
    }

    // 2b. Customer users
    if (user.role === "customer") {
      // Block all admin routes
      if (pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/shop", request.url));
      }

      // Redirect away from auth pages
      if (pathname.startsWith("/shop/auth")) {
        return NextResponse.redirect(new URL("/shop", request.url));
      }

      // Verify user-specific routes
      if (pathname.startsWith("/shop/user")) {
        const userIdFromPath = pathname.split("/")[3];
        if (userIdFromPath && userIdFromPath !== user.id) {
          const correctPath = pathname.replace(userIdFromPath, user.id);
          return NextResponse.redirect(new URL(correctPath, request.url));
        }
      }

      // Allow all other shop routes
      return response;
    }
  }

  // 3. Handle root path
  if (pathname === "/") {
    return NextResponse.redirect(
      new URL(
        user?.role === "admin" ? "/admin/inventory/products" : "/shop",
        request.url
      )
    );
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
