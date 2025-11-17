"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Sekme verisi için tip tanımı
type Tab = {
  id: string;
  label: string;
  content: React.ReactNode;
};

// Bileşen prop'ları için tip tanımı
interface AnimatedTabsProps {
  tabs: Tab[];
  initialTabId?: string;
}

export default function AnimatedTabs({ tabs, initialTabId }: AnimatedTabsProps) {
  const [activeTab, setActiveTab] = useState(initialTabId || tabs[0].id);

  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className="w-full">
      {/* 1. Sekme Başlıkları (Button'lar) */}
      <nav className="flex border-b border-gray-200 dark:border-slate-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors
              ${
                activeTab === tab.id
                  ? 'text-indigo-600 dark:text-white' // Aktif sekme rengi
                  : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200' // Pasif sekme rengi
              }
            `}
          >
            {/* Sekme başlığı */}
            {tab.label}

            {/* 2. Kayan Vurgu Çizgisi (Animasyonlu Kısım) */}
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-tab-indicator" // Bu ID, animasyonun sihrini yapar
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500"
                style={{ borderRadius: '2px' }}
              />
            )}
          </button>
        ))}
      </nav>

      {/* 3. Sekme İçeriği (Animasyonlu Geçiş) */}
      <div className="relative mt-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            // Soluklaşarak girme ve çıkma animasyonu
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            {activeTabData ? activeTabData.content : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

