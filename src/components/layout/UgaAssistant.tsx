"use client";
import { useState } from 'react';
import Image from 'next/image';
import UgaChatbot from '@/components/tools/UgaChatbot';

export default function UgaAssistant() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      {/* Floating UGA Button */}
      <div
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-8 right-8 z-50 cursor-pointer transition-all hover:scale-110"
      >
        <div className="relative w-32 h-32 animate-float">
          <Image
            src="/uga.png"
            alt="UGA Assistant"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Chat Pop-up */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-8 z-50 w-72">
          <div className="relative">
            <button
              onClick={() => setIsChatOpen(false)}
              className="absolute -top-2 -right-2 z-10 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <UgaChatbot />
          </div>
        </div>
      )}
    </>
  );
}

