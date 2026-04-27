import React, { useState, useEffect, useMemo } from 'react';
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-client/+esm';

// --- CONFIGURATION ---
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_KEY = 'YOUR_SUPABASE_ANON_KEY';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const MASTER_DATA = [
  { id: 'h1', name: 'Lavender', type: 'Herb', property: 'Peace', tags: ['sleep'], color: 'text-purple-400', icon: '🌿' },
  { id: 'k1', name: 'Sea Salt', type: 'Pantry', property: 'Shield', tags: ['protection'], color: 'text-slate-100', icon: '🧂' },
  { id: 'ca1', name: 'White', type: 'Colour', property: 'Purity', tags: ['universal'], color: 'text-white', icon: '🕯️' },
  { id: 'c1', name: 'Moonstone', type: 'Crystal', property: 'Intuition', tags: ['psychic'], color: 'text-blue-200', icon: '💎' }
];

export default function Garden() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('library');
  const [subFilter, setSubFilter] = useState('Herb');

  return (
    <div style={{ backgroundColor: '#020806', minHeight: '100vh', color: 'white', padding: '40px', fontFamily: 'serif' }}>
      <nav style={{ marginBottom: '40px', display: 'flex', gap: '20px', borderBottom: '1px solid #111', paddingBottom: '20px' }}>
        <h1 style={{ color: '#10b981', italic: 'true' }}>Selene Garden</h1>
        <button onClick={() => setSubFilter('Herb')} style={{ background: 'none', color: 'white', border: '1px solid #333', padding: '5px 15px', borderRadius: '20px' }}>Herbs</button>
        <button onClick={() => setSubFilter('Pantry')} style={{ background: 'none', color: 'white', border: '1px solid #333', padding: '5px 15px', borderRadius: '20px' }}>Pantry</button>
        <button onClick={() => setSubFilter('Colour')} style={{ background: 'none', color: 'white', border: '1px solid #333', padding: '5px 15px', borderRadius: '20px' }}>Colour</button>
      </nav>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '20px' }}>
        {MASTER_DATA.filter(i => i.type === subFilter).map(item => (
          <div key={item.id} style={{ background: '#050c09', border: '1px solid #111', padding: '20px', borderRadius: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '30px', marginBottom: '10px' }}>{item.icon}</div>
            <div style={{ fontWeight: 'bold' }}>{item.name}</div>
            <div style={{ fontSize: '10px', color: '#10b981', marginTop: '5px' }}>{item.property}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '50px', fontSize: '12px', color: '#444' }}>
        System Status: Connected to Base44 | Type: {subFilter}
      </div>
    </div>
  );
}