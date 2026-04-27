import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Moon, Sparkles, Book, Leaf, Shrub, 
  Calendar, PenTool, Wind, Droplets, 
  Flame, Mountain, Info, ChevronRight 
} from 'lucide-react';

// --- DATA: MATERIA MEDICA ---
const MATERIA_DATA = [
  { id: 'h1', name: 'Moonlight Lavender', type: 'Herb', element: 'Air', property: 'Prophetic Dreams', description: 'Harvest during a waning moon for maximum potency in dream work.', icon: <Wind size={18} />, color: 'text-purple-400' },
  { id: 'c1', name: 'Moonstone', type: 'Crystal', element: 'Water', property: 'Intuition', description: 'A stone for "new beginnings", strongly connected to the moon and intuition.', icon: <Droplets size={18} />, color: 'text-blue-300' },
  { id: 'h2', name: 'Mugwort', type: 'Herb', element: 'Earth', property: 'Astral Travel', description: 'Used for protection and to induce lucid dreaming and astral projection.', icon: <Mountain size={18} />, color: 'text-emerald-400' },
  { id: 'c2', name: 'Amethyst', type: 'Crystal', element: 'Spirit', property: 'Clarity', description: 'A powerful and protective stone. It guards against psychic attack.', icon: <Sparkles size={18} />, color: 'text-indigo-400' },
  { id: 'h3', name: 'White Sage', type: 'Herb', element: 'Fire', property: 'Cleansing', description: 'Traditionally used to clear negative energy from a space or person.', icon: <Flame size={18} />, color: 'text-orange-300' },
  { id: 'c3', name: 'Black Tourmaline', type: 'Crystal', element: 'Earth', property: 'Protection', description: 'A premier stone for protection, helping to seal the aura against negativity.', icon: <Mountain size={18} />, color: 'text-slate-400' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('library');
  const [moonData, setMoonData] = useState({ phase: 'Calculating...', illumination: 0 });
  const [intent, setIntent] = useState("");

  // LUNAR LOGIC
  useEffect(() => {
    const calculateMoon = () => {
      const lp = 2551443; 
      const now = new Date();
      const newMoon = new Date('1970-01-07T20:35:00');
      const phaseCycle = ((now.getTime() - newMoon.getTime()) / 1000) % lp;
      const days = phaseCycle / (24 * 3600);
      let phase = days < 1.8 ? 'New Moon' : days < 5.5 ? 'Waxing Crescent' : days < 9.2 ? 'First Quarter' : days < 12.9 ? 'Waxing Gibbous' : days < 16.6 ? 'Full Moon' : days < 20.3 ? 'Waning Gibbous' : days < 24.0 ? 'Last Quarter' : 'Waning Crescent';
      const illumination = Math.round(Math.abs(50 - (days / 30 * 100)) * 2);
      setMoonData({ phase, illumination });
    };
    calculateMoon();
  }, []);

  return (
    <div className="min-h-screen bg-[#040d0a] text-slate-200 font-sans overflow-x-hidden pb-20">
      {/* RADIANT GLOW BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[120px] rounded-full" />
      </div>

      {/* HEADER */}
      <nav className="relative z-10 max-w-6xl mx-auto px-8 py-12 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
            <Moon className="text-emerald-400" size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-light tracking-[0.4em] uppercase text-white leading-none">Selene</h1>
            <p className="text-[10px] tracking-[0.3em] uppercase text-emerald-500/60 font-bold mt-1">Alchemist's Dashboard</p>
          </div>
        </div>

        {/* TAB NAVIGATION */}
        <div className="flex bg-white/5 border border-white/10 p-1.5 rounded-2xl backdrop-blur-xl">
          {[
            { id: 'library', icon: <Book size={16} />, label: 'Library' },
            { id: 'calendar', icon: <Calendar size={16} />, label: 'Moon' },
            { id: 'altar', icon: <PenTool size={16} />, label: 'Altar' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] uppercase tracking-widest font-bold transition-all ${
                activeTab === tab.id ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/20' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="relative z-10 max-w-6xl mx-auto px-8">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: LIBRARY */}
          {activeTab === 'library' && (
            <motion.div 
              key="lib" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {MATERIA_DATA.map(item => (
                <div key={item.id} className="bg-white/[0.03] border border-white/5 p-8 rounded-[2.5rem] hover:border-emerald-500/30 transition-all group">
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 ${item.color}`}>{item.icon}</div>
                    <span className="text-[9px] font-bold tracking-widest uppercase bg-white/5 px-3 py-1 rounded-full text-slate-500 border border-white/5">{item.type}</span>
                  </div>
                  <h3 className="text-2xl font-serif italic text-white mb-2">{item.name}</h3>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-emerald-500/60 font-bold mb-4">{item.element} · {item.property}</p>
                  <p className="text-sm text-slate-400 font-light leading-relaxed mb-6">{item.description}</p>
                  <button className="w-full py-3 rounded-xl border border-white/5 bg-white/5 text-[10px] uppercase tracking-widest font-bold text-slate-400 hover:bg-emerald-500/10 hover:text-emerald-300 transition-all">Details</button>
                </div>
              ))}
            </motion.div>
          )}

          {/* TAB 2: MOON CALENDAR */}
          {activeTab === 'calendar' && (
            <motion.div 
              key="cal" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="max-w-3xl mx-auto text-center py-20 bg-white/[0.02] border border-white/5 rounded-[3rem] backdrop-blur-3xl"
            >
              <div className="mb-10 inline-flex p-6 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-emerald-400">
                <Moon size={48} className="animate-pulse" />
              </div>
              <h2 className="text-4xl font-serif italic text-white mb-4">{moonData.phase}</h2>
              <p className="text-emerald-400 tracking-[0.3em] uppercase text-xs mb-12">{moonData.illumination}% Illumination</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-12 text-left">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-[10px] font-bold uppercase text-slate-500 mb-2">Optimal Ritual</p>
                  <p className="text-sm text-slate-300">{moonData.illumination > 50 ? 'Charging crystals, outward expansion, and divination.' : 'Intention setting, shadow work, and inward reflection.'}</p>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-[10px] font-bold uppercase text-slate-500 mb-2">Lunar Guidance</p>
                  <p className="text-sm text-slate-300">The current energy favors {moonData.illumination > 50 ? 'visibility and action.' : 'rest and preparation.'}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: INTENTION ALTAR */}
          {activeTab === 'altar' && (
            <motion.div 
              key="alt" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              className="max-w-2xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-serif italic text-white mb-4">The Intention Altar</h2>
                <p className="text-slate-400 text-sm font-light">Cast your focus into the digital aether. Set your intention for this lunar cycle.</p>
              </div>
              <div className="bg-white/[0.03] border border-white/10 p-10 rounded-[2.5rem] backdrop-blur-xl">
                <textarea 
                  value={intent}
                  onChange={(e) => setIntent(e.target.value)}
                  placeholder="Enter your ritual intention..."
                  className="w-full bg-transparent border-none text-xl font-serif italic text-emerald-100 placeholder:text-slate-700 focus:ring-0 h-40 resize-none"
                />
                <div className="h-[1px] w-full bg-white/10 my-6" />
                <button className="w-full py-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-emerald-500/20 transition-all">
                  Bind Intention
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
