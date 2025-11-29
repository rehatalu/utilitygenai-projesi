"use client";

import { useState } from 'react';
import { HiMenuAlt2 } from 'react-icons/hi';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer'; // Yeni Footer import edildi

interface WorkspaceLayoutProps {
  children: React.ReactNode;
}

export default function WorkspaceLayout({ children }: WorkspaceLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-transparent text-slate-900 dark:text-slate-100 overflow-hidden">
      
      {/* 1. MOBİL Menü Overlay */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
          aria-hidden="true"
        />
      )}

      {/* 2. SIDEBAR (Sabit Sol Menü) */}
      <div className={`fixed inset-y-0 left-0 z-40 w-72 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 ease-in-out 
                      ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <Sidebar closeSidebar={() => setSidebarOpen(false)} />
      </div>

      {/* 3. SAĞ TARAF (Header + İçerik + Footer) */}
      <div className={`flex-1 flex flex-col h-screen transition-all duration-300 ease-in-out ${sidebarOpen ? 'md:ml-72' : 'md:ml-0'} `}>
        
        {/* A. HEADER (En Tepe - Sabit) */}
        <div className="flex-shrink-0 relative z-20">
          <button
            type="button"
            className={`absolute left-4 top-4 p-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500 transition-all z-50
                      ${sidebarOpen ? 'hidden' : 'block'}`} 
            onClick={() => setSidebarOpen(true)}
          >
            <HiMenuAlt2 className="h-6 w-6" />
          </button>
          <Header />
        </div>

        {/* B. ANA İÇERİK (Aşağısı - Kaydırılabilir) */}
        <main className="flex-1 overflow-y-auto bg-transparent relative flex flex-col">
          {/* İçerik Wrapper */}
          <div className="flex-1 p-4 md:p-8">
            {children}
          </div>
          
          {/* YENİ FOOTER (Kaydırılabilir alanın en altında) */}
          <Footer />
        </main>

      </div>
    </div>
  );
}
