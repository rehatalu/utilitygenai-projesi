"use client";

import { useState, type ComponentType } from "react";
import {
  HomeIcon,
  EnvelopeIcon,
  DocumentDuplicateIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

type SidebarProps = {
  activeToolId: string | null;
  onToolSelect: (toolId: string | null) => void;
};

type ToolItem = {
  id: string;
  name: string;
  icon: ComponentType<React.SVGProps<SVGSVGElement>>;
};

const availableTools: ToolItem[] = [
  { id: "email-generator", name: "Email Subject Generator", icon: EnvelopeIcon },
  { id: "paraphraser", name: "Paraphraser Tool", icon: DocumentDuplicateIcon },
  { id: "social-post", name: "Social Post Generator", icon: ChatBubbleOvalLeftEllipsisIcon },
];

export default function Sidebar({ activeToolId, onToolSelect }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`flex-shrink-0 border-r border-slate-200 bg-white shadow-lg transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex h-full flex-col">
        <div
          className={`border-b border-slate-200 p-4 ${
            isCollapsed ? "flex justify-center" : "flex items-center gap-2"
          }`}
        >
          <button
            onClick={() => onToolSelect(null)}
            className={`flex w-full items-center gap-2 ${isCollapsed ? "justify-center" : ""}`}
          >
            <span className="rounded-lg bg-indigo-600 p-2 text-white">
              <HomeIcon className="h-5 w-5" />
            </span>
            {!isCollapsed && <span className="text-lg font-semibold text-slate-800">UtilityGenAI</span>}
          </button>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {!isCollapsed && (
            <p className="px-2 text-xs font-semibold uppercase text-slate-400">Tools</p>
          )}
          {availableTools.map((tool) => {
            const isActive = activeToolId === tool.id;
            const Icon = tool.icon;
            return (
              <button
                key={tool.id}
                onClick={() => onToolSelect(tool.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  isActive ? "bg-indigo-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
                } ${isCollapsed ? "justify-center" : ""}`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && <span>{tool.name}</span>}
              </button>
            );
          })}
        </nav>

        <div className={`mt-auto border-t border-slate-200 p-4 ${isCollapsed ? "space-y-2" : ""}`}>
          <button
            onClick={() => setIsCollapsed((prev) => !prev)}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            {isCollapsed ? (
              <ChevronDoubleRightIcon className="mx-auto h-5 w-5" />
            ) : (
              <>
                <ChevronDoubleLeftIcon className="h-5 w-5" />
                <span>Collapse menu</span>
              </>
            )}
          </button>
          {!isCollapsed && (
            <p className="pt-2 text-center text-xs text-slate-500">
              &copy; {new Date().getFullYear()} UtilityGenAI
            </p>
          )}
        </div>
      </div>
    </aside>
  );
}

