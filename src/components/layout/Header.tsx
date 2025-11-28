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
                       bg-white/80 dark:bg-slate-950/80 
                       backdrop-blur-xl 
                       border-b border-slate-200 dark:border-slate-800
                       shadow-sm dark:shadow-slate-900/50
                       transition-all duration-300">
      <div className="flex items-center h-16 px-4 md:px-8 mx-auto max-w-7xl justify-between">
        <div className="w-8 md:hidden"></div> 
        
        <nav className="hidden md:flex items-center gap-1 mx-auto 
                        bg-white/90 dark:bg-slate-900/90 
                        p-1.5 rounded-full 
                        border border-slate-300 dark:border-slate-600 
                        shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_20px_rgba(99,102,241,0.15)]
                        backdrop-blur-md transition-all">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link key={link.href} href={link.href} className="relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 group hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/10">
                {isActive && (
                  <motion.div
                    layoutId="header-active"
                    className="absolute inset-0 bg-indigo-50 dark:bg-indigo-900/30 rounded-full shadow-sm border border-indigo-100 dark:border-indigo-800"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 ${isActive ? 'text-indigo-700 dark:text-indigo-300 font-semibold' : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400'}`}>
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
