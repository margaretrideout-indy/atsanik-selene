import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Moon, Sparkles, Book, Leaf, Wind, Droplets, 
  Flame, Mountain, Shield, Sun, Clock, History, Zap, Eye, Heart, Star, Cloud
} from 'lucide-react';

// --- THE MASTER ARCHIVE (50 UNIQUE ITEMS) ---
const MATERIA_DATA = [
  // --- CRYSTALS ---
  { id: 'c1', name: 'Moonstone', type: 'Crystal', element: 'Water', property: 'Intuition', planet: 'Moon', description: 'Connects to the divine feminine and new beginnings.', icon: <Droplets size={18} />, color: 'text-blue-200', theme: 'border-blue-500/20' },
  { id: 'c2', name: 'Amethyst', type: 'Crystal', element: 'Spirit', property: 'Peace', planet: 'Jupiter', description: 'Transmutes negative energy into love and protection.', icon: <Sparkles size={18} />, color: 'text-indigo-400', theme: 'border-indigo-500/20' },
  { id: 'c3', name: 'Citrine', type: 'Crystal', element: 'Fire', property: 'Wealth', planet: 'Sun', description: 'The stone of manifestation and personal will.', icon: <Sun size={18} />, color: 'text-yellow-500', theme: 'border-yellow-500/20' },
  { id: 'c4', name: 'Rose Quartz', type: 'Crystal', element: 'Water', property: 'Love', planet: 'Venus', description: 'The stone of universal love and infinite peace.', icon: <Heart size={18} />, color: 'text-pink-300', theme: 'border-pink-500/20' },
  { id: 'c5', name: 'Selenite', type: 'Crystal', element: 'Spirit', property: 'Cleansing', planet: 'Moon', description: 'Ideal for clearing the aura and charging other stones.', icon: <Zap size={18} />, color: 'text-slate-100', theme: 'border-slate-300/20' },
  { id: 'c6', name: 'Black Tourmaline', type: 'Crystal', element: 'Earth', property: 'Shield', planet: 'Saturn', description: 'A premier stone for protection and grounding energy.', icon: <Shield size={18} />, color: 'text-slate-600', theme: 'border-slate-800/40' },
  { id: 'c7', name: 'Lapis Lazuli', type: 'Crystal', element: 'Air', property: 'Truth', planet: 'Venus', description: 'Encourages self-awareness and reveals inner truth.', icon: <Eye size={18} />, color: 'text-blue-600', theme: 'border-blue-700/20' },
  { id: 'c8', name: 'Tiger Eye', type: 'Crystal', element: 'Earth', property: 'Courage', planet: 'Sun', description: 'A stone of protection that may also bring luck.', icon: <Sun size={18} />, color: 'text-orange-400', theme: 'border-orange-500/20' },
  { id: 'c9', name: 'Clear Quartz', type: 'Crystal', element: 'Spirit', property: 'Amplify', planet: 'Sun', description: 'The master healer. Amplifies energy and thought.', icon: <Sparkles size={18} />, color: 'text-slate-200', theme: 'border-white/20' },
  { id: 'c10', name: 'Labradorite', type: 'Crystal', element: 'Air', property: 'Magic', planet: 'Uranus', description: 'The stone of transformation and mystical protection.', icon: <Star size={18} />, color: 'text-cyan-400', theme: 'border-cyan-500/20' },
  { id: 'c11', name: 'Pyrite', type: 'Crystal', element: 'Earth', property: 'Willpower', planet: 'Mars', description: 'Shields against negative energy and physical danger.', icon: <Flame size={18} />, color: 'text-yellow-600', theme: 'border-yellow-700/20' },
  { id: 'c12', name: 'Obsidian', type: 'Crystal', element: 'Fire', property: 'Shadow', planet: 'Saturn', description: 'Forms a shield against negativity and stress.', icon: <Moon size={18} />, color: 'text-slate-900', theme: 'border-slate-900/50' },
  { id: 'c13', name: 'Fluorite', type: 'Crystal', element: 'Air', property: 'Focus', planet: 'Mercury', description: 'Cleanses and stabilizes the aura.', icon: <Wind size={18} />, color: 'text-green-300', theme: 'border-green-400/20' },
  { id: 'c14', name: 'Malachite', type: 'Crystal', element: 'Earth', property: 'Growth', planet: 'Venus', description: 'A stone of transformation and emotional healing.', icon: <Mountain size={18} />, color: 'text-emerald-700', theme: 'border-emerald-800/20' },
  { id: 'c15', name: 'Carnelian', type: 'Crystal', element: 'Fire', property: 'Vitality', planet: 'Mars', description: 'Restores motivation and stimulates creativity.', icon: <Flame size={18} />, color: 'text-orange-600', theme: 'border-orange-700/20' },
  { id: 'c16', name: 'Aquamarine', type: 'Crystal', element: 'Water', property: 'Calm', planet: 'Moon', description: 'Its calming energies reduce stress and quiet the mind.', icon: <Droplets size={18} />, color: 'text-blue-300', theme: 'border-blue-400/20' },
  { id: 'c17', name: 'Bloodstone', type: 'Crystal', element: 'Earth', property: 'Grounding', planet: 'Mars', description: 'An excellent grounding and protecting stone.', icon: <Heart size={18} />, color: 'text-red-800', theme: 'border-red-900/20' },
  { id: 'c18', name: 'Celestite', type: 'Crystal', element: 'Air', property: 'Angelic', planet: 'Neptune', description: 'Connected to divine energies and angelic realms.', icon: <Cloud size={18} />, color: 'text-sky-200', theme: 'border-sky-300/20' },
  { id: 'c19', name: 'Garnet', type: 'Crystal', element: 'Fire', property: 'Passion', planet: 'Mars', description: 'Revitalizes, purifies and balances energy.', icon: <Flame size={18} />, color: 'text-red-600', theme: 'border-red-700/20' },
  { id: 'c20', name: 'Howlite', type: 'Crystal', element: 'Air', property: 'Sleep', planet: 'Moon', description: 'An extremely calming stone. Excellent for insomnia.', icon: <Moon size={18} />, color: 'text-slate-100', theme: 'border-slate-200/20' },
  { id: 'c21', name: 'Jade', type: 'Crystal', element: 'Earth', property: 'Wisdom', planet: 'Venus', description: 'A symbol of serenity and purity. Signifies wisdom.', icon: <Leaf size={18} />, color: 'text-green-500', theme: 'border-green-600/20' },
  { id: 'c22', name: 'Kyanite', type: 'Crystal', element: 'Air', property: 'Alignment', planet: 'Mercury', description: 'Never needs cleansing. Does not accumulate negativity.', icon: <Zap size={18} />, color: 'text-blue-500', theme: 'border-blue-600/20' },
  { id: 'c23', name: 'Lepidolite', type: 'Crystal', element: 'Water', property: 'Balance', planet: 'Neptune', description: 'Assists in the release of old habits.', icon: <Sparkles size={18} />, color: 'text-purple-300', theme: 'border-purple-400/20' },
  { id: 'c24', name: 'Rhodonite', type: 'Crystal', element: 'Earth', property: 'Forgiveness', planet: 'Venus', description: 'An emotional balancer that clears scars.', icon: <Heart size={18} />, color: 'text-pink-600', theme: 'border-pink-700/20' },
  { id: 'c25', name: 'Sunstone', type: 'Crystal', element: 'Fire', property: 'Joy', planet: 'Sun', description: 'Instills good nature and heightens intuition.', icon: <Sun size={18} />, color: 'text-orange-300', theme: 'border-orange-400/20' },

  // --- HERBS ---
  { id: 'h1', name: 'Lavender', type: 'Herb', element: 'Air', property: 'Peace', planet: 'Mercury', description: 'Used for calming the mind and inducing dreams.', icon: <Wind size={18} />, color: 'text-purple-400', theme: 'border-emerald-500/20' },
  { id: 'h2', name: 'Mugwort', type: 'Herb', element: 'Earth', property: 'Vision', planet: 'Moon', description: 'Enhances psychic vision and astral projection.', icon: <Mountain size={18} />, color: 'text-emerald-500', theme: 'border-emerald-500/20' },
  { id: 'h3', name: 'Rosemary', type: 'Herb', element: 'Fire', property: 'Memory', planet: 'Sun', description: 'Used for mental clarity and protection.', icon: <Flame size={18} />, color: 'text-blue-400', theme: 'border-emerald-500/20' },
  { id: 'h4', name: 'White Sage', type: 'Herb', element: 'Fire', property: 'Cleansing', planet: 'Jupiter', description: 'Clears negative energy from sacred spaces.', icon: <Wind size={18} />, color: 'text-emerald-100', theme: 'border-emerald-500/20' },
  { id: 'h5', name: 'Peppermint', type: 'Herb', element: 'Fire', property: 'Energy', planet: 'Mercury', description: 'Increases vibrations and provides a boost.', icon: <Flame size={18} />, color: 'text-green-400', theme: 'border-emerald-500/20' },
  { id: 'h6', name: 'Bay Leaf', type: 'Herb', element: 'Fire', property: 'Manifest', planet: 'Sun', description: 'Burn to release intentions into the universe.', icon: <Flame size={18} />, color: 'text-green-700', theme: 'border-emerald-500/20' },
  { id: 'h7', name: 'Chamomile', type: 'Herb', element: 'Water', property: 'Calm', planet: 'Sun', description: 'Soothes the spirit and attracts prosperity.', icon: <Droplets size={18} />, color: 'text-yellow-100', theme: 'border-emerald-500/20' },
  { id: 'h8', name: 'Patchouli', type: 'Herb', element: 'Earth', property: 'Money', planet: 'Saturn', description: 'Used to draw wealth and grounding energy.', icon: <Mountain size={18} />, color: 'text-yellow-900', theme: 'border-emerald-500/20' },
  { id: 'h9', name: 'Nettle', type: 'Herb', element: 'Fire', property: 'Warding', planet: 'Mars', description: 'A classic herb for protection and breaking hexes.', icon: <Zap size={18} />, color: 'text-green-600', theme: 'border-emerald-500/20' },
  { id: 'h10', name: 'Basil', type: 'Herb', element: 'Fire', property: 'Luck', planet: 'Mars', description: 'Brings good luck and harmonizes the home.', icon: <Leaf size={18} />, color: 'text-green-400', theme: 'border-emerald-500/20' },
  { id: 'h11', name: 'Calendula', type: 'Herb', element: 'Fire', property: 'Light', planet: 'Sun', description: 'Brings solar energy into legal success.', icon: <Sun size={18} />, color: 'text-orange-400', theme: 'border-emerald-500/20' },
  { id: 'h12', name: 'Clove', type: 'Herb', element: 'Fire', property: 'Driving', planet: 'Jupiter', description: 'Drives away negativity and stops gossip.', icon: <Flame size={18} />, color: 'text-red-900', theme: 'border-emerald-500/20' },
  { id: 'h13', name: 'Dandelion', type: 'Herb', element: 'Air', property: 'Wishes', planet: 'Jupiter', description: 'Used for calling spirits and making wishes.', icon: <Wind size={18} />, color: 'text-yellow-200', theme: 'border-emerald-500/20' },
  { id: 'h14', name: 'Eucalyptus', type: 'Herb', element: 'Water', property: 'Healing', planet: 'Moon', description: 'Excellent for ritual baths and health.', icon: <Droplets size={18} />, color: 'text-emerald-300', theme: 'border-emerald-500/20' },
  { id: 'h15', name: 'Fennel', type: 'Herb', element: 'Fire', property: 'Courage', planet: 'Mercury', description: 'Provides strength and wards off interference.', icon: <Shield size={18} />, color: 'text-green-200', theme: 'border-emerald-500/20' },
  { id: 'h16', name: 'Hibiscus', type: 'Herb', element: 'Water', property: 'Passion', planet: 'Venus', description: 'Used to attract love and incite passion.', icon: <Heart size={18} />, color: 'text-pink-500', theme: 'border-emerald-500/20' },
  { id: 'h17', name: 'Jasmine', type: 'Herb', element: 'Water', property: 'Spirit', planet: 'Moon', description: 'Used for spiritual love and money.', icon: <Sparkles size={18} />, color: 'text-slate-100', theme: 'border-emerald-500/20' },
  { id: 'h18', name: 'Lemon Balm', type: 'Herb', element: 'Water', property: 'Success', planet: 'Moon', description: 'Brings success and heals distress.', icon: <Droplets size={18} />, color: 'text-yellow-400', theme: 'border-emerald-500/20' },
  { id: 'h19', name: 'Mistletoe', type: 'Herb', element: 'Air', property: 'Sun', planet: 'Sun', description: 'Used for protection and fertility magic.', icon: <Sun size={18} />, color: 'text-emerald-200', theme: 'border-emerald-500/20' },
  { id: 'h20', name: 'Oak', type: 'Herb', element: 'Earth', property: 'Stability', planet: 'Mars', description: 'Provides great strength and longevity.', icon: <Mountain size={18} />, color: 'text-yellow-800', theme: 'border-emerald-500/20' },
  { id: 'h21', name: 'Pine', type: 'Herb', element: 'Air', property: 'Purify', planet: 'Mars', description: 'Used for cleansing and attracting money.', icon: <Wind size={18} />, color: 'text-green-800', theme: 'border-emerald-500/20' },
  { id: 'h22', name: 'Rose', type: 'Herb', element: 'Water', property: 'Devotion', planet: 'Venus', description: 'The premier herb for all beauty magic.', icon: <Heart size={18} />, color: 'text-pink-400', theme: 'border-emerald-500/20' },
  { id: 'h23', name: 'Thyme', type: 'Herb', element: 'Water', property: 'Bravery', planet: 'Venus', description: 'Burned for good health and courage.', icon: <Flame size={18} />, color: 'text-green-500', theme: 'border-emerald-500/20' },
  { id: 'h24', name: 'Valerian', type: 'Herb', element: 'Water', property: 'Sleep', planet: 'Mercury', description: 'Used in protection and love magic.', icon: <Moon size={18} />, color: 'text-slate-400', theme: 'border-emerald-500/20' },
  { id: 'h25', name: 'Yarrow', type: 'Herb', element: 'Water', property: 'Banishing', planet: 'Venus', description: 'Used to banish fear and bring courage.', icon: <Shield size={18} />, color: 'text-slate-300', theme: 'border-emerald-500/20' }
];

export default function Garden() {
  const [activeTab, setActiveTab] = useState('library');
  const [subFilter, setSubFilter] = useState('Crystal');
  const [showAll, setShowAll] = useState(false);
  const [moonData, setMoonData] = useState({ phase: 'Calculating...', illumination: 0, daysToFull: 0 });
  const [intent, setIntent] = useState("");
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('ritual_history');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => { setShowAll(false); }, [subFilter]);

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

  // --- ORDERING LOGIC ---
  const filteredData = MATERIA_DATA
    .filter(item => item.type === subFilter)
    .sort((a, b) => a.name.localeCompare(b.name)); // Alphabetizes A-Z

  const visibleData = showAll ? filteredData : filteredData.slice(0, 9);

  return (
    <div className="min-h-screen bg-[#040d0a] text-slate-200 font-sans pb-20 selection:bg-emerald-500/30">
      <nav className="max-w-7xl mx-auto px-8 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <Moon className="text-emerald-400" />
          <h1 className="text-xl font-light tracking-[0.4em] uppercase text-white">Selene</h1>
        </div>
        <div className="flex bg-white/5 border border-white/10 p-1 rounded-2xl">
          {['library', 'moon', 'altar'].map(t => (
            <button key={t} onClick={() => setActiveTab(t)} className={`px-8 py-2.5 rounded-xl text-[9px] uppercase tracking-widest font-bold transition-all ${activeTab === t ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/20' : 'text-slate-500'}`}>
              {t}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8">
        <AnimatePresence mode="wait">
          {activeTab === 'library' && (
            <motion.div key="lib" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex justify-center gap-12 mb-12 border-b border-white/5 pb-4">
                {['Crystal', 'Herb'].map((f) => (
                  <button key={f} onClick={() => setSubFilter(f)} className={`text-[9px] uppercase tracking-[0.3em] font-bold relative pb-4 ${subFilter === f ? 'text-emerald-400' : 'text-slate-600'}`}>
                    {f}s {subFilter === f && <motion.div layoutId="un" className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-400" />}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleData.map(item => (
                  <motion.div layout key={item.id} className={`bg-[#06120f] border ${item.theme} p-8 rounded-[2rem] hover:border-emerald-500/40 transition-all`}>
                    <div className="flex justify-between mb-6">
                      <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${item.color}`}>{item.icon}</div>
                      <div className="text-[8px] font-black uppercase tracking-widest text-slate-500">{item.type}</div>
                    </div>
                    <h3 className="text-2xl font-serif italic mb-1 text-white">{item.name}</h3>
                    <div className="flex gap-2 mb-4 text-[8px] font-bold uppercase tracking-widest text-emerald-500/60">
                      <span>{item.element}</span> • <span>{item.planet}</span>
                    </div>
                    <p className="text-sm text-slate-400 font-light mb-8 italic">"{item.description}"</p>
                    <div className="flex items-center gap-3 text-[10px] text-slate-500 border-t border-white/5 pt-5">
                      <Zap size={12} className="text-emerald-500/50" />
                      <span>{item.property}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {!showAll && (
                <div className="flex justify-center mt-12">
                  <button onClick={() => setShowAll(true)} className="px-12 py-4 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl text-[9px] uppercase tracking-[0.4em] font-bold text-emerald-400 hover:bg-emerald-500/20 transition-all">
                    Expand {subFilter} Archive
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'moon' && (
            <motion.div key="moon" className="max-w-4xl mx-auto text-center p-16 bg-white/[0.02] border border-white/5 rounded-[3rem]">
                <Moon size={64} className="mx-auto text-emerald-400 mb-6" />
                <h2 className="text-4xl font-serif italic text-white mb-2">{moonData.phase}</h2>
                <p className="text-emerald-500 tracking-[0.4em] text-[10px] mb-12 uppercase">{moonData.daysToFull} Days to Full Moon</p>
                <div className="grid grid-cols-2 gap-4 text-left">
                  <div className="p-8 bg-white/5 rounded-[2rem] border border-white/10">
                    <p className="text-[9px] uppercase text-emerald-500 mb-2">Luminance</p>
                    <p className="text-3xl text-white font-serif">{moonData.illumination}%</p>
                  </div>
                  <div className="p-8 bg-white/5 rounded-[2rem] border border-white/10">
                    <p className="text-[9px] uppercase text-emerald-500 mb-2">Focus</p>
                    <p className="text-xs text-slate-400">{moonData.illumination > 50 ? 'Expansion' : 'Banishing'}</p>
                  </div>
                </div>
            </motion.div>
          )}

          {activeTab === 'altar' && (
            <motion.div key="altar" className="max-w-2xl mx-auto space-y-8">
              <div className="bg-[#06120f] border border-white/10 p-12 rounded-[3rem]">
                <h3 className="text-xl font-serif italic text-white text-center mb-8 uppercase tracking-[0.3em]">Intent</h3>
                <textarea value={intent} onChange={(e) => setIntent(e.target.value)} placeholder="Cast focus..." className="w-full bg-transparent border-none text-center text-xl italic text-emerald-100 focus:ring-0 h-24" />
                <button onClick={bindIntention} className="w-full py-5 mt-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-emerald-500/20">Bind</button>
              </div>
              {history.map((entry, i) => (
                <div key={i} className="p-6 bg-white/5 border border-white/5 rounded-2xl italic text-slate-400 text-sm">
                  "{entry.text}" <span className="float-right text-[9px] not-italic text-slate-600">{entry.date}</span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}