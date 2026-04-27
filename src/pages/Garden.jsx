import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Moon, Sparkles, Book, Leaf, Calendar, PenTool, Wind, Droplets, 
  Flame, Mountain, Shield, Sun, Clock, History, Zap, Eye, Heart, Star
} from 'lucide-react';

// --- THE MASTER DATABASE (Expanded) ---
const MATERIA_DATA = [
  { id: 'h1', name: 'Moonlight Lavender', type: 'Herb', element: 'Air', property: 'Dreams', chakra: 'Third Eye', planet: 'Mercury', synergy: 'Amethyst', description: 'Harvest during a waning moon for dream work and prophetic visions.', icon: <Wind size={18} />, color: 'text-purple-400' },
  { id: 'c1', name: 'Moonstone', type: 'Crystal', element: 'Water', property: 'Intuition', chakra: 'Crown', planet: 'Moon', synergy: 'Mugwort', description: 'Connects to the divine feminine. Best used for new beginnings.', icon: <Droplets size={18} />, color: 'text-blue-200' },
  { id: 'h2', name: 'Mugwort', type: 'Herb', element: 'Earth', property: 'Astral', chakra: 'Third Eye', planet: 'Moon', synergy: 'Moonstone', description: 'A powerful visionary herb. Use as an infusion for scrying mirrors.', icon: <Mountain size={18} />, color: 'text-emerald-500' },
  { id: 'c2', name: 'Amethyst', type: 'Crystal', element: 'Spirit', property: 'Peace', chakra: 'Crown', planet: 'Jupiter', synergy: 'Lavender', description: 'Transmutes negative energy into love. Protects from psychic attack.', icon: <Sparkles size={18} />, color: 'text-indigo-400' },
  { id: 'c4', name: 'Citrine', type: 'Crystal', element: 'Fire', property: 'Wealth', chakra: 'Solar Plexus', planet: 'Sun', synergy: 'Rosemary', description: 'The stone of manifestation. It does not hold negative energy.', icon: <Sun size={18} />, color: 'text-yellow-500' },
  { id: 'h4', name: 'Rosemary', type: 'Herb', element: 'Fire', property: 'Memory', chakra: 'Third Eye', planet: 'Sun', synergy: 'Citrine', description: 'Associated with remembrance and mental clarity.', icon: <Flame size={18} />, color: 'text-blue-400' },
  { id: 'c5', name: 'Rose Quartz', type: 'Crystal', element: 'Water', property: 'Love', chakra: 'Heart', planet: 'Venus', synergy: 'Sage', description: 'The stone of unconditional love and infinite peace.', icon: <Heart size={18} />, color: 'text-pink-300' },
  { id: 'c6', name: 'Selenite', type: 'Crystal', element: 'Spirit', property: 'Cleansing', chakra: 'Crown', planet: 'Moon', synergy: 'Black Tourmaline', description: 'Ideal for clearing the aura and charging other crystals.', icon: <Zap size={18} />, color: 'text-slate-100' },
  { id: 'h5', name: 'White Sage', type: 'Herb', element: 'Fire', property: 'Purify', chakra: 'Root', planet: 'Jupiter', synergy: 'Selenite', description: 'Used to bless and cleanse spaces of stagnant energy.', icon: <Wind size={18} />, color: 'text-emerald-100' },
  { id: 'c7', name: 'Black Tourmaline', type: 'Crystal', element: 'Earth', property: 'Shield', chakra: 'Root', planet: 'Saturn', synergy: 'Selenite', description: 'Repels and protects against negativity.', icon: <Shield size={18} />, color: 'text-slate-600' },
  { id: 'c8', name: 'Lapis Lazuli', type: 'Crystal', element: 'Air', property: 'Truth', chakra: 'Throat', planet: 'Venus', synergy: 'Sodalite', description: 'Encourages self-awareness and reveals inner truth.', icon: <Eye size={18} />, color: 'text-blue-600' },
  { id: 'h6', name: 'Peppermint', type: 'Herb', element: 'Fire', property: 'Vigor', chakra: 'Solar Plexus', planet: 'Mercury', synergy: 'Lemon Balm', description: 'Stimulates the mind and purifies the senses.', icon: <Flame size={18} />, color: 'text-green-400' },
  { id: 'c9', name: 'Tiger Eye', type: 'Crystal', element: 'Earth', property: 'Courage', chakra: 'Solar Plexus', planet: 'Sun', synergy: 'Clear Quartz', description: 'A stone of protection and stabilizing energy.', icon: <Sun size={18} />, color: 'text-orange-400' },
  { id: 'h7', name: 'Chamomile', type: 'Herb', element: 'Water', property: 'Calm', chakra: 'Solar Plexus', planet: 'Sun', synergy: 'Lavender', description: 'Soothes the spirit and invites peaceful sleep.', icon: <Droplets size={18} />, color: 'text-yellow-100' },
  { id: 'c10', name: 'Clear Quartz', type: 'Crystal', element: 'Spirit', property: 'Amplify', chakra: 'Crown', planet: 'Sun', synergy: 'All', description: 'The master healer. Amplifies energy and thought.', icon: <Sparkles size={18} />, color: 'text-slate-200' },
  { id: 'h8', name: 'Copal', type: 'Herb', element: 'Fire', property: 'Sacred', chakra: 'Crown', planet: 'Sun', synergy: 'Myrrh', description: 'Ancient resin used for divine connection.', icon: <Flame size={18} />, color: 'text-orange-200' },
  { id: 'c11', name: 'Pyrite', type: 'Crystal', element: 'Earth', property: 'Luck', chakra: 'Solar Plexus', planet: 'Mars', synergy: 'Citrine', description: 'A stone of action, vitality, and will.', icon: <Zap size={18} />, color: 'text-yellow-600' },
  { id: 'h9', name: 'Bay Leaf', type: 'Herb', element: 'Fire', property: 'Vision', chakra: 'Third Eye', planet: 'Sun', synergy: 'Sandalwood', description: 'Write intentions upon it and burn for manifestation.', icon: <Flame size={18} />, color: 'text-green-700' },
  { id: 'c12', name: 'Jade', type: 'Crystal', element: 'Earth', property: 'Harmony', chakra: 'Heart', planet: 'Venus', synergy: 'Rose Quartz', description: 'Symbol of serenity and purity.', icon: <Heart size={18} />, color: 'text-green-400' },
  { id: 'h10', name: 'Patchouli', type: 'Herb', element: 'Earth', property: 'Grounding', chakra: 'Root', planet: 'Saturn', synergy: 'Vetiver', description: 'Used to draw money and earthy abundance.', icon: <Mountain size={18} />, color: 'text-yellow-900' }
];

export default function Garden() {
  const [activeTab, setActiveTab] = useState('library');
  const [showAll, setShowAll] = useState(false);
  const [moonData, setMoonData] = useState({ phase: 'Calculating...', illumination: 0, daysToFull: 0 });
  const [intent, setIntent] = useState("");
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('ritual_history');
    return saved ? JSON.parse(saved) : [];
  });

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

  const visibleData = showAll ? MATERIA_DATA : MATERIA_DATA.slice(0, 9);

  return (
    <div className="min-h-screen bg-[#040d0a] text-slate-200 font-sans pb-20 selection:bg-emerald-500/30">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-emerald-900/10 blur-[120px] rounded-full animate-pulse" />
      </div>

      <nav className="max-w-7xl mx-auto px-8 py-10 flex flex-col md:flex-row justify-between items-center gap-6 relative z-20">
        <div className="flex items-center gap-3">
          <Moon className="text-emerald-400" />
          <div>
            <h1 className="text-xl font-light tracking-[0.4em] uppercase text-white">Selene</h1>
            <p className="text-[8px] tracking-[0.2em] text-emerald-500/50 font-bold">ALCHEMIST'S DASHBOARD</p>
          </div>
        </div>
        <div className="flex bg-white/5 border border-white/10 p-1 rounded-2xl backdrop-blur-md">
          {['library', 'moon', 'altar'].map(t => (
            <button key={t} onClick={() => setActiveTab(t)} className={`px-8 py-2.5 rounded-xl text-[9px] uppercase tracking-widest font-bold transition-all ${activeTab === t ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/20' : 'text-slate-500 hover:text-slate-300'}`}>
              {t}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8 relative z-10 mt-6">
        <AnimatePresence mode="wait">
          {activeTab === 'library' && (
            <motion.div key="lib" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleData.map(item => (
                  <div key={item.id} className="bg-[#06120f] border border-white/5 p-8 rounded-[2rem] hover:border-emerald-500/30 transition-all group relative overflow-hidden">
                    <div className="flex justify-between mb-6 relative z-10">
                      <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${item.color}`}>{item.icon}</div>
                      <div className="flex flex-col items-end gap-1">
                         <div className="px-2 py-1 bg-white/5 rounded text-[8px] text-slate-500 uppercase tracking-widest font-bold">{item.type}</div>
                         <div className="text-[8px] text-emerald-400/60 font-bold uppercase tracking-tighter italic">✨ Pair: {item.synergy}</div>
                      </div>
                    </div>
                    <h3 className="text-2xl font-serif italic mb-1 text-white group-hover:text-emerald-300 transition-colors">{item.name}</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-[8px] px-2 py-0.5 rounded-md bg-white/5 text-slate-400 border border-white/5 uppercase tracking-tighter">{item.element}</span>
                      <span className="text-[8px] px-2 py-0.5 rounded-md bg-white/5 text-slate-400 border border-white/5 uppercase tracking-tighter">{item.planet}</span>
                      <span className="text-[8px] px-2 py-0.5 rounded-md bg-white/5 text-slate-400 border border-white/5 uppercase tracking-tighter">{item.chakra}</span>
                    </div>
                    <p className="text-sm text-slate-400 font-light mb-8 italic leading-relaxed">"{item.description}"</p>
                    <div className="flex items-center gap-3 text-[10px] text-slate-500 border-t border-white/5 pt-5">
                      <Zap size={12} className="text-emerald-500" />
                      <span className="uppercase tracking-widest">Purpose: {item.property}</span>
                    </div>
                  </div>
                ))}
              </div>
              {!showAll && (
                <div className="flex justify-center mt-12">
                  <button 
                    onClick={() => setShowAll(true)}
                    className="px-12 py-4 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl text-[10px] uppercase tracking-[0.4em] font-bold text-emerald-400 hover:bg-emerald-500/20 transition-all flex items-center gap-3 shadow-lg"
                  >
                    <Book size={14} /> Reveal Full Grimoire
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'moon' && (
            <motion.div key="moon" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 text-center p-16 bg-white/[0.02] border border-white/5 rounded-[3rem] backdrop-blur-3xl">
                <Moon size={64} className="mx-auto text-emerald-400 mb-6 drop-shadow-[0_0_20px_rgba(52,211,153,0.3)]" />
                <h2 className="text-4xl font-serif italic text-white mb-2">{moonData.phase}</h2>
                <div className="flex items-center justify-center gap-4 text-emerald-500 tracking-[0.4em] text-[10px] font-black mb-12">
                   <Clock size={14} />
                   <span>{moonData.daysToFull} DAYS UNTIL FULL MOON</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <div className="p-8 bg-white/5 rounded-[2rem] border border-white/10 shadow-inner">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-emerald-500 mb-4 font-bold">Ritual Focus</p>
                    <p className="text-sm text-slate-300 font-light leading-relaxed">
                      {moonData.illumination > 50 ? 'Energy is Waxing. High focus on growth, attraction, and manifestation. Perfect time for charging talismans.' : 'Energy is Waning. Focus on banishing, releasing, and internal shadow work. Ideal for cleansing rituals.'}
                    </p>
                  </div>
                  <div className="p-8 bg-white/5 rounded-[2rem] border border-white/10">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-emerald-500 mb-4 font-bold">Luminance</p>
                    <div className="flex items-end gap-2">
                       <span className="text-3xl font-serif italic text-white">{moonData.illumination}%</span>
                       <span className="text-[9px] text-slate-500 mb-2 uppercase tracking-widest">Resonance</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-slate-500 px-4">Lunar Almanac</h4>
                {[
                  { p: 'New Moon', action: 'Plant Seeds' },
                  { p: 'Waxing', action: 'Cultivate' },
                  { p: 'Full Moon', action: 'Harvest' },
                  { p: 'Waning', action: 'Compost' }
                ].map((item, i) => (
                  <div key={i} className="p-6 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-between hover:bg-white/10 transition-colors">
                    <span className="text-xs text-slate-300 italic">{item.p}</span>
                    <span className="text-[9px] uppercase font-bold text-emerald-500/60">{item.action}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'altar' && (
            <motion.div key="altar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-[#06120f] border border-white/10 p-12 rounded-[3rem] shadow-2xl">
                  <h3 className="text-2xl font-serif italic text-white text-center mb-8 uppercase tracking-widest">The Intent</h3>
                  <textarea 
                    value={intent} 
                    onChange={(e) => setIntent(e.target.value)} 
                    placeholder="Focus your energy here..." 
                    className="w-full bg-transparent border-none text-center text-xl italic text-emerald-100 focus:ring-0 h-32 resize-none placeholder:text-slate-800" 
                  />
                  <button 
                    onClick={bindIntention} 
                    className="w-full py-5 mt-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-emerald-500/20 transition-all shadow-lg active:scale-95"
                  >
                    Bind to the Aether
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-slate-500 px-4"><History size={14} /><span className="text-[10px] font-bold uppercase tracking-widest">Past Rituals</span></div>
                  {history.map((entry, i) => (
                    <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} key={i} className="p-6 bg-white/5 border border-white/5 rounded-2xl flex justify-between items-center group">
                      <div className="max-w-[80%]">
                        <p className="text-sm text-slate-300 italic">"{entry.text}"</p>
                        <p className="text-[9px] text-slate-600 mt-2 uppercase tracking-widest">{entry.date} • Under the {entry.moon}</p>
                      </div>
                      <Sparkles size={14} className="text-emerald-900 group-hover:text-emerald-500 transition-colors" />
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="bg-white/5 rounded-[3rem] p-10 border border-white/5 self-start sticky top-10">
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-emerald-500 mb-6 flex items-center gap-2"><Zap size={14}/> Daily Synthesis</h4>
                <p className="text-xs text-slate-400 font-light leading-relaxed mb-6 italic">
                  Based on the {moonData.phase}, consider pairing <span className="text-emerald-300">Rosemary</span> with <span className="text-emerald-300">Citrine</span> to amplify {moonData.illumination > 50 ? 'outward manifestation' : 'personal clarity'}.
                </p>
                <div className="h-[1px] w-full bg-white/10 mb-6" />
                <p className="text-[9px] uppercase font-bold text-slate-500 mb-3 tracking-widest">Ritual Component</p>
                <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl flex items-center gap-3">
                  <div className="text-emerald-400"><Star size={16} /></div>
                  <span className="text-[10px] uppercase text-slate-200 tracking-widest font-bold">Clear Quartz Wand</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}