import React from 'react';

const DAY_RULERS = {
  0: { name: 'The Sun', keyword: 'Vitality', icon: '☀️', color: '#facc15', glow: '#fbbf24' },
  1: { name: 'The Moon', keyword: 'Intuition', icon: '🌙', color: '#c084fc', glow: '#a855f7', isLunar: true },
  2: { name: 'Mars', keyword: 'Action', icon: '♂️', color: '#f87171', glow: '#ef4444' },
  3: { name: 'Mercury', keyword: 'Logic', icon: '☿', color: '#60a5fa', glow: '#3b82f6' },
  4: { name: 'Jupiter', keyword: 'Growth', icon: '♃', color: '#86efac', glow: '#22c55e' },
  5: { name: 'Venus', keyword: 'Beauty', icon: '♀', color: '#f9a8d4', glow: '#ec4899' },
  6: { name: 'Saturn', keyword: 'Structure', icon: '♄', color: '#94a3b8', glow: '#64748b' },
};

export default function CelestialRhythm() {
  const dayOfWeek = new Date().getDay();
  const ruler = DAY_RULERS[dayOfWeek];
  const isLunarDay = ruler.isLunar;

  return (
    <div style={{
      background: 'linear-gradient(160deg, #0f0525 0%, #0a0318 60%, #120528 100%)',
      border: `1px solid ${ruler.glow}30`,
      borderRadius: '12px',
      padding: '28px 24px',
      marginBottom: '20px',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: `0 0 30px 2px ${ruler.glow}12`,
    }}>
      {/* Background glow blob */}
      <div style={{
        position: 'absolute', top: '-30px', right: '-30px',
        width: '140px', height: '140px',
        background: `radial-gradient(circle, ${ruler.glow}18 0%, transparent 70%)`,
        pointerEvents: 'none',
        borderRadius: '50%',
      }} />

      <div style={{ fontSize: '8px', color: ruler.color, textTransform: 'uppercase', letterSpacing: '5px', marginBottom: '14px', opacity: 0.85 }}>
        Today's Celestial Rhythm
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
        <div style={{
          fontSize: '44px',
          filter: `drop-shadow(0 0 12px ${ruler.glow})`,
          animation: isLunarDay ? 'lunar-high-pulse 2.5s ease-in-out infinite' : 'none',
          flexShrink: 0,
        }}>
          {ruler.icon}
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{
            color: ruler.color,
            fontSize: '1.3rem',
            fontStyle: 'italic',
            fontWeight: 300,
            margin: '0 0 4px 0',
            textShadow: `0 0 14px ${ruler.glow}80`,
          }}>{ruler.name}</h3>
          <p style={{
            color: '#c4b5fd',
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '4px',
            margin: '0 0 10px 0',
            textShadow: '0 0 8px #a78bfa40',
          }}>{ruler.keyword}</p>

          {isLunarDay ? (
            <p style={{
              color: '#e9d5ff',
              fontSize: '13px',
              fontStyle: 'italic',
              lineHeight: 1.7,
              margin: 0,
              textShadow: '0 0 10px #c084fc50',
            }}>
              It is the Day of the Moon. Your connection to Selene is at its zenith.{' '}
              <span style={{ color: '#22d3ee', fontWeight: 600, textShadow: '0 0 10px #22d3ee80' }}>
                All ritual weaving is 2× more potent today.
              </span>
            </p>
          ) : (
            <p style={{
              color: '#a0899e',
              fontSize: '12px',
              fontStyle: 'italic',
              lineHeight: 1.7,
              margin: 0,
              textShadow: '0 0 8px #6d28d940',
            }}>
              The energies of {ruler.name} govern this day. Let {ruler.keyword.toLowerCase()} guide your working.
            </p>
          )}
        </div>
      </div>

      <style>{`
        @keyframes lunar-high-pulse {
          0%, 100% { filter: drop-shadow(0 0 8px #c084fc) drop-shadow(0 0 18px #7c3aed80); }
          50%       { filter: drop-shadow(0 0 20px #e9d5ff) drop-shadow(0 0 40px #c084fc); }
        }
      `}</style>
    </div>
  );
}