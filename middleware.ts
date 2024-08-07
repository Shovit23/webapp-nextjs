import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  // const accessToken = request.cookies.get("next-auth.session-token")?.value || null;
  // const path = request.nextUrl.pathname;
  
  // const isAdmin = path === "/admin";
  // const landing = path === "/"
  // const isPublic = path === "/login" || path === "/signup" || path === "/reset";
  // if (isPublic && accessToken) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }
  // if (!isPublic && !accessToken) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/jira/:path*",
    "/confluence/:path*",
    "/devops/:path*",
    "/sonarqube/:path*",
    "/admin/:path*",
    "/jira",
    "/confluence",
    "/profile/:path*",
    "/devops",
    "/sonarqube",
    "/login",
    "/signup",
    "/reset"
  ],
};
