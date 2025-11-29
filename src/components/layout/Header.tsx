"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { HiSearch } from 'react-icons/hi';

const navLinks = [
  { name: 'Tools', href: '/' },
  { name: 'News', href: '/news' },
  { name: 'Reviews', href: '/reviews' },
  { name: 'Guides', href: '/guides' },
  { name: 'Blog', href: '/blog' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-slate-900/50 transition-all duration-300">
      <div className="flex items-center h-16 px-4 md:px-8 mx-auto max-w-7xl justify-between">
        
        {/* Sol: Mobil Menü için Boşluk */}
        <div className="w-8 md:hidden"></div> 

        {/* Orta: Navigasyon */}
        <nav className="hidden md:flex items-center gap-1 mx-auto bg-slate-100/50 dark:bg-slate-900/50 p-1 rounded-full border border-slate-200 dark:border-slate-800">
          {navLinks.map((link) => {
            const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
            
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 group"
              >
                {isActive && (
                  <motion.div
                    layoutId="header-active"
                    className="absolute inset-0 bg-white dark:bg-slate-800 rounded-full shadow-sm border border-slate-200 dark:border-slate-700"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 ${
                  isActive 
                    ? 'text-indigo-600 dark:text-indigo-400 font-semibold' 
                    : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200'
                }`}>
                  {link.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Sağ: Search İkonu */}
        <div className="flex items-center justify-end w-8 md:w-auto">
            <button 
                className="p-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Search"
            >
                <HiSearch className="w-5 h-5" />
            </button>
        </div>
        
      </div>
    </header>
  );
}
