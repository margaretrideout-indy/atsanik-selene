import React, { useState, useEffect, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import BirthrightModal from './BirthrightModal';
import CelestialRhythm from './CelestialRhythm';
import DailyEcho from './DailyEcho';
import usePullToRefresh from '../../hooks/usePullToRefresh';
import PullIndicator from './PullIndicator';

export default function MoonDisplay({ archives }) {
  const [moonData, setMoonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pulse, setPulse] = useState(false);

  // Birthright state
  const [birthData, setBirthData] = useState(() => {
    const saved = localStorage.getItem('selene_birthright');
    return saved ? JSON.parse(saved) : null;
  });
  const [showModal, setShowModal] = useState(() => {
    const saved = localStorage.getItem('selene_birthright');
    const skipped = sessionStorage.getItem('selene_birthright_skipped');
    return !saved && !skipped;
  });

  const isLunarDay = new Date().getDay() === 1; // Monday

  const fetchMoon = useCallback(async () => {
    setPulse(true);
    const res = await base44.functions.invoke('getMoonPhase', {});
    setMoonData(res.data);
    setLoading(false);
    setTimeout(() => setPulse(false), 1200);
  }, []);

  useEffect(() => {
    fetchMoon();
    const interval = setInterval(fetchMoon, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchMoon]);

  const { ref: pullRef, pullDistance, isRefreshing } = usePullToRefresh(fetchMoon);

  const phase = moonData?.phase || '—';
  const illumination = moonData?.illumination ?? '—';
  const emoji = moonData?.emoji || '🌕';

  const handleSave = (data) => {
    setBirthData(data);
    setShowModal(false);
  };

  const handleSkip = () => {
    sessionStorage.setItem('selene_birthright_skipped', '1');
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <BirthrightModal onSave={handleSave} onSkip={handleSkip} />
      )}

      <div
        ref={pullRef}
        style={{ maxWidth: '600px', margin: '0 auto', paddingBottom: '40px', position: 'relative', overflowY: 'auto' }}
      >
        <PullIndicator pullDistance={pullDistance} isRefreshing={isRefreshing} />

        <div style={{ textAlign: 'center', padding: '60px 0 40px' }}>
          {/* Moon emoji with Lunar High animation on Mondays */}
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: '25px' }}>
            <div style={{
              fontSize: '120px',
              filter: 'hue-rotate(260deg) saturate(0.4) brightness(0.85) drop-shadow(0 0 24px #7c3aed66)',
              opacity: loading ? 0.4 : 1,
              transition: 'opacity 0.6s',
              animation: isLunarDay ? 'lunar-day-pulse 3s ease-in-out infinite' : 'none',
            }}>
              {emoji}
            </div>
            {/* Live pulse dot */}
            <div style={{ position: 'absolute', top: '12px', right: '-4px' }}>
              <span style={{
                display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%',
                background: pulse ? '#22d3ee' : '#7c3aed',
                boxShadow: pulse ? '0 0 0 4px #22d3ee30, 0 0 10px 2px #22d3ee80' : '0 0 0 2px #7c3aed30',
                transition: 'all 0.4s ease',
                animation: 'live-pulse 2.5s ease-in-out infinite',
              }} />
            </div>
          </div>

          {/* Live label */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            marginBottom: '20px', padding: '4px 12px',
            border: '1px solid #22d3ee30', borderRadius: '20px',
            background: '#22d3ee08',
          }}>
            <span style={{
              width: '5px', height: '5px', borderRadius: '50%',
              background: '#22d3ee', display: 'inline-block',
              animation: 'live-pulse 2.5s ease-in-out infinite',
            }} />
            <span style={{ fontSize: '8px', color: '#22d3ee', textTransform: 'uppercase', letterSpacing: '4px' }}>
              Live Data
            </span>
          </div>

          <h2 style={{
            color: 'white', fontSize: '2.2rem', fontStyle: 'italic', fontWeight: '100', marginBottom: '10px',
            textShadow: isLunarDay ? '0 0 30px #c084fc80, 0 0 60px #7c3aed40' : '0 0 10px #ffffff20',
          }}>
            {loading ? 'Reading the sky…' : phase}
          </h2>
          <p style={{
            color: '#e9d5ff', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '6px',
            textShadow: '0 0 10px #bf80ff80',
          }}>
            {loading ? '· · ·' : `Illumination ${illumination}%`}
          </p>

          {/* Lunar High badge on Mondays */}
          {isLunarDay && !loading && (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              marginTop: '16px', padding: '6px 16px',
              border: '1px solid #c084fc50',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #4c1d9520, #7c3aed20)',
              animation: 'lunar-badge-pulse 3s ease-in-out infinite',
            }}>
              <span style={{ fontSize: '12px' }}>🌙</span>
              <span style={{ fontSize: '8px', color: '#e9d5ff', textTransform: 'uppercase', letterSpacing: '4px', textShadow: '0 0 8px #c084fc80' }}>
                Lunar High
              </span>
            </div>
          )}
        </div>

        {/* Daily Echo (if birth data exists) */}
        {birthData && <DailyEcho birthData={birthData} />}

        {/* Celestial Rhythm (always shown) */}
        <CelestialRhythm />

        {/* Atsanik Chronicles */}
        <div>
          <h3 style={{
            fontSize: '10px', textTransform: 'uppercase', color: '#e9d5ff', letterSpacing: '4px',
            borderBottom: '1px solid #2d0040', paddingBottom: '15px',
            textShadow: '0 0 8px #c084fc40',
          }}>
            The Atsanik Chronicles
          </h3>
          <p style={{ fontSize: '12px', color: '#a78bfa', fontStyle: 'italic', marginTop: '30px', textAlign: 'center', textShadow: '0 0 8px #7c3aed40' }}>
            {archives.length === 0 ? 'History is waiting to be written.' : `${archives.length} ritual${archives.length > 1 ? 's' : ''} sealed.`}
          </p>
        </div>

        {/* Ulluriaq — trigger for Birthright modal */}
        {!birthData && (
          <button
            onClick={() => setShowModal(true)}
            title="Record Your Celestial Birthright"
            style={{
              position: 'fixed', bottom: '90px', right: '24px',
              background: 'rgba(12, 3, 28, 0.9)',
              border: '1px solid #7c3aed50',
              borderRadius: '50%',
              width: '44px', height: '44px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 0 16px 4px #7c3aed30',
              animation: 'ulluriaq-pulse 4s ease-in-out infinite',
              zIndex: 200,
              fontSize: '18px',
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 24px 8px #c084fc50'; e.currentTarget.style.borderColor = '#c084fc80'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 16px 4px #7c3aed30'; e.currentTarget.style.borderColor = '#7c3aed50'; }}
          >
            ✦
          </button>
        )}
      </div>

      <style>{`
        @keyframes live-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
        @keyframes lunar-day-pulse {
          0%, 100% { filter: hue-rotate(260deg) saturate(0.4) brightness(0.85) drop-shadow(0 0 24px #7c3aed66); }
          50%       { filter: hue-rotate(260deg) saturate(0.7) brightness(1.05) drop-shadow(0 0 50px #c084fcaa) drop-shadow(0 0 80px #7c3aed66); }
        }
        @keyframes lunar-badge-pulse {
          0%, 100% { box-shadow: 0 0 0 0 #c084fc00; border-color: #c084fc30; }
          50%       { box-shadow: 0 0 14px 4px #c084fc30; border-color: #c084fc70; }
        }
        @keyframes ulluriaq-pulse {
          0%, 100% { box-shadow: 0 0 16px 4px #7c3aed30; }
          50%       { box-shadow: 0 0 26px 8px #c084fc50; }
        }
      `}</style>
    </>
  );
}