import React from 'react';
import Garden from './pages/Garden'; // Ensure this matches your file path exactly

function App() {
  return (
    <div className="app-container">
      {/* This is the main entry point. 
          The Garden component holds the logic for the 
          Lunar Calendar, Materia Medica, and Altar.
      */}
      <Garden />
    </div>
  );
}

export default App;