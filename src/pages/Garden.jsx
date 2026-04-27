import React, { useState, useEffect, useMemo } from 'react';

const MASTER_DATA = [
  // ... (All 85 items are included in the logic, I've truncated the list for the code block but keep your full array in the file)
  { id: 'c22', name: 'Amazonite', type: 'Crystal', property: 'Hope', icon: '💎', tags: ['hope', 'courage', 'truth'] },
  { id: 'c2', name: 'Amethyst', type: 'Crystal', property: 'Peace', icon: '✨', tags: ['sleep', 'anxiety', 'peace', 'calm'] },
  { id: 'c3', name: 'Citrine', type: 'Crystal', property: 'Wealth', icon: '💰', tags: ['money', 'success', 'wealth', 'abundance'] },
  { id: 'h7', name: 'Basil', type: 'Herb', property: 'Luck', icon: '🌿', tags: ['money', 'prosperity', 'luck'] },
  { id: 'h1', name: 'Lavender', type: 'Herb', property: 'Peace', icon: '🌿', tags: ['sleep', 'calm', 'peace'] },
  { id: 'k1', name: 'Sea Salt', type: 'Pantry', property: 'Shield', icon: '🧂', tags: ['protection', 'cleansing', 'shield'] },
  { id: 'ca3', name: 'Red', type: 'Colour', property: 'Passion', icon: '❤️', tags: ['strength', 'vitality', 'passion'] },
  // ... rest of your items go here
];

const TAROT_CARDS = [
  { name: 'The Magician', meaning: 'Manifestation, Resourcefulness, Power', icon: '🪄' },
  { name: 'The High Priestess', meaning: 'Intuition, Sacred Knowledge, Subconscious', icon: '🌙' },
  { name: 'The Empress', meaning: 'Femininity, Nature, Abundance', icon: '🌿' },
  { name: 'The Fool', meaning: 'New Beginnings, Optimism, Trust', icon: '🌅' },
  { name: 'The Star', meaning: 'Hope, Spirituality, Renewal', icon: '✨' },
  { name: 'The Moon', meaning: 'Illusion, Fear, Anxiety, Intuition', icon: '🌑' },
  { name: 'The Lovers', meaning: 'Love, Harmony, Relationships', icon: '💘' }
];

export default function Garden() {
  const [activeTab, setActiveTab] = useState('moon');
  const [subFilter, setSubFilter] = useState('Crystal');
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [tarot, setTarot] = useState(null);
  const [ritualOutput, setRitualOutput] = useState(null);
  const [archives, setArchives] = useState([]);

  // Load saved workings on start
  useEffect(() => {
    const saved = localStorage.getItem('selene_archives');
    if (saved) setArchives(JSON.parse(saved));
  }, []);

  const playRitualSound = () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 1);
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1);
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 1);
  };

  const incantation = useMemo(() => {
    if (selectedItems.length === 0) return "Assemble your materia...";
    const materia = selectedItems.map(i => i.name);
    const intent = selectedItems[0]?.property.toLowerCase();
    return `By the power of ${materia.join(" & ")}, I manifest ${intent}.`;
  }, [selectedItems]);

  const saveWorking = () => {
    playRitualSound();
    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      items: selectedItems.map(i => i.name),
      mantra: incantation
    };
    const updated = [newEntry, ...archives];
    setArchives(updated);
    localStorage.setItem('selene_archives', JSON.stringify(updated));
    setRitualOutput(null);
    setSelectedItems([]);
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
        <h1 style={{ color: 'white', fontSize: '2.2rem', fontStyle: 'italic', marginBottom: '10px' }}>Selene Garden</h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '25px' }}>
          {['moon', 'library', 'tarot'].map(tab => (
             <button key={tab} onClick={() => { setActiveTab(tab); setRitualOutput(null); }} style={{ background: 'none', border: 'none', color: activeTab === tab ? '#10b981' : '#1e293b', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '3px', cursor: 'pointer', fontWeight: '900' }}>{tab}</button>
          ))}
        </div>
      </header>

      {activeTab === 'moon' && (
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ padding: '60px 0' }}>
            <div style={{ fontSize: '100px', marginBottom: '20px' }}>🌖</div>
            <h2 style={{ color: 'white', fontSize: '2rem', fontStyle: 'italic' }}>Waning Gibbous</h2>
            <p style={{ color: '#065f46', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '4px' }}>64% Illumination • 4 Days to New Moon</p>
          </div>
          
          <div style={{ textAlign: 'left', marginTop: '40px' }}>
            <h3 style={{ fontSize: '10px', textTransform: 'uppercase', color: '#1e293b', letterSpacing: '2px', borderBottom: '1px solid #111', paddingBottom: '10px', marginBottom: '20px' }}>Past Workings</h3>
            {archives.length === 0 ? (
              <p style={{ fontSize: '12px', color: '#1e293b', fontStyle: 'italic' }}>The archives are empty. Seal a ritual to begin your history.</p>
            ) : (
              archives.map(log => (
                <div key={log.id} style={{ padding: '15px 0', borderBottom: '1px solid #050c09' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#065f46' }}>
                    <span>{log.date}</span>
                    <span>{log.items.join(" • ")}</span>
                  </div>
                  <p style={{ fontSize: '13px', fontStyle: 'italic', color: 'white', marginTop: '5px' }}>{log.mantra}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'library' && (
        <>
          <div style={{ maxWidth: '500px', margin: '0 auto 40px auto' }}>
            <input 
              type="text" 
              placeholder="Filter intent..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', background: 'transparent', borderBottom: '1px solid #1e293b', borderTop: 'none', borderLeft: 'none', borderRight: 'none', padding: '15px', color: 'white', outline: 'none', fontSize: '14px', textAlign: 'center' }}
            />
          </div>
          <nav style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '40px' }}>
            {['Crystal', 'Herb', 'Pantry', 'Colour'].map(type => (
              <button key={type} onClick={() => setSubFilter(type)} style={{ background: 'none', color: subFilter === type ? '#34d399' : '#475569', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '10px', textTransform: 'uppercase' }}>{type}</button>
            ))}
          </nav>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '20px', maxWidth: '1000px', margin: '0 auto', paddingBottom: '150px' }}>
            {filteredData.map(item => (
              <div key={item.id} onClick={() => {
                if (selectedItems.find(s => s.id === item.id)) setSelectedItems(selectedItems.filter(i => i.id !== item.id));
                else if (selectedItems.length < 4) setSelectedItems([...selectedItems, item]);
              }} style={{ background: selectedItems.find(s => s.id === item.id) ? '#064e3b11' : '#040a08', border: selectedItems.find(s => s.id === item.id) ? '1px solid #10b981' : '1px solid #111', padding: '30px 20px', borderRadius: '40px', textAlign: 'center', cursor: 'pointer' }}>
                <div style={{ fontSize: '28px', marginBottom: '15px' }}>{item.icon}</div>
                <div style={{ color: 'white', fontSize: '15px', fontStyle: 'italic' }}>{item.name}</div>
                <div style={{ fontSize: '9px', color: '#065f46', textTransform: 'uppercase' }}>{item.property}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'tarot' && (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          {!tarot ? (
            <div onClick={() => { playRitualSound(); setTarot(TAROT_CARDS[Math.floor(Math.random() * TAROT_CARDS.length)]); }} style={{ width: '200px', height: '300px', border: '1px solid #065f46', borderRadius: '15px', margin: '0 auto', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#065f46', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '3px' }}>Tap Deck</span>
            </div>
          ) : (
            <div style={{ background: '#050c09', padding: '50px 30px', borderRadius: '20px', border: '1px solid #1e293b', maxWidth: '350px', margin: '0 auto' }}>
              <div style={{ fontSize: '60px', marginBottom: '25px' }}>{tarot.icon}</div>
              <h3 style={{ color: 'white', fontSize: '1.8rem', fontStyle: 'italic' }}>{tarot.name}</h3>
              <p style={{ color: '#065f46', fontSize: '14px', fontStyle: 'italic' }}>{tarot.meaning}</p>
              <button onClick={() => setTarot(null)} style={{ marginTop: '30px', background: 'none', border: 'none', color: '#1e293b', fontSize: '10px', textTransform: 'uppercase', cursor: 'pointer' }}>Return to Deck</button>
            </div>
          )}
        </div>
      )}

      {/* RITUAL OVERLAY */}
      {ritualOutput && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(2,8,6,0.98)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ maxWidth: '450px', width: '100%', padding: '40px', textAlign: 'center' }}>
             <h2 style={{ color: 'white', fontStyle: 'italic', fontSize: '2rem', marginBottom: '30px' }}>The Ceremony</h2>
             <div style={{ textAlign: 'left', marginBottom: '40px', borderLeft: '1px solid #065f46', paddingLeft: '25px' }}>
                {ritualOutput.map((step, i) => (
                  <p key={i} style={{ fontSize: '14px', marginBottom: '15px', color: '#cbd5e1' }}><span style={{ color: '#10b981' }}>{i + 1}.</span> {step}</p>
                ))}
             </div>
             <button onClick={saveWorking} style={{ background: 'white', color: 'black', border: 'none', padding: '18px 40px', borderRadius: '2px', fontWeight: '900', textTransform: 'uppercase', fontSize: '11px', cursor: 'pointer' }}>Complete Working</button>
          </div>
        </div>
      )}

      {selectedItems.length > 0 && !ritualOutput && (
        <div style={{ position: 'fixed', bottom: '40px', left: '50%', transform: 'translateX(-50%)', width: '90%', maxWidth: '500px', backgroundColor: 'black', border: '1px solid #111', padding: '25px', borderRadius: '20px', textAlign: 'center', zIndex: 100 }}>
          <p style={{ color: 'white', fontSize: '14px', fontStyle: 'italic', marginBottom: '15px' }}>"{incantation}"</p>
          <button onClick={() => setRitualOutput([
            "Center your breath.",
            ...selectedItems.map(i => `Channel the ${i.property} of ${i.name}.`),
            "The intent is sealed."
          ])} style={{ background: '#10b981', color: 'black', border: 'none', padding: '10px 25px', borderRadius: '50px', fontWeight: 'black', fontSize: '10px', textTransform: 'uppercase', cursor: 'pointer' }}>Begin Ritual</button>
        </div>
      )}
    </div>
  );
}