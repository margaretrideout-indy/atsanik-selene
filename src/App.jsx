import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Moon, Sparkles, Book, Leaf, Shrub, 
  Calendar, PenTool, Wind, Droplets, 
  Flame, Mountain, Info, ChevronRight, Shield, Sun
} from 'lucide-react';

// --- EXPANDED MATERIA MEDICA DATA ---
const MATERIA_DATA = [
  { id: 'h1', name: 'Moonlight Lavender', type: 'Herb', element: 'Air', property: 'Dreams', chakra: 'Third Eye', planet: 'Mercury', description: 'Harvest during a waning moon for dream work and prophetic visions.', icon: <Wind size={18} />, color: 'text-purple-400' },
  { id: 'c1', name: 'Moonstone', type: 'Crystal', element: 'Water', property: 'Intuition', chakra: 'Crown', planet: 'Moon', description: 'Connects to the divine feminine. Best used for new beginnings.', icon: <Droplets size={18} />, color: 'text-blue-200' },
  { id: 'h2', name: 'Mugwort', type: 'Herb', element: 'Earth', property: 'Astral', chakra: 'Third Eye', planet: 'Moon', description: 'A powerful visionary herb. Use as an infusion for scrying mirrors.', icon: <Mountain size={18} />, color: 'text-emerald-500' },
  { id: 'c2', name: 'Amethyst', type: 'Crystal', element: 'Spirit', property: 'Peace', chakra: 'Crown', planet: 'Jupiter', description: 'Transmutes negative energy into love. Protects from psychic attack.', icon: <Sparkles size={18} />, color: 'text-indigo-400' },
  { id: 'h3', name: 'White Sage', type: 'Herb', element: 'Fire', property: 'Cleansing', description: 'Clears the energy of a space. Use with reverence and intention.', icon: <Flame size={18} />, color: 'text-slate-300' },
  { id: 'c3', name: 'Black Tourmaline', type: 'Crystal', element: 'Earth', property: 'Shield', chakra: 'Root', planet: 'Saturn', description: 'A heavy-duty grounding stone. Repels lower frequencies.', icon: <Shield size={18} />, color: 'text-slate-500' },
  { id: 'c4', name: 'Citrine', type: 'Crystal', element: 'Fire', property: 'Wealth', chakra: 'Solar Plexus', planet: 'Sun', description: 'The stone of manifestation. It does not hold negative energy.', icon: <Sun size={18} />, color: 'text-yellow-500' },
  { id: 'h4', name: 'Rosemary', type: 'Herb', element: 'Fire', property: 'Memory', chakra: 'Third Eye', planet: 'Sun', description: 'Associated with remembrance and mental clarity during rituals.', icon: <Flame size={18} />, color: 'text-blue-400' },
  { id: 'c5', name: 'Rose Quartz', type: 'Crystal', element: 'Water', property: 'Love', chakra: 'Heart', planet: 'Venus', description: 'The stone of unconditional love. Opens the heart to all levels.', icon: <Droplets size={18} />, color: 'text-pink-300' }
];

export default function Garden() {
  const [activeTab, setActiveTab] = useState('library');
  const [moonData, setMoonData] = useState({ phase: 'Calculating...', illumination: 0 });
  const [intent, setIntent] = useState("");

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
    <div className="min-h-screen bg-[#040d0a] text-slate-200 font-sans overflow-x-hidden pb-20 selection:bg-emerald-500/30">
      {/* ATMOSPHERIC BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-emerald-900/10 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[140px] rounded-full" />
      </div>

      {/* HEADER NAVIGATION */}
      <nav className="relative z-10 max-w-6xl mx-auto px-8 py-10 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            <Moon className="text-emerald-400" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-light tracking-[0.5em] uppercase text-white leading-none">Selene</h1>
            <p className="text-[9px] tracking-[0.2em] uppercase text-emerald-500/60 font-bold mt-1">Sacred Correspondences</p>
          </div>
        </div>

        <div className="flex bg-white/5 border border-white/10 p-1 rounded-2xl backdrop-blur-md">
          {[
            { id: 'library', icon: <Book size={14} />, label: 'Library' },
            { id: 'calendar', icon: <Calendar size={14} />, label: 'Moon' },
            { id: 'altar', icon: <PenTool size={14} />, label: 'Altar' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-2 rounded-xl text-[9px] uppercase tracking-[0.2em] font-bold transition-all ${
                activeTab === tab.id ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/20 shadow-inner' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="relative z-10 max-w-6xl mx-auto px-8 mt-4">
        <AnimatePresence mode="wait">
          
          {/* LIBRARY TAB */}
          {activeTab === 'library' && (
            <motion.div 
              key="lib" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {MATERIA_DATA.map(item => (
                <div key={item.id} className="bg-[#06120f] border border-white/5 p-8 rounded-[2rem] hover:border-emerald-500/30 transition-all group relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                    {item.icon}
                  </div>
                  
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${item.color}`}>{item.icon}</div>
                    <span className="text-[8px] font-black tracking-widest uppercase bg-white/5 px-2 py-1 rounded-md text-slate-500">{item.type}</span>
                  </div>

                  <h3 className="text-2xl font-serif italic text-white mb-1">{item.name}</h3>
                  <p className="text-[10px] uppercase tracking-widest text-emerald-500/50 font-bold mb-4">{item.property}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    <div className="px-2 py-1 bg-white/5 rounded-md border border-white/5 text-[8px] uppercase tracking-tighter text-slate-400">
                      Chakra: <span className="text-slate-200">{item.chakra}</span>
                    </div>
                    <div className="px-2 py-1 bg-white/5 rounded-md border border-white/5 text-[8px] uppercase tracking-tighter text-slate-400">
                      Planet: <span className="text-slate-200">{item.planet}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 font-light leading-relaxed mb-6 h-10 line-clamp-2 italic">"{item.description}"</p>
                  
                  <button className="w-full py-3 rounded-xl bg-white/5 border border-white/5 text-[9px] uppercase tracking-widest font-bold text-slate-500 hover:text-emerald-300 hover:bg-emerald-500/10 transition-all">
                    Study Specimen
                  </button>
                </div>
              ))}
            </motion.div>
          )}

          {/* MOON CALENDAR TAB */}
          {activeTab === 'calendar' && (
            <motion.div key="cal" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
               <div className="text-center p-16 bg-white/[0.02] border border-white/5 rounded-[3rem] backdrop-blur-3xl">
                  <Moon size={60} className="mx-auto text-emerald-400 mb-6 drop-shadow-[0_0_15px_rgba(52,211,153,0.4)]" />
                  <h2 className="text-4xl font-serif italic text-white mb-2">{moonData.phase}</h2>
                  <p className="text-emerald-500 tracking-[0.4em] uppercase text-[10px] font-bold mb-12">{moonData.illumination}% ILLUMINATED</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                    {[
                      { title: 'Current Ritual', desc: moonData.illumination > 50 ? 'Crystal Charging & External Action' : 'Intention Setting & Shadow Work' },
                      { title: 'Element Focus', desc: moonData.illumination > 50 ? 'Fire & Air (Active Elements)' : 'Earth & Water (Receptive Elements)' },
                      { title: 'Alchemist Note', desc: 'The veil is currently ' + (moonData.illumination > 70 ? 'thin and vibrant.' : 'quiet and reflective.') }
                    ].map(box => (
                      <div key={box.title} className="p-6 bg-white/5 rounded-2xl border border-white/10">
                        <h4 className="text-[9px] uppercase tracking-widest text-emerald-500/70 font-bold mb-2">{box.title}</h4>
                        <p className="text-xs text-slate-300 font-light leading-relaxed">{box.desc}</p>
                      </div>
                    ))}
                  </div>
               </div>
            </motion.div>
          )}

          {/* ALTAR TAB */}
          {activeTab === 'altar' && (
            <motion.div key="alt" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl mx-auto">
              <div className="bg-[#06120f] border border-white/10 p-12 rounded-[3rem] shadow-2xl">
                <div className="flex justify-center mb-8 text-emerald-500/30"><PenTool size={32} /></div>
                <h3 className="text-2xl font-serif italic text-white text-center mb-8">Set Your Intention</h3>
                <textarea 
                  value={intent}
                  onChange={(e) => setIntent(e.target.value)}
                  placeholder="I seek clarity in..."
                  className="w-full bg-transparent border-none text-xl font-serif italic text-emerald-100 placeholder:text-slate-800 focus:ring-0 h-32 resize-none text-center"
                />
                <div className="h-[1px] w-12 bg-emerald-500/20 mx-auto my-8" />
                <button className="w-full py-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-emerald-500/20 transition-all shadow-lg">
                  Bind to the Aether
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}