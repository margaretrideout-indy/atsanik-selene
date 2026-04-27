import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Moon, Sparkles, Book, Leaf, Wind, Droplets, Flame, Mountain, 
  Shield, Sun, Clock, Zap, Eye, Heart, Star, Cloud, Plus, X, Layers, Coffee, Circle
} from 'lucide-react';

// --- DATABASE ---
const MATERIA_DATA = [
  /* Crystals */
  { id: 'c1', name: 'Moonstone', type: 'Crystal', property: 'Intuition', color: 'text-blue-200', icon: <Droplets size={18} /> },
  { id: 'c2', name: 'Amethyst', type: 'Crystal', property: 'Peace', color: 'text-indigo-400', icon: <Sparkles size={18} /> },
  { id: 'c3', name: 'Citrine', type: 'Crystal', property: 'Wealth', color: 'text-yellow-500', icon: <Sun size={18} /> },
  { id: 'c4', name: 'Rose Quartz', type: 'Crystal', property: 'Love', color: 'text-pink-300', icon: <Heart size={18} /> },
  { id: 'c5', name: 'Selenite', type: 'Crystal', property: 'Cleansing', color: 'text-slate-100', icon: <Zap size={18} /> },
  { id: 'c6', name: 'Labradorite', type: 'Crystal', property: 'Magic', color: 'text-cyan-400', icon: <Star size={18} /> },
  /* Herbs */
  { id: 'h1', name: 'Lavender', type: 'Herb', property: 'Peace', color: 'text-purple-400', icon: <Wind size={18} /> },
  { id: 'h2', name: 'Mugwort', type: 'Herb', property: 'Vision', color: 'text-emerald-500', icon: <Mountain size={18} /> },
  { id: 'h3', name: 'Rosemary', type: 'Herb', property: 'Memory', color: 'text-blue-400', icon: <Flame size={18} /> },
  { id: 'h4', name: 'Bay Leaf', type: 'Herb', property: 'Manifest', color: 'text-green-700', icon: <Leaf size={18} /> },
  /* Kitchen / Pantry */
  { id: 'k1', name: 'Salt', type: 'Pantry', property: 'Protection', color: 'text-slate-100', icon: <Circle size={18} /> },
  { id: 'k2', name: 'Cinnamon', type: 'Pantry', property: 'Speed', color: 'text-orange-800', icon: <Zap size={18} /> },
  { id: 'k3', name: 'Honey', type: 'Pantry', property: 'Sweetness', color: 'text-yellow-600', icon: <Droplets size={18} /> },
  { id: 'k4', name: 'Coffee', type: 'Pantry', property: 'Energy', color: 'text-amber-900', icon: <Coffee size={18} /> },
  { id: 'k5', name: 'Penny', type: 'Pantry', property: 'Money', color: 'text-orange-400', icon: <Sun size={18} /> },
  /* Candles */
  { id: 'ca1', name: 'White Candle', type: 'Candle', property: 'Cleansing', color: 'text-slate-100', icon: <Flame size={18} /> },
  { id: 'ca2', name: 'Black Candle', type: 'Candle', property: 'Protection', color: 'text-slate-900', icon: <Flame size={18} /> },
  { id: 'ca3', name: 'Pink Candle', type: 'Candle', property: 'Self-Love', color: 'text-pink-400', icon: <Flame size={18} /> },
  { id: 'ca4', name: 'Green Candle', type: 'Candle', property: 'Wealth', color: 'text-emerald-500', icon: <Flame size={18} /> }
];

const TAROT_DECK = [
  { name: "The Magician", meaning: "Manifestation, power, resourcefulness." },
  { name: "The High Priestess", meaning: "Intuition, subconscious mind." },
  { name: "The Star", meaning: "Hope, faith, purpose." },
  { name: "The Sun", meaning: "Success, vitality, joy." }
];

export default function Garden() {
  const [activeTab, setActiveTab] = useState('moon');
  const [subFilter, setSubFilter] = useState('Crystal');
  const [selectedMateria, setSelectedMateria] = useState([]);
  const [tarotCard, setTarotCard] = useState(null);
  const [intent, setIntent] = useState("");
  const [moonData, setMoonData] = useState({ phase: '...', illumination: 0, daysToFull: 0 });
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem('ritual_history') || '[]'));

  // Moon Calculation Logic
  useEffect(() => {
    const lp = 2551443; const now = new Date(); const newMoon = new Date('1970-01-07T20:35:00');
    const phaseCycle = ((now.getTime() - newMoon.getTime()) / 1000) % lp;
    const days = phaseCycle / (24 * 3600);
    let phase = days < 16.6 && days > 12.9 ? 'Full Moon' : days < 1.8 ? 'New Moon' : 'Waxing Phase';
    setMoonData({ phase, illumination: Math.round(Math.abs(50 - (days / 30 * 100)) * 2), daysToFull: (14.8 - days).toFixed(1) });
  }, []);

  // Spell Weaver Logic: Combines selected items into a prompt
  const generateSpell = () => {
    if (selectedMateria.length === 0) return "";
    const props = selectedMateria.map(m => m.property.toLowerCase());
    const names = selectedMateria.map(m => m.name);
    
    let base = `I am weaving a working for ${props.join(' and ')}. `;
    if (props.includes('protection')) base += `Using the shield of ${names.find(n => n.includes('Salt') || n.includes('Black')) || 'my tools'}, I banish what hinders me. `;
    if (props.includes('speed') || props.includes('energy')) base += `I call upon ${names.find(n => n === 'Cinnamon' || n === 'Coffee')} to bring swift results. `;
    if (props.includes('wealth') || props.includes('money')) base += `Like the ${names.find(n => n === 'Penny' || n === 'Citrine')}, my abundance grows. `;
    
    return base + "So it is.";
  };

  const toggleMateria = (item) => {
    if (selectedMateria.find(m => m.id === item.id)) {
      setSelectedMateria(selectedMateria.filter(m => m.id !== item.id));
    } else if (selectedMateria.length < 4) {
      setSelectedMateria([...selectedMateria, item]);
    }
  };

  const bindRitual = () => {
    const finalIntent = intent || generateSpell();
    if (!finalIntent) return;
    const entry = { text: finalIntent, date: new Date().toLocaleDateString(), tools: selectedMateria.map(m => m.name) };
    setHistory([entry, ...history].slice(0, 5));
    localStorage.setItem('ritual_history', JSON.stringify([entry, ...history].slice(0, 5)));
    setIntent(""); setSelectedMateria([]); setTarotCard(null); setActiveTab('moon');
  };

  return (
    <div className="min-h-screen bg-[#020604] text-slate-300 font-sans pb-20 selection:bg-emerald-500/20">
      {/* NAVIGATION */}
      <nav className="max-w-6xl mx-auto px-8 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <h1 className="text-xl font-light tracking-[0.5em] uppercase text-white">Selene</h1>
        <div className="flex bg-white/5 border border-white/10 p-1 rounded-2xl backdrop-blur-md">
          {['moon', 'library', 'oracle', 'altar'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-2 rounded-xl text-[9px] uppercase tracking-widest font-black transition-all ${activeTab === tab ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-600'}`}>
              {tab}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-8">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: MOON */}
          {activeTab === 'moon' && (
            <motion.div key="moon" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto text-center py-20 border border-white/5 rounded-[3rem] bg-white/[0.01]">
              <Moon size={48} className="mx-auto text-emerald-400 mb-6" />
              <h2 className="text-5xl font-serif italic text-white mb-2">{moonData.phase}</h2>
              <p className="text-[10px] text-emerald-500 tracking-[0.5em] uppercase mb-12">{moonData.illumination}% Illuminated</p>
              <button onClick={() => setActiveTab('library')} className="px-10 py-4 border border-emerald-500/30 rounded-full text-[9px] uppercase tracking-widest text-emerald-400 hover:bg-emerald-500/10 transition-all">Begin Gathering</button>
            </motion.div>
          )}

          {/* STEP 2: LIBRARY (Selection Mode) */}
          {activeTab === 'library' && (
            <motion.div key="lib" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex gap-6 mb-12 border-b border-white/5 pb-6 overflow-x-auto">
                {['Crystal', 'Herb', 'Pantry', 'Candle'].map(f => (
                  <button key={f} onClick={() => setSubFilter(f)} className={`text-[10px] uppercase tracking-widest font-black whitespace-nowrap ${subFilter === f ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-slate-600'}`}>{f}s</button>
                ))}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {MATERIA_DATA.filter(m => m.type === subFilter).map(item => {
                  const active = selectedMateria.find(s => s.id === item.id);
                  return (
                    <div key={item.id} onClick={() => toggleMateria(item)} className={`p-6 rounded-3xl border cursor-pointer transition-all ${active ? 'bg-emerald-500/10 border-emerald-500/50' : 'bg-white/5 border-white/5'}`}>
                      <div className={item.color}>{item.icon}</div>
                      <p className="mt-4 text-sm font-serif italic text-white">{item.name}</p>
                      <p className="text-[8px] uppercase tracking-widest text-slate-500">{item.property}</p>
                    </div>
                  );
                })}
              </div>
              <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-emerald-500 text-black px-12 py-4 rounded-full font-black text-[10px] uppercase tracking-[0.3em] cursor-pointer shadow-2xl" onClick={() => setActiveTab('oracle')}>Proceed to Guidance</div>
            </motion.div>
          )}

          {/* STEP 3: ORACLE */}
          {activeTab === 'oracle' && (
            <motion.div key="oracle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-xl mx-auto text-center py-20">
              {!tarotCard ? (
                <div onClick={() => setTarotCard(TAROT_DECK[Math.floor(Math.random()*4)])} className="aspect-[2/3] w-48 mx-auto border-2 border-dashed border-emerald-500/20 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-emerald-500/5 transition-all">
                  <Star className="text-emerald-500/30 mb-4" />
                  <p className="text-[9px] uppercase tracking-widest font-black text-emerald-500">Draw Guidance</p>
                </div>
              ) : (
                <div className="p-10 bg-white/5 border border-white/10 rounded-[2rem]">
                  <h3 className="text-3xl font-serif italic text-white mb-4">{tarotCard.name}</h3>
                  <p className="text-slate-400 italic text-sm mb-10">"{tarotCard.meaning}"</p>
                  <button onClick={() => setActiveTab('altar')} className="px-8 py-3 bg-emerald-500/20 text-emerald-400 text-[9px] uppercase font-black rounded-lg">Enter Altar</button>
                </div>
              )}
            </motion.div>
          )}

          {/* STEP 4: ALTAR */}
          {activeTab === 'altar' && (
            <motion.div key="altar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
              <div className="bg-[#050c09] border border-emerald-500/20 p-12 rounded-[3rem] shadow-2xl mb-12">
                <div className="flex justify-center gap-4 mb-8">
                  {selectedMateria.map(m => <div key={m.id} className={`p-3 bg-white/5 rounded-full ${m.color}`}>{m.icon}</div>)}
                </div>
                <h3 className="text-center font-serif italic text-white text-xl mb-8 uppercase tracking-widest">Ritual Weave</h3>
                <textarea 
                  value={intent || generateSpell()} 
                  onChange={(e) => setIntent(e.target.value)}
                  className="w-full bg-transparent border-none text-center text-xl italic text-emerald-100 h-40 focus:ring-0"
                />
                <button onClick={bindRitual} className="w-full py-5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-black text-[10px] uppercase tracking-[0.5em] rounded-2xl hover:bg-emerald-500/20">Seal the Working</button>
              </div>
              
              {history.map((h, i) => (
                <div key={i} className="p-6 border border-white/5 bg-white/[0.02] rounded-2xl mb-4 text-sm italic text-slate-500">
                  "{h.text}" <span className="float-right text-[8px] font-black not-italic text-emerald-900 uppercase">{h.date}</span>
                </div>
              ))}
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}