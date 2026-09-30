// Fix due to github's change
// https://github.com/langfuse/langfuse/issues/13091

// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/api/auth/callback/github") {
    const url = request.nextUrl.clone();
    if (url.searchParams.has("iss")) {
      url.searchParams.delete("iss");
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/auth/callback/:provider*"],
};
