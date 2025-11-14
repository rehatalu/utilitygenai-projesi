"use client";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import WelcomeHub from "@/components/tools/WelcomeHub";
import { motion } from 'framer-motion';

// Bu, Ana Sayfa (`/`) için varsayılan içeriktir
// Artık 'Sidebar' ve 'Footer'ı sarmalayan çerçeve)
export default function HomePage() {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-shrink-0 overflow-y-auto">
          <Sidebar /> 
        </div>
        <main className="flex-1 w-full px-4 py-8 sm:px-8 overflow-y-auto">
          <div className="mx-auto flex w-full max-w-4xl justify-center">
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              <WelcomeHub />
            </motion.div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

