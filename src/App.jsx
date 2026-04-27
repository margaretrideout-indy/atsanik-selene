import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sprout, Sparkles, Flame, Waves, Mountain, Wind, Droplets } from 'lucide-react';

// --- INITIAL DATA ---
const INITIAL_HERBS = [
  { 
    id: '1', 
    name: 'Moonlight Lavender', 
    element: 'Lunar Water', 
    rarity: 'RARE', 
    growth: 24, 
    description: 'A silvery-violet herb that blooms only under waning moons. Its fragrance induces vivid prophetic dreams.',
    color: 'from-purple-500 to-indigo-400',
    icon: <Waves size={16} />
  },
  { 
    id: '2', 
    name: 'Cinder Bloom', 
    element: 'Solar Fire', 
    rarity: 'LEGENDARY', 
    growth: 58, 
    description: 'Born from volcanic ash, this ember-petaled flower radiates warmth and can ignite under a full moon.',
    color: 'from-orange-600 to-red-500',
    icon: <Flame size={16} />
  },
  { 
    id: '3', 
    name: 'Star-Stitched Ivy', 
    element: 'Verdant Earth', 
    rarity: 'UNCOMMON', 
    growth: 41, 
    description: 'An ancient creeping vine whose leaves are traced with bioluminescent constellations after dusk.',
    color: 'from-emerald-500 to-teal-400',
    icon: <Mountain size={16} />
  }
];

// --- MAIN APPLICATION COMPONENT ---
export default function App() {
  const [herbs, setHerbs] = useState(INITIAL_HERBS);
  const [moonData, setMoonData] = useState({ phase: 'Calculating...', illumination: 0 });

  // LUNAR LOGIC: Real-time moon calculation
  useEffect(() => {
    const calculateMoon = () => {
      const lp = 2551443; 
      const now = new Date();
      const newMoon = new Date('1970-01-07T20:35:00');
      const phaseCycle = ((now.getTime() - newMoon.getTime()) / 1000) % lp;
      const days = phaseCycle / (24 * 3600);
      
      let phase = '';
      if (days < 1.8) phase = 'New Moon';
      else if (days < 5.5) phase = 'Waxing Crescent';
      else if (days < 9.2) phase = 'First Quarter';
      else if (days < 12.9) phase = 'Waxing Gibbous';
      else if (days < 16.6) phase = 'Full Moon';
      else if (days < 20.3) phase = 'Waning Gibbous';
      else if (days < 24.0) phase = 'Last Quarter';
      else phase = 'Waning Crescent';

      const illumination = Math.round(Math.abs(50 - (days / 30 * 100)) * 2);
      setMoonData({ phase, illumination });
    };

    calculateMoon();
  }, []);

  // NURTURE ACTION: Increments growth based on lunar power
  const nurtureHerb = (id) => {
    setHerbs(prev => prev.map(herb => {
      if (herb.id === id && herb.growth < 100) {
        // High illumination (over 70%) provides a 2x growth boost!
        const powerBoost = moonData.illumination > 70 ? 12 : 6;
        return { ...herb, growth: Math.min(herb.growth + powerBoost, 100) };
      }
      return herb;
    }));
  };

  return (
    <div className="min-h-screen bg-[#040d0a] text-slate-200 font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      {/* BACKGROUND GLOW */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1] 
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-1/4 -left-1/4 w-full h-full bg-emerald-500/20 blur-[120px] rounded-full"
        />
      </div>

      {/* HEADER / NAVIGATION */}
      <nav className="relative z-10 max-w-7xl mx-auto px-8 py-10 flex justify-between items-start">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
              <Moon className="text-emerald-400" size={24} />
            </motion.div>
            <h1 className="text-2xl font-extralight tracking-[0.4em] uppercase text-white">
              Selene's Garden
            </h1>
          </div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-500/60 font-bold ml-10">
            Mystical Herbarium
          </p>
        </div>

        {/* LUNAR BADGE */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-md px-5 py-3 rounded-2xl flex items-center gap-4">
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold leading-none mb-1">
              {moonData.phase}
            </p>
            <p className="text-xs text-emerald-300 font-light italic">
              {moonData.illumination}% Illuminated
            </p>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500/20 to-emerald-400/40 border border-emerald-500/30 flex items-center justify-center">
            <Sparkles size={14} className="text-emerald-300" />
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="relative z-10 max-w-7xl mx-auto px-8 pb-20">
        <header className="max-w-2xl mb-16 text-center mx-auto">
          <div className="flex items-center justify-center gap-4 mb-4 text-emerald-500/40">
            <div className="h-[1px] w-12 bg-current" />
            <Sprout size={20} />
            <div className="h-[1px] w-12 bg-current" />
          </div>
          <h2 className="text-4xl font-serif italic text-white mb-4">Botanical Collection</h2>
          <p className="text-slate-400 font-light leading-relaxed">
            Cultivate rare specimens under the moonlight. Each plant responds to your care and the celestial cycle.
          </p>
        </header>

        {/* HERB GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {herbs.map((herb) => (
            <motion.div 
              key={herb.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group relative bg-[#061411] border border-white/5 rounded-[2rem] p-8 hover:border-emerald-500/30 transition-all duration-500"
            >
              {/* CARD TOP INFO */}
              <div className="flex justify-between items-start mb-8">
                <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-emerald-400">
                  {herb.icon}
                </div>
                <span className="text-[9px] font-bold tracking-[0.2em] px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                  {herb.rarity}
                </span>
              </div>

              {/* CARD TEXT */}
              <h3 className="text-2xl font-serif italic text-white mb-3 group-hover:text-emerald-300 transition-colors">
                {herb.name}
              </h3>
              <p className="text-sm text-slate-400 font-light leading-relaxed mb-8 h-12 overflow-hidden">
                {herb.description}
              </p>

              {/* META INFO */}
              <div className="flex items-center gap-2 mb-6 text-[10px] font-bold uppercase tracking-widest text-emerald-500/60">
                <Wind size={12} />
                <span>Element · {herb.element}</span>
              </div>

              {/* PROGRESS BAR */}
              <div className="space-y-3 mb-8">
                <div className="flex justify-between text-[10px] tracking-widest font-bold">
                  <span className="text-slate-500 uppercase">Growth</span>
                  <span className="text-emerald-400">{herb.growth}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${herb.growth}%` }}
                    className={`h-full bg-gradient-to-r ${herb.color} shadow-[0_0_10px_rgba(52,211,153,0.3)]`}
                  />
                </div>
              </div>

              {/* INTERACTIVE BUTTON */}
              <button 
                onClick={() => nurtureHerb(herb.id)}
                disabled={herb.growth >= 100}
                className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 group/btn ${
                  herb.growth >= 100 
                    ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 cursor-default'
                    : 'bg-emerald-500/5 border border-emerald-500/10 text-emerald-200 hover:bg-emerald-500/20 hover:border-emerald-500/40'
                }`}
              >
                {herb.growth >= 100 ? (
                  <>
                    <Sparkles size={16} />
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Fully Bloomed</span>
                  </>
                ) : (
                  <>
                    <Sprout size={16} className="group-hover/btn:scale-110 transition-transform" />
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-emerald-400">Nurture</span>
                  </>
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App