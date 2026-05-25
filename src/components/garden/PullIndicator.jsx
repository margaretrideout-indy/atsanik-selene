import React from 'react';

/**
 * Visual pull-to-refresh indicator shown at the top of scrollable views.
 * @param {{ pullDistance: number, isRefreshing: boolean, threshold: number }} props
 */
export default function PullIndicator({ pullDistance, isRefreshing, threshold = 72 }) {
  if (pullDistance <= 0 && !isRefreshing) return null;

  const progress = Math.min(pullDistance / threshold, 1);
  const opacity = Math.min(progress * 1.4, 1);
  const scale = 0.6 + progress * 0.4;

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: `${Math.max(pullDistance, isRefreshing ? 44 : 0)}px`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none',
      zIndex: 50,
      overflow: 'hidden',
      transition: isRefreshing ? 'height 0.3s ease' : 'none',
    }}>
      <div style={{
        opacity,
        transform: `scale(${scale}) rotate(${isRefreshing ? 0 : progress * 180}deg)`,
        transition: isRefreshing ? 'transform 0s' : 'none',
        animation: isRefreshing ? 'ptr-spin 0.9s linear infinite' : 'none',
        color: '#c084fc',
        fontSize: '22px',
        filter: 'drop-shadow(0 0 6px #c084fc88)',
      }}>
        ✦
      </div>
      <style>{`
        @keyframes ptr-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}