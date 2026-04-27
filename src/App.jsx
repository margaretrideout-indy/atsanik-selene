import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Garden from './pages/Garden';

// We strip away the complex wrappers to ensure the Garden renders immediately
function App() {
  return (
    <Router>
      <Routes>
        {/* This loads your Garden.jsx file directly */}
        <Route path="/" element={<Garden />} />
        
        {/* If any other route is hit, show the Garden */}
        <Route path="*" element={<Garden />} />
      </Routes>
    </Router>
  );
}

export default App;