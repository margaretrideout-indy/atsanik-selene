import React, { useState, useEffect, useMemo } from 'react';

// --- THE MASTER DATABASE (85 ITEMS) ---
const MASTER_DATA = [
  { id: 'c22', name: 'Amazonite', type: 'Crystal', property: 'Hope', icon: '💎', tags: ['hope', 'courage', 'truth'] },
  { id: 'c2', name: 'Amethyst', type: 'Crystal', property: 'Peace', icon: '✨', tags: ['sleep', 'anxiety', 'peace', 'calm'] },
  { id: 'c25', name: 'Aquamarine', type: 'Crystal', property: 'Flow', icon: '🌊', tags: ['peace', 'water', 'flow'] },
  { id: 'c13', name: 'Black Obsidian', type: 'Crystal', property: 'Shadow', icon: '🌑', tags: ['truth', 'protection', 'shadow'] },
  { id: 'c6', name: 'Black Tourmaline', type: 'Crystal', property: 'Shield', icon: '🛡️', tags: ['protection', 'grounding', 'shield'] },
  { id: 'c12', name: 'Carnelian', type: 'Crystal', property: 'Creativity', icon: '🔥', tags: ['passion', 'action', 'creativity'] },
  { id: 'c3', name: 'Citrine', type: 'Crystal', property: 'Wealth', icon: '💰', tags: ['money', 'success', 'wealth', 'abundance'] },
  { id: 'c10', name: 'Clear Quartz', type: 'Crystal', property: 'Amplify', icon: '💎', tags: ['power', 'clarity', 'amplify'] },
  { id: 'c15', name: 'Fluorite', type: 'Crystal', property: 'Focus', icon: '🔮', tags: ['study', 'clarity', 'focus'] },
  { id: 'h7', name: 'Basil', type: 'Herb', property: 'Luck', icon: '🌿', tags: ['money', 'prosperity', 'luck'] },
  { id: 'h4', name: 'Bay Leaf', type: 'Herb', property: 'Manifest', icon: '🍂', tags: ['wishes', 'money', 'manifest'] },
  { id: 'k1', name: 'Sea Salt', type: 'Pantry', property: 'Shield', icon: '🧂', tags: ['protection', 'cleansing', 'shield'] },
  { id: 'ca3', name: 'Red', type: 'Colour', property: 'Passion', icon: '❤️', tags: ['strength', 'vitality', 'passion'] },
  { id: 'ca1', name: 'White', type: 'Colour', property: 'Purity', icon: '🤍', tags: ['universal', 'cleansing', 'purity'] },
  // ... Keep all 85 items here in your actual file
];

const TAROT_CARDS = [
  { name: 'The Magician', meaning: 'The bridge between heaven and earth; absolute potential.', icon: '🪄' },
  { name: 'The High Priestess', meaning: 'The thin veil between worlds; secrets and stillness.', icon: '🌙' },
  { name: 'The Empress', meaning: 'The luxury of nature; abundance in its rawest form.', icon: '🌿' },
  { name: 'The Star', meaning: 'A cold light in the dark; hope that requires endurance.', icon: '✨' },
  { name: 'The Moon', meaning: 'Wild intuition; the face of the subconscious.', icon: '🌑' }
];

export default function Garden() {
  const [activeTab, setActiveTab] = useState('moon');
  const [subFilter, setSubFilter] = useState('Crystal');
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [tarot, setTarot] = useState(null);
  const [ritualOutput, setRitualOutput] = useState(null);
  const [archives, setArchives] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('selene_archives');
    if (saved) setArchives(JSON.parse(saved));
  }, []);

  const playChime = (freq = 440) => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(freq / 2, audioCtx.currentTime + 0.8);
      gainNode.gain.setValueAtTime(0.03, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.8);
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.8);
    } catch(e) {}
  };

  // NARRATIVE WEAVER: Instead of "By A & B", it builds a story
  const weaveIntent = useMemo(() => {
    if (selectedItems.length === 0) return "Assemble the materia...";
    
    const materia = selectedItems.map(i => i.name);
    const mainProp = selectedItems[0].property.toLowerCase();
    
    // Different structures based on types selected
    const types = selectedItems.map(i => i.type);
    
    if (types.includes('Crystal') && types.includes('Herb')) {
        return `As the ${materia.find((_, i) => types[i] === 'Crystal')} anchors the spirit, let the ${materia.find((_, i) => types[i] === 'Herb')} carry my intent for ${mainProp} into the ethers.`;
    }
    
    if (types.includes('Colour')) {
        return `Wrapped in the resonance of ${materia.find((_, i) => types[i] === 'Colour')}, I call upon ${materia.filter((_, i) => types[i] !== 'Colour').join(' and ')} to manifest ${mainProp}.`;
    }

    return `I bind the resonance of ${materia.join(' to ')}—let the work for ${mainProp} begin.`;
  }, [selectedItems]);

  const saveAndComplete = () => {
    playChime(220);
    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      mantra: weaveIntent
    };
    const updated = [newEntry, ...archives];
    setArchives(updated);
    localStorage.setItem('selene_archives', JSON.stringify(updated));
    setRitualOutput(null);
    setSelectedItems([]);
  };

  const drawTarot = () => {
    playChime(660);
    const card = TAROT_CARDS[Math.floor(Math.random() * TAROT_CARDS.length)];
    const isReversed = Math.random() > 0.7;
    setTarot({ ...card, reversed: isReversed });
  };

  const filteredData = MASTER_DATA.filter(item => {
    const matchesTab = item.type === subFilter;
    const matchesSearch = searchQuery === "" || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags?.some(tag => tag.includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  return (
    <div style={{ backgroundColor: '#020806', minHeight: '100vh', color: '#cbd5e1', padding: '20px', fontFamily: 'serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px', paddingTop: '20px' }}>
        <h1 style={{ color: 'white', fontSize: '2.2rem', fontStyle: 'italic', letterSpacing: '-1px' }}>Selene Garden</h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '10px' }}>
          {['moon', 'library', 'tarot'].map(tab => (
             <button key={tab} onClick={() => setActiveTab(tab)} style={{ background: 'none', border: 'none', color: activeTab === tab ? '#10b981' : '#1e293b', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '4px', cursor: 'pointer', fontWeight: '900', transition: '0.3s' }}>{tab}</button>
          ))}
        </div>
      </header>

      {activeTab === 'moon' && (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ fontSize: '100px', marginBottom: '20px', filter: 'drop-shadow(0 0 15px rgba(16,185,129,0.1))' }}>🌖</div>
            <h2 style={{ color: 'white', fontSize: '2rem', fontStyle: 'italic', fontWeight: '200' }}>Waning Gibbous</h2>
            <p style={{ color: '#065f46', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '5px', marginTop: '10px' }}>Illumination: 64%</p>
          </div>
          
          <div style={{ marginTop: '20px' }}>
            <h3 style={{ fontSize: '9px', textTransform: 'uppercase', color: '#1e293b', letterSpacing: '3px', borderBottom: '1px solid #111', paddingBottom: '12px' }}>Sacred Records</h3>
            {archives.length === 0 ? (
              <p style={{ fontSize: '12px', color: '#1e293b', fontStyle: 'italic', marginTop: '20px' }}>No workings recorded in this cycle.</p>
            ) : (
              archives.map(log => (
                <div key={log.id} style={{ padding: '25px 0', borderBottom: '1px solid #050c09' }}>
                  <span style={{ fontSize: '9px', color: '#065f46', textTransform: 'uppercase' }}>{log.date}</span>
                  <p style={{ fontSize: '14px', fontStyle: 'italic', color: 'white', marginTop: '8px', lineHeight: '1.6' }}>"{log.mantra}"</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'library' && (
        <>
          <div style={{ maxWidth: '400px', margin: '0 auto 50px auto' }}>
            <input 
              type="text" 
              placeholder="Seek intent..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', background: 'transparent', borderBottom: '1px solid #1e293b', borderTop: 'none', borderLeft: 'none', borderRight: 'none', padding: '15px', color: 'white', outline: 'none', fontSize: '14px', textAlign: 'center', fontStyle: 'italic' }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '40px' }}>
            {['Crystal', 'Herb', 'Pantry', 'Colour'].map(type => (
              <button key={type} onClick={() => setSubFilter(type)} style={{ background: 'none', color: subFilter === type ? '#34d399' : '#1e293b', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px' }}>{type}</button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '20px', maxWidth: '900px', margin: '0 auto', paddingBottom: '160px' }}>
            {filteredData.map(item => (
              <div key={item.id} onClick={() => {
                playChime(880);
                if (selectedItems.find(s => s.id === item.id)) setSelectedItems(selectedItems.filter(i => i.id !== item.id));
                else if (selectedItems.length < 4) setSelectedItems([...selectedItems, item]);
              }} style={{ background: selectedItems.find(s => s.id === item.id) ? '#064e3b11' : '#030907', border: selectedItems.find(s => s.id === item.id) ? '1px solid #10b981' : '1px solid #111', padding: '35px 20px', borderRadius: '4px', textAlign: 'center', cursor: 'pointer', transition: '0.4s' }}>
                <div style={{ fontSize: '30px', marginBottom: '15px', opacity: selectedItems.find(s => s.id === item.id) ? 1 : 0.4 }}>{item.icon}</div>
                <div style={{ color: 'white', fontSize: '14px', fontStyle: 'italic', letterSpacing: '0.5px' }}>{item.name}</div>
                <div style={{ fontSize: '8px', color: '#065f46', textTransform: 'uppercase', marginTop: '5px', letterSpacing: '1px' }}>{item.property}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'tarot' && (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          {!tarot ? (
            <div onClick={drawTarot} style={{ width: '180px', height: '280px', border: '1px solid #065f46', borderRadius: '10px', margin: '0 auto', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'repeating-linear-gradient(45deg, #020806, #020806 5px, #040a08 5px, #040a08 10px)' }}>
               <div style={{ color: '#065f46', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '5px', transform: 'rotate(-90deg)' }}>Consign to Fate</div>
            </div>
          ) : (
            <div style={{ maxWidth: '300px', margin: '0 auto' }}>
              <div style={{ fontSize: '80px', marginBottom: '20px', transform: tarot.reversed ? 'rotate(180deg)' : 'none', transition: '1s' }}>{tarot.icon}</div>
              <h3 style={{ color: 'white', fontSize: '1.8rem', fontStyle: 'italic' }}>{tarot.name} {tarot.reversed && '(Shadow)'}</h3>
              <p style={{ color: '#065f46', fontSize: '13px', lineHeight: '1.8', fontStyle: 'italic', marginTop: '15px' }}>{tarot.meaning}</p>
              <button onClick={() => setTarot(null)} style={{ marginTop: '40px', background: 'none', border: 'none', color: '#1e293b', fontSize: '9px', textTransform: 'uppercase', cursor: 'pointer', letterSpacing: '2px' }}>Reset deck</button>
            </div>
          )}
        </div>
      )}

      {/* RITUAL OVERLAY */}
      {ritualOutput && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: '#020806', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ maxWidth: '500px', width: '100%', padding: '40px' }}>
             <h2 style={{ color: 'white', fontStyle: 'italic', fontSize: '2.5rem', textAlign: 'center', marginBottom: '40px' }}>The Working</h2>
             <div style={{ textAlign: 'left', marginBottom: '50px', borderLeft: '1px solid #10b981', paddingLeft: '30px' }}>
                {ritualOutput.map((step, i) => (
                  <p key={i} style={{ fontSize: '15px', marginBottom: '20px', color: '#cbd5e1', lineHeight: '1.6' }}>{step}</p>
                ))}
             </div>
             <button onClick={saveAndComplete} style={{ background: 'white', color: 'black', border: 'none', padding: '20px', width: '100%', fontWeight: '900', textTransform: 'uppercase', fontSize: '11px', cursor: 'pointer', letterSpacing: '3px' }}>Seal into Memory</button>
          </div>
        </div>
      )}

      {selectedItems.length > 0 && !ritualOutput && (
        <div style={{ position: 'fixed', bottom: '40px', left: '50%', transform: 'translateX(-50%)', width: '90%', maxWidth: '550px', backgroundColor: '#000', border: '1px solid #111', padding: '30px', textAlign: 'center', zIndex: 100 }}>
          <p style={{ color: '#10b981', fontSize: '15px', fontStyle: 'italic', marginBottom: '20px', lineHeight: '1.5' }}>"{weaveIntent}"</p>
          <button onClick={() => setRitualOutput([
            "Acknowledge the silence of your surroundings.",
            `Ground your energy into the resonance of ${selectedItems.map(i => i.name).join(', ')}.`,
            "Visualize the path clearing ahead of you.",
            `Recite the weave: "${weaveIntent}"`,
            "The intent is no longer yours; it belongs to the garden."
          ])} style={{ background: '#10b981', color: 'black', border: 'none', padding: '12px 30px', borderRadius: '0', fontWeight: '900', textTransform: 'uppercase', fontSize: '10px', cursor: 'pointer', letterSpacing: '2px' }}>Commence Ceremony</button>
        </div>
      )}
    </div>
  );
}