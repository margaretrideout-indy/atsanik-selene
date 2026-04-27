import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Moon, Sparkles, Book, Leaf, Wind, Droplets, Flame, Mountain, 
  Shield, Sun, Clock, Zap, Eye, Heart, Star, Cloud, Plus, X, Layers, Coffee, Circle, Search
} from 'lucide-react';

// --- MASTER DATABASE: 45+ ITEMS ---
const MASTER_DATA = [
  // CRYSTALS
  { id: 'c1', name: 'Moonstone', type: 'Crystal', property: 'Intuition', tags: ['psychic', 'dreams', 'feminine', 'vision'], color: 'text-blue-200', icon: <Droplets size={18} /> },
  { id: 'c2', name: 'Amethyst', type: 'Crystal', property: 'Peace', tags: ['anxiety', 'sleep', 'sobriety', 'calm'], color: 'text-indigo-400', icon: <Sparkles size={18} /> },
  { id: 'c3', name: 'Citrine', type: 'Crystal', property: 'Wealth', tags: ['money', 'success', 'joy', 'abundance'], color: 'text-yellow-500', icon: <Sun size={18} /> },
  { id: 'c4', name: 'Rose Quartz', type: 'Crystal', property: 'Love', tags: ['romance', 'self-love', 'healing', 'heart'], color: 'text-pink-300', icon: <Heart size={18} /> },
  { id: 'c5', name: 'Selenite', type: 'Crystal', property: 'Cleansing', tags: ['purify', 'aura', 'charging', 'white'], color: 'text-slate-100', icon: <Zap size={18} /> },
  { id: 'c6', name: 'Black Tourmaline', type: 'Crystal', property: 'Shield', tags: ['protection', 'grounding', 'negativity', 'boundaries'], color: 'text-slate-600', icon: <Shield size={18} /> },
  { id: 'c7', name: 'Labradorite', type: 'Crystal', property: 'Magic', tags: ['transformation', 'psychic', 'change', 'adventure'], color: 'text-cyan-400', icon: <Star size={18} /> },
  { id: 'c8', name: 'Tiger Eye', type: 'Crystal', property: 'Courage', tags: ['confidence', 'willpower', 'luck', 'strength'], color: 'text-orange-400', icon: <Sun size={18} /> },
  { id: 'c9', name: 'Lapis Lazuli', type: 'Crystal', property: 'Truth', tags: ['wisdom', 'voice', 'communication', 'truth'], color: 'text-blue-600', icon: <Eye size={18} /> },
  { id: 'c10', name: 'Obsidian', type: 'Crystal', property: 'Shadow', tags: ['truth', 'protection', 'root', 'banishing'], color: 'text-slate-900', icon: <Moon size={18} /> },

  // HERBS
  { id: 'h1', name: 'Lavender', type: 'Herb', property: 'Peace', tags: ['sleep', 'calm', 'anxiety', 'dreams'], color: 'text-purple-400', icon: <Wind size={18} /> },
  { id: 'h2', name: 'Mugwort', type: 'Herb', property: 'Vision', tags: ['dreams', 'astral', 'psychic', 'sleep'], color: 'text-emerald-500', icon: <Mountain size={18} /> },
  { id: 'h3', name: 'Rosemary', type: 'Herb', property: 'Memory', tags: ['focus', 'protection', 'clarity', 'cleansing'], color: 'text-blue-400', icon: <Flame size={18} /> },
  { id: 'h4', name: 'Bay Leaf', type: 'Herb', property: 'Manifest', tags: ['wishes', 'success', 'money', 'intent'], color: 'text-green-700', icon: <Leaf size={18} /> },
  { id: 'h5', name: 'Peppermint', type: 'Herb', property: 'Energy', tags: ['vitality', 'purify', 'headache', 'clear'], color: 'text-green-400', icon: <Zap size={18} /> },
  { id: 'h6', name: 'Chamomile', type: 'Herb', property: 'Calm', tags: ['anxiety', 'money', 'sleep', 'healing'], color: 'text-yellow-100', icon: <Droplets size={18} /> },
  { id: 'h7', name: 'Basil', type: 'Herb', property: 'Luck', tags: ['money', 'prosperity', 'home', 'business'], color: 'text-green-600', icon: <Heart size={18} /> },
  { id: 'h8', name: 'Cinnamon Sticks', type: 'Herb', property: 'Speed', tags: ['success', 'money', 'fast', 'passion'], color: 'text-orange-900', icon: <Zap size={18} /> },

  // PANTRY (KITCHEN WITCH)
  { id: 'k1', name: 'Sea Salt', type: 'Pantry', property: 'Protection', tags: ['banishing', 'cleansing', 'boundaries', 'grounding'], color: 'text-slate-100', icon: <Circle size={18} /> },
  { id: 'k2', name: 'Honey', type: 'Pantry', property: 'Sweetness', tags: ['love', 'attraction', 'friendship', 'kindness'], color: 'text-yellow-600', icon: <Droplets size={18} /> },
  { id: 'k3', name: 'Coffee Grounds', type: 'Pantry', property: 'Energy', tags: ['focus', 'haste', 'clarity', 'waking'], color: 'text-amber-900', icon: <Coffee size={18} /> },
  { id: 'k4', name: 'Black Pepper', type: 'Pantry', property: 'Banishing', tags: ['protection', 'warding', 'jealousy', 'exit'], color: 'text-slate-800', icon: <Zap size={18} /> },
  { id: 'k5', name: 'Shiny Penny', type: 'Pantry', property: 'Money', tags: ['wealth', 'earth', 'luck', 'copper'], color: 'text-orange-400', icon: <Sun size={18} /> },
  { id: 'k6', name: 'Sugar', type: 'Pantry', property: 'Attraction', tags: ['love', 'lust', 'friendship', 'sweet'], color: 'text-white', icon: <Droplets size={18} /> },

  // CANDLES
  { id: 'ca1', name: 'White Candle', type: 'Candle', property: 'Purity', tags: ['universal', 'cleansing', 'peace', 'spirit'], color: 'text-slate-100', icon: <Flame size={18} /> },
  { id: 'ca2', name: 'Black Candle', type: 'Candle', property: 'Protection', tags: ['banishing', 'shield', 'grief', 'end'], color: 'text-slate-900', icon: <Flame size={18} /> },
  { id: 'ca3', name: 'Red Candle', type: 'Candle', property: 'Passion', tags: ['lust', 'courage', 'strength', 'fire'], color: 'text-red-500', icon: <Flame size={18} /> },
  { id: 'ca4', name: 'Pink Candle', type: 'Candle', property: 'Love', tags: ['friendship', 'self-love', 'gentle', 'healing'], color: 'text-pink-400', icon: <Flame size={18} /> },
  { id: 'ca5', name: 'Green Candle', type: 'Candle', property: 'Wealth', tags: ['money', 'luck', 'growth', 'earth'], color: 'text-emerald-500', icon: <Flame size={18} /> },
  { id: 'ca6', name: 'Blue Candle', type: 'Candle', property: 'Truth', tags: ['communication', 'peace', 'wisdom', 'water'], color: 'text-blue-400', icon: <Flame size={18} /> }
];

const TAROT_DECK = [
  { name: "The Fool", meaning: "A fresh start, trust in the universe, and child-like wonder." },
  { name: "The Magician", meaning: "The power to manifest. You have all the tools you need." },
  { name: "The High Priestess", meaning: "Look inward. Trust your intuition and hidden knowledge." },
  { name: "The Empress", meaning: "Nurturing energy, abundance, and creative growth." },
  { name: "The Tower", meaning: "Sudden change that clears the way for a better foundation." },
  { name: "The Star", meaning: "Hope, serenity, and feeling connected to the divine." }
];

export default function Garden() {
  const [activeTab, setActiveTab] = useState('moon');
  const [subFilter, setSubFilter] = useState('Crystal');
  const [searchQuery, setSearchQuery] = useState("");
  
  // Ritual State
  const [selectedMateria, setSelectedMateria] = useState([]);
  const [tarotCard, setTarotCard] = useState(null);
  const [customIntent, setCustomIntent] = useState("");
  const [moonData, setMoonData] = useState({ phase: 'Full Moon', illumination: 98, daysToFull: 0 });
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem('ritual_history') || '[]'));

  // Logic: Live Spell Generation
  const generatedSpell = useMemo(() => {
    if (selectedMateria.length === 0) return "";
    const names = selectedMateria.map(m => m.name);
    const props = selectedMateria.map(m => m.property.toLowerCase());
    
    let text = `By the ${moonData.illumination}% light of the ${moonData.phase}, I call upon ${names.join(' and ')}. `;
    text += `May their combined power of ${props.join(', ')} bring my intent to life. `;
    
    if (props.includes('protection')) text += "I build a wall that no negativity can breach. ";
    if (props.includes('money') || props.includes('wealth')) text += "I invite the current of prosperity into my home. ";
    if (props.includes('love')) text += "I open my frequency to the harmony of true connection. ";
    if (props.includes('speed') || props.includes('energy')) text += "Let this magic take root with haste and power. ";

    return text + "As I will it, so mote it be.";
  }, [selectedMateria, moonData]);

  const toggleMateria = (item) => {
    if (selectedMateria.find(m => m.id === item.id)) {
      setSelectedMateria(prev => prev.filter(m => m.id !== item.id));
    } else if (selectedMateria.length < 4) {
      setSelectedMateria(prev => [...prev, item]);
    }
  };

  const finalizeRitual = () => {
    const finalContent = customIntent || generatedSpell;
    if (!finalContent) return;
    const entry = { text: finalContent, date: new Date().toLocaleDateString(), tools: selectedMateria.map(m => m.name) };
    const newHistory = [entry, ...history].slice(0, 5);
    setHistory(newHistory);
    localStorage.setItem('ritual_history', JSON.stringify(newHistory));
    setCustomIntent(""); setSelectedMateria([]); setTarotCard(null); setActiveTab('moon');
  };

  const filteredList = MASTER_DATA.filter(item => {
    const matchesTab = item.type === subFilter;
    const matchesSearch = searchQuery === "" || 
                          item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.tags.some(tag => tag.includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#020806] text-slate-300 font-sans pb-32 selection:bg-emerald-500/30">
      
      {/* HEADER NAV */}
      <nav className="max-w-6xl mx-auto px-8 py-10 flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex items-center gap-3">
          <Moon className="text-emerald-400 animate-pulse" size={24} />
          <h1 className="text-2xl font-light tracking-[0.6em] uppercase text-white">Selene</h1>
        </div>
        
        <div className="flex bg-white/[0.03] border border-white/10 p-1.5 rounded-2xl backdrop-blur-3xl shadow-2xl relative z-50">
          {[
            { id: 'moon', icon: <Clock size={14}/>, label: 'Cycle' },
            { id: 'library', icon: <Book size={14}/>, label: 'Archive' },
            { id: 'oracle', icon: <Star size={14}/>, label: 'Oracle' },
            { id: 'altar', icon: <Flame size={14}/>, label: 'Altar' }
          ].map(tab => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] uppercase tracking-widest font-black transition-all cursor-pointer ${activeTab === tab.id ? 'bg-emerald-500/20 text-emerald-300 shadow-inner' : 'text-slate-600 hover:text-slate-400'}`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-8 relative z-10">
        <AnimatePresence mode="wait">
          
          {/* 1. MOON CYCLE */}
          {activeTab === 'moon' && (
            <motion.div key="moon" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-3xl mx-auto text-center py-20 bg-white/[0.01] border border-white/5 rounded-[4rem] relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-500/5 blur-[120px] pointer-events-none" />
              <Moon size={80} className="mx-auto text-emerald-400 mb-10 drop-shadow-[0_0_25px_rgba(52,211,153,0.4)]" />
              <h2 className="text-6xl font-serif italic text-white mb-4 tracking-tight">{moonData.phase}</h2>
              <p className="text-emerald-500 tracking-[0.7em] text-[10px] font-black uppercase mb-16">System Illumination: {moonData.illumination}%</p>
              <button 
                onClick={() => setActiveTab('library')}
                className="px-14 py-5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] font-black uppercase tracking-[0.5em] text-emerald-400 hover:bg-emerald-500/20 transition-all cursor-pointer"
              >
                Access Archive
              </button>
            </motion.div>
          )}

          {/* 2. THE ARCHIVE (LIBRARY) */}
          {activeTab === 'library' && (
            <motion.div key="lib" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-20">
              <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-16 border-b border-white/5 pb-10">
                <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10 shadow-xl">
                  {['Crystal', 'Herb', 'Pantry', 'Candle'].map(type => (
                    <button 
                      key={type} 
                      onClick={() => setSubFilter(type)} 
                      className={`px-6 py-3 rounded-xl text-[10px] uppercase font-black tracking-widest transition-all cursor-pointer ${subFilter === type ? 'bg-emerald-500/20 text-emerald-400 shadow-inner' : 'text-slate-600 hover:text-slate-500'}`}
                    >
                      {type}s
                    </button>
                  ))}
                </div>
                <div className="relative w-full lg:w-96 group">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-emerald-500 transition-colors" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search intent (e.g. money, anxiety, love)..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-slate-700 text-emerald-100 shadow-2xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredList.map(item => {
                  const isActive = selectedMateria.find(s => s.id === item.id);
                  return (
                    <motion.div 
                      key={item.id} 
                      layout
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleMateria(item)}
                      className={`p-8 rounded-[2.5rem] border cursor-pointer transition-all relative overflow-hidden group ${isActive ? 'bg-emerald-500/10 border-emerald-500/40 shadow-[0_0_30px_rgba(52,211,153,0.1)]' : 'bg-white/[0.02] border-white/5 hover:border-emerald-500/20 shadow-xl'}`}
                    >
                      <div className={`mb-6 p-4 rounded-2xl w-fit bg-white/5 ${item.color} group-hover:scale-110 transition-transform`}>{item.icon}</div>
                      <h4 className="text-lg font-serif italic text-white group-hover:text-emerald-400 transition-colors">{item.name}</h4>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mt-2 font-bold">{item.property}</p>
                    </motion.div>
                  );
                })}
              </div>

              <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 flex gap-4">
                 <div className="bg-[#050c09] border border-emerald-500/20 px-8 py-4 rounded-full flex items-center gap-6 shadow-2xl backdrop-blur-3xl">
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 font-black">Capacity: {selectedMateria.length} / 4</p>
                    <div className="h-4 w-[1px] bg-white/10" />
                    <button 
                      onClick={() => setActiveTab('oracle')}
                      className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 hover:text-white transition-colors cursor-pointer"
                    >
                      Continue to Oracle
                    </button>
                 </div>
              </div>
            </motion.div>
          )}

          {/* 3. THE ORACLE */}
          {activeTab === 'oracle' && (
            <motion.div key="oracle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-xl mx-auto text-center py-20 relative z-20">
              {!tarotCard ? (
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setTarotCard(TAROT_DECK[Math.floor(Math.random() * TAROT_DECK.length)])} 
                  className="aspect-[2/3] w-64 mx-auto bg-emerald-500/5 border-2 border-dashed border-emerald-500/20 rounded-[3rem] flex flex-col items-center justify-center cursor-pointer group shadow-2xl"
                >
                  <Star className="text-emerald-500/20 mb-6 group-hover:text-emerald-500 group-hover:rotate-12 transition-all" size={50} />
                  <p className="text-[11px] uppercase tracking-[0.6em] font-black text-emerald-500 group-hover:tracking-[0.8em] transition-all">Flip Card</p>
                </motion.div>
              ) : (
                <motion.div initial={{ rotateY: 90 }} animate={{ rotateY: 0 }} className="p-16 bg-white/[0.03] border border-emerald-500/20 rounded-[4rem] shadow-2xl shadow-emerald-500/5">
                  <h3 className="text-4xl font-serif italic text-white mb-6 tracking-tight">{tarotCard.name}</h3>
                  <p className="text-slate-400 text-md italic mb-12 leading-relaxed font-light">"{tarotCard.meaning}"</p>
                  <button onClick={() => setActiveTab('altar')} className="px-14 py-5 bg-emerald-500 text-black text-[10px] font-black uppercase tracking-[0.4em] rounded-2xl hover:bg-white transition-all cursor-pointer">Proceed to Altar</button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* 4. THE ALTAR (WEAVER) */}
          {activeTab === 'altar' && (
            <motion.div key="altar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto relative z-20 pb-20">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 bg-[#050c09] border border-emerald-500/20 p-14 rounded-[4rem] shadow-3xl relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 opacity-[0.03] rotate-12"><Flame size={240} /></div>
                  <h3 className="text-center text-[10px] uppercase tracking-[0.6em] text-emerald-500/40 mb-12 font-black">Sacred Intention</h3>
                  <textarea 
                    value={customIntent || generatedSpell} 
                    onChange={(e) => setCustomIntent(e.target.value)}
                    className="w-full bg-transparent border-none text-2xl italic text-emerald-50/90 h-64 focus:ring-0 text-center leading-relaxed font-serif placeholder:text-slate-900"
                  />
                  <button 
                    onClick={finalizeRitual} 
                    className="w-full py-8 mt-10 bg-emerald-500/5 border border-emerald-500/30 rounded-3xl text-emerald-400 font-black text-[12px] uppercase tracking-[0.6em] hover:bg-emerald-500/10 transition-all cursor-pointer shadow-xl"
                  >
                    Seal the Working
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="p-10 bg-white/[0.02] border border-white/5 rounded-[3rem] shadow-xl">
                    <p className="text-[10px] uppercase tracking-widest text-slate-600 font-black mb-8">Active Tools</p>
                    <div className="space-y-6">
                      {selectedMateria.map(m => (
                        <div key={m.id} className="flex items-center gap-4 text-sm italic text-emerald-200/80 group">
                          <div className={`${m.color} p-2 bg-white/5 rounded-xl group-hover:scale-110 transition-transform`}>{m.icon}</div> {m.name}
                        </div>
                      ))}
                      {tarotCard && <div className="pt-6 border-t border-white/10 text-sm italic text-blue-300 flex items-center gap-4"><Star size={18} className="text-blue-500"/> {tarotCard.name}</div>}
                      {selectedMateria.length === 0 && <p className="text-xs text-slate-800 uppercase tracking-widest py-10 text-center italic">No items gathered...</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* RITUAL LOG (BOOK OF SHADOWS) */}
              <div className="mt-24">
                <h4 className="text-[11px] uppercase tracking-[0.5em] text-slate-700 font-black mb-10 ml-6 flex items-center gap-4">
                  <Book size={14}/> The Book of Shadows
                </h4>
                <div className="space-y-6">
                  {history.map((h, i) => (
                    <motion.div 
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      key={i} 
                      className="p-10 bg-white/[0.01] border border-white/5 rounded-[2.5rem] flex justify-between items-center group hover:bg-white/[0.03] hover:border-emerald-500/10 transition-all shadow-xl"
                    >
                      <div className="max-w-[85%]">
                        <p className="text-lg italic text-slate-400 group-hover:text-emerald-100 transition-colors leading-relaxed">"{h.text}"</p>
                        <div className="flex gap-6 mt-6 text-[9px] font-black uppercase tracking-[0.2em] text-slate-600">
                          <span className="flex items-center gap-2"><Clock size={10}/> {h.date}</span>
                          <span className="text-emerald-900 group-hover:text-emerald-600 transition-colors">{h.tools.join(' • ')}</span>
                        </div>
                      </div>
                      <Sparkles size={20} className="text-slate-800 group-hover:text-emerald-500/30 transition-all" />
                    </motion.div>
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