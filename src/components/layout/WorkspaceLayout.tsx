"use client";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { motion } from "framer-motion";
import { Bars3Icon } from "@heroicons/react/24/outline"; // Hamburger ikonu için

interface WorkspaceLayoutProps {
  children: React.ReactNode;
}

export default function WorkspaceLayout({ children }: WorkspaceLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Mobil Hamburger Butonu */}
      <motion.button
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-slate-800/70 text-white md:hidden"
        onClick={toggleSidebar}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        aria-label="Toggle Sidebar"
      >
        <Bars3Icon className="w-6 h-6" />
      </motion.button>

      {/* Sidebar (Yan Menü) */}
      <motion.div
        initial={false} // Framer Motion'ın başlangıç durumunu elle yönetmek için
        animate={{
          x: isSidebarOpen ? 0 : "-100%", // Mobil görünümde menüyü aç/kapa
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed inset-y-0 left-0 z-40 w-64
                   md:relative md:translate-x-0 md:w-72 
                   bg-slate-900 border-r border-slate-800 
                   flex-shrink-0 overflow-hidden"
      >
        <Sidebar closeSidebar={() => setIsSidebarOpen(false)} />
      </motion.div>

      {/* Menü açıkken mobil arkaplan overlay'i */}
      {isSidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black z-30 md:hidden"
        />
      )}

      {/* Ana İçerik Alanı */}
      <main className="flex-1 overflow-y-auto px-4 py-8 sm:px-8 md:ml-72">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}

