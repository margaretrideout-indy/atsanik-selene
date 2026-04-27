import React from 'react';

export default function App() {
  return (
    <div style={{ 
      backgroundColor: '#020806', 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center', 
      color: '#10b981',
      fontFamily: 'serif'
    }}>
      <h1 style={{ fontSize: '3rem', fontStyle: 'italic' }}>Selene Garden</h1>
      <p style={{ color: '#444', letterSpacing: '0.5em', fontSize: '10px', textTransform: 'uppercase' }}>
        Emergency Reboot Active
      </p>
      <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #111', borderRadius: '20px' }}>
        If you see this, the engine is working.
      </div>
    </div>
  );
}