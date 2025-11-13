"use client";

import { useState } from "react";
import Image from "next/image";

export default function UgaAssistant() {
  const [showBubble, setShowBubble] = useState(false);

  return (
    <div
      className="fixed bottom-8 right-8 z-50 flex flex-col items-center cursor-pointer hover:scale-110 transition-transform duration-300"
      onClick={() => (window.location.href = "/")}
      onMouseEnter={() => setShowBubble(true)}
      onMouseLeave={() => setShowBubble(false)}
    >
      {showBubble && (
        <div className="absolute -top-12 right-12 bg-slate-800 text-white text-sm px-3 py-1 rounded-md shadow-lg whitespace-nowrap ring-1 ring-slate-700 backdrop-blur-md">
          Hi, I&apos;m UGA! How can I help?
        </div>
      )}
      <div className="relative w-32 h-32 animate-float transition-all hover:scale-110">
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
  );
}

