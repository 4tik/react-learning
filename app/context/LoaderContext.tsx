// app/context/LoaderContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// 1. Define the structural blueprint for our context store
interface LoaderContextType {
  active: boolean;
  showLoader: () => void;
  hideLoader: () => void;
}

// Initialize context with a strict null-default type check configuration
const LoaderContext = createContext<LoaderContextType | null>(null);

interface LoaderProviderProps {
  children: ReactNode;
}

export function LoaderProvider({ children }: LoaderProviderProps) {
  const [active, setActive] = useState<boolean>(false);

  const showLoader = () => setActive(true);
  const hideLoader = () => setActive(false);

  return (
    <LoaderContext.Provider value={{ active, showLoader, hideLoader }}>
      {children}

      {/* 🛑 THE TEMPLATE: Fullscreen Click-Blocking Overlay */}
      {active && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] cursor-not-allowed select-none">
          <div className="bg-white p-6 rounded-2xl shadow-2xl flex flex-col items-center space-y-4 max-w-xs border border-gray-100">
            {/* Elegant Tailored CSS Spinner */}
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-700 font-semibold tracking-wide text-sm">
              Processing request...
            </p>
          </div>
        </div>
      )}
    </LoaderContext.Provider>
  );
}

// 2. Pure Hook with strict TypeScript runtime verification
export function useGlobalLoader(): LoaderContextType {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error('useGlobalLoader must be used within a LoaderProvider');
  }
  return context;
}