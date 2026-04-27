import React, { useState, useEffect, useMemo } from 'react';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Moon, Sparkles, Book, Leaf, Wind, Droplets, Flame, Mountain, 
  Shield, Sun, Zap, Eye, Heart, Star, Cloud,
  Layers, Coffee, Circle, Search, LogOut, BarChart3, ShoppingBag
} from 'lucide-react';

// --- THE MASTER DATABASE (Full 80+ Items) ---
const MASTER_DATA = [
  // CRYSTALS
  { id: 'c1', name: 'Moonstone', type: 'Crystal', property: 'Intuition', tags: ['psychic', 'dreams'], color: 'text-blue-200', icon: <Moon size={18} /> },
  { id: 'c2', name: 'Amethyst', type: 'Crystal', property: 'Peace', tags: ['anxiety', 'sleep'], color: 'text-indigo-400', icon: <Sparkles size={18} /> },
  { id: 'c3', name: 'Citrine', type: 'Crystal', property: 'Wealth', tags: ['money', 'success'], color: 'text-yellow-500', icon: <Sun size={18} /> },
  { id: 'c4', name: 'Rose Quartz', type: 'Crystal', property: 'Love', tags: ['romance', 'healing'], color: 'text-pink-300', icon: <Heart size={18} /> },
  { id: 'c5', name: 'Selenite', type: 'Crystal', property: 'Cleansing', tags: ['purify', 'charging'], color: 'text-slate-100', icon: <Zap size={18} /> },
  { id: 'c6', name: 'Black Tourmaline', type: 'Crystal', property: 'Shield', tags: ['protection', 'grounding'], color: 'text-slate-600', icon: <Shield size={18} /> },
  { id: 'c7', name: 'Labradorite', type: 'Crystal', property: 'Magic', tags: ['psychic', 'change'], color: 'text-cyan-400', icon: <Star size={18} /> },
  { id: 'c8', name: 'Tiger Eye', type: 'Crystal', property: 'Courage', tags: ['confidence', 'luck'], color: 'text-orange-400', icon: <Sun size={18} /> },
  { id: 'c9', name: 'Lapis Lazuli', type: 'Crystal', property: 'Truth', tags: ['wisdom', 'voice'], color: 'text-blue-600', icon: <Eye size={18} /> },
  { id: 'c10', name: 'Clear Quartz', type: 'Crystal', property: 'Amplify', tags: ['power', 'clarity'], color: 'text-white', icon: <Zap size={18} /> },
  { id: 'c11', name: 'Pyrite', type: 'Crystal', property: 'Luck', tags: ['money', 'protection'], color: 'text-yellow-600', icon: <Sun size={18} /> },
  { id: 'c12', name: 'Carnelian', type: 'Crystal', property: 'Creativity', tags: ['passion', 'action'], color: 'text-orange-600', icon: <Flame size={18} /> },
  { id: 'c13', name: 'Black Obsidian', type: 'Crystal', property: 'Shadow', tags: ['truth', 'protection'], color: 'text-black', icon: <Moon size={18} /> },
  { id: 'c14', name: 'Green Aventurine', type: 'Crystal', property: 'Opportunity', tags: ['money', 'growth'], color: 'text-emerald-400', icon: <Leaf size={18} /> },
  { id: 'c15', name: 'Fluorite', type: 'Crystal', property: 'Focus', tags: ['study', 'clarity'], color: 'text-purple-300', icon: <Wind size={18} /> },
  { id: 'c16', name: 'Hematite', type: 'Crystal', property: 'Grounding', tags: ['anxiety', 'shield'], color: 'text-slate-400', icon: <Mountain size={18} /> },
  { id: 'c17', name: 'Malachite', type: 'Crystal', property: 'Change', tags: ['transformation', 'heart'], color: 'text-green-800', icon: <Layers size={18} /> },
  { id: 'c18', name: 'Red Jasper', type: 'Crystal', property: 'Vitality', tags: ['strength', 'stamina'], color: 'text-red-700', icon: <Zap size={18} /> },
  { id: 'c19', name: 'Sodalite', type: 'Crystal', property: 'Logic', tags: ['calm', 'intelligence'], color: 'text-blue-800', icon: <Eye size={18} /> },
  { id: 'c20', name: 'Smoky Quartz', type: 'Crystal', property: 'Release', tags: ['detox', 'negativity'], color: 'text-stone-500', icon: <Cloud size={18} /> },
  { id: 'c21', name: 'Lepidolite', type: 'Crystal', property: 'Calm', tags: ['anxiety', 'transition'], color: 'text-purple-200', icon: <Wind size={18} /> },
  { id: 'c22', name: 'Amazonite', type: 'Crystal', property: 'Hope', tags: ['truth', 'courage'], color: 'text-teal-400', icon: <Droplets size={18} /> },
  { id: 'c23', name: 'Howlite', type: 'Crystal', property: 'Patience', tags: ['sleep', 'anger'], color: 'text-slate-200', icon: <Cloud size={18} /> },
  { id: 'c24', name: 'Unakite', type: 'Crystal', property: 'Balance', tags: ['rebirth', 'healing'], color: 'text-green-300', icon: <Heart size={18} /> },
  { id: 'c25', name: 'Aquamarine', type: 'Crystal', property: 'Flow', tags: ['peace', 'water'], color: 'text-cyan-200', icon: <Droplets size={18} /> },

  // HERBS
  { id: 'h1', name: 'Lavender', type: 'Herb', property: 'Peace', tags: ['sleep', 'calm'], color: 'text-purple-400', icon: <Wind size={18} /> },
  { id: 'h2', name: 'Mugwort', type: 'Herb', property: 'Vision', tags: ['dreams', 'psychic'], color: 'text-emerald-500', icon: <Moon size={18} /> },
  { id: 'h3', name: 'Rosemary', type: 'Herb', property: 'Memory', tags: ['focus', 'protection'], color: 'text-blue-400', icon: <Flame size={18} /> },
  { id: 'h4', name: 'Bay Leaf', type: 'Herb', property: 'Manifest', tags: ['wishes', 'money'], color: 'text-green-700', icon: <Leaf size={18} /> },
  { id: 'h5', name: 'Peppermint', type: 'Herb', property: 'Energy', tags: ['vitality', 'clear'], color: 'text-green-400', icon: <Zap size={18} /> },
  { id: 'h6', name: 'Chamomile', type: 'Herb', property: 'Calm', tags: ['anxiety', 'sleep'], color: 'text-yellow-100', icon: <Droplets size={18} /> },
  { id: 'h7', name: 'Basil', type: 'Herb', property: 'Luck', tags: ['money', 'prosperity'], color: 'text-green-600', icon: <Heart size={18} /> },
  { id: 'h8', name: 'Thyme', type: 'Herb', property: 'Bravery', tags: ['courage', 'health'], color: 'text-emerald-600', icon: <Shield size={18} /> },
  { id: 'h9', name: 'Sage', type: 'Herb', property: 'Cleanse', tags: ['purify', 'wisdom'], color: 'text-slate-400', icon: <Cloud size={18} /> },
  { id: 'h10', name: 'Cinnamon', type: 'Herb', property: 'Speed', tags: ['success', 'fast'], color: 'text-orange-900', icon: <Zap size={18} /> },
  { id: 'h11', name: 'Dandelion', type: 'Herb', property: 'Growth', tags: ['wishes', 'healing'], color: 'text-yellow-400', icon: <Sun size={18} /> },
  { id: 'h12', name: 'Eucalyptus', type: 'Herb', property: 'Healing', tags: ['health', 'breath'], color: 'text-cyan-600', icon: <Wind size={18} /> },
  { id: 'h13', name: 'Jasmine', type: 'Herb', property: 'Dreams', tags: ['love', 'prophetic'], color: 'text-slate-100', icon: <Star size={18} /> },
  { id: 'h14', name: 'Patchouli', type: 'Herb', property: 'Grounding', tags: ['money', 'lust'], color: 'text-stone-600', icon: <Mountain size={18} /> },
  { id: 'h15', name: 'Mistletoe', type: 'Herb', property: 'Protection', tags: ['luck', 'safety'], color: 'text-emerald-100', icon: <Shield size={18} /> },
  { id: 'h16', name: 'Nettle', type: 'Herb', property: 'Defense', tags: ['protection', 'strength'], color: 'text-green-900', icon: <Shield size={18} /> },
  { id: 'h17', name: 'Hibiscus', type: 'Herb', property: 'Passion', tags: ['love', 'lust'], color: 'text-red-500', icon: <Flame size={18} /> },
  { id: 'h18', name: 'Valerian', type: 'Herb', property: 'Deep Sleep', tags: ['calm', 'rest'], color: 'text-slate-500', icon: <Moon size={18} /> },
  { id: 'h19', name: 'Elderberry', type: 'Herb', property: 'Fates', tags: ['health', 'ancestors'], color: 'text-purple-900', icon: <Star size={18} /> },
  { id: 'h20', name: 'Yarrow', type: 'Herb', property: 'Boundary', tags: ['courage', 'safety'], color: 'text-pink-100', icon: <Shield size={18} /> },
  { id: 'h21', name: 'Vervain', type: 'Herb', property: 'Enchant', tags: ['magic', 'power'], color: 'text-purple-600', icon: <Sparkles size={18} /> },
  { id: 'h22', name: 'Calendula', type: 'Herb', property: 'Sun-Light', tags: ['joy', 'legal'], color: 'text-orange-400', icon: <Sun size={18} /> },
  { id: 'h23', name: 'Catnip', type: 'Herb', property: 'Fascination', tags: ['love', 'beauty'], color: 'text-emerald-300', icon: <Heart size={18} /> },
  { id: 'h24', name: 'Comfrey', type: 'Herb', property: 'Safety', tags: ['travel', 'healing'], color: 'text-green-200', icon: <Mountain size={18} /> },
  { id: 'h25', name: 'Witch Hazel', type: 'Herb', property: 'Mend', tags: ['healing', 'broken heart'], color: 'text-yellow-200', icon: <Zap size={18} /> },

  // PANTRY
  { id: 'k1', name: 'Sea Salt', type: 'Pantry', property: 'Shield', tags: ['protection', 'cleansing'], color: 'text-slate-100', icon: <Circle size={18} /> },
  { id: 'k2', name: 'Honey', type: 'Pantry', property: 'Sweetness', tags: ['love', 'friendship'], color: 'text-yellow-600', icon: <Droplets size={18} /> },
  { id: 'k3', name: 'Coffee', type: 'Pantry', property: 'Haste', tags: ['energy', 'focus'], color: 'text-amber-900', icon: <Coffee size={18} /> },
  { id: 'k4', name: 'Black Pepper', type: 'Pantry', property: 'Banish', tags: ['protection', 'exit'], color: 'text-slate-800', icon: <Zap size={18} /> },
  { id: 'k5', name: 'Rice', type: 'Pantry', property: 'Abundance', tags: ['money', 'fertility'], color: 'text-white', icon: <Cloud size={18} /> },
  { id: 'k6', name: 'Sugar', type: 'Pantry', property: 'Magnet', tags: ['love', 'attraction'], color: 'text-slate-200', icon: <Sparkles size={18} /> },
  { id: 'k7', name: 'Vinegar', type: 'Pantry', property: 'Break', tags: ['banishing', 'cleansing'], color: 'text-yellow-900', icon: <Droplets size={18} /> },
  { id: 'k8', name: 'Garlic', type: 'Pantry', property: 'Warding', tags: ['health', 'protection'], color: 'text-white', icon: <Shield size={18} /> },
  { id: 'k9', name: 'Onion Skin', type: 'Pantry', property: 'Layers', tags: ['healing', 'protection'], color: 'text-orange-300', icon: <Layers size={18} /> },
  { id: 'k10', name: 'Egg Shell', type: 'Pantry', property: 'Wall', tags: ['boundaries', 'protection'], color: 'text-slate-100', icon: <Circle size={18} /> },
  { id: 'k11', name: 'Clove', type: 'Pantry', property: 'Silence', tags: ['anti-gossip', 'luck'], color: 'text-amber-900', icon: <Shield size={18} /> },
  { id: 'k12', name: 'Star Anise', type: 'Pantry', property: 'Luck', tags: ['psychic', 'fortune'], color: 'text-amber-800', icon: <Star size={18} /> },
  { id: 'k13', name: 'Ginger', type: 'Pantry', property: 'Heat', tags: ['passion', 'speed'], color: 'text-orange-200', icon: <Flame size={18} /> },
  { id: 'k14', name: 'Nutmeg', type: 'Pantry', property: 'Coin', tags: ['money', 'gambling'], color: 'text-orange-900', icon: <Sun size={18} /> },
  { id: 'k15', name: 'Tea Leaves', type: 'Pantry', property: 'Fate', tags: ['future', 'divination'], color: 'text-emerald-900', icon: <Eye size={18} /> },
  { id: 'k16', name: 'Bayberry', type: 'Pantry', property: 'Gold', tags: ['money', 'wealth'], color: 'text-green-800', icon: <Sun size={18} /> },
  { id: 'k17', name: 'Olive Oil', type: 'Pantry', property: 'Bless', tags: ['anointing', 'peace'], color: 'text-yellow-600', icon: <Droplets size={18} /> },
  { id: 'k18', name: 'Allspice', type: 'Pantry', property: 'Drive', tags: ['success', 'energy'], color: 'text-amber-700', icon: <Zap size={18} /> },
  { id: 'k19', name: 'Mustard', type: 'Pantry', property: 'Faith', tags: ['protection', 'mental'], color: 'text-yellow-600', icon: <Zap size={18} /> },
  { id: 'k20', name: 'Orange Peel', type: 'Pantry', property: 'Joy', tags: ['luck', 'money'], color: 'text-orange-500', icon: <Sun size={18} /> },
  { id: 'k21', name: 'Lemon Peel', type: 'Pantry', property: 'Clean', tags: ['purify', 'love'], color: 'text-yellow-300', icon: <Zap size={18} /> },
  { id: 'k22', name: 'Vanilla', type: 'Pantry', property: 'Lust', tags: ['love', 'mental'], color: 'text-amber-100', icon: <Heart size={18} /> },
  { id: 'k23', name: 'Peppercorn', type: 'Pantry', property: 'Banish', tags: ['protection', 'fire'], color: 'text-slate-900', icon: <Flame size={18} /> },
  { id: 'k24', name: 'Cinnamon Stick', type: 'Pantry', property: 'Fast Luck', tags: ['money', 'speed'], color: 'text-orange-900', icon: <Zap size={18} /> },
  { id: 'k25', name: 'Flour', type: 'Pantry', property: 'Home', tags: ['stability', 'foundation'], color: 'text-slate-100', icon: <Mountain size={18} /> },

  // COLOURS
  { id: 'ca1', name: 'White', type: 'Colour', property: 'Purity', tags: ['universal'], color: 'text-white', icon: <Flame size={18} /> },
  { id: 'ca2', name: 'Black', type: 'Colour', property: 'Banishing', tags: ['protection'], color: 'text-slate-900', icon: <Flame size={18} /> },
  { id: 'ca3', name: 'Red', type: 'Colour', property: 'Passion', tags: ['strength'], color: 'text-red-500', icon: <Flame size={18} /> },
  { id: 'ca4', name: 'Green', type: 'Colour', property: 'Growth', tags: ['money'], color: 'text-emerald-500', icon: <Flame size={18} /> }
];

export default function Garden() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState('moon');
  const [subFilter, setSubFilter] = useState('Crystal');
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMateria, setSelectedMateria] = useState([]);
  const [rituals, setRituals] = useState([]);

  // --- IDENTITY & DATA SYNC ---
  useEffect(() => {
    base44.auth.me().then(u => {
      setUser(u);
      setIsAdmin(u?.role === 'admin');
      fetchRituals();
    }).catch(() => {
      base44.auth.redirectToLogin();
    });
  }, []);

  const fetchRituals = async () => {
    const data = await base44.entities.Ritual.list('-created_date');
    setRituals(data || []);
  };

  const saveRitual = async () => {
    if (!user) return;
    const names = selectedMateria.map(m => m.name);
    const intent = `Working of ${names.join(' and ')}`;
    await base44.entities.Ritual.create({ intent, tools: names });
    setSelectedMateria([]);
    await fetchRituals();
    setActiveTab('journal');
  };

  const toggleMateria = (item) => {
    if (selectedMateria.find(m => m.id === item.id)) {
      setSelectedMateria(prev => prev.filter(m => m.id !== item.id));
    } else if (selectedMateria.length < 4) {
      setSelectedMateria(prev => [...prev, item]);
    }
  };

  const mantra = useMemo(() => {
    if (selectedMateria.length === 0) return "Select your tools to begin...";
    const props = selectedMateria.map(m => m.property.toLowerCase());
    if (props.includes('wealth')) return "Abundance flows through me like the tide.";
    if (props.includes('shield')) return "I am protected in a sphere of pure light.";
    return "By my will and the old ways, this magic is bound.";
  }, [selectedMateria]);

  if (!user) {
    return (
      <div className="min-h-screen bg-[#020806] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emerald-500/20 border-t-emerald-400 rounded-full animate-spin" />
      </div>
    );
  }

  // --- ACTIVE APP VIEW ---
  return (
    <div className="min-h-screen bg-[#020806] text-slate-300 font-sans pb-32">
      <nav className="max-w-7xl mx-auto p-10 flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex items-center gap-3">
          <Moon className="text-emerald-400" size={24} />
          <h1 className="text-2xl font-serif italic text-white">Selene</h1>
        </div>
        
        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5 backdrop-blur-3xl shadow-xl">
          {['moon', 'library', 'altar', 'journal'].map(t => (
            <button key={t} onClick={() => setActiveTab(t)} className={`px-6 py-3 rounded-xl text-[10px] uppercase font-black tracking-widest transition-all ${activeTab === t ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-600 hover:text-slate-400'}`}>
              {t}
            </button>
          ))}
          {isAdmin && (
            <button onClick={() => setActiveTab('admin')} className={`px-4 transition-colors ${activeTab === 'admin' ? 'text-amber-400' : 'text-amber-900 hover:text-amber-500'}`}>
              <BarChart3 size={18}/>
            </button>
          )}
        </div>

        <button onClick={() => base44.auth.logout()} className="text-slate-800 hover:text-red-400 transition-colors"><LogOut size={18}/></button>
      </nav>

      <main className="max-w-7xl mx-auto px-8">
        <AnimatePresence mode="wait">
          
          {activeTab === 'moon' && (
            <motion.div key="moon" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-24 text-center">
              <Moon size={120} className="mx-auto text-emerald-400 mb-10 drop-shadow-[0_0_30px_rgba(52,211,153,0.2)]" />
              <h2 className="text-7xl font-serif italic text-white mb-6">Waning</h2>
              <div className="flex justify-center gap-10 text-[10px] uppercase tracking-[0.5em] text-emerald-500 font-black">
                <span>Phase: Release</span>
                <span className="text-slate-800">|</span>
                <span>Element: Water</span>
              </div>
            </motion.div>
          )}

          {activeTab === 'library' && (
            <motion.div key="lib" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex flex-col lg:flex-row justify-between items-end gap-10 mb-16 border-b border-white/5 pb-10">
                <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5">
                  {['Crystal', 'Herb', 'Pantry', 'Colour'].map(type => (
                    <button key={type} onClick={() => setSubFilter(type)} className={`px-6 py-2 rounded-xl text-[10px] uppercase font-black tracking-widest ${subFilter === type ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-600 hover:text-slate-500'}`}>{type}</button>
                  ))}
                </div>
                <div className="relative w-full lg:w-96">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-800" size={16} />
                  <input type="text" placeholder="Search intent (e.g. wealth)..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-14 pr-8 text-xs outline-none focus:ring-1 focus:ring-emerald-500/20" />
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
                {MASTER_DATA.filter(i => i.type === subFilter && (searchQuery === "" || i.tags.some(t => t.includes(searchQuery.toLowerCase())))).map(item => (
                  <div key={item.id} onClick={() => toggleMateria(item)} className={`p-10 rounded-[3rem] border transition-all cursor-pointer relative overflow-hidden group ${selectedMateria.find(s => s.id === item.id) ? 'bg-emerald-500/10 border-emerald-500/50' : 'bg-white/[0.02] border-white/5 hover:border-white/20'}`}>
                    <div className={`${item.color} mb-6 transition-transform group-hover:scale-110 duration-500`}>{item.icon}</div>
                    <p className="text-white font-serif italic text-xl">{item.name}</p>
                    <p className="text-[10px] uppercase tracking-widest text-slate-700 mt-2 font-black">{item.property}</p>
                  </div>
                ))}
              </div>
              
              {selectedMateria.length > 0 && (
                <div className="fixed bottom-12 left-1/2 -translate-x-1/2 bg-black border border-emerald-500/20 px-12 py-6 rounded-full flex items-center gap-12 shadow-3xl backdrop-blur-3xl z-[300]">
                   <p className="text-[10px] uppercase tracking-widest text-slate-600 font-black italic">{selectedMateria.length} / 4 Materia Prepared</p>
                   <button onClick={() => setActiveTab('altar')} className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400 hover:text-white transition-colors">Invoke Altar</button>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'altar' && (
            <motion.div key="altar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto py-10">
              <div className="bg-[#050c09] border border-emerald-500/20 p-24 rounded-[6rem] shadow-3xl text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
                <h3 className="text-[10px] uppercase tracking-[0.8em] text-emerald-500/40 font-black mb-16">The Mouth of Power</h3>
                <p className="text-5xl font-serif italic text-white leading-relaxed mb-16">"{mantra}"</p>
                <div className="flex justify-center gap-8 mb-20">
                  {selectedMateria.map(m => (
                    <div key={m.id} className={`${m.color} p-5 bg-white/5 rounded-3xl border border-white/5`}>{m.icon}</div>
                  ))}
                </div>
                <button onClick={saveRitual} className="w-full py-10 bg-emerald-500/5 border border-emerald-500/20 rounded-[3rem] text-emerald-400 font-black text-[14px] uppercase tracking-[0.7em] hover:bg-emerald-500/10 transition-all">Seal Into Eternal Log</button>
              </div>
            </motion.div>
          )}

          {activeTab === 'journal' && (
            <motion.div key="journal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 py-10 max-w-4xl mx-auto">
              <h2 className="text-3xl font-serif italic text-white mb-14 flex items-center gap-4"><Book size={20} className="text-emerald-500"/> The Book of Shadows</h2>
              {rituals.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-white/5 rounded-[4rem]">
                    <p className="text-slate-600 uppercase tracking-widest text-xs font-black">Your pages are empty...</p>
                </div>
              ) : rituals.map((r, i) => (
                <div key={i} className="p-12 bg-white/[0.01] border border-white/5 rounded-[4rem] flex flex-col md:flex-row justify-between items-start md:items-center gap-8 group hover:bg-white/[0.02] transition-all">
                  <div className="space-y-4">
                    <p className="text-2xl italic text-slate-300 font-serif leading-relaxed">"{r.intent}"</p>
                    <div className="flex gap-4">
                        {r.tools.map((t, idx) => (
                            <span key={idx} className="text-[9px] uppercase tracking-widest text-emerald-900 bg-emerald-500/5 px-3 py-1 rounded-full font-black">{t}</span>
                        ))}
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-800 font-black tracking-widest">{new Date(r.created_at).toLocaleDateString()}</p>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'admin' && isAdmin && (
            <motion.div key="admin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 space-y-12">
              <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-5xl font-serif text-amber-500 italic mb-2">Coven Analytics</h2>
                    <p className="text-xs uppercase tracking-[0.4em] text-slate-700 font-black">Owner View: Restricted</p>
                </div>
                <ShoppingBag className="text-amber-900" size={32} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <div className="p-16 bg-amber-500/5 border border-amber-500/20 rounded-[5rem]">
                   <p className="text-[11px] uppercase tracking-widest text-amber-900 font-black mb-4">Total Users</p>
                   <p className="text-6xl text-white font-serif">1</p>
                </div>
                <div className="p-16 bg-emerald-500/5 border border-emerald-500/20 rounded-[5rem]">
                   <p className="text-[11px] uppercase tracking-widest text-emerald-900 font-black mb-4">Market Potential</p>
                   <p className="text-6xl text-white font-serif">$0.00</p>
                </div>
                <div className="p-16 bg-white/[0.02] border border-white/5 rounded-[5rem]">
                   <p className="text-[11px] uppercase tracking-widest text-slate-800 font-black mb-4">Health</p>
                   <p className="text-6xl text-emerald-500 font-serif">A+</p>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}