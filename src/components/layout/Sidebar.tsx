"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiHome, HiChevronDoubleLeft, HiClock } from 'react-icons/hi';
// import ThemeSwitcher from '@/components/ui/ThemeSwitcher'; // "ThemeSwitcher" SİLİNDİ
import {
  EnvelopeIcon,
  DocumentDuplicateIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  TagIcon,
  CheckCircleIcon,
  ShoppingCartIcon,
  LightBulbIcon,
  VideoCameraIcon,
  HashtagIcon,
  BriefcaseIcon,
  CommandLineIcon,
  DocumentTextIcon,
  CameraIcon,
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

  const isActive = (slug: string) => {
    return pathname === `/tool/${slug}`;
  };

  return (
    // GERİ ALMA: Sadece "inattı" karanlık tema
    <div className="flex flex-col h-full bg-slate-900 text-slate-300 border-r border-slate-800">
      
      {/* BÖLÜM 1: Logo ve Kontrol Butonları */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800 flex-shrink-0">
        <Link href="/" className="flex items-center gap-2" onClick={closeSidebar}>
          <div className="bg-indigo-600 p-2 rounded-lg">
            <HiHome className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-white">UtilityGenAI</span>
        </Link>

        {/* KONTROL GRUBU (TEMA + KAPAT) */}
        <div className="flex items-center gap-2">
          {/* "ThemeSwitcher" SİLİNDİ */}
          <button
            type="button"
            onClick={closeSidebar}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            aria-label="Close sidebar"
          >
            <HiChevronDoubleLeft className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* BÖLÜM 2: KAYDIRILABİLİR ARAÇ LİSTESİ */}
      <nav className="flex-1 overflow-y-auto py-4 space-y-1">
        <span className="px-4 text-xs font-semibold uppercase text-slate-500">Tools</span>
        <ul className="px-2">
          {tools.map((tool) => (
            <li key={tool.slug}>
              <Link
                href={`/tool/${tool.slug}`}
                onClick={closeSidebar} 
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-150 ${
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

      <div className="p-4 border-t border-slate-800 flex-shrink-0">
        <span className="px-2 text-xs font-semibold uppercase text-slate-500">Utilities</span>
        <ul className="px-2 mt-1 space-y-1 mb-4">
          <li>
              <Link href="/history" onClick={closeSidebar} className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                  <HiClock className="h-5 w-5 flex-shrink-0" />
                  <span>My History</span>
              </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
