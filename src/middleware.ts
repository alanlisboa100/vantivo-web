import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for Supabase auth cookie
  const hasSession = request.cookies.has("sb-frcnaraherfzduyvqqxf-auth-token") ||
    request.cookies.has("sb-frcnaraherfzduyvqqxf-auth-token-code-verifier");

  const isAuthPage =
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/otp") ||
    pathname.startsWith("/reset-password");

  const isDashboard = pathname.startsWith("/dashboard");

  if (!hasSession && isDashboard) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (hasSession && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|assets/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
