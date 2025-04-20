import acceptLanguage from "accept-language";
import { NextRequest, NextResponse } from "next/server";

import { fallbackLng, languages } from "@/src/i18n/settings";

acceptLanguage.languages(languages);

export const config = {
  matcher: "/:lng*",
};

const cookieName = "i18next";

export function middleware(req: NextRequest) {
  let lng;
  let theme: string | undefined;

  if (req.cookies.has(cookieName))
    lng = acceptLanguage.get(req.cookies.get(cookieName)?.value);

  if (req.cookies.has("theme")) theme = req.cookies.get("theme")?.value;
  theme = theme ?? "light";

  if (!lng) lng = acceptLanguage.get(req.headers.get("Accept-Language"));

  if (!lng) lng = fallbackLng;

  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL(`/${lng}`, req.url));
  }

  if (req.headers.has("referer")) {
    const refererUrl = new URL(req.headers.get("referer") as string);
    const lngInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`),
    );
    const response = NextResponse.next();

    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    response.headers.set("theme", theme);

    return response;
  }

  return NextResponse.next();
}
