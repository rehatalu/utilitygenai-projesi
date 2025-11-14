"use client";

import { useState } from 'react';
import Image from 'next/image';

export default function UgaAssistant() {
  const [showBubble, setShowBubble] = useState(false);

  return (
    <div
      className="fixed bottom-8 right-8 z-50 cursor-pointer transition-all hover:scale-110 animate-float"
      onMouseEnter={() => setShowBubble(true)}
      onMouseLeave={() => setShowBubble(false)}
      onClick={() => (window.location.href = '/')}
    >
      {showBubble && (
        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg shadow-lg whitespace-nowrap">
          Click me to go home!
        </div>
      )}
      <div className="relative w-32 h-32">
        <Image
          src="/uga.png"
          alt="UGA Assistant"
          fill
          className="object-contain"
          sizes="128px"
          priority
        />
      </div>
    </div>
  );
}

