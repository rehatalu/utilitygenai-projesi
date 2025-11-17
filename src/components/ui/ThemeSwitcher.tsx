"use client";

import { useState, useEffect } from 'react';
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi';

// Temayı yönetmek için özel bir hook (yardımcı fonksiyon)
function useTheme() {
  // STRATEJİ DEĞİŞİKLİĞİ 1: Varsayılan state 'dark' oldu.
  const [theme, setTheme] = useState('dark');

  // Bu useEffect SADECE ilk yüklendiğinde çalışır (client-side)
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      // Hafızada (localStorage) ne varsa onu uygula
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      // STRATEJİ DEĞİŞİKLİĞİ 2: Hafızada bir şey yoksa, 'dark' uygula
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []); // Boş dependency array, sadece ilk yüklemede çalışır

  // Temayı değiştiren fonksiyon (Bu kod doğru, aynı kalıyor)
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

  // 'useEffect' tamamlanana kadar (hidrasyon) butonu göstermemek için
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Sunucu tarafında veya hidrasyon tamamlanmadan önce butonun yerini doldur
    // (Görsel kaymayı engeller - CLS)
    return <div className={`h-[36px] w-[36px] ${className}`} />;
  }

  return (
    <button
      onClick={toggleTheme}
      className={`flex items-center justify-center p-2 rounded-lg 
                  transition-colors 
                  bg-slate-800 hover:bg-slate-700
                  text-slate-300 hover:text-white
                  ${className}`}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* STRATEJİ DEĞİŞİKLİĞİ 3: Düzeltilmiş İkon Mantığı */}
      {theme === 'dark' ? (
        <HiOutlineSun className="h-5 w-5" /> // Karanlıktayız, Güneş'i (Aydınlığa Geç) göster
      ) : (
        <HiOutlineMoon className="h-5 w-5" /> // Aydınlıktayız, Ay'ı (Karanlığa Geç) göster
      )}
    </button>
  );
}
