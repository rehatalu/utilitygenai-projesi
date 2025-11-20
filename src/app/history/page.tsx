"use client";

import WorkspaceLayout from "@/components/layout/WorkspaceLayout";
import { useHistory } from '@/hooks/useHistory';
import { motion } from 'framer-motion';
import { HiOutlineTrash, HiClock, HiOutlineDocumentText } from 'react-icons/hi';

export default function HistoryPage() {
  // Görev 11.1'deki hook'u kullan
  const { history, clearHistory, isLoaded } = useHistory();

  const renderHistoryItem = (entry: any) => {
    // Sonuç metnini ilk 150 karakterle sınırla
    const snippet = entry.result.length > 150 
      ? entry.result.substring(0, 150) + '...'
      : entry.result;
    
    // Zaman damgasını (timestamp) okunabilir tarihe çevir
    const date = new Date(entry.timestamp).toLocaleDateString('en-US', {
      hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric'
    });

    return (
      <div 
        key={entry.id}
        className="p-4 bg-slate-900 border border-slate-800 rounded-lg shadow-md hover:ring-1 hover:ring-indigo-500 transition-shadow"
      >
        <p className="text-xs font-semibold text-indigo-400 mb-1 flex items-center gap-2">
          <HiOutlineDocumentText className="w-4 h-4" />
          {entry.toolName}
        </p>
        <p className="text-sm text-slate-100 whitespace-pre-wrap mb-2">
          {snippet}
        </p>
        <p className="text-xs text-slate-500">{date}</p>
      </div>
    );
  };

  return (
    <WorkspaceLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mx-auto w-full max-w-4xl px-4 py-10"
      >
        <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <HiClock className="h-7 w-7 text-indigo-400" />
            My History
          </h1>
          
          {history.length > 0 && (
            <button
              onClick={clearHistory}
              className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-red-700/50 hover:bg-red-700 text-white transition-colors disabled:opacity-50"
              disabled={!isLoaded}
            >
              <HiOutlineTrash className="h-5 w-5" />
              Clear All ({history.length})
            </button>
          )}
        </div>

        {!isLoaded ? (
          <p className="text-slate-400 animate-pulse">Loading history...</p>
        ) : history.length === 0 ? (
          <div className="text-center p-10 bg-slate-900 border border-slate-800 rounded-xl">
            <p className="text-lg text-slate-400">Your history is currently empty.</p>
            <p className="text-sm text-slate-500 mt-2">Generate some results to see them saved here!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map(renderHistoryItem)}
          </div>
        )}
      </motion.div>
    </WorkspaceLayout>
  );
}

