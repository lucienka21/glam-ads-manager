import { useState, useEffect } from "react";

export interface DocumentHistoryItem {
  id: string;
  type: "report" | "invoice" | "contract" | "presentation";
  title: string;
  subtitle: string;
  data: Record<string, string>;
  thumbnail?: string;
  createdAt: string;
}

const STORAGE_KEY = "aurine_document_history";
const MAX_ITEMS = 50;

export const useDocumentHistory = () => {
  const [history, setHistory] = useState<DocumentHistoryItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch {
        setHistory([]);
      }
    }
  }, []);

  const saveToStorage = (items: DocumentHistoryItem[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  };

  const saveDocument = (
    type: DocumentHistoryItem["type"],
    title: string,
    subtitle: string,
    data: Record<string, string>,
    thumbnail?: string
  ) => {
    const newItem: DocumentHistoryItem = {
      id: `${type}-${Date.now()}`,
      type,
      title,
      subtitle,
      data,
      thumbnail,
      createdAt: new Date().toISOString(),
    };

    const updated = [newItem, ...history.filter(item => 
      !(item.type === type && item.title === title && item.subtitle === subtitle)
    )].slice(0, MAX_ITEMS);
    
    setHistory(updated);
    saveToStorage(updated);
    return newItem.id;
  };

  const getDocumentById = (id: string) => {
    return history.find(item => item.id === id);
  };

  const getDocumentsByType = (type: DocumentHistoryItem["type"]) => {
    return history.filter(item => item.type === type);
  };

  const deleteDocument = (id: string) => {
    const updated = history.filter(item => item.id !== id);
    setHistory(updated);
    saveToStorage(updated);
  };

  const updateThumbnail = (id: string, thumbnail: string) => {
    const updated = history.map(item => 
      item.id === id ? { ...item, thumbnail } : item
    );
    setHistory(updated);
    saveToStorage(updated);
  };

  const clearHistory = (type?: DocumentHistoryItem["type"]) => {
    if (type) {
      const updated = history.filter(item => item.type !== type);
      setHistory(updated);
      saveToStorage(updated);
    } else {
      setHistory([]);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const getRecentDocuments = (limit: number = 10) => {
    return history.slice(0, limit);
  };

  const getStats = () => {
    return {
      total: history.length,
      reports: history.filter(i => i.type === "report").length,
      invoices: history.filter(i => i.type === "invoice").length,
      contracts: history.filter(i => i.type === "contract").length,
      presentations: history.filter(i => i.type === "presentation").length,
    };
  };

  return {
    history,
    saveDocument,
    getDocumentById,
    getDocumentsByType,
    deleteDocument,
    updateThumbnail,
    clearHistory,
    getRecentDocuments,
    getStats,
  };
};
