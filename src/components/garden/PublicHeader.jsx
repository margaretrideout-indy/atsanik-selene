import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';

export default function PublicHeader({ isAuthenticated, user, onLogout }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const handleSignIn = () => base44.auth.redirectToLogin(window.location.href);
  const handleSignUp = () => base44.auth.redirectToLogin(window.location.href);

  const btnBase = {
    minHeight: '44px',
    minWidth: '44px',
    borderRadius: '3px',
    padding: '6px 16px',
    fontSize: '9px',
    textTransform: 'uppercase',
    letterSpacing: '3px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    userSelect: 'none',
    WebkitTapHighlightColor: 'transparent',
  };

  return (
    <>
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
        display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
        padding: `calc(env(safe-area-inset-top) + 8px) 24px 8px`,
        background: 'linear-gradient(to bottom, rgba(18,1,26,0.85) 0%, rgba(18,1,26,0) 100%)',
        backdropFilter: 'none',
        pointerEvents: 'none',
      }}>
        <div style={{ display: 'flex', gap: '10px', pointerEvents: 'auto', alignItems: 'center' }}>
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
                style={{ ...btnBase, background: 'none', border: '1px solid #3b1060', color: '#6d28d9' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#7c3aed'; e.currentTarget.style.color = '#c084fc'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#3b1060'; e.currentTarget.style.color = '#6d28d9'; }}
              >
                Sign Out
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                style={{ ...btnBase, background: 'none', border: '1px solid #3b0a0a', color: '#7f1d1d' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#dc2626'; e.currentTarget.style.color = '#f87171'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#3b0a0a'; e.currentTarget.style.color = '#7f1d1d'; }}
              >
                Delete Account
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleSignIn}
                style={{ ...btnBase, background: 'none', border: '1px solid #3b1060', color: '#a78bfa' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#7c3aed'; e.currentTarget.style.color = '#c084fc'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#3b1060'; e.currentTarget.style.color = '#a78bfa'; }}
              >
                Sign In
              </button>
              <button
                onClick={handleSignUp}
                style={{ ...btnBase, background: 'linear-gradient(135deg, #3b0764, #6d28d9)', border: '1px solid #7c3aed', color: '#e9d5ff', boxShadow: '0 0 10px 2px #7c3aed30' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 16px 4px #7c3aed60'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 10px 2px #7c3aed30'; }}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>

      {/* Delete Account Confirmation Dialog */}
      {showDeleteConfirm && (
        <div
          onClick={() => setShowDeleteConfirm(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9000,
            backgroundColor: 'rgba(0,0,0,0.85)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: '400px', width: '100%',
              background: '#0d0120',
              border: '1px solid #7f1d1d',
              borderRadius: '8px',
              padding: '40px 32px',
              textAlign: 'center',
              boxShadow: '0 0 40px 8px rgba(220,38,38,0.15)',
            }}
          >
            <p style={{ fontSize: '22px', marginBottom: '16px' }}>⚠️</p>
            <h3 style={{ color: '#fca5a5', fontStyle: 'italic', fontSize: '1.4rem', margin: '0 0 16px', fontWeight: 400 }}>
              Delete Account
            </h3>
            <p style={{ color: '#a78bfa', fontSize: '14px', lineHeight: '1.8', margin: '0 0 28px' }}>
              To permanently delete your account and all associated data, please contact the app creator at{' '}
              <a href="https://linktree.com/mzrdt333" target="_blank" rel="noopener noreferrer" style={{ color: '#c084fc', textDecoration: 'none' }}>
                linktree.com/mzrdt333
              </a>{' '}
              with your request. Your grimoire entries and account will be removed within 7 days.
            </p>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              style={{
                background: 'none', border: '1px solid #4c1d95',
                color: '#a78bfa', padding: '10px 28px',
                borderRadius: '4px', cursor: 'pointer',
                fontSize: '9px', textTransform: 'uppercase', letterSpacing: '4px',
                minHeight: '44px', transition: 'all 0.2s',
                userSelect: 'none',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#7c3aed'; e.currentTarget.style.color = '#e9d5ff'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#4c1d95'; e.currentTarget.style.color = '#a78bfa'; }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}