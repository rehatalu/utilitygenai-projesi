"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Bars3Icon } from '@heroicons/react/24/outline';
import Sidebar from './Sidebar';

interface WorkspaceLayoutProps {
  children: React.ReactNode;
}

export default function WorkspaceLayout({ children }: WorkspaceLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100">
      
      {/* 1. MOBİL Menü Arka Planı (Overlay) */}
      {/* Menü açılınca `sidebarOpen` ile görünecek */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
          aria-hidden="true"
        />
      )}

      {/* 2. SIDEBAR (Yan Menü) */}
      {/* Bu bölüm, masaüstünde (md:) her zaman görünecek,
        Mobilde ise `sidebarOpen` durumuna göre `-translate-x-full` (gizli) 
        veya `translate-x-0` (görünür) olacak.
      */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-72 
                   bg-slate-900 border-r border-slate-800
                   transform transition-transform duration-300 ease-in-out
                   md:translate-x-0 md:static md:inset-auto md:w-72
                   ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <Sidebar closeSidebar={() => setSidebarOpen(false)} />
      </div>

      {/* 3. ANA İÇERİK ALANI */}
      <main className="flex-1 overflow-y-auto">
        
        {/* MOBİL için Hamburger Menü Butonu */}
        <button
          type="button"
          className="sticky top-0 z-20 md:hidden p-4 bg-slate-950/80 backdrop-blur-sm"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <Bars3Icon className="h-6 w-6 text-white" />
        </button>

        {/* Sayfa içeriği buraya gelecek */}
        <div className="px-4 py-8 sm:px-8">
          {children}
        </div>

        {/* ANA FOOTER (Görev 7.6) */}
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

