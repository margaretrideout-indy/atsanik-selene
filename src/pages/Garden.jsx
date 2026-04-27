import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Moon, Sparkles, Book, Leaf, Calendar, PenTool, Wind, Droplets, 
  Flame, Mountain, Shield, Sun, Clock, History, Zap, Eye, Heart, Star
} from 'lucide-react';

// --- DATA ORGANIZED BY CATEGORY ---
const MATERIA_DATA = [
  // CRYSTALS
  { id: 'c1', name: 'Moonstone', type: 'Crystal', element: 'Water', property: 'Intuition', chakra: 'Crown', planet: 'Moon', synergy: 'Mugwort', description: 'Connects to the divine feminine. Best used for new beginnings.', icon: <Droplets size={18} />, color: 'text-blue-200', theme: 'border-blue-500/20' },
  { id: 'c2', name: 'Amethyst', type: 'Crystal', element: 'Spirit', property: 'Peace', chakra: 'Crown', planet: 'Jupiter', synergy: 'Lavender', description: 'Transmutes negative energy into love. Protects from psychic attack.', icon: <Sparkles size={18} />, color: 'text-indigo-400', theme: 'border-indigo-500/20' },
  { id: 'c3', name: 'Citrine', type: 'Crystal', element: 'Fire', property: 'Wealth', chakra: 'Solar Plexus', planet: 'Sun', synergy: 'Rosemary', description: 'The stone of manifestation. It does not hold negative energy.', icon: <Sun size={18} />, color: 'text-yellow-500', theme: 'border-yellow-500/20' },
  { id: 'c4', name: 'Rose Quartz', type: 'Crystal', element: 'Water', property: 'Love', chakra: 'Heart', planet: 'Venus', synergy: 'Sage', description: 'The stone of unconditional love and infinite peace.', icon: <Heart size={18} />, color: 'text-pink-300', theme: 'border-pink-500/20' },
  { id: 'c5', name: 'Selenite', type: 'Crystal', element: 'Spirit', property: 'Cleansing', chakra: 'Crown', planet: 'Moon', synergy: 'Black Tourmaline', description: 'Ideal for clearing the aura and charging other crystals.', icon: <Zap size={18} />, color: 'text-slate-100', theme: 'border-slate-300/20' },
  { id: 'c6', name: 'Black Tourmaline', type: 'Crystal', element: 'Earth', property: 'Shield', chakra: 'Root', planet: 'Saturn', synergy: 'Selenite', description: 'Repels and protects against negativity.', icon: <Shield size={18} />, color: 'text-slate-600', theme: 'border-slate-800/40' },
  { id: 'c7', name: 'Lapis Lazuli', type: 'Crystal', element: 'Air', property: 'Truth', chakra: 'Throat', planet: 'Venus', synergy: 'Sodalite', description: 'Encourages self-awareness and reveals inner truth.', icon: <Eye size={18} />, color: 'text-blue-600', theme: 'border-blue-700/20' },
  { id: 'c8', name: 'Tiger Eye', type: 'Crystal', element: 'Earth', property: 'Courage', chakra: 'Solar Plexus', planet: 'Sun', synergy: 'Clear Quartz', description: 'A stone of protection and stabilizing energy.', icon: <Sun size={18} />, color: 'text-orange-400', theme: 'border-orange-500/20' },
  { id: 'c9', name: 'Clear Quartz', type: 'Crystal', element: 'Spirit', property: 'Amplify', chakra: 'Crown', planet: 'Sun', synergy: 'All', description: 'The master healer. Amplifies energy and thought.', icon: <Sparkles size={18} />, color: 'text-slate-200', theme: 'border-white/20' },
  
  // HERBS
  { id: 'h1', name: 'Moonlight Lavender', type: 'Herb', element: 'Air', property: 'Dreams', chakra: 'Third Eye', planet: 'Mercury', synergy: 'Amethyst', description: 'Harvest during a waning moon for dream work.', icon: <Wind size={18} />, color: 'text-purple-400', theme: 'border-emerald-500/20' },
  { id: 'h2', name: 'Mugwort', type: 'Herb', element: 'Earth', property: 'Astral', chakra: 'Third Eye', planet: 'Moon', synergy: 'Moonstone', description: 'A powerful visionary herb for scrying mirrors.', icon: <Mountain size={18} />, color: 'text-emerald-500', theme: 'border-emerald-500/20' },
  { id: 'h3', name: 'Rosemary', type: 'Herb', element: 'Fire', property: 'Memory', chakra: 'Third Eye', planet: 'Sun', synergy: 'Citrine', description: 'Associated with remembrance and mental clarity.', icon: <Flame size={18} />, color: 'text-blue-400', theme: 'border-emerald-500/20' },
  { id: 'h4', name: 'White Sage', type: 'Herb', element: 'Fire', property: 'Purify', chakra: 'Root', planet: 'Jupiter', synergy: 'Selenite', description: 'Used to bless and cleanse spaces of stagnant energy.', icon: <Wind size={18} />, color: 'text-emerald-100', theme: 'border-emerald-500/20' },
  { id: 'h5', name: 'Peppermint', type: 'Herb', element: 'Fire', property: 'Vigor', chakra: 'Solar Plexus', planet: 'Mercury', synergy: 'Lemon Balm', description: 'Stimulates the mind and purifies the senses.', icon: <Flame size={18} />, color: 'text-green-400', theme: 'border-emerald-500/20' },
  { id: 'h6', name: 'Bay Leaf', type: 'Herb', element: 'Fire', property: 'Vision', chakra: 'Third Eye', planet: 'Sun', synergy: 'Sandalwood', description: 'Write intentions upon it and burn for manifestation.', icon: <Flame size={18} />, color: 'text-green-700', theme: 'border-emerald-500/20' },
  { id: 'h7', name: 'Chamomile', type: 'Herb', element: 'Water', property: 'Calm', chakra: 'Solar Plexus', planet: 'Sun', synergy: 'Lavender', description: 'Soothes the spirit and invites peaceful sleep.', icon: <Droplets size={18} />, color: 'text-yellow-100', theme: 'border-emerald-500/20' },
  { id: 'h8', name: 'Patchouli', type: 'Herb', element: 'Earth', property: 'Grounding', chakra: 'Root', planet: 'Saturn', synergy: 'Vetiver', description: 'Used to draw money and earthy abundance.', icon: <Mountain size={18} />, color: 'text-yellow-900', theme: 'border-emerald-500/20' },
  { id: 'h9', name: 'Nettle', type: 'Herb', element: 'Fire', property: 'Protection', chakra: 'Root', planet: 'Mars', synergy: 'Iron', description: 'A protective herb that builds physical and energetic strength.', icon: <Zap size={18} />, color: 'text-green-600', theme: 'border-emerald-500/20' }
];

export default function Garden() {
  const [activeTab, setActiveTab] = useState('library');
  const [subFilter, setSubFilter] = useState('Crystal'); // Starts on Crystals, no "All"
  const [showAll, setShowAll] = useState(false);
  const [moonData, setMoonData] = useState({ phase: 'Calculating...', illumination: 0, daysToFull: 0 });
  const [intent, setIntent] = useState("");
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('ritual_history');
    return saved ? JSON.parse(saved) : [];
  });

  // Reset "Show All" toggle when switching categories
  useEffect(() => {
    setShowAll(false);
  }, [subFilter]);

  useEffect(() => {
    const lp = 2551443; 
    const now = new Date();
    const newMoon = new Date('1970-01-07T20:35:00');
    const phaseCycle = ((now.getTime() - newMoon.getTime()) / 1000) % lp;
    const days = phaseCycle / (24 * 3600);
    let phase = days < 1.8 ? 'New Moon' : days < 5.5 ? 'Waxing Crescent' : days < 9.2 ? 'First Quarter' : days < 12.9 ? 'Waxing Gibbous' : days < 16.6 ? 'Full Moon' : days < 20.3 ? 'Waning Gibbous' : days < 24.0 ? 'Last Quarter' : 'Waning Crescent';
    const daysToFull = days <= 14.8 ? (14.8 - days).toFixed(1) : (29.5 - days + 14.8).toFixed(1);
    setMoonData({ phase, illumination: Math.round(Math.abs(50 - (days / 30 * 100)) * 2), daysToFull });
  }, []);

  const bindIntention = () => {
    if (!intent.trim()) return;
    const newEntry = { text: intent, date: new Date().toLocaleDateString(), moon: moonData.phase };
    const updatedHistory = [newEntry, ...history].slice(0, 5);
    setHistory(updatedHistory);
    localStorage.setItem('ritual_history', JSON.stringify(updatedHistory));
    setIntent("");
  };

  const filteredData = MATERIA_DATA.filter(item => item.type === subFilter);
  const visibleData = showAll ? filteredData : filteredData.slice(0, 9);

  return (
    <div className="min-h-screen bg-[#040d0a] text-slate-200 font-sans pb-20 selection:bg-emerald-500/30">
      <nav className="max-w-7xl mx-auto px-8 py-10 flex flex-col md:flex-row justify-between items-center gap-6 relative z-20">
        <div className="flex items-center gap-3">
          <Moon className="text-emerald-400" />
          <h1 className="text-xl font-light tracking-[0.4em] uppercase text-white leading-none">Selene</h1>
        </div>
        <div className="flex bg-white/5 border border-white/10 p-1 rounded-2xl backdrop-blur-md">
          {['library', 'moon', 'altar'].map(t => (
            <button key={t} onClick={() => setActiveTab(t)} className={`px-8 py-2.5 rounded-xl text-[9px] uppercase tracking-widest font-bold transition-all ${activeTab === t ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/20' : 'text-slate-500 hover:text-slate-300'}`}>
              {t}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8 relative z-10">
        <AnimatePresence mode="wait">
          
          {activeTab === 'library' && (
            <motion.div key="lib" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              
              {/* SUB-NAV: CRYSTALS AND HERBS ONLY */}
              <div className="flex justify-center gap-12 mb-12 border-b border-white/5 pb-4">
                {['Crystal', 'Herb'].map((f) => (
                  <button 
                    key={f} 
                    onClick={() => setSubFilter(f)}
                    className={`text-[9px] uppercase tracking-[0.3em] font-bold transition-all relative pb-4 ${subFilter === f ? 'text-emerald-400' : 'text-slate-600 hover:text-slate-400'}`}
                  >
                    {f}s
                    {subFilter === f && <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-400" />}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleData.map(item => (
                  <motion.div 
                    layout
                    key={item.id} 
                    className={`bg-[#06120f] border ${item.theme} p-8 rounded-[2rem] hover:border-emerald-500/40 transition-all group`}
                  >
                    <div className="flex justify-between mb-6">
                      <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${item.color}`}>{item.icon}</div>
                      <div className={`text-[8px] font-black tracking-widest uppercase ${item.type === 'Crystal' ? 'text-blue-400/60' : 'text-emerald-400/60'}`}>{item.type}</div>
                    </div>
                    <h3 className="text-2xl font-serif italic mb-1 text-white">{item.name}</h3>
                    <div className="flex gap-2 mb-4 text-[8px] font-bold uppercase tracking-widest text-slate-500">
                      <span>{item.element}</span> • <span>{item.planet}</span>
                    </div>
                    <p className="text-sm text-slate-400 font-light mb-8 italic leading-relaxed">"{item.description}"</p>
                    <div className="flex items-center gap-3 text-[10px] text-slate-500 border-t border-white/5 pt-5">
                      <Zap size={12} className="text-emerald-500/50" />
                      <span className="uppercase tracking-widest">Purpose: {item.property}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* DYNAMIC LOAD MORE BUTTON */}
              {!showAll && filteredData.length >= 9 && (
                <div className="flex justify-center mt-12">
                  <button onClick={() => setShowAll(true)} className="px-12 py-4 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl text-[9px] uppercase tracking-[0.4em] font-bold text-emerald-400 hover:bg-emerald-500/20 transition-all">
                    Load More {subFilter}s
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* MOON & ALTAR TABS REMAIN HIGH DENSITY */}
          {activeTab === 'moon' && (
            <motion.div key="moon" className="max-w-4xl mx-auto text-center p-16 bg-white/[0.02] border border-white/5 rounded-[3rem]">
                <Moon size={64} className="mx-auto text-emerald-400 mb-6 shadow-emerald-500" />
                <h2 className="text-4xl font-serif italic text-white mb-2">{moonData.phase}</h2>
                <p className="text-emerald-500 tracking-[0.4em] text-[10px] font-black mb-12 uppercase">{moonData.daysToFull} Days to Full Moon</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <div className="p-8 bg-white/5 rounded-[2rem] border border-white/10">
                    <p className="text-[9px] uppercase text-emerald-500 mb-2 font-bold">Luminance</p>
                    <p className="text-3xl text-white font-serif">{moonData.illumination}%</p>
                  </div>
                  <div className="p-8 bg-white/5 rounded-[2rem] border border-white/10">
                    <p className="text-[9px] uppercase text-emerald-500 mb-2 font-bold">Ritual Focus</p>
                    <p className="text-xs text-slate-400">{moonData.illumination > 50 ? 'Expansion and Attraction' : 'Cleansing and Banishing'}</p>
                  </div>
                </div>
            </motion.div>
          )}

          {activeTab === 'altar' && (
            <motion.div key="altar" className="max-w-2xl mx-auto space-y-8">
              <div className="bg-[#06120f] border border-white/10 p-12 rounded-[3rem]">
                <h3 className="text-xl font-serif italic text-white text-center mb-8 uppercase tracking-[0.3em]">The Ritual Intent</h3>
                <textarea value={intent} onChange={(e) => setIntent(e.target.value)} placeholder="Cast your focus..." className="w-full bg-transparent border-none text-center text-xl italic text-emerald-100 focus:ring-0 h-24" />
                <button onClick={bindIntention} className="w-full py-5 mt-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-emerald-500/20">Bind Intention</button>
              </div>
              <div className="space-y-4">
                {history.map((entry, i) => (
                  <div key={i} className="p-6 bg-white/5 border border-white/5 rounded-2xl flex justify-between items-center italic text-slate-400 text-sm">
                    "{entry.text}" <span className="text-[9px] uppercase not-italic text-slate-600">{entry.date}</span>
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