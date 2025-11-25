"use client";
import { useState, useEffect, useCallback } from 'react';

const generateUniqueId = () => Math.random().toString(36).substring(2, 9);

interface HistoryEntry {
  id: string;
  toolId: string;
  toolName: string;
  result: string;
  timestamp: number;
}

const HISTORY_KEY = 'utilitygenai_history';
const MAX_ENTRIES = 50;

export function useHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // SSR Koruması: Sadece tarayıcıda çalışır
  useEffect(() => {
    if (typeof window === 'undefined') return; // Sunucuda çalışma!
    try {
      const saved = localStorage.getItem(HISTORY_KEY);
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (error) {
      console.error("History load error:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveResult = useCallback((toolId: string, toolName: string, result: string) => {
    if (typeof window === 'undefined') return; // Sunucuda kaydetme!
    if (!result || !result.trim()) return;

    setHistory((prev) => {
      const newEntry = { id: generateUniqueId(), toolId, toolName, result: result.trim(), timestamp: Date.now() };
      const updated = [newEntry, ...prev].slice(0, MAX_ENTRIES);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearHistory = useCallback(() => {
    if (typeof window === 'undefined') return;
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  }, []);

  return { history, saveResult, clearHistory, isLoaded };
}

