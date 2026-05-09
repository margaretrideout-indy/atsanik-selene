import React, { useState, useEffect, useRef } from 'react';

const STEPS = [
  { tab: 'moon',     label: 'Moon',    tip: 'Begin here. Observe the cycle of the land.' },
  { tab: 'cache',    label: 'Cache',   tip: 'Gather your Materia.' },
  { tab: 'tarot',    label: 'Tarot',   tip: 'Call upon the spirits.' },
  { tab: 'grimoire', label: 'Ritual',  tip: 'Seal the working. Place the Capstone.' },
];

// Which step index unlocks each stage
const STEP_TABS = ['moon', 'cache', 'tarot', 'grimoire'];

export default function InitiationFlow({
  activeTab,
  setActiveTab,
  moonViewed,
  itemsSelected,
  tarotDrawn,
  onDismiss,
}) {
  const [stepIndex, setStepIndex] = useState(0);
  const [threadLeft, setThreadLeft] = useState(null);
  const navRefs = useRef({});

  // Advance step based on external state
  useEffect(() => {
    if (stepIndex === 0 && moonViewed) setStepIndex(1);
  }, [moonViewed]);

  useEffect(() => {
    if (stepIndex === 1 && itemsSelected) setStepIndex(2);
  }, [itemsSelected]);

  useEffect(() => {
    if (stepIndex === 2 && tarotDrawn) setStepIndex(3);
  }, [tarotDrawn]);

  // Auto-navigate when step advances
  useEffect(() => {
    const targetTab = STEP_TABS[stepIndex];
    if (targetTab && targetTab !== activeTab) {
      setActiveTab(targetTab);
    }
  }, [stepIndex]);

  // Position the thread line under the active nav tab
  useEffect(() => {
    const tab = STEP_TABS[stepIndex];
    const el = navRefs.current[tab];
    if (el) {
      const rect = el.getBoundingClientRect();
      setThreadLeft(rect.left + rect.width / 2);
    }
  }, [stepIndex, activeTab]);

  const currentStep = STEPS[stepIndex];

  return (
    <>
      {/* Thread line across the top nav area */}
      {threadLeft !== null && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '120px',
            pointerEvents: 'none',
            zIndex: 500,
            overflow: 'hidden',
          }}
        >
          <svg width="100%" height="120" style={{ position: 'absolute', top: 0, left: 0 }}>
            <defs>
              <linearGradient id="threadGrad" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
                <stop offset="50%" stopColor="#c084fc" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Horizontal thread */}
            <line
              x1={threadLeft - 60} y1="110"
              x2={threadLeft + 60} y2="110"
              stroke="url(#threadGrad)"
              strokeWidth="1.5"
              style={{ transition: 'all 0.6s ease' }}
            />
            {/* Downward drip */}
            <line
              x1={threadLeft} y1="110"
              x2={threadLeft} y2="120"
              stroke="#c084fc"
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            {/* Dot */}
            <circle cx={threadLeft} cy="110" r="2.5" fill="#c084fc" opacity="0.85" />
          </svg>
        </div>
      )}

      {/* Tooltip banner */}
      <div style={{
        position: 'fixed',
        bottom: stepIndex < 3 ? '30px' : '120px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 600,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        background: 'rgba(20, 8, 40, 0.92)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid #5b2fa8',
        borderRadius: '6px',
        padding: '14px 24px',
        maxWidth: '340px',
        width: '90%',
        boxShadow: '0 0 24px 4px #7c3aed30',
        animation: 'thread-fade-in 0.5s ease',
      }}>
        {/* Step dots */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', flexShrink: 0 }}>
          {STEPS.map((s, i) => (
            <div key={i} style={{
              width: '5px', height: '5px', borderRadius: '50%',
              background: i === stepIndex ? '#c084fc' : i < stepIndex ? '#22d3ee' : '#2d1a4a',
              boxShadow: i === stepIndex ? '0 0 6px 2px #c084fc88' : 'none',
              transition: 'all 0.4s',
            }} />
          ))}
        </div>

        <div style={{ flex: 1 }}>
          <p style={{ fontSize: '8px', color: '#7dd3fc', textTransform: 'uppercase', letterSpacing: '4px', margin: '0 0 4px 0' }}>
            Path of the Traveler · Step {stepIndex + 1}
          </p>
          <p style={{ fontSize: '13px', color: '#e9d5ff', fontStyle: 'italic', margin: 0, lineHeight: 1.6 }}>
            {currentStep.tip}
          </p>
        </div>

        <button onClick={onDismiss} style={{
          background: 'none', border: 'none', color: '#4c3060',
          cursor: 'pointer', fontSize: '11px', textTransform: 'uppercase',
          letterSpacing: '2px', flexShrink: 0, paddingLeft: '8px',
          transition: 'color 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.color = '#7c3aed'}
          onMouseLeave={e => e.currentTarget.style.color = '#4c3060'}
        >
          ✕
        </button>
      </div>

      <style>{`
        @keyframes thread-fade-in {
          from { opacity: 0; transform: translateX(-50%) translateY(10px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes initiation-pulse {
          0%, 100% { box-shadow: 0 0 0 0 #c084fc44; }
          50%       { box-shadow: 0 0 0 5px #c084fc22; }
        }
      `}</style>
    </>
  );
}

// Expose navRefs setter so Garden can attach refs to nav buttons
export function useNavRefs() {
  return useRef({});
}