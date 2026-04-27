import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Moon, Sparkles, Book, Leaf, Wind, Droplets, Flame, Mountain, 
  Shield, Sun, Clock, Zap, Eye, Heart, Star, Cloud, Plus, X, Layers
} from 'lucide-react';

// --- DATABASE: CRYSTALS (25), HERBS (25), TAROT (22 Major Arcana) ---
const MATERIA_DATA = [
  /* Crystals */
  { id: 'c1', name: 'Moonstone', type: 'Crystal', element: 'Water', property: 'Intuition', planet: 'Moon', description: 'Connects to the divine feminine and new beginnings.', icon: <Droplets size={18} />, color: 'text-blue-200', theme: 'border-blue-500/20' },
  { id: 'c2', name: 'Amethyst', type: 'Crystal', element: 'Spirit', property: 'Peace', planet: 'Jupiter', description: 'Transmutes negative energy into love and protection.', icon: <Sparkles size={18} />, color: 'text-indigo-400', theme: 'border-indigo-500/20' },
  { id: 'c3', name: 'Citrine', type: 'Crystal', element: 'Fire', property: 'Wealth', planet: 'Sun', description: 'The stone of manifestation and personal will.', icon: <Sun size={18} />, color: 'text-yellow-500', theme: 'border-yellow-500/20' },
  { id: 'c4', name: 'Rose Quartz', type: 'Crystal', element: 'Water', property: 'Love', planet: 'Venus', description: 'The stone of universal love and infinite peace.', icon: <Heart size={18} />, color: 'text-pink-300', theme: 'border-pink-500/20' },
  { id: 'c5', name: 'Selenite', type: 'Crystal', element: 'Spirit', property: 'Cleansing', planet: 'Moon', description: 'Ideal for clearing the aura and charging other stones.', icon: <Zap size={18} />, color: 'text-slate-100', theme: 'border-slate-300/20' },
  { id: 'c6', name: 'Black Tourmaline', type: 'Crystal', element: 'Earth', property: 'Shield', planet: 'Saturn', description: 'A premier stone for protection and grounding energy.', icon: <Shield size={18} />, color: 'text-slate-600', theme: 'border-slate-800/40' },
  { id: 'c7', name: 'Lapis Lazuli', type: 'Crystal', element: 'Air', property: 'Truth', planet: 'Venus', description: 'Encourages self-awareness and reveals inner truth.', icon: <Eye size={18} />, color: 'text-blue-600', theme: 'border-blue-700/20' },
  { id: 'c8', name: 'Tiger Eye', type: 'Crystal', element: 'Earth', property: 'Courage', planet: 'Sun', description: 'A stone of protection that may also bring luck.', icon: <Sun size={18} />, color: 'text-orange-400', theme: 'border-orange-500/20' },
  { id: 'c9', name: 'Clear Quartz', type: 'Crystal', element: 'Spirit', property: 'Amplify', planet: 'Sun', description: 'The master healer. Amplifies energy and thought.', icon: <Sparkles size={18} />, color: 'text-slate-200', theme: 'border-white/20' },
  { id: 'c10', name: 'Labradorite', type: 'Crystal', element: 'Air', property: 'Magic', planet: 'Uranus', description: 'The stone of transformation and mystical protection.', icon: <Star size={18} />, color: 'text-cyan-400', theme: 'border-cyan-500/20' },
  { id: 'c11', name: 'Pyrite', type: 'Crystal', element: 'Earth', property: 'Willpower', planet: 'Mars', description: 'Shields against negative energy and danger.', icon: <Flame size={18} />, color: 'text-yellow-600', theme: 'border-yellow-700/20' },
  { id: 'c12', name: 'Obsidian', type: 'Crystal', element: 'Fire', property: 'Shadow', planet: 'Saturn', description: 'Forms a shield against negativity and stress.', icon: <Moon size={18} />, color: 'text-slate-900', theme: 'border-slate-900/50' },
  { id: 'c13', name: 'Fluorite', type: 'Crystal', element: 'Air', property: 'Focus', planet: 'Mercury', description: 'Cleanses and stabilizes the aura.', icon: <Wind size={18} />, color: 'text-green-300', theme: 'border-green-400/20' },
  { id: 'c14', name: 'Malachite', type: 'Crystal', element: 'Earth', property: 'Growth', planet: 'Venus', description: 'A stone of transformation and emotional healing.', icon: <Mountain size={18} />, color: 'text-emerald-700', theme: 'border-emerald-800/20' },
  { id: 'c15', name: 'Carnelian', type: 'Crystal', element: 'Fire', property: 'Vitality', planet: 'Mars', description: 'Restores motivation and stimulates creativity.', icon: <Flame size={18} />, color: 'text-orange-600', theme: 'border-orange-700/20' },
  { id: 'c16', name: 'Aquamarine', type: 'Crystal', element: 'Water', property: 'Calm', planet: 'Moon', description: 'Its calming energies reduce stress and quiet the mind.', icon: <Droplets size={18} />, color: 'text-blue-300', theme: 'border-blue-400/20' },
  { id: 'c17', name: 'Bloodstone', type: 'Crystal', element: 'Earth', property: 'Grounding', planet: 'Mars', description: 'An excellent grounding and protecting stone.', icon: <Heart size={18} />, color: 'text-red-800', theme: 'border-red-900/20' },
  { id: 'c18', name: 'Celestite', type: 'Crystal', element: 'Air', property: 'Angelic', planet: 'Neptune', description: 'Connected to divine energies and angelic realms.', icon: <Cloud size={18} />, color: 'text-sky-200', theme: 'border-sky-300/20' },
  { id: 'c19', name: 'Garnet', type: 'Crystal', element: 'Fire', property: 'Passion', planet: 'Mars', description: 'Revitalizes, purifies and balances energy.', icon: <Flame size={18} />, color: 'text-red-600', theme: 'border-red-700/20' },
  { id: 'c20', name: 'Howlite', type: 'Crystal', element: 'Air', property: 'Sleep', planet: 'Moon', description: 'An extremely calming stone. Excellent for insomnia.', icon: <Moon size={18} />, color: 'text-slate-100', theme: 'border-slate-200/20' },
  { id: 'c21', name: 'Jade', type: 'Crystal', element: 'Earth', property: 'Wisdom', planet: 'Venus', description: 'A symbol of serenity and purity. Signifies wisdom.', icon: <Leaf size={18} />, color: 'text-green-500', theme: 'border-green-600/20' },
  { id: 'c22', name: 'Kyanite', type: 'Crystal', element: 'Air', property: 'Alignment', planet: 'Mercury', description: 'Never needs cleansing. Does not accumulate negativity.', icon: <Zap size={18} />, color: 'text-blue-500', theme: 'border-blue-600/20' },
  { id: 'c23', name: 'Lepidolite', type: 'Crystal', element: 'Water', property: 'Balance', planet: 'Neptune', description: 'Assists in the release of old habits.', icon: <Sparkles size={18} />, color: 'text-purple-300', theme: 'border-purple-400/20' },
  { id: 'c24', name: 'Rhodonite', type: 'Crystal', element: 'Earth', property: 'Forgiveness', planet: 'Venus', description: 'An emotional balancer that clears scars.', icon: <Heart size={18} />, color: 'text-pink-600', theme: 'border-pink-700/20' },
  { id: 'c25', name: 'Sunstone', type: 'Crystal', element: 'Fire', property: 'Joy', planet: 'Sun', description: 'Instills good nature and heightens intuition.', icon: <Sun size={18} />, color: 'text-orange-300', theme: 'border-orange-400/20' },
  /* Herbs */
  { id: 'h1', name: 'Lavender', type: 'Herb', element: 'Air', property: 'Peace', planet: 'Mercury', description: 'Used for calming the mind and inducing dreams.', icon: <Wind size={18} />, color: 'text-purple-400', theme: 'border-emerald-500/20' },
  { id: 'h2', name: 'Mugwort', type: 'Herb', element: 'Earth', property: 'Vision', planet: 'Moon', description: 'Enhances psychic vision and astral projection.', icon: <Mountain size={18} />, color: 'text-emerald-500', theme: 'border-emerald-500/20' },
  { id: 'h3', name: 'Rosemary', type: 'Herb', element: 'Fire', property: 'Memory', planet: 'Sun', description: 'Used for mental clarity and protection.', icon: <Flame size={18} />, color: 'text-blue-400', theme: 'border-emerald-500/20' },
  { id: 'h4', name: 'White Sage', type: 'Herb', element: 'Fire', property: 'Cleansing', planet: 'Jupiter', description: 'Clears negative energy from sacred spaces.', icon: <Wind size={18} />, color: 'text-emerald-100', theme: 'border-emerald-500/20' },
  { id: 'h5', name: 'Peppermint', type: 'Herb', element: 'Fire', property: 'Energy', planet: 'Mercury', description: 'Increases vibrations and provides a boost.', icon: <Flame size={18} />, color: 'text-green-400', theme: 'border-emerald-500/20' },
  { id: 'h6', name: 'Bay Leaf', type: 'Herb', element: 'Fire', property: 'Manifest', planet: 'Sun', description: 'Burn to release intentions into the universe.', icon: <Flame size={18} />, color: 'text-green-700', theme: 'border-emerald-500/20' },
  { id: 'h7', name: 'Chamomile', type: 'Herb', element: 'Water', property: 'Calm', planet: 'Sun', description: 'Soothes the spirit and attracts prosperity.', icon: <Droplets size={18} />, color: 'text-yellow-100', theme: 'border-emerald-500/20' },
  { id: 'h8', name: 'Patchouli', type: 'Herb', element: 'Earth', property: 'Money', planet: 'Saturn', description: 'Used to draw wealth and grounding energy.', icon: <Mountain size={18} />, color: 'text-yellow-900', theme: 'border-emerald-500/20' },
  { id: 'h9', name: 'Nettle', type: 'Herb', element: 'Fire', property: 'Warding', planet: 'Mars', description: 'A classic herb for protection and breaking hexes.', icon: <Zap size={18} />, color: 'text-green-600', theme: 'border-emerald-500/20' },
  { id: 'h10', name: 'Basil', type: 'Herb', element: 'Fire', property: 'Luck', planet: 'Mars', description: 'Brings good luck and harmonizes the home.', icon: <Leaf size={18} />, color: 'text-green-400', theme: 'border-emerald-500/20' },
  { id: 'h11', name: 'Calendula', type: 'Herb', element: 'Fire', property: 'Light', planet: 'Sun', description: 'Brings solar energy into legal success.', icon: <Sun size={18} />, color: 'text-orange-400', theme: 'border-emerald-500/20' },
  { id: 'h12', name: 'Clove', type: 'Herb', element: 'Fire', property: 'Driving', planet: 'Jupiter', description: 'Drives away negativity and stops gossip.', icon: <Flame size={18} />, color: 'text-red-900', theme: 'border-emerald-500/20' },
  { id: 'h13', name: 'Dandelion', type: 'Herb', element: 'Air', property: 'Wishes', planet: 'Jupiter', description: 'Used for calling spirits and making wishes.', icon: <Wind size={18} />, color: 'text-yellow-200', theme: 'border-emerald-500/20' },
  { id: 'h14', name: 'Eucalyptus', type: 'Herb', element: 'Water', property: 'Healing', planet: 'Moon', description: 'Excellent for ritual baths and health.', icon: <Droplets size={18} />, color: 'text-emerald-300', theme: 'border-emerald-500/20' },
  { id: 'h15', name: 'Fennel', type: 'Herb', element: 'Fire', property: 'Courage', planet: 'Mercury', description: 'Provides strength and wards off interference.', icon: <Shield size={18} />, color: 'text-green-200', theme: 'border-emerald-500/20' },
  { id: 'h16', name: 'Hibiscus', type: 'Herb', element: 'Water', property: 'Passion', planet: 'Venus', description: 'Used to attract love and incite passion.', icon: <Heart size={18} />, color: 'text-pink-500', theme: 'border-emerald-500/20' },
  { id: 'h17', name: 'Jasmine', type: 'Herb', element: 'Water', property: 'Spirit', planet: 'Moon', description: 'Used for spiritual love and money.', icon: <Sparkles size={18} />, color: 'text-slate-100', theme: 'border-emerald-500/20' },
  { id: 'h18', name: 'Lemon Balm', type: 'Herb', element: 'Water', property: 'Success', planet: 'Moon', description: 'Brings success and heals distress.', icon: <Droplets size={18} />, color: 'text-yellow-400', theme: 'border-emerald-500/20' },
  { id: 'h19', name: 'Mistletoe', type: 'Herb', element: 'Air', property: 'Sun', planet: 'Sun', description: 'Used for protection and fertility magic.', icon: <Sun size={18} />, color: 'text-emerald-200', theme: 'border-emerald-500/20' },
  { id: 'h20', name: 'Oak', type: 'Herb', element: 'Earth', property: 'Stability', planet: 'Mars', description: 'Provides great strength and longevity.', icon: <Mountain size={18} />, color: 'text-yellow-800', theme: 'border-emerald-500/20' },
  { id: 'h21', name: 'Pine', type: 'Herb', element: 'Air', property: 'Purify', planet: 'Mars', description: 'Used for cleansing and attracting money.', icon: <Wind size={18} />, color: 'text-green-800', theme: 'border-emerald-500/20' },
  { id: 'h22', name: 'Rose', type: 'Herb', element: 'Water', property: 'Devotion', planet: 'Venus', description: 'The premier herb for all beauty magic.', icon: <Heart size={18} />, color: 'text-pink-400', theme: 'border-emerald-500/20' },
  { id: 'h23', name: 'Thyme', type: 'Herb', element: 'Water', property: 'Bravery', planet: 'Venus', description: 'Burned for good health and courage.', icon: <Flame size={18} />, color: 'text-green-500', theme: 'border-emerald-500/20' },
  { id: 'h24', name: 'Valerian', type: 'Herb', element: 'Water', property: 'Sleep', planet: 'Mercury', description: 'Used in protection and love magic.', icon: <Moon size={18} />, color: 'text-slate-400', theme: 'border-emerald-500/20' },
  { id: 'h25', name: 'Yarrow', type: 'Herb', element: 'Water', property: 'Banishing', planet: 'Venus', description: 'Used to banish fear and bring courage.', icon: <Shield size={18} />, color: 'text-slate-300', theme: 'border-emerald-500/20' }
];

const TAROT_DECK = [
  { name: "The Fool", meaning: "New beginnings, optimism, trust in life." },
  { name: "The Magician", meaning: "Manifestation, resourcefulness, power." },
  { name: "The High Priestess", meaning: "Intuition, sacred knowledge, subconscious." },
  { name: "The Empress", meaning: "Femininity, nature, abundance." },
  { name: "The Emperor", meaning: "Authority, structure, a solid foundation." },
  { name: "The Hierophant", meaning: "Spiritual wisdom, tradition, institutions." },
  { name: "The Lovers", meaning: "Love, harmony, relationships, choices." },
  { name: "The Chariot", meaning: "Direction, control, willpower, victory." },
  { name: "Strength", meaning: "Courage, persuasion, influence, compassion." },
  { name: "The Hermit", meaning: "Soul-searching, introspection, inner guidance." },
  { name: "Wheel of Fortune", meaning: "Good luck, karma, life cycles, destiny." },
  { name: "Justice", meaning: "Truth, fairness, cause and effect, law." },
  { name: "The Hanged Man", meaning: "Pause, surrender, letting go, new perspectives." },
  { name: "Death", meaning: "Endings, change, transformation, transition." },
  { name: "Temperance", meaning: "Balance, moderation, patience, purpose." },
  { name: "The Devil", meaning: "Shadow self, attachment, addiction, restriction." },
  { name: "The Tower", meaning: "Sudden change, upheaval, chaos, revelation." },
  { name: "The Star", meaning: "Hope, faith, purpose, renewal, spirituality." },
  { name: "The Moon", meaning: "Illusion, fear, anxiety, subconscious, intuition." },
  { name: "The Sun", meaning: "Positivity, fun, warmth, success, vitality." },
  { name: "Judgement", meaning: "Judgement, rebirth, inner calling, absolution." },
  { name: "The World", meaning: "Completion, integration, accomplishment, travel." }
];

export default function Garden() {
  const [activeTab, setActiveTab] = useState('moon'); // Start with the Moon (Timing)
  const [subFilter, setSubFilter] = useState('Crystal');
  const [showAll, setShowAll] = useState(false);
  
  // Ritual State
  const [selectedMateria, setSelectedMateria] = useState([]);
  const [tarotCard, setTarotCard] = useState(null);
  const [intent, setIntent] = useState("");
  const [moonData, setMoonData] = useState({ phase: '...', illumination: 0, daysToFull: 0 });
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem('ritual_history') || '[]'));

  // Logic: Moon Calculation
  useEffect(() => {
    const lp = 2551443; const now = new Date(); const newMoon = new Date('1970-01-07T20:35:00');
    const phaseCycle = ((now.getTime() - newMoon.getTime()) / 1000) % lp;
    const days = phaseCycle / (24 * 3600);
    let phase = days < 1.8 ? 'New Moon' : days < 5.5 ? 'Waxing Crescent' : days < 9.2 ? 'First Quarter' : days < 12.9 ? 'Waxing Gibbous' : days < 16.6 ? 'Full Moon' : days < 20.3 ? 'Waning Gibbous' : days < 24.0 ? 'Last Quarter' : 'Waning Crescent';
    setMoonData({ phase, illumination: Math.round(Math.abs(50 - (days / 30 * 100)) * 2), daysToFull: days <= 14.8 ? (14.8 - days).toFixed(1) : (29.5 - days + 14.8).toFixed(1) });
  }, []);

  // Handlers
  const toggleMateria = (item) => {
    if (selectedMateria.find(m => m.id === item.id)) {
      setSelectedMateria(selectedMateria.filter(m => m.id !== item.id));
    } else if (selectedMateria.length < 3) {
      setSelectedMateria([...selectedMateria, item]);
    }
  };

  const drawCard = () => {
    const card = TAROT_DECK[Math.floor(Math.random() * TAROT_DECK.length)];
    setTarotCard(card);
  };

  const bindRitual = () => {
    if (!intent.trim()) return;
    const entry = {
      text: intent,
      date: new Date().toLocaleDateString(),
      moon: moonData.phase,
      tools: selectedMateria.map(m => m.name),
      guidance: tarotCard?.name
    };
    const updated = [entry, ...history].slice(0, 5);
    setHistory(updated);
    localStorage.setItem('ritual_history', JSON.stringify(updated));
    setIntent(""); setSelectedMateria([]); setTarotCard(null);
    setActiveTab('moon'); // Reset cycle
  };

  const filteredData = MATERIA_DATA.filter(item => item.type === subFilter).sort((a,b) => a.name.localeCompare(b.name));
  const visibleData = showAll ? filteredData : filteredData.slice(0, 9);

  return (
    <div className="min-h-screen bg-[#020806] text-slate-300 font-sans pb-32 selection:bg-emerald-500/20">
      {/* HEADER & RITUAL PROGRESS */}
      <nav className="max-w-7xl mx-auto px-8 py-10 flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex items-center gap-3">
          <Moon className="text-emerald-400 animate-pulse" />
          <h1 className="text-xl font-light tracking-[0.5em] uppercase text-white">Selene</h1>
        </div>
        
        <div className="flex bg-white/5 border border-white/10 p-1.5 rounded-2xl backdrop-blur-xl">
          {[
            { id: 'moon', icon: <Clock size={14}/>, label: '1. Timing' },
            { id: 'library', icon: <Layers size={14}/>, label: '2. Tools' },
            { id: 'oracle', icon: <Star size={14}/>, label: '3. Guidance' },
            { id: 'altar', icon: <Flame size={14}/>, label: '4. Manifest' }
          ].map(step => (
            <button 
              key={step.id} 
              onClick={() => setActiveTab(step.id)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[9px] uppercase tracking-widest font-black transition-all ${activeTab === step.id ? 'bg-emerald-500/20 text-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.1)]' : 'text-slate-600 hover:text-slate-400'}`}
            >
              {step.icon} {step.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: MOON */}
          {activeTab === 'moon' && (
            <motion.div key="moon" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-4xl mx-auto text-center">
              <div className="p-16 bg-white/[0.02] border border-white/5 rounded-[4rem] relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-500/5 blur-[100px]" />
                <h2 className="text-6xl font-serif italic text-white mb-4">{moonData.phase}</h2>
                <p className="text-emerald-500 tracking-[0.6em] text-[10px] font-black uppercase mb-12">{moonData.daysToFull} Days to Peak</p>
                
                <div className="grid grid-cols-2 gap-4 text-left">
                  <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem]">
                    <p className="text-[9px] uppercase text-emerald-500 font-bold mb-2">Phase Influence</p>
                    <p className="text-sm italic text-slate-400">"{moonData.illumination > 50 ? 'The tide is rising. Best for expansion, attraction, and growth.' : 'The tide is receding. Best for introspection, banishing, and cleansing.'}"</p>
                  </div>
                  <button onClick={() => setActiveTab('library')} className="p-8 bg-emerald-500/10 border border-emerald-500/20 rounded-[2.5rem] flex flex-col items-center justify-center group">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-400">Proceed to Gathering</span>
                    <Plus className="mt-4 text-emerald-400 group-hover:rotate-90 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: LIBRARY (Selection Mode) */}
          {activeTab === 'library' && (
            <motion.div key="lib" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="flex justify-between items-end mb-12 border-b border-white/5 pb-6">
                <div className="flex gap-8">
                  {['Crystal', 'Herb'].map(f => (
                    <button key={f} onClick={() => {setSubFilter(f); setShowAll(false);}} className={`text-[10px] uppercase tracking-[0.4em] font-black transition-all ${subFilter === f ? 'text-emerald-400' : 'text-slate-600'}`}>
                      {f}s
                    </button>
                  ))}
                </div>
                <div className="text-[9px] uppercase tracking-widest text-emerald-500 font-bold bg-emerald-500/5 px-4 py-2 rounded-full border border-emerald-500/10">
                  Selected: {selectedMateria.length} / 3
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {visibleData.map(item => {
                  const isSelected = selectedMateria.find(m => m.id === item.id);
                  return (
                    <div 
                      key={item.id} 
                      onClick={() => toggleMateria(item)}
                      className={`cursor-pointer p-8 rounded-[2.5rem] border transition-all ${isSelected ? 'bg-emerald-500/10 border-emerald-500/50' : 'bg-white/[0.02] border-white/5 hover:border-emerald-500/30'}`}
                    >
                      <div className={`p-3 w-fit rounded-xl bg-white/5 mb-6 ${item.color}`}>{item.icon}</div>
                      <h3 className="text-xl font-serif italic text-white">{item.name}</h3>
                      <p className="text-[10px] uppercase tracking-widest text-slate-500 mt-2">{item.property}</p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-12 flex justify-center gap-6">
                {!showAll && <button onClick={() => setShowAll(true)} className="px-8 py-4 text-[9px] uppercase tracking-widest font-bold border border-white/10 rounded-xl">View All</button>}
                <button onClick={() => setActiveTab('oracle')} className="px-12 py-4 bg-emerald-500 text-black text-[9px] uppercase tracking-[0.3em] font-black rounded-xl">Consult Guidance</button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: ORACLE (Tarot) */}
          {activeTab === 'oracle' && (
            <motion.div key="oracle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto text-center">
              {!tarotCard ? (
                <div onClick={drawCard} className="aspect-[2/3] w-64 mx-auto bg-emerald-500/5 border-2 border-dashed border-emerald-500/20 rounded-3xl flex flex-col items-center justify-center cursor-pointer group hover:bg-emerald-500/10 transition-all">
                  <Star className="text-emerald-500/40 mb-4 group-hover:scale-125 transition-transform" size={40} />
                  <p className="text-[10px] uppercase tracking-[0.4em] text-emerald-500 font-black">Draw a Card</p>
                </div>
              ) : (
                <motion.div initial={{ rotateY: 180 }} animate={{ rotateY: 0 }} className="p-12 bg-white/[0.03] border border-emerald-500/20 rounded-[3rem]">
                  <Sparkles className="text-emerald-400 mx-auto mb-6" />
                  <h3 className="text-3xl font-serif italic text-white mb-4">{tarotCard.name}</h3>
                  <p className="text-sm text-slate-400 italic leading-relaxed mb-10">"{tarotCard.meaning}"</p>
                  <div className="flex gap-4 justify-center">
                    <button onClick={drawCard} className="text-[9px] uppercase tracking-widest text-slate-500 hover:text-white">Redraw</button>
                    <button onClick={() => setActiveTab('altar')} className="px-8 py-3 bg-white/5 rounded-xl text-[9px] uppercase tracking-widest font-bold text-emerald-400">Proceed to Altar</button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* STEP 4: ALTAR (Final Manifestation) */}
          {activeTab === 'altar' && (
            <motion.div key="altar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Intent Panel */}
                <div className="lg:col-span-2 bg-[#06120f] border border-emerald-500/20 p-12 rounded-[3.5rem] relative shadow-2xl">
                  <div className="absolute top-0 right-0 p-8 opacity-10"><Flame size={120} /></div>
                  <h3 className="text-xl font-serif italic text-white mb-8 tracking-widest">The Great Work</h3>
                  <textarea 
                    value={intent} 
                    onChange={(e) => setIntent(e.target.value)} 
                    placeholder="Describe your intent..." 
                    className="w-full bg-transparent border-none text-2xl italic text-emerald-100 h-48 focus:ring-0"
                  />
                  <button onClick={bindRitual} className="w-full py-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 text-[10px] font-black uppercase tracking-[0.5em] hover:bg-emerald-500/20 transition-all">
                    Seal Ritual
                  </button>
                </div>

                {/* Sidebar: Current Tools */}
                <div className="space-y-6">
                  <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem]">
                    <h4 className="text-[9px] uppercase tracking-widest text-slate-500 font-black mb-6">Active Tools</h4>
                    <div className="space-y-3">
                      {selectedMateria.map(m => (
                        <div key={m.id} className="flex items-center gap-3 text-xs italic text-emerald-100">
                          <div className={m.color}>{m.icon}</div> {m.name}
                        </div>
                      ))}
                      {tarotCard && <div className="flex items-center gap-3 text-xs italic text-blue-300 pt-3 border-t border-white/5"><Star size={14}/> {tarotCard.name}</div>}
                      {selectedMateria.length === 0 && <p className="text-[10px] text-slate-600 uppercase">No tools gathered</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Ritual Log */}
              <div className="mt-20 space-y-4">
                <p className="text-[10px] uppercase tracking-[0.4em] text-slate-600 font-black ml-6">Ritual Archives</p>
                {history.map((h, i) => (
                  <div key={i} className="p-8 bg-white/[0.01] border border-white/5 rounded-3xl flex justify-between items-center group">
                    <div>
                      <p className="text-sm text-slate-400 italic">"{h.text}"</p>
                      <div className="flex gap-4 mt-3 text-[8px] uppercase tracking-widest font-black text-slate-600">
                        <span>{h.date}</span><span>{h.moon}</span>
                        {h.tools?.length > 0 && <span className="text-emerald-900">{h.tools.join(' + ')}</span>}
                      </div>
                    </div>
                    <Sparkles className="text-slate-800 group-hover:text-emerald-500/30 transition-colors" size={16} />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}