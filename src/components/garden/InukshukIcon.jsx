import React from 'react';

export default function InukshukIcon({ size = 24, glowing = false, settling = false, style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        filter: glowing
          ? 'drop-shadow(0 0 6px #c084fc) drop-shadow(0 0 12px #7c3aed88)'
          : 'none',
        animation: settling
          ? 'inukshuk-settle 0.6s ease-out forwards'
          : glowing
          ? 'inukshuk-pulse 3s ease-in-out infinite'
          : 'none',
        ...style,
      }}
    >
      {/* Base stones */}
      <rect x="6" y="40" width="10" height="7" rx="1.5" fill="currentColor" opacity="0.85" />
      <rect x="24" y="40" width="10" height="7" rx="1.5" fill="currentColor" opacity="0.85" />
      {/* Lower body */}
      <rect x="10" y="32" width="20" height="9" rx="2" fill="currentColor" opacity="0.9" />
      {/* Mid torso */}
      <rect x="12" y="22" width="16" height="11" rx="2" fill="currentColor" />
      {/* Arms */}
      <rect x="1" y="24" width="11" height="6" rx="2" fill="currentColor" opacity="0.8" />
      <rect x="28" y="24" width="11" height="6" rx="2" fill="currentColor" opacity="0.8" />
      {/* Head */}
      <ellipse cx="20" cy="17" rx="7" ry="6" fill="currentColor" />
      {/* Capstone */}
      <ellipse cx="20" cy="10" rx="5" ry="3.5" fill="currentColor" opacity="0.9" />
    </svg>
  );
}