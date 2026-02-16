import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

const intl = createMiddleware(routing);

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const lowercasePath = pathname.toLowerCase();

  if (pathname !== lowercasePath) {
    const url = request.nextUrl.clone();
    url.pathname = lowercasePath;
    url.search = search;
    return NextResponse.redirect(url, 301);
  }

  return intl(request);
}

export const config = {
  matcher: ["/", "/((?!api|_next|.*\\..*).*)"],
};
