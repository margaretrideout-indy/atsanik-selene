import React, { useState, useMemo } from 'react';

// MASTER DATABASE (Restored & Singular Pantry)
const MASTER_DATA = [
  // HERBS (25)
  { id: 'h1', name: 'Lavender', type: 'Herb', property: 'Peace', icon: '🌿' },
  { id: 'h2', name: 'Mugwort', type: 'Herb', property: 'Vision', icon: '🌙' },
  { id: 'h3', name: 'Rosemary', type: 'Herb', property: 'Memory', icon: '🍃' },
  { id: 'h4', name: 'Bay Leaf', type: 'Herb', property: 'Manifest', icon: '🍂' },
  { id: 'h5', name: 'Peppermint', type: 'Herb', property: 'Energy', icon: '🌱' },
  { id: 'h6', name: 'Chamomile', type: 'Herb', property: 'Calm', icon: '🌼' },
  { id: 'h7', name: 'Basil', type: 'Herb', property: 'Luck', icon: '🌿' },
  { id: 'h8', name: 'Thyme', type: 'Herb', property: 'Bravery', icon: '🪴' },
  { id: 'h9', name: 'Sage', type: 'Herb', property: 'Cleanse', icon: '🌬️' },
  { id: 'h10', name: 'Cinnamon', type: 'Herb', property: 'Speed', icon: '🪵' },
  { id: 'h11', name: 'Dandelion', type: 'Herb', property: 'Growth', icon: '🌻' },
  { id: 'h12', name: 'Eucalyptus', type: 'Herb', property: 'Healing', icon: '🌿' },
  { id: 'h13', name: 'Jasmine', type: 'Herb', property: 'Dreams', icon: '🌸' },
  { id: 'h14', name: 'Patchouli', type: 'Herb', property: 'Grounding', icon: '🪴' },
  { id: 'h15', name: 'Mistletoe', type: 'Herb', property: 'Protection', icon: '🌿' },
  { id: 'h16', name: 'Nettle', type: 'Herb', property: 'Defense', icon: '🧤' },
  { id: 'h17', name: 'Hibiscus', type: 'Herb', property: 'Passion', icon: '🌺' },
  { id: 'h18', name: 'Valerian', type: 'Herb', property: 'Deep Sleep', icon: '💤' },
  { id: 'h19', name: 'Elderberry', type: 'Herb', property: 'Fates', icon: '🫐' },
  { id: 'h20', name: 'Yarrow', type: 'Herb', property: 'Boundary', icon: '🛡️' },
  { id: 'h21', name: 'Vervain', type: 'Herb', property: 'Enchant', icon: '✨' },
  { id: 'h22', name: 'Calendula', type: 'Herb', property: 'Sun-Light', icon: '🌼' },
  { id: 'h23', name: 'Catnip', type: 'Herb', property: 'Fascination', icon: '🐱' },
  { id: 'h24', name: 'Comfrey', type: 'Herb', property: 'Safety', icon: '🩹' },
  { id: 'h25', name: 'Witch Hazel', type: 'Herb', property: 'Mend', icon: '🪄' },

  // PANTRY (25) - CORRECTED TO SINGULAR
  { id: 'k1', name: 'Sea Salt', type: 'Pantry', property: 'Shield', icon: '🧂' },
  { id: 'k2', name: 'Honey', type: 'Pantry', property: 'Sweetness', icon: '🍯' },
  { id: 'k3', name: 'Coffee', type: 'Pantry', property: 'Haste', icon: '☕' },
  { id: 'k4', name: 'Black Pepper', type: 'Pantry', property: 'Banish', icon: '🌑' },
  { id: 'k5', name: 'Rice', type: 'Pantry', property: 'Abundance', icon: '🍚' },
  { id: 'k6', name: 'Sugar', type: 'Pantry', property: 'Magnet', icon: '🍬' },
  { id: 'k7', name: 'Vinegar', type: 'Pantry', property: 'Break', icon: '🧪' },
  { id: 'k8', name: 'Garlic', type: 'Pantry', property: 'Warding', icon: '🧄' },
  { id: 'k9', name: 'Onion Skin', type: 'Pantry', property: 'Layers', icon: '🧅' },
  { id: 'k10', name: 'Egg Shell', type: 'Pantry', property: 'Wall', icon: '🥚' },
  { id: 'k11', name: 'Clove', type: 'Pantry', property: 'Silence', icon: '🍢' },
  { id: 'k12', name: 'Star Anise', type: 'Pantry', property: 'Luck', icon: '🌟' },
  { id: 'k13', name: 'Ginger', type: 'Pantry', property: 'Heat', icon: '🫚' },
  { id: 'k14', name: 'Nutmeg', type: 'Pantry', property: 'Coin', icon: '🌰' },
  { id: 'k15', name: 'Tea Leaves', type: 'Pantry', property: 'Fate', icon: '🍵' },
  { id: 'k16', name: 'Bayberry', type: 'Pantry', property: 'Gold', icon: '🕯️' },
  { id: 'k17', name: 'Olive Oil', type: 'Pantry', property: 'Bless', icon: '🫒' },
  { id: 'k18', name: 'Allspice', type: 'Pantry', property: 'Drive', icon: '🪵' },
  { id: 'k19', name: 'Mustard', type: 'Pantry', property: 'Faith', icon: '🟡' },
  { id: 'k20', name: 'Orange Peel', type: 'Pantry', property: 'Joy', icon: '🍊' },
  { id: 'k21', name: 'Lemon Peel', type: 'Pantry', property: 'Clean', icon: '🍋' },
  { id: 'k22', name: 'Vanilla', type: 'Pantry', property: 'Lust', icon: '🍦' },
  { id: 'k23', name: 'Peppercorn', type: 'Pantry', property: 'Banish', icon: '🌑' },
  { id: 'k24', name: 'Cinnamon Stick', type: 'Pantry', property: 'Fast Luck', icon: '🪵' },
  { id: 'k25', name: 'Flour', type: 'Pantry', property: 'Home', icon: '🍞' },

  // COLOURS (10)
  { id: 'ca1', name: 'White', type: 'Colour', property: 'Purity', icon: '🤍' },
  { id: 'ca2', name: 'Black', type: 'Colour', property: 'Banishing', icon: '🖤' },
  { id: 'ca3', name: 'Red', type: 'Colour', property: 'Passion', icon: '❤️' },
  { id: 'ca4', name: 'Green', type: 'Colour', property: 'Growth', icon: '💚' },
  { id: 'ca5', name: 'Blue', type: 'Colour', property: 'Tranquility', icon: '💙' },
  { id: 'ca6', name: 'Yellow', type: 'Colour', property: 'Intelligence', icon: '💛' },
  { id: 'ca7', name: 'Purple', type: 'Colour', property: 'Psychic Power', icon: '💜' },
  { id: 'ca8', name: 'Orange', type: 'Colour', property: 'Road Opening', icon: '🧡' },
  { id: 'ca9', name: 'Pink', type: 'Colour', property: 'Self-Love', icon: '💖' },
  { id: 'ca10', name: 'Brown', type: 'Colour', property: 'Grounding', icon: '🤎' }
];

export default function Garden() {
  const [subFilter, setSubFilter] = useState('Herb');
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleItem = (item) => {
    if (selectedItems.find(i => i.id === item.id)) {
      setSelectedItems(selectedItems.filter(i => i.id !== item.id));
    } else if (selectedItems.length < 4) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <div style={{ backgroundColor: '#020806', minHeight: '100vh', color: '#cbd5e1', padding: '20px', fontFamily: 'serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px', paddingTop: '20px' }}>
        <h1 style={{ color: 'white', fontSize: '2.5rem', fontStyle: 'italic', marginBottom: '10px' }}>Selene Garden</h1>
        <p style={{ color: '#065f46', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '4px' }}>Digital Grimoire v1.0</p>
      </header>

      <nav style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '40px' }}>
        {['Herb', 'Pantry', 'Colour'].map(type => (
          <button 
            key={type}
            onClick={() => setSubFilter(type)}
            style={{
              background: subFilter === type ? '#064e3b' : 'transparent',
              color: subFilter === type ? '#34d399' : '#475569',
              border: '1px solid #1e293b',
              padding: '8px 20px',
              borderRadius: '15px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '11px',
              textTransform: 'uppercase'
            }}
          >
            {type}
          </button>
        ))}
      </nav>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', 
        gap: '20px',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {MASTER_DATA.filter(i => i.type === subFilter).map(item => (
          <div 
            key={item.id} 
            onClick={() => toggleItem(item)}
            style={{ 
              background: selectedItems.find(s => s.id === item.id) ? '#064e3b22' : '#050c09', 
              border: selectedItems.find(s => s.id === item.id) ? '1px solid #10b981' : '1px solid #1e293b', 
              padding: '25px', 
              borderRadius: '30px', 
              textAlign: 'center',
              cursor: 'pointer'
            }}
          >
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>{item.icon}</div>
            <div style={{ color: 'white', fontSize: '16px', fontStyle: 'italic' }}>{item.name}</div>
            <div style={{ fontSize: '9px', color: '#065f46', marginTop: '5px', textTransform: 'uppercase', fontWeight: 'bold' }}>{item.property}</div>
          </div>
        ))}
      </div>

      {selectedItems.length > 0 && (
        <div style={{
          position: 'fixed',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'black',
          border: '1px solid #065f46',
          padding: '15px 30px',
          borderRadius: '50px',
          display: 'flex',
          gap: '20px',
          alignItems: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
        }}>
          <span style={{ fontSize: '10px', color: '#475569', textTransform: 'uppercase' }}>Selected: {selectedItems.length}</span>
          <button style={{ background: 'none', border: 'none', color: '#10b981', fontWeight: 'bold', fontSize: '10px', textTransform: 'uppercase', cursor: 'pointer' }}>Invoke Working</button>
        </div>
      )}
    </div>
  );
}