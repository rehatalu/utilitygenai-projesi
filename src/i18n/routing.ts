export const locales = ["en-US", "en-GB"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en-US";

export const localePrefix = "always";

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && locales.includes(value as Locale);
}

export function getAlternateLocale(current: Locale): Locale {
  return current === "en-US" ? "en-GB" : "en-US";
}

