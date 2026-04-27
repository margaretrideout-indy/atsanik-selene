import React, { useState, useEffect, useMemo } from 'react';
import { createClient } from '@supabase/supabase-client';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Moon, Sparkles, Book, Leaf, Wind, Droplets, Flame, Mountain, 
  Shield, Sun, Clock, Zap, Eye, Heart, Star, Cloud, Plus, X, 
  Layers, Coffee, Circle, Search, ChevronDown, ChevronUp, Beaker, 
  Wand2, Calendar, LogOut, BarChart3, ShoppingBag
} from 'lucide-react';

// --- INITIALIZE SUPABASE ---
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_KEY = 'YOUR_SUPABASE_ANON_KEY';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// --- THE PERMANENT MASTER DATABASE (100% Complete) ---
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
  const [authMode, setAuthMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('moon');
  const [subFilter, setSubFilter] = useState('Crystal');
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMateria, setSelectedMateria] = useState([]);
  const [rituals, setRituals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // --- AUTH & SYNC ---
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      if (session?.user?.email === 'your_admin_email@test.com') setIsAdmin(true);
      if (session?.user) fetchRituals(session.user.id);
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchRituals(session.user.id);
    });
    return () => subscription.unsubscribe();
  }, []);

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
    const intent = `Working of ${names.join(' and ')}`;
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

  // --- LOGIC: DYNAMIC MANTRA ---
  const mantra = useMemo(() => {
    if (selectedMateria.length === 0) return "Whisper your intent to the weave...";
    const props = selectedMateria.map(m => m.property.toLowerCase());
    if (props.includes('wealth')) return "Abundance flows like a river into my life.";
    if (props.includes('shield') || props.includes('protection')) return "I am a fortress of light, untouched by shadow.";
    if (props.includes('peace')) return "My spirit is a still lake at midnight.";
    return "By my will and the ancient ways, this working is set.";
  }, [selectedMateria]);

  // --- AUTH VIEW ---
  if (!user) {
    return (
      <div className="min-h-screen bg-[#020806] flex items-center justify-center p-6 text-slate-300">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full bg-white/[0.02] border border-white/10 p-12 rounded-[4rem] text-center shadow-3xl">
          <Moon size={48} className="mx-auto text-emerald-400 mb-8" />
          <h2 className="text-3xl font-serif text-white mb-2">{authMode === 'login' ? 'Enter the Circle' : 'Join the Coven'}</h2>
          <p className="text-[10px] uppercase tracking-[0.3em] text-slate-600 mb-10">The Digital Altar Awaits</p>
          <form onSubmit={handleAuth} className="space-y-4">
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-emerald-500/50" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-emerald-500/50" />
            <button type="submit" className="w-full py-4 bg-emerald-500 text-black font-black uppercase tracking-widest rounded-2xl hover:bg-white transition-all">
              {loading ? "..." : authMode === 'login' ? 'Login' : 'Sign Up'}
            </button>
          </form>
          <button onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')} className="mt-8 text-[10px] uppercase tracking-widest text-slate-600 hover:text-white">
            {authMode === 'login' ? 'Register your spirit' : 'Already a member?'}
          </button>
        </motion.div>
      </div>
    );
  }

  // --- MAIN GARDEN VIEW ---
  return (
    <div className="min-h-screen bg-[#020806] text-slate-300 font-sans pb-32">
      <nav className="max-w-7xl mx-auto p-10 flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex items-center gap-3">
          <Moon className="text-emerald-400" size={24} />
          <h1 className="text-2xl font-serif italic text-white">Selene</h1>
        </div>
        
        <div className="flex bg-white/5 p-1 rounded-2xl backdrop-blur-xl">
          {['moon', 'library', 'altar', 'journal'].map(t => (
            <button key={t} onClick={() => setActiveTab(t)} className={`px-6 py-3 rounded-xl text-[10px] uppercase font-black tracking-widest transition-all ${activeTab === t ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-600'}`}>
              {t}
            </button>
          ))}
          {isAdmin && <button onClick={() => setActiveTab('admin')} className="px-4 text-amber-500"><BarChart3 size={18}/></button>}
        </div>

        <button onClick={() => supabase.auth.signOut()} className="text-slate-600 hover:text-red-400"><LogOut size={18}/></button>
      </nav>

      <main className="max-w-7xl mx-auto px-8">
        <AnimatePresence mode="wait">
          
          {activeTab === 'moon' && (
            <motion.div key="moon" className="py-20 text-center">
              <Moon size={100} className="mx-auto text-emerald-400 mb-10 drop-shadow-[0_0_20px_rgba(52,211,153,0.3)]" />
              <h2 className="text-6xl font-serif italic text-white mb-4">Waning Gibbous</h2>
              <p className="text-emerald-500 tracking-[0.6em] text-[10px] uppercase">Time to Release & Purify</p>
            </motion.div>
          )}

          {activeTab === 'library' && (
            <motion.div key="lib">
              <div className="flex justify-between items-end mb-12 border-b border-white/5 pb-8">
                <div className="flex bg-white/5 p-1 rounded-xl">
                  {['Crystal', 'Herb', 'Pantry', 'Colour'].map(type => (
                    <button key={type} onClick={() => setSubFilter(type)} className={`px-5 py-2 rounded-lg text-[10px] uppercase font-black tracking-widest ${subFilter === type ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-600'}`}>{type}</button>
                  ))}
                </div>
                <div className="relative w-80">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700" size={16} />
                  <input type="text" placeholder="Search intent..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-6 text-xs outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
                {MASTER_DATA.filter(i => i.type === subFilter && (searchQuery === "" || i.tags.some(t => t.includes(searchQuery.toLowerCase())))).map(item => (
                  <div key={item.id} onClick={() => toggleMateria(item)} className={`p-8 rounded-[3rem] border transition-all cursor-pointer ${selectedMateria.find(s => s.id === item.id) ? 'bg-emerald-500/10 border-emerald-500' : 'bg-white/5 border-transparent hover:border-white/10'}`}>
                    <div className={`${item.color} mb-6`}>{item.icon}</div>
                    <p className="text-white font-serif italic text-lg">{item.name}</p>
                    <p className="text-[10px] uppercase tracking-widest text-slate-700 mt-2">{item.property}</p>
                  </div>
                ))}
              </div>
              
              <div className="fixed bottom-12 left-1/2 -translate-x-1/2 bg-black border border-emerald-500/20 px-10 py-5 rounded-full flex items-center gap-8 shadow-3xl backdrop-blur-3xl z-[300]">
                 <p className="text-[10px] uppercase tracking-widest text-slate-600 font-black italic">{selectedMateria.length} / 4 Materia Selected</p>
                 <button onClick={() => setActiveTab('altar')} className="text-[10px] font-black uppercase text-emerald-400 hover:text-white">To the Altar</button>
              </div>
            </motion.div>
          )}

          {activeTab === 'altar' && (
            <motion.div key="altar" className="max-w-4xl mx-auto py-10">
              <div className="bg-[#050c09] border border-emerald-500/20 p-20 rounded-[5rem] shadow-3xl text-center">
                <h3 className="text-[10px] uppercase tracking-[0.5em] text-emerald-500/30 font-black mb-12">The Mouth of Power</h3>
                <p className="text-4xl font-serif italic text-white leading-relaxed mb-12">"{mantra}"</p>
                <div className="flex justify-center gap-6 mb-16">
                  {selectedMateria.map(m => (
                    <div key={m.id} className={`${m.color} p-4 bg-white/5 rounded-2xl`}>{m.icon}</div>
                  ))}
                </div>
                <button onClick={saveRitual} className="w-full py-8 bg-emerald-500/5 border border-emerald-500/30 rounded-3xl text-emerald-400 font-black text-[12px] uppercase tracking-[0.5em] hover:bg-emerald-500/10">Seal into Grimoire</button>
              </div>
            </motion.div>
          )}

          {activeTab === 'journal' && (
            <motion.div key="journal" className="space-y-6 py-10">
              <h2 className="text-3xl font-serif italic text-white mb-10 flex items-center gap-4"><Book size={20}/> The Eternal Log</h2>
              {rituals.map((r, i) => (
                <div key={i} className="p-10 bg-white/[0.01] border border-white/5 rounded-[3rem] flex justify-between items-center group hover:bg-white/[0.03]">
                  <div>
                    <p className="text-xl italic text-slate-400 font-serif leading-relaxed">"{r.intent}"</p>
                    <p className="text-[9px] uppercase tracking-widest text-emerald-900 mt-4 font-black">{r.tools.join(' • ')}</p>
                  </div>
                  <p className="text-[10px] text-slate-700">{new Date(r.created_at).toLocaleDateString()}</p>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'admin' && isAdmin && (
            <motion.div key="admin" className="py-20 space-y-8">
              <h2 className="text-4xl font-serif text-amber-500 italic">Coven Metrics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-16 bg-amber-500/5 border border-amber-500/20 rounded-[4rem]">
                   <p className="text-[11px] uppercase tracking-widest text-amber-900 font-black">Total Active Spirits</p>
                   <p className="text-6xl text-white font-serif mt-4">1,024</p>
                </div>
                <div className="p-16 bg-emerald-500/5 border border-emerald-500/20 rounded-[4rem]">
                   <p className="text-[11px] uppercase tracking-widest text-emerald-900 font-black">Market Conversion</p>
                   <p className="text-6xl text-white font-serif mt-4">14.2%</p>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}