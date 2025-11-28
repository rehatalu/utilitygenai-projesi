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
                       backdrop-blur-xl border-b border-slate-300 dark:border-slate-700
                       transition-all duration-300">
      <div className="flex items-center h-16 px-4 md:px-8 mx-auto max-w-7xl justify-between">
        <div className="w-8 md:hidden"></div> {/* Mobil Boşluk */}
        
        <nav className="hidden md:flex items-center gap-1 mx-auto">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link key={link.href} href={link.href} className="relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 group">
                {isActive && (
                  <motion.div
                    layoutId="header-active"
                    className="absolute inset-0 bg-indigo-100 dark:bg-indigo-500/20 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 ${isActive ? 'text-indigo-700 dark:text-indigo-300' : 'text-slate-600 dark:text-slate-400 group-hover:text-black dark:group-hover:text-white'}`}>
                  {link.name}
                </span>
              </Link>
            );
          })}
        </nav>
        <div className="w-8"></div>
      </div>
    </header>
  );
}
