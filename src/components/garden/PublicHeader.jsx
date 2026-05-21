import React from 'react';
import { base44 } from '@/api/base44Client';

export default function PublicHeader({ isAuthenticated, user, onLogout }) {
  const handleSignIn = () => base44.auth.redirectToLogin(window.location.href);
  const handleSignUp = () => base44.auth.redirectToLogin(window.location.href);

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
      display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
      padding: '12px 24px',
      background: 'linear-gradient(to bottom, rgba(18,1,26,0.85) 0%, rgba(18,1,26,0) 100%)',
      backdropFilter: 'none',
      pointerEvents: 'none',
    }}>
      <div style={{ display: 'flex', gap: '10px', pointerEvents: 'auto' }}>
        {isAuthenticated ? (
          <>
            {user?.full_name && (
              <span style={{
                fontSize: '9px', color: '#a78bfa', textTransform: 'uppercase',
                letterSpacing: '3px', alignSelf: 'center',
              }}>
                {user.full_name}
              </span>
            )}
            <button
              onClick={onLogout}
              style={{
                background: 'none',
                border: '1px solid #3b1060',
                borderRadius: '3px',
                padding: '6px 16px',
                color: '#6d28d9',
                fontSize: '9px', textTransform: 'uppercase', letterSpacing: '3px',
                cursor: 'pointer', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#7c3aed'; e.currentTarget.style.color = '#c084fc'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#3b1060'; e.currentTarget.style.color = '#6d28d9'; }}
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleSignIn}
              style={{
                background: 'none',
                border: '1px solid #3b1060',
                borderRadius: '3px',
                padding: '6px 16px',
                color: '#a78bfa',
                fontSize: '9px', textTransform: 'uppercase', letterSpacing: '3px',
                cursor: 'pointer', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#7c3aed'; e.currentTarget.style.color = '#c084fc'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#3b1060'; e.currentTarget.style.color = '#a78bfa'; }}
            >
              Sign In
            </button>
            <button
              onClick={handleSignUp}
              style={{
                background: 'linear-gradient(135deg, #3b0764, #6d28d9)',
                border: '1px solid #7c3aed',
                borderRadius: '3px',
                padding: '6px 16px',
                color: '#e9d5ff',
                fontSize: '9px', textTransform: 'uppercase', letterSpacing: '3px',
                cursor: 'pointer', transition: 'all 0.2s',
                boxShadow: '0 0 10px 2px #7c3aed30',
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 16px 4px #7c3aed60'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 10px 2px #7c3aed30'; }}
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
}