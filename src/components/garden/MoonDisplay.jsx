import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

export default function MoonDisplay({ archives }) {
  const [moonData, setMoonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pulse, setPulse] = useState(false);

  const fetchMoon = async () => {
    setPulse(true);
    const res = await base44.functions.invoke('getMoonPhase', {});
    setMoonData(res.data);
    setLoading(false);
    setTimeout(() => setPulse(false), 1200);
  };

  useEffect(() => {
    fetchMoon();
    // Refresh every 10 minutes
    const interval = setInterval(fetchMoon, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const phase = moonData?.phase || '—';
  const illumination = moonData?.illumination ?? '—';
  const emoji = moonData?.emoji || '🌕';

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', padding: '80px 0' }}>
        {/* Moon emoji */}
        <div style={{ position: 'relative', display: 'inline-block', marginBottom: '25px' }}>
          <div style={{
            fontSize: '120px',
            filter: 'hue-rotate(260deg) saturate(0.4) brightness(0.85) drop-shadow(0 0 24px #7c3aed66)',
            opacity: loading ? 0.4 : 1,
            transition: 'opacity 0.6s'
          }}>
            {emoji}
          </div>
          {/* Live pulse dot */}
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '-4px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
          }}>
            <span style={{
              display: 'inline-block',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: pulse ? '#22d3ee' : '#7c3aed',
              boxShadow: pulse
                ? '0 0 0 4px #22d3ee30, 0 0 10px 2px #22d3ee80'
                : '0 0 0 2px #7c3aed30',
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
          background: '#22d3ee08'
        }}>
          <span style={{
            width: '5px', height: '5px', borderRadius: '50%',
            background: '#22d3ee',
            display: 'inline-block',
            animation: 'live-pulse 2.5s ease-in-out infinite',
          }} />
          <span style={{ fontSize: '8px', color: '#22d3ee', textTransform: 'uppercase', letterSpacing: '4px' }}>
            Live Data
          </span>
        </div>

        <h2 style={{ color: 'white', fontSize: '2.2rem', fontStyle: 'italic', fontWeight: '100', marginBottom: '10px' }}>
          {loading ? 'Reading the sky…' : phase}
        </h2>
        <p style={{ color: '#e9d5ff', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '6px', textShadow: '0 0 10px #bf80ff80' }}>
          {loading ? '· · ·' : `Illumination ${illumination}%`}
        </p>
      </div>

      <div>
        <h3 style={{ fontSize: '10px', textTransform: 'uppercase', color: '#e9d5ff', letterSpacing: '4px', borderBottom: '1px solid #2d0040', paddingBottom: '15px' }}>
          The Atsanik Chronicles
        </h3>
        <p style={{ fontSize: '12px', color: '#a78bfa', fontStyle: 'italic', marginTop: '30px', textAlign: 'center' }}>
          {archives.length === 0 ? 'History is waiting to be written.' : `${archives.length} ritual${archives.length > 1 ? 's' : ''} sealed.`}
        </p>
      </div>

      <style>{`
        @keyframes live-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
}