import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getAlternateLocale, isLocale } from "@/i18n/routing";

type HomePageProps = Readonly<{
  params: {
    locale: string;
  };
}>;

export default async function HomePage({ params: { locale } }: HomePageProps) {
  if (!isLocale(locale)) {
    throw new Error("Unsupported locale");
  }

  const t = await getTranslations("Home");
  const alternateLocale = getAlternateLocale(locale);

  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center gap-6 p-6 text-center">
      <h1 className="text-4xl font-bold md:text-5xl">{t("heading")}</h1>
      <p className="max-w-xl text-balance text-gray-600">{t("tagline")}</p>
      <Link
        href={`/${alternateLocale}`}
        className="text-blue-600 underline underline-offset-4 transition hover:text-blue-500"
      >
        {t("switch_link")}
      </Link>
      <span className="text-sm text-gray-500">{t("current_locale")}</span>
      <Link
        href={`/${locale}/tools`}
        className="rounded-md border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-600 hover:text-white"
      >
        {t("tools_link")}
      </Link>
    </main>
  );
}

