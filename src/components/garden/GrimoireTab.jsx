import React, { useState } from 'react';
import InukshukIcon from './InukshukIcon';
import SigilEngine from './SigilEngine';

const MASTER_DATA_IDS = {}; // will reconstruct from sigil

function itemsFromSigil(sigilStr, masterData) {
  if (!sigilStr) return [];
  return sigilStr.split(',').map(id => masterData.find(i => i.id === id)).filter(Boolean);
}

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

const MOON_EMOJI = {
  'New Moon': '🌑', 'Waxing Crescent': '🌒', 'First Quarter': '🌓',
  'Waxing Gibbous': '🌔', 'Full Moon': '🌕', 'Waning Gibbous': '🌖',
  'Last Quarter': '🌗', 'Waning Crescent': '🌘',
};

function getMoonEmoji(phase) {
  return MOON_EMOJI[phase] || '🌙';
}

// Full-screen review overlay for a single ritual
function RitualReview({ log, masterData, onClose }) {
  const cacheItems = log.cacheItems
    ? log.cacheItems
    : itemsFromSigil(log.sigil, masterData);

  const primaryCard = log.tarot?.[0] || null;
  const customImg = primaryCard ? CUSTOM_ICONS[primaryCard.name] : null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 4000,
        backgroundColor: 'rgba(8, 2, 18, 0.97)',
        backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
        overflowY: 'auto',
        animation: 'review-fade-in 0.4s ease',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '600px', width: '100%',
          border: '1px solid #3b1060',
          borderRadius: '10px',
          background: 'linear-gradient(160deg, #0d0020 0%, #09001a 100%)',
          padding: '48px 40px',
          boxShadow: '0 0 80px 10px #4c1d9530',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <p style={{ fontSize: '8px', color: '#4c1d95', textTransform: 'uppercase', letterSpacing: '5px', margin: '0 0 8px' }}>
            The Sanctuary · Ritual Recalled
          </p>
          <h2 style={{ color: 'white', fontStyle: 'italic', fontSize: '2rem', fontWeight: 300, margin: '0 0 10px' }}>
            {getMoonEmoji(log.moonPhase)} {log.moonPhase}
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '8px', color: '#6d28d9', textTransform: 'uppercase', letterSpacing: '3px' }}>⟡ {log.date}</span>
            {log.season && <span style={{ fontSize: '8px', color: '#6d28d9', textTransform: 'uppercase', letterSpacing: '3px' }}>⟡ {log.season}</span>}
          </div>
        </div>

        {/* Sigil */}
        {cacheItems.length > 0 && (
          <div style={{ marginBottom: '32px', opacity: 0.8 }}>
            <SigilEngine items={cacheItems} size={160} />
          </div>
        )}

        {/* Cache items */}
        {cacheItems.length > 0 && (
          <div style={{ marginBottom: '32px' }}>
            <p style={{ fontSize: '8px', color: '#4c1d95', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '12px' }}>Materia Gathered</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
              {cacheItems.map(item => (
                <span key={item.id} style={{
                  fontSize: '10px', padding: '4px 12px',
                  border: '1px solid #3b0764', borderRadius: '20px',
                  color: '#c084fc', background: '#1a0a2a',
                }}>
                  {item.icon} {item.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tarot cards */}
        {log.tarot && log.tarot.length > 0 && (
          <div style={{ marginBottom: '32px' }}>
            <p style={{ fontSize: '8px', color: '#4c1d95', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '16px' }}>
              The Counsel ({log.tarot.length} card{log.tarot.length > 1 ? 's' : ''})
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
              {log.tarot.map((card, i) => {
                const img = CUSTOM_ICONS[card.name];
                const temporal = card[card.position] || {};
                return (
                  <div key={i} style={{
                    background: '#0d0020', border: '1px solid #3b0764',
                    borderRadius: '6px', padding: '16px',
                    textAlign: 'center', minWidth: '120px', maxWidth: '160px',
                  }}>
                    <p style={{ fontSize: '7px', color: '#7dd3fc', textTransform: 'uppercase', letterSpacing: '3px', margin: '0 0 8px' }}>{card.position}</p>
                    {img ? (
                      <img src={img} alt={card.name} style={{
                        width: '56px', height: '56px', objectFit: 'contain',
                        mixBlendMode: 'screen', marginBottom: '8px',
                        filter: 'drop-shadow(0 0 8px #c084fc55)',
                        transform: card.reversed ? 'rotate(180deg)' : 'none',
                      }} />
                    ) : (
                      <div style={{ fontSize: '36px', marginBottom: '8px', transform: card.reversed ? 'rotate(180deg)' : 'none' }}>{card.icon}</div>
                    )}
                    <p style={{ fontSize: '11px', fontStyle: 'italic', color: '#e2d9f3', margin: '0 0 4px' }}>{card.name}</p>
                    {card.reversed && <p style={{ fontSize: '8px', color: '#c084fc', margin: 0 }}>Shadow</p>}
                    {!card.reversed && temporal.meaning && (
                      <p style={{ fontSize: '9px', color: '#8b6b8a', fontStyle: 'italic', margin: '6px 0 0', lineHeight: '1.6' }}>{temporal.meaning}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Intent Sigil */}
        {log.intentSigil && (
          <div style={{ marginBottom: '28px' }}>
            <p style={{ fontSize: '8px', color: '#4c1d95', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '12px' }}>Bound Intent</p>
            <div style={{
              background: '#05011a', border: '1px solid #22d3ee30', borderRadius: '8px',
              padding: '18px 20px',
              boxShadow: '0 0 16px 2px #22d3ee10',
            }}>
              <p style={{ fontSize: '14px', fontStyle: 'italic', color: '#e9d5ff', margin: '0 0 10px', textShadow: '0 0 10px #c084fc40' }}>
                "{log.intentSigil.intent}"
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {log.intentSigil.consonants?.map((ch, i) => (
                  <span key={i} style={{
                    fontSize: '11px', color: '#22d3ee', fontFamily: 'serif', fontStyle: 'italic',
                    letterSpacing: '4px', textShadow: '0 0 8px #22d3ee60',
                  }}>{ch}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mantra */}
        <div style={{ borderLeft: '1px solid #4c1d95', paddingLeft: '20px', marginBottom: '36px' }}>
          <p style={{ fontSize: '8px', color: '#4c1d95', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '10px' }}>The Weave</p>
          <p style={{ fontSize: '14px', fontStyle: 'italic', color: '#e9d5ff', lineHeight: '1.85', margin: 0 }}>
            "{log.mantra}"
          </p>
        </div>

        <button
          onClick={onClose}
          style={{
            display: 'block', margin: '0 auto',
            background: 'none', border: 'none',
            color: '#4c1d95', fontSize: '9px',
            textTransform: 'uppercase', letterSpacing: '4px',
            cursor: 'pointer', transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#a855f7'}
          onMouseLeave={e => e.currentTarget.style.color = '#4c1d95'}
        >
          Return to the Grimoire
        </button>
      </div>

      <style>{`
        @keyframes review-fade-in {
          from { opacity: 0; transform: scale(0.97); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

export default function GrimoireTab({ archives, masterData }) {
  const [search, setSearch] = useState('');
  const [reviewing, setReviewing] = useState(null);

  const filtered = archives.filter(log =>
    search === '' ||
    log.mantra?.toLowerCase().includes(search.toLowerCase()) ||
    log.moonPhase?.toLowerCase().includes(search.toLowerCase()) ||
    log.tarot?.some(c => c.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{
        background: 'linear-gradient(135deg, #d8b4fe, #94a3b8)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        fontSize: '2rem', fontStyle: 'italic', textAlign: 'center', marginBottom: '8px',
      }}>The Grimoire</h2>
      <p style={{
        background: 'linear-gradient(135deg, #a855f7, #94a3b8)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        fontSize: '9px', textTransform: 'uppercase', letterSpacing: '5px',
        textAlign: 'center', marginBottom: '36px',
      }}>User Sanctuary · Past Rituals</p>

      {/* Search */}
      <input
        type="text"
        placeholder="Search rituals, moon phases, archetypes..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          width: '100%', background: 'transparent',
          borderBottom: '1px solid #701a75',
          borderTop: 'none', borderLeft: 'none', borderRight: 'none',
          padding: '16px', color: 'white', outline: 'none',
          textAlign: 'center', fontStyle: 'italic',
          marginBottom: '40px', boxSizing: 'border-box',
          transition: 'border-color 0.3s, box-shadow 0.3s',
        }}
        onFocus={e => { e.currentTarget.style.borderBottomColor = '#a855f7'; e.currentTarget.style.boxShadow = '0 4px 12px -4px #a855f780'; }}
        onBlur={e => { e.currentTarget.style.borderBottomColor = '#701a75'; e.currentTarget.style.boxShadow = 'none'; }}
      />

      {archives.length === 0 ? (
        <p style={{ fontSize: '12px', color: '#1e293b', fontStyle: 'italic', textAlign: 'center', marginTop: '60px' }}>
          History is waiting to be written.
        </p>
      ) : filtered.length === 0 ? (
        <p style={{ fontSize: '12px', color: '#2d1a4a', fontStyle: 'italic', textAlign: 'center', marginTop: '40px' }}>
          No rituals match that search.
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '60px' }}>
          {filtered.map(log => {
            const primaryCard = log.tarot?.[0] || null;
            const cardImg = primaryCard ? CUSTOM_ICONS[primaryCard.name] : null;
            const cacheItems = log.cacheItems
              ? log.cacheItems
              : itemsFromSigil(log.sigil, masterData);

            return (
              <div
                key={log.id}
                onClick={() => setReviewing(log)}
                style={{
                  background: '#08021a',
                  border: '1px solid #1e0a3c',
                  borderRadius: '8px',
                  padding: '24px',
                  cursor: 'pointer',
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'flex-start',
                  transition: 'all 0.25s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#4c1d95'; e.currentTarget.style.boxShadow = '0 0 20px 2px #4c1d9530'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#1e0a3c'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                {/* Thumbnail: Moon + primary card */}
                <div style={{
                  width: '72px', flexShrink: 0,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                }}>
                  <div style={{ fontSize: '32px', filter: 'hue-rotate(260deg) saturate(0.4) brightness(0.85)' }}>
                    {getMoonEmoji(log.moonPhase)}
                  </div>
                  {cardImg ? (
                    <img src={cardImg} alt={primaryCard.name} style={{
                      width: '44px', height: '44px', objectFit: 'contain',
                      mixBlendMode: 'screen',
                      filter: 'drop-shadow(0 0 8px #c084fc55)',
                      transform: primaryCard?.reversed ? 'rotate(180deg)' : 'none',
                    }} />
                  ) : primaryCard ? (
                    <span style={{ fontSize: '28px', opacity: 0.7 }}>{primaryCard.icon}</span>
                  ) : null}
                </div>

                {/* Details */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '9px', color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '3px' }}>{log.date}</span>
                    <span style={{ fontSize: '8px', color: '#4c1d95', textTransform: 'uppercase', letterSpacing: '2px' }}>⟡ {log.moonPhase}</span>
                    {log.season && <span style={{ fontSize: '8px', color: '#4c1d95', textTransform: 'uppercase', letterSpacing: '2px' }}>⟡ {log.season}</span>}
                  </div>

                  {primaryCard && (
                    <p style={{ fontSize: '11px', color: '#7c3aed', fontStyle: 'italic', margin: '0 0 8px' }}>
                      {primaryCard.name}{log.tarot.length > 1 ? ` + ${log.tarot.length - 1} more` : ''}
                    </p>
                  )}

                  {cacheItems.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '10px' }}>
                      {cacheItems.slice(0, 4).map(item => (
                        <span key={item.id} style={{
                          fontSize: '9px', padding: '2px 8px',
                          border: '1px solid #2d0040', borderRadius: '10px',
                          color: '#6d28d9',
                        }}>
                          {item.icon} {item.name}
                        </span>
                      ))}
                      {cacheItems.length > 4 && (
                        <span style={{ fontSize: '9px', color: '#4c1d95' }}>+{cacheItems.length - 4} more</span>
                      )}
                    </div>
                  )}

                  <p style={{
                    fontSize: '12px', fontStyle: 'italic', color: '#6b4fa0',
                    margin: 0, lineHeight: '1.6',
                    overflow: 'hidden', display: '-webkit-box',
                    WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                  }}>
                    "{log.mantra}"
                  </p>
                </div>

                {/* Arrow */}
                <div style={{ color: '#2d1a4a', fontSize: '16px', alignSelf: 'center', flexShrink: 0 }}>›</div>
              </div>
            );
          })}
        </div>
      )}

      {reviewing && (
        <RitualReview log={reviewing} masterData={masterData} onClose={() => setReviewing(null)} />
      )}
    </div>
  );
}