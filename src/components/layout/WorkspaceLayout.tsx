"use client";

import { useState } from 'react';
import { HiMenuAlt2 } from 'react-icons/hi';
import Sidebar from './Sidebar';
import Link from 'next/link';

interface WorkspaceLayoutProps {
  children: React.ReactNode;
}

export default function WorkspaceLayout({ children }: WorkspaceLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Bu state artık hem mobili hem masaüstünü kontrol edecek

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100">
      
      {/* 1. MOBİL Menü Arka Planı (Overlay) */}
      {/* Bu hala sadece mobilde (md:hidden) çalışmalı */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
          aria-hidden="true"
        />
      )}

      {/* 2. SIDEBAR (Yan Menü) */}
      {/* `md:static` ve `md:translate-x-0` kaldırıldı.
        Artık `fixed` pozisyonu ve `transform` her zaman `sidebarOpen` state'ine bağlı.
      */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-72 
                   bg-slate-900 border-r border-slate-800
                   transform transition-transform duration-300 ease-in-out
                   ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <Sidebar closeSidebar={() => setSidebarOpen(false)} />
      </div>

      {/* 3. ANA İÇERİK ALANI */}
      {/* ÖNEMLİ DEĞİŞİKLİK: 
        Ana içerik alanı artık `sidebarOpen` state'ine göre `ml-0` (menü kapalı)
        veya `md:ml-72` (masaüstünde menü açık) olarak değişecek.
      */}
      <main 
        className={`flex-1 overflow-y-auto transition-all duration-300 ease-in-out
                   ${sidebarOpen ? 'md:ml-72' : 'ml-0'}
                  `}
      >
        
        {/* Hamburger Menü Butonu */}
        {/* `md:hidden` kaldırıldı. Artık menü kapalıyken (sidebarOpen === false)
          hem mobilde hem masaüstünde görünecek.
        */}
        <button
          type="button"
          className={`sticky top-0 z-20 p-4 bg-slate-950/80 backdrop-blur-sm
                     ${sidebarOpen ? 'hidden' : 'block'} 
                    `} // Menü açıksa gizle
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <HiMenuAlt2 className="h-6 w-6 text-white" />
        </button>

        {/* Sayfa içeriği buraya gelecek */}
        <div className="px-4 py-8 sm:px-8">
          {children}
        </div>

        {/* Ana Footer */}
        <footer className="w-full p-6 text-center text-xs text-slate-500">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mb-2">
            <Link href="/privacy" className="hover:text-slate-300">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-300">Terms of Service</Link>
            <Link href="/contact" className="hover:text-slate-300">Contact Us</Link>
            <Link href="/about" className="hover:text-slate-300">About Us</Link>
          </div>
          <p>© {new Date().getFullYear()} UtilityGenAI. All rights reserved.</p>
        </footer>

      </main>
    </div>
  );
}

