import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { defaultLocale, locales } from "@/i18n/routing";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UtilityGenAI",
  description: "AI tabanlı araçlar ve finansal hesaplayıcılar için temel altyapı.",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
  params: {
    locale?: string;
  };
}>;

export default function RootLayout({ children, params }: RootLayoutProps) {
  const activeLocale = locales.includes(params.locale as (typeof locales)[number])
    ? (params.locale as (typeof locales)[number])
    : defaultLocale;

  return (
    <html lang={activeLocale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
