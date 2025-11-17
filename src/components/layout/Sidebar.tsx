"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  EnvelopeIcon,
  DocumentDuplicateIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  TagIcon, // Meta
  CheckCircleIcon, // Grammar
  ShoppingCartIcon, // Product
  LightBulbIcon, // Blog Ideas
  VideoCameraIcon, // YouTube
  HashtagIcon, // Hashtag
  BriefcaseIcon, // Business Name
  CommandLineIcon, // Code Explainer
  DocumentTextIcon, // Summarizer
  CameraIcon, // Instagram
  XMarkIcon, // Kapatma butonu için
} from '@heroicons/react/24/outline';

// Araçların listesi (ikonlarla birlikte)
const tools = [
  { slug: 'email-generator', name: 'Email Subject Generator', icon: EnvelopeIcon },
  { slug: 'paraphraser', name: 'Paraphraser Tool', icon: DocumentDuplicateIcon },
  { slug: 'social-post', name: 'Social Post Generator', icon: ChatBubbleOvalLeftEllipsisIcon },
  { slug: 'meta-description', name: 'Meta Generator', icon: TagIcon },
  { slug: 'grammar-check', name: 'Grammar Checker', icon: CheckCircleIcon },
  { slug: 'product-description', name: 'Product Generator', icon: ShoppingCartIcon },
  { slug: 'blog-ideas', name: 'Blog Ideas', icon: LightBulbIcon },
  { slug: 'youtube-ideas', name: 'YouTube Idea Generator', icon: VideoCameraIcon },
  { slug: 'hashtag-generator', name: 'Hashtag Generator', icon: HashtagIcon },
  { slug: 'business-name', name: 'Business Name Generator', icon: BriefcaseIcon },
  { slug: 'code-explainer', name: 'AI Code Explainer', icon: CommandLineIcon },
  { slug: 'text-summarizer', name: 'Text Summarizer', icon: DocumentTextIcon },
  { slug: 'instagram-caption', name: 'Instagram Caption Generator', icon: CameraIcon },
];

interface SidebarProps {
  closeSidebar: () => void;
}

export default function Sidebar({ closeSidebar }: SidebarProps) {
  const pathname = usePathname();

  // Aktif linki belirlemek için yardımcı fonksiyon
  const isActive = (slug: string) => {
    return pathname === `/tool/${slug}`;
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-300">
      
      {/* BÖLÜM 1: Logo ve Mobil Kapatma Tuşu */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800 flex-shrink-0">
        <Link href="/" className="flex items-center gap-2" onClick={closeSidebar}>
          <div className="bg-indigo-600 p-2 rounded-lg">
            <HomeIcon className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-white">UtilityGenAI</span>
        </Link>
        {/* Sadece mobilde görünen X (Kapat) butonu */}
        <button
          type="button"
          onClick={closeSidebar}
          className="md:hidden text-slate-400 hover:text-white"
          aria-label="Close sidebar"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>

      {/* BÖLÜM 2: KAYDIRILABİLİR ARAÇ LİSTESİ (ÖNEMLİ DÜZELTME) */}
      <nav className="flex-1 overflow-y-auto py-4 space-y-1">
        <span className="px-4 text-xs font-semibold uppercase text-slate-500">Tools</span>
        <ul className="px-2">
          {tools.map((tool) => (
            <li key={tool.slug}>
              <Link
                href={`/tool/${tool.slug}`}
                onClick={closeSidebar} // Linke tıklayınca mobil menüyü kapat
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium
                            transition-colors duration-150
                            ${
                              isActive(tool.slug)
                                ? 'bg-indigo-600 text-white' // Aktif
                                : 'text-slate-300 hover:bg-slate-800 hover:text-white' // Pasif
                            }`}
              >
                <tool.icon className="h-5 w-5 flex-shrink-0" />
                <span>{tool.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

    </div>
  );
}

