import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n";

const PUBLIC_FILE = /\.[^/]+$/;

function detectLocale(req: NextRequest): string {
  const cookie = req.cookies.get("NEXT_LOCALE")?.value;
  if (cookie && (locales as readonly string[]).includes(cookie)) return cookie;

  const accept = req.headers.get("accept-language")?.toLowerCase() ?? "";
  if (accept.includes("kk") || accept.includes("kz")) return "kz";
  if (accept.includes("ru")) return "ru";
  return defaultLocale;
}

export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip Next internals, API and static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Already locale-prefixed?
  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return NextResponse.next();

  // Redirect bare paths to the detected locale
  const locale = detectLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
