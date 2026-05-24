import React, { useState } from 'react';

const CUSTOM_ICONS = {
  'The Traveler':    'https://media.base44.com/images/public/69ef3e790d68b46e39044a00/ebe1ebbd3_generated_image.png',
  'The Drum':        'https://media.base44.com/images/public/69ef3e790d68b46e39044a00/f56c6b812_generated_image.png',
  'The Angakkuq':    'https://media.base44.com/images/public/69ef3e790d68b46e39044a00/b00a8a777_generated_image.png',
  'Sedna':           'https://media.base44.com/images/public/69ef3e790d68b46e39044a00/7b5071d27_generated_image.png',
  'The Elder':       'https://media.base44.com/images/public/69ef3e790d68b46e39044a00/e087370b1_generated_image.png',
  'The Kamutik':     'https://media.base44.com/images/public/69ef3e790d68b46e39044a00/054f59e27_generated_image.png',
  'The Lone Inukshuk': 'https://media.base44.com/images/public/69ef3e790d68b46e39044a00/7f81d436b_generated_image.png',
  'The Ulu':         'https://media.base44.com/images/public/69ef3e790d68b46e39044a00/e1b97d2d8_generated_image.png',
};

// Position labels per spread size
const POSITION_LABELS = {
  1: ['The Mirror'],
  3: ['Past', 'Present', 'Future'],
  5: ['North', 'East', 'Center', 'West', 'South'],
};

// For the 5-card cross layout: [top, right, center, left, bottom]
// grid positions (row, col) in a 3x3 grid (0-indexed)
const CROSS_POSITIONS = [
  { gridRow: 1, gridCol: 2 }, // North  → top center
  { gridRow: 2, gridCol: 3 }, // East   → mid right
  { gridRow: 2, gridCol: 2 }, // Center → mid center
  { gridRow: 2, gridCol: 1 }, // West   → mid left
  { gridRow: 3, gridCol: 2 }, // South  → bottom center
];

function TarotCard({ card, compact = false }) {
  const customImg = CUSTOM_ICONS[card.name];
  const hasCustom = !!customImg;
  const temporal = card[card.position] || card.center || card.mirror || {};

  return (
    <div style={{
      border: '1px solid #5b3472',
      borderRadius: '8px',
      padding: compact ? '18px 12px' : '28px 18px',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
      position: 'relative', overflow: 'hidden',
      background: 'rgba(25, 10, 45, 0.82)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      boxShadow: '0 0 30px 4px #4c1d9530, inset 0 0 20px 0 #1a0a2a60',
      width: compact ? '140px' : '200px',
    }}>
      <p style={{ fontSize: '7px', color: '#7dd3fc', textTransform: 'uppercase', letterSpacing: '0.12em', margin: 0 }}>
        {card.position}
      </p>

      <div style={{
        transform: card.reversed ? 'rotate(180deg)' : 'none',
        transition: 'transform 1s',
        width: compact ? '72px' : '100px',
        height: compact ? '72px' : '100px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {hasCustom ? (
          <img src={customImg} alt={card.name} style={{
            width: '100%', height: '100%', objectFit: 'contain',
            mixBlendMode: 'screen',
            filter: 'drop-shadow(0 0 10px #c084fc55)',
            animation: 'atsanik-pulse 4s ease-in-out infinite',
          }} />
        ) : (
          <span style={{ fontSize: compact ? '44px' : '56px' }}>{card.icon}</span>
        )}
      </div>

      <h3 style={{
        color: '#e2d9f3', fontSize: compact ? '0.85rem' : '1rem',
        fontStyle: 'italic', margin: 0,
        textShadow: hasCustom ? '0 0 12px #c084fc80' : 'none',
        textAlign: 'center',
      }}>
        {card.name}
        {card.reversed && (
          <span style={{ color: '#c084fc', fontSize: '10px', display: 'block', marginTop: '3px' }}>Shadow</span>
        )}
      </h3>

      {!compact && (
        <p style={{ color: '#a0899e', fontSize: '10px', lineHeight: '1.75', fontStyle: 'italic', margin: 0, textAlign: 'center' }}>
          {card.reversed ? 'Obstruction and shadow veil this time.' : (temporal.meaning || '')}
        </p>
      )}

      <style>{`
        @keyframes atsanik-pulse {
          0%, 100% { filter: drop-shadow(0 0 6px #c084fc55) drop-shadow(0 0 14px #22d3ee30); }
          50%       { filter: drop-shadow(0 0 14px #c084fcaa) drop-shadow(0 0 28px #22d3ee66); }
        }
      `}</style>
    </div>
  );
}

// Spread selector UI
function SpreadSelector({ selected, onChange }) {
  const options = [
    { size: 1, label: 'The Mirror', sub: 'Single' },
    { size: 3, label: 'The River', sub: 'Past · Present · Future' },
    { size: 5, label: 'The Four Directions', sub: 'Cross of the Land' },
  ];

  return (
    <div style={{ textAlign: 'center', marginBottom: '48px' }}>
      <p style={{ fontSize: '8px', textTransform: 'uppercase', letterSpacing: '5px', color: '#6d28d9', marginBottom: '24px' }}>
        Choose Your Path
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
        {options.map(o => (
          <button
            key={o.size}
            onClick={() => onChange(o.size)}
            style={{
              background: selected === o.size
                ? 'linear-gradient(135deg, #3b0764, #6d28d9)'
                : 'rgba(13, 0, 30, 0.7)',
              border: selected === o.size ? '1px solid #a855f7' : '1px solid #2d0040',
              borderRadius: '6px',
              padding: '18px 22px',
              cursor: 'pointer',
              color: selected === o.size ? '#e9d5ff' : '#6d28d9',
              textAlign: 'center',
              transition: 'all 0.25s',
              boxShadow: selected === o.size ? '0 0 18px 3px #7c3aed44' : 'none',
              minWidth: '130px',
            }}
            onMouseEnter={e => { if (selected !== o.size) { e.currentTarget.style.borderColor = '#4c1d95'; e.currentTarget.style.color = '#a78bfa'; } }}
            onMouseLeave={e => { if (selected !== o.size) { e.currentTarget.style.borderColor = '#2d0040'; e.currentTarget.style.color = '#6d28d9'; } }}
          >
            <div style={{ fontSize: '22px', marginBottom: '8px', opacity: selected === o.size ? 1 : 0.4 }}>
              {o.size === 1 ? '⟡' : o.size === 3 ? '⟡ ⟡ ⟡' : '✦'}
            </div>
            <div style={{ fontSize: '11px', fontStyle: 'italic', marginBottom: '4px' }}>{o.label}</div>
            <div style={{ fontSize: '8px', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.7 }}>{o.sub}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// Renders 1-card, 3-card horizontal, or 5-card cross
function SpreadLayout({ cards, size }) {
  if (size === 1) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '50px' }}>
        <TarotCard card={cards[0]} />
      </div>
    );
  }

  if (size === 3) {
    return (
      <div className="tarot-spread" style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '50px' }}>
        {cards.map(card => <TarotCard key={card.position} card={card} />)}
      </div>
    );
  }

  // 5-card cross
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 150px)',
      gridTemplateRows: 'repeat(3, auto)',
      gap: '12px',
      justifyContent: 'center',
      marginBottom: '50px',
    }}>
      {cards.map((card, i) => {
        const pos = CROSS_POSITIONS[i];
        return (
          <div key={card.position} style={{
            gridRow: pos.gridRow,
            gridColumn: pos.gridCol,
            display: 'flex', justifyContent: 'center',
          }}>
            <TarotCard card={card} compact />
          </div>
        );
      })}
    </div>
  );
}

export default function TarotSpread({ tarot, spreadSize, onSpreadSizeChange, onDraw, onReset, isShaking }) {
  const [summoned, setSummoned] = useState(false);

  const handleShuffle = () => {
    setSummoned(true);
    onDraw();
  };

  if (!tarot) {
    // Pre-interaction Summoning layer
    if (!summoned) {
      return (
        <div style={{ padding: '60px 20px', maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '9px', color: '#4c1d95', textTransform: 'uppercase', letterSpacing: '6px', margin: '0 0 18px' }}>
            The Summoning
          </p>
          <h2 style={{ color: '#f0ebff', fontStyle: 'italic', fontSize: '1.6rem', fontWeight: 400, margin: '0 0 28px', lineHeight: '1.4' }}>
            Before you proceed, reach a state of stillness.
          </h2>
          <p style={{ color: '#8b7aa8', fontSize: '14px', lineHeight: '1.9', margin: '0 0 40px', fontStyle: 'italic' }}>
            The Atsanik Selene requires a quiet mind. If you are frantic, the cards will mirror that turbulence.
          </p>

          <div style={{ borderTop: '1px solid #1a0830', borderBottom: '1px solid #1a0830', padding: '36px 0', margin: '0 0 40px' }}>
            <p style={{ fontSize: '9px', color: '#4c1d95', textTransform: 'uppercase', letterSpacing: '5px', margin: '0 0 22px' }}>
              First, select your focus
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              {[1, 3].map(n => (
                <button
                  key={n}
                  onClick={() => onSpreadSizeChange(n)}
                  style={{
                    background: spreadSize === n ? 'linear-gradient(135deg, #1e0845, #3b0764)' : 'transparent',
                    border: spreadSize === n ? '1px solid #7c3aed' : '1px solid #2d1255',
                    borderRadius: '4px',
                    padding: '16px 32px',
                    cursor: 'pointer',
                    color: spreadSize === n ? '#e9d5ff' : '#4c2a7a',
                    fontSize: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '4px',
                    fontWeight: 700,
                    transition: 'all 0.25s',
                    boxShadow: spreadSize === n ? '0 0 20px 3px #7c3aed33' : 'none',
                    minWidth: '120px',
                    fontFamily: 'serif',
                  }}
                  onMouseEnter={e => { if (spreadSize !== n) { e.currentTarget.style.borderColor = '#4c1d95'; e.currentTarget.style.color = '#7c3aed'; } }}
                  onMouseLeave={e => { if (spreadSize !== n) { e.currentTarget.style.borderColor = '#2d1255'; e.currentTarget.style.color = '#4c2a7a'; } }}
                >
                  {n} {n === 1 ? 'Card' : 'Cards'}
                </button>
              ))}
            </div>
          </div>

          <p style={{ color: '#6b5a82', fontSize: '13px', lineHeight: '1.9', margin: '0 0 40px', fontStyle: 'italic' }}>
            Once you have chosen, take a breath. Acknowledge the cold air. When your intent is set, click the deck below to initiate the shuffle. Watch the movement until you feel the click of resonance.
          </p>

          <button
            onClick={handleShuffle}
            disabled={!spreadSize}
            style={{
              background: spreadSize ? 'linear-gradient(135deg, #2e1065, #6d28d9, #22d3ee)' : '#0d0520',
              backgroundSize: '250% 250%',
              animation: spreadSize ? 'summon-shimmer 5s ease infinite' : 'none',
              border: spreadSize ? '1px solid rgba(192,132,252,0.4)' : '1px solid #1a0830',
              borderRadius: '3px',
              padding: '20px 48px',
              cursor: spreadSize ? 'pointer' : 'not-allowed',
              color: spreadSize ? '#e9d5ff' : '#2d1a4a',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '6px',
              fontWeight: 700,
              fontFamily: 'serif',
              transition: 'opacity 0.3s',
              opacity: spreadSize ? 1 : 0.4,
              transform: isShaking ? 'translateX(3px)' : 'none',
              boxShadow: spreadSize ? '0 0 30px 6px rgba(109,40,217,0.3)' : 'none',
            }}
          >
            Shuffle the Deck
          </button>

          <style>{`
            @keyframes summon-shimmer {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
          `}</style>
        </div>
      );
    }

    // After shuffle initiated but cards not yet drawn (brief transition state)
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center' }}>
        <div style={{ color: '#a78bfa', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '8px' }}>
          The cards are turning...
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>
      <SpreadLayout cards={tarot} size={spreadSize} />
      <div style={{ textAlign: 'center' }}>
        <a
          href="/deck-gallery"
          style={{
            display: 'inline-block', marginBottom: '20px',
            fontSize: '9px', color: '#4c2a7a', textDecoration: 'none',
            textTransform: 'uppercase', letterSpacing: '4px', fontFamily: 'serif',
            transition: 'color 0.2s, text-shadow 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#c084fc'; e.currentTarget.style.textShadow = '0 0 8px #c084fc60'; }}
          onMouseLeave={e => { e.currentTarget.style.color = '#4c2a7a'; e.currentTarget.style.textShadow = 'none'; }}
        >
          Explore the full Deck Gallery ›
        </a>
        <br />
        <button
          onClick={onReset}
          style={{ background: 'none', border: 'none', color: '#4c3060', fontSize: '10px', textTransform: 'uppercase', cursor: 'pointer', letterSpacing: '3px' }}
        >
          Return to silence
        </button>
      </div>
    </div>
  );
}

// Export the position labels helper for Garden to use when building tarot objects
export { POSITION_LABELS };