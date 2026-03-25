import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

const protectedPaths = [
  "/dashboard",
  "/leads",
  "/calls",
  "/demos",
  "/clients",
  "/team",
  "/settings",
];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (isProtected && !req.auth) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/leads/:path*",
    "/calls/:path*",
    "/demos/:path*",
    "/clients/:path*",
    "/team/:path*",
    "/settings/:path*",
  ],
};
