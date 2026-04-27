import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Moon, Sparkles, Book, Leaf, Wind, Droplets, Flame, Mountain, 
  Shield, Sun, Clock, Zap, Eye, Heart, Star, Cloud, Plus, X, Layers, Coffee, Circle, Search, ChevronDown, ChevronUp
} from 'lucide-react';

// --- THE EXPANDED DATABASE (25 per category where requested) ---
const MASTER_DATA = [
  // CRYSTALS (25)
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

  // HERBS (25)
  { id: 'h1', name: 'Lavender', type: 'Herb', property: 'Peace', tags: ['sleep', 'calm'], color: 'text-purple-400', icon: <Wind size={18} /> },
  { id: 'h2', name: 'Mugwort', type: 'Herb', property: 'Vision', tags: ['dreams', 'psychic'], color: 'text-emerald-500', icon: <Moon size={18} /> },
  { id: 'h3', name: 'Rosemary', type: 'Herb', property: 'Memory', tags: ['focus', 'protection'], color: 'text-blue-400', icon: <Flame size={18} /> },
  { id: 'h4', name: 'Bay Leaf', type: 'Herb', property: 'Manifest', tags: ['wishes', 'money'], color: 'text-green-700', icon: <Leaf size={18} /> },
  { id: 'h5', name: 'Peppermint', type: 'Herb', property: 'Energy', tags: ['vitality', 'clear'], color: 'text-green-400', icon: <Zap size={18} /> },
  { id: 'h6', name: 'Chamomile', type: 'Herb', property: 'Calm', tags: ['anxiety', 'sleep'], color: 'text-yellow-100', icon: <Droplets size={18} /> },
  { id: 'h7', name: 'Basil', type: 'Herb', property: 'Luck', tags: ['money', 'prosperity'], color: 'text-green-600', icon: <Heart size={18} /> },
  { id: 'h8', name: 'Thyme', type: 'Herb', property: 'Bravery', tags: ['courage', 'health'], color: 'text-emerald-600', icon: <Shield size={18} /> },
  { id: 'h9', name: 'Sage', type: 'Herb', property: 'Cleanse', tags: ['purify', 'wisdom'], color: 'text-slate-400', icon: <Cloud size={18} /> },
  { id: 'h10', name: 'Cinnamon Sticks', type: 'Herb', property: 'Speed', tags: ['success', 'fast'], color: 'text-orange-900', icon: <Zap size={18} /> },
  { id: 'h11', name: 'Dandelion', type: 'Herb', property: 'Growth', tags: ['wishes', 'healing'], color: 'text-yellow-400', icon: <Sun size={18} /> },
  { id: 'h12', name: 'Eucalyptus', type: 'Herb', property: 'Healing', tags: ['health', 'breath'], color: 'text-cyan-600', icon: <Wind size={18} /> },
  { id: 'h13', name: 'Jasmine', type: 'Herb', property: 'Dreams', tags: ['love', 'prophetic'], color: 'text-slate-100', icon: <Star size={18} /> },
  { id: 'h14', name: 'Patchouli', type: 'Herb', property: 'Grounding', tags: ['money', 'lust'], color: 'text-stone-600', icon: <Mountain size={18} /> },
  { id: 'h15', name: 'Mistletoe', type: 'Herb', property: 'Protection', tags: ['luck', 'safety'], color: 'text-emerald-100', icon: <Shield size={18} /> },
  { id: 'h16', name: 'Mallow', type: 'Herb', property: 'Softness', tags: ['love', 'kindness'], color: 'text-pink-200', icon: <Heart size={18} /> },
  { id: 'h17', name: 'Hibiscus', type: 'Herb', property: 'Lust', tags: ['passion', 'divination'], color: 'text-red-500', icon: <Flame size={18} /> },
  { id: 'h18', name: 'Nettle', type: 'Herb', property: 'Binding', tags: ['protection', 'health'], color: 'text-green-900', icon: <Layers size={18} /> },
  { id: 'h19', name: 'Oregano', type: 'Herb', property: 'Joy', tags: ['happiness', 'home'], color: 'text-green-500', icon: <Sun size={18} /> },
  { id: 'h20', name: 'Comfrey', type: 'Herb', property: 'Travel', tags: ['safety', 'money'], color: 'text-green-200', icon: <Mountain size={18} /> },
  { id: 'h21', name: 'Valerian', type: 'Herb', property: 'Sleep', tags: ['deep rest', 'calm'], color: 'text-slate-500', icon: <Moon size={18} /> },
  { id: 'h22', name: 'Yarrow', type: 'Herb', property: 'Courage', tags: ['love', 'divination'], color: 'text-pink-100', icon: <Shield size={18} /> },
  { id: 'h23', name: 'Vervain', type: 'Herb', property: 'Enchant', tags: ['protection', 'money'], color: 'text-purple-600', icon: <Sparkles size={18} /> },
  { id: 'h24', name: 'Elderberry', type: 'Herb', property: 'Fate', tags: ['protection', 'healing'], color: 'text-indigo-900', icon: <Star size={18} /> },
  { id: 'h25', name: 'Calendula', type: 'Herb', property: 'Legal', tags: ['success', 'sun'], color: 'text-orange-500', icon: <Sun size={18} /> },

  // PANTRY (25)
  { id: 'k1', name: 'Sea Salt', type: 'Pantry', property: 'Shield', tags: ['protection', 'cleansing'], color: 'text-slate-100', icon: <Circle size={18} /> },
  { id: 'k2', name: 'Honey', type: 'Pantry', property: 'Sweetness', tags: ['love', 'friendship'], color: 'text-yellow-600', icon: <Droplets size={18} /> },
  { id: 'k3', name: 'Coffee', type: 'Pantry', property: 'Haste', tags: ['energy', 'focus'], color: 'text-amber-900', icon: <Coffee size={18} /> },
  { id: 'k4', name: 'Black Pepper', type: 'Pantry', property: 'Banish', tags: ['protection', 'exit'], color: 'text-slate-800', icon: <Zap size={18} /> },
  { id: 'k5', name: 'Penny', type: 'Pantry', property: 'Wealth', tags: ['money', 'luck'], color: 'text-orange-400', icon: <Sun size={18} /> },
  { id: 'k6', name: 'Sugar', type: 'Pantry', property: 'Attraction', tags: ['love', 'sweet'], color: 'text-white', icon: <Droplets size={18} /> },
  { id: 'k7', name: 'Tea Leaf', type: 'Pantry', property: 'Divination', tags: ['future', 'psychic'], color: 'text-green-800', icon: <Eye size={18} /> },
  { id: 'k8', name: 'Clove', type: 'Pantry', property: 'Gossip', tags: ['protection', 'stop rumors'], color: 'text-red-900', icon: <Shield size={18} /> },
  { id: 'k9', name: 'Egg Shell', type: 'Pantry', property: 'Boundary', tags: ['protection', 'rebirth'], color: 'text-slate-200', icon: <Circle size={18} /> },
  { id: 'k10', name: 'Garlic', type: 'Pantry', property: 'Warding', tags: ['health', 'vampiric energy'], color: 'text-slate-100', icon: <Shield size={18} /> },
  { id: 'k11', name: 'Onion Skin', type: 'Pantry', property: 'Layers', tags: ['protection', 'healing'], color: 'text-orange-200', icon: <Layers size={18} /> },
  { id: 'k12', name: 'Ginger', type: 'Pantry', property: 'Fire', tags: ['speed', 'passion'], color: 'text-amber-100', icon: <Flame size={18} /> },
  { id: 'k13', name: 'Apple Seed', type: 'Pantry', property: 'Love', tags: ['knowledge', 'romance'], color: 'text-red-300', icon: <Heart size={18} /> },
  { id: 'k14', name: 'Rice', type: 'Pantry', property: 'Abundance', tags: ['money', 'fertility'], color: 'text-slate-100', icon: <Cloud size={18} /> },
  { id: 'k15', name: 'Vinegar', type: 'Pantry', property: 'Sour', tags: ['banishing', 'curse breaking'], color: 'text-yellow-900', icon: <Droplets size={18} /> },
  { id: 'k16', name: 'Star Anise', type: 'Pantry', property: 'Luck', tags: ['psychic', 'fortune'], color: 'text-amber-800', icon: <Star size={18} /> },
  { id: 'k17', name: 'Nutmeg', type: 'Pantry', property: 'Gambling', tags: ['money', 'health'], color: 'text-orange-900', icon: <Sun size={18} /> },
  { id: 'k18', name: 'Allspice', type: 'Pantry', property: 'Fortune', tags: ['money', 'healing'], color: 'text-amber-700', icon: <Sun size={18} /> },
  { id: 'k19', name: 'Mustard Seed', type: 'Pantry', property: 'Faith', tags: ['protection', 'mental power'], color: 'text-yellow-600', icon: <Zap size={18} /> },
  { id: 'k20', name: 'Orange Peel', type: 'Pantry', property: 'Happiness', tags: ['money', 'joy'], color: 'text-orange-500', icon: <Sun size={18} /> },
  { id: 'k21', name: 'Lemon Peel', type: 'Pantry', property: 'Purify', tags: ['cleansing', 'love'], color: 'text-yellow-300', icon: <Zap size={18} /> },
  { id: 'k22', name: 'Flour', type: 'Pantry', property: 'Foundations', tags: ['home', 'stability'], color: 'text-white', icon: <Mountain size={18} /> },
  { id: 'k23', name: 'Bayberry', type: 'Pantry', property: 'Wealth', tags: ['money', 'fortune'], color: 'text-emerald-900', icon: <Sun size={18} /> },
  { id: 'k24', name: 'Vanilla', type: 'Pantry', property: 'Lust', tags: ['love', 'mental power'], color: 'text-orange-200', icon: <Heart size={18} /> },
  { id: 'k25', name: 'Sesame', type: 'Pantry', property: 'Openings', tags: ['money', 'passion'], color: 'text-stone-300', icon: <Zap size={18} /> },

  // COLOURS (Candles)
  { id: 'ca1', name: 'White', type: 'Colour', property: 'Purity', tags: ['universal', 'cleansing'], color: 'text-slate-100', icon: <Flame size={18} /> },
  { id: 'ca2', name: 'Black', type: 'Colour', property: 'Protection', tags: ['banishing', 'shield'], color: 'text-slate-900', icon: <Flame size={18} /> },
  { id: 'ca3', name: 'Red', type: 'Colour', property: 'Passion', tags: ['strength', 'courage'], color: 'text-red-500', icon: <Flame size={18} /> },
  { id: 'ca4', name: 'Pink', type: 'Colour', property: 'Love', tags: ['self-love', 'friendship'], color: 'text-pink-400', icon: <Flame size={18} /> },
  { id: 'ca5', name: 'Green', type: 'Colour', property: 'Wealth', tags: ['money', 'luck'], color: 'text-emerald-500', icon: <Flame size={18} /> },
  { id: 'ca6', name: 'Blue', type: 'Colour', property: 'Truth', tags: ['communication', 'peace'], color: 'text-blue-400', icon: <Flame size={18} /> },
  { id: 'ca7', name: 'Purple', type: 'Colour', property: 'Power', tags: ['psychic', 'ambition'], color: 'text-purple-600', icon: <Flame size={18} /> },
  { id: 'ca8', name: 'Yellow', type: 'Colour', property: 'Joy', tags: ['creativity', 'mental'], color: 'text-yellow-400', icon: <Flame size={18} /> },
  { id: 'ca9', name: 'Orange', type: 'Colour', property: 'Action', tags: ['success', 'justice'], color: 'text-orange-500', icon: <Flame size={18} /> }
];

const TAROT_DECK = [
  { name: "The Magician", meaning: "Manifestation, power, resourcefulness." },
  { name: "The High Priestess", meaning: "Intuition, mystery, inner voice." },
  { name: "The Empress", meaning: "Abundance, nurturing, creativity." },
  { name: "The Star", meaning: "Hope, serenity, inspiration." },
  { name: "The Moon", meaning: "Subconscious, trust your gut." },
  { name: "The Sun", meaning: "Success, vitality, joy." }
];

export default function Garden() {
  const [activeTab, setActiveTab] = useState('moon');
  const [subFilter, setSubFilter] = useState('Crystal');
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Ritual State
  const [selectedMateria, setSelectedMateria] = useState([]);
  const [tarotCard, setTarotCard] = useState(null);
  const [customIntent, setCustomIntent] = useState("");
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem('ritual_history') || '[]'));

  // Logic: LIVE AUTO-SPELL
  const generatedSpell = useMemo(() => {
    if (selectedMateria.length === 0) return "";
    const names = selectedMateria.map(m => m.name);
    const props = selectedMateria.map(m => m.property.toLowerCase());
    
    let text = `I gather ${names.join(', ')} to anchor my intent. `;
    text += `I call upon the forces of ${props.join(' and ')} to align with my will. `;
    if (props.includes('protection')) text += "I build a shield of light around my spirit. ";
    if (props.includes('wealth') || props.includes('money')) text += "I open my gates to prosperity and flow. ";
    if (props.includes('love')) text += "I resonate with harmony and deep affection. ";
    
    return text + "By the power within, so mote it be.";
  }, [selectedMateria]);

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

  // Filter Logic
  const filteredList = MASTER_DATA.filter(item => {
    const matchesTab = item.type === subFilter;
    const matchesSearch = searchQuery === "" || 
                          item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.tags.some(tag => tag.includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  const displayList = isExpanded ? filteredList : filteredList.slice(0, 8);

  return (
    <div className="min-h-screen bg-[#020806] text-slate-300 font-sans pb-32">
      {/* NAVIGATION */}
      <nav className="max-w-6xl mx-auto px-8 py-10 flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex items-center gap-3">
          <Moon className="text-emerald-400" size={24} />
          <h1 className="text-2xl font-light tracking-[0.6em] uppercase text-white">Selene</h1>
        </div>
        
        <div className="flex bg-white/[0.03] border border-white/10 p-1 rounded-2xl backdrop-blur-xl relative z-[100]">
          {['moon', 'library', 'oracle', 'altar'].map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl text-[10px] uppercase tracking-widest font-black transition-all cursor-pointer ${activeTab === tab ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-600 hover:text-slate-400'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-8 relative z-50">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: MOON */}
          {activeTab === 'moon' && (
            <motion.div key="moon" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto text-center py-20 bg-white/[0.01] border border-white/5 rounded-[4rem] relative">
              <Moon size={80} className="mx-auto text-emerald-400 mb-10 drop-shadow-[0_0_20px_rgba(52,211,153,0.3)]" />
              <h2 className="text-6xl font-serif italic text-white mb-4">Waning Gibbous</h2>
              <p className="text-emerald-500 tracking-[0.7em] text-[10px] font-black uppercase mb-16 italic">Timing is everything.</p>
              <button onClick={() => setActiveTab('library')} className="px-14 py-5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] font-black uppercase tracking-[0.5em] text-emerald-400 hover:bg-emerald-500/20 transition-all cursor-pointer">Start Gathering</button>
            </motion.div>
          )}

          {/* TAB 2: LIBRARY (CRYSTALS, HERBS, COLOURS, PANTRY) */}
          {activeTab === 'library' && (
            <motion.div key="lib" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-12 border-b border-white/5 pb-8">
                <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                  {['Crystal', 'Herb', 'Colour', 'Pantry'].map(type => (
                    <button 
                      key={type} 
                      onClick={() => {setSubFilter(type); setIsExpanded(false);}} 
                      className={`px-5 py-2.5 rounded-lg text-[10px] uppercase font-black tracking-widest cursor-pointer ${subFilter === type ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-600 hover:text-slate-500'}`}
                    >
                      {type}s
                    </button>
                  ))}
                </div>
                <div className="relative w-full lg:w-80">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search by intent..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-6 text-xs outline-none focus:ring-1 focus:ring-emerald-500/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {displayList.map(item => {
                  const isActive = selectedMateria.find(s => s.id === item.id);
                  return (
                    <motion.div 
                      key={item.id} 
                      whileHover={{ y: -5 }}
                      onClick={() => toggleMateria(item)}
                      className={`p-8 rounded-[2.5rem] border cursor-pointer transition-all relative overflow-hidden group z-[200] ${isActive ? 'bg-emerald-500/10 border-emerald-500/40 shadow-xl' : 'bg-white/[0.02] border-white/5 hover:border-white/20'}`}
                    >
                      <div className={`mb-6 p-4 rounded-xl w-fit bg-white/5 ${item.color}`}>{item.icon}</div>
                      <h4 className="text-lg font-serif italic text-white">{item.name}</h4>
                      <p className="text-[10px] uppercase tracking-widest text-slate-500 mt-2">{item.property}</p>
                    </motion.div>
                  );
                })}
              </div>

              {filteredList.length > 8 && (
                <button 
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mx-auto mt-12 flex items-center gap-2 text-[10px] uppercase tracking-widest font-black text-emerald-500/50 hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {isExpanded ? <><ChevronUp size={14}/> Collapse Archive</> : <><ChevronDown size={14}/> Expand Archive ({filteredList.length})</>}
                </button>
              )}

              <div className="fixed bottom-12 left-1/2 -translate-x-1/2 bg-[#050c09] border border-emerald-500/20 px-8 py-4 rounded-full flex items-center gap-6 shadow-2xl backdrop-blur-3xl z-[300]">
                 <p className="text-[10px] uppercase tracking-widest text-slate-600 font-black italic">{selectedMateria.length} of 4 Tools</p>
                 <button onClick={() => setActiveTab('oracle')} className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 hover:text-white transition-colors cursor-pointer">Continue</button>
              </div>
            </motion.div>
          )}

          {/* TAB 3: ORACLE */}
          {activeTab === 'oracle' && (
            <motion.div key="oracle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-xl mx-auto text-center py-20 relative z-[200]">
              {!tarotCard ? (
                <div 
                  onClick={() => setTarotCard(TAROT_DECK[Math.floor(Math.random() * TAROT_DECK.length)])} 
                  className="aspect-[2/3] w-64 mx-auto bg-emerald-500/5 border-2 border-dashed border-emerald-500/20 rounded-[3rem] flex flex-col items-center justify-center cursor-pointer group shadow-2xl"
                >
                  <Star className="text-emerald-500/20 mb-6 group-hover:text-emerald-500 group-hover:rotate-12 transition-all" size={50} />
                  <p className="text-[11px] uppercase tracking-[0.6em] font-black text-emerald-500">Draw Guidance</p>
                </div>
              ) : (
                <motion.div initial={{ rotateY: 90 }} animate={{ rotateY: 0 }} className="p-16 bg-white/[0.03] border border-emerald-500/20 rounded-[4rem] shadow-2xl shadow-emerald-500/5">
                  <h3 className="text-4xl font-serif italic text-white mb-6">{tarotCard.name}</h3>
                  <p className="text-slate-400 text-md italic mb-12">"{tarotCard.meaning}"</p>
                  <button onClick={() => setActiveTab('altar')} className="px-14 py-5 bg-emerald-500 text-black text-[10px] font-black uppercase tracking-[0.4em] rounded-2xl hover:bg-white transition-all cursor-pointer">Enter Altar</button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* TAB 4: ALTAR */}
          {activeTab === 'altar' && (
            <motion.div key="altar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto relative z-[200] pb-20">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 bg-[#050c09] border border-emerald-500/20 p-14 rounded-[4rem] shadow-3xl">
                  <h3 className="text-center text-[10px] uppercase tracking-[0.6em] text-emerald-500/40 mb-12 font-black">Sacred Intention</h3>
                  <textarea 
                    value={customIntent || generatedSpell} 
                    onChange={(e) => setCustomIntent(e.target.value)}
                    className="w-full bg-transparent border-none text-2xl italic text-emerald-100 h-64 focus:ring-0 text-center leading-relaxed font-serif"
                    placeholder="Describe your ritual or let the weave decide..."
                  />
                  <button onClick={finalizeRitual} className="w-full py-8 mt-10 bg-emerald-500/5 border border-emerald-500/30 rounded-3xl text-emerald-400 font-black text-[12px] uppercase tracking-[0.6em] hover:bg-emerald-500/10 transition-all cursor-pointer">Seal the Working</button>
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
                      {tarotCard && <div className="pt-6 border-t border-white/10 text-sm italic text-blue-300 flex items-center gap-4"><Star size={18}/> {tarotCard.name}</div>}
                    </div>
                  </div>
                </div>
              </div>

              {/* BOOK OF SHADOWS */}
              <div className="mt-24">
                <h4 className="text-[11px] uppercase tracking-[0.5em] text-slate-700 font-black mb-10 ml-6 flex items-center gap-4"><Book size={14}/> The Book of Shadows</h4>
                <div className="space-y-6">
                  {history.map((h, i) => (
                    <div key={i} className="p-10 bg-white/[0.01] border border-white/5 rounded-[2.5rem] flex justify-between items-center group hover:bg-white/[0.03] hover:border-emerald-500/10 transition-all shadow-xl">
                      <div className="max-w-[85%]">
                        <p className="text-lg italic text-slate-400 group-hover:text-emerald-100 transition-colors leading-relaxed">"{h.text}"</p>
                        <div className="flex gap-6 mt-6 text-[9px] font-black uppercase tracking-[0.2em] text-slate-600">
                          <span>{h.date}</span>
                          <span className="text-emerald-900">{h.tools.join(' • ')}</span>
                        </div>
                      </div>
                      <Sparkles size={20} className="text-slate-800" />
                    </div>
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