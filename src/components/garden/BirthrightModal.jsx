import React, { useState, useEffect, useRef } from 'react';

// Sun sign from birth date
function getSunSign(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  const m = d.getMonth() + 1;
  const day = d.getDate();
  if ((m === 3 && day >= 21) || (m === 4 && day <= 19)) return 'Aries';
  if ((m === 4 && day >= 20) || (m === 5 && day <= 20)) return 'Taurus';
  if ((m === 5 && day >= 21) || (m === 6 && day <= 20)) return 'Gemini';
  if ((m === 6 && day >= 21) || (m === 7 && day <= 22)) return 'Cancer';
  if ((m === 7 && day >= 23) || (m === 8 && day <= 22)) return 'Leo';
  if ((m === 8 && day >= 23) || (m === 9 && day <= 22)) return 'Virgo';
  if ((m === 9 && day >= 23) || (m === 10 && day <= 22)) return 'Libra';
  if ((m === 10 && day >= 23) || (m === 11 && day <= 21)) return 'Scorpio';
  if ((m === 11 && day >= 22) || (m === 12 && day <= 21)) return 'Sagittarius';
  if ((m === 12 && day >= 22) || (m === 1 && day <= 19)) return 'Capricorn';
  if ((m === 1 && day >= 20) || (m === 2 && day <= 18)) return 'Aquarius';
  return 'Pisces';
}

// Rough Rising sign: offset sun sign by birth hour
function getRisingSign(dateStr, timeStr) {
  const sunSign = getSunSign(dateStr);
  if (!sunSign || !timeStr) return sunSign;
  const signs = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
  const sunIdx = signs.indexOf(sunSign);
  const [h] = timeStr.split(':').map(Number);
  const offset = Math.floor(h / 2);
  return signs[(sunIdx + offset) % 12];
}

// City search via Open-Meteo geocoding (no key required)
async function searchCities(query) {
  if (!query || query.length < 2) return [];
  const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`);
  const data = await res.json();
  return (data.results || []).map(r => ({
    label: `${r.name}${r.admin1 ? ', ' + r.admin1 : ''}, ${r.country}`,
    lat: r.latitude,
    lon: r.longitude,
  }));
}

export default function BirthrightModal({ onSave, onSkip }) {
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [cityQuery, setCityQuery] = useState('');
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [searching, setSearching] = useState(false);
  const debounceRef = useRef(null);

  const handleCityInput = (val) => {
    setCityQuery(val);
    setSelectedCity(null);
    clearTimeout(debounceRef.current);
    if (val.length < 2) { setCitySuggestions([]); return; }
    setSearching(true);
    debounceRef.current = setTimeout(async () => {
      const results = await searchCities(val);
      setCitySuggestions(results);
      setSearching(false);
    }, 400);
  };

  const handleSave = () => {
    const sunSign = getSunSign(birthDate);
    const risingSign = getRisingSign(birthDate, birthTime);
    const data = {
      birthDate,
      birthTime,
      city: selectedCity?.label || cityQuery,
      lat: selectedCity?.lat || null,
      lon: selectedCity?.lon || null,
      sunSign,
      risingSign,
    };
    localStorage.setItem('selene_birthright', JSON.stringify(data));
    onSave(data);
  };

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid #4c1d9580',
    borderRadius: '6px',
    padding: '14px 18px',
    color: '#e9d5ff',
    outline: 'none',
    fontSize: '14px',
    fontFamily: 'serif',
    fontStyle: 'italic',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 5000,
      backdropFilter: 'blur(15px)',
      WebkitBackdropFilter: 'blur(15px)',
      background: 'rgba(8, 4, 22, 0.82)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px',
    }}>
      <div style={{
        maxWidth: '460px', width: '100%',
        background: 'linear-gradient(160deg, #0f0525 0%, #0a0318 50%, #120528 100%)',
        border: '1px solid #6d28d940',
        borderRadius: '16px',
        padding: '50px 40px',
        boxShadow: '0 0 80px 10px #7c3aed18, 0 0 0 1px #4c1d9530',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative glow */}
        <div style={{
          position: 'absolute', top: '-60px', left: '50%', transform: 'translateX(-50%)',
          width: '200px', height: '200px',
          background: 'radial-gradient(circle, #7c3aed18 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ textAlign: 'center', marginBottom: '36px', position: 'relative' }}>
          <div style={{ fontSize: '36px', marginBottom: '12px', filter: 'drop-shadow(0 0 12px #c084fc)' }}>✦</div>
          <h2 style={{
            color: '#e9d5ff',
            fontSize: '1.8rem',
            fontStyle: 'italic',
            fontWeight: 300,
            margin: '0 0 8px 0',
            textShadow: '0 0 20px #c084fc60',
            letterSpacing: '-0.5px',
          }}>Your Celestial Birthright</h2>
          <p style={{
            color: '#7c3aed',
            fontSize: '9px',
            textTransform: 'uppercase',
            letterSpacing: '5px',
            margin: 0,
          }}>Inscribe your moment of arrival</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
          <div>
            <label style={{ fontSize: '8px', color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '3px', display: 'block', marginBottom: '8px' }}>Birth Date</label>
            <input
              type="date"
              value={birthDate}
              onChange={e => setBirthDate(e.target.value)}
              style={{ ...inputStyle, colorScheme: 'dark' }}
              onFocus={e => { e.currentTarget.style.borderColor = '#7c3aed'; e.currentTarget.style.boxShadow = '0 0 14px #7c3aed30'; }}
              onBlur={e => { e.currentTarget.style.borderColor = '#4c1d9580'; e.currentTarget.style.boxShadow = 'none'; }}
            />
          </div>

          <div>
            <label style={{ fontSize: '8px', color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '3px', display: 'block', marginBottom: '8px' }}>Birth Time <span style={{ color: '#4c1d95', fontSize: '7px' }}>(optional)</span></label>
            <input
              type="time"
              value={birthTime}
              onChange={e => setBirthTime(e.target.value)}
              style={{ ...inputStyle, colorScheme: 'dark' }}
              onFocus={e => { e.currentTarget.style.borderColor = '#7c3aed'; e.currentTarget.style.boxShadow = '0 0 14px #7c3aed30'; }}
              onBlur={e => { e.currentTarget.style.borderColor = '#4c1d9580'; e.currentTarget.style.boxShadow = 'none'; }}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <label style={{ fontSize: '8px', color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '3px', display: 'block', marginBottom: '8px' }}>Birth City <span style={{ color: '#4c1d95', fontSize: '7px' }}>(optional)</span></label>
            <input
              type="text"
              placeholder="Search your city..."
              value={cityQuery}
              onChange={e => handleCityInput(e.target.value)}
              style={{ ...inputStyle, fontStyle: 'normal' }}
              onFocus={e => { e.currentTarget.style.borderColor = '#7c3aed'; e.currentTarget.style.boxShadow = '0 0 14px #7c3aed30'; }}
              onBlur={e => { e.currentTarget.style.borderColor = '#4c1d9580'; e.currentTarget.style.boxShadow = 'none'; }}
            />
            {searching && (
              <div style={{ position: 'absolute', right: '14px', top: '42px', color: '#7c3aed', fontSize: '12px' }}>··</div>
            )}
            {citySuggestions.length > 0 && !selectedCity && (
              <div style={{
                position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 10,
                background: '#0f0525',
                border: '1px solid #4c1d9550',
                borderRadius: '6px',
                marginTop: '4px',
                overflow: 'hidden',
              }}>
                {citySuggestions.map((c, i) => (
                  <div key={i}
                    onMouseDown={() => { setSelectedCity(c); setCityQuery(c.label); setCitySuggestions([]); }}
                    style={{
                      padding: '12px 16px',
                      color: '#c4b5fd',
                      fontSize: '13px',
                      cursor: 'pointer',
                      borderBottom: i < citySuggestions.length - 1 ? '1px solid #1a0a2a' : 'none',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#1a0a35'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >{c.label}</div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <button
          onClick={handleSave}
          disabled={!birthDate}
          style={{
            width: '100%',
            padding: '16px',
            background: birthDate ? 'linear-gradient(135deg, #0d9488, #0891b2)' : '#0a2a2a',
            border: birthDate ? '1px solid #14b8a650' : '1px solid #0a2a2a',
            borderRadius: '8px',
            color: birthDate ? '#ccfbf1' : '#1a3a3a',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '4px',
            fontWeight: 700,
            cursor: birthDate ? 'pointer' : 'not-allowed',
            marginBottom: '12px',
            boxShadow: birthDate ? '0 0 20px 4px #0d948840, 0 0 40px 2px #0891b220' : 'none',
            transition: 'all 0.3s',
            fontFamily: 'serif',
          }}
        >
          Record in the Stars
        </button>

        <button
          onClick={onSkip}
          style={{
            width: '100%',
            padding: '14px',
            background: 'transparent',
            border: '1px solid #c084fc30',
            borderRadius: '8px',
            color: '#7c3aed',
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '4px',
            cursor: 'pointer',
            transition: 'all 0.3s',
            fontFamily: 'serif',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#c084fc60'; e.currentTarget.style.color = '#c084fc'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#c084fc30'; e.currentTarget.style.color = '#7c3aed'; }}
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}