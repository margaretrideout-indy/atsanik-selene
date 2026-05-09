import React, { useEffect, useRef, useState } from 'react';

const STEPS = {
  moon: {
    label: 'Moon',
    microcopy: 'Ground yourself in the current cycle. Observe what the sky reveals.',
  },
  cache: {
    label: 'Cache',
    microcopy: 'Gather your materia with intention. Choose at least two that resonate.',
  },
  tarot: {
    label: 'Tarot',
    microcopy: 'Consign yourself to fate. Let the spirits counsel this working.',
  },
  grimoire: {
    label: 'Weaver',
    microcopy: 'The working is assembled. Begin the ceremony and place the Capstone.',
  },
};

const TAB_ORDER = ['moon', 'cache', 'tarot', 'grimoire'];

// Aurora pulse shown on capstone completion
export function AuroraPulse({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9000,
      pointerEvents: 'none',
      background: 'radial-gradient(ellipse at 50% 40%, #4c1d9580 0%, #7c3aed40 30%, #22d3ee20 60%, transparent 80%)',
      animation: 'aurora-bloom 2.2s ease-out forwards',
    }}>
      <style>{`
        @keyframes aurora-bloom {
          0%   { opacity: 0; transform: scale(0.85); }
          20%  { opacity: 1; transform: scale(1.05); }
          60%  { opacity: 0.85; }
          100% { opacity: 0; transform: scale(1.15); }
        }
      `}</style>
    </div>
  );
}

// Floor thread line connecting active nav tab to content
export function FloorThread({ activeTab, navRefs }) {
  const [x, setX] = useState(null);

  useEffect(() => {
    const el = navRefs?.current?.[activeTab];
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      setX(rect.left + rect.width / 2);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [activeTab, navRefs]);

  if (x === null) return null;

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      height: '60px', pointerEvents: 'none', zIndex: 400,
    }}>
      <svg width="100%" height="60" style={{ position: 'absolute', bottom: 0 }}>
        <defs>
          <linearGradient id="floorThreadGrad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#c084fc" stopOpacity="0" />
            <stop offset="50%" stopColor="#c084fc" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </linearGradient>
          <filter id="threadBlur">
            <feGaussianBlur stdDeviation="1.5" />
          </filter>
        </defs>
        {/* Glow layer */}
        <line
          x1={x - 80} y1="2"
          x2={x + 80} y2="2"
          stroke="#c084fc"
          strokeWidth="4"
          strokeOpacity="0.15"
          filter="url(#threadBlur)"
          style={{ transition: 'all 0.6s ease' }}
        />
        {/* Main thread */}
        <line
          x1={x - 80} y1="2"
          x2={x + 80} y2="2"
          stroke="url(#floorThreadGrad)"
          strokeWidth="1.2"
          style={{ transition: 'all 0.6s ease' }}
        />
        {/* Vertical drip down to floor */}
        <line
          x1={x} y1="2"
          x2={x} y2="60"
          stroke="#c084fc"
          strokeWidth="0.8"
          strokeOpacity="0.3"
          strokeDasharray="3 4"
          style={{ transition: 'x1 0.6s ease, x2 0.6s ease' }}
        />
        <circle cx={x} cy="2" r="2.5" fill="#c084fc" opacity="0.9"
          style={{ transition: 'cx 0.6s ease' }}
        />
      </svg>
    </div>
  );
}

export default function GuidedRitualMode({
  activeTab,
  setActiveTab,
  currentStep,
  navRefs,
}) {
  const microcopy = STEPS[currentStep]?.microcopy || '';
  const stepIndex = TAB_ORDER.indexOf(currentStep);

  return (
    <>
      {/* Micro-copy guidance banner */}
      <div style={{
        textAlign: 'center',
        padding: '10px 20px 0',
        marginBottom: '4px',
        animation: 'fade-guide 0.5s ease',
      }}>
        <p style={{
          fontSize: '12px',
          fontStyle: 'italic',
          color: '#9f7aea',
          letterSpacing: '0.05em',
          margin: 0,
          opacity: 0.85,
        }}>
          {microcopy}
        </p>
        {/* Step progress dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '8px' }}>
          {TAB_ORDER.map((tab, i) => (
            <div key={tab} style={{
              width: i === stepIndex ? '18px' : '5px',
              height: '5px',
              borderRadius: '3px',
              background: i < stepIndex ? '#22d3ee' : i === stepIndex ? '#c084fc' : '#2d1a4a',
              boxShadow: i === stepIndex ? '0 0 8px 2px #c084fc66' : 'none',
              transition: 'all 0.4s ease',
            }} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fade-guide {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}