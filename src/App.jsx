import React, { Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClientInstance } from '@/lib/query-client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Garden from './pages/Garden';

// A clean, branded fallback for when the app is loading
const LoadingScreen = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-[#020806]">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-2 border-emerald-500/10 border-t-emerald-500 rounded-full animate-spin"></div>
      <p className="text-[10px] uppercase tracking-[0.4em] text-emerald-900 font-black">Opening the Gates...</p>
    </div>
  </div>
);

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            {/* This makes the Garden your homepage */}
            <Route path="/" element={<Garden />} />
            
            {/* Catch-all: Redirects any broken links back to the Garden */}
            <Route path="*" element={<Garden />} />
          </Routes>
        </Suspense>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;