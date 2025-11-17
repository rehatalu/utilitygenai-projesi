"use client";

import { useState } from 'react';
import { HiOutlineClipboard, HiOutlineCheck } from 'react-icons/hi';

interface ClipboardButtonProps {
  // Kopyalanacak metin
  textToCopy: string;
  // Ekstra stil sınıfları eklemek için
  className?: string;
}

export default function ClipboardButton({ textToCopy, className = '' }: ClipboardButtonProps) {
  // 'copied' durumu, "Kopyalandı!" bildirimini yönetir
  const [copied, setCopied] = useState(false);

  // Panoya kopyalama fonksiyonu
  const handleCopy = () => {
    // Zaten kopyalandıysa tekrar tıklamayı engelle
    if (copied) return;

    // Tarayıcının 'navigator' API'sini kullanarak metni kopyala
    navigator.clipboard.writeText(textToCopy).then(() => {
      // Başarılı olursa:
      setCopied(true);
      
      // 2 saniye sonra "Kopyalandı!" durumunu sıfırla
      // (Böylece kullanıcı tekrar kopyalayabilir)
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }).catch(err => {
      console.error("Metin kopyalanamadı: ", err);
    });
  };

  return (
    <button
      onClick={handleCopy}
      disabled={copied} // Kopyalandı durumundayken butonu devre dışı bırak
      className={`relative p-2 rounded-lg transition-colors
                  ${
                    copied
                      ? 'bg-green-700 text-white' // Kopyalandı rengi
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600' // Normal renk
                  }
                  ${className}` // Dışarıdan gelen ekstra sınıflar
                }
      aria-label={copied ? "Copied to clipboard" : "Copy to clipboard"}
    >
      {/* İkonlar arası geçişi yumuşatmak için (optional) */}
      <span className="sr-only">{copied ? "Copied" : "Copy"}</span>
      
      {/* İkonu durum'a göre değiştir */}
      {copied ? (
        <HiOutlineCheck className="h-5 w-5" />
      ) : (
        <HiOutlineClipboard className="h-5 w-5" />
      )}
    </button>
  );
}

