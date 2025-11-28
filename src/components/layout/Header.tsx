"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { name: 'AI News', href: '/news' },
  { name: 'Reviews & Comparisons', href: '/reviews' },
  { name: 'Sector Guides', href: '/guides' },
  { name: 'Blog', href: '/blog' }, // Blog linkini buraya da ekliyoruz
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-10 w-full 
                       bg-white/80 dark:bg-slate-900/80 
                       backdrop-blur-md border-b border-gray-200 dark:border-slate-800">
      <div className="flex items-center h-16 px-8">
        
        {/* Sol taraf boş (Mobil menü butonu WorkspaceLayout'ta) */}
        <div className="flex-1"></div>

        {/* Orta: Navigasyon Linkleri (Masaüstü) */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                  ${isActive 
                    ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' 
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-gray-50 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800'
                  }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Sağ taraf boş (İleride Profil/Search eklenebilir) */}
        <div className="flex-1"></div>
      </div>
    </header>
  );
}

