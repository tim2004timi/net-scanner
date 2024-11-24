import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const jwt = request.cookies.has("jwt");

  const url = request.nextUrl.clone();

  if (url.pathname === "/" || url.pathname === "/registration") {
    return NextResponse.next();
  }

  if (!jwt) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // '/((?!api|_next/static|_next/image|favicon.ico).*)',
    "/((?!api|static|.*\\..*|_next).*)",
  ],
};
