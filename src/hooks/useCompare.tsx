"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface CompareContextType {
  compareIds: string[];
  addToCompare: (id: string) => void;
  removeFromCompare: (id: string) => void;
  isInCompare: (id: string) => boolean;
  clearCompare: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [compareIds, setCompareIds] = useState<string[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("compareIds");
    if (saved) setCompareIds(JSON.parse(saved));
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("compareIds", JSON.stringify(compareIds));
  }, [compareIds]);

  const addToCompare = (id: string) => {
    if (compareIds.length >= 3) return; // max 3
    if (!compareIds.includes(id)) {
      setCompareIds([...compareIds, id]);
    }
  };

  const removeFromCompare = (id: string) => {
    setCompareIds(compareIds.filter((cid) => cid !== id));
  };

  const isInCompare = (id: string) => compareIds.includes(id);

  const clearCompare = () => setCompareIds([]);

  return (
    <CompareContext.Provider value={{ compareIds, addToCompare, removeFromCompare, isInCompare, clearCompare }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) throw new Error("useCompare must be used within CompareProvider");
  return context;
}
