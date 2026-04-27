import React, { useState, useEffect, useMemo } from 'react';

// --- THE MASTER DATABASE (Expanded) ---
const MASTER_DATA = [
  // CRYSTALS
  { id: 'c22', name: 'Amazonite', type: 'Crystal', property: 'Hope', icon: '💎', tags: ['hope', 'courage', 'truth'] },
  { id: 'c2', name: 'Amethyst', type: 'Crystal', property: 'Peace', icon: '✨', tags: ['sleep', 'anxiety', 'peace', 'calm'] },
  { id: 'c25', name: 'Aquamarine', type: 'Crystal', property: 'Flow', icon: '🌊', tags: ['peace', 'water', 'flow'] },
  { id: 'c13', name: 'Black Obsidian', type: 'Crystal', property: 'Shadow', icon: '🌑', tags: ['truth', 'protection', 'shadow'] },
  { id: 'c6', name: 'Black Tourmaline', type: 'Crystal', property: 'Shield', icon: '🛡️', tags: ['protection', 'grounding', 'shield'] },
  { id: 'c12', name: 'Carnelian', type: 'Crystal', property: 'Creativity', icon: '🔥', tags: ['passion', 'action', 'creativity'] },
  { id: 'c3', name: 'Citrine', type: 'Crystal', property: 'Wealth', icon: '💰', tags: ['money', 'success', 'wealth', 'abundance'] },
  { id: 'c10', name: 'Clear Quartz', type: 'Crystal', property: 'Amplify', icon: '💎', tags: ['power', 'clarity', 'amplify'] },
  { id: 'c15', name: 'Fluorite', type: 'Crystal', property: 'Focus', icon: '🔮', tags: ['study', 'clarity', 'focus'] },
  { id: 'c14', name: 'Green Aventurine', type: 'Crystal', property: 'Opportunity', icon: '🍀', tags: ['money', 'growth', 'opportunity'] },
  { id: 'c7', name: 'Labradorite', type: 'Crystal', property: 'Magic', icon: '🌌', tags: ['psychic', 'change', 'magic'] },
  { id: 'c1', name: 'Moonstone', type: 'Crystal', property: 'Intuition', icon: '🌙', tags: ['psychic', 'dreams', 'intuition'] },
  { id: 'c4', name: 'Rose Quartz', type: 'Crystal', property: 'Love', icon: '💖', tags: ['romance', 'healing', 'love'] },
  { id: 'c5', name: 'Selenite', type: 'Crystal', property: 'Cleansing', icon: '🕊️', tags: ['purify', 'charging', 'cleansing'] },
  
  // HERBS
  { id: 'h7', name: 'Basil', type: 'Herb', property: 'Luck', icon: '🌿', tags: ['money', 'prosperity', 'luck'] },
  { id: 'h4', name: 'Bay Leaf', type: 'Herb', property: 'Manifest', icon: '🍂', tags: ['wishes', 'money', 'manifest'] },
  { id: 'h6', name: 'Chamomile', type: 'Herb', property: 'Calm', icon: '🌼', tags: ['anxiety', 'sleep', 'calm'] },
  { id: 'h1', name: 'Lavender', type: 'Herb', property: 'Peace', icon: '🌿', tags: ['sleep', 'calm', 'peace'] },
  { id: 'h2', name: 'Mugwort', type: 'Herb', property: 'Vision', icon: '🌙', tags: ['dreams', 'psychic', 'vision'] },
  { id: 'h5', name: 'Peppermint', type: 'Herb', property: 'Energy', icon: '🌱', tags: ['vitality', 'clear', 'energy'] },
  { id: 'h3', name: 'Rosemary', type: 'Herb', property: 'Memory', icon: '🍃', tags: ['focus', 'protection', 'memory'] },
  { id: 'h9', name: 'Sage', type: 'Herb', property: 'Cleanse', icon: '🌬️', tags: ['purify', 'wisdom', 'cleanse'] },

  // PANTRY
  { id: 'k4', name: 'Black Pepper', type: 'Pantry', property: 'Banish', icon: '🌑', tags: ['protection', 'exit', 'banish'] },
  { id: 'k10', name: 'Egg Shell', type: 'Pantry', property: 'Wall', icon: '🥚', tags: ['boundaries', 'protection'] },
  { id: 'k2', name: 'Honey', type: 'Pantry', property: 'Sweetness', icon: '🍯', tags: ['love', 'friendship', 'sweetness'] },
  { id: 'k5', name: 'Rice', type: 'Pantry', property: 'Abundance', icon: '🍚', tags: ['money', 'fertility', 'abundance'] },
  { id: 'k1', name: 'Sea Salt', type: 'Pantry', property: 'Shield', icon: '🧂', tags: ['protection', 'cleansing', 'shield'] },

  // COLOURS
  { id: 'ca5', name: 'Blue', type: 'Colour', property: 'Tranquility', icon: '💙', tags: ['peace', 'forgiveness', 'tranquility'] },
  { id: 'ca4', name: 'Green', type: 'Colour', property: 'Growth', icon: '💚', tags: ['money', 'fertility', 'growth'] },
  { id: 'ca3', name: 'Red', type: 'Colour', property: 'Passion', icon: '❤️', tags: ['strength', 'vitality', 'passion'] },
  { id: 'ca1', name: 'White', type: 'Colour', property: 'Purity', icon: '🤍', tags: ['universal', 'cleansing', 'purity'] }
];

// --- TAROT DATABASE WITH FATE LINES ---
const TAROT_CARDS = [
  { name: 'The Magician', meaning: 'The bridge between heaven and earth.', icon: '🪄', fateLine: "The Magician grants mastery over these elements." },
  { name: 'The High Priestess', meaning: 'Secrets and deep knowing.', icon: '🌙', fateLine: "The High Priestess veils this intent in sacred silence." },
  { name: 'The Empress', meaning: 'Natural abundance and raw potential.', icon: '🌿', fateLine: "The Empress breathes life into this nascent growth." },
  { name: 'The Star', meaning: 'Hope that requires endurance.', icon: '✨', fateLine: "The Star illuminates the path for this working." },
  { name: 'The Moon', meaning: 'Wild intuition and the face of the subconscious.', icon: '🌑', fateLine: "The Moon reveals the hidden truth of this desire." }
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

  const playChime = (type = 'soft') => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(type === 'deep' ? 220 : 440, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(type === 'deep' ? 110 : 880, audioCtx.currentTime + 0.8);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.8);
    } catch(e) {}
  };

  // --- THE NARRATIVE WEAVER (Integrated with Tarot) ---
  const weaveMantra = useMemo(() => {
    if (selectedItems.length === 0) return "Assemble the materia...";
    
    const crystals = selectedItems.filter(i => i.type === 'Crystal').map(i => i.name);
    const herbs = selectedItems.filter(i => i.type === 'Herb').map(i => i.name);
    const pantry = selectedItems.filter(i => i.type === 'Pantry').map(i => i.name);
    const colors = selectedItems.filter(i => i.type === 'Colour').map(i => i.name);
    const intent = selectedItems[0].property.toLowerCase();

    let story = "";
    if (crystals.length > 0) story += `Drawing from the bedrock of ${crystals.join(' and ')}, `;
    if (herbs.length > 0) story += `I release the spirit of ${herbs.join(' and ')} to carry the work. `;
    if (pantry.length > 0) story += `With the domestic focus of ${pantry.join(' and ')}, the intent is grounded. `;
    if (colors.length > 0) story += `Woven into the hue of ${colors[0]}, `;
    
    story += `this working for ${intent} is now bound. `;

    // Fate Integration
    if (tarot) {
      story += tarot.reversed 
        ? `Beware: ${tarot.name} reversed warns of clouded vision.` 
        : tarot.fateLine;
    }

    return story;
  }, [selectedItems, tarot]);

  const sealRitual = () => {
    playChime('deep');
    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      mantra: weaveMantra
    };
    const updated = [newEntry, ...archives];
    setArchives(updated);
    localStorage.setItem('selene_archives', JSON.stringify(updated));
    setRitualOutput(null);
    setSelectedItems([]);
  };

  const drawTarot = () => {
    playChime('soft');
    const card = TAROT_CARDS[Math.floor(Math.random() * TAROT_CARDS.length)];
    const isReversed = Math.random() > 0.8;
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
        <h1 style={{ color: 'white', fontSize: '2.4rem', fontStyle: 'italic', letterSpacing: '-1.5px' }}>Selene Garden</h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '35px', marginTop: '15px' }}>
          {['moon', 'library', 'tarot'].map(tab => (
             <button key={tab} onClick={() => setActiveTab(tab)} style={{ background: 'none', border: 'none', color: activeTab === tab ? '#10b981' : '#1e293b', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '5px', cursor: 'pointer', fontWeight: '900' }}>{tab}</button>
          ))}
        </div>
      </header>

      {activeTab === 'moon' && (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: '120px', marginBottom: '25px' }}>🌖</div>
            <h2 style={{ color: 'white', fontSize: '2.2rem', fontStyle: 'italic', fontWeight: '100' }}>Waning Gibbous</h2>
            <p style={{ color: '#065f46', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '6px' }}>Illumination 64%</p>
          </div>
          <div>
            <h3 style={{ fontSize: '10px', textTransform: 'uppercase', color: '#1e293b', letterSpacing: '4px', borderBottom: '1px solid #111', paddingBottom: '15px' }}>The Archives</h3>
            {archives.map(log => (
              <div key={log.id} style={{ padding: '30px 0', borderBottom: '1px solid #050c09' }}>
                <span style={{ fontSize: '9px', color: '#065f46' }}>{log.date}</span>
                <p style={{ fontSize: '15px', fontStyle: 'italic', color: 'white', marginTop: '12px' }}>"{log.mantra}"</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'library' && (
        <>
          <div style={{ maxWidth: '400px', margin: '0 auto 60px auto' }}>
            <input 
              type="text" 
              placeholder="Seek an intent..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', background: 'transparent', borderBottom: '1px solid #1e293b', borderTop: 'none', borderLeft: 'none', borderRight: 'none', padding: '20px', color: 'white', outline: 'none', textAlign: 'center' }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '25px', marginBottom: '50px' }}>
            {['Crystal', 'Herb', 'Pantry', 'Colour'].map(type => (
              <button key={type} onClick={() => setSubFilter(type)} style={{ background: 'none', color: subFilter === type ? '#34d399' : '#1e293b', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '3px' }}>{type}</button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '30px', maxWidth: '1000px', margin: '0 auto', paddingBottom: '200px' }}>
            {filteredData.map(item => (
              <div key={item.id} onClick={() => {
                playChime('soft');
                if (selectedItems.find(s => s.id === item.id)) setSelectedItems(selectedItems.filter(i => i.id !== item.id));
                else if (selectedItems.length < 4) setSelectedItems([...selectedItems, item]);
              }} style={{ background: selectedItems.find(s => s.id === item.id) ? '#064e3b08' : '#040a08', border: selectedItems.find(s => s.id === item.id) ? '1px solid #10b981' : '1px solid #0a0a0a', padding: '45px 25px', borderRadius: '4px', textAlign: 'center', cursor: 'pointer' }}>
                <div style={{ fontSize: '32px', marginBottom: '20px', opacity: selectedItems.find(s => s.id === item.id) ? 1 : 0.3 }}>{item.icon}</div>
                <div style={{ color: 'white', fontSize: '15px', fontStyle: 'italic' }}>{item.name}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'tarot' && (
        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
          {!tarot ? (
            <div onClick={drawTarot} style={{ width: '220px', height: '320px', border: '1px solid #065f46', borderRadius: '4px', margin: '0 auto', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'repeating-linear-gradient(45deg, #020806, #020806 8px, #030a08 8px, #030a08 16px)' }}>
               <div style={{ color: '#065f46', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '8px', transform: 'rotate(-90deg)' }}>Consign to Fate</div>
            </div>
          ) : (
            <div style={{ maxWidth: '350px', margin: '0 auto' }}>
              <div style={{ fontSize: '100px', marginBottom: '30px', transform: tarot.reversed ? 'rotate(180deg)' : 'none', transition: '1.2s' }}>{tarot.icon}</div>
              <h3 style={{ color: 'white', fontSize: '2rem', fontStyle: 'italic' }}>{tarot.name} {tarot.reversed && <span style={{ color: '#065f46', fontSize: '14px' }}>(Shadow)</span>}</h3>
              <p style={{ color: '#065f46', fontSize: '14px', lineHeight: '2', fontStyle: 'italic', marginTop: '20px' }}>{tarot.meaning}</p>
              <button onClick={() => setTarot(null)} style={{ marginTop: '50px', background: 'none', border: 'none', color: '#1e293b', fontSize: '10px', textTransform: 'uppercase', cursor: 'pointer', letterSpacing: '3px' }}>Return to silence</button>
            </div>
          )}
        </div>
      )}

      {ritualOutput && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: '#020806', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ maxWidth: '550px', width: '100%', padding: '40px' }}>
             <h2 style={{ color: 'white', fontStyle: 'italic', fontSize: '2.8rem', textAlign: 'center', marginBottom: '50px' }}>The Working</h2>
             <div style={{ textAlign: 'left', marginBottom: '60px', borderLeft: '1px solid #10b981', paddingLeft: '35px' }}>
                {ritualOutput.map((step, i) => (
                  <p key={i} style={{ fontSize: '16px', marginBottom: '25px', color: '#cbd5e1', lineHeight: '1.8' }}>{step}</p>
                ))}
             </div>
             <button onClick={sealRitual} style={{ background: 'white', color: 'black', border: 'none', padding: '25px', width: '100%', fontWeight: '900', textTransform: 'uppercase', fontSize: '11px', cursor: 'pointer', letterSpacing: '5px' }}>Seal into Grimoire</button>
          </div>
        </div>
      )}

      {selectedItems.length > 0 && !ritualOutput && (
        <div style={{ position: 'fixed', bottom: '40px', left: '50%', transform: 'translateX(-50%)', width: '90%', maxWidth: '600px', backgroundColor: 'rgba(0,0,0,0.95)', border: '1px solid #111', padding: '35px', textAlign: 'center', zIndex: 100 }}>
          <p style={{ color: '#10b981', fontSize: '16px', fontStyle: 'italic', marginBottom: '25px', lineHeight: '1.6' }}>"{weaveMantra}"</p>
          <button onClick={() => setRitualOutput([
            "Observe the weight of your chosen materia.",
            `Quiet your pulse and align with ${selectedItems[0].name}.`,
            tarot ? `Acknowledge the influence of ${tarot.name} upon this fate.` : "Hold the vision with absolute clarity.",
            `Speak the weave: "${weaveMantra}"`,
            "The intent is sealed. Step away from the ritual space."
          ])} style={{ background: '#10b981', color: 'black', border: 'none', padding: '15px 40px', fontWeight: '900', textTransform: 'uppercase', fontSize: '11px', cursor: 'pointer', letterSpacing: '3px' }}>Begin Ceremony</button>
        </div>
      )}
    </div>
  );
}