"use client";

import { useState } from "react";
import Image from "next/image";

export default function UgaAssistant() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Konuşma Balonu (Hover'da görünür) */}
        {isHovered && (
          <div className="absolute bottom-full right-0 mb-3 rounded-lg bg-slate-800 px-4 py-2 shadow-xl ring-1 ring-slate-700 backdrop-blur-md">
            <p className="text-sm font-medium text-white whitespace-nowrap">
              Hi, I&apos;m UGA! How can I help?
            </p>
            {/* Ok işareti (balonun altında) */}
            <div className="absolute top-full right-6 -mt-1 h-2 w-2 rotate-45 bg-slate-800 ring-1 ring-slate-700"></div>
          </div>
        )}

        {/* UGA Görseli */}
        <div className="relative h-16 w-16 rounded-full bg-slate-800/80 p-2 shadow-2xl ring-2 ring-indigo-500/30 backdrop-blur-md transition-all hover:ring-indigo-500/60 hover:scale-110 animate-float-slow">
          <Image
            src="/uga.jpg"
            alt="UGA Assistant"
            fill
            className="rounded-full object-cover"
            sizes="64px"
          />
        </div>
      </div>
    </div>
  );
}

