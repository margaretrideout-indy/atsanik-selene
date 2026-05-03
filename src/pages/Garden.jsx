import React, { useState, useEffect, useMemo } from 'react';

// --- THE FULL MASTER DATABASE (85 ITEMS) ---
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

// --- PROPERTY GLOW COLOURS ---
const PROPERTY_GLOW = {
  Love: '#ff6b8a', Peace: '#7dd3fc', Calm: '#a5f3fc', Intuition: '#c4b5fd',
  Wealth: '#fde68a', Luck: '#86efac', Magic: '#e879f9', Truth: '#60a5fa',
  Courage: '#fb923c', Creativity: '#f97316', Focus: '#38bdf8', Protection: '#6ee7b7',
  Shield: '#34d399', Cleansing: '#f0f9ff', Grounding: '#a78bfa', Change: '#4ade80',
  Vitality: '#f87171', Release: '#94a3b8', Logic: '#93c5fd', Balance: '#86efac',
  Amplify: '#e2e8f0', Hope: '#67e8f9', Flow: '#38bdf8', Shadow: '#6b7280',
  Patience: '#d1fae5', Opportunity: '#4ade80', Manifest: '#fcd34d', Vision: '#c084fc',
  Dreams: '#f9a8d4', Passion: '#ef4444', Energy: '#22c55e', Memory: '#a3e635',
  Cleanse: '#34d399', Speed: '#facc15', Healing: '#2dd4bf', Bravery: '#fb923c',
  Enchant: '#d946ef', Boundary: '#14b8a6', Banish: '#64748b', Haste: '#f59e0b',
  Sweetness: '#f9a8d4', Abundance: '#fbbf24', Bless: '#fde68a', Joy: '#fb923c',
  Coin: '#fcd34d', Fate: '#a78bfa', Lust: '#f43f5e', Gold: '#eab308',
};

// --- TAROT DATABASE WITH TEMPORAL MEANINGS ---
const TAROT_CARDS = [
  {
    name: 'The Magician', icon: '🪄',
    past: { meaning: 'A time of raw potential was seized and transformed into will.', fateLine: 'The Magician reminds you: you have already wielded great power.' },
    present: { meaning: 'The bridge between intent and reality stands open before you.', fateLine: 'The Magician grants mastery over these elements, here and now.' },
    future: { meaning: 'A convergence of skill and desire will bring manifestation.', fateLine: 'The Magician promises that mastery of your craft lies ahead.' }
  },
  {
    name: 'The High Priestess', icon: '🌙',
    past: { meaning: 'A secret was kept, a knowing held deep beneath the surface.', fateLine: 'The High Priestess guarded this truth in an earlier time.' },
    present: { meaning: 'Sacred silence and deep inner knowing surround this moment.', fateLine: 'The High Priestess veils this intent in sacred silence.' },
    future: { meaning: 'What is hidden will be revealed only to those who wait with patience.', fateLine: 'The High Priestess will unveil the mystery in its own season.' }
  },
  {
    name: 'The Empress', icon: '🌿',
    past: { meaning: 'Nourishment and creative abundance shaped the seeds of who you are.', fateLine: 'The Empress tended the roots of this desire long ago.' },
    present: { meaning: 'Creative abundance and fertile growth surround this working.', fateLine: 'The Empress breathes life into this nascent growth.' },
    future: { meaning: 'A season of flourishing and embodied richness is drawing near.', fateLine: 'The Empress promises a harvest of all you have cultivated.' }
  },
  {
    name: 'The Star', icon: '✨',
    past: { meaning: 'After a great unravelling, hope was quietly rekindled within you.', fateLine: 'The Star was the light that led you out of an old darkness.' },
    present: { meaning: 'Spiritual clarity and renewed faith illuminate this working.', fateLine: 'The Star illuminates the path for this working.' },
    future: { meaning: 'Clarity and calm restoration await beyond the current storm.', fateLine: 'The Star will guide this intent to its most luminous outcome.' }
  },
  {
    name: 'The Moon', icon: '🌑',
    past: { meaning: 'Illusion and deep subconscious currents shaped the path you walked.', fateLine: 'The Moon was behind the veil of confusion you have since passed through.' },
    present: { meaning: 'Wild intuition and the face of the subconscious are active now.', fateLine: 'The Moon reveals the hidden truth of this desire.' },
    future: { meaning: 'The unconscious will surface; trust feeling over fact.', fateLine: 'The Moon will draw the unseen into the light of the next cycle.' }
  },
  {
    name: 'The Hermit', icon: '🕯️',
    past: { meaning: 'A period of solitude and inward searching forged your wisdom.', fateLine: 'The Hermit walked with you through the long silence of becoming.' },
    present: { meaning: 'Inner guidance and stillness are the most powerful tools available.', fateLine: 'The Hermit lights the way from within this very moment.' },
    future: { meaning: 'A season of retreat and deep listening will bring great clarity.', fateLine: 'The Hermit will guide you inward before the next threshold opens.' }
  },
  {
    name: 'Wheel of Fortune', icon: '🎡',
    past: { meaning: 'A great turning brought you to where you stand today.', fateLine: 'The Wheel has already spun this fate into motion.' },
    present: { meaning: 'Change is in motion; cycles are turning in your favour.', fateLine: 'The Wheel of Fortune turns this working toward its destined outcome.' },
    future: { meaning: 'A pivotal shift in circumstance is approaching on the horizon.', fateLine: 'The Wheel promises a significant turn of events.' }
  },
  {
    name: 'The World', icon: '🌍',
    past: { meaning: 'A great cycle reached its completion, leaving you whole.', fateLine: 'The World marked the end of a journey you have already walked.' },
    present: { meaning: 'Integration, wholeness, and completion are available right now.', fateLine: 'The World declares this working already whole and complete.' },
    future: { meaning: 'Full achievement and the joy of completion await at this path\'s end.', fateLine: 'The World promises fulfilment beyond what you dare to imagine.' }
  }
];

export default function Garden() {
  const [activeTab, setActiveTab] = useState('moon');
  const [subFilter, setSubFilter] = useState('Crystal');
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [tarot, setTarot] = useState(null);
  const [ritualOutput, setRitualOutput] = useState(null);
  const [archives, setArchives] = useState([]);
  const [isShaking, setIsShaking] = useState(false);
  const [grimoireSearch, setGrimoireSearch] = useState("");

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

  // --- NARRATIVE WEAVER ---
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
    
    story += `this working for ${intent} is now bound. The Atsanik dance above as the work is witnessed. `;

    if (tarot && tarot.length === 3) {
      tarot.forEach(card => {
        const temporal = card[card.position];
        story += card.reversed
          ? `In the ${card.position}, ${card.name} reversed warns: shadow and obstruction linger. `
          : `In the ${card.position}, ${temporal.fateLine} `;
      });
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
    const shuffled = [...TAROT_CARDS].sort(() => Math.random() - 0.5);
    const three = shuffled.slice(0, 3).map((card, i) => ({
      ...card,
      position: ['past', 'present', 'future'][i],
      reversed: Math.random() > 0.8,
    }));
    setTarot(three);
  };

  const drawWithVibe = () => {
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
      drawTarot();
    }, 400);
  };

  // --- DOMINANT NOTE (Apothecary) ---
  const dominantNote = useMemo(() => {
    if (selectedItems.length === 0) return null;
    const freq = {};
    selectedItems.forEach(item => {
      item.tags?.forEach(tag => { freq[tag] = (freq[tag] || 0) + 1; });
    });
    return Object.entries(freq).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;
  }, [selectedItems]);

  const filteredData = MASTER_DATA.filter(item => {
    const matchesTab = item.type === subFilter;
    const matchesSearch = searchQuery === "" || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags?.some(tag => tag.includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  return (
    <div style={{ backgroundColor: '#0a0a2e', minHeight: '100vh', color: '#cbd5e1', padding: '20px', fontFamily: 'serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px', paddingTop: '20px' }}>
        <h1 style={{ color: 'white', fontSize: '2.4rem', fontStyle: 'italic', letterSpacing: '-1.5px' }}>Atsanik Selene</h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '35px', marginTop: '15px' }}>
          {['moon', 'library', 'tarot', 'stillroom', 'grimoire'].map(tab => (
             <button key={tab} onClick={() => setActiveTab(tab)} style={{ background: 'none', border: 'none', color: activeTab === tab ? '#d8b4fe' : '#334155', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '5px', cursor: 'pointer', fontWeight: '900', boxShadow: activeTab === tab ? '0 0 12px 2px #a855f740' : 'none', borderRadius: '2px', padding: '2px 4px', transition: 'all 0.3s' }}>{tab}</button>
          ))}
        </div>
      </header>

      {activeTab === 'moon' && (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: '120px', marginBottom: '25px' }}>🌖</div>
            <h2 style={{ color: 'white', fontSize: '2.2rem', fontStyle: 'italic', fontWeight: '100' }}>Waning Gibbous</h2>
            <p style={{ color: '#7c3aed', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '6px' }}>Illumination 64%</p>
          </div>
          <div>
            <h3 style={{ fontSize: '10px', textTransform: 'uppercase', color: '#4c1d95', letterSpacing: '4px', borderBottom: '1px solid #1e1b4b', paddingBottom: '15px' }}>The Atsanik Chronicles</h3>
            <p style={{ fontSize: '12px', color: '#475569', fontStyle: 'italic', marginTop: '30px', textAlign: 'center' }}>
              {archives.length === 0 ? 'History is waiting to be written.' : `${archives.length} ritual${archives.length > 1 ? 's' : ''} sealed.`}
            </p>
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
              style={{ width: '100%', background: 'transparent', borderBottom: '1px solid #701a75', borderTop: 'none', borderLeft: 'none', borderRight: 'none', padding: '20px', color: 'white', outline: 'none', textAlign: 'center', fontStyle: 'italic', transition: 'border-color 0.3s, box-shadow 0.3s' }}
            onFocus={e => { e.currentTarget.style.borderBottomColor = '#a855f7'; e.currentTarget.style.boxShadow = '0 4px 12px -4px #a855f780'; }}
            onBlur={e => { e.currentTarget.style.borderBottomColor = '#701a75'; e.currentTarget.style.boxShadow = 'none'; }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '25px', marginBottom: '50px' }}>
            {['Crystal', 'Herb', 'Pantry', 'Colour'].map(type => (
              <button key={type} onClick={() => setSubFilter(type)} style={{ background: 'none', color: subFilter === type ? '#d8b4fe' : '#334155', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '3px' }}>{type}</button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', maxWidth: '1000px', margin: '0 auto', paddingBottom: '200px' }}>
            {filteredData.map(item => {
              const isSelected = !!selectedItems.find(s => s.id === item.id);
              const glowColor = PROPERTY_GLOW[item.property] || '#10b981';
              return (
              <div key={item.id} onClick={() => {
                playChime('soft');
                if (isSelected) setSelectedItems(selectedItems.filter(i => i.id !== item.id));
                else if (selectedItems.length < 4) setSelectedItems([...selectedItems, item]);
              }} style={{ background: isSelected ? '#064e3b08' : '#040a08', border: isSelected ? `1px solid ${glowColor}55` : '1px solid #0a0a0a', padding: '45px 25px', borderRadius: '4px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s', boxShadow: isSelected ? `0 0 18px 2px ${glowColor}22, 0 0 4px 1px ${glowColor}44` : 'none' }}
                onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
                onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                onTouchStart={e => e.currentTarget.style.transform = 'scale(0.98)'}
                onTouchEnd={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div style={{ fontSize: '32px', marginBottom: '20px', opacity: isSelected ? 1 : 0.3 }}>{item.icon}</div>
                <div style={{ color: 'white', fontSize: '15px', fontStyle: 'italic' }}>{item.name}</div>
                <div style={{ fontSize: '8px', color: '#a78bfa', textTransform: 'uppercase', marginTop: '8px' }}>{item.property}</div>
              </div>
            );})}
          </div>
        </>
      )}

      {activeTab === 'tarot' && (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          {!tarot ? (
            <div onClick={drawWithVibe} style={{ width: '220px', height: '320px', border: '1px solid #701a75', borderRadius: '4px', margin: '0 auto', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'repeating-linear-gradient(45deg, #08082a, #08082a 8px, #0d0d35 8px, #0d0d35 16px)', transform: isShaking ? 'translateX(2px)' : 'none', transition: 'transform 0.05s', boxShadow: '0 0 20px 2px #a855f720' }}>
               <div style={{ color: '#a78bfa', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '8px', transform: 'rotate(-90deg)' }}>Consign to Fate</div>
            </div>
          ) : (
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <div className="tarot-spread" style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '50px' }}>
                {tarot.map(card => {
                  const temporal = card[card.position];
                  return (
                    <div key={card.position} style={{ flex: '1 1 180px', maxWidth: '220px', border: '1px solid #4c1d95', borderRadius: '4px', padding: '35px 20px', background: '#0d0d35', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                      <p style={{ fontSize: '8px', color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '5px', margin: 0 }}>{card.position}</p>
                      <div style={{ fontSize: '64px', transform: card.reversed ? 'rotate(180deg)' : 'none', transition: '1s' }}>{card.icon}</div>
                      <h3 style={{ color: 'white', fontSize: '1.1rem', fontStyle: 'italic', margin: 0 }}>
                        {card.name}
                        {card.reversed && <span style={{ color: '#c084fc', fontSize: '11px', display: 'block', marginTop: '4px' }}>Shadow</span>}
                      </h3>
                      <p style={{ color: '#94a3b8', fontSize: '12px', lineHeight: '1.8', fontStyle: 'italic', margin: 0 }}>
                        {card.reversed ? 'Obstruction and shadow veil this time.' : temporal.meaning}
                      </p>
                    </div>
                  );
                })}
              </div>
              <button onClick={() => setTarot(null)} style={{ background: 'none', border: 'none', color: '#1e293b', fontSize: '10px', textTransform: 'uppercase', cursor: 'pointer', letterSpacing: '3px' }}>Return to silence</button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'grimoire' && (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
          <h2 style={{ background: 'linear-gradient(135deg, #d8b4fe, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontSize: '2rem', fontStyle: 'italic', textAlign: 'center', marginBottom: '8px' }}>The Grimoire</h2>
          <p style={{ background: 'linear-gradient(135deg, #a855f7, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '5px', textAlign: 'center', marginBottom: '40px' }}>Sealed Workings</p>

          <input
            type="text"
            placeholder="Search the workings..."
            value={grimoireSearch}
            onChange={e => setGrimoireSearch(e.target.value)}
            style={{ width: '100%', background: 'transparent', borderBottom: '1px solid #701a75', borderTop: 'none', borderLeft: 'none', borderRight: 'none', padding: '16px', color: 'white', outline: 'none', textAlign: 'center', fontStyle: 'italic', marginBottom: '40px', boxSizing: 'border-box', transition: 'border-color 0.3s, box-shadow 0.3s' }}
            onFocus={e => { e.currentTarget.style.borderBottomColor = '#a855f7'; e.currentTarget.style.boxShadow = '0 4px 12px -4px #a855f780'; }}
            onBlur={e => { e.currentTarget.style.borderBottomColor = '#701a75'; e.currentTarget.style.boxShadow = 'none'; }}
          />

          {archives.length === 0 ? (
            <p style={{ fontSize: '12px', color: '#1e293b', fontStyle: 'italic', textAlign: 'center' }}>History is waiting to be written.</p>
          ) : (
            archives
              .filter(log => grimoireSearch === '' || log.mantra.toLowerCase().includes(grimoireSearch.toLowerCase()))
              .map(log => (
                <div key={log.id} style={{ background: '#0d0d35', border: '1px solid #4c1d95', padding: '30px', borderRadius: '4px', marginBottom: '16px' }}>
                  <span style={{ fontSize: '9px', color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '3px' }}>{log.date}</span>
                  <p style={{ fontSize: '15px', fontStyle: 'italic', color: 'white', marginTop: '14px', lineHeight: '1.8' }}>"{log.mantra}"</p>
                </div>
              ))
          )}
        </div>
      )}

      {activeTab === 'stillroom' && (
        <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center', padding: '60px 20px' }}>
          <h2 style={{ background: 'linear-gradient(135deg, #d8b4fe, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontSize: '2rem', fontStyle: 'italic', marginBottom: '10px' }}>The Stillroom</h2>
          <p style={{ background: 'linear-gradient(135deg, #a855f7, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '5px', marginBottom: '60px' }}>Apothecary Analysis</p>

          {selectedItems.length === 0 ? (
            <p style={{ color: '#1e293b', fontStyle: 'italic', fontSize: '14px' }}>No material selected. Visit the Library.</p>
          ) : (
            <>
              {dominantNote && (
                <div style={{ marginBottom: '50px' }}>
                  <p style={{ fontSize: '9px', color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '12px' }}>Dominant Note</p>
                  <p style={{ color: 'white', fontSize: '2.4rem', fontStyle: 'italic', textTransform: 'capitalize' }}>{dominantNote}</p>
                </div>
              )}

              {/* Cauldron circular layout */}
              <div style={{ position: 'relative', width: '200px', height: '200px', margin: '0 auto 50px auto' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80px', height: '80px', borderRadius: '50%', border: '1px solid #7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', boxShadow: '0 0 16px 2px #a855f730' }}>🫧</div>
                {selectedItems.map((item, i) => {
                  const angle = (i / selectedItems.length) * 2 * Math.PI - Math.PI / 2;
                  const r = 85;
                  const x = 100 + r * Math.cos(angle) - 20;
                  const y = 100 + r * Math.sin(angle) - 20;
                  return (
                    <div key={item.id} style={{ position: 'absolute', left: x, top: y, width: '40px', height: '40px', borderRadius: '50%', background: '#0d0d35', border: '1px solid #4c1d95', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                      {item.icon}
                    </div>
                  );
                })}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginBottom: '40px' }}>
                {selectedItems.map(item => (
                  <span key={item.id} style={{ fontSize: '10px', color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '2px', padding: '6px 14px', border: '1px solid #4c1d95', borderRadius: '2px' }}>{item.name}</span>
                ))}
              </div>
              <button onClick={() => { playChime('soft'); setSelectedItems([]); }} style={{ background: 'none', border: '1px solid #334155', color: '#475569', padding: '12px 30px', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '4px', cursor: 'pointer', borderRadius: '2px', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#a855f7'; e.currentTarget.style.color = '#d8b4fe'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#334155'; e.currentTarget.style.color = '#475569'; }}
              >Clear Selections</button>
            </>
          )}
        </div>
      )}

      {ritualOutput && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: '#08082a', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ maxWidth: '550px', width: '100%', padding: '40px' }}>
             <h2 style={{ color: 'white', fontStyle: 'italic', fontSize: '2.8rem', textAlign: 'center', marginBottom: '50px' }}>The Working</h2>
             <div style={{ textAlign: 'left', marginBottom: '60px', borderLeft: '1px solid #7c3aed', paddingLeft: '35px' }}>
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
          <p style={{ color: '#d8b4fe', fontSize: '16px', fontStyle: 'italic', marginBottom: '25px', lineHeight: '1.6' }}>"{weaveMantra}"</p>
          <button onClick={() => setRitualOutput([
            "Observe the weight of your chosen materia.",
            `Quiet your pulse and align with ${selectedItems[0].name}.`,
            tarot ? `Acknowledge the threefold counsel: ${tarot.map(c => c.name).join(', ')}.` : "Hold the vision with absolute clarity.",
            `Speak the weave: "${weaveMantra}"`,
            "The intent is sealed. Step away from the ritual space."
          ])} style={{ background: '#7c3aed', color: 'white', border: 'none', padding: '15px 40px', fontWeight: '900', textTransform: 'uppercase', fontSize: '11px', cursor: 'pointer', letterSpacing: '3px', boxShadow: '0 0 20px 4px #a855f740' }}>Begin Ceremony</button>
        </div>
      )}
    </div>
  );
}