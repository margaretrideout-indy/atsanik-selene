import React, { useState, useMemo } from 'react';

const MASTER_DATA = [
  // CRYSTALS (25) - RESTORED & ALPHABETIZED
  { id: 'c22', name: 'Amazonite', type: 'Crystal', property: 'Hope', icon: '💎' },
  { id: 'c2', name: 'Amethyst', type: 'Crystal', property: 'Peace', icon: '✨' },
  { id: 'c25', name: 'Aquamarine', type: 'Crystal', property: 'Flow', icon: '🌊' },
  { id: 'c13', name: 'Black Obsidian', type: 'Crystal', property: 'Shadow', icon: '🌑' },
  { id: 'c6', name: 'Black Tourmaline', type: 'Crystal', property: 'Shield', icon: '🛡️' },
  { id: 'c12', name: 'Carnelian', type: 'Crystal', property: 'Creativity', icon: '🔥' },
  { id: 'c3', name: 'Citrine', type: 'Crystal', property: 'Wealth', icon: '💰' },
  { id: 'c10', name: 'Clear Quartz', type: 'Crystal', property: 'Amplify', icon: '💎' },
  { id: 'c15', name: 'Fluorite', type: 'Crystal', property: 'Focus', icon: '🔮' },
  { id: 'c14', name: 'Green Aventurine', type: 'Crystal', property: 'Opportunity', icon: '🍀' },
  { id: 'c16', name: 'Hematite', type: 'Crystal', property: 'Grounding', icon: '🪨' },
  { id: 'c23', name: 'Howlite', type: 'Crystal', property: 'Patience', icon: '☁️' },
  { id: 'c7', name: 'Labradorite', type: 'Crystal', property: 'Magic', icon: '🌌' },
  { id: 'c9', name: 'Lapis Lazuli', type: 'Crystal', property: 'Truth', icon: '👁️' },
  { id: 'c21', name: 'Lepidolite', type: 'Crystal', property: 'Calm', icon: '🌬️' },
  { id: 'c17', name: 'Malachite', type: 'Crystal', property: 'Change', icon: '🐍' },
  { id: 'c1', name: 'Moonstone', type: 'Crystal', property: 'Intuition', icon: '🌙' },
  { id: 'c11', name: 'Pyrite', type: 'Crystal', property: 'Luck', icon: '🪙' },
  { id: 'c18', name: 'Red Jasper', type: 'Crystal', property: 'Vitality', icon: '🔋' },
  { id: 'c4', name: 'Rose Quartz', type: 'Crystal', property: 'Love', icon: '💖' },
  { id: 'c5', name: 'Selenite', type: 'Crystal', property: 'Cleansing', icon: '🕊️' },
  { id: 'c20', name: 'Smoky Quartz', type: 'Crystal', property: 'Release', icon: '💨' },
  { id: 'c19', name: 'Sodalite', type: 'Crystal', property: 'Logic', icon: '🧠' },
  { id: 'c8', name: 'Tiger Eye', type: 'Crystal', property: 'Courage', icon: '🐯' },
  { id: 'c24', name: 'Unakite', type: 'Crystal', property: 'Balance', icon: '⚖️' },

  // HERBS (25) - ALPHABETIZED
  { id: 'h7', name: 'Basil', type: 'Herb', property: 'Luck', icon: '🌿' },
  { id: 'h4', name: 'Bay Leaf', type: 'Herb', property: 'Manifest', icon: '🍂' },
  { id: 'h22', name: 'Calendula', type: 'Herb', property: 'Sun-Light', icon: '🌼' },
  { id: 'h23', name: 'Catnip', type: 'Herb', property: 'Fascination', icon: '🐱' },
  { id: 'h6', name: 'Chamomile', type: 'Herb', property: 'Calm', icon: '🌼' },
  { id: 'h10', name: 'Cinnamon', type: 'Herb', property: 'Speed', icon: '🪵' },
  { id: 'h24', name: 'Comfrey', type: 'Herb', property: 'Safety', icon: '🩹' },
  { id: 'h11', name: 'Dandelion', type: 'Herb', property: 'Growth', icon: '🌻' },
  { id: 'h19', name: 'Elderberry', type: 'Herb', property: 'Fates', icon: '🫐' },
  { id: 'h12', name: 'Eucalyptus', type: 'Herb', property: 'Healing', icon: '🌿' },
  { id: 'h17', name: 'Hibiscus', type: 'Herb', property: 'Passion', icon: '🌺' },
  { id: 'h13', name: 'Jasmine', type: 'Herb', property: 'Dreams', icon: '🌸' },
  { id: 'h1', name: 'Lavender', type: 'Herb', property: 'Peace', icon: '🌿' },
  { id: 'h15', name: 'Mistletoe', type: 'Herb', property: 'Protection', icon: '🌿' },
  { id: 'h2', name: 'Mugwort', type: 'Herb', property: 'Vision', icon: '🌙' },
  { id: 'h16', name: 'Nettle', type: 'Herb', property: 'Defense', icon: '🧤' },
  { id: 'h14', name: 'Patchouli', type: 'Herb', property: 'Grounding', icon: '🪴' },
  { id: 'h5', name: 'Peppermint', type: 'Herb', property: 'Energy', icon: '🌱' },
  { id: 'h3', name: 'Rosemary', type: 'Herb', property: 'Memory', icon: '🍃' },
  { id: 'h9', name: 'Sage', type: 'Herb', property: 'Cleanse', icon: '🌬️' },
  { id: 'h8', name: 'Thyme', type: 'Herb', property: 'Bravery', icon: '🪴' },
  { id: 'h18', name: 'Valerian', type: 'Herb', property: 'Deep Sleep', icon: '💤' },
  { id: 'h21', name: 'Vervain', type: 'Herb', property: 'Enchant', icon: '✨' },
  { id: 'h25', name: 'Witch Hazel', type: 'Herb', property: 'Mend', icon: '🪄' },
  { id: 'h20', name: 'Yarrow', type: 'Herb', property: 'Boundary', icon: '🛡️' },

  // PANTRY (25) - ALPHABETIZED
  { id: 'k18', name: 'Allspice', type: 'Pantry', property: 'Drive', icon: '🪵' },
  { id: 'k16', name: 'Bayberry', type: 'Pantry', property: 'Gold', icon: '🕯️' },
  { id: 'k4', name: 'Black Pepper', type: 'Pantry', property: 'Banish', icon: '🌑' },
  { id: 'k24', name: 'Cinnamon Stick', type: 'Pantry', property: 'Fast Luck', icon: '🪵' },
  { id: 'k11', name: 'Clove', type: 'Pantry', property: 'Silence', icon: '🍢' },
  { id: 'k3', name: 'Coffee', type: 'Pantry', property: 'Haste', icon: '☕' },
  { id: 'k10', name: 'Egg Shell', type: 'Pantry', property: 'Wall', icon: '🥚' },
  { id: 'k25', name: 'Flour', type: 'Pantry', property: 'Home', icon: '🍞' },
  { id: 'k8', name: 'Garlic', type: 'Pantry', property: 'Warding', icon: '🧄' },
  { id: 'k13', name: 'Ginger', type: 'Pantry', property: 'Heat', icon: '🫚' },
  { id: 'k2', name: 'Honey', type: 'Pantry', property: 'Sweetness', icon: '🍯' },
  { id: 'k21', name: 'Lemon Peel', type: 'Pantry', property: 'Clean', icon: '🍋' },
  { id: 'k19', name: 'Mustard', type: 'Pantry', property: 'Faith', icon: '🟡' },
  { id: 'k14', name: 'Nutmeg', type: 'Pantry', property: 'Coin', icon: '🌰' },
  { id: 'k17', name: 'Olive Oil', type: 'Pantry', property: 'Bless', icon: '🫒' },
  { id: 'k9', name: 'Onion Skin', type: 'Pantry', property: 'Layers', icon: '🧅' },
  { id: 'k20', name: 'Orange Peel', type: 'Pantry', property: 'Joy', icon: '🍊' },
  { id: 'k23', name: 'Peppercorn', type: 'Pantry', property: 'Banish', icon: '🌑' },
  { id: 'k5', name: 'Rice', type: 'Pantry', property: 'Abundance', icon: '🍚' },
  { id: 'k1', name: 'Sea Salt', type: 'Pantry', property: 'Shield', icon: '🧂' },
  { id: 'k12', name: 'Star Anise', type: 'Pantry', property: 'Luck', icon: '🌟' },
  { id: 'k6', name: 'Sugar', type: 'Pantry', property: 'Magnet', icon: '🍬' },
  { id: 'k15', name: 'Tea Leaves', type: 'Pantry', property: 'Fate', icon: '🍵' },
  { id: 'k22', name: 'Vanilla', type: 'Pantry', property: 'Lust', icon: '🍦' },
  { id: 'k7', name: 'Vinegar', type: 'Pantry', property: 'Break', icon: '🧪' },

  // COLOURS (10) - ALPHABETIZED
  { id: 'ca2', name: 'Black', type: 'Colour', property: 'Banishing', icon: '🖤' },
  { id: 'ca5', name: 'Blue', type: 'Colour', property: 'Tranquility', icon: '💙' },
  { id: 'ca10', name: 'Brown', type: 'Colour', property: 'Grounding', icon: '🤎' },
  { id: 'ca4', name: 'Green', type: 'Colour', property: 'Growth', icon: '💚' },
  { id: 'ca8', name: 'Orange', type: 'Colour', property: 'Road Opening', icon: '🧡' },
  { id: 'ca9', name: 'Pink', type: 'Colour', property: 'Self-Love', icon: '💖' },
  { id: 'ca7', name: 'Purple', type: 'Colour', property: 'Psychic Power', icon: '💜' },
  { id: 'ca3', name: 'Red', type: 'Colour', property: 'Passion', icon: '❤️' },
  { id: 'ca1', name: 'White', type: 'Colour', property: 'Purity', icon: '🤍' },
  { id: 'ca6', name: 'Yellow', type: 'Colour', property: 'Intelligence', icon: '💛' }
];

const TAROT_CARDS = [
  { name: 'The Magician', meaning: 'Power, Skill, Concentration' },
  { name: 'The High Priestess', meaning: 'Intuition, Mystery, Subconscious' },
  { name: 'The Empress', meaning: 'Femininity, Beauty, Nature' },
  { name: 'The Fool', meaning: 'Beginnings, Innocence, Free Spirit' },
  { name: 'The Star', meaning: 'Hope, Faith, Purpose' }
];

export default function Garden() {
  const [activeTab, setActiveTab] = useState('moon');
  const [subFilter, setSubFilter] = useState('Crystal');
  const [selectedItems, setSelectedItems] = useState([]);
  const [tarot, setTarot] = useState(null);

  const drawCard = () => {
    const random = TAROT_CARDS[Math.floor(Math.random() * TAROT_CARDS.length)];
    setTarot(random);
  };

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
        <h1 style={{ color: 'white', fontSize: '2.2rem', fontStyle: 'italic', marginBottom: '10px' }}>Selene Garden</h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          {['moon', 'library', 'tarot'].map(tab => (
             <button key={tab} onClick={() => setActiveTab(tab)} style={{ background: 'none', border: 'none', color: activeTab === tab ? '#34d399' : '#475569', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '2px', cursor: 'pointer', fontWeight: 'bold' }}>{tab}</button>
          ))}
        </div>
      </header>

      {activeTab === 'moon' && (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <div style={{ fontSize: '80px', marginBottom: '20px' }}>🌖</div>
          <h2 style={{ color: 'white', fontSize: '2rem', fontStyle: 'italic' }}>Waning Gibbous</h2>
          <p style={{ color: '#065f46', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '4px', marginTop: '10px' }}>A Time for Release and Reflection</p>
        </div>
      )}

      {activeTab === 'library' && (
        <>
          <nav style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '40px' }}>
            {['Crystal', 'Herb', 'Pantry', 'Colour'].map(type => (
              <button key={type} onClick={() => setSubFilter(type)} style={{ background: subFilter === type ? '#064e3b' : 'transparent', color: subFilter === type ? '#34d399' : '#475569', border: '1px solid #1e293b', padding: '8px 20px', borderRadius: '15px', cursor: 'pointer', fontWeight: 'bold', fontSize: '10px', textTransform: 'uppercase' }}>{type}</button>
            ))}
          </nav>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '20px', maxWidth: '1000px', margin: '0 auto' }}>
            {MASTER_DATA.filter(i => i.type === subFilter).map(item => (
              <div key={item.id} onClick={() => toggleItem(item)} style={{ background: selectedItems.find(s => s.id === item.id) ? '#064e3b22' : '#050c09', border: selectedItems.find(s => s.id === item.id) ? '1px solid #10b981' : '1px solid #1e293b', padding: '25px', borderRadius: '30px', textAlign: 'center', cursor: 'pointer' }}>
                <div style={{ fontSize: '24px', marginBottom: '10px' }}>{item.icon}</div>
                <div style={{ color: 'white', fontSize: '15px', fontStyle: 'italic' }}>{item.name}</div>
                <div style={{ fontSize: '9px', color: '#065f46', marginTop: '5px', textTransform: 'uppercase', fontWeight: 'bold' }}>{item.property}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'tarot' && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          {!tarot ? (
            <button onClick={drawCard} style={{ background: '#064e3b', color: '#34d399', border: 'none', padding: '20px 40px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>Draw Card</button>
          ) : (
            <div style={{ background: '#050c09', padding: '40px', borderRadius: '40px', border: '1px solid #1e293b', maxWidth: '300px', margin: '0 auto' }}>
              <div style={{ fontSize: '50px', marginBottom: '20px' }}>🃏</div>
              <h3 style={{ color: 'white', fontSize: '1.5rem', italic: 'true' }}>{tarot.name}</h3>
              <p style={{ color: '#065f46', fontSize: '12px', marginTop: '10px' }}>{tarot.meaning}</p>
              <button onClick={() => setTarot(null)} style={{ marginTop: '20px', background: 'none', border: 'none', color: '#444', fontSize: '9px', textTransform: 'uppercase', cursor: 'pointer' }}>Reset</button>
            </div>
          )}
        </div>
      )}

      {selectedItems.length > 0 && (
        <div style={{ position: 'fixed', bottom: '30px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'black', border: '1px solid #065f46', padding: '15px 30px', borderRadius: '50px', display: 'flex', gap: '20px', alignItems: 'center', zIndex: 100 }}>
          <span style={{ fontSize: '10px', color: '#475569', textTransform: 'uppercase' }}>Work: {selectedItems.length}/4</span>
          <button style={{ background: 'none', border: 'none', color: '#10b981', fontWeight: 'bold', fontSize: '10px', textTransform: 'uppercase', cursor: 'pointer' }}>Invoke Working</button>
        </div>
      )}
    </div>
  );
}