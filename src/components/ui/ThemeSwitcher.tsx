"use client";

import { useState, useEffect } from 'react';
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi';

// Temayı yönetmek için özel bir hook (yardımcı fonksiyon)
function useTheme() {
  // Strateji: Varsayılan state 'dark' oldu (Görev 10.5 isteği)
  const [theme, setTheme] = useState('dark');

  // Bu useEffect SADECE ilk yüklendiğinde çalışır (client-side)
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      // Hafızada (localStorage) ne varsa onu uygula
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      // Hafızada bir şey yoksa, 'dark' uygula
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []); // Boş dependency array, sadece ilk yüklemede çalışır

  // Temayı değiştiren fonksiyon (Bu kod doğru)
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return { theme, toggleTheme };
}


// Ana Tema Değiştirici Buton Bileşeni
export default function ThemeSwitcher({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Görsel kaymayı engeller (CLS)
    return <div className={`h-[36px] w-[36px] ${className}`} />;
  }

  return (
    <button
      onClick={toggleTheme}
      className={`flex items-center justify-center p-2 rounded-lg 
                  transition-colors 
                  bg-gray-100 hover:bg-gray-200 text-slate-700
                  dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 dark:hover:text-white
                  ${className}`}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Düzeltilmiş İkon Mantığı */}
      {theme === 'dark' ? (
        <HiOutlineSun className="h-5 w-5" /> // Karanlıktayız, Güneş'i (Aydınlığa Geç) göster
      ) : (
        <HiOutlineMoon className="h-5 w-5" /> // Aydınlıktayız, Ay'ı (Karanlığa Geç) göster
      )}
    </button>
  );
}
