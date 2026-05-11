import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

const SIGN_GLYPHS = {
  Aries: '♈', Taurus: '♉', Gemini: '♊', Cancer: '♋',
  Leo: '♌', Virgo: '♍', Libra: '♎', Scorpio: '♏',
  Sagittarius: '♐', Capricorn: '♑', Aquarius: '♒', Pisces: '♓',
};

// Horoscope via a free proxy / LLM fallback (no API key needed)
async function fetchHoroscope(sign) {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const res = await base44.integrations.Core.InvokeLLM({
    prompt: `You are a mystical astrologer writing in a poetic, elegant style. Write a daily horoscope for ${sign} for ${today}. 
    Keep it to 2–3 sentences. Focus on themes of intuition, action, or growth relevant to the current celestial moment. 
    Write in second person. Do not begin with the sign name. Make it feel personal and sacred.`,
  });
  return typeof res === 'string' ? res : res?.text || res?.content || '';
}

export default function DailyEcho({ birthData }) {
  const [horoscope, setHoroscope] = useState('');
  const [loading, setLoading] = useState(true);
  const sign = birthData?.sunSign;

  useEffect(() => {
    if (!sign) return;
    setLoading(true);
    const cacheKey = `selene_horoscope_${sign}_${new Date().toDateString()}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) { setHoroscope(cached); setLoading(false); return; }

    fetchHoroscope(sign).then(text => {
      setHoroscope(text);
      localStorage.setItem(cacheKey, text);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [sign]);

  if (!sign) return null;

  return (
    <div style={{
      background: 'linear-gradient(160deg, #12052a 0%, #0a0320 50%, #150830 100%)',
      border: '1px solid #7c3aed30',
      borderRadius: '12px',
      padding: '28px 24px',
      marginBottom: '20px',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 0 40px 4px #4c1d9514, inset 0 0 30px 0 #0d0520',
    }}>
      {/* Gradient orb top-left */}
      <div style={{
        position: 'absolute', top: '-20px', left: '-20px',
        width: '120px', height: '120px',
        background: 'radial-gradient(circle, #7c3aed20 0%, transparent 70%)',
        pointerEvents: 'none',
        borderRadius: '50%',
      }} />
      {/* Teal orb bottom-right */}
      <div style={{
        position: 'absolute', bottom: '-20px', right: '-20px',
        width: '100px', height: '100px',
        background: 'radial-gradient(circle, #22d3ee14 0%, transparent 70%)',
        pointerEvents: 'none',
        borderRadius: '50%',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <span style={{
            fontSize: '22px',
            background: 'linear-gradient(135deg, #c084fc, #22d3ee)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>{SIGN_GLYPHS[sign]}</span>
          <div>
            <div style={{ fontSize: '8px', color: '#22d3ee', textTransform: 'uppercase', letterSpacing: '5px', textShadow: '0 0 8px #22d3ee60' }}>Daily Echo</div>
            <div style={{ fontSize: '10px', color: '#c084fc', textTransform: 'uppercase', letterSpacing: '3px', textShadow: '0 0 8px #c084fc60' }}>{sign}</div>
          </div>
          {birthData.risingSign && birthData.risingSign !== sign && (
            <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
              <div style={{ fontSize: '7px', color: '#4c1d95', textTransform: 'uppercase', letterSpacing: '2px' }}>Rising</div>
              <div style={{ fontSize: '9px', color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '2px' }}>{birthData.risingSign}</div>
            </div>
          )}
        </div>

        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ animation: 'live-pulse 2s ease-in-out infinite', width: '5px', height: '5px', borderRadius: '50%', background: '#c084fc', display: 'inline-block' }} />
            <span style={{ color: '#4c1d95', fontSize: '12px', fontStyle: 'italic' }}>Reading the stars…</span>
          </div>
        ) : (
          <p style={{
            color: '#e9d5ff',
            fontSize: '14px',
            fontStyle: 'italic',
            lineHeight: 1.8,
            margin: 0,
            textShadow: '0 0 12px #c084fc30, 0 0 20px #7c3aed20',
          }}>{horoscope || 'The stars are silent today. Return at dawn.'}</p>
        )}
      </div>

      <style>{`
        @keyframes live-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.4); }
        }
      `}</style>
    </div>
  );
}