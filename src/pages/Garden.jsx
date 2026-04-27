import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Moon, Sparkles, Book, Leaf, Calendar, PenTool, Wind, Droplets, 
  Flame, Mountain, Shield, Sun, Clock, History, Zap 
} from 'lucide-react';

// --- DATA: MATERIA WITH SYNERGIES ---
const MATERIA_DATA = [
  { id: 'h1', name: 'Moonlight Lavender', type: 'Herb', element: 'Air', property: 'Dreams', chakra: 'Third Eye', planet: 'Mercury', synergy: 'Amethyst', description: 'Harvest during a waning moon for dream work and prophetic visions.', icon: <Wind size={18} />, color: 'text-purple-400' },
  { id: 'c1', name: 'Moonstone', type: 'Crystal', element: 'Water', property: 'Intuition', chakra: 'Crown', planet: 'Moon', synergy: 'Mugwort', description: 'Connects to the divine feminine. Best used for new beginnings.', icon: <Droplets size={18} />, color: 'text-blue-200' },
  { id: 'h2', name: 'Mugwort', type: 'Herb', element: 'Earth', property: 'Astral', chakra: 'Third Eye', planet: 'Moon', synergy: 'Moonstone', description: 'A powerful visionary herb. Use as an infusion for scrying mirrors.', icon: <Mountain size={18} />, color: 'text-emerald-500' },
  { id: 'c2', name: 'Amethyst', type: 'Crystal', element: 'Spirit', property: 'Peace', chakra: 'Crown', planet: 'Jupiter', synergy: 'Lavender', description: 'Transmutes negative energy into love. Protects from psychic attack.', icon: <Sparkles size={18} />, color: 'text-indigo-400' },
  { id: 'c4', name: 'Citrine', type: 'Crystal', element: 'Fire', property: 'Wealth', chakra: 'Solar Plexus', planet: 'Sun', synergy: 'Rosemary', description: 'The stone of manifestation. It does not hold negative energy.', icon: <Sun size={18} />, color: 'text-yellow-500' },
  { id: 'h4', name: 'Rosemary', type: 'Herb', element: 'Fire', property: 'Memory', chakra: 'Third Eye', planet: 'Sun', synergy: 'Citrine', description: 'Associated with remembrance and mental clarity during rituals.', icon: <Flame size={18} />, color: 'text-blue-400' }
];

export default function Garden() {
  const [activeTab, setActiveTab] = useState('library');
  const [moonData, setMoonData] = useState({ phase: 'Calculating...', illumination: 0, daysToFull: 0 });
  const [intent, setIntent] = useState("");
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('ritual_history');
    return saved ? JSON.parse(saved) : [];
  });

  // LUNAR LOGIC + COUNTDOWN
  useEffect(() => {
    const lp = 2551443; 
    const now = new Date();
    const newMoon = new Date('1970-01-07T20:35:00');
    const phaseCycle = ((now.getTime() - newMoon.getTime()) / 1000) % lp;
    const days = phaseCycle / (24 * 3600);
    
    let phase = days < 1.8 ? 'New Moon' : days < 5.5 ? 'Waxing Crescent' : days < 9.2 ? 'First Quarter' : days < 12.9 ? 'Waxing Gibbous' : days < 16.6 ? 'Full Moon' : days < 20.3 ? 'Waning Gibbous' : days < 24.0 ? 'Last Quarter' : 'Waning Crescent';
    
    // Simple math for days until full moon
    const daysToFull = days <= 14.8 ? (14.8 - days).toFixed(1) : (29.5 - days + 14.8).toFixed(1);

    setMoonData({ phase, illumination: Math.round(Math.abs(50 - (days / 30 * 100)) * 2), daysToFull });
  }, []);

  // PERSISTENT HISTORY LOGIC
  const bindIntention = () => {
    if (!intent.trim()) return;
    const newEntry = { text: intent, date: new Date().toLocaleDateString(), moon: moonData.phase };
    const updatedHistory = [newEntry, ...history].slice(0, 5); // Keep last 5
    setHistory(updatedHistory);
    localStorage.setItem('ritual_history', JSON.stringify(updatedHistory));
    setIntent("");
  };

  return (
    <div className="min-h-screen bg-[#040d0a] text-slate-200 font-sans pb-20">
      {/* HEADER NAV */}
      <nav className="max-w-6xl mx-auto px-8 py-10 flex flex-col md:flex-row justify-between items-center gap-6 relative z-20">
        <div className="flex items-center gap-3">
          <Moon className="text-emerald-400" />
          <h1 className="text-xl font-light tracking-[0.4em] uppercase">Selene</h1>
        </div>
        <div className="flex bg-white/5 border border-white/10 p-1 rounded-2xl backdrop-blur-md">
          {['library', 'moon', 'altar'].map(t => (
            <button key={t} onClick={() => setActiveTab(t)} className={`px-6 py-2 rounded-xl text-[9px] uppercase tracking-widest font-bold transition-all ${activeTab === t ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-500'}`}>
              {t}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-8 relative z-10">
        <AnimatePresence mode="wait">
          {/* LIBRARY WITH SYNERGIES */}
          {activeTab === 'library' && (
            <motion.div key="lib" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {MATERIA_DATA.map(item => (
                <div key={item.id} className="bg-[#06120f] border border-white/5 p-8 rounded-[2rem] hover:border-emerald-500/30 transition-all">
                  <div className="flex justify-between mb-6">
                    <div className={`p-3 rounded-xl bg-white/5 ${item.color}`}>{item.icon}</div>
                    <div className="flex gap-1">
                       <div className="px-2 py-1 bg-white/5 rounded text-[8px] text-slate-500">{item.type}</div>
                       <div className="px-2 py-1 bg-emerald-500/10 rounded text-[8px] text-emerald-400 border border-emerald-500/10">✨ {item.synergy}</div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-serif italic mb-1">{item.name}</h3>
                  <p className="text-[10px] text-emerald-500/60 font-bold mb-4 uppercase tracking-widest">{item.chakra} · {item.planet}</p>
                  <p className="text-sm text-slate-400 font-light mb-6 italic leading-relaxed">"{item.description}"</p>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500 border-t border-white/5 pt-4">
                    <Zap size={12} className="text-emerald-500" />
                    <span>Works best for: {item.property}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* MOON WITH COUNTDOWN */}
          {activeTab === 'moon' && (
            <motion.div key="moon" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
              <div className="text-center p-12 bg-white/[0.02] border border-white/5 rounded-[3rem] backdrop-blur-3xl">
                <Moon size={60} className="mx-auto text-emerald-400 mb-6 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]" />
                <h2 className="text-4xl font-serif italic text-white mb-2">{moonData.phase}</h2>
                <div className="flex items-center justify-center gap-4 text-emerald-500 tracking-[0.3em] text-[10px] font-bold mb-12">
                   <Clock size={14} />
                   <span>{moonData.daysToFull} DAYS UNTIL FULL MOON</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-left">
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                    <h4 className="text-[9px] uppercase tracking-widest text-emerald-500 mb-2">Ritual Window</h4>
                    <p className="text-xs text-slate-300">{moonData.illumination > 50 ? 'Ideal for external growth and charging tools.' : 'Ideal for internal reflection and setting boundaries.'}</p>
                  </div>
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                    <h4 className="text-[9px] uppercase tracking-widest text-emerald-500 mb-2">Energy Level</h4>
                    <p className="text-xs text-slate-300">Lunar resonance is currently at {moonData.illumination}% capacity.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ALTAR WITH LOGGING */}
          {activeTab === 'altar' && (
            <motion.div key="altar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto space-y-8">
              <div className="bg-[#06120f] border border-white/10 p-10 rounded-[2.5rem]">
                <h3 className="text-xl font-serif italic text-white text-center mb-6">Current Intention</h3>
                <textarea value={intent} onChange={(e) => setIntent(e.target.value)} placeholder="What do you seek to manifest?" className="w-full bg-transparent border-none text-center text-lg italic text-emerald-100 focus:ring-0 h-24 resize-none placeholder:text-slate-800" />
                <button onClick={bindIntention} className="w-full py-4 mt-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-500/20 transition-all">Bind Intention</button>
              </div>

              {history.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-slate-500 mb-4 px-4">
                    <History size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Ritual History</span>
                  </div>
                  {history.map((entry, i) => (
                    <div key={i} className="p-5 bg-white/5 border border-white/5 rounded-2xl flex justify-between items-center group">
                      <div>
                        <p className="text-sm text-slate-300 italic">"{entry.text}"</p>
                        <p className="text-[9px] text-slate-600 mt-1 uppercase tracking-tighter">{entry.date} · Under the {entry.moon}</p>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                         <Sparkles size={14} className="text-emerald-900" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}