import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";
import { ROUTE } from "./lib/route";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith(ROUTE.LOGIN)) {
    const sessionCookie = getSessionCookie(request);

    if (sessionCookie) {
      return NextResponse.redirect(new URL(ROUTE.DASHBOARD.FORM.LIST, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
