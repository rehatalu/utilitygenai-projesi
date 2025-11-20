"use client";

import { useState, useEffect, useCallback } from 'react';

// Basit, benzersiz ID oluşturucu
const generateUniqueId = () => Math.random().toString(36).substring(2, 9);

// Kayıt girişi için TypeScript tipi
interface HistoryEntry {
  id: string;
  toolId: string;
  toolName: string;
  result: string;
  timestamp: number;
}

const HISTORY_KEY = 'utilitygenai_history';
const MAX_ENTRIES = 50; // Hafızayı yönetmek için maksimum kayıt sayısı

export function useHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Durumu localStorage'a kaydet (Yan Fonksiyon)
  const saveToLocalStorage = (currentHistory: HistoryEntry[]) => {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(currentHistory));
    } catch (error) {
      console.error("Failed to save history to localStorage:", error);
    }
  };

  // 2. Sayfa yüklendiğinde localStorage'dan geçmişi yükle
  useEffect(() => {
    try {
      const saved = localStorage.getItem(HISTORY_KEY);
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Failed to load history from localStorage:", error);
    } finally {
      setIsLoaded(true); // Yükleme tamamlandı
    }
  }, []);

  // 3. Ana fonksiyon: Yeni bir sonucu kaydet
  const saveResult = useCallback(
    (toolId: string, toolName: string, result: string) => {
      // Boş sonuçları kaydetme
      if (!result || !result.trim()) return;

      const newEntry: HistoryEntry = {
        id: generateUniqueId(),
        toolId,
        toolName,
        result: result.trim(),
        timestamp: Date.now(),
      };

      setHistory((prevHistory) => {
        // En yeni girişi ekle ve maksimum girişi koru
        const updatedHistory = [newEntry, ...prevHistory].slice(0, MAX_ENTRIES);
        saveToLocalStorage(updatedHistory);
        return updatedHistory;
      });
    },
    []
  );

  // 4. Tüm geçmişi temizleme fonksiyonu
  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  }, []);

  return { history, saveResult, clearHistory, isLoaded };
}

