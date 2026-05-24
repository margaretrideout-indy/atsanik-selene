import React, { useState, useEffect, useMemo, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { useAuth } from '../lib/AuthContext';
import PublicHeader from '../components/garden/PublicHeader';
import InukshukIcon from '../components/garden/InukshukIcon';
import MoonDisplay from '../components/garden/MoonDisplay';
import SigilEngine, { serializeSigil } from '../components/garden/SigilEngine';
import useMoonPhase from '../hooks/useMoonPhase';
import InitiationFlow from '../components/garden/InitiationFlow';
import GuidedRitualMode, { AuroraPulse, FloorThread } from '../components/garden/GuidedRitualMode';
import TarotSpread, { POSITION_LABELS } from '../components/garden/TarotSpread';
import GrimoireTab from '../components/garden/GrimoireTab';
import IntentSigil from '../components/garden/IntentSigil';
import AppFooter from '../components/garden/AppFooter';

// Inuttitut seasonal calendar (approximate)
function getInuttitutSeason() {
  const m = new Date().getMonth(); // 0-indexed
  if (m >= 2 && m <= 4) return 'Upingakuluk'; // Spring
  if (m >= 5 && m <= 7) return 'Upingaarngnat'; // Summer
  if (m >= 8 && m <= 10) return 'Ukiaksaaq'; // Autumn
  return 'Ukiuq'; // Winter
}

// --- THE FULL MASTER DATABASE (85 ITEMS) ---
const MASTER_DATA = [
  // CRYSTALS
  { id: 'c22', name: 'Amazonite', type: 'Crystal', property: 'Hope', icon: '💎', tags: ['hope', 'courage', 'truth'] },
  { id: 'c2', name: 'Amethyst', type: 'Crystal', property: 'Peace', icon: '✨', tags: ['sleep', 'anxiety', 'peace', 'calm'] },
  { id: 'c25', name: 'Aquamarine', type: 'Crystal', property: 'Flow', icon: '🌊', tags: ['peace', 'water', 'flow'] },
  { id: 'c13', name: 'Black Obsidian', type: 'Crystal', property: 'Shadow', icon: '🌑', tags: ['truth', 'protection', 'shadow'] },
  { id: 'c6', name: 'Black Tourmaline', type: 'Crystal', property: 'Shield', icon: '🛡️', tags: ['protection', 'grounding', 'shield'] },
  { id: 'c12', name: 'Carnelian', type: 'Crystal', property: 'Creativity', icon: '🔥', tags: ['passion', 'action', 'creativity'] },
  { id: 'c3', name: 'Citrine', type: 'Crystal', property: 'Wealth', icon: '💰', tags: ['money', 'success', 'wealth', 'abundance'] },
  { id: 'c10', name: 'Clear Quartz', type: 'Crystal', property: 'Amplify', icon: '💎', tags: ['power', 'clarity', 'amplify'] },
  { id: 'c15', name: 'Fluorite', type: 'Crystal', property: 'Focus', icon: '🔮', tags: ['study', 'clarity', 'focus'] },
  { id: 'c14', name: 'Green Aventurine', type: 'Crystal', property: 'Opportunity', icon: '🍀', tags: ['money', 'growth', 'opportunity'] },
  { id: 'c16', name: 'Hematite', type: 'Crystal', property: 'Grounding', icon: '🪨', tags: ['anxiety', 'shield', 'grounding'] },
  { id: 'c23', name: 'Howlite', type: 'Crystal', property: 'Patience', icon: '☁️', tags: ['sleep', 'anger', 'patience'] },
  { id: 'c7', name: 'Labradorite', type: 'Crystal', property: 'Magic', icon: '🌌', tags: ['psychic', 'change', 'magic'] },
  { id: 'c9', name: 'Lapis Lazuli', type: 'Crystal', property: 'Truth', icon: '👁️', tags: ['wisdom', 'voice', 'truth'] },
  { id: 'c21', name: 'Lepidolite', type: 'Crystal', property: 'Calm', icon: '🌬️', tags: ['anxiety', 'transition', 'calm'] },
  { id: 'c17', name: 'Malachite', type: 'Crystal', property: 'Change', icon: '🐍', tags: ['transformation', 'heart', 'change'] },
  { id: 'c1', name: 'Moonstone', type: 'Crystal', property: 'Intuition', icon: '🌙', tags: ['psychic', 'dreams', 'intuition'] },
  { id: 'c11', name: 'Pyrite', type: 'Crystal', property: 'Luck', icon: '🪙', tags: ['money', 'protection', 'luck'] },
  { id: 'c18', name: 'Red Jasper', type: 'Crystal', property: 'Vitality', icon: '🔋', tags: ['strength', 'stamina', 'vitality'] },
  { id: 'c4', name: 'Rose Quartz', type: 'Crystal', property: 'Love', icon: '💖', tags: ['romance', 'healing', 'love'] },
  { id: 'c5', name: 'Selenite', type: 'Crystal', property: 'Cleansing', icon: '🕊️', tags: ['purify', 'charging', 'cleansing'] },
  { id: 'c20', name: 'Smoky Quartz', type: 'Crystal', property: 'Release', icon: '💨', tags: ['detox', 'negativity', 'release'] },
  { id: 'c19', name: 'Sodalite', type: 'Crystal', property: 'Logic', icon: '🧠', tags: ['calm', 'intelligence', 'logic'] },
  { id: 'c8', name: 'Tiger Eye', type: 'Crystal', property: 'Courage', icon: '🐯', tags: ['confidence', 'luck', 'courage'] },
  { id: 'c24', name: 'Unakite', type: 'Crystal', property: 'Balance', icon: '⚖️', tags: ['rebirth', 'healing', 'balance'] },

  // HERBS
  { id: 'h7', name: 'Basil', type: 'Herb', property: 'Luck', icon: '🌿', tags: ['money', 'prosperity', 'luck'] },
  { id: 'h4', name: 'Bay Leaf', type: 'Herb', property: 'Manifest', icon: '🍂', tags: ['wishes', 'money', 'manifest'] },
  { id: 'h22', name: 'Calendula', type: 'Herb', property: 'Sun-Light', icon: '🌼', tags: ['joy', 'legal', 'sun'] },
  { id: 'h23', name: 'Catnip', type: 'Herb', property: 'Fascination', icon: '🐱', tags: ['love', 'beauty', 'fascination'] },
  { id: 'h6', name: 'Chamomile', type: 'Herb', property: 'Calm', icon: '🌼', tags: ['anxiety', 'sleep', 'calm'] },
  { id: 'h10', name: 'Cinnamon', type: 'Herb', property: 'Speed', icon: '🪵', tags: ['success', 'fast', 'speed'] },
  { id: 'h24', name: 'Comfrey', type: 'Herb', property: 'Safety', icon: '🩹', tags: ['travel', 'healing', 'safety'] },
  { id: 'h11', name: 'Dandelion', type: 'Herb', property: 'Growth', icon: '🌻', tags: ['wishes', 'healing', 'growth'] },
  { id: 'h19', name: 'Elderberry', type: 'Herb', property: 'Fates', icon: '🫐', tags: ['health', 'ancestors'] },
  { id: 'h12', name: 'Eucalyptus', type: 'Herb', property: 'Healing', icon: '🌿', tags: ['health', 'breath', 'healing'] },
  { id: 'h17', name: 'Hibiscus', type: 'Herb', property: 'Passion', icon: '🌺', tags: ['love', 'lust', 'passion'] },
  { id: 'h13', name: 'Jasmine', type: 'Herb', property: 'Dreams', icon: '🌸', tags: ['love', 'prophetic', 'dreams'] },
  { id: 'h1', name: 'Lavender', type: 'Herb', property: 'Peace', icon: '🌿', tags: ['sleep', 'calm', 'peace'] },
  { id: 'h15', name: 'Mistletoe', type: 'Herb', property: 'Protection', icon: '🌿', tags: ['luck', 'safety', 'protection'] },
  { id: 'h2', name: 'Mugwort', type: 'Herb', property: 'Vision', icon: '🌙', tags: ['dreams', 'psychic', 'vision'] },
  { id: 'h16', name: 'Nettle', type: 'Herb', property: 'Defense', icon: '🧤', tags: ['protection', 'strength', 'defense'] },
  { id: 'h14', name: 'Patchouli', type: 'Herb', property: 'Grounding', icon: '🪴', tags: ['money', 'lust', 'grounding'] },
  { id: 'h5', name: 'Peppermint', type: 'Herb', property: 'Energy', icon: '🌱', tags: ['vitality', 'clear', 'energy'] },
  { id: 'h3', name: 'Rosemary', type: 'Herb', property: 'Memory', icon: '🍃', tags: ['focus', 'protection', 'memory'] },
  { id: 'h9', name: 'Sage', type: 'Herb', property: 'Cleanse', icon: '🌬️', tags: ['purify', 'wisdom', 'cleanse'] },
  { id: 'h8', name: 'Thyme', type: 'Herb', property: 'Bravery', icon: '🪴', tags: ['courage', 'health', 'bravery'] },
  { id: 'h18', name: 'Valerian', type: 'Herb', property: 'Deep Sleep', icon: '💤', tags: ['calm', 'rest', 'sleep'] },
  { id: 'h21', name: 'Vervain', type: 'Herb', property: 'Enchant', icon: '✨', tags: ['magic', 'power', 'enchant'] },
  { id: 'h25', name: 'Witch Hazel', type: 'Herb', property: 'Mend', icon: '🪄', tags: ['healing', 'broken heart'] },
  { id: 'h20', name: 'Yarrow', type: 'Herb', property: 'Boundary', icon: '🛡️', tags: ['courage', 'safety', 'boundary'] },

  // PANTRY
  { id: 'k18', name: 'Allspice', type: 'Pantry', property: 'Drive', icon: '🪵', tags: ['success', 'energy', 'drive'] },
  { id: 'k16', name: 'Bayberry', type: 'Pantry', property: 'Gold', icon: '🕯️', tags: ['money', 'wealth', 'gold'] },
  { id: 'k4', name: 'Black Pepper', type: 'Pantry', property: 'Banish', icon: '🌑', tags: ['protection', 'exit', 'banish'] },
  { id: 'k24', name: 'Cinnamon Stick', type: 'Pantry', property: 'Fast Luck', icon: '🪵', tags: ['money', 'speed', 'luck'] },
  { id: 'k11', name: 'Clove', type: 'Pantry', property: 'Silence', icon: '🍢', tags: ['anti-gossip', 'luck', 'silence'] },
  { id: 'k3', name: 'Coffee', type: 'Pantry', property: 'Haste', icon: '☕', tags: ['energy', 'focus', 'haste'] },
  { id: 'k10', name: 'Egg Shell', type: 'Pantry', property: 'Wall', icon: '🥚', tags: ['boundaries', 'protection'] },
  { id: 'k25', name: 'Flour', type: 'Pantry', property: 'Home', icon: '🍞', tags: ['stability', 'foundation', 'home'] },
  { id: 'k8', name: 'Garlic', type: 'Pantry', property: 'Warding', icon: '🧄', tags: ['health', 'protection', 'warding'] },
  { id: 'k13', name: 'Ginger', type: 'Pantry', property: 'Heat', icon: '🫚', tags: ['passion', 'speed', 'heat'] },
  { id: 'k2', name: 'Honey', type: 'Pantry', property: 'Sweetness', icon: '🍯', tags: ['love', 'friendship', 'sweetness'] },
  { id: 'k21', name: 'Lemon Peel', type: 'Pantry', property: 'Clean', icon: '🍋', tags: ['purify', 'love', 'clean'] },
  { id: 'k19', name: 'Mustard', type: 'Pantry', property: 'Faith', icon: '🟡', tags: ['protection', 'mental', 'faith'] },
  { id: 'k14', name: 'Nutmeg', type: 'Pantry', property: 'Coin', icon: '🌰', tags: ['money', 'gambling'] },
  { id: 'k17', name: 'Olive Oil', type: 'Pantry', property: 'Bless', icon: '🫒', tags: ['anointing', 'peace', 'bless'] },
  { id: 'k9', name: 'Onion Skin', type: 'Pantry', property: 'Layers', icon: '🧅', tags: ['healing', 'protection', 'layers'] },
  { id: 'k20', name: 'Orange Peel', type: 'Pantry', property: 'Joy', icon: '🍊', tags: ['luck', 'money', 'joy'] },
  { id: 'k23', name: 'Peppercorn', type: 'Pantry', property: 'Banish', icon: '🌑', tags: ['protection', 'fire', 'banish'] },
  { id: 'k5', name: 'Rice', type: 'Pantry', property: 'Abundance', icon: '🍚', tags: ['money', 'fertility', 'abundance'] },
  { id: 'k1', name: 'Sea Salt', type: 'Pantry', property: 'Shield', icon: '🧂', tags: ['protection', 'cleansing', 'shield'] },
  { id: 'k12', name: 'Star Anise', type: 'Pantry', property: 'Luck', icon: '🌟', tags: ['psychic', 'fortune', 'luck'] },
  { id: 'k6', name: 'Sugar', type: 'Pantry', property: 'Magnet', icon: '🍬', tags: ['love', 'attraction', 'magnet'] },
  { id: 'k15', name: 'Tea Leaves', type: 'Pantry', property: 'Fate', icon: '🍵', tags: ['future', 'divination', 'fate'] },
  { id: 'k22', name: 'Vanilla', type: 'Pantry', property: 'Lust', icon: '🍦', tags: ['love', 'mental', 'lust'] },
  { id: 'k7', name: 'Vinegar', type: 'Pantry', property: 'Break', icon: '🧪', tags: ['banishing', 'cleansing', 'break'] },

  // COLOURS
  { id: 'ca2', name: 'Black', type: 'Colour', property: 'Banishing', icon: '🖤', tags: ['protection', 'binding', 'banishing'] },
  { id: 'ca5', name: 'Blue', type: 'Colour', property: 'Tranquility', icon: '💙', tags: ['peace', 'forgiveness', 'tranquility'] },
  { id: 'ca10', name: 'Brown', type: 'Colour', property: 'Grounding', icon: '🤎', tags: ['home', 'stability', 'grounding'] },
  { id: 'ca4', name: 'Green', type: 'Colour', property: 'Growth', icon: '💚', tags: ['money', 'fertility', 'growth'] },
  { id: 'ca8', name: 'Orange', type: 'Colour', property: 'Road Opening', icon: '🧡', tags: ['success', 'creativity'] },
  { id: 'ca9', name: 'Pink', type: 'Colour', property: 'Self-Love', icon: '💖', tags: ['romance', 'friendship', 'love'] },
  { id: 'ca7', name: 'Purple', type: 'Colour', property: 'Psychic Power', icon: '💜', tags: ['ambition', 'wisdom'] },
  { id: 'ca3', name: 'Red', type: 'Colour', property: 'Passion', icon: '❤️', tags: ['strength', 'vitality', 'passion'] },
  { id: 'ca1', name: 'White', type: 'Colour', property: 'Purity', icon: '🤍', tags: ['universal', 'cleansing', 'purity'] },
  { id: 'ca6', name: 'Yellow', type: 'Colour', property: 'Intelligence', icon: '💛', tags: ['clarity', 'confidence', 'intelligence'] }
];

// --- PROPERTY GLOW COLOURS ---
const PROPERTY_GLOW = {
  Love: '#ff6b8a', Peace: '#7dd3fc', Calm: '#a5f3fc', Intuition: '#c4b5fd',
  Wealth: '#fde68a', Luck: '#86efac', Magic: '#e879f9', Truth: '#60a5fa',
  Courage: '#fb923c', Creativity: '#f97316', Focus: '#38bdf8', Protection: '#6ee7b7',
  Shield: '#34d399', Cleansing: '#f0f9ff', Grounding: '#a78bfa', Change: '#4ade80',
  Vitality: '#f87171', Release: '#94a3b8', Logic: '#93c5fd', Balance: '#86efac',
  Amplify: '#e2e8f0', Hope: '#67e8f9', Flow: '#38bdf8', Shadow: '#6b7280',
  Patience: '#d1fae5', Opportunity: '#4ade80', Manifest: '#fcd34d', Vision: '#c084fc',
  Dreams: '#f9a8d4', Passion: '#ef4444', Energy: '#22c55e', Memory: '#a3e635',
  Cleanse: '#34d399', Speed: '#facc15', Healing: '#2dd4bf', Bravery: '#fb923c',
  Enchant: '#d946ef', Boundary: '#14b8a6', Banish: '#64748b', Haste: '#f59e0b',
  Sweetness: '#f9a8d4', Abundance: '#fbbf24', Bless: '#fde68a', Joy: '#fb923c',
  Coin: '#fcd34d', Fate: '#a78bfa', Lust: '#f43f5e', Gold: '#eab308',
};

// --- CUSTOM SCRIMSHAW ICON URLS ---
const CUSTOM_ICONS = {
  'The Traveler':    'https://media.base44.com/images/public/69ef3e790d68b46e39044a00/7f81d436b_generated_image.png',
  'The Drum':        'https://media.base44.com/images/public/69ef3e790d68b46e39044a00/f56c6b812_generated_image.png',
  'The Angakkuq':    'https://media.base44.com/images/public/69ef3e790d68b46e39044a00/b00a8a777_generated_image.png',
  'Sedna':           'https://media.base44.com/images/public/69ef3e790d68b46e39044a00/7b5071d27_generated_image.png',
  'The Elder':       'https://media.base44.com/images/public/69ef3e790d68b46e39044a00/e087370b1_generated_image.png',
  'The Qamutik':     'https://media.base44.com/images/public/69ef3e790d68b46e39044a00/054f59e27_generated_image.png',
  'The Lone Inukshuk': 'https://media.base44.com/images/public/69ef3e790d68b46e39044a00/13ff9485a_generated_image.png',
  'The Ulu':         'https://media.base44.com/images/public/69ef3e790d68b46e39044a00/e1b97d2d8_generated_image.png',
};

// --- INUIT ARCHETYPE SYSTEM ---
const TAROT_CARDS = [
  {
    name: 'The Traveler', suit: 'Archetype', icon: '🧭',
    past: { meaning: 'A great departure was made — you left behind the familiar and stepped into the unknown.', fateLine: 'The Traveler marks the beginning of a journey already taken.' },
    present: { meaning: 'The threshold is open. You stand at the edge of new territory with only your instincts.', fateLine: 'The Traveler blesses this working with the courage of the open tundra.' },
    future: { meaning: 'A journey of risk and discovery lies ahead — trust the ice beneath your feet.', fateLine: 'The Traveler promises that the path will reveal itself as you walk.' }
  },
  {
    name: 'The Angakkuq', suit: 'Archetype', icon: '🥁',
    past: { meaning: 'A time of raw power was seized — spirit was called and it answered.', fateLine: 'The Angakkuq reminds you: you have already walked between worlds.' },
    present: { meaning: 'The drum beats. The veil between worlds is thin and the spirit channels are open.', fateLine: 'The Angakkuq grants passage between the seen and the unseen, here and now.' },
    future: { meaning: 'A convergence of spirit and will is coming — the drum will call what is needed.', fateLine: 'The Angakkuq promises that the spirits will answer this intent.' }
  },
  {
    name: 'Sedna', suit: 'Archetype', icon: '🌊',
    past: { meaning: 'A great sacrifice shaped the depths of who you are — loss became abundance.', fateLine: 'Sedna held this desire in the cold dark long before you knew its name.' },
    present: { meaning: 'The mother of the sea stirs. What was lost is transforming into sustenance.', fateLine: 'Sedna breathes life from the deep into this working.' },
    future: { meaning: 'A season of profound transformation is near — from sacrifice comes infinite giving.', fateLine: 'Sedna promises that the ocean of abundance will provide.' }
  },
  {
    name: 'The Elder', suit: 'Archetype', icon: '❄️',
    past: { meaning: 'Wisdom was passed down through long patience — you were shaped by those who came before.', fateLine: 'The Elder held this knowing in trust until you were ready.' },
    present: { meaning: 'Authority and deep knowing anchor this moment. The old ways are the right ways here.', fateLine: 'The Elder steadies this working with the weight of generations.' },
    future: { meaning: 'A time of leadership and earned authority approaches — the community will look to you.', fateLine: 'The Elder promises the strength of the long winter will serve you.' }
  },
  {
    name: 'The Qamutik', suit: 'Archetype', icon: '🛷',
    past: { meaning: 'Momentum carried you over difficult terrain — the dogs knew the way even when you did not.', fateLine: 'The Qamutik bore this intention across the frozen distance already.' },
    present: { meaning: 'Speed and directed will cut through all resistance. The path is clear; move now.', fateLine: 'The Qamutik drives this working forward with great and certain force.' },
    future: { meaning: 'Rapid progress over hard ground is coming — harness the energy and do not hesitate.', fateLine: 'The Qamutik promises swift passage to the destination of your intent.' }
  },
  {
    name: 'The Lone Inukshuk', suit: 'Archetype', icon: '🪨',
    past: { meaning: 'A period of solitary standing forged your inner landmark — you became a guide for others.', fateLine: 'The Lone Inukshuk stood with you through the long silence of becoming.' },
    present: { meaning: 'Inner stillness is the most powerful tool. Be the marker, not the one who wanders.', fateLine: 'The Lone Inukshuk illuminates the way from within this very moment.' },
    future: { meaning: 'A season of quiet witness and deep inner authority will bring great clarity.', fateLine: 'The Lone Inukshuk will mark the path before the next threshold opens.' }
  },
  {
    name: 'The Ulu', suit: 'Archetype', icon: '🔪',
    past: { meaning: 'A great turning of seasons brought you to the work you now hold.', fateLine: 'The Ulu has already cut the old from the new — the turn has been made.' },
    present: { meaning: 'Decisive skill is at work. The right cut at the right moment changes everything.', fateLine: 'The Ulu turns this working toward its destined and necessary outcome.' },
    future: { meaning: 'A pivotal severing or transformation approaches — it will be clean and final.', fateLine: 'The Ulu promises a significant and liberating shift is coming.' }
  },
  {
    name: 'The Drum', suit: 'Archetype', icon: '🌍',
    past: { meaning: 'A great cycle danced to completion — the song was sung and the circle closed.', fateLine: 'The Drum marked the end of a dance you have already walked.' },
    present: { meaning: 'Wholeness, integration, and joyful completion resound through this working now.', fateLine: 'The Drum declares this working already whole — the rhythm is complete.' },
    future: { meaning: 'Full flowering and the joy of the drum circle await at this path\'s end.', fateLine: 'The Drum promises celebration beyond what you dare to imagine.' }
  }
];

// Reconstruct items from a serialized sigil string
function itemsFromSigil(sigilStr) {
  if (!sigilStr) return [];
  const ids = sigilStr.split(',');
  return ids.map(id => MASTER_DATA.find(i => i.id === id)).filter(Boolean);
}

// Cache tab category mapping
const CACHE_TABS = [
  { label: 'All', value: 'all' },
  { label: "Earth & Flora", value: 'flora', types: ['Herb'] },
  { label: "Stone & Hearth", value: 'hearth', types: ['Crystal', 'Pantry', 'Colour'] },
];

// Items highlighted during initiation Stage 2
const INITIATION_HIGHLIGHTS = new Set(['h26', 'c7']); // Crowberry (herb), Labradorite (crystal)
// Note: Crowberry isn't in master data, so we use Lavender (h1) + Labradorite (c7) as the two initiation items
const INIT_HIGHLIGHT_IDS = new Set(['h1', 'c7']);

export default function Garden() {
  const { isAuthenticated, user, logout } = useAuth();
  const moonData = useMoonPhase();
  const [activeTab, setActiveTab] = useState('moon');
  const [subFilter, setSubFilter] = useState('Crystal');
  const [cacheTab, setCacheTab] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cacheSearch, setCacheSearch] = useState("");
  const [tarot, setTarot] = useState(null);
  const [spreadSize, setSpreadSize] = useState(3);
  const [ritualOutput, setRitualOutput] = useState(null);
  const [archives, setArchives] = useState([]);
  const [isShaking, setIsShaking] = useState(false);
  const [capstoneSettling, setCapstoneSettling] = useState(false);
  const [intentSigilData, setIntentSigilData] = useState(null); // { intent, consonants, cells }
  const [isCleansing, setIsCleansing] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  // --- INITIATION FLOW ---
  const [initiationActive, setInitiationActive] = useState(() => !localStorage.getItem('selene_initiated'));
  const [moonViewed, setMoonViewed] = useState(false);
  const navBtnRefs = useRef({});

  // --- GUIDED RITUAL MODE ---
  const [guidedMode, setGuidedMode] = useState(false);
  const [guidedStep, setGuidedStep] = useState('moon');
  const [showAurora, setShowAurora] = useState(false);

  // Advance guided step based on state changes
  useEffect(() => {
    if (!guidedMode) return;
    if (guidedStep === 'moon' && activeTab === 'moon') {
      const t = setTimeout(() => setGuidedStep('cache'), 3000);
      return () => clearTimeout(t);
    }
  }, [guidedMode, guidedStep, activeTab]);

  useEffect(() => {
    if (!guidedMode) return;
    if (guidedStep === 'cache' && selectedItems.length >= 2) {
      setGuidedStep('tarot');
      setActiveTab('tarot');
    }
  }, [guidedMode, guidedStep, selectedItems.length]);

  useEffect(() => {
    if (!guidedMode) return;
    if (guidedStep === 'tarot' && tarot) {
      setGuidedStep('grimoire');
    }
  }, [guidedMode, guidedStep, tarot]);

  const isTabLocked = (tab) => {
    if (!guidedMode) return false;
    return tab !== guidedStep;
  };

  useEffect(() => {
    const saved = localStorage.getItem('selene_archives');
    if (saved) setArchives(JSON.parse(saved));
  }, []);

  // Silence is the voice of Atsanik Selene — no audio.
  const playChime = () => {};

  // --- NARRATIVE WEAVER ---
  const weaveMantra = useMemo(() => {
    if (selectedItems.length === 0) return "Assemble the materia...";
    
    const crystals = selectedItems.filter(i => i.type === 'Crystal').map(i => i.name);
    const herbs = selectedItems.filter(i => i.type === 'Herb').map(i => i.name);
    const pantry = selectedItems.filter(i => i.type === 'Pantry').map(i => i.name);
    const colors = selectedItems.filter(i => i.type === 'Colour').map(i => i.name);
    const intent = selectedItems[0].property.toLowerCase();

    let story = "";
    if (crystals.length > 0) story += `Drawing from the bedrock of ${crystals.join(' and ')}, `;
    if (herbs.length > 0) story += `I release the spirit of ${herbs.join(' and ')} to carry the work. `;
    if (pantry.length > 0) story += `With the domestic focus of ${pantry.join(' and ')}, the intent is grounded. `;
    if (colors.length > 0) story += `Woven into the hue of ${colors[0]}, `;
    
    story += `this working for ${intent} is now bound. The Atsanik dance above as the work is witnessed. `;

    if (tarot && tarot.length > 0) {
      tarot.forEach(card => {
        const temporal = card[card.position] || card.past || {};
        story += card.reversed
          ? `In the ${card.position}, ${card.name} reversed warns: shadow and obstruction linger. `
          : `In the ${card.position}, ${temporal.fateLine || ''} `;
      });
    }

    return story;
  }, [selectedItems, tarot]);

  const returnToLand = () => {
    setIsCleansing(true);
    setTimeout(() => {
      setSelectedItems([]);
      setRitualOutput(null);
      setTarot(null);
      setIsCleansing(false);
    }, 1300);
  };

  const placeCapstone = () => {
    setCapstoneSettling(true);
    setTimeout(() => setCapstoneSettling(false), 700);
    if (guidedMode) {
      setShowAurora(true);
      setGuidedMode(false);
      setGuidedStep('moon');
    }
    sealRitual();
  };

  const trackActivity = (action, metadata) => {
    if (!user?.email) return;
    base44.entities.UserActivity.create({ user_email: user.email, action, metadata: metadata || '' }).catch(() => {});
  };

  const sealRitual = () => {
    trackActivity('Saved to Grimoire', `Moon: ${moonData?.phase || 'Unknown'} · Items: ${selectedItems.map(i => i.name).join(', ')}`);
    const newEntry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString(),
      moonPhase: moonData?.phase || 'Unknown Phase',
      moonIllumination: moonData?.illumination ?? null,
      season: getInuttitutSeason(),
      mantra: weaveMantra,
      sigil: serializeSigil(selectedItems),
      // Rich persisted data
      cacheItems: selectedItems.map(({ id, name, type, property, icon, tags }) => ({ id, name, type, property, icon, tags })),
      tarot: tarot ? tarot.map(card => ({
        name: card.name,
        position: card.position,
        reversed: card.reversed,
        icon: card.icon,
        past: card.past,
        present: card.present,
        future: card.future,
        center: card.center,
        mirror: card.mirror,
        north: card.north,
        east: card.east,
        west: card.west,
        south: card.south,
      })) : [],
      spreadSize,
      intentSigil: intentSigilData || null,
    };
    const updated = [newEntry, ...archives];
    setArchives(updated);
    localStorage.setItem('selene_archives', JSON.stringify(updated));
    setRitualOutput(null);
    setSelectedItems([]);
    setIntentSigilData(null);
  };

  const drawTarot = () => {
    playChime('soft');
    trackActivity('Drew a Tarot Reading', `Spread size: ${spreadSize}`);
    const shuffled = [...TAROT_CARDS].sort(() => Math.random() - 0.5);
    const positions = POSITION_LABELS[spreadSize] || POSITION_LABELS[3];
    const drawn = shuffled.slice(0, positions.length).map((card, i) => ({
      ...card,
      position: positions[i].toLowerCase(),
      reversed: Math.random() > 0.8,
    }));
    setTarot(drawn);
  };

  const drawWithVibe = () => {
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
      drawTarot();
    }, 400);
  };

  // --- DOMINANT NOTE (Apothecary) ---
  const dominantNote = useMemo(() => {
    if (selectedItems.length === 0) return null;
    const freq = {};
    selectedItems.forEach(item => {
      item.tags?.forEach(tag => { freq[tag] = (freq[tag] || 0) + 1; });
    });
    return Object.entries(freq).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;
  }, [selectedItems]);

  const filteredData = MASTER_DATA.filter(item => {
    const matchesTab = item.type === subFilter;
    const matchesSearch = searchQuery === "" || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags?.some(tag => tag.includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  const cacheTabDef = CACHE_TABS.find(t => t.value === cacheTab);
  const filteredCache = MASTER_DATA.filter(item => {
    const matchesCategory = cacheTab === 'all' || cacheTabDef?.types?.includes(item.type);
    const q = cacheSearch.toLowerCase();
    const matchesSearch = q === '' ||
      item.name.toLowerCase().includes(q) ||
      item.property.toLowerCase().includes(q) ||
      item.tags?.some(tag => tag.includes(q));
    return matchesCategory && matchesSearch;
  });

  const isLunarDay = new Date().getDay() === 1;

  return (
    <div style={{ backgroundColor: '#12011a', minHeight: '100vh', color: '#cbd5e1', padding: '20px', fontFamily: 'serif' }}>
      <PublicHeader isAuthenticated={isAuthenticated} user={user} onLogout={logout} />
      <header style={{ textAlign: 'center', marginBottom: '40px', paddingTop: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '6px' }}>
          <InukshukIcon size={28} glowing={selectedItems.length > 0 || isLunarDay} style={{ color: '#c084fc', animation: isLunarDay ? 'lunar-logo-pulse 2.5s ease-in-out infinite' : undefined }} />
          <h1 style={{ color: 'white', fontSize: '2.4rem', fontStyle: 'italic', letterSpacing: '-1.5px', margin: 0, textShadow: isLunarDay ? '0 0 20px #c084fc80, 0 0 40px #7c3aed40' : 'none', animation: isLunarDay ? 'lunar-title-pulse 2.5s ease-in-out infinite' : 'none' }}>Atsanik Selene</h1>
          <InukshukIcon size={28} glowing={selectedItems.length > 0 || isLunarDay} style={{ color: '#c084fc', animation: isLunarDay ? 'lunar-logo-pulse 2.5s ease-in-out infinite' : undefined }} />
        </div>

        {/* Guided Ritual Mode toggle */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '6px' }}>
          <span style={{ fontSize: '8px', textTransform: 'uppercase', letterSpacing: '3px', color: guidedMode ? '#c084fc' : '#4c3060', transition: 'color 0.3s' }}>
            Guided Ritual
          </span>
          <button
            onClick={() => {
              const next = !guidedMode;
              setGuidedMode(next);
              if (next) { setGuidedStep('moon'); setActiveTab('moon'); }
            }}
            style={{
              width: '36px', height: '18px', borderRadius: '9px',
              background: guidedMode ? 'linear-gradient(90deg, #6d28d9, #c084fc)' : '#1a0a2a',
              border: guidedMode ? '1px solid #c084fc55' : '1px solid #2d1a4a',
              cursor: 'pointer', position: 'relative', transition: 'all 0.35s',
              boxShadow: guidedMode ? '0 0 10px 2px #c084fc44' : 'none',
              padding: 0,
            }}
            title={guidedMode ? 'Disable Guided Ritual Mode' : 'Enable Guided Ritual Mode'}
          >
            <span style={{
              position: 'absolute', top: '2px',
              left: guidedMode ? '19px' : '2px',
              width: '14px', height: '14px', borderRadius: '50%',
              background: guidedMode ? '#e9d5ff' : '#4c3060',
              transition: 'left 0.3s, background 0.3s',
              display: 'block',
            }} />
          </button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '35px', marginTop: '15px', position: 'relative' }}>
          {['moon', 'cache', 'sigil', 'tarot', 'grimoire'].map(tab => {
            const isInitTarget = initiationActive && (
              (tab === 'moon' && !moonViewed) ||
              (tab === 'cache' && moonViewed && selectedItems.length === 0) ||
              (tab === 'tarot' && selectedItems.length > 0 && !tarot) ||
              (tab === 'grimoire' && tarot && selectedItems.length > 0)
            );
            const isSigilTab = tab === 'sigil';
            return (
              <button
                key={tab}
                ref={el => { navBtnRefs.current[tab] = el; }}
                onClick={() => {
                  if (isTabLocked(tab)) return;
                  setActiveTab(tab);
                  if (tab === 'moon' && !moonViewed) setTimeout(() => setMoonViewed(true), 3000);
                }}
                className={activeTab === tab ? 'shimmer-btn' : ''}
                style={{
                  border: 'none',
                  background: activeTab === tab ? undefined : 'none',
                  color: activeTab === tab
                    ? '#e9d5ff'
                    : isTabLocked(tab)
                    ? '#2d1a4a'
                    : isInitTarget ? '#c084fc' : '#a78bfa',
                  textTransform: 'uppercase', fontSize: '10px', letterSpacing: '5px',
                  cursor: isTabLocked(tab) ? 'not-allowed' : 'pointer', fontWeight: '900',
                  boxShadow: activeTab === tab
                    ? '0 0 12px 2px #bf80ff50'
                    : isInitTarget
                    ? '0 0 0 3px #c084fc30, 0 0 10px 2px #c084fc44'
                    : 'none',
                  borderRadius: '2px', padding: '3px 8px', transition: 'all 0.3s',
                  animation: isInitTarget ? 'initiation-pulse 2.5s ease-in-out infinite' : 'none',
                  filter: isTabLocked(tab) ? 'grayscale(1) opacity(0.3)' : 'none',
                }}
              >{tab}</button>
            );
          })}
          <style>{`
            @keyframes initiation-pulse {
              0%, 100% { box-shadow: 0 0 0 0 #c084fc44; color: #c084fc; }
              50%       { box-shadow: 0 0 0 6px #c084fc15, 0 0 14px 3px #c084fc55; color: #e9d5ff; }
            }
            @keyframes lunar-logo-pulse {
              0%, 100% { filter: drop-shadow(0 0 6px #c084fc) drop-shadow(0 0 12px #7c3aed88); }
              50%       { filter: drop-shadow(0 0 18px #e9d5ff) drop-shadow(0 0 36px #c084fc) drop-shadow(0 0 60px #7c3aed88); }
            }
            @keyframes lunar-title-pulse {
              0%, 100% { text-shadow: 0 0 20px #c084fc60, 0 0 40px #7c3aed30; }
              50%       { text-shadow: 0 0 30px #e9d5ff, 0 0 60px #c084fc80, 0 0 100px #7c3aed50; }
            }
          `}</style>
        </div>
      </header>

      {/* Guided Mode micro-copy */}
      {guidedMode && (
        <GuidedRitualMode
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentStep={guidedStep}
          navRefs={navBtnRefs}
        />
      )}

      {activeTab === 'moon' && (
        <MoonDisplay archives={archives} />
      )}

      {activeTab === 'cache' && (
        <>
          {/* Cache Header */}
          <div style={{ textAlign: 'center', marginBottom: '30px', position: 'relative' }}>
            <h2 style={{ background: 'linear-gradient(135deg, #d8b4fe, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontSize: '2rem', fontStyle: 'italic', marginBottom: '6px' }}>The Cache</h2>
            <p style={{ color: '#6d28d9', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '4px', fontStyle: 'italic' }}>The Forager's Index · Gather, craft, and store your magical work.</p>
            <button onClick={() => setShowInfo(true)} title="About Atsanik Selene" style={{ position: 'absolute', top: 0, right: 0, background: 'none', border: '1px solid #4c1d95', borderRadius: '50%', width: '28px', height: '28px', color: '#7c3aed', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#a855f7'; e.currentTarget.style.color = '#e9d5ff'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#4c1d95'; e.currentTarget.style.color = '#7c3aed'; }}
            >i</button>
          </div>

          {/* Search bar */}
          <div style={{ maxWidth: '400px', margin: '0 auto 30px auto' }}>
            <input
              type="text"
              placeholder="Search the Cache..."
              value={cacheSearch}
              onChange={e => setCacheSearch(e.target.value)}
              style={{ width: '100%', background: 'transparent', border: '1px solid #701a75', borderRadius: '4px', padding: '14px 20px', color: 'white', outline: 'none', textAlign: 'center', fontStyle: 'italic', transition: 'border-color 0.3s, box-shadow 0.3s', boxSizing: 'border-box' }}
              onFocus={e => { e.currentTarget.style.borderColor = '#a855f7'; e.currentTarget.style.boxShadow = '0 0 14px -2px #a855f780'; }}
              onBlur={e => { e.currentTarget.style.borderColor = '#701a75'; e.currentTarget.style.boxShadow = 'none'; }}
            />
          </div>

          {/* Sub-navigation */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '40px', flexWrap: 'wrap' }}>
            {CACHE_TABS.map(t => (
              <button key={t.value} onClick={() => setCacheTab(t.value)} style={{
                background: cacheTab === t.value ? 'linear-gradient(135deg, #4c1d95, #6d28d9)' : 'transparent',
                color: cacheTab === t.value ? '#e9d5ff' : '#6d28d9',
                border: cacheTab === t.value ? '1px solid #7c3aed' : '1px solid #2d0040',
                borderRadius: '3px', padding: '7px 18px', cursor: 'pointer',
                fontSize: '9px', textTransform: 'uppercase', letterSpacing: '3px', fontWeight: '700',
                boxShadow: cacheTab === t.value ? '0 0 10px 1px #7c3aed44' : 'none',
                transition: 'all 0.25s'
              }}>{t.label}</button>
            ))}
          </div>

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', maxWidth: '1000px', margin: '0 auto', paddingBottom: '200px' }}>
            {filteredCache.map(item => {
              const isSelected = !!selectedItems.find(s => s.id === item.id);
              const glowColor = PROPERTY_GLOW[item.property] || '#7c3aed';
              const isInitHighlight = initiationActive && selectedItems.length === 0 && INIT_HIGHLIGHT_IDS.has(item.id);
              return (
                <div key={item.id} onClick={() => {
                  playChime('soft');
                  if (isSelected) setSelectedItems(selectedItems.filter(i => i.id !== item.id));
                  else setSelectedItems([...selectedItems, item]);
                }} style={{ background: isSelected ? '#1e0a3c' : isInitHighlight ? '#120828' : '#040a08', border: isSelected ? `1px solid ${glowColor}55` : isInitHighlight ? '1px solid #c084fc66' : '1px solid #0a0a0a', padding: '45px 25px', borderRadius: '4px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s', boxShadow: isSelected ? `0 0 18px 2px ${glowColor}22, 0 0 4px 1px ${glowColor}44` : isInitHighlight ? '0 0 20px 4px #c084fc22, 0 0 0 1px #c084fc33' : 'none', animation: isInitHighlight ? 'init-item-pulse 3s ease-in-out infinite' : 'none' }}
                  onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
                  onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  onTouchStart={e => e.currentTarget.style.transform = 'scale(0.98)'}
                  onTouchEnd={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <div style={{ fontSize: '32px', marginBottom: '20px', opacity: isSelected ? 1 : isInitHighlight ? 0.85 : 0.3 }}>{item.icon}</div>
                  <div style={{ color: isInitHighlight && !isSelected ? '#e9d5ff' : 'white', fontSize: '15px', fontStyle: 'italic' }}>{item.name}</div>
                  <div style={{ fontSize: '8px', color: isInitHighlight && !isSelected ? '#c084fc' : '#a78bfa', textTransform: 'uppercase', marginTop: '8px' }}>{item.property}</div>
                  {isInitHighlight && !isSelected && (
                    <div style={{ fontSize: '7px', color: '#7dd3fc', textTransform: 'uppercase', letterSpacing: '3px', marginTop: '6px', opacity: 0.8 }}>✦ gather this</div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      {activeTab === 'sigil' && (
        <IntentSigil onBind={data => setIntentSigilData(data)} />
      )}

      {activeTab === 'tarot' && (
        <TarotSpread
          tarot={tarot}
          spreadSize={spreadSize}
          onSpreadSizeChange={setSpreadSize}
          onDraw={drawWithVibe}
          onReset={() => setTarot(null)}
          isShaking={isShaking}
        />
      )}

      {activeTab === 'grimoire' && (
        <GrimoireTab archives={archives} masterData={MASTER_DATA} />
      )}

      {ritualOutput && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: '#08082a', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="candle-flicker" style={{ maxWidth: '550px', width: '100%', padding: '40px' }}>
             <h2 style={{ color: 'white', fontStyle: 'italic', fontSize: '2.8rem', textAlign: 'center', marginBottom: '30px' }}>The Working</h2>

             {/* Generated Sigil */}
             <div style={{ marginBottom: '40px', opacity: 0.85 }}>
               <SigilEngine items={selectedItems} size={180} />
             </div>

             <div style={{ textAlign: 'left', marginBottom: '60px', borderLeft: '1px solid #7c3aed', paddingLeft: '35px' }}>
                {ritualOutput.map((step, i) => (
                  <p key={i} style={{ fontSize: '16px', marginBottom: '25px', color: '#cbd5e1', lineHeight: '1.8' }}>{step}</p>
                ))}
             </div>
             <button onClick={placeCapstone} className="shimmer-btn" style={{ padding: '20px 25px', width: '100%', fontWeight: '900', textTransform: 'uppercase', fontSize: '11px', cursor: 'pointer', letterSpacing: '5px', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px' }}>
               <InukshukIcon size={22} settling={capstoneSettling} glowing={!capstoneSettling} style={{ color: '#e9d5ff' }} />
               Place the Capstone
               <InukshukIcon size={22} settling={capstoneSettling} glowing={!capstoneSettling} style={{ color: '#e9d5ff' }} />
             </button>
          </div>
        </div>
      )}

      {selectedItems.length > 0 && !ritualOutput && (
        <div style={{ position: 'fixed', bottom: '40px', left: '50%', transform: 'translateX(-50%)', width: '90%', maxWidth: '600px', backgroundColor: 'rgba(0,0,0,0.95)', border: '1px solid #111', padding: '35px', textAlign: 'center', zIndex: 100 }}>
          <p style={{ color: '#d8b4fe', fontSize: '16px', fontStyle: 'italic', marginBottom: '25px', lineHeight: '1.6' }}>"{weaveMantra}"</p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => setRitualOutput([
              "Observe the weight of your chosen materia.",
              `Quiet your pulse and align with ${selectedItems[0].name}.`,
              tarot ? `Acknowledge the counsel of ${tarot.length}: ${tarot.map(c => c.name).join(', ')}.` : "Hold the vision with absolute clarity.",
              `Speak the weave: "${weaveMantra}"`,
              "The intent is sealed. Step away from the ritual space."
            ])} className="shimmer-btn" style={{ padding: '15px 40px', fontWeight: '900', textTransform: 'uppercase', fontSize: '11px', cursor: 'pointer', letterSpacing: '3px', boxShadow: '0 0 20px 4px #a855f740', borderRadius: '2px' }}>Begin Ceremony</button>
            <button onClick={returnToLand} style={{ background: 'none', border: '1px solid #2d0040', color: '#6d28d9', padding: '15px 28px', fontWeight: '700', textTransform: 'uppercase', fontSize: '10px', cursor: 'pointer', letterSpacing: '3px', borderRadius: '2px', transition: 'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#7c3aed'; e.currentTarget.style.color = '#c084fc'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#2d0040'; e.currentTarget.style.color = '#6d28d9'; }}
            >Return to the Land</button>
          </div>
        </div>
      )}

      {/* Initiation Flow */}
      {initiationActive && (
        <InitiationFlow
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          moonViewed={moonViewed}
          itemsSelected={selectedItems.length > 0}
          tarotDrawn={!!tarot}
          onDismiss={() => {
            setInitiationActive(false);
            localStorage.setItem('selene_initiated', '1');
          }}
        />
      )}

      {/* Guided Mode floor thread */}
      {guidedMode && <FloorThread activeTab={activeTab} navRefs={navBtnRefs} />}

      {/* Aurora pulse on capstone completion */}
      {showAurora && <AuroraPulse onDone={() => setShowAurora(false)} />}

      {/* Fade-to-black cleanse overlay */}
      {isCleansing && (
        <div className="fade-to-black" style={{ position: 'fixed', inset: 0, backgroundColor: '#000', zIndex: 2000 }} />
      )}

      <AppFooter />

      {/* Info modal */}
      {showInfo && (
        <div onClick={() => setShowInfo(false)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '30px' }}>
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: '440px', width: '100%', background: '#0d0d35', border: '1px solid #94a3b8', borderRadius: '6px', padding: '50px 40px', textAlign: 'center' }}>
            <InukshukIcon size={40} glowing style={{ color: '#c084fc', margin: '0 auto 24px auto', display: 'block' }} />
            <h3 style={{ color: 'white', fontStyle: 'italic', fontSize: '1.6rem', fontWeight: 300, marginBottom: '30px', letterSpacing: '-0.5px' }}>About this Place</h3>
            <div style={{ textAlign: 'left', borderLeft: '1px solid #4c1d95', paddingLeft: '20px' }}>
              <p style={{ color: '#e9d5ff', fontSize: '13px', lineHeight: '1.9', marginBottom: '18px' }}>
                <span style={{ color: '#c084fc', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '9px', display: 'block', marginBottom: '4px' }}>Atsanik</span>
                In Inuttitut, <em>atsanik</em> means the northern lights — the dancing spirits who weave colour across the winter sky. Here, they witness every working.
              </p>
              <p style={{ color: '#e9d5ff', fontSize: '13px', lineHeight: '1.9', marginBottom: '18px' }}>
                <span style={{ color: '#c084fc', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '9px', display: 'block', marginBottom: '4px' }}>Selene</span>
                The Greek titaness of the moon, who pulls the tides and governs cycles of becoming and release. She rides her silver chariot across the night, marking time.
              </p>
              <p style={{ color: '#e9d5ff', fontSize: '13px', lineHeight: '1.9', marginBottom: '0' }}>
                <span style={{ color: '#c084fc', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '9px', display: 'block', marginBottom: '4px' }}>The Inukshuk</span>
                A stone figure built by Inuit peoples to mark safe passage across the land. Here it stands as a guide for the soul — each stone placed is an intention set, each capstone a path confirmed.
              </p>
            </div>
            <button onClick={() => setShowInfo(false)} style={{ marginTop: '36px', background: 'none', border: 'none', color: '#4c1d95', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '4px', cursor: 'pointer' }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}