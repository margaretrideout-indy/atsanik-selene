import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Moon, Sparkles, Book, Leaf, Wind, Droplets, Flame, Mountain, 
  Shield, Sun, Clock, Zap, Eye, Heart, Star, Cloud, Plus, X, Layers, Coffee, Circle, Search, ChevronDown, ChevronUp, Beaker, Wand2, Calendar, Music, Edit3
} from 'lucide-react';

// --- THE ETERNAL DATABASE (The Complete Collection) ---
const MASTER_DATA = [
  // CRYSTALS (25+)
  { id: 'c1', name: 'Moonstone', type: 'Crystal', property: 'Intuition', tags: ['psychic', 'dreams'], color: 'text-blue-200', icon: <Moon size={18} /> },
  { id: 'c2', name: 'Amethyst', type: 'Crystal', property: 'Peace', tags: ['anxiety', 'sleep'], color: 'text-indigo-400', icon: <Sparkles size={18} /> },
  { id: 'c3', name: 'Citrine', type: 'Crystal', property: 'Wealth', tags: ['money', 'success'], color: 'text-yellow-500', icon: <Sun size={18} /> },
  { id: 'c4', name: 'Rose Quartz', type: 'Crystal', property: 'Love', tags: ['romance', 'healing'], color: 'text-pink-300', icon: <Heart size={18} /> },
  { id: 'c5', name: 'Selenite', type: 'Crystal', property: 'Cleansing', tags: ['purify', 'charging'], color: 'text-slate-100', icon: <Zap size={18} /> },
  { id: 'c6', name: 'Black Tourmaline', type: 'Crystal', property: 'Shield', tags: ['protection', 'grounding'], color: 'text-slate-600', icon: <Shield size={18} /> },
  { id: 'c7', name: 'Labradorite', type: 'Crystal', property: 'Magic', tags: ['psychic', 'change'], color: 'text-cyan-400', icon: <Star size={18} /> },
  { id: 'c8', name: 'Tiger Eye', type: 'Crystal', property: 'Courage', tags: ['confidence', 'luck'], color: 'text-orange-400', icon: <Sun size={18} /> },
  { id: 'c9', name: 'Lapis Lazuli', type: 'Crystal', property: 'Truth', tags: ['wisdom', 'voice'], color: 'text-blue-600', icon: <Eye size={18} /> },
  { id: 'c10', name: 'Clear Quartz', type: 'Crystal', property: 'Amplify', tags: ['power', 'clarity'], color: 'text-white', icon: <Zap size={18} /> },
  { id: 'c11', name: 'Pyrite', type: 'Crystal', property: 'Luck', tags: ['money', 'protection'], color: 'text-yellow-600', icon: <Sun size={18} /> },
  { id: 'c12', name: 'Carnelian', type: 'Crystal', property: 'Creativity', tags: ['passion', 'action'], color: 'text-orange-600', icon: <Flame size={18} /> },
  { id: 'c13', name: 'Black Obsidian', type: 'Crystal', property: 'Shadow', tags: ['truth', 'protection'], color: 'text-black', icon: <Moon size={18} /> },
  { id: 'c14', name: 'Green Aventurine', type: 'Crystal', property: 'Opportunity', tags: ['money', 'growth'], color: 'text-emerald-400', icon: <Leaf size={18} /> },
  { id: 'c15', name: 'Fluorite', type: 'Crystal', property: 'Focus', tags: ['study', 'clarity'], color: 'text-purple-300', icon: <Wind size={18} /> },
  { id: 'c16', name: 'Hematite', type: 'Crystal', property: 'Grounding', tags: ['anxiety', 'shield'], color: 'text-slate-400', icon: <Mountain size={18} /> },
  { id: 'c17', name: 'Malachite', type: 'Crystal', property: 'Change', tags: ['transformation', 'heart'], color: 'text-green-800', icon: <Layers size={18} /> },
  { id: 'c18', name: 'Red Jasper', type: 'Crystal', property: 'Vitality', tags: ['strength', 'stamina'], color: 'text-red-700', icon: <Zap size={18} /> },
  { id: 'c19', name: 'Sodalite', type: 'Crystal', property: 'Logic', tags: ['calm', 'intelligence'], color: 'text-blue-800', icon: <Eye size={18} /> },
  { id: 'c20', name: 'Smoky Quartz', type: 'Crystal', property: 'Release', tags: ['detox', 'negativity'], color: 'text-stone-500', icon: <Cloud size={18} /> },
  { id: 'c21', name: 'Lepidolite', type: 'Crystal', property: 'Calm', tags: ['anxiety', 'transition'], color: 'text-purple-200', icon: <Wind size={18} /> },
  { id: 'c22', name: 'Amazonite', type: 'Crystal', property: 'Hope', tags: ['truth', 'courage'], color: 'text-teal-400', icon: <Droplets size={18} /> },
  { id: 'c23', name: 'Howlite', type: 'Crystal', property: 'Patience', tags: ['sleep', 'anger'], color: 'text-slate-200', icon: <Cloud size={18} /> },
  { id: 'c24', name: 'Unakite', type: 'Crystal', property: 'Balance', tags: ['rebirth', 'healing'], color: 'text-green-300', icon: <Heart size={18} /> },
  { id: 'c25', name: 'Aquamarine', type: 'Crystal', property: 'Flow', tags: ['peace', 'water'], color: 'text-cyan-200', icon: <Droplets size={18} /> },

  // HERBS (25+)
  { id: 'h1', name: 'Lavender', type: 'Herb', property: 'Peace', tags: ['sleep', 'calm'], color: 'text-purple-400', icon: <Wind size={18} /> },
  { id: 'h2', name: 'Mugwort', type: 'Herb', property: 'Vision', tags: ['dreams', 'psychic'], color: 'text-emerald-500', icon: <Moon size={18} /> },
  { id: 'h3', name: 'Rosemary', type: 'Herb', property: 'Memory', tags: ['focus', 'protection'], color: 'text-blue-400', icon: <Flame size={18} /> },
  { id: 'h4', name: 'Bay Leaf', type: 'Herb', property: 'Manifest', tags: ['wishes', 'money'], color: 'text-green-700', icon: <Leaf size={18} /> },
  { id: 'h5', name: 'Peppermint', type: 'Herb', property: 'Energy', tags: ['vitality', 'clear'], color: 'text-green-400', icon: <Zap size={18} /> },
  { id: 'h6', name: 'Chamomile', type: 'Herb', property: 'Calm', tags: ['anxiety', 'sleep'], color: 'text-yellow-100', icon: <Droplets size={18} /> },
  { id: 'h7', name: 'Basil', type: 'Herb', property: 'Luck', tags: ['money', 'prosperity'], color: 'text-green-600', icon: <Heart size={18} /> },
  { id: 'h8', name: 'Thyme', type: 'Herb', property: 'Bravery', tags: ['courage', 'health'], color: 'text-emerald-600', icon: <Shield size={18} /> },
  { id: 'h9', name: 'Sage', type: 'Herb', property: 'Cleanse', tags: ['purify', 'wisdom'], color: 'text-slate-400', icon: <Cloud size={18} /> },
  { id: 'h10', name: 'Cinnamon', type: 'Herb', property: 'Speed', tags: ['success', 'fast'], color: 'text-orange-900', icon: <Zap size={18} /> },
  { id: 'h11', name: 'Dandelion', type: 'Herb', property: 'Growth', tags: ['wishes', 'healing'], color: 'text-yellow-400', icon: <Sun size={18} /> },
  { id: 'h12', name: 'Eucalyptus', type: 'Herb', property: 'Healing', tags: ['health', 'breath'], color: 'text-cyan-600', icon: <Wind size={18} /> },
  { id: 'h13', name: 'Jasmine', type: 'Herb', property: 'Dreams', tags: ['love', 'prophetic'], color: 'text-slate-100', icon: <Star size={18} /> },
  { id: 'h14', name: 'Patchouli', type: 'Herb', property: 'Grounding', tags: ['money', 'lust'], color: 'text-stone-600', icon: <Mountain size={18} /> },
  { id: 'h15', name: 'Mistletoe', type: 'Herb', property: 'Protection', tags: ['luck', 'safety'], color: 'text-emerald-100', icon: <Shield size={18} /> },
  { id: 'h16', name: 'Nettle', type: 'Herb', property: 'Defense', tags: ['protection', 'strength'], color: 'text-green-900', icon: <Shield size={18} /> },
  { id: 'h17', name: 'Hibiscus', type: 'Herb', property: 'Passion', tags: ['love', 'lust'], color: 'text-red-500', icon: <Flame size={18} /> },
  { id: 'h18', name: 'Valerian', type: 'Herb', property: 'Deep Sleep', tags: ['calm', 'rest'], color: 'text-slate-500', icon: <Moon size={18} /> },
  { id: 'h19', name: 'Elderberry', type: 'Herb', property: 'Fates', tags: ['health', 'ancestors'], color: 'text-purple-900', icon: <Star size={18} /> },
  { id: 'h20', name: 'Yarrow', type: 'Herb', property: 'Boundary', tags: ['courage', 'safety'], color: 'text-pink-100', icon: <Shield size={18} /> },
  { id: 'h21', name: 'Vervain', type: 'Herb', property: 'Enchant', tags: ['magic', 'power'], color: 'text-purple-600', icon: <Sparkles size={18} /> },
  { id: 'h22', name: 'Calendula', type: 'Herb', property: 'Sun-Light', tags: ['joy', 'legal'], color: 'text-orange-400', icon: <Sun size={18} /> },
  { id: 'h23', name: 'Catnip', type: 'Herb', property: 'Fascination', tags: ['love', 'beauty'], color: 'text-emerald-300', icon: <Heart size={18} /> },
  { id: 'h24', name: 'Comfrey', type: 'Herb', property: 'Safety', tags: ['travel', 'healing'], color: 'text-green-200', icon: <Mountain size={18} /> },
  { id: 'h25', name: 'Witch Hazel', type: 'Herb', property: 'Mend', tags: ['healing', 'broken heart'], color: 'text-yellow-200', icon: <Zap size={18} /> },

  // PANTRY (25+)
  { id: 'k1', name: 'Sea Salt', type: 'Pantry', property: 'Shield', tags: ['protection', 'cleansing'], color: 'text-slate-100', icon: <Circle size={18} /> },
  { id: 'k2', name: 'Honey', type: 'Pantry', property: 'Sweetness', tags: ['love', 'friendship'], color: 'text-yellow-600', icon: <Droplets size={18} /> },
  { id: 'k3', name: 'Coffee', type: 'Pantry', property: 'Haste', tags: ['energy', 'focus'], color: 'text-amber-900', icon: <Coffee size={18} /> },
  { id: 'k4', name: 'Black Pepper', type: 'Pantry', property: 'Banish', tags: ['protection', 'exit'], color: 'text-slate-800', icon: <Zap size={18} /> },
  { id: 'k5', name: 'Rice', type: 'Pantry', property: 'Abundance', tags: ['money', 'fertility'], color: 'text-white', icon: <Cloud size={18} /> },
  { id: 'k6', name: 'Sugar', type: 'Pantry', property: 'Magnet', tags: ['love', 'attraction'], color: 'text-slate-200', icon: <Sparkles size={18} /> },
  { id: 'k7', name: 'Vinegar', type: 'Pantry', property: 'Break', tags: ['banishing', 'cleansing'], color: 'text-yellow-900', icon: <Droplets size={18} /> },
  { id: 'k8', name: 'Garlic', type: 'Pantry', property: 'Warding', tags: ['health', 'protection'], color: 'text-white', icon: <Shield size={18} /> },
  { id: 'k9', name: 'Onion Skin', type: 'Pantry', property: 'Layers', tags: ['healing', 'protection'], color: 'text-orange-300', icon: <Layers size={18} /> },
  { id: 'k10', name: 'Egg Shell', type: 'Pantry', property: 'Wall', tags: ['boundaries', 'protection'], color: 'text-slate-100', icon: <Circle size={18} /> },
  { id: 'k11', name: 'Clove', type: 'Pantry', property: 'Silence', tags: ['anti-gossip', 'luck'], color: 'text-amber-900', icon: <Shield size={18} /> },
  { id: 'k12', name: 'Star Anise', type: 'Pantry', property: 'Luck', tags: ['psychic', 'fortune'], color: 'text-amber-800', icon: <Star size={18} /> },
  { id: 'k13', name: 'Ginger', type: 'Pantry', property: 'Heat', tags: ['passion', 'speed'], color: 'text-orange-200', icon: <Flame size={18} /> },
  { id: 'k14', name: 'Nutmeg', type: 'Pantry', property: 'Coin', tags: ['money', 'gambling'], color: 'text-orange-900', icon: <Sun size={18} /> },
  { id: 'k15', name: 'Tea Leaves', type: 'Pantry', property: 'Fate', tags: ['future', 'divination'], color: 'text-emerald-900', icon: <Eye size={18} /> },
  { id: 'k16', name: 'Bayberry', type: 'Pantry', property: 'Gold', tags: ['money', 'wealth'], color: 'text-green-800', icon: <Sun size={18} /> },
  { id: 'k17', name: 'Olive Oil', type: 'Pantry', property: 'Bless', tags: ['anointing', 'peace'], color: 'text-yellow-600', icon: <Droplets size={18} /> },
  { id: 'k18', name: 'Allspice', type: 'Pantry', property: 'Drive', tags: ['success', 'energy'], color: 'text-amber-700', icon: <Zap size={18} /> },
  { id: 'k19', name: 'Mustard', type: 'Pantry', property: 'Faith', tags: ['protection', 'mental'], color: 'text-yellow-600', icon: <Zap size={18} /> },
  { id: 'k20', name: 'Orange Peel', type: 'Pantry', property: 'Joy', tags: ['luck', 'money'], color: 'text-orange-500', icon: <Sun size={18} /> },
  { id: 'k21', name: 'Lemon Peel', type: 'Pantry', property: 'Clean', tags: ['purify', 'love'], color: 'text-yellow-300', icon: <Zap size={18} /> },
  { id: 'k22', name: 'Vanilla', type: 'Pantry', property: 'Lust', tags: ['love', 'mental'], color: 'text-amber-100', icon: <Heart size={18} /> },
  { id: 'k23', name: 'Peppercorn', type: 'Pantry', property: 'Banish', tags: ['protection', 'fire'], color: 'text-slate-900', icon: <Flame size={18} /> },
  { id: 'k24', name: 'Cinnamon Stick', type: 'Pantry', property: 'Fast Luck', tags: ['money', 'speed'], color: 'text-orange-900', icon: <Zap size={18} /> },
  { id: 'k25', name: 'Flour', type: 'Pantry', property: 'Home', tags: ['stability', 'foundation'], color: 'text-slate-100', icon: <Mountain size={18} /> },

  // COLOURS (9)
  { id: 'ca1', name: 'White', type: 'Colour', property: 'Purity', tags: ['universal', 'cleansing'], color: 'text-slate-100', icon: <Flame size={18} /> },
  { id: 'ca2', name: 'Black', type: 'Colour', property: 'Protection', tags: ['banishing', 'shield'], color: 'text-slate-900', icon: <Flame size={18} /> },
  { id: 'ca3', name: 'Red', type: 'Colour', property: 'Passion', tags: ['strength', 'courage'], color: 'text-red-500', icon: <Flame size={18} /> },
  { id: 'ca4', name: 'Pink', type: 'Colour', property: 'Love', tags: ['self-love', 'friendship'], color: 'text-pink-400', icon: <Flame size={18} /> },
  { id: 'ca5', name: 'Green', type: 'Colour', property: 'Wealth', tags: ['money', 'luck'], color: 'text-emerald-500', icon: <Flame size={18} /> },
  { id: 'ca6', name: 'Blue', type: 'Colour', property: 'Truth', tags: ['communication', 'peace'], color: 'text-blue-400', icon: <Flame size={18} /> },
  { id: 'ca7', name: 'Purple', type: 'Colour', property: 'Power', tags: ['psychic', 'ambition'], color: 'text-purple-600', icon: <Flame size={18} /> },
  { id: 'ca8', name: 'Gold', type: 'Colour', property: 'Fortune', tags: ['success', 'sun'], color: 'text-yellow-600', icon: <Flame size={18} /> },
  { id: 'ca9', name: 'Silver', type: 'Colour', property: 'Lunar', tags: ['dreams', 'divinity'], color: 'text-slate-400', icon: <Flame size={18} /> }
];

export default function Garden() {
  const [activeTab, setActiveTab] = useState('moon');
  const [subFilter, setSubFilter] = useState('Crystal');
  const [theme, setTheme] = useState('midnight');
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [incenseOn, setIncenseOn] = useState(false);
  
  // Ritual State
  const [selectedMateria, setSelectedMateria] = useState([]);
  const [tarotCard, setTarotCard] = useState(null);
  const [customIntent, setCustomIntent] = useState("");
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem('eternal_grimoire_history') || '[]'));

  // Logic: Analysis & Mantras
  const analysis = useMemo(() => {
    if (selectedMateria.length === 0) return { mantra: "", brew: "" };
    const props = selectedMateria.map(m => m.property.toLowerCase());
    const herbs = selectedMateria.filter(m => m.type === 'Herb').map(m => m.name);
    let mnt = "My spirit is aligned and my will is set. ";
    if (props.includes('wealth')) mnt = "Abundance flows through me like water. ";
    if (props.includes('shield')) mnt = "I am a fortress of golden light. ";
    if (props.includes('love')) mnt = "I radiate peace and attract deep connection. ";
    let brw = herbs.length > 0 ? `Infuse ${herbs.slice(0, 2).join(' and ')} into a bowl of warm water or oil.` : "Focus your tools to anchor the energy.";
    return { mantra: mnt, brew: brw };
  }, [selectedMateria]);

  const finalizeRitual = () => {
    const finalContent = customIntent || `Working of ${selectedMateria.map(m => m.name).join(', ')}.`;
    const entry = { text: finalContent, date: new Date().toLocaleDateString(), tools: selectedMateria.map(m => m.name) };
    const newHistory = [entry, ...history].slice(0, 20);
    setHistory(newHistory);
    localStorage.setItem('eternal_grimoire_history', JSON.stringify(newHistory));
    setCustomIntent(""); setSelectedMateria([]); setTarotCard(null); setActiveTab('moon');
  };

  const themeStyles = {
    midnight: "bg-[#020806] text-slate-300",
    forest: "bg-[#040d0a] text-emerald-100/80",
    solar: "bg-[#0d0a04] text-amber-100/80"
  };

  return (
    <div className={`min-h-screen ${themeStyles[theme]} font-sans transition-colors duration-1000 pb-32`}>
      {/* NAVIGATION */}
      <nav className="max-w-7xl mx-auto px-8 py-10 flex flex-col md:flex-row justify-between items-center gap-10 sticky top-0 bg-inherit z-[200]">
        <div className="flex items-center gap-3">
          <Moon className="text-emerald-400" size={24} />
          <h1 className="text-2xl font-light tracking-[0.6em] uppercase text-white">Selene</h1>
        </div>
        
        <div className="flex bg-white/[0.03] border border-white/10 p-1 rounded-2xl backdrop-blur-3xl shadow-2xl">
          {['moon', 'library', 'oracle', 'altar'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-3 rounded-xl text-[10px] uppercase tracking-widest font-black transition-all cursor-pointer ${activeTab === tab ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-600 hover:text-slate-400'}`}>
              {tab}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          {['midnight', 'forest', 'solar'].map(t => (
            <button key={t} onClick={() => setTheme(t)} className={`w-4 h-4 rounded-full border border-white/20 ${t === 'midnight' ? 'bg-slate-950' : t === 'forest' ? 'bg-emerald-950' : 'bg-amber-950'}`} />
          ))}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8 relative">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: MOON & PLANETARY HOURS */}
          {activeTab === 'moon' && (
            <motion.div key="moon" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-20">
              <div className="text-center p-20 bg-white/[0.01] border border-white/5 rounded-[5rem] flex flex-col justify-center">
                 <Moon size={100} className="mx-auto text-emerald-400 mb-12 drop-shadow-[0_0_30px_rgba(52,211,153,0.3)]" />
                 <h2 className="text-7xl font-serif italic text-white mb-6">Waning</h2>
                 <p className="text-emerald-500 tracking-[0.8em] text-[11px] font-black uppercase italic">The time of release.</p>
              </div>
              <div className="space-y-8">
                <div className="p-12 bg-white/[0.02] border border-white/5 rounded-[3rem] shadow-xl">
                    <h3 className="text-xs uppercase tracking-widest text-slate-500 mb-8 flex items-center gap-3"><Clock size={16}/> Planetary Hour</h3>
                    <div className="flex items-center gap-6">
                        <Sun className="text-amber-500" size={40} />
                        <div>
                            <p className="text-2xl font-serif italic text-white">Hour of the Sun</p>
                            <p className="text-[10px] uppercase tracking-widest text-slate-600">Success • Clarity • Vitality</p>
                        </div>
                    </div>
                </div>
                <div className="p-12 bg-white/[0.02] border border-white/5 rounded-[3rem]">
                    <h3 className="text-xs uppercase tracking-widest text-slate-500 mb-6">Upcoming Phase</h3>
                    <p className="text-xl italic text-emerald-100/60 font-serif">New Moon in 8 days</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: THE ARCHIVE (CRYSTALS, HERBS, PANTRY, COLOURS) */}
          {activeTab === 'library' && (
            <motion.div key="lib" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex flex-col lg:flex-row justify-between items-end gap-10 mb-16 border-b border-white/5 pb-10">
                <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
                  {['Crystal', 'Herb', 'Pantry', 'Colour'].map(type => (
                    <button key={type} onClick={() => {setSubFilter(type); setIsExpanded(false);}} className={`px-8 py-3 rounded-xl text-[10px] uppercase font-black tracking-widest cursor-pointer ${subFilter === type ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-600 hover:text-slate-500'}`}>
                      {type}
                    </button>
                  ))}
                </div>
                <div className="relative w-full lg:w-96">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                  <input type="text" placeholder="Search by intent (e.g. 'money', 'dreams')..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-full py-5 pl-14 pr-8 text-sm outline-none focus:ring-1 focus:ring-emerald-500/30" />
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                {(isExpanded ? MASTER_DATA : MASTER_DATA.slice(0, 50)).filter(i => i.type === subFilter && (searchQuery === "" || i.tags.some(t => t.includes(searchQuery.toLowerCase())))).map(item => {
                  const active = selectedMateria.find(s => s.id === item.id);
                  return (
                    <motion.div key={item.id} layout onClick={() => toggleMateria(item)} className={`p-10 rounded-[3rem] border cursor-pointer transition-all relative ${active ? 'bg-emerald-500/10 border-emerald-500/40' : 'bg-white/[0.02] border-white/5 hover:border-white/20'}`}>
                      <div className={`mb-8 p-5 rounded-2xl w-fit bg-white/5 ${item.color}`}>{item.icon}</div>
                      <h4 className="text-xl font-serif italic text-white">{item.name}</h4>
                      <p className="text-[10px] uppercase tracking-widest text-slate-500 mt-2">{item.property}</p>
                    </motion.div>
                  );
                })}
              </div>

              <button onClick={() => setIsExpanded(!isExpanded)} className="mx-auto mt-16 flex items-center gap-2 text-[10px] uppercase tracking-widest font-black text-emerald-500/50 hover:text-emerald-400 cursor-pointer">
                {isExpanded ? <><ChevronUp size={16}/> Collapse</> : <><ChevronDown size={16}/> View Full List (25+)</>}
              </button>

              <div className="fixed bottom-12 left-1/2 -translate-x-1/2 bg-black/90 border border-emerald-500/20 px-10 py-5 rounded-full flex items-center gap-8 shadow-3xl backdrop-blur-3xl z-[300]">
                 <p className="text-[11px] uppercase tracking-widest text-slate-500 font-black italic">{selectedMateria.length} Tools Selected</p>
                 <button onClick={() => setActiveTab('oracle')} className="text-[11px] font-black uppercase tracking-[0.4em] text-emerald-400 hover:text-white cursor-pointer">Continue to Oracle</button>
              </div>
            </motion.div>
          )}

          {/* TAB 3: ORACLE */}
          {activeTab === 'oracle' && (
            <motion.div key="oracle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-xl mx-auto text-center py-24">
              {!tarotCard ? (
                <div onClick={() => setTarotCard({ name: "The Magician", meaning: "Manifestation and power." })} className="aspect-[2/3] w-72 mx-auto bg-emerald-500/5 border-2 border-dashed border-emerald-500/20 rounded-[4rem] flex flex-col items-center justify-center cursor-pointer shadow-3xl group">
                  <Star className="text-emerald-500/10 mb-8 group-hover:text-emerald-500 transition-all" size={60} />
                  <p className="text-[12px] uppercase tracking-[0.7em] font-black text-emerald-500">Draw Guidance</p>
                </div>
              ) : (
                <motion.div initial={{ rotateY: 90 }} animate={{ rotateY: 0 }} className="p-20 bg-white/[0.03] border border-emerald-500/20 rounded-[5rem] shadow-3xl">
                  <h3 className="text-5xl font-serif italic text-white mb-8">{tarotCard.name}</h3>
                  <p className="text-slate-400 text-lg italic mb-14 leading-relaxed">"{tarotCard.meaning}"</p>
                  <button onClick={() => setActiveTab('altar')} className="px-16 py-6 bg-emerald-500 text-black text-[11px] font-black uppercase tracking-[0.5em] rounded-2xl hover:bg-white transition-all cursor-pointer">Step Into Altar</button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* TAB 4: THE ALTAR */}
          {activeTab === 'altar' && (
            <motion.div key="altar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto pb-32">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-12">
                  <div className="bg-[#050c09] border border-emerald-500/20 p-20 rounded-[5rem] shadow-3xl relative overflow-hidden">
                    <div className="flex justify-between items-center mb-12">
                        <h3 className="text-[11px] uppercase tracking-[0.7em] text-emerald-500/40 font-black">Sacred Intention</h3>
                        <button onClick={() => setIncenseOn(!incenseOn)} className={`text-[10px] uppercase font-black px-5 py-2 rounded-full border transition-all ${incenseOn ? 'bg-emerald-500 text-black border-emerald-500' : 'border-white/10 text-slate-600'}`}>
                            {incenseOn ? "Smoke Rising" : "Light Incense"}
                        </button>
                    </div>
                    <textarea value={customIntent} onChange={(e) => setCustomIntent(e.target.value)} className="w-full bg-transparent border-none text-3xl italic text-emerald-50 h-64 focus:ring-0 text-center leading-relaxed font-serif" placeholder="Whisper your intent to the weave..." />
                    <button onClick={finalizeRitual} className="w-full py-10 mt-12 bg-emerald-500/5 border border-emerald-500/30 rounded-[3rem] text-emerald-400 font-black text-[14px] uppercase tracking-[0.7em] hover:bg-emerald-500/10 cursor-pointer">Seal Ritual in Grimoire</button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                     <div className="p-12 bg-white/[0.02] border border-white/5 rounded-[4rem]">
                        <h4 className="text-[10px] uppercase tracking-widest text-slate-600 font-black mb-8 flex items-center gap-3"><Beaker size={18}/> Kitchen Weaver</h4>
                        <p className="text-lg italic text-emerald-100/60 leading-relaxed font-serif">{analysis.brew}</p>
                     </div>
                     <div className="p-12 bg-white/[0.02] border border-white/5 rounded-[4rem]">
                        <h4 className="text-[10px] uppercase tracking-widest text-slate-600 font-black mb-8 flex items-center gap-3"><Wand2 size={18}/> Mouth of Power</h4>
                        <p className="text-xl italic text-white leading-relaxed font-serif">"{analysis.mantra}"</p>
                     </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="p-12 bg-white/[0.02] border border-white/5 rounded-[4rem] shadow-xl">
                    <p className="text-[11px] uppercase tracking-widest text-slate-600 font-black mb-10">Gathered Materia</p>
                    <div className="space-y-8">
                      {selectedMateria.map(m => (
                        <div key={m.id} className="flex items-center gap-5 text-lg italic text-emerald-200/80">
                          <div className={`${m.color} p-3 bg-white/5 rounded-2xl`}>{m.icon}</div> {m.name}
                        </div>
                      ))}
                      {tarotCard && <div className="pt-10 border-t border-white/10 text-lg italic text-blue-300 flex items-center gap-5"><Star size={22}/> {tarotCard.name}</div>}
                    </div>
                  </div>
                </div>
              </div>

              {/* PERMANENT JOURNAL (BOOK OF SHADOWS) */}
              <div className="mt-32">
                <h4 className="text-[12px] uppercase tracking-[0.6em] text-slate-700 font-black mb-14 ml-10 flex items-center gap-4"><Book size={18}/> The Eternal Book of Shadows</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {history.map((h, i) => (
                    <div key={i} className="p-12 bg-white/[0.01] border border-white/5 rounded-[4rem] group hover:bg-white/[0.03] hover:border-emerald-500/20 transition-all">
                        <p className="text-xl italic text-slate-400 group-hover:text-emerald-50 transition-colors leading-relaxed font-serif">"{h.text}"</p>
                        <div className="flex justify-between items-end mt-10">
                            <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest text-slate-600">
                                <span>{h.date}</span>
                                <span className="text-emerald-900">{h.tools.join(' • ')}</span>
                            </div>
                            <Sparkles size={20} className="text-slate-800 group-hover:text-emerald-500 transition-colors" />
                        </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}