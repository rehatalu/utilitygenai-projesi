"use client";
import { useState, useEffect } from 'react';
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi';

export default function ThemeSwitcher({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    // Eğer kayıtlı tema yoksa veya 'dark' ise karanlık yap
    if (!savedTheme || savedTheme === 'dark') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  if (!mounted) return <div className={`w-9 h-9 ${className}`} />;

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg transition-colors 
                  text-slate-500 hover:text-slate-900 hover:bg-gray-200
                  dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800
                  ${className}`}
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? <HiOutlineSun className="w-5 h-5" /> : <HiOutlineMoon className="w-5 h-5" />}
    </button>
  );
}
