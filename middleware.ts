import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en-US", "en-GB"],
  defaultLocale: "en-US",
});

export const config = {
  matcher: ["/", "/(en-US|en-GB)/:path*"],
};
