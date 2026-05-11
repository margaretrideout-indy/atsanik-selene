import React, { useState, useRef, useEffect, useCallback } from 'react';

// --- Cipher Logic ---
// Square of Saturn mapping (traditional)
// 1=J,S  2=B,K,T  3=C,L  4=D,M,V  5=N,W  6=F,X  7=G,P,Y  8=H,Q,Z  9=R
const CONSONANT_MAP = {
  J:1, S:1,
  B:2, K:2, T:2,
  C:3, L:3,
  D:4, M:4, V:4,
  N:5, W:5,
  F:6, X:6,
  G:7, P:7, Y:7,
  H:8, Q:8, Z:8,
  R:9,
};

const VOWELS = new Set(['A','E','I','O','U']);

export function extractConsonants(text) {
  const upper = text.toUpperCase();
  const seen = new Set();
  const result = [];
  for (const ch of upper) {
    if (/[A-Z]/.test(ch) && !VOWELS.has(ch) && !seen.has(ch)) {
      seen.add(ch);
      result.push(ch);
    }
  }
  return result;
}

export function consonantsToCells(consonants) {
  const seen = new Set();
  const cells = [];
  for (const ch of consonants) {
    const cell = CONSONANT_MAP[ch];
    if (cell !== undefined && !seen.has(cell)) {
      seen.add(cell);
      cells.push(cell);
    }
  }
  return cells;
}

// Grid cell index (1-9) → center pixel coordinates in a 270×270 canvas
const CELL_SIZE = 90;
function cellCenter(cell) {
  const i = cell - 1; // 0-indexed
  const row = Math.floor(i / 3);
  const col = i % 3;
  return {
    x: col * CELL_SIZE + CELL_SIZE / 2,
    y: row * CELL_SIZE + CELL_SIZE / 2,
  };
}

const CANVAS_SIZE = 270;

export default function IntentSigil({ onBind }) {
  const [intent, setIntent] = useState('');
  const [lockedPath, setLockedPath] = useState([]); // array of cell numbers
  const [isLocked, setIsLocked] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState([]);
  const canvasRef = useRef(null);

  const consonants = extractConsonants(intent);
  const activeCells = consonantsToCells(consonants);

  // --- Mouse / Touch drawing on the grid ---
  const getCell = useCallback((e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = CANVAS_SIZE / rect.width;
    const scaleY = CANVAS_SIZE / rect.height;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;
    const col = Math.floor(x / CELL_SIZE);
    const row = Math.floor(y / CELL_SIZE);
    if (col < 0 || col > 2 || row < 0 || row > 2) return null;
    return row * 3 + col + 1;
  }, []);

  const onPointerDown = (e) => {
    if (isLocked || activeCells.length < 2) return;
    const canvas = canvasRef.current;
    const cell = getCell(e, canvas);
    if (!cell || !activeCells.includes(cell)) return;
    setDrawing(true);
    setCurrentPath([cell]);
  };

  const onPointerMove = (e) => {
    if (!drawing || isLocked) return;
    const canvas = canvasRef.current;
    const cell = getCell(e, canvas);
    if (!cell || !activeCells.includes(cell)) return;
    setCurrentPath(prev => {
      if (prev[prev.length - 1] === cell) return prev;
      return [...prev, cell];
    });
  };

  const onPointerUp = () => {
    if (!drawing) return;
    setDrawing(false);
    if (currentPath.length >= 2) {
      setLockedPath(currentPath);
      setIsLocked(true);
      onBind?.({ intent, consonants, cells: currentPath });
    }
  };

  // --- Draw canvas ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Grid lines
    ctx.strokeStyle = '#2d0a4a';
    ctx.lineWidth = 1;
    for (let i = 1; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, CANVAS_SIZE);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(CANVAS_SIZE, i * CELL_SIZE);
      ctx.stroke();
    }

    // Cell numbers (faint)
    for (let c = 1; c <= 9; c++) {
      const { x, y } = cellCenter(c);
      ctx.fillStyle = '#1e0a3c';
      ctx.font = '11px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(c), x, y + 24);
    }

    // Draw locked teal path
    if (lockedPath.length >= 2) {
      ctx.save();
      ctx.shadowBlur = 14;
      ctx.shadowColor = '#22d3ee';
      ctx.strokeStyle = '#22d3ee';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      const start = cellCenter(lockedPath[0]);
      ctx.moveTo(start.x, start.y);
      for (let i = 1; i < lockedPath.length; i++) {
        const pt = cellCenter(lockedPath[i]);
        ctx.lineTo(pt.x, pt.y);
      }
      ctx.stroke();
      ctx.restore();
    }

    // Draw current (in-progress) path in lavender
    if (!isLocked && currentPath.length >= 2) {
      ctx.save();
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#c084fc';
      ctx.strokeStyle = '#c084fc';
      ctx.lineWidth = 1.5;
      ctx.lineCap = 'round';
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      const start = cellCenter(currentPath[0]);
      ctx.moveTo(start.x, start.y);
      for (let i = 1; i < currentPath.length; i++) {
        const pt = cellCenter(currentPath[i]);
        ctx.lineTo(pt.x, pt.y);
      }
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
    }

    // Active cell dots (lavender pulse if not locked, teal if locked)
    activeCells.forEach(cell => {
      const { x, y } = cellCenter(cell);
      const isOnPath = lockedPath.includes(cell) || currentPath.includes(cell);
      const color = isLocked ? '#22d3ee' : '#c084fc';
      ctx.save();
      ctx.shadowBlur = 16;
      ctx.shadowColor = color;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, isOnPath ? 7 : 5, 0, Math.PI * 2);
      ctx.fill();
      // Inner white dot
      ctx.shadowBlur = 0;
      ctx.fillStyle = isLocked ? '#ccfbf1' : '#e9d5ff';
      ctx.beginPath();
      ctx.arc(x, y, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

  }, [activeCells, currentPath, lockedPath, isLocked]);

  const handleReset = () => {
    setIsLocked(false);
    setLockedPath([]);
    setCurrentPath([]);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '0 20px 40px' }}>
      {/* Section header */}
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <h2 style={{
          background: 'linear-gradient(135deg, #d8b4fe, #22d3ee)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          fontSize: '1.8rem', fontStyle: 'italic', margin: '0 0 6px',
        }}>The Intent Sigil</h2>
        <p style={{ color: '#6d28d9', fontSize: '8px', textTransform: 'uppercase', letterSpacing: '5px', margin: 0 }}>
          Bind your purpose into form
        </p>
      </div>

      {/* Intent input */}
      <div style={{ marginBottom: '28px' }}>
        <label style={{ fontSize: '8px', color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '4px', display: 'block', marginBottom: '10px' }}>
          Write your Intent
        </label>
        <input
          type="text"
          placeholder="State your purpose in a few words…"
          value={intent}
          onChange={e => { setIntent(e.target.value); handleReset(); }}
          style={{
            width: '100%', background: 'rgba(255,255,255,0.03)',
            border: '1px solid #4c1d9560', borderRadius: '6px',
            padding: '14px 18px', color: '#e9d5ff', outline: 'none',
            fontSize: '14px', fontFamily: 'serif', fontStyle: 'italic',
            boxSizing: 'border-box', transition: 'border-color 0.3s, box-shadow 0.3s',
            textShadow: '0 0 8px #c084fc30',
          }}
          onFocus={e => { e.currentTarget.style.borderColor = '#7c3aed'; e.currentTarget.style.boxShadow = '0 0 14px #7c3aed30'; }}
          onBlur={e => { e.currentTarget.style.borderColor = '#4c1d9560'; e.currentTarget.style.boxShadow = 'none'; }}
        />
        <p style={{ fontSize: '9px', color: '#4c1d95', fontStyle: 'italic', marginTop: '8px', textAlign: 'center' }}>
          Vowels and duplicates are stripped. The consonants become the sigil.
        </p>
      </div>

      {/* Stripped consonants display */}
      {consonants.length > 0 && (
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{
            display: 'inline-flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center',
            padding: '8px 16px', border: '1px solid #2d0a4a', borderRadius: '4px',
            background: '#05011a',
          }}>
            {consonants.map((ch, i) => (
              <span key={i} style={{
                fontSize: '13px', color: '#c084fc', letterSpacing: '6px',
                fontFamily: 'serif', fontStyle: 'italic',
                textShadow: '0 0 10px #c084fc60',
              }}>{ch}</span>
            ))}
          </div>
          <p style={{ fontSize: '7px', color: '#3b0764', textTransform: 'uppercase', letterSpacing: '3px', marginTop: '6px' }}>
            Cipher consonants
          </p>
        </div>
      )}

      {/* Grid canvas */}
      {activeCells.length > 0 && (
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          {activeCells.length < 2 && !isLocked && (
            <p style={{ fontSize: '10px', color: '#4c1d95', fontStyle: 'italic', marginBottom: '12px' }}>
              Add more letters to activate the grid…
            </p>
          )}
          {activeCells.length >= 2 && !isLocked && (
            <p style={{ fontSize: '10px', color: '#a78bfa', fontStyle: 'italic', marginBottom: '12px', textShadow: '0 0 8px #c084fc40' }}>
              Trace the pulsing dots to bind the intent
            </p>
          )}
          {isLocked && (
            <p style={{ fontSize: '10px', color: '#22d3ee', fontStyle: 'italic', marginBottom: '12px', textShadow: '0 0 8px #22d3ee60' }}>
              ✦ The sigil is bound and sealed
            </p>
          )}

          <div style={{ position: 'relative', display: 'inline-block' }}>
            {/* Pulse animation overlay for active dots when not locked */}
            {!isLocked && (
              <div style={{
                position: 'absolute', inset: 0, borderRadius: '8px',
                background: 'radial-gradient(ellipse at 50% 50%, #c084fc06 0%, transparent 70%)',
                animation: 'sigil-breathe 3s ease-in-out infinite',
                pointerEvents: 'none',
              }} />
            )}

            <canvas
              ref={canvasRef}
              width={CANVAS_SIZE}
              height={CANVAS_SIZE}
              style={{
                width: '270px', height: '270px',
                border: isLocked ? '1px solid #22d3ee40' : '1px solid #3b0764',
                borderRadius: '8px',
                background: '#05011a',
                cursor: activeCells.length >= 2 && !isLocked ? 'crosshair' : 'default',
                display: 'block',
                boxShadow: isLocked
                  ? '0 0 30px 4px #22d3ee20, inset 0 0 20px #0a0a2a'
                  : '0 0 20px 2px #c084fc10, inset 0 0 20px #0a0a2a',
                transition: 'border-color 0.6s, box-shadow 0.6s',
                touchAction: 'none',
              }}
              onMouseDown={onPointerDown}
              onMouseMove={onPointerMove}
              onMouseUp={onPointerUp}
              onMouseLeave={onPointerUp}
              onTouchStart={onPointerDown}
              onTouchMove={onPointerMove}
              onTouchEnd={onPointerUp}
            />
          </div>

          {/* Cell legend */}
          <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'center', gap: '6px', flexWrap: 'wrap' }}>
            {[
              ['1', 'J·S'], ['2', 'B·K·T'], ['3', 'C·L'],
              ['4', 'D·M·V'], ['5', 'N·W'], ['6', 'F·X'],
              ['7', 'G·P·Y'], ['8', 'H·Q·Z'], ['9', 'R'],
            ].map(([num, letters]) => (
              <span key={num} style={{
                fontSize: '7px', color: activeCells.includes(Number(num)) ? '#c084fc' : '#1e0a3c',
                fontFamily: 'serif', letterSpacing: '1px',
                textShadow: activeCells.includes(Number(num)) ? '0 0 6px #c084fc60' : 'none',
                transition: 'color 0.3s',
              }}>
                {num}:{letters}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Reset button */}
      {isLocked && (
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <button
            onClick={handleReset}
            style={{
              background: 'none', border: 'none', color: '#3b0764',
              fontSize: '9px', textTransform: 'uppercase', letterSpacing: '3px',
              cursor: 'pointer', transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#7c3aed'}
            onMouseLeave={e => e.currentTarget.style.color = '#3b0764'}
          >
            Redraw the sigil
          </button>
        </div>
      )}

      <style>{`
        @keyframes sigil-breathe {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}