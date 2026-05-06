import React, { useMemo } from 'react';

// Deterministic hash from a string → number 0-1
function hashFraction(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = (h * 16777619) >>> 0;
  }
  return (h >>> 0) / 4294967295;
}

// Generate N points evenly spaced on a circle, then offset by item hash
function sigilPoints(items, cx, cy, r) {
  if (items.length === 0) return [];
  return items.map((item, i) => {
    const baseAngle = (i / items.length) * 2 * Math.PI - Math.PI / 2;
    const angleJitter = hashFraction(item.id + 'a') * 0.6 - 0.3;
    const radiusJitter = 0.55 + hashFraction(item.id + 'r') * 0.45;
    const angle = baseAngle + angleJitter;
    const radius = r * radiusJitter;
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  });
}

// Connect every point to every other point (like a web)
function buildSigilPath(points) {
  if (points.length < 2) return '';
  const lines = [];
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      lines.push(`M ${points[i].x.toFixed(1)} ${points[i].y.toFixed(1)} L ${points[j].x.toFixed(1)} ${points[j].y.toFixed(1)}`);
    }
  }
  return lines.join(' ');
}

export default function SigilEngine({ items, size = 220 }) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.38;

  const points = useMemo(() => sigilPoints(items, cx, cy, r), [items, cx, cy, r]);
  const pathD = useMemo(() => buildSigilPath(points), [points]);

  // Outer circle radius based on number of items
  const outerR = r + size * 0.08;

  // Color from first item property or default
  const accentColor = '#c084fc';

  if (items.length === 0) return null;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ display: 'block', margin: '0 auto' }}
    >
      {/* Outer ritual circle */}
      <circle
        cx={cx} cy={cy} r={outerR}
        fill="none"
        stroke="#4c1d95"
        strokeWidth="1"
        strokeDasharray="4 6"
        opacity="0.6"
      />

      {/* Inner reference circle */}
      <circle
        cx={cx} cy={cy} r={r * 0.18}
        fill="none"
        stroke="#6d28d9"
        strokeWidth="0.8"
        opacity="0.4"
      />

      {/* Sigil lines */}
      <path
        d={pathD}
        fill="none"
        stroke={accentColor}
        strokeWidth="0.9"
        opacity="0.55"
        strokeLinecap="round"
      />

      {/* Glow layer */}
      <path
        d={pathD}
        fill="none"
        stroke={accentColor}
        strokeWidth="2.5"
        opacity="0.08"
        strokeLinecap="round"
        filter="blur(3px)"
      />

      {/* Node points */}
      {points.map((pt, i) => (
        <circle
          key={i}
          cx={pt.x.toFixed(1)}
          cy={pt.y.toFixed(1)}
          r="2.5"
          fill={accentColor}
          opacity="0.8"
        />
      ))}

      {/* Center dot */}
      <circle cx={cx} cy={cy} r="2" fill="#e9d5ff" opacity="0.6" />
    </svg>
  );
}

// Serialize a sigil to a compact string for storage
export function serializeSigil(items) {
  return items.map(i => i.id).join(',');
}