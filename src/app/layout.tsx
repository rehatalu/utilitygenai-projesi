import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css"; // 'main.css' değil, 'globals.css' (Orijinal)

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: { template: '%s | UtilityGenAI', default: 'UtilityGenAI - Free AI Tools' },
  description: 'A free collection of AI-powered tools...',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7523987710595128" crossOrigin="anonymous"></script>
      </head>
      
      {/* "GÜVENLİ MOD": Düz, koyu zemin. Grid/Blur yok. */}
      <body className={`${inter.variable} antialiased bg-slate-900 text-slate-300`}>
        {children} 
        {/* "UGA Assistant" (SİZİN İSTEĞİNİZ ÜZERİNE) KALDIRILDI. */}
      </body>
    </html>
  );
}
