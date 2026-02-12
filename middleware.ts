import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const lowercasePath = pathname.toLowerCase();

  // 🔁 Redirige solo si hay mayúsculas
  if (pathname !== lowercasePath) {
    const url = request.nextUrl.clone();
    url.pathname = lowercasePath;
    url.search = search;
    return NextResponse.redirect(url, 301);
  }

  // ✅ Deja que next-intl resuelva locale (sin prefijo)
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
