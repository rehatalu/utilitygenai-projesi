import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

const locales = ["en-US", "en-GB"];

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as string)) {
    notFound();
  }

  return {
    messages: {},
  };
});

