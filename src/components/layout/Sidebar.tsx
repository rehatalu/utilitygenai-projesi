"use client";

import { useState } from 'react';
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
  SparklesIcon, // UGA Chat
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/24/outline';

// Araç Listesi
const availableTools = [
  { id: 'email-generator', name: 'Email Subject Generator', icon: EnvelopeIcon },
  { id: 'paraphraser', name: 'Paraphraser Tool', icon: DocumentDuplicateIcon },
  { id: 'social-post', name: 'Social Post Generator', icon: ChatBubbleOvalLeftEllipsisIcon },
  { id: 'meta-description', name: 'Meta Generator', icon: TagIcon },
  { id: 'grammar-check', name: 'Grammar Checker', icon: CheckCircleIcon },
  { id: 'product-description', name: 'Product Generator', icon: ShoppingCartIcon },
  { id: 'blog-ideas', name: 'Blog Ideas', icon: LightBulbIcon },
  { id: 'youtube-ideas', name: 'YouTube Idea Generator', icon: VideoCameraIcon },
  { id: 'hashtag-generator', name: 'Hashtag Generator', icon: HashtagIcon },
  { id: 'business-name', name: 'Business Name Generator', icon: BriefcaseIcon },
  { id: 'code-explainer', name: 'AI Code Explainer', icon: CommandLineIcon },
  { id: 'text-summarizer', name: 'Text Summarizer', icon: DocumentTextIcon },
  { id: 'instagram-caption', name: 'Instagram Caption Generator', icon: CameraIcon },
  { id: 'uga-chat', name: 'Chat with UGA', icon: SparklesIcon },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // URL'yi oku (Adres çubuğu)
  const pathname = usePathname(); 

  return (
    <aside
      className={`flex-shrink-0 bg-gray-900 shadow-lg
      ${isCollapsed ? 'w-20' : 'w-64'} 
      transition-all duration-300 h-full`} // h-full eklendi
    >
      <div className="flex h-full flex-col">
        {/* 1. Logo (Ana Sayfa Butonu) */}
        <div className={`p-4 border-b border-gray-700 ${isCollapsed ? 'flex justify-center' : 'flex items-center gap-2'}`}>
          <Link
            href="/" // Artık 'onClick' değil, 'Link'
            className={`flex items-center gap-2 w-full ${isCollapsed ? 'justify-center' : ''}`}
          >
            <span className="p-2 bg-indigo-600 rounded-lg text-white">
              <HomeIcon className="w-5 h-5" />
            </span>
            {!isCollapsed && (
              <span className="text-lg font-semibold text-white">
                UtilityGenAI
              </span>
            )}
          </Link>
        </div>

        {/* 2. Araç Listesi */}
        <nav className="flex-1 space-y-1 p-4">
          {!isCollapsed && (
            <p className="px-2 text-xs font-semibold uppercase text-gray-500">Tools</p>
          )}
          {availableTools.map((tool) => {
            // Aktif aracı 'state'den değil, 'URL'den (pathname) anla
            const isActive = pathname === `/tool/${tool.id}`; 
            return (
              <Link
                key={tool.id}
                href={`/tool/${tool.id}`} // Artık 'onClick' değil, 'Link'
                className={`flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-sm font-medium transition
                  ${isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }
                  ${isCollapsed ? 'justify-center' : ''}
                `}
              >
                <tool.icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && <span>{tool.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* 3. Menü Kapatma Butonu */}
        <div className={`p-4 border-t border-gray-700 mt-auto ${isCollapsed ? 'space-y-2' : ''}`}>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`flex items-center gap-3 w-full rounded-lg px-3 py-2 text-sm font-medium 
              text-gray-400 hover:bg-gray-800 hover:text-white
              ${isCollapsed ? 'justify-center' : ''}
            `}
          >
            {isCollapsed ? (
              <ChevronDoubleRightIcon className="w-5 h-5 mx-auto" />
            ) : (
              <ChevronDoubleLeftIcon className="w-5 h-5" />
            )}
            {!isCollapsed && <span>Collapse menu</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}

