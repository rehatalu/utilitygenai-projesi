"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiHome, HiClock, HiChevronDoubleLeft, HiBookOpen } from 'react-icons/hi'; // İkonlar
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';
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

  const isActive = (slug: string) => pathname === `/tool/${slug}`;
  
  // Link stil fonksiyonu
  const getLinkClass = (active: boolean) => `
    flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
    transition-all duration-200 ease-out border
    ${active
      ? 'bg-indigo-600 text-white border-indigo-500 shadow-[0_4px_14px_0_rgba(79,70,229,0.4)] translate-x-1' // Aktif: Parlak ve Sağa Kaymış
      : 'border-transparent text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-[0_6px_20px_-4px_rgba(0,0,0,0.15)] hover:-translate-y-1' // PASİF: Güçlü gölge ile yukarı kalkar
    }
  `;

  return (
    <div className="flex flex-col h-full 
                    bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 transition-colors duration-300">
      
      {/* BÖLÜM 1: Logo ve Kontrol Butonları */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-slate-200 dark:border-slate-800 flex-shrink-0">
        <Link href="/" className="flex items-center gap-2" onClick={closeSidebar}>
          <div className="bg-indigo-600 p-2 rounded-lg">
            <HiHome className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900 dark:text-white">UtilityGenAI</span>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeSwitcher /> 
          <button
            type="button"
            onClick={closeSidebar}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-white hover:shadow-sm dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800"
            aria-label="Close sidebar"
          >
            <HiChevronDoubleLeft className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* BÖLÜM 2: KAYDIRILABİLİR ARAÇ LİSTESİ */}
      <nav className="flex-1 overflow-y-auto py-4 space-y-1">
        <span className="px-4 text-xs font-semibold uppercase text-slate-500 dark:text-slate-500">Tools</span>
        <ul className="px-2">
          {tools.map((tool) => (
            <li key={tool.slug}>
              <Link
                href={`/tool/${tool.slug}`}
                onClick={closeSidebar}
                className={getLinkClass(isActive(tool.slug))}
              >
                <tool.icon className="h-5 w-5 flex-shrink-0" />
                <span>{tool.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* BÖLÜM 3: UTILITIES (Geçmiş ve Blog) */}
      <div className="flex-shrink-0 border-t border-slate-200 dark:border-slate-800 p-4">
        <span className="px-2 text-xs font-semibold uppercase text-slate-500 dark:text-slate-500">Utilities</span>
        <ul className="px-2 mt-1 space-y-1">
            {/* BLOG LINKI */}
            <li>
                <Link
                    href="/blog"
                    onClick={closeSidebar}
                    className={getLinkClass(pathname.startsWith('/blog'))}
                >
                    <HiBookOpen className="h-5 w-5 flex-shrink-0" />
                    <span>Blog</span>
                </Link>
            </li>
            {/* HISTORY LINKI */}
            <li>
                <Link
                    href="/history"
                    onClick={closeSidebar}
                    className={getLinkClass(pathname === '/history')}
                >
                    <HiClock className="h-5 w-5 flex-shrink-0" />
                    <span>My History</span>
                </Link>
            </li>
        </ul>
      </div>

    </div>
  );
}
