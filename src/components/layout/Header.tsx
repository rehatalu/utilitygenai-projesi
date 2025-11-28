"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const navLinks = [
  { name: 'AI News', href: '/news' },
  { name: 'Reviews', href: '/reviews' },
  { name: 'Sector Guides', href: '/guides' },
  { name: 'Blog', href: '/blog' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 w-full 
                       bg-white/70 dark:bg-slate-950/70 
                       backdrop-blur-xl border-b border-gray-200/50 dark:border-slate-800/50
                       transition-all duration-300">
      <div className="flex items-center h-16 px-6 md:px-8 mx-auto max-w-7xl justify-between">
        
        {/* Sol: Mobil Menü Alanı için Boşluk (Gerekirse Logo buraya da gelebilir) */}
        <div className="flex w-12 md:hidden"></div>

        {/* Orta: Navigasyon Linkleri (Masaüstü) */}
        <nav className="hidden md:flex items-center gap-2 mx-auto">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 group"
              >
                {/* Aktif Durum Arka Planı (Framer Motion ile) */}
                {isActive && (
                  <motion.div
                    layoutId="header-active-pill"
                    className="absolute inset-0 bg-indigo-50 dark:bg-indigo-500/10 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                {/* Link Metni */}
                <span className={`relative z-10 ${
                  isActive 
                    ? 'text-indigo-600 dark:text-indigo-400' 
                    : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200'
                }`}>
                  {link.name}
                </span>
                
                {/* Hover Efekti (Alt Çizgi veya Glow) */}
                {!isActive && (
                  <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-indigo-500/0 group-hover:bg-indigo-500/50 rounded-full transition-all duration-300 transform scale-x-0 group-hover:scale-x-100" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sağ: Gelecek için (Search/Profile) */}
        <div className="flex w-12"></div>
      </div>
    </header>
  );
}
