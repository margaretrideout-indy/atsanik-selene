import React from 'react';
import InukshukIcon from '../components/garden/InukshukIcon';
import AppFooter from '../components/garden/AppFooter';

export default function Contact() {
  return (
    <div style={{ backgroundColor: '#12011a', minHeight: '100vh', color: '#cbd5e1', fontFamily: 'serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ marginBottom: '40px' }}>
          <a
            href="/"
            style={{ fontSize: '9px', color: '#4c1d95', textTransform: 'uppercase', letterSpacing: '4px', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#a855f7'}
            onMouseLeave={e => e.currentTarget.style.color = '#4c1d95'}
          >
            ← Return to Atsanik Selene
          </a>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '12px' }}>
            <InukshukIcon size={26} glowing style={{ color: '#c084fc' }} />
            <h1 style={{ color: 'white', fontSize: '2.4rem', fontStyle: 'italic', letterSpacing: '-1px', margin: 0, textShadow: '0 0 20px #c084fc50' }}>
              Contact
            </h1>
            <InukshukIcon size={26} glowing style={{ color: '#c084fc' }} />
          </div>
          <p style={{ fontSize: '9px', color: '#6d28d9', textTransform: 'uppercase', letterSpacing: '5px', margin: 0 }}>
            Reach Out · Connect · Collaborate
          </p>
        </div>

        <div style={{ borderLeft: '2px solid #4c1d9560', paddingLeft: '32px', marginBottom: '48px' }}>
          <p style={{ color: '#c4b5fd', fontSize: '15px', lineHeight: '1.9', marginBottom: '32px', fontStyle: 'italic' }}>
            Whether you have a question about the app, a suggestion for the oracle deck, or simply want to connect — the lantern is lit and the threshold is open.
          </p>

          <div style={{ marginBottom: '36px' }}>
            <p style={{ fontSize: '9px', color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '4px', margin: '0 0 12px', fontWeight: 700 }}>Creator</p>
            <p style={{ color: '#e9d5ff', fontSize: '15px', margin: '0 0 6px' }}>Margaret Rideout</p>
            <a
              href="https://linktree.com/mzrdt333"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#a78bfa', fontSize: '14px', fontStyle: 'italic', textDecoration: 'none', transition: 'color 0.2s, text-shadow 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#22d3ee'; e.currentTarget.style.textShadow = '0 0 8px #22d3ee60'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#a78bfa'; e.currentTarget.style.textShadow = 'none'; }}
            >
              linktree.com/mzrdt333 ↗
            </a>
          </div>

          <div style={{ marginBottom: '36px' }}>
            <p style={{ fontSize: '9px', color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '4px', margin: '0 0 12px', fontWeight: 700 }}>Support the Work</p>
            <a
              href="https://ko-fi.com/mzrdt333"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#a78bfa', fontSize: '14px', fontStyle: 'italic', textDecoration: 'none', transition: 'color 0.2s, text-shadow 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#22d3ee'; e.currentTarget.style.textShadow = '0 0 8px #22d3ee60'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#a78bfa'; e.currentTarget.style.textShadow = 'none'; }}
            >
              ko-fi.com/mzrdt333 ↗
            </a>
          </div>

          <div>
            <p style={{ fontSize: '9px', color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '4px', margin: '0 0 12px', fontWeight: 700 }}>Other Projects</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'Hearth & Horizon', href: 'https://hearth-horizon-2026.base44.app' },
                { label: 'Indigenized Curriculum Engine', href: 'https://indigenizedcurriculumengine.base44.app' },
              ].map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#a78bfa', fontSize: '14px', fontStyle: 'italic', textDecoration: 'none', transition: 'color 0.2s, text-shadow 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#22d3ee'; e.currentTarget.style.textShadow = '0 0 8px #22d3ee60'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#a78bfa'; e.currentTarget.style.textShadow = 'none'; }}
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AppFooter />
    </div>
  );
}