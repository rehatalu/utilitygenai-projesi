"use client";
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function UgaAssistant() {
  const [showBubble, setShowBubble] = useState(false);
  const router = useRouter();

  const handleUgaClick = () => {
    // Tıklandığında "Sohbet" aracına git
    router.push('/tool/uga-chat');
  };

  return (
    <div
      className="fixed bottom-8 right-8 z-50 flex flex-col items-center cursor-pointer hover:scale-110 transition-transform duration-300"
      onClick={handleUgaClick}
      onMouseEnter={() => setShowBubble(true)}
      onMouseLeave={() => setShowBubble(false)}
    >
      {/* Baloncuk */}
      {showBubble && (
        <div className="absolute -top-12 right-12 bg-slate-800 text-white text-sm px-3 py-1 rounded-md shadow-lg whitespace-nowrap">
          Hi, I'm UGA! How can I help?
        </div>
      )}
      {/* Resim */}
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
  );
}

