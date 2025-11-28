import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import { ReactNode } from "react";
import "./main.css"; // 'main.css' kullanıyoruz
import UgaAssistant from "@/components/layout/UgaAssistant";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora", weight: ["600", "700"], display: "swap" });

export const metadata: Metadata = {
  title: { template: '%s | UtilityGenAI', default: 'UtilityGenAI - Free AI Tools' },
  description: 'A free collection of AI-powered tools (Email, Paraphraser, etc.) to boost your productivity.',
  icons: {
    icon: '/favicon.svg',
  },
  verification: {
    google: 'tMG23TwFvoFnbWZjFrmxeNsVVvI6xJBYG0hkLlReWJk',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // 1. "dark" sınıfı kaldırıldı. ThemeSwitcher yönetecek.
    <html lang="en" className="">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7523987710595128" crossOrigin="anonymous"></script>
      </head>
      
      <body 
        className={`${inter.variable} ${sora.variable} antialiased 
                    bg-white text-slate-900 
                    dark:bg-slate-950 dark:text-slate-300 
                    relative isolate overflow-hidden transition-colors duration-300`} 
      >
        {/* "Görsel Grid Desenli" Arka Plan */}
        <div 
          className="absolute inset-0 -z-10 bg-grid-pattern"
          aria-hidden="true"
        />
        <div 
          className="absolute left-1/2 top-0 -z-10 -translate-x-1/2"
          aria-hidden="true"
        >
          {/* Gradient Arka Plan */}
          <div 
            className="aspect-[1097/845] w-[68.5625rem] 
                       bg-gradient-radial from-indigo-100 via-transparent to-transparent
                       dark:from-[#4f46e5] dark:via-transparent dark:to-transparent
                       opacity-60 dark:opacity-20"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        
        {children} 
        
        <UgaAssistant />
      </body>
    </html>
  );
}
