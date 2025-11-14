"use client";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  // Bu, Adım 42'deki "Nihai Kaydırma Çözümü" mimarisidir
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-shrink-0 overflow-y-auto bg-gray-900">
          <Sidebar />
        </div>
        <main className="flex-1 w-full px-4 py-8 sm:px-8 overflow-y-auto">
          {children} {/* Ana Sayfa veya Araç Sayfası buraya gelecek */}
        </main>
      </div>
      <Footer />
    </div>
  );
}

