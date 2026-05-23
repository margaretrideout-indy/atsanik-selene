import React from 'react';

const LINKS = [
  { label: 'Hearth & Horizon', href: 'https://hearth-horizon-2026.base44.app' },
  { label: 'Indigenized Curriculum Engine', href: 'https://indigenizedcurriculumengine.base44.app' },
  { label: 'LinkTree', href: 'https://linktree.com/mzrdt333' },
  { label: 'Support on Ko-fi', href: 'https://ko-fi.com/mzrdt333' },
  { label: 'My Amazon Shop', href: 'https://www.amazon.com/shop/hearthandh0a6-20' },
  { label: 'Shop anything on Amazon using this link', href: 'https://www.amazon.com/?tag=hearthandh0a6-20' },
];

export default function AppFooter() {
  return (
    <footer style={{
      width: '100%',
      textAlign: 'center',
      padding: '40px 20px 28px',
      marginTop: '60px',
      borderTop: '1px solid #1a0830',
    }}>
      <p style={{
        fontSize: '11px',
        color: '#3b2060',
        letterSpacing: '2px',
        fontFamily: 'sans-serif',
        margin: '0 0 12px',
      }}>
        Created by Margaret Rideout &nbsp;·&nbsp; Explore My Projects
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px 20px' }}>
        {LINKS.map(link => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '11px',
              color: '#4c2a7a',
              textDecoration: 'none',
              fontFamily: 'sans-serif',
              letterSpacing: '1px',
              transition: 'color 0.3s, text-shadow 0.3s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#22d3ee';
              e.currentTarget.style.textShadow = '0 0 8px #22d3ee80';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = '#4c2a7a';
              e.currentTarget.style.textShadow = 'none';
            }}
          >
            {link.label}
          </a>
        ))}
      </div>
      <p style={{
        fontSize: '10px',
        color: '#2d1a4a',
        fontFamily: 'sans-serif',
        margin: '14px 0 0',
        letterSpacing: '0.5px',
      }}>
        *As an Amazon Associate I earn from qualifying purchases.
      </p>
    </footer>
  );
}