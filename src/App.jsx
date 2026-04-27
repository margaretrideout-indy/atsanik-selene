import React, { Suspense } from 'react';
import Garden from './pages/Garden'; 

// This App component acts as the 'Aether' (the space that holds everything)
function App() {
  return (
    <div className="min-h-screen bg-[#040d0a] selection:bg-emerald-500/30">
      {/* Suspense is a safety net. If Garden takes a millisecond to load, 
          it shows a dark screen instead of a white flash.
      */}
      <Suspense fallback={<div className="min-h-screen bg-[#040d0a]" />}>
        <Garden />
      </Suspense>
    </div>
  );
}

export default App;