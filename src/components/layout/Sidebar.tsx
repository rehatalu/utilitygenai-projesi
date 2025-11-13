"use client";

import { useState, type ComponentType } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  EnvelopeIcon,
  DocumentDuplicateIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  ShoppingCartIcon,
  PencilSquareIcon,
  VideoCameraIcon,
  HashtagIcon,
  BriefcaseIcon,
  CodeBracketIcon,
  DocumentTextIcon,
  CameraIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

type ToolItem = {
  id: string;
  name: string;
  icon: ComponentType<React.SVGProps<SVGSVGElement>>;
};

const availableTools: ToolItem[] = [
  { id: "email-generator", name: "Email Subject Generator", icon: EnvelopeIcon },
  { id: "paraphraser", name: "Paraphraser Tool", icon: DocumentDuplicateIcon },
  { id: "social-post", name: "Social Post Generator", icon: ChatBubbleOvalLeftEllipsisIcon },
  { id: "meta-description", name: "Meta Generator", icon: MagnifyingGlassIcon },
  { id: "grammar-check", name: "Grammar Checker", icon: CheckCircleIcon },
  { id: "product-description", name: "Product Generator", icon: ShoppingCartIcon },
  { id: "blog-ideas", name: "Blog Ideas", icon: PencilSquareIcon },
  { id: "youtube-ideas", name: "YouTube Idea Generator", icon: VideoCameraIcon },
  { id: "hashtag-generator", name: "Hashtag Generator", icon: HashtagIcon },
  { id: "business-name", name: "Business Name Generator", icon: BriefcaseIcon },
  { id: "code-explainer", name: "AI Code Explainer", icon: CodeBracketIcon },
  { id: "text-summarizer", name: "Text Summarizer", icon: DocumentTextIcon },
  { id: "instagram-caption", name: "Instagram Caption Generator", icon: CameraIcon },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const activeToolId = pathname?.startsWith("/tool/") ? pathname.replace("/tool/", "") : null;

  return (
    <aside
      className={`flex-shrink-0 bg-gray-900 shadow-lg transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex h-full flex-col">
        <div
          className={`border-b border-gray-700 p-4 ${
            isCollapsed ? "flex justify-center" : "flex items-center gap-2"
          }`}
        >
          <Link href="/" className={`flex w-full items-center gap-2 ${isCollapsed ? "justify-center" : ""}`}>
            <span className="rounded-lg bg-indigo-600 p-2 text-white">
              <HomeIcon className="h-5 w-5" />
            </span>
            {!isCollapsed && <span className="text-lg font-semibold text-white">UtilityGenAI</span>}
          </Link>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {!isCollapsed && <p className="px-2 text-xs font-semibold uppercase text-gray-500">Tools</p>}
          {availableTools.map((tool) => {
            const isActive = activeToolId === tool.id;
            const Icon = tool.icon;
            return (
              <Link
                key={tool.id}
                href={`/tool/${tool.id}`}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                } ${isCollapsed ? "justify-center" : ""}`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && <span>{tool.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className={`mt-auto border-t border-gray-700 p-4 ${isCollapsed ? "space-y-2" : ""}`}>
          <button
            onClick={() => setIsCollapsed((prev) => !prev)}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            {isCollapsed ? (
              <ChevronDoubleRightIcon className="h-5 w-5" />
            ) : (
              <ChevronDoubleLeftIcon className="h-5 w-5" />
            )}
            {!isCollapsed && <span>Collapse menu</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}

