import createMiddleware from "next-intl/middleware";
import { defaultLocale, localePrefix, locales } from "@/i18n/routing";

export default createMiddleware({
  defaultLocale,
  localePrefix,
  locales,
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};

