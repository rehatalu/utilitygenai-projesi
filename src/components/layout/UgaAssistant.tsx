"use client";
import { useState } from 'react';
import Image from 'next/image';
import UgaChatbot from '@/components/tools/UgaChatbot';
import { XMarkIcon } from '@heroicons/react/24/solid';

export default function UgaAssistant() {
  const [showBubble, setShowBubble] = useState(false);
  // YENİ STATE: Sohbet penceresi açık mı?
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleUgaClick = () => {
    setIsChatOpen(true); // Tıklayınca "pop up"ı aç
    setShowBubble(false); // Baloncuğu gizle
  };

  return (
    <>
      {/* SOHBET POP-UP'I (Sadece 'isChatOpen' true ise görünür) */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-8 z-50 w-full max-w-md">
          {/* Bu, "Adım 73"te (Bölüm 1) oluşturduğumuz Chatbot bileşenidir */}
          <UgaChatbot />
          
          {/* Kapatma Butonu */}
          <button 
            onClick={() => setIsChatOpen(false)}
            className="absolute -top-2 -right-2 p-1 bg-red-600 rounded-full text-white shadow-lg hover:bg-red-700"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* UGA İKONU (Sadece sohbet kapalıysa görünür) */}
      {!isChatOpen && (
        <div
          className="fixed bottom-8 right-8 z-40 flex flex-col items-center cursor-pointer hover:scale-110 transition-transform duration-300"
          onClick={handleUgaClick}
          onMouseEnter={() => setShowBubble(true)}
          onMouseLeave={() => setShowBubble(false)}
        >
          {/* Baloncuk (Değişmedi) */}
          {showBubble && (
            <div className="absolute -top-12 right-12 bg-slate-800 text-white text-sm px-3 py-1 rounded-md shadow-lg whitespace-nowrap">
              Hi, I'm UGA! How can I help?
            </div>
          )}
          {/* Resim (Değişmedi) */}
          <div className="relative w-32 h-32 animate-float">
            <Image
              src="/uga.png"
              alt="UGA AI Assistant"
              fill
              className="object-contain"
              sizes="128px"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}

