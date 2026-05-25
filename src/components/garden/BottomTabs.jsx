import React from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = [
  { id: 'moon',     label: 'Moon',    icon: '🌙' },
  { id: 'cache',    label: 'Cache',   icon: '🌿' },
  { id: 'sigil',    label: 'Sigil',   icon: '✦'  },
  { id: 'oracle',   label: 'Oracle',  icon: '🔮' },
  { id: 'grimoire', label: 'Grimoire',icon: '📖' },
];

export default function BottomTabs({ activeTab, onTabChange, lockedTabs = [] }) {
  const navigate = useNavigate();

  const handleTab = (id) => {
    if (lockedTabs.includes(id)) return;
    // Use react-router navigate so history stack is managed correctly
    navigate(`?tab=${id}`);
    onTabChange(id);
  };

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 600,
      display: 'flex',
      alignItems: 'stretch',
      background: 'rgba(12, 1, 22, 0.96)',
      borderTop: '1px solid #2d1a4a',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      paddingBottom: 'env(safe-area-inset-bottom)',
    }}>
      {TABS.map(tab => {
        const isActive = activeTab === tab.id;
        const isLocked = lockedTabs.includes(tab.id);
        return (
          <button
            key={tab.id}
            onClick={() => handleTab(tab.id)}
            style={{
              flex: 1,
              minHeight: '56px',
              minWidth: '44px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              background: 'none',
              border: 'none',
              cursor: isLocked ? 'not-allowed' : 'pointer',
              padding: '8px 4px',
              transition: 'all 0.2s',
              opacity: isLocked ? 0.25 : 1,
              userSelect: 'none',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            <span style={{
              fontSize: '20px',
              lineHeight: 1,
              filter: isActive
                ? 'drop-shadow(0 0 6px #c084fc) drop-shadow(0 0 12px #7c3aed88)'
                : 'none',
              transition: 'filter 0.3s',
            }}>
              {tab.icon}
            </span>
            <span style={{
              fontSize: '8px',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontFamily: 'sans-serif',
              color: isActive ? '#e9d5ff' : '#4c2a7a',
              transition: 'color 0.2s',
              fontWeight: isActive ? 700 : 400,
            }}>
              {tab.label}
            </span>
            {isActive && (
              <span style={{
                position: 'absolute',
                bottom: 'calc(env(safe-area-inset-bottom) + 0px)',
                width: '24px',
                height: '2px',
                background: 'linear-gradient(90deg, #7c3aed, #c084fc)',
                borderRadius: '2px 2px 0 0',
                boxShadow: '0 0 8px 2px #c084fc66',
              }} />
            )}
          </button>
        );
      })}
    </nav>
  );
}