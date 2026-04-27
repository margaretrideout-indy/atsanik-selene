import React, { useState, useEffect, useMemo } from 'react';
// Essential for Base44: Imports Supabase directly from the web
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-client/+esm';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Moon, Sparkles, Book, Leaf, Wind, Droplets, Flame, Mountain, 
  Shield, Sun, Clock, Zap, Eye, Heart, Star, Cloud, Plus, X, 
  Layers, Coffee, Circle, Search, ChevronDown, ChevronUp, Beaker, 
  Wand2, Calendar, LogOut, BarChart3, ShoppingBag
} from 'lucide-react';

// --- CONFIGURATION ---
// IMPORTANT: Replace these with your keys from your Supabase Dashboard
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_KEY = 'YOUR_SUPABASE_ANON_KEY';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// --- THE MASTER DATABASE (85 TOTAL ITEMS) ---
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

  // PANTRY (25)
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

  // COLOURS (10)
  { id: 'ca1', name: 'White', type: 'Colour', property: 'Purity', tags: ['universal', 'cleansing'], color: 'text-white', icon: <Flame size={18} /> },
  { id: 'ca2', name: 'Black', type: 'Colour', property: 'Banishing', tags: ['protection', 'binding'], color: 'text-slate-900', icon: <Flame size={18} /> },
  { id: 'ca3', name: 'Red', type: 'Colour', property: 'Passion', tags: ['strength', 'vitality'], color: 'text-red-500', icon: <Flame size={18} /> },
  { id: 'ca4', name: 'Green', type: 'Colour', property: 'Growth', tags: ['money', 'fertility'], color: 'text-emerald-500', icon: <Flame size={18} /> },
  { id: 'ca5', name: 'Blue', type: 'Colour', property: 'Tranquility', tags: ['peace', 'forgiveness'], color: 'text-blue-500', icon: <Flame size={18} /> },
  { id: 'ca6', name: 'Yellow', type: 'Colour', property: 'Intelligence', tags: ['clarity', 'confidence'], color: 'text-yellow-400', icon: <Flame size={18} /> },
  { id: 'ca7', name: 'Purple', type: 'Colour', property: 'Psychic Power', tags: ['ambition', 'wisdom'], color: 'text-purple-600', icon: <Flame size={18} /> },
  { id: 'ca8', name: 'Orange', type: 'Colour', property: 'Road Opening', tags: ['success', 'creativity'], color: 'text-orange-500', icon: <Flame size={18} /> },
  { id: 'ca9', name: 'Pink', type: 'Colour', property: 'Self-Love', tags: ['romance', 'friendship'], color: 'text-pink-400', icon: <Flame size={18} /> },
  { id: 'ca10', name: 'Brown', type: 'Colour', property: 'Grounding', tags: ['home', 'stability'], color: 'text-amber-900', icon: <Flame size={18} /> }
];

export default function Garden() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('moon');
  const [subFilter, setSubFilter] = useState('Crystal');
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMateria, setSelectedMateria] = useState([]);
  const [rituals, setRituals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      handleUser(session?.user);
    };
    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      handleUser(session?.user);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleUser = (u) => {
    setUser(u ?? null);
    // Change this to your actual email to see the hidden Admin Tab
    if (u?.email === 'your_admin_email@test.com') setIsAdmin(true);
    if (u) fetchRituals(u.id);
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = authMode === 'signup' 
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    setLoading(false);
  };

  const fetchRituals = async (userId) => {
    const { data } = await supabase.from('rituals').select('*').eq('user_id', userId).order('created_at', { ascending: false });
    setRituals(data || []);
  };

  const saveRitual = async () => {
    if (!user) return;
    const names = selectedMateria.map(m => m.name);
    const intent = `Ritual of ${names.join(' & ')}`;
    const { error } = await supabase.from('rituals').insert([{ user_id: user.id, intent, tools: names }]);
    if (!error) {
      setSelectedMateria([]);
      fetchRituals(user.id);
      setActiveTab('journal');
    }
  };

  const toggleMateria = (item) => {
    if (selectedMateria.find(m => m.id === item.id)) {
      setSelectedMateria(prev => prev.filter(m => m.id !== item.id));
    } else if (selectedMateria.length < 4) {
      setSelectedMateria(prev => [...prev, item]);
    }
  };

  const mantra = useMemo(() => {
    if (selectedMateria.length === 0) return "Choose your tools...";
    const props = selectedMateria.map(m => m.property.toLowerCase());
    if (props.includes('wealth') || props.includes('money')) return "Abundance flows through me like the tide.";
    if (props.includes('protection') || props.includes('shield')) return "I am guarded in light, safe and sound.";
    return "By will and by power, the working is set.";
  }, [selectedMateria]);

  if (!user) {
    return (
      <div className="min-h-screen bg-[#020806] flex items-center justify-center p-6 text-slate-300 font-sans">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-md w-full bg-white/[0.02] border border-white/10 p-12 rounded-[4rem] text-center backdrop-blur-3xl shadow-2xl">
          <Moon size={40} className="mx-auto text-emerald-400 mb-6" />
          <h2 className="text-3xl font-serif text-white mb-2 italic">Selene Collective</h2>
          <p className="text-[9px] uppercase tracking-[0.4em] text-slate-600 mb-10 font-black">Digital Grimoire Access</p>
          <form onSubmit={handleAuth} className="space-y-4">
            <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-emerald-500/40 text-sm" />
            <input type="password" placeholder="Passkey" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-emerald-500/40 text-sm" />
            <button type="submit" className="w-full py-4 bg-emerald-500 text-black font-black uppercase tracking-widest rounded-2xl hover:bg-emerald-400 transition-all">
              {loading ? "..." : authMode === 'login' ? 'Login' : 'Register'}
            </button>
          </form>
          <button onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')} className="mt-8 text-[9px] uppercase tracking-widest text-slate-600 hover:text-white font-black">
            {authMode === 'login' ? 'Create Account' : 'Existing Member'}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020806] text-slate-300 font-sans pb-32">
      <nav className="max-w-7xl mx-auto p-10 flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex items-center gap-3">
          <Moon className="text-emerald-400" size={24} />
          <h1 className="text-2xl font-serif italic text-white">Selene</h1>
        </div>
        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5 backdrop-blur-md">
          {['moon', 'library', 'altar', 'journal'].map(t => (
            <button key={t} onClick={() => setActiveTab(t)} className={`px-6 py-2 rounded-xl text-[10px] uppercase font-black tracking-widest transition-all ${activeTab === t ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-600 hover:text-slate-400'}`}>{t}</button>
          ))}
          {isAdmin && (
            <button onClick={() => setActiveTab('admin')} className={`px-4 transition-colors ${activeTab === 'admin' ? 'text-amber-400' : 'text-amber-900 hover:text-amber-500'}`}>
              <BarChart3 size={18}/>
            </button>
          )}
        </div>
        <button onClick={() => supabase.auth.signOut()} className="text-slate-800 hover:text-red-400 transition-colors"><LogOut size={18}/></button>
      </nav>

      <main className="max-w-7xl mx-auto px-8">
        <AnimatePresence mode="wait">
          {activeTab === 'moon' && (
            <motion.div key="moon" className="py-24 text-center">
              <Moon size={100} className="mx-auto text-emerald-400 mb-10 drop-shadow-[0_0_20px_rgba(52,211,153,0.3)]" />
              <h2 className="text-7xl font-serif italic text-white mb-6">Waning Gibbous</h2>
              <p className="text-emerald-500 tracking-[0.5em] text-[10px] uppercase font-black">A Time for Release</p>
            </motion.div>
          )}

          {activeTab === 'library' && (
            <motion.div key="lib">
              <div className="flex flex-col lg:flex-row justify-between items-end gap-10 mb-16 border-b border-white/5 pb-10">
                <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5 overflow-x-auto max-w-full">
                  {['Crystal', 'Herb', 'Pantry', 'Colour'].map(type => (
                    <button key={type} onClick={() => setSubFilter(type)} className={`px-6 py-2 rounded-xl text-[10px] uppercase font-black tracking-widest whitespace-nowrap ${subFilter === type ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-600 hover:text-slate-500'}`}>{type}</button>
                  ))}
                </div>
                <div className="relative w-full lg:w-80">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700" size={16} />
                  <input type="text" placeholder="Search intent..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-6 text-xs outline-none focus:ring-1 focus:ring-emerald-500/30" />
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
                {MASTER_DATA.filter(i => i.type === subFilter && (searchQuery === "" || i.tags.some(t => t.includes(searchQuery.toLowerCase())))).map(item => (
                  <div key={item.id} onClick={() => toggleMateria(item)} className={`p-10 rounded-[3rem] border transition-all cursor-pointer group ${selectedMateria.find(s => s.id === item.id) ? 'bg-emerald-500/10 border-emerald-500' : 'bg-white/[0.02] border-white/5 hover:border-white/20'}`}>
                    <div className={`${item.color} mb-6 group-hover:scale-110 transition-transform`}>{item.icon}</div>
                    <p className="text-white font-serif italic text-lg">{item.name}</p>
                    <p className="text-[10px] uppercase tracking-widest text-slate-700 mt-2 font-black">{item.property}</p>
                  </div>
                ))}
              </div>
              
              {selectedMateria.length > 0 && (
                <div className="fixed bottom-12 left-1/2 -translate-x-1/2 bg-black border border-emerald-500/20 px-12 py-6 rounded-full flex items-center gap-12 shadow-3xl backdrop-blur-3xl z-[300]">
                   <p className="text-[10px] uppercase tracking-widest text-slate-600 font-black italic">{selectedMateria.length} / 4 Selected</p>
                   <button onClick={() => setActiveTab('altar')} className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400 hover:text-white transition-colors">Go to Altar</button>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'altar' && (
            <motion.div key="altar" className="max-w-4xl mx-auto py-10">
              <div className="bg-[#050c09] border border-emerald-500/20 p-24 rounded-[6rem] shadow-3xl text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
                <h3 className="text-[10px] uppercase tracking-[0.8em] text-emerald-500/40 font-black mb-16">The Mouth of Power</h3>
                <p className="text-5xl font-serif italic text-white leading-relaxed mb-16">"{mantra}"</p>
                <div className="flex justify-center gap-8 mb-20">
                  {selectedMateria.map(m => (
                    <div key={m.id} className={`${m.color} p-5 bg-white/5 rounded-3xl border border-white/5`}>{m.icon}</div>
                  ))}
                </div>
                <button onClick={saveRitual} className="w-full py-10 bg-emerald-500/5 border border-emerald-500/20 rounded-[3rem] text-emerald-400 font-black text-[14px] uppercase tracking-[0.6em] hover:bg-emerald-500/10 transition-all">Seal Into Grimoire</button>
              </div>
            </motion.div>
          )}

          {activeTab === 'journal' && (
            <motion.div key="journal" className="max-w-4xl mx-auto space-y-6 py-10">
              <h2 className="text-3xl font-serif italic text-white mb-10 flex items-center gap-4"><Book size={20} className="text-emerald-500"/> Book of Shadows</h2>
              {rituals.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-white/5 rounded-[4rem]">
                    <p className="text-slate-600 uppercase tracking-widest text-xs font-black italic">The pages remain blank...</p>
                </div>
              ) : rituals.map((r, i) => (
                <div key={i} className="p-12 bg-white/[0.01] border border-white/5 rounded-[4rem] flex flex-col md:flex-row justify-between items-start md:items-center gap-8 group hover:bg-white/[0.02] transition-all">
                  <div className="space-y-4">
                    <p className="text-2xl italic text-slate-300 font-serif leading-relaxed">"{r.intent}"</p>
                    <div className="flex flex-wrap gap-3">
                        {r.tools.map((t, idx) => (
                            <span key={idx} className="text-[9px] uppercase tracking-widest text-emerald-900 bg-emerald-500/5 px-3 py-1 rounded-full font-black border border-emerald-500/10">{t}</span>
                        ))}
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-800 font-black tracking-widest">{new Date(r.created_at).toLocaleDateString()}</p>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'admin' && isAdmin && (
            <motion.div key="admin" className="py-20 text-center space-y-12">
                <h2 className="text-5xl font-serif text-amber-500 italic">Coven Portal</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
                    <div className="bg-white/5 p-16 rounded-[4rem] border border-white/5">
                        <p className="text-[10px] uppercase text-slate-500 font-black tracking-widest">Global Workings</p>
                        <p className="text-7xl text-white font-serif mt-4">{rituals.length}</p>
                    </div>
                    <div className="bg-amber-500/5 p-16 rounded-[4rem] border border-amber-500/10">
                        <p className="text-[10px] uppercase text-amber-900 font-black tracking-widest">Active Coven Status</p>
                        <p className="text-7xl text-amber-500 font-serif mt-4">Safe</p>
                    </div>
                </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}