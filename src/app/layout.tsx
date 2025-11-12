import type { ReactNode } from "react";
import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | UtilityGenAI",
    default: "UtilityGenAI - Free AI Tools & Productivity Suite",
  },
  description:
    "A free collection of AI-powered tools (like Email, Paraphraser, Social Post generators) and utilities to boost your productivity. 7-to-70 tools for everyone.",
  keywords: ["AI tools", "free tools", "productivity", "paraphraser", "generator"],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${sora.variable} antialiased bg-slate-950 text-slate-300 relative isolate overflow-hidden`}
      >
        {/* Google AdSense Doğrulama Kodu */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7523987710595128"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {/* Arka Plan "Görsel" (Grid Deseni) */}
        <div
          className="absolute inset-0 -z-10"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(30, 41, 59, 0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(30, 41, 59, 0.5) 1px, transparent 1px)",
            backgroundSize: "3rem 3rem",
          }}
        />
        {/* Arka Plan "Görsel" (Vurgu Işığı - aiNext linki gibi) */}
        <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2" aria-hidden="true">
          <div
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-b from-[#4f46e5] via-transparent to-transparent opacity-20"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        {children}
      </body>
    </html>
  );
}

