import React from 'react';
import InukshukIcon from '../components/garden/InukshukIcon';
import AppFooter from '../components/garden/AppFooter';

export default function About() {
  return (
    <div style={{ backgroundColor: '#12011a', minHeight: '100vh', color: '#cbd5e1', fontFamily: 'serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ marginBottom: '40px' }}>
          <a
            href="/"
            style={{ fontSize: '9px', color: '#4c1d95', textTransform: 'uppercase', letterSpacing: '4px', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#a855f7'}
            onMouseLeave={e => e.currentTarget.style.color = '#4c1d95'}
          >
            ← Return to the Garden
          </a>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '12px' }}>
            <InukshukIcon size={26} glowing style={{ color: '#c084fc' }} />
            <h1 style={{ color: 'white', fontSize: '2.4rem', fontStyle: 'italic', letterSpacing: '-1px', margin: 0, textShadow: '0 0 20px #c084fc50' }}>
              About Atsanik Selene
            </h1>
            <InukshukIcon size={26} glowing style={{ color: '#c084fc' }} />
          </div>
          <p style={{ fontSize: '9px', color: '#6d28d9', textTransform: 'uppercase', letterSpacing: '5px', margin: 0 }}>
            A Magical Companion · Moon, Materia & Oracle
          </p>
        </div>

        <div style={{ borderLeft: '2px solid #4c1d9560', paddingLeft: '32px', marginBottom: '48px' }}>
          <p style={{ color: '#e9d5ff', fontSize: '16px', lineHeight: '1.95', marginBottom: '24px', fontStyle: 'italic' }}>
            Atsanik Selene is a spiritual companion app woven from two ancient traditions: the Inuit concept of <em>atsanik</em> — the northern lights, dancing spirits who witness every working — and Selene, the Greek titaness of the moon who governs cycles of becoming and release.
          </p>
          <p style={{ color: '#c4b5fd', fontSize: '15px', lineHeight: '1.95', marginBottom: '24px' }}>
            At its heart, Atsanik Selene is a living grimoire. It invites practitioners of magic, witchcraft, and earth-based spirituality to gather their materia — crystals, herbs, pantry ingredients, and colours — and weave them into intentional ritual workings. The app tracks the live moon phase and Inuttitut seasonal calendar so every working is rooted in the natural rhythms of the land.
          </p>
          <p style={{ color: '#c4b5fd', fontSize: '15px', lineHeight: '1.95', marginBottom: '24px' }}>
            The oracle system features eight original Inuit Archetype cards — The Traveler, The Angakkuq, Sedna, The Elder, The Kamutik, The Lone Inukshuk, The Ulu, and The Drum — each holding three temporal faces: past, present, and future. Draw a single card, a three-card River spread, or the full Five Directions cross to receive guidance rooted in circumpolar Indigenous wisdom.
          </p>
          <p style={{ color: '#c4b5fd', fontSize: '15px', lineHeight: '1.95', marginBottom: '24px' }}>
            Users can generate personal intent sigils using a traditional Saturn-square cipher, save completed rituals to a private Grimoire, and follow the Guided Ritual Mode for a step-by-step ceremonial experience. Every entry is preserved locally so your practice builds over time.
          </p>
          <p style={{ color: '#a78bfa', fontSize: '14px', lineHeight: '1.95', marginBottom: '0', fontStyle: 'italic' }}>
            Atsanik Selene is built and tended by <strong style={{ color: '#e9d5ff' }}>Margaret Rideout</strong>, an independent creator whose work sits at the crossroads of Indigenous knowledge systems, spiritual practice, and thoughtful digital craft. It is made for seekers, practitioners, and anyone drawn to the quiet power of the in-between.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '60px' }}>
          <a href="/deck-gallery" style={{ fontSize: '10px', color: '#4c2a7a', textTransform: 'uppercase', letterSpacing: '4px', textDecoration: 'none', border: '1px solid #2d1a4a', padding: '12px 24px', borderRadius: '4px', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#c084fc'; e.currentTarget.style.borderColor = '#7c3aed'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#4c2a7a'; e.currentTarget.style.borderColor = '#2d1a4a'; }}
          >Explore the Deck Gallery</a>
          <a href="/contact" style={{ fontSize: '10px', color: '#4c2a7a', textTransform: 'uppercase', letterSpacing: '4px', textDecoration: 'none', border: '1px solid #2d1a4a', padding: '12px 24px', borderRadius: '4px', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#c084fc'; e.currentTarget.style.borderColor = '#7c3aed'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#4c2a7a'; e.currentTarget.style.borderColor = '#2d1a4a'; }}
          >Get in Touch</a>
        </div>
      </div>

      <AppFooter />
    </div>
  );
}