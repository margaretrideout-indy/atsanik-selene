import React, { useState } from 'react';
import InukshukIcon from '../components/garden/InukshukIcon';

const CUSTOM_ICONS = {
  'The Traveler':      'https://media.base44.com/images/public/69ef3e790d68b46e39044a00/7f81d436b_generated_image.png',
  'The Drum':          'https://media.base44.com/images/public/69ef3e790d68b46e39044a00/f56c6b812_generated_image.png',
  'The Angakkuq':      'https://media.base44.com/images/public/69ef3e790d68b46e39044a00/b00a8a777_generated_image.png',
  'Sedna':             'https://media.base44.com/images/public/69ef3e790d68b46e39044a00/7b5071d27_generated_image.png',
  'The Elder':         'https://media.base44.com/images/public/69ef3e790d68b46e39044a00/e087370b1_generated_image.png',
  'The Qamutik':       'https://media.base44.com/images/public/69ef3e790d68b46e39044a00/054f59e27_generated_image.png',
  'The Lone Inukshuk': 'https://media.base44.com/images/public/69ef3e790d68b46e39044a00/13ff9485a_generated_image.png',
  'The Ulu':           'https://media.base44.com/images/public/69ef3e790d68b46e39044a00/e1b97d2d8_generated_image.png',
};

const DECK = [
  {
    name: 'The Traveler', icon: '🧭', theme: 'Courage of the Open Tundra',
    past:    { meaning: 'A great departure was made — you left behind the familiar and stepped into the unknown.', fateLine: 'The Traveler marks the beginning of a journey already taken.' },
    present: { meaning: 'The threshold is open. You stand at the edge of new territory with only your instincts.', fateLine: 'The Traveler blesses this working with the courage of the open tundra.' },
    future:  { meaning: 'A journey of risk and discovery lies ahead — trust the ice beneath your feet.', fateLine: 'The Traveler promises that the path will reveal itself as you walk.' },
  },
  {
    name: 'The Angakkuq', icon: '🥁', theme: 'Passage Between Worlds',
    past:    { meaning: 'A time of raw power was seized — spirit was called and it answered.', fateLine: 'The Angakkuq reminds you: you have already walked between worlds.' },
    present: { meaning: 'The drum beats. The veil between worlds is thin and the spirit channels are open.', fateLine: 'The Angakkuq grants passage between the seen and the unseen, here and now.' },
    future:  { meaning: 'A convergence of spirit and will is coming — the drum will call what is needed.', fateLine: 'The Angakkuq promises that the spirits will answer this intent.' },
  },
  {
    name: 'Sedna', icon: '🌊', theme: 'Sacrifice Becomes Abundance',
    past:    { meaning: 'A great sacrifice shaped the depths of who you are — loss became abundance.', fateLine: 'Sedna held this desire in the cold dark long before you knew its name.' },
    present: { meaning: 'The mother of the sea stirs. What was lost is transforming into sustenance.', fateLine: 'Sedna breathes life from the deep into this working.' },
    future:  { meaning: 'A season of profound transformation is near — from sacrifice comes infinite giving.', fateLine: 'Sedna promises that the ocean of abundance will provide.' },
  },
  {
    name: 'The Elder', icon: '❄️', theme: 'Wisdom of Generations',
    past:    { meaning: 'Wisdom was passed down through long patience — you were shaped by those who came before.', fateLine: 'The Elder held this knowing in trust until you were ready.' },
    present: { meaning: 'Authority and deep knowing anchor this moment. The old ways are the right ways here.', fateLine: 'The Elder steadies this working with the weight of generations.' },
    future:  { meaning: 'A time of leadership and earned authority approaches — the community will look to you.', fateLine: 'The Elder promises the strength of the long winter will serve you.' },
  },
  {
    name: 'The Qamutik', icon: '🛷', theme: 'Swift Passage Over Hard Ground',
    past:    { meaning: 'Momentum carried you over difficult terrain — the dogs knew the way even when you did not.', fateLine: 'The Qamutik bore this intention across the frozen distance already.' },
    present: { meaning: 'Speed and directed will cut through all resistance. The path is clear; move now.', fateLine: 'The Qamutik drives this working forward with great and certain force.' },
    future:  { meaning: 'Rapid progress over hard ground is coming — harness the energy and do not hesitate.', fateLine: 'The Qamutik promises swift passage to the destination of your intent.' },
  },
  {
    name: 'The Lone Inukshuk', icon: '🪨', theme: 'Inner Landmark & Safe Passage',
    past:    { meaning: 'A period of solitary standing forged your inner landmark — you became a guide for others.', fateLine: 'The Lone Inukshuk stood with you through the long silence of becoming.' },
    present: { meaning: 'Inner stillness is the most powerful tool. Be the marker, not the one who wanders.', fateLine: 'The Lone Inukshuk illuminates the way from within this very moment.' },
    future:  { meaning: 'A season of quiet witness and deep inner authority will bring great clarity.', fateLine: 'The Lone Inukshuk will mark the path before the next threshold opens.' },
  },
  {
    name: 'The Ulu', icon: '🔪', theme: 'The Decisive Cut',
    past:    { meaning: 'A great turning of seasons brought you to the work you now hold.', fateLine: 'The Ulu has already cut the old from the new — the turn has been made.' },
    present: { meaning: 'Decisive skill is at work. The right cut at the right moment changes everything.', fateLine: 'The Ulu turns this working toward its destined and necessary outcome.' },
    future:  { meaning: 'A pivotal severing or transformation approaches — it will be clean and final.', fateLine: 'The Ulu promises a significant and liberating shift is coming.' },
  },
  {
    name: 'The Drum', icon: '🌍', theme: 'Wholeness & Joyful Completion',
    past:    { meaning: 'A great cycle danced to completion — the song was sung and the circle closed.', fateLine: 'The Drum marked the end of a dance you have already walked.' },
    present: { meaning: 'Wholeness, integration, and joyful completion resound through this working now.', fateLine: 'The Drum declares this working already whole — the rhythm is complete.' },
    future:  { meaning: 'Full flowering and the joy of the drum circle await at this path\'s end.', fateLine: 'The Drum promises celebration beyond what you dare to imagine.' },
  },
];

function CardModal({ card, onClose }) {
  const img = CUSTOM_ICONS[card.name];
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 5000,
        backgroundColor: 'rgba(10, 2, 20, 0.75)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px', overflowY: 'auto',
        animation: 'modal-in 0.3s ease',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '520px', width: '100%',
          background: '#f5f0eb',
          border: '1px solid #d4c5a9',
          borderRadius: '12px',
          padding: '48px 36px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
          textAlign: 'center',
        }}
      >
        {/* Image box */}
        <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'center' }}>
          <div style={{
            background: '#fff',
            borderRadius: '8px',
            padding: '18px',
            display: 'inline-flex',
            alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 16px rgba(100,60,180,0.15)',
          }}>
            {img ? (
              <img src={img} alt={card.name} style={{
                width: '160px', height: '160px', objectFit: 'contain',
              }} />
            ) : (
              <div style={{ fontSize: '80px', lineHeight: 1 }}>{card.icon}</div>
            )}
          </div>
        </div>

        {/* Title & theme */}
        <h2 style={{ color: '#1e0a3c', fontStyle: 'italic', fontSize: '1.9rem', fontWeight: 600, margin: '0 0 8px', lineHeight: '1.3' }}>
          {card.name}
        </h2>
        <p style={{ fontSize: '9px', color: '#6d28d9', textTransform: 'uppercase', letterSpacing: '4px', margin: '0 0 36px', fontWeight: 600 }}>
          {card.theme}
        </p>

        {/* Past / Present / Future */}
        {['past', 'present', 'future'].map(t => (
          <div key={t} style={{ textAlign: 'left', marginBottom: '26px', borderLeft: '2px solid #7c3aed55', paddingLeft: '20px' }}>
            <p style={{ fontSize: '7px', color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '4px', margin: '0 0 8px', fontWeight: 700 }}>{t}</p>
            <p style={{ fontSize: '14px', color: '#1e0a3c', fontStyle: 'italic', lineHeight: '1.85', margin: '0 0 6px', fontWeight: 500 }}>
              {card[t].meaning}
            </p>
            <p style={{ fontSize: '11px', color: '#6d28d9', fontStyle: 'italic', margin: 0, lineHeight: '1.6' }}>
              ✦ {card[t].fateLine}
            </p>
          </div>
        ))}

        <button
          onClick={onClose}
          style={{
            marginTop: '12px', background: 'none', border: 'none',
            color: '#9ca3af', fontSize: '9px', textTransform: 'uppercase',
            letterSpacing: '4px', cursor: 'pointer', transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#4c1d95'}
          onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}
        >
          Return to the Gallery
        </button>
      </div>

      <style>{`
        @keyframes modal-in { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
        @keyframes card-glow {
          0%, 100% { filter: drop-shadow(0 0 12px #c084fc88); }
          50% { filter: drop-shadow(0 0 28px #c084fccc) drop-shadow(0 0 50px #7c3aed66); }
        }
      `}</style>
    </div>
  );
}

export default function DeckGallery() {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ backgroundColor: '#12011a', minHeight: '100vh', color: '#cbd5e1', padding: '40px 20px', fontFamily: 'serif' }}>
      {/* Back link */}
      <div style={{ maxWidth: '900px', margin: '0 auto 40px' }}>
        <a
          href="/"
          style={{ fontSize: '9px', color: '#4c1d95', textTransform: 'uppercase', letterSpacing: '4px', textDecoration: 'none', transition: 'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = '#a855f7'}
          onMouseLeave={e => e.currentTarget.style.color = '#4c1d95'}
        >
          ← Return to the Garden
        </a>
      </div>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '10px' }}>
          <InukshukIcon size={24} glowing style={{ color: '#c084fc' }} />
          <h1 style={{ color: 'white', fontSize: '2.4rem', fontStyle: 'italic', letterSpacing: '-1px', margin: 0, textShadow: '0 0 20px #c084fc50' }}>
            The Deck Gallery
          </h1>
          <InukshukIcon size={24} glowing style={{ color: '#c084fc' }} />
        </div>
        <p style={{ fontSize: '9px', color: '#6d28d9', textTransform: 'uppercase', letterSpacing: '5px', margin: 0 }}>
          Inuit Archetype Oracle · Eight Cards
        </p>
        <p style={{ fontSize: '12px', color: '#4c2a7a', fontStyle: 'italic', marginTop: '14px', maxWidth: '480px', margin: '14px auto 0', lineHeight: '1.8' }}>
          Each archetype holds three temporal faces — the past that shaped you, the present moment of working, and the future path ahead. Select a card to receive its full lore.
        </p>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '20px',
        maxWidth: '900px',
        margin: '0 auto',
        paddingBottom: '60px',
      }}>
        {DECK.map(card => {
          const img = CUSTOM_ICONS[card.name];
          return (
            <div
              key={card.name}
              onClick={() => setSelected(card)}
              style={{
                background: 'rgba(232, 220, 255, 0.07)',
                border: '1px solid #3b1a6a',
                borderRadius: '12px',
                padding: '36px 24px 28px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px',
                backdropFilter: 'blur(6px)',
                boxShadow: 'inset 0 0 30px 0 rgba(100, 60, 180, 0.08), 0 2px 16px 0 rgba(0,0,0,0.4)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#7c3aed';
                e.currentTarget.style.boxShadow = '0 0 28px 4px #4c1d9535';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#1e0a3c';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Card image */}
              <div style={{ width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {img ? (
                  <img src={img} alt={card.name} style={{
                    width: '100%', height: '100%', objectFit: 'contain',
                    mixBlendMode: 'screen',
                    filter: 'drop-shadow(0 0 10px #c084fc88)',
                  }} />
                ) : (
                  <span style={{ fontSize: '68px' }}>{card.icon}</span>
                )}
              </div>

              {/* Title */}
              <h3 style={{ color: '#f0eaff', fontSize: '1.15rem', fontStyle: 'italic', fontWeight: 600, margin: 0, lineHeight: '1.4', textShadow: '0 0 12px #c084fc50' }}>
                {card.name}
              </h3>

              {/* Theme */}
              <p style={{ fontSize: '9px', color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '2px', margin: 0, lineHeight: '1.7', fontWeight: 500 }}>
                {card.theme}
              </p>

              {/* Hint */}
              <span style={{ fontSize: '8px', color: '#4c2a7a', textTransform: 'uppercase', letterSpacing: '3px', marginTop: '2px' }}>
                View Lore →
              </span>
            </div>
          );
        })}
      </div>

      {selected && <CardModal card={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}