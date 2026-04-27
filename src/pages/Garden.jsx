import React, { useState, useMemo } from 'react';

// --- THE MASTER DATABASE (85 ITEMS) ---
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
  { id: 'c16', name: 'Hematite', type: 'Crystal', property: 'Grounding', icon: '🪨', tags: ['anxiety', 'shield', 'grounding'] },
  { id: 'c23', name: 'Howlite', type: 'Crystal', property: 'Patience', icon: '☁️', tags: ['sleep', 'anger', 'patience'] },
  { id: 'c7', name: 'Labradorite', type: 'Crystal', property: 'Magic', icon: '🌌', tags: ['psychic', 'change', 'magic'] },
  { id: 'c9', name: 'Lapis Lazuli', type: 'Crystal', property: 'Truth', icon: '👁️', tags: ['wisdom', 'voice', 'truth'] },
  { id: 'c21', name: 'Lepidolite', type: 'Crystal', property: 'Calm', icon: '🌬️', tags: ['anxiety', 'transition', 'calm'] },
  { id: 'c17', name: 'Malachite', type: 'Crystal', property: 'Change', icon: '🐍', tags: ['transformation', 'heart', 'change'] },
  { id: 'c1', name: 'Moonstone', type: 'Crystal', property: 'Intuition', icon: '🌙', tags: ['psychic', 'dreams', 'intuition'] },
  { id: 'c11', name: 'Pyrite', type: 'Crystal', property: 'Luck', icon: '🪙', tags: ['money', 'protection', 'luck'] },
  { id: 'c18', name: 'Red Jasper', type: 'Crystal', property: 'Vitality', icon: '🔋', tags: ['strength', 'stamina', 'vitality'] },
  { id: 'c4', name: 'Rose Quartz', type: 'Crystal', property: 'Love', icon: '💖', tags: ['romance', 'healing', 'love'] },
  { id: 'c5', name: 'Selenite', type: 'Crystal', property: 'Cleansing', icon: '🕊️', tags: ['purify', 'charging', 'cleansing'] },
  { id: 'c20', name: 'Smoky Quartz', type: 'Crystal', property: 'Release', icon: '💨', tags: ['detox', 'negativity', 'release'] },
  { id: 'c19', name: 'Sodalite', type: 'Crystal', property: 'Logic', icon: '🧠', tags: ['calm', 'intelligence', 'logic'] },
  { id: 'c8', name: 'Tiger Eye', type: 'Crystal', property: 'Courage', icon: '🐯', tags: ['confidence', 'luck', 'courage'] },
  { id: 'c24', name: 'Unakite', type: 'Crystal', property: 'Balance', icon: '⚖️', tags: ['rebirth', 'healing', 'balance'] },

  // HERBS
  { id: 'h7', name: 'Basil', type: 'Herb', property: 'Luck', icon: '🌿', tags: ['money', 'prosperity', 'luck'] },
  { id: 'h4', name: 'Bay Leaf', type: 'Herb', property: 'Manifest', icon: '🍂', tags: ['wishes', 'money', 'manifest'] },
  { id: 'h22', name: 'Calendula', type: 'Herb', property: 'Sun-Light', icon: '🌼', tags: ['joy', 'legal', 'sun'] },
  { id: 'h23', name: 'Catnip', type: 'Herb', property: 'Fascination', icon: '🐱', tags: ['love', 'beauty', 'fascination'] },
  { id: 'h6', name: 'Chamomile', type: 'Herb', property: 'Calm', icon: '🌼', tags: ['anxiety', 'sleep', 'calm'] },
  { id: 'h10', name: 'Cinnamon', type: 'Herb', property: 'Speed', icon: '🪵', tags: ['success', 'fast', 'speed'] },
  { id: 'h24', name: 'Comfrey', type: 'Herb', property: 'Safety', icon: '🩹', tags: ['travel', 'healing', 'safety'] },
  { id: 'h11', name: 'Dandelion', type: 'Herb', property: 'Growth', icon: '🌻', tags: ['wishes', 'healing', 'growth'] },
  { id: 'h19', name: 'Elderberry', type: 'Herb', property: 'Fates', icon: '🫐', tags: ['health', 'ancestors'] },
  { id: 'h12', name: 'Eucalyptus', type: 'Herb', property: 'Healing', icon: '🌿', tags: ['health', 'breath', 'healing'] },
  { id: 'h17', name: 'Hibiscus', type: 'Herb', property: 'Passion', icon: '🌺', tags: ['love', 'lust', 'passion'] },
  { id: 'h13', name: 'Jasmine', type: 'Herb', property: 'Dreams', icon: '🌸', tags: ['love', 'prophetic', 'dreams'] },
  { id: 'h1', name: 'Lavender', type: 'Herb', property: 'Peace', icon: '🌿', tags: ['sleep', 'calm', 'peace'] },
  { id: 'h15', name: 'Mistletoe', type: 'Herb', property: 'Protection', icon: '🌿', tags: ['luck', 'safety', 'protection'] },
  { id: 'h2', name: 'Mugwort', type: 'Herb', property: 'Vision', icon: '🌙', tags: ['dreams', 'psychic', 'vision'] },
  { id: 'h16', name: 'Nettle', type: 'Herb', property: 'Defense', icon: '🧤', tags: ['protection', 'strength', 'defense'] },
  { id: 'h14', name: 'Patchouli', type: 'Herb', property: 'Grounding', icon: '🪴', tags: ['money', 'lust', 'grounding'] },
  { id: 'h5', name: 'Peppermint', type: 'Herb', property: 'Energy', icon: '🌱', tags: ['vitality', 'clear', 'energy'] },
  { id: 'h3', name: 'Rosemary', type: 'Herb', property: 'Memory', icon: '🍃', tags: ['focus', 'protection', 'memory'] },
  { id: 'h9', name: 'Sage', type: 'Herb', property: 'Cleanse', icon: '🌬️', tags: ['purify', 'wisdom', 'cleanse'] },
  { id: 'h8', name: 'Thyme', type: 'Herb', property: 'Bravery', icon: '🪴', tags: ['courage', 'health', 'bravery'] },
  { id: 'h18', name: 'Valerian', type: 'Herb', property: 'Deep Sleep', icon: '💤', tags: ['calm', 'rest', 'sleep'] },
  { id: 'h21', name: 'Vervain', type: 'Herb', property: 'Enchant', icon: '✨', tags: ['magic', 'power', 'enchant'] },
  { id: 'h25', name: 'Witch Hazel', type: 'Herb', property: 'Mend', icon: '🪄', tags: ['healing', 'broken heart'] },
  { id: 'h20', name: 'Yarrow', type: 'Herb', property: 'Boundary', icon: '🛡️', tags: ['courage', 'safety', 'boundary'] },

  // PANTRY
  { id: 'k18', name: 'Allspice', type: 'Pantry', property: 'Drive', icon: '🪵', tags: ['success', 'energy', 'drive'] },
  { id: 'k16', name: 'Bayberry', type: 'Pantry', property: 'Gold', icon: '🕯️', tags: ['money', 'wealth', 'gold'] },
  { id: 'k4', name: 'Black Pepper', type: 'Pantry', property: 'Banish', icon: '🌑', tags: ['protection', 'exit', 'banish'] },
  { id: 'k24', name: 'Cinnamon Stick', type: 'Pantry', property: 'Fast Luck', icon: '🪵', tags: ['money', 'speed', 'luck'] },
  { id: 'k11', name: 'Clove', type: 'Pantry', property: 'Silence', icon: '🍢', tags: ['anti-gossip', 'luck', 'silence'] },
  { id: 'k3', name: 'Coffee', type: 'Pantry', property: 'Haste', icon: '☕', tags: ['energy', 'focus', 'haste'] },
  { id: 'k10', name: 'Egg Shell', type: 'Pantry', property: 'Wall', icon: '🥚', tags: ['boundaries', 'protection'] },
  { id: 'k25', name: 'Flour', type: 'Pantry', property: 'Home', icon: '🍞', tags: ['stability', 'foundation', 'home'] },
  { id: 'k8', name: 'Garlic', type: 'Pantry', property: 'Warding', icon: '🧄', tags: ['health', 'protection', 'warding'] },
  { id: 'k13', name: 'Ginger', type: 'Pantry', property: 'Heat', icon: '🫚', tags: ['passion', 'speed', 'heat'] },
  { id: 'k2', name: 'Honey', type: 'Pantry', property: 'Sweetness', icon: '🍯', tags: ['love', 'friendship', 'sweetness'] },
  { id: 'k21', name: 'Lemon Peel', type: 'Pantry', property: 'Clean', icon: '🍋', tags: ['purify', 'love', 'clean'] },
  { id: 'k19', name: 'Mustard', type: 'Pantry', property: 'Faith', icon: '🟡', tags: ['protection', 'mental', 'faith'] },
  { id: 'k14', name: 'Nutmeg', type: 'Pantry', property: 'Coin', icon: '🌰', tags: ['money', 'gambling'] },
  { id: 'k17', name: 'Olive Oil', type: 'Pantry', property: 'Bless', icon: '🫒', tags: ['anointing', 'peace', 'bless'] },
  { id: 'k9', name: 'Onion Skin', type: 'Pantry', property: 'Layers', icon: '🧅', tags: ['healing', 'protection', 'layers'] },
  { id: 'k20', name: 'Orange Peel', type: 'Pantry', property: 'Joy', icon: '🍊', tags: ['luck', 'money', 'joy'] },
  { id: 'k23', name: 'Peppercorn', type: 'Pantry', property: 'Banish', icon: '🌑', tags: ['protection', 'fire', 'banish'] },
  { id: 'k5', name: 'Rice', type: 'Pantry', property: 'Abundance', icon: '🍚', tags: ['money', 'fertility', 'abundance'] },
  { id: 'k1', name: 'Sea Salt', type: 'Pantry', property: 'Shield', icon: '🧂', tags: ['protection', 'cleansing', 'shield'] },
  { id: 'k12', name: 'Star Anise', type: 'Pantry', property: 'Luck', icon: '🌟', tags: ['psychic', 'fortune', 'luck'] },
  { id: 'k6', name: 'Sugar', type: 'Pantry', property: 'Magnet', icon: '🍬', tags: ['love', 'attraction', 'magnet'] },
  { id: 'k15', name: 'Tea Leaves', type: 'Pantry', property: 'Fate', icon: '🍵', tags: ['future', 'divination', 'fate'] },
  { id: 'k22', name: 'Vanilla', type: 'Pantry', property: 'Lust', icon: '🍦', tags: ['love', 'mental', 'lust'] },
  { id: 'k7', name: 'Vinegar', type: 'Pantry', property: 'Break', icon: '🧪', tags: ['banishing', 'cleansing', 'break'] },

  // COLOURS
  { id: 'ca2', name: 'Black', type: 'Colour', property: 'Banishing', icon: '🖤', tags: ['protection', 'binding', 'banishing'] },
  { id: 'ca5', name: 'Blue', type: 'Colour', property: 'Tranquility', icon: '💙', tags: ['peace', 'forgiveness', 'tranquility'] },
  { id: 'ca10', name: 'Brown', type: 'Colour', property: 'Grounding', icon: '🤎', tags: ['home', 'stability', 'grounding'] },
  { id: 'ca4', name: 'Green', type: 'Colour', property: 'Growth', icon: '💚', tags: ['money', 'fertility', 'growth'] },
  { id: 'ca8', name: 'Orange', type: 'Colour', property: 'Road Opening', icon: '🧡', tags: ['success', 'creativity'] },
  { id: 'ca9', name: 'Pink', type: 'Colour', property: 'Self-Love', icon: '💖', tags: ['romance', 'friendship', 'love'] },
  { id: 'ca7', name: 'Purple', type: 'Colour', property: 'Psychic Power', icon: '💜', tags: ['ambition', 'wisdom'] },
  { id: 'ca3', name: 'Red', type: 'Colour', property: 'Passion', icon: '❤️', tags: ['strength', 'vitality', 'passion'] },
  { id: 'ca1', name: 'White', type: 'Colour', property: 'Purity', icon: '🤍', tags: ['universal', 'cleansing', 'purity'] },
  { id: 'ca6', name: 'Yellow', type: 'Colour', property: 'Intelligence', icon: '💛', tags: ['clarity', 'confidence', 'intelligence'] }
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

  // LOGIC: POETIC WEAVER (Professional Incantation Builder)
  const incantation = useMemo(() => {
    if (selectedItems.length === 0) return "Assemble your materia...";
    
    const materia = selectedItems.map(i => i.name);
    const intent = selectedItems[0]?.property.toLowerCase(); // Lead with the first selected property
    
    // Ritual templates for a more "haute" feel
    const templates = [
      `I weave the essence of ${materia.join(", ")} to manifest ${intent}.`,
      `By the power of ${materia[0]} and the spirit of ${materia[1] || 'the earth'}, I call forth ${intent}.`,
      `${materia.join(" + ")}: A working for ${intent} and sacred alignment.`,
      `Invoking the deep resonance of ${materia.join(" and ")} to seal this intent.`
    ];

    // Pick a template based on number of items for variety
    if (selectedItems.length === 1) return `Focusing intent through ${materia[0]}...`;
    if (selectedItems.length === 2) return `Binding ${materia[0]} with ${materia[1]} for ${intent}.`;
    return templates[selectedItems.length - 1];
  }, [selectedItems]);

  const startRitual = () => {
    const steps = [
      "Center your breath and clear your ritual space.",
      ...selectedItems.map(item => `Acknowledge the ${item.property} within your ${item.name}.`),
      `Speak the Weaver's bond: "${incantation}"`,
      "Visualize your intention as a completed reality.",
      "The working is sealed. So mote it be."
    ];
    setRitualOutput(steps);
  };

  const toggleItem = (item) => {
    if (selectedItems.find(i => i.id === item.id)) {
      setSelectedItems(selectedItems.filter(i => i.id !== item.id));
    } else if (selectedItems.length < 4) {
      setSelectedItems([...selectedItems, item]);
    }
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
        <h1 style={{ color: 'white', fontSize: '2.2rem', fontStyle: 'italic', marginBottom: '10px', letterSpacing: '-1px' }}>Selene Garden</h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '25px' }}>
          {['moon', 'library', 'tarot'].map(tab => (
             <button key={tab} onClick={() => { setActiveTab(tab); setRitualOutput(null); }} style={{ background: 'none', border: 'none', color: activeTab === tab ? '#10b981' : '#1e293b', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '3px', cursor: 'pointer', fontWeight: '900', transition: '0.3s' }}>{tab}</button>
          ))}
        </div>
      </header>

      {activeTab === 'moon' && (
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <div style={{ fontSize: '100px', marginBottom: '30px', filter: 'drop-shadow(0 0 20px rgba(16,185,129,0.2))' }}>🌖</div>
          <h2 style={{ color: 'white', fontSize: '2.4rem', fontStyle: 'italic', fontWeight: '200' }}>Waning Gibbous</h2>
          <div style={{ height: '1px', width: '60px', background: '#065f46', margin: '20px auto' }}></div>
          <p style={{ color: '#065f46', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '5px' }}>The Season of Release</p>
        </div>
      )}

      {activeTab === 'library' && (
        <>
          <div style={{ maxWidth: '500px', margin: '0 auto 40px auto' }}>
            <input 
              type="text" 
              placeholder="Search intent or materia..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', background: 'transparent', borderBottom: '1px solid #1e293b', borderTop: 'none', borderLeft: 'none', borderRight: 'none', padding: '15px', color: 'white', outline: 'none', fontSize: '14px', textAlign: 'center', fontStyle: 'italic' }}
            />
          </div>
          <nav style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '40px' }}>
            {['Crystal', 'Herb', 'Pantry', 'Colour'].map(type => (
              <button key={type} onClick={() => setSubFilter(type)} style={{ background: 'none', color: subFilter === type ? '#34d399' : '#475569', border: 'none', padding: '5px 10px', cursor: 'pointer', fontWeight: 'bold', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px' }}>{type}</button>
            ))}
          </nav>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '20px', maxWidth: '1000px', margin: '0 auto', paddingBottom: '150px' }}>
            {filteredData.map(item => (
              <div key={item.id} onClick={() => toggleItem(item)} style={{ background: selectedItems.find(s => s.id === item.id) ? '#064e3b11' : '#040a08', border: selectedItems.find(s => s.id === item.id) ? '1px solid #10b981' : '1px solid #111', padding: '30px 20px', borderRadius: '40px', textAlign: 'center', cursor: 'pointer', transition: '0.4s' }}>
                <div style={{ fontSize: '28px', marginBottom: '15px', opacity: selectedItems.find(s => s.id === item.id) ? 1 : 0.6 }}>{item.icon}</div>
                <div style={{ color: 'white', fontSize: '15px', fontStyle: 'italic', marginBottom: '4px' }}>{item.name}</div>
                <div style={{ fontSize: '9px', color: '#065f46', textTransform: 'uppercase', letterSpacing: '1px' }}>{item.property}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'tarot' && (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          {!tarot ? (
            <div onClick={() => setTarot(TAROT_CARDS[Math.floor(Math.random() * TAROT_CARDS.length)])} style={{ width: '200px', height: '300px', border: '2px solid #065f46', borderRadius: '15px', margin: '0 auto', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'repeating-linear-gradient(45deg, #020806, #020806 10px, #050c09 10px, #050c09 20px)' }}>
              <span style={{ color: '#065f46', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '3px' }}>Draw Card</span>
            </div>
          ) : (
            <div style={{ background: '#050c09', padding: '50px 30px', borderRadius: '20px', border: '1px solid #1e293b', maxWidth: '350px', margin: '0 auto' }}>
              <div style={{ fontSize: '60px', marginBottom: '25px' }}>{tarot.icon}</div>
              <h3 style={{ color: 'white', fontSize: '1.8rem', fontStyle: 'italic', marginBottom: '15px' }}>{tarot.name}</h3>
              <p style={{ color: '#065f46', fontSize: '14px', lineHeight: '1.8', fontStyle: 'italic' }}>{tarot.meaning}</p>
              <button onClick={() => setTarot(null)} style={{ marginTop: '30px', background: 'none', border: 'none', color: '#1e293b', fontSize: '10px', textTransform: 'uppercase', cursor: 'pointer', letterSpacing: '2px' }}>Return to Deck</button>
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
                  <p key={i} style={{ fontSize: '14px', marginBottom: '15px', color: '#cbd5e1', lineHeight: '1.6' }}><span style={{ color: '#10b981', fontWeight: 'bold' }}>{i + 1}.</span> {step}</p>
                ))}
             </div>
             <button onClick={() => { setRitualOutput(null); setSelectedItems([]); }} style={{ background: 'white', color: 'black', border: 'none', padding: '18px 40px', borderRadius: '2px', fontWeight: '900', textTransform: 'uppercase', fontSize: '11px', cursor: 'pointer', letterSpacing: '3px' }}>Complete Working</button>
          </div>
        </div>
      )}

      {selectedItems.length > 0 && !ritualOutput && (
        <div style={{ position: 'fixed', bottom: '40px', left: '50%', transform: 'translateX(-50%)', width: '90%', maxWidth: '500px', backgroundColor: 'black', border: '1px solid #111', padding: '25px', borderRadius: '20px', textAlign: 'center', zIndex: 100 }}>
          <p style={{ color: 'white', fontSize: '14px', fontStyle: 'italic', marginBottom: '15px', letterSpacing: '0.5px' }}>"{incantation}"</p>
          <button onClick={startRitual} style={{ background: '#10b981', color: 'black', border: 'none', padding: '10px 25px', borderRadius: '50px', fontWeight: 'black', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px', cursor: 'pointer' }}>Begin Ritual</button>
        </div>
      )}
    </div>
  );
}