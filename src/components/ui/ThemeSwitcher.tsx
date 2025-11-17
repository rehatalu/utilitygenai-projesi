"use client";

import { useState, useEffect } from 'react';
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi';

// Temayı yönetmek için özel bir hook (yardımcı fonksiyon)
function useTheme() {
  const [theme, setTheme] = useState('dark'); // Varsayılan tema 'dark'

  // Bu useEffect SADECE ilk yüklendiğinde çalışır (client-side)
  useEffect(() => {
    // Tarayıcının hafızasındaki (localStorage) temayı oku
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      // <html> etiketine 'dark' sınıfını ekle veya kaldır
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      // Eğer hafızada yoksa, 'dark' varsayılanını uygula
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Temayı değiştiren fonksiyon
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    // Yeni seçimi hafızaya kaydet
    localStorage.setItem('theme', newTheme);
    // <html> etiketindeki 'dark' sınıfını güncelle
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return { theme, toggleTheme };
}


// Ana Tema Değiştirici Buton Bileşeni
export default function ThemeSwitcher({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`flex items-center justify-center p-2 rounded-lg 
                  transition-colors 
                  bg-slate-800 hover:bg-slate-700
                  text-slate-300 hover:text-white
                  ${className}`}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? (
        <HiOutlineMoon className="h-5 w-5" /> // Aydınlıksa Ay ikonunu göster
      ) : (
        <HiOutlineSun className="h-5 w-5" /> // Karanlıksa Güneş ikonunu göster
      )}
    </button>
  );
}

