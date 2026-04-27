import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Moon, Sparkles, Book, Leaf, Wind, Droplets, Flame, Mountain, 
  Shield, Sun, Clock, Zap, Eye, Heart, Star, Cloud, Plus, X, Layers, Coffee, Circle, Search
} from 'lucide-react';

// --- THE MASTER DATABASE ---
const MASTER_DATA = [
  // CRYSTALS
  { id: 'c1', name: 'Moonstone', type: 'Crystal', property: 'Intuition', tags: ['psychic', 'dreams', 'feminine'], color: 'text-blue-200', icon: <Droplets size={18} /> },
  { id: 'c2', name: 'Amethyst', type: 'Crystal', property: 'Peace', tags: ['anxiety', 'sleep', 'sobriety'], color: 'text-indigo-400', icon: <Sparkles size={18} /> },
  { id: 'c3', name: 'Citrine', type: 'Crystal', property: 'Wealth', tags: ['money', 'success', 'joy'], color: 'text-yellow-500', icon: <Sun size={18} /> },
  { id: 'c4', name: 'Rose Quartz', type: 'Crystal', property: 'Love', tags: ['romance', 'self-love', 'healing'], color: 'text-pink-300', icon: <Heart size={18} /> },
  { id: 'c5', name: 'Selenite', type: 'Crystal', property: 'Cleansing', tags: ['purify', 'aura', 'charging'], color: 'text-slate-100', icon: <Zap size={18} /> },
  { id: 'c6', name: 'Black Tourmaline', type: 'Crystal', property: 'Shield', tags: ['protection', 'grounding', 'negativity'], color: 'text-slate-600', icon: <Shield size={18} /> },
  { id: 'c7', name: 'Labradorite', type: 'Crystal', property: 'Magic', tags: ['transformation', 'psychic', 'change'], color: 'text-cyan-400', icon: <Star size={18} /> },
  { id: 'c8', name: 'Tiger Eye', type: 'Crystal', property: 'Courage', tags: ['confidence', 'willpower', 'luck'], color: 'text-orange-400', icon: <Sun size={18} /> },
  
  // HERBS
  { id: 'h1', name: 'Lavender', type: 'Herb', property: 'Peace', tags: ['sleep', 'calm', 'anxiety'], color: 'text-purple-400', icon: <Wind size={18} /> },
  { id: 'h2', name: 'Mugwort', type: 'Herb', property: 'Vision', tags: ['dreams', 'astral', 'psychic'], color: 'text-emerald-500', icon: <Mountain size={18} /> },
  { id: 'h3', name: 'Rosemary', type: 'Herb', property: 'Memory', tags: ['focus', 'protection', 'clarity'], color: 'text-blue-400', icon: <Flame size={18} /> },
  { id: 'h4', name: 'Bay Leaf', type: 'Herb', property: 'Manifest', tags: ['wishes', 'success', 'money'], color: 'text-green-700', icon: <Leaf size={18} /> },
  { id: 'h5', name: 'Peppermint', type: 'Herb', property: 'Energy', tags: ['vitality', 'purify', 'headache'], color: 'text-green-400', icon: <Zap size={18} /> },
  { id: 'h6', name: 'Thyme', type: 'Herb', property: 'Bravery', tags: ['courage', 'health', 'past'], color: 'text-green-500', icon: <Shield size={18} /> },
  
  // PANTRY (KITCHEN WITCH)
  { id: 'k1', name: 'Salt', type: 'Pantry', property: 'Protection', tags: ['banishing', 'cleansing', 'boundaries'], color: 'text-slate-100', icon: <Circle size={18} /> },
  { id: 'k2', name: 'Cinnamon', type: 'Pantry', property: 'Speed', tags: ['money', 'success', 'passion', 'fast'], color: 'text-orange-800', icon: <Zap size={18} /> },
  { id: 'k3', name: 'Honey', type: 'Pantry', property: 'Sweetness', tags: ['love', 'attraction', 'friendship'], color: 'text-yellow-600', icon: <Droplets size={18} /> },
  { id: 'k4', name: 'Coffee', type: 'Pantry', property: 'Energy', tags: ['focus', 'haste', 'clarity'], color: 'text-amber-900', icon: <Coffee size={18} /> },
  { id: 'k5', name: 'Black Pepper', type: 'Pantry', property: 'Banishing', tags: ['protection', 'warding', 'jealousy'], color: 'text-slate-800', icon: <Zap size={18} /> },
  { id: 'k6', name: 'Penny', type: 'Pantry', property: 'Money', tags: ['wealth', 'earth', 'luck'], color: 'text-orange-400', icon: <Sun size={18} /> },

  // CANDLES
  { id: 'ca1', name: 'White Candle', type: 'Candle', property: 'Purity', tags: ['universal', 'cleansing', 'peace'], color: 'text-slate-100', icon: <Flame size={18} /> },
  { id: 'ca2', name: 'Black Candle', type: 'Candle', property: 'Protection', tags: ['banishing', 'shield', 'grief'], color: 'text-slate-900', icon: <Flame size={18} /> },
  { id: 'ca3', name: 'Red Candle', type: 'Candle', property: 'Passion', tags: ['lust', 'courage', 'strength'], color: 'text-red-500', icon: <Flame size={18} /> },
  { id: 'ca4', name: 'Pink Candle', type: 'Candle', property: 'Love', tags: ['friendship', 'self-love', 'gentle'], color: 'text-pink-400', icon: <Flame size={18} /> },
  { id: 'ca5', name: 'Green Candle', type: 'Candle', property: 'Wealth', tags: ['money', 'luck', 'growth'], color: 'text-emerald-500', icon: <Flame size={18} /> }
];

const TAROT_DECK = [
  { name: "The Fool", meaning: "Leap of faith, new journey, innocence." },
  { name: "The Magician", meaning: "Manifestation, resourcefulness, taking action." },
  { name: "The High Priestess", meaning: "Intuition, mystery, inner voice." },
  { name: "The Star", meaning: "Hope, renewal, spiritual guidance." },
  { name: "The Moon", meaning: "Subconscious, illusion, trust your gut." },
  { name: "The Sun", meaning: "Success, vitality, absolute joy." }
];

export default function Garden() {
  const [activeTab, setActiveTab] = useState('moon');
  const [subFilter, setSubFilter] = useState('Crystal');
  const [searchQuery, setSearchQuery] = useState("");
  
  // Ritual State
  const [selectedMateria, setSelectedMateria] = useState([]);
  const [tarotCard, setTarotCard] = useState(null);
  const [customIntent, setCustomIntent] = useState("");
  const [moonData, setMoonData] = useState({ phase: '...', illumination: 0, daysToFull: 0 });
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem('ritual_history') || '[]'));

  useEffect(() => {
    const lp = 2551443; const now = new Date(); const newMoon = new Date('1970-01-07T20:35:00');
    const phaseCycle = ((now.getTime() - newMoon.getTime()) / 1000) % lp;
    const days = phaseCycle / (24 * 3600);
    let phase = days < 1.8 ? 'New Moon' : days < 12.9 ? 'Waxing Moon' : days < 16.6 ? 'Full Moon' : 'Waning Moon';
    setMoonData({ phase, illumination: Math.round(Math.abs(50 - (days / 30 * 100)) * 2), daysToFull: (14.8 - days).toFixed(1) });
  }, []);

  // --- AUTO-SPELL WEAVER LOGIC ---
  const generatedSpell = useMemo(() => {
    if (selectedMateria.length === 0) return "Choose your tools to weave a spell...";
    
    const names = selectedMateria.map(m => m.name);
    const props = selectedMateria.map(m => m.property.toLowerCase());
    
    let text = `By the light of the ${moonData.phase}, I gather ${names.join(', ')}. `;
    text += `I weave this working for ${props.join(' and ')}. `;
    
    if (props.includes('protection')) text += "I set a boundary that no harm may cross. ";
    if (props.includes('money') || props.includes('wealth')) text += "As these tools are set, so let my abundance flow. ";
    if (props.includes('speed')) text += "Let this intent manifest with great haste. ";
    if (props.includes('love')) text += "I open my heart to the resonance of harmony. ";

    return text + "So it is done.";
  }, [selectedMateria, moonData.phase]);

  const toggleMateria = (item) => {
    if (selectedMateria.find(m => m.id === item.id)) {
      setSelectedMateria(selectedMateria.filter(m => m.id !== item.id));
    } else if (selectedMateria.length < 4) {
      setSelectedMateria([...selectedMateria, item]);
    }
  };

  const finalizeRitual = () => {
    const finalContent = customIntent || generatedSpell;
    const entry = { text: finalContent, date: new Date().toLocaleDateString(), tools: selectedMateria.map(m => m.name) };
    const newHistory = [entry, ...history].slice(0, 5);
    setHistory(newHistory);
    localStorage.setItem('ritual_history', JSON.stringify(newHistory));
    // Reset
    setCustomIntent(""); setSelectedMateria([]); setTarotCard(null); setActiveTab('moon');
  };

  // Search/Filter Logic
  const filteredList = MASTER_DATA.filter(item => {
    const matchesTab = item.type === subFilter;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.tags.some(tag => tag.includes(searchQuery.toLowerCase()));
    return matchesTab && (searchQuery === "" ? true : matchesSearch);
  }).sort((a,b) => a.name.localeCompare(b.name));

  return (
    <div className="min-h-screen bg-[#030a08] text-slate-300 font-sans pb-32">
      {/* STEPS NAVIGATION */}
      <nav className="max-w-5xl mx-auto px-8 py-10 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <Moon className="text-emerald-400" size={20} />
          <h1 className="text-lg font-light tracking-[0.6em] uppercase text-white">Selene</h1>
        </div>
        <div className="flex bg-white/5 border border-white/10 p-1 rounded-2xl backdrop-blur-xl">
          {[
            { id: 'moon', label: 'Timing' },
            { id: 'library', label: 'Gather' },
            { id: 'oracle', label: 'Guidance' },
            { id: 'altar', label: 'Altar' }
          ].map((tab, idx) => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-[9px] uppercase tracking-widest font-black transition-all ${activeTab === tab.id ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-600 hover:text-slate-400'}`}
            >
              {idx + 1}. {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-8">
        <AnimatePresence mode="wait">
          
          {/* 1. MOON TAB */}
          {activeTab === 'moon' && (
            <motion.div key="moon" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="max-w-3xl mx-auto text-center py-16 bg-white/[0.02] border border-white/5 rounded-[4rem]">
              <Moon size={60} className="mx-auto text-emerald-400 mb-8 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]" />
              <h2 className="text-5xl font-serif italic text-white mb-4">{moonData.phase}</h2>
              <div className="flex justify-center gap-8 mb-12">
                <div className="text-center">
                  <p className="text-[8px] uppercase tracking-widest text-slate-500 mb-1">Illumination</p>
                  <p className="text-xl text-emerald-100">{moonData.illumination}%</p>
                </div>
                <div className="w-[1px] bg-white/10" />
                <div className="text-center">
                  <p className="text-[8px] uppercase tracking-widest text-slate-500 mb-1">Full In</p>
                  <p className="text-xl text-emerald-100">{moonData.daysToFull} Days</p>
                </div>
              </div>
              <button onClick={() => setActiveTab('library')} className="group px-12 py-4 bg-emerald-500/5 border border-emerald-500/20 rounded-full text-[10px] uppercase tracking-[0.4em] font-black text-emerald-400 hover:bg-emerald-500/20 transition-all">
                Enter the Archive
              </button>
            </motion.div>
          )}

          {/* 2. LIBRARY TAB */}
          {activeTab === 'library' && (
            <motion.div key="lib" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
                <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                  {['Crystal', 'Herb', 'Pantry', 'Candle'].map(type => (
                    <button key={type} onClick={() => setSubFilter(type)} className={`px-4 py-2 rounded-lg text-[9px] uppercase font-black tracking-widest ${subFilter === type ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-600'}`}>{type}s</button>
                  ))}
                </div>
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={14} />
                  <input 
                    type="text" 
                    placeholder="Search intent (e.g. sleep)..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-10 pr-4 text-xs focus:ring-1 focus:ring-emerald-500/50 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredList.map(item => {
                  const active = selectedMateria.find(s => s.id === item.id);
                  return (
                    <motion.div 
                      layout
                      key={item.id} 
                      onClick={() => toggleMateria(item)}
                      className={`p-6 rounded-[2rem] border cursor-pointer transition-all ${active ? 'bg-emerald-500/10 border-emerald-500/50 shadow-lg' : 'bg-white/[0.03] border-white/5 hover:border-white/20'}`}
                    >
                      <div className={`mb-4 ${item.color}`}>{item.icon}</div>
                      <h4 className="text-sm font-serif italic text-white">{item.name}</h4>
                      <p className="text-[9px] uppercase tracking-widest text-slate-500 mt-1">{item.property}</p>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-12 p-6 bg-emerald-500/5 border border-dashed border-emerald-500/20 rounded-2xl flex justify-between items-center">
                <p className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold">Selected: {selectedMateria.length} / 4</p>
                <button onClick={() => setActiveTab('oracle')} className="text-[10px] font-black uppercase tracking-[0.3em] text-white bg-emerald-500 px-8 py-3 rounded-full">Consult Oracle</button>
              </div>
            </motion.div>
          )}

          {/* 3. ORACLE TAB */}
          {activeTab === 'oracle' && (
            <motion.div key="oracle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-lg mx-auto text-center py-20">
              {!tarotCard ? (
                <div onClick={() => setTarotCard(TAROT_DECK[Math.floor(Math.random() * TAROT_DECK.length)])} className="aspect-[2/3] w-56 mx-auto bg-emerald-500/5 border-2 border-dashed border-emerald-500/20 rounded-3xl flex flex-col items-center justify-center cursor-pointer group">
                  <Star className="text-emerald-500/30 mb-4 group-hover:scale-125 transition-transform" size={40} />
                  <p className="text-[10px] uppercase tracking-[0.5em] font-black text-emerald-500">Flip for Guidance</p>
                </div>
              ) : (
                <motion.div initial={{ rotateY: 90 }} animate={{ rotateY: 0 }} className="p-12 bg-white/5 border border-emerald-500/20 rounded-[3rem]">
                  <h3 className="text-3xl font-serif italic text-white mb-4">{tarotCard.name}</h3>
                  <p className="text-slate-400 text-sm italic mb-10 leading-relaxed">"{tarotCard.meaning}"</p>
                  <button onClick={() => setActiveTab('altar')} className="px-10 py-3 bg-emerald-500 text-black text-[10px] font-black uppercase tracking-widest rounded-full">Enter the Altar</button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* 4. ALTAR TAB */}
          {activeTab === 'altar' && (
            <motion.div key="altar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-[#050c09] border border-emerald-500/20 p-10 rounded-[3.5rem] shadow-2xl relative">
                  <h3 className="text-center text-xs uppercase tracking-[0.5em] text-slate-500 mb-8">The Manifestation</h3>
                  <textarea 
                    value={customIntent || generatedSpell} 
                    onChange={(e) => setCustomIntent(e.target.value)}
                    className="w-full bg-transparent border-none text-xl italic text-emerald-100 h-48 focus:ring-0 text-center leading-relaxed"
                  />
                  <button onClick={finalizeRitual} className="w-full py-6 mt-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 font-black text-[10px] uppercase tracking-[0.5em] hover:bg-emerald-500/20 transition-all">
                    Seal & Bind Ritual
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem]">
                    <p className="text-[9px] uppercase tracking-widest text-slate-600 font-black mb-6">Current Tools</p>
                    <div className="space-y-4">
                      {selectedMateria.map(m => (
                        <div key={m.id} className="flex items-center gap-3 text-xs italic text-emerald-200">
                          <div className={m.color}>{m.icon}</div> {m.name}
                        </div>
                      ))}
                      {tarotCard && <div className="pt-4 border-t border-white/10 text-xs italic text-blue-300"><Star size={14} className="inline mr-2"/>{tarotCard.name}</div>}
                    </div>
                  </div>
                </div>
              </div>

              {/* ARCHIVE LOG */}
              <div className="mt-20">
                <h4 className="text-[10px] uppercase tracking-[0.4em] text-slate-700 font-black mb-6 ml-4">The Book of Shadows</h4>
                <div className="space-y-4">
                  {history.map((h, i) => (
                    <div key={i} className="p-8 bg-white/[0.01] border border-white/5 rounded-3xl flex justify-between items-center group hover:bg-white/[0.03] transition-all">
                      <div>
                        <p className="text-sm italic text-slate-400 group-hover:text-emerald-100 transition-colors">"{h.text}"</p>
                        <div className="flex gap-4 mt-3 text-[8px] font-black uppercase tracking-widest text-slate-600">
                          <span>{h.date}</span>
                          <span className="text-emerald-900">{h.tools.join(' • ')}</span>
                        </div>
                      </div>
                      <Sparkles size={16} className="text-slate-800 group-hover:text-emerald-500/40" />
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