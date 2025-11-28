"use client";
import WorkspaceLayout from "@/components/layout/WorkspaceLayout";
import { useHistory } from '@/hooks/useHistory';
import { HiOutlineTrash, HiClock } from 'react-icons/hi';

export default function HistoryPage() {
  const { history, clearHistory, isLoaded } = useHistory();

  // Client-side render olana kadar boş dön (Hydration hatasını önler)
  if (!isLoaded) return <WorkspaceLayout><div className="p-10 text-center">Loading...</div></WorkspaceLayout>;

  return (
    <WorkspaceLayout>
      <div className="mx-auto w-full max-w-4xl px-4 py-10 text-slate-200">
        <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <HiClock className="h-7 w-7 text-indigo-400" /> My History
          </h1>
          {history.length > 0 && (
            <button onClick={clearHistory} className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-red-900/50 hover:bg-red-800 text-red-200 transition-colors">
              <HiOutlineTrash className="h-5 w-5" /> Clear All
            </button>
          )}
        </div>
        {history.length === 0 ? (
          <div className="text-center p-10 bg-slate-900 border border-slate-800 rounded-xl text-slate-400">
            Your history is empty.
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((entry) => (
              <div key={entry.id} className="p-4 bg-slate-900 border border-slate-800 rounded-lg">
                <p className="text-xs font-semibold text-indigo-400 mb-1">{entry.toolName}</p>
                <p className="text-sm whitespace-pre-wrap mb-2">{entry.result.substring(0, 300)}...</p>
                <p className="text-xs text-slate-600">{new Date(entry.timestamp).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </WorkspaceLayout>
  );
}



