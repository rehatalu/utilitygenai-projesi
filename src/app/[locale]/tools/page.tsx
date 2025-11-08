import { getTranslations } from "next-intl/server";

type ToolsPageProps = Readonly<{
  params: {
    locale: string;
  };
}>;

export default async function ToolsPage({ params }: ToolsPageProps) {
  const t = await getTranslations("Navigation");

  return (
    <section className="mx-auto flex max-w-4xl flex-col gap-4 p-6">
      <h1 className="text-3xl font-semibold">{t("tools")}</h1>
      <p className="text-gray-600">
        Coming soon: finance calculators and AI writing helpers tailored for {params.locale}.
      </p>
    </section>
  );
}

