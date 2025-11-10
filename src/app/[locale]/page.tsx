"use client";

import { useLocale } from "next-intl";

export default function Home() {
  const locale = useLocale();

  return (
    <main>
      <h1>Dil Desteği Geri Yüklendi!</h1>
      <p>Şu anki dil: {locale}</p>
    </main>
  );
}

