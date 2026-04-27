import React from 'react';
import Garden from './pages/Garden'; 

/**
 * App.jsx: The Root Component
 * This file acts as the framework for your application.
 * All the ritual logic, data, and tabs live within the Garden component.
 */
function App() {
  return (
    <div 
      className="min-h-screen bg-[#040d0a]" 
      style={{ margin: 0, padding: 0, overflowX: 'hidden' }}
    >
      {/* By importing Garden here, we keep the main file clean. 
        All your Herbs, Crystals, and Moon logic are now safely 
        encapsulated in /src/pages/Garden.jsx.
      */}
      <Garden />
    </div>
  );
}

export default App;