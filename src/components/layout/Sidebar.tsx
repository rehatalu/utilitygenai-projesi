"use client";

const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6A2.25 2.25 0 0 1 15.75 3.75h2.25A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25A2.25 2.25 0 0 1 13.5 8.25V6ZM13.5 15.75A2.25 2.25 0 0 1 15.75 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
    />
  </svg>
);

const EmailIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
    />
  </svg>
);

const availableTools = [
  { id: "email-generator", name: "Email Subject Generator", icon: EmailIcon },
  // { id: "paraphraser", name: "Paraphraser", icon: ParaphraserIcon },
];

type SidebarProps = {
  activeToolId: string | null;
  onToolSelect: (toolId: string | null) => void;
};

export default function Sidebar({ activeToolId, onToolSelect }: SidebarProps) {
  return (
    <aside className="flex w-64 flex-shrink-0 flex-col border-r border-slate-200 bg-white shadow-lg">
      <div className="flex h-full flex-col">
        <div className="border-b border-slate-200 p-4">
          <button onClick={() => onToolSelect(null)} className="flex w-full items-center gap-2">
            <span className="rounded-lg bg-indigo-600 p-2 text-white">
              <HomeIcon className="h-5 w-5" />
            </span>
            <span className="text-lg font-semibold text-slate-800">UtilityGenAI</span>
          </button>
        </div>

        <nav className="flex-1 space-y-2 p-4">
          <p className="px-2 text-xs font-semibold uppercase text-slate-400">Tools</p>
          {availableTools.map((tool) => {
            const isActive = activeToolId === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => onToolSelect(tool.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  isActive ? "bg-indigo-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <tool.icon className="h-5 w-5" />
                <span>{tool.name}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-slate-200 p-4">
          <p className="text-center text-xs text-slate-500">&copy; {new Date().getFullYear()} UtilityGenAI</p>
        </div>
      </div>
    </aside>
  );
}

